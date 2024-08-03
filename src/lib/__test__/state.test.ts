import { describe, expect, test } from "vitest";

import { computeImageState } from "../state";

describe(computeImageState.name, () => {
  test("Visionary URL", () => {
    const url =
      "https://visionary.test/image/WEFvaXU4WnNnNyEyNDAwITMzNzMhNzI2MTVhIWRCRV86WHdLRTItOzF0U0tSUCVLfUBhS1crWFQlaiQkUmpvZzladDd0N1dCITQhNQ/sm/image.jpg";

    const state = computeImageState(url);

    expect(state?.url).toBe("XAoiu8Zsg7");
    expect(state?.maxWidth).toBe(228); // ('sm' size is 228x320)
  });

  test("Visionary Code", () => {
    const visionaryCode =
      "WEFvaXU4WnNnNyEyNDAwITMzNzMhNzI2MTVhIWRCRV86WHdLRTItOzF0U0tSUCVLfUBhS1crWFQlaiQkUmpvZzladDd0N1dCITQhNQ";

    const state = computeImageState(visionaryCode);

    expect(state?.url).toBe("XAoiu8Zsg7");
    expect(state?.bcc).toBe("72615a");
    expect(state?.blurhashX).toBe(4);
    expect(state?.blurhashY).toBe(5);
  });

  test("non-Visionary URL", () => {
    const state = computeImageState("https://i.imgur.com/aaaaa.jpg");

    expect(state).toBe(null);
  });

  test("empty URL", () => {
    const state = computeImageState("");

    expect(state).toBe(null);
  });

  test("invalid URL", () => {
    const state = computeImageState("not_a_url");

    expect(state).toBe(null);
  });
});
