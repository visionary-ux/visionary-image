import { describe, expect, test, vi } from "vitest";

import { initBlurhashCanvases } from "../../dist/blurhash.js";
import { Image } from "../../dist/visionary-image.es.js";
import { VisionaryImageElement, registerVisionaryImage } from "../../dist/web-component.js";

vi.stubGlobal("Buffer", undefined);

describe("Cloudflare Workers runtime", () => {
  test("uses Workers APIs without browser or Node.js globals", () => {
    const workerGlobal = globalThis as typeof globalThis & {
      Buffer?: unknown;
      WebSocketPair?: unknown;
    };

    expect(typeof workerGlobal.WebSocketPair).toBe("function");
    expect(typeof globalThis.atob).toBe("function");
    expect(typeof globalThis.btoa).toBe("function");
    expect("document" in globalThis).toBe(false);
    expect(workerGlobal.Buffer).toBeUndefined();
  });

  test("imports SSR-safe entry points without a DOM", () => {
    expect(typeof Image).toBe("function");
    expect(typeof initBlurhashCanvases).toBe("function");
    expect(typeof VisionaryImageElement).toBe("function");
    expect(() => registerVisionaryImage()).not.toThrow();
  });

  test("loads the DOMContentLoaded side-effect entry as a no-op", async () => {
    await expect(import("../../dist/loader.js")).resolves.toBeDefined();
  });
});
