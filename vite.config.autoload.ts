import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

/**
 * Separate build config for non-React entries (ES-only, no React dependency)
 * Includes: autoload, web component
 */
export default defineConfig({
  build: {
    emptyOutDir: false, // Don't clear dist - main build runs first
    lib: {
      entry: {
        blurhash: resolve(__dirname, "src/blurhash.ts"),
        loader: resolve(__dirname, "src/loader.ts"),
        "web-component": resolve(__dirname, "src/web-component.ts"),
        "web-component/register": resolve(__dirname, "src/web-component/register.ts"),
      },
      formats: ["es"],
    },
    rollupOptions: {
      output: {
        // Ensure consistent naming
        entryFileNames: "[name].js",
      },
    },
  },
  plugins: [
    dts({
      include: [
        "src/blurhash.ts",
        "src/lib/canvas.ts",
        "src/web-component/VisionaryImageElement.ts",
        "src/loader.ts",
        "src/web-component.ts",
        "src/web-component/register.ts",
      ],
    }),
  ],
});
