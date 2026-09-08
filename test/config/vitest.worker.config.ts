import { cloudflareTest } from "@cloudflare/vitest-plugin";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [
    cloudflareTest({
      miniflare: {
        compatibilityDate: "2026-09-04",
        compatibilityFlags: ["no_nodejs_compat", "no_nodejs_compat_v2"],
      },
    }),
  ],
  test: {
    include: ["test/worker/**/*.test.ts"],
  },
});
