import react from "@vitejs/plugin-react-swc";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { defineConfig, searchForWorkspaceRoot } from "vite";

const examplesRoot = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(examplesRoot, "..");

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(examplesRoot, "index.html"),
        react: resolve(examplesRoot, "react/index.html"),
        "web-component": resolve(examplesRoot, "web-component/index.html"),
      },
    },
  },
  css: {
    modules: {
      generateScopedName: "[name]__[local]__[hash:base64:5]",
    },
  },
  plugins: [react()],
  root: examplesRoot,
  server: {
    fs: {
      allow: [searchForWorkspaceRoot(process.cwd()), repoRoot],
    },
    port: 5177,
  },
});
