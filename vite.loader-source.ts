import { resolve } from "path";
import { build, type Plugin } from "vite";

const SYNTHETIC_ID = "synthetic:visionary-loader";
const RESOLVED_ID = `\0${SYNTHETIC_ID}`;

/**
 * Exposes the minified inline loader IIFE (`src/lib/inline-loader.ts`) as a string module
 * (`synthetic:visionary-loader`).
 */
export const loaderSource = (): Plugin => ({
  name: "visionary-loader-source",
  resolveId: (id) => (id === SYNTHETIC_ID ? RESOLVED_ID : undefined),
  async load(id) {
    if (id !== RESOLVED_ID) {
      return;
    }
    const output = await build({
      configFile: false,
      logLevel: "silent",
      build: {
        target: "es2015",
        write: false,
        lib: {
          entry: resolve(__dirname, "src/lib/inline-loader.ts"),
          formats: ["iife"],
          name: "VisionaryLoader",
        },
      },
    });
    const [result] = Array.isArray(output) ? output : [output];
    if (!("output" in result)) {
      throw new Error("Unexpected loader build output");
    }
    const code = result.output[0].code.trim();
    // Inlined into a <script> tag by renderLoaderScript
    if (/<\/script/i.test(code)) {
      throw new Error("Loader source must not contain </script");
    }
    return `export default ${JSON.stringify(code)};`;
  },
});
