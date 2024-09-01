import { fireEvent, render, screen } from "@testing-library/react";
import { ImageSizeToken, generateVisionaryUrl, parseVisionaryUrl } from "visionary-url";
import { describe, expect, test, vi } from "vitest";

import { Image } from "../Image";

import { TEST_IDS } from "../../../lib/test";

const testVisionaryUrl =
  "https://visionary.test/image/dzF6aTFiQzFZZiEzODg4ITI1OTIhMDAwMDAwIVU1MURVSGZQUVJmbGtXZjZhZGpdUVJmUXU2ZlBWcmpdb35hZCE0ITQ/lg/blue-flower-dark.jpg";

const testVisionaryCode =
  "WEFvaXU4WnNnNyEyNDAwITMzNzMhNzI2MTVhIWRCRV86WHdLRTItOzF0U0tSUCVLfUBhS1crWFQlaiQkUmpvZzladDd0N1dCITQhNQ";

describe("Image component", () => {
  test("should render", () => {
    const altText = "illustrative test image";
    render(<Image alt={altText} src={testVisionaryUrl} />);

    const containerElement = screen.getByTestId(TEST_IDS.CONTAINER);
    expect(containerElement.childNodes.length).toBe(2);
    expect(containerElement).toBeInstanceOf(HTMLDivElement);

    const containerStyles = window.getComputedStyle(containerElement);
    expect(containerStyles.maxWidth).toBe("1280px");
    expect(containerStyles.getPropertyValue("aspect-ratio")).toBe("1.500586");
    expect(containerStyles.getPropertyValue("--v-ar")).toBe("66.640632%");

    const canvasElement = containerElement.children[0];
    expect(canvasElement).toBeInstanceOf(HTMLCanvasElement);
    expect(canvasElement).toHaveProperty("className");
    expect(canvasElement).toHaveProperty("height");
    expect(canvasElement).toHaveProperty("width");

    const imageElement = containerElement.children[1];
    expect(imageElement).toBeInstanceOf(HTMLImageElement);
    expect(imageElement).toHaveProperty("src");
    expect(imageElement).toHaveProperty("className");
    expect(imageElement.getAttribute("alt")).toEqual(altText);

    const imageStyles = window.getComputedStyle(imageElement);
    expect(imageStyles.display).not.toBe("none");
  });

  test("renders with blur disabled", () => {
    render(<Image disableBlurLayer src={testVisionaryUrl} />);
    const containerElement = screen.getByTestId(TEST_IDS.CONTAINER);
    expect(containerElement.childNodes.length).toBe(1);

    const canvasElement = screen.queryByTestId(TEST_IDS.CANVAS);
    expect(canvasElement).toBeNull();

    const imageElement = screen.queryByTestId(TEST_IDS.IMAGE);
    expect(imageElement).toBeInstanceOf(HTMLImageElement);

    const imageStyles = window.getComputedStyle(imageElement!);
    expect(imageStyles.display).not.toBe("none");
  });

  test("renders with image disabled", () => {
    render(<Image disableImageLayer src={testVisionaryUrl} />);
    const containerElement = screen.getByTestId(TEST_IDS.CONTAINER);
    expect(containerElement.childNodes.length).toBe(1);

    const canvasElement = screen.queryByTestId(TEST_IDS.CANVAS);
    expect(canvasElement).toBeInstanceOf(HTMLCanvasElement);

    const imageElement = screen.queryByTestId(TEST_IDS.IMAGE);
    expect(imageElement).toBeNull();
  });

  test("renders with image hidden", () => {
    render(<Image hideImageLayer src={testVisionaryUrl} />);
    const containerElement = screen.getByTestId(TEST_IDS.CONTAINER);
    expect(containerElement.childNodes.length).toBe(2);

    const canvasElement = screen.queryByTestId(TEST_IDS.CANVAS);
    expect(canvasElement).toBeInstanceOf(HTMLCanvasElement);

    const imageElement = screen.queryByTestId(TEST_IDS.IMAGE);
    expect(imageElement).toBeInstanceOf(HTMLImageElement);

    const imageStyles = window.getComputedStyle(imageElement!);
    expect(imageStyles.display).toBe("none");
  });

  // src as a Visionary code (not URL)
  test("renders with a Visionary code", () => {
    render(<Image src={testVisionaryCode} />);

    const containerElement = screen.getByTestId(TEST_IDS.CONTAINER);
    expect(containerElement.childNodes.length).toBe(2);
    expect(containerElement).toBeInstanceOf(HTMLDivElement);

    const imageElement = screen.queryByTestId(TEST_IDS.IMAGE);
    const imageSrc = imageElement?.getAttribute("src");

    const visionaryData = parseVisionaryUrl(imageSrc as string);
    expect(visionaryData?.options.size).toBe(ImageSizeToken.lg);
  });

  test("controls image size via `size` prop", () => {
    render(<Image size={ImageSizeToken.sm} src={testVisionaryCode} />);

    const containerElement = screen.getByTestId(TEST_IDS.CONTAINER);
    expect(containerElement.childNodes.length).toBe(2);
    expect(containerElement).toBeInstanceOf(HTMLDivElement);

    const imageElement = screen.queryByTestId(TEST_IDS.IMAGE);
    const imageSrc = imageElement?.getAttribute("src");

    const visionaryData = parseVisionaryUrl(imageSrc as string);
    expect(visionaryData?.options.size).toBe(ImageSizeToken.sm);
  });

  test("`endpoint` prop specifies custom endpoint", () => {
    const visionaryUrl = generateVisionaryUrl({
      sourceHeight: 1024,
      sourceWidth: 768,
      url: "n4bMJ3r",
    });

    render(<Image endpoint="https://b.static.notacdn.net" src={visionaryUrl!} />);

    const imageElement = screen.queryByTestId(TEST_IDS.IMAGE);
    const imageSrc = imageElement?.getAttribute("src");

    expect(imageSrc).toContain("https://b.static.notacdn.net");
  });

  test("style props get applied to container", () => {
    render(<Image src={testVisionaryCode} style={{ border: "2px dashed #ee1", marginTop: 42 }} />);

    const containerElement = screen.getByTestId(TEST_IDS.CONTAINER);
    const styles = containerElement.getAttribute("style");

    expect(styles).toMatch(/border:.*dashed.*#ee1/);
    expect(styles).toMatch(/margin-top:\s*42px/);
  });

  test("can display at max resolution", () => {
    render(<Image size={ImageSizeToken["4k"]} src={testVisionaryUrl} />);

    const containerElement = screen.getByTestId(TEST_IDS.CONTAINER);
    const containerStyles = window.getComputedStyle(containerElement);

    expect(containerStyles.maxWidth).toBe("3840px");
    expect(containerStyles.getPropertyValue("aspect-ratio")).toBe("1.5");
    expect(containerStyles.getPropertyValue("--v-ar")).toBe("66.666667%");
  });

  describe("test `lazy` prop", () => {
    test("renders lazy images", () => {
      render(<Image lazy src={testVisionaryCode} />);

      const imageElement = screen.getByTestId(TEST_IDS.IMAGE);

      expect(imageElement.getAttribute("loading")).toBe("lazy");
    });

    test("renders eager images", () => {
      render(<Image lazy={false} src={testVisionaryCode} />);

      const imageElement = screen.getByTestId(TEST_IDS.IMAGE);

      expect(imageElement.getAttribute("loading")).toBe("eager");
    });
  });

  test("`debug` prop appends data-fileid to element", () => {
    const expectedFileId = "w1zi1bC1Yf";

    render(<Image debug src={testVisionaryUrl} />);

    const containerElement = screen.getByTestId(TEST_IDS.CONTAINER);

    expect(containerElement.getAttribute("data-fileid")).toEqual(expectedFileId);
  });

  describe("Callbacks", () => {
    test("handles onClick properly", () => {
      const spyFn = vi.fn();

      render(<Image onClick={spyFn} src={testVisionaryUrl} />);

      const imageElement = screen.queryByTestId(TEST_IDS.IMAGE);

      fireEvent.click(imageElement!);

      expect(spyFn).toHaveBeenCalledOnce();
    });

    test("handles onError properly", () => {
      const spyFn = vi.fn();

      render(<Image onError={spyFn} src={testVisionaryUrl} />);

      const imageElement = screen.queryByTestId(TEST_IDS.IMAGE);

      fireEvent.error(imageElement!);

      expect(spyFn).toHaveBeenCalledOnce();
    });

    test("handles onLoad properly", () => {
      const spyFn = vi.fn();

      render(<Image onLoad={spyFn} src={testVisionaryUrl} />);

      const imageElement = screen.queryByTestId(TEST_IDS.IMAGE);

      fireEvent.load(imageElement!);

      expect(spyFn).toHaveBeenCalledOnce();
    });
  });

  describe("Style overrides", () => {
    test("user can override max-width", () => {
      render(<Image src={testVisionaryUrl} style={{ maxWidth: 220 }} />);

      const containerElement = screen.getByTestId(TEST_IDS.CONTAINER);
      const containerStyles = window.getComputedStyle(containerElement);

      expect(containerStyles.maxWidth).toBe("220px");
    });

    test.only("user can specify custom aspect-ratio", () => {
      const customAspectRatio = "3 / 1";
      render(<Image src={testVisionaryUrl} style={{ aspectRatio: customAspectRatio }} />);

      const containerElement = screen.getByTestId(TEST_IDS.ASPECT_RATIO_WRAPPER);
      const containerStyles = window.getComputedStyle(containerElement);

      expect(containerStyles.getPropertyValue("aspect-ratio")).toBe(customAspectRatio);
    });
  });

  describe("Using ordinary (non-visionary) URL ", () => {
    test("renders fallback <img /> element when src is not visionary", () => {
      const testClassname = "v7y_tester";
      const nonVisionaryImgSrc =
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/View_of_the_ISS_taken_during_Crew-2_flyaround_%28ISS066-E-081311%29.jpg/1280px-View_of_the_ISS_taken_during_Crew-2_flyaround_%28ISS066-E-081311%29.jpg";

      render(<Image className={testClassname} src={nonVisionaryImgSrc} />);

      const containerElement = screen.queryByTestId(TEST_IDS.CONTAINER);
      const canvasElement = screen.queryByTestId(TEST_IDS.CANVAS);
      const imgElement = screen.getByRole("img");

      expect(containerElement).toBeNull();
      expect(canvasElement).toBeNull();
      expect(imgElement).toBeInstanceOf(HTMLImageElement);
      expect(imgElement.className).toContain(testClassname);
    });
  });

  describe("bad input cases", () => {
    test("should not render with invalid src", () => {
      render(<Image src="jh34kj3h2" />);

      const containerElement = screen.queryByTestId(TEST_IDS.CONTAINER);

      expect(containerElement).toBeNull();
    });

    test("should not render with empty src", () => {
      render(<Image src="" />);

      const containerElement = screen.queryByTestId(TEST_IDS.CONTAINER);

      expect(containerElement).toBeNull();
    });

    test("should not render with null src", () => {
      render(<Image src={null as unknown as string} />);

      const containerElement = screen.queryByTestId(TEST_IDS.CONTAINER);

      expect(containerElement).toBeNull();
    });
  });
});
