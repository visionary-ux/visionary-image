import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, test } from "vitest";

import { Image } from "../../dist/visionary-image.es.js";

const testVisionaryUrl =
  "https://visionary.test/image/dzF6aTFiQzFZZiEzODg4ITI1OTIhMDAwMDAwIVU1MURVSGZQUVJmbGtXZjZhZGpdUVJmUXU2ZlBWcmpdb35hZA/lg/blue-flower-dark.jpg";

describe("Chromium React runtime", () => {
  afterEach(() => {
    cleanup();
    window.V7Y_CANVAS_RENDERED = new Set();
    window.V7Y_PIXEL_CACHE = new Map();
  });

  test("uses browser APIs without Node.js globals", () => {
    expect(typeof window).toBe("object");
    expect(typeof document.createElement("canvas").getContext).toBe("function");
    expect("Buffer" in globalThis).toBe(false);
  });

  test("renders the published React component and paints its canvas", async () => {
    render(<Image alt="Browser runtime image" priority src={testVisionaryUrl} />);

    const image = screen.getByRole("img", { name: "Browser runtime image" });
    const container = image.closest("[data-v7y]");
    const canvas = container?.querySelector("canvas");

    expect(container).toBeInstanceOf(HTMLDivElement);
    expect(canvas).toBeInstanceOf(HTMLCanvasElement);
    expect(canvas?.getAttribute("width")).toBe("24");
    expect(canvas?.getAttribute("height")).toBe("24");
    expect(image.getAttribute("loading")).toBe("eager");
    expect(image.getAttribute("fetchpriority")).toBe("high");

    await waitFor(() => {
      const pixel = canvas!.getContext("2d")!.getImageData(0, 0, 1, 1).data;
      expect(pixel[3]).toBeGreaterThan(0);
    });
  });

  test("falls back to a native image for ordinary URLs", () => {
    render(<Image alt="Plain image" src="https://example.com/plain.jpg" />);

    const image = screen.getByRole("img", { name: "Plain image" });

    expect(image).toBeInstanceOf(HTMLImageElement);
    expect(image.closest("[data-v7y]")).toBeNull();
  });
});
