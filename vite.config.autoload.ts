import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "unplugin-dts/vite";

import { loaderSource } from "./vite.loader-source";

/**
 * Separate build config for non-React entries (blurhash, loader, server, web component).
 */
export default defineConfig({
  build: {
    emptyOutDir: false, // Don't clear dist - main build runs first
    lib: {
      entry: {
        blurhash: resolve(__dirname, "src/blurhash.ts"),
        loader: resolve(__dirname, "src/loader.ts"),
        server: resolve(__dirname, "src/server.ts"),
        "web-component": resolve(__dirname, "src/web-component.ts"),
        "web-component/register": resolve(__dirname, "src/web-component/register.ts"),
      },
      fileName: (format, entryName) => `${entryName}.${format === "es" ? "js" : "cjs"}`,
      formats: ["es", "cjs"],
    },
  },
  plugins: [
    loaderSource(),
    dts({
      bundleTypes: true,
      include: [
        "src/blurhash.ts",
        "src/lib/canvas.ts",
        "src/web-component/VisionaryImageElement.ts",
        "src/loader.ts",
        "src/server.ts",
        "src/synthetic.d.ts",
        "src/web-component.ts",
        "src/web-component/register.ts",
      ],
    }),
  ],
});
