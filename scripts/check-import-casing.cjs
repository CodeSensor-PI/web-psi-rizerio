#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const repoRoot = process.cwd();

const SKIP_DIRS = new Set(['.git', 'node_modules', 'dist', 'build', 'coverage', '.next']);
const FILE_EXTENSIONS = new Set(['.js', '.jsx', '.ts', '.tsx', '.mjs', '.cjs', '.json']);
const TRY_EXTS = ['', '.js', '.jsx', '.ts', '.tsx', '.mjs', '.cjs', '.json'];
const TRY_INDEX = ['/index.js','/index.jsx','/index.ts','/index.tsx','/index.mjs','/index.cjs'];

function walkDir(dir, cb) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    if (e.isDirectory()) {
      if (SKIP_DIRS.has(e.name)) continue;
      walkDir(path.join(dir, e.name), cb);
    } else if (e.isFile()) {
      const ext = path.extname(e.name).toLowerCase();
      if (FILE_EXTENSIONS.has(ext)) {
        cb(path.join(dir, e.name));
      }
    }
  }
}

// Matches: import ... from 'x', import('x'), require('x')
const importRegex = /(?:import\s+(?:[\s\S]+?)\s+from\s+|import\(|require\()\s*['"]([^'"]+)['"]/g;

function resolveCandidate(baseDir, importPath) {
  const base = path.resolve(baseDir, importPath);
  // try file with extensions
  for (const ext of TRY_EXTS) {
    const candidate = base + ext;
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) return candidate;
  }
  // try index variants
  for (const idx of TRY_INDEX) {
    const candidate = base + idx;
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) return candidate;
  }
  return null;
}

function checkCaseMatches(targetAbs) {
  const rel = path.relative(repoRoot, targetAbs);
  if (rel.startsWith('..') || path.isAbsolute(rel)) {
    // outside repo root, skip
    return { ok: true };
  }
  const segments = rel.split(path.sep);
  let current = repoRoot;
  const mismatches = [];
  for (const seg of segments) {
    const entries = fs.readdirSync(current);
    if (entries.includes(seg)) {
      current = path.join(current, seg);
      continue;
    }
    const lower = seg.toLowerCase();
    const found = entries.find(e => e.toLowerCase() === lower);
    if (found) {
      mismatches.push({ expected: seg, actual: found, parent: current });
      current = path.join(current, found);
      continue;
    }
    // no match at all — treat as unresolved (skip)
    return { ok: true };
  }
  return { ok: mismatches.length === 0, mismatches };
}

const problems = [];

walkDir(repoRoot, (file) => {
  let content;
  try {
    content = fs.readFileSync(file, 'utf8');
  } catch (e) {
    return;
  }
  let m;
  while ((m = importRegex.exec(content)) !== null) {
    const importPath = m[1];
    if (!importPath.startsWith('./') && !importPath.startsWith('../')) continue;
    const resolved = resolveCandidate(path.dirname(file), importPath);
    if (!resolved) continue; // unresolved -> skip
    const check = checkCaseMatches(resolved);
    if (!check.ok) {
      problems.push({
        sourceFile: path.relative(repoRoot, file),
        importPath,
        resolved: path.relative(repoRoot, resolved),
        mismatches: check.mismatches
      });
    }
  }
});

if (problems.length === 0) {
  console.log('✅ No case-mismatched relative imports found.');
  process.exit(0);
}

console.error('❌ Case-mismatched imports detected (these resolve but have wrong case):\n');
for (const p of problems) {
  console.error(`- in file: ${p.sourceFile}`);
  console.error(`  import: ${p.importPath}`);
  console.error(`  resolves to: ${p.resolved}`);
  for (const mm of p.mismatches) {
    const parentRel = path.relative(repoRoot, mm.parent) || '.';
    console.error(`    segment mismatch in ${parentRel}: imported "${mm.expected}" but actual is "${mm.actual}"`);
  }
  console.error('');
}

process.exit(1);