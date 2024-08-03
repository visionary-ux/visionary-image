import { IS_DEVELOPMENT, IS_TEST } from "./constants";

export interface RGB {
  b: number;
  g: number;
  r: number;
}

/** Creates a URL object from input `url`, returning null if input is not a url. */
export const createUrl = (url: string): URL | null => {
  try {
    return new URL(url);
  } catch (_) {
    return null;
  }
};

export const generateRgbaString = (rgb: RGB, alpha: number) => `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha})`;

export const getTestIdProp = (id: string) => {
  if (IS_DEVELOPMENT || IS_TEST) {
    return {
      "data-testid": id,
    };
  }
  return {};
};

export const getDebugIdProp = (fileId: string, debug: boolean) => {
  if (debug) {
    return {
      "data-fileid": fileId,
    };
  }
  return {};
};

export const getMaxEdgeLength = (formatWidth: number, sourceWidth: number): number => {
  // Use formatWidth (e.g. sm, md, lg) as max-width unless source is too low-res
  return Math.min(formatWidth, sourceWidth);
};

export const hexToRGB = (hex: string): RGB | null => {
  let color = hex.replace(/^#/, "");
  if (color.length !== 3 && color.length !== 6) {
    return null;
  }
  // If it's in the short form (07F), convert it to the long form (0077FF)
  if (color.length === 3) {
    color = `${color[0]}${color[0]}${color[1]}${color[1]}${color[2]}${color[2]}`;
  }
  const r = parseInt(color.slice(0, 2), 16);
  const g = parseInt(color.slice(2, 4), 16);
  const b = parseInt(color.slice(4, 6), 16);
  return { b, g, r };
};

export const round = (number: number, precision = 0): number => {
  const factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
};

export const swapUrlOrigin = (url: string, endpoint: string): string => {
  const imageUrl = createUrl(url);
  const newUrl = createUrl(endpoint);
  if (!imageUrl || !newUrl) {
    return url;
  }
  newUrl.pathname = imageUrl.pathname;
  newUrl.search = imageUrl.search;
  return newUrl.toString();
};
