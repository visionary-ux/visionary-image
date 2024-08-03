import { describe, expect, test } from "vitest";

import { createUrl, round, generateRgbaString, RGB, swapUrlOrigin, getMaxEdgeLength } from "../util";
import { IMAGE_SIZES } from "visionary-url/constants";
import { ImageSizeToken } from "visionary-url";

describe("utils", () => {
  describe(createUrl.name, () => {
    test("returns URL for valid url", () => {
      const url = createUrl("https://visionary.test/cache/image.jpg");

      expect(url?.host).toBe("visionary.test");
    });

    test("returns null for invalid url", () => {
      expect(createUrl("bink")).toBeNull();
    });
  });

  test(generateRgbaString.name, () => {
    const rgb: RGB = { b: 8, g: 4, r: 2 };
    const alpha = 0.75;

    const expectedRgbaString = `rgba(2,4,8,${alpha})`;

    expect(generateRgbaString(rgb, alpha)).toBe(expectedRgbaString);
  });

  test(getMaxEdgeLength.name, () => {
    const sourceWidth = 1000;

    // image source is 1000px wide, user wishes to render `md` size (640px)
    const maxEdgeLengthSmaller = getMaxEdgeLength(IMAGE_SIZES[ImageSizeToken.md], sourceWidth);
    expect(maxEdgeLengthSmaller).toBe(IMAGE_SIZES[ImageSizeToken.md]);

    // image source is 1000px wide, user wishes to render `xl` size (1920px)
    const maxEdgeLengthLarger = getMaxEdgeLength(IMAGE_SIZES[ImageSizeToken.xl], sourceWidth);
    expect(maxEdgeLengthLarger).toBe(sourceWidth);
  });

  test(round.name, () => {
    expect(round(4.2)).toBe(4);
  });

  test(swapUrlOrigin.name, () => {
    const inputUrl = createUrl("https://visionary.test/image/coconut.jpg");
    const newEndpoint = "https://bonjour.visionary.test";

    const newUrl = swapUrlOrigin(inputUrl!.toString(), newEndpoint);

    expect(newUrl).toContain(newEndpoint);
  });
});
