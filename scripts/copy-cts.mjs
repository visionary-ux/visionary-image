import { copyFileSync } from "node:fs";

/**
 * Copy bundled `.d.ts` → `.d.cts` for the `require` export. With `"type": "module"`, `.d.ts` is ESM;
 * CJS consumers need `.d.cts`. Bundled declarations have no relative imports, so a copy suffices.
 */
const entries = ["index", "blurhash", "loader", "web-component", "web-component/register"];

for (const entry of entries) {
  copyFileSync(`dist/${entry}.d.ts`, `dist/${entry}.d.cts`);
}
