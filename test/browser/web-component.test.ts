import { afterEach, describe, expect, test } from "vitest";

import { VisionaryImageElement, registerVisionaryImage } from "../../dist/web-component.js";

const testVisionaryUrl =
  "https://visionary.test/image/dzF6aTFiQzFZZiEzODg4ITI1OTIhMDAwMDAwIVU1MURVSGZQUVJmbGtXZjZhZGpdUVJmUXU2ZlBWcmpdb35hZA/lg/blue-flower-dark.jpg";
const tagName = "visionary-image-browser-test";

describe("Chromium web component runtime", () => {
  afterEach(() => {
    document.body.replaceChildren();
    window.V7Y_PIXEL_CACHE = new Map();
  });

  test("registers and renders the published custom element", () => {
    registerVisionaryImage(tagName);

    const element = document.createElement(tagName);
    element.setAttribute("alt", "Browser web component image");
    element.setAttribute("lazy", "false");
    element.setAttribute("src", testVisionaryUrl);
    document.body.appendChild(element);

    const container = element.querySelector("div");
    const canvas = element.querySelector("canvas");
    const image = element.querySelector("img");

    expect(customElements.get(tagName)).toBe(VisionaryImageElement);
    expect(container).toBeInstanceOf(HTMLDivElement);
    expect(canvas).toBeInstanceOf(HTMLCanvasElement);
    expect(canvas?.width).toBe(24);
    expect(canvas?.height).toBe(24);
    expect(image?.alt).toBe("Browser web component image");
    expect(image?.loading).toBe("eager");
    expect(image?.src).toContain("blue-flower-dark.jpg");

    const pixel = canvas!.getContext("2d")!.getImageData(0, 0, 1, 1).data;
    expect(pixel[3]).toBeGreaterThan(0);
  });

  test("renders a native image fallback for ordinary URLs", () => {
    registerVisionaryImage(tagName);

    const element = document.createElement(tagName);
    element.setAttribute("alt", "Fallback web component image");
    element.setAttribute("src", "https://example.com/plain.jpg");
    document.body.appendChild(element);

    const image = element.querySelector("img");

    expect(image).toBeInstanceOf(HTMLImageElement);
    expect(image?.alt).toBe("Fallback web component image");
    expect(element.querySelector("canvas")).toBeNull();
  });
});
