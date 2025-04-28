import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/pacientes": {
        target: "http://localhost:8080", // Backend para /auth
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/pacientes/, "/pacientes"), // Mantém o prefixo /auth
      },
    },
  },
});
