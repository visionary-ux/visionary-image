import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "unplugin-dts/vite";

/**
 * Separate build config for non-React entries (blurhash, loader, web component).
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
      fileName: (format, entryName) => `${entryName}.${format === "es" ? "js" : "cjs"}`,
      formats: ["es", "cjs"],
    },
  },
  plugins: [
    dts({
      bundleTypes: true,
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
