/// <reference types="vitest" />

import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";
import { defineConfig } from "vitest/config";
import injectCssViaJs from "vite-plugin-css-injected-by-js";
import dts from "unplugin-dts/vite";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      fileName: (format) => {
        const fileNames: Record<string, string> = {
          cjs: "visionary-image.cjs",
          es: "visionary-image.es.js",
        };
        return fileNames[format] ?? `visionary-image.${format}.js`;
      },
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
    },
  },
  css: {
    modules: {
      generateScopedName:
        process.env.NODE_ENV === "production" ? "v7y_[hash:hex:4]" : "[name]__[local]__[hash:base64:5]",
    },
  },
  plugins: [
    react(),
    injectCssViaJs({
      styleId: "v7y-styles",
    }),
    dts({
      bundleTypes: true,
      include: ["src/index.ts", "src/components/Image/Image.tsx", "src/types/visionary-image.ts"],
    }),
  ],
  server: {
    port: 5177,
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./test/vitest.setup.ts",
  },
});
