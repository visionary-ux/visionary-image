/// <reference types="vitest" />

import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";
import { defineConfig } from "vite";
import injectCssViaJs from "vite-plugin-css-injected-by-js";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      fileName: (format) => `visionary-image.${format}.js`,
      formats: ["es", "umd"],
      name: "VisionaryImage",
    },
    rollupOptions: {
      external: ["react", "react/react-dom", "react/jsx-runtime"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "jsxRuntime",
        },
      },
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
      rollupTypes: true,
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
