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

// regex simples para imports/require/import(...)
const importRegex = /(?:import\s+(?:[\s\S]+?)\s+from\s+|import\(|require\()\s*['"]([^'"]+)['"]/g;

// Resolve import path by simulating a case-insensitive filesystem lookup.
// Retorna objeto { found: true/false, absPath: fullPathIfFound, mismatchedSegments: [...] }
function resolveCaseInsensitive(baseDir, importPath) {
  // separa caminho e extensões
  const rawSegments = importPath.split('/').filter(Boolean);
  // tentaremos várias opções de extensão no último segmento
  const tryExts = TRY_EXTS;
  // função auxiliar para procurar um caminho (com segmentos já quebrados) no FS com case-insensitive
  function tryResolveSegments(base, segments) {
    let current = base;
    const actualSegments = [];
    for (const seg of segments) {
      if (seg === '.' || seg === '') continue;
      if (seg === '..') {
        current = path.dirname(current);
        actualSegments.push('..');
        continue;
      }
      let entries;
      try {
        entries = fs.readdirSync(current);
      } catch (e) {
        return null;
      }
      // busca exata primeiro
      if (entries.includes(seg)) {
        actualSegments.push(seg);
        current = path.join(current, seg);
        continue;
      }
      // busca case-insensitive
      const lower = seg.toLowerCase();
      const found = entries.find(e => e.toLowerCase() === lower);
      if (found) {
        actualSegments.push(found);
        current = path.join(current, found);
        continue;
      }
      // não achou
      return null;
    }
    return { actualPath: current, actualSegments };
  }

  // 1) tenta como arquivo direto (com várias extensões)
  for (const ext of tryExts) {
    const segments = rawSegments.slice();
    const last = segments[segments.length - 1] + ext;
    segments[segments.length - 1] = last;
    const res = tryResolveSegments(baseDir, segments);
    if (res) {
      // confirma que é arquivo
      try {
        if (fs.statSync(res.actualPath).isFile()) {
          return { found: true, absPath: res.actualPath, actualSegments: res.actualSegments };
        }
      } catch (e) {
        // continue
      }
    }
  }

  // 2) tenta como diretório com index.* (ex: ./foo -> ./foo/index.js)
  const resDir = tryResolveSegments(baseDir, rawSegments);
  if (resDir) {
    for (const idx of TRY_INDEX) {
      const candidate = path.join(resDir.actualPath, idx.slice(1));
      try {
        if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
          // index.js encontrado; adicionar segmento de index ao actualSegments para comparação final
          const indexSegment = path.basename(idx);
          return {
            found: true,
            absPath: candidate,
            actualSegments: resDir.actualSegments.concat([indexSegment])
          };
        }
      } catch (e) {
        // ignore
      }
    }
  }

  return { found: false };
}

function compareImportAndActual(importPath, baseFile) {
  // importPath como escrito no código (./x/Y)
  const importRel = importPath.split('/').filter(Boolean);
  const baseDir = path.resolve(path.dirname(baseFile));
  const resolved = resolveCaseInsensitive(baseDir, importPath);
  if (!resolved.found) return null; // não resolvível mesmo case-insensitive -> ignora
  // montar segmentos esperados (do import) e reais (do FS)
  // Se importPath tem extensão omitida, precisamos comparar segmentos + extensão no último segmento:
  // Para simplicidade, normalizamos comparando segmento-a-segmento ignorando possíveis index.js treat.
  const importSegs = importPath.split('/').filter(Boolean);
  const actualSegs = resolved.actualSegments;
  // pad para igualar comprimento (quando import omite extensão, last segment in importSegs has no .js; last actualSegs may include extension)
  // compare cada par e achar discrepâncias de case
  const mismatches = [];
  // construir representação do import para o último segmento: se o último actual tem extensão, comparar sem extensão ou com extensão?
  for (let i = 0; i < actualSegs.length; i++) {
    const actual = actualSegs[i];
    const imp = importSegs[i] || ''; // se import tiver menos segmentos, imp=''
    // comparar apenas o nome do segmento (sem forçar extensão), mas se import incluiu ext, use-a
    if (imp && imp !== actual && imp.toLowerCase() === actual.toLowerCase()) {
      mismatches.push({ expected: imp, actual, index: i });
    }
    // se import não forneceu o segmento (ex: index) não adicionamos mismatch aqui
  }
  return mismatches.length ? { absPath: resolved.absPath, mismatches } : null;
}

// main
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
    const cmp = compareImportAndActual(importPath, file);
    if (cmp) {
      problems.push({
        sourceFile: path.relative(repoRoot, file),
        importPath,
        resolved: path.relative(repoRoot, cmp.absPath),
        mismatches: cmp.mismatches
      });
    }
  }
});

if (problems.length === 0) {
  console.log('✅ No case-mismatched relative imports found.');
  process.exit(0);
}

console.error('❌ Case-mismatched imports detected (these would resolve on a case-insensitive FS but have wrong case):\n');
for (const p of problems) {
  console.error(`- in file: ${p.sourceFile}`);
  console.error(`  import: ${p.importPath}`);
  console.error(`  resolves to: ${p.resolved}`);
  for (const mm of p.mismatches) {
    console.error(`    segment mismatch: imported "${mm.expected}" but actual is "${mm.actual}"`);
  }
  console.error('');
}
process.exit(1);