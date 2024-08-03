import { decodeBlurHash } from "fast-blurhash";
import { generateVisionaryUrl, isBase64UrlEncoded, parseVisionaryString } from "visionary-url";
import { IMAGE_SIZES } from "visionary-url/constants";

import { BG_ALPHA, BLURHASH_PUNCH, CANVAS_SIZE, DEFAULT_IMAGE_SIZE, IS_SSR } from "./constants";
import { logDebug } from "./logger";
import { generateRgbaString, hexToRGB, getMaxEdgeLength, round, createUrl, swapUrlOrigin } from "./util";

import type { ImageState, ImageStateConfig } from "../types/visionary-image";

/**
 * Parses `imageSrc` for Visionary data. If present, calculates image properties, decodes blurhash
 * string into canvas pixel data.
 * @returns ImageState | null
 */
export const computeImageState = (
  /** Input value for the `<Image/> `src` prop */
  imageSrc: string,
  /** These options will override those set in the URL */
  userConfig: ImageStateConfig = {},
  bgColorAlpha = BG_ALPHA,
  punch = BLURHASH_PUNCH
): ImageState | null => {
  if (!imageSrc) {
    return null;
  }
  try {
    if (userConfig.debug) {
      logDebug("input imageSrc:", imageSrc);
    }
    const visionaryData = parseVisionaryString(imageSrc);
    if (userConfig.debug) {
      logDebug("Visionary URL data: ", visionaryData);
    }
    if (!visionaryData) {
      throw new Error("Could not parse Visionary URL");
    }
    const { fields, options } = visionaryData;
    if (fields.sourceWidth < 1 || fields.sourceHeight < 1) {
      throw new Error("Invalid image dimensions");
    }
    const sourceAspectRatio = fields.sourceWidth / fields.sourceHeight;
    /** The size at which the image should render */
    const imageSize = userConfig?.size ?? options.size ?? DEFAULT_IMAGE_SIZE;
    const size = IMAGE_SIZES[imageSize];
    let maxEdgeLength = 0,
      maxWidth = 0,
      /** Note: `resizedAspectRatio` may differ slightly from `sourceAspectRatio` */
      resizedAspectRatio = 0;

    /** 'Landscape' aspect ratio (width >= height) */
    if (sourceAspectRatio >= 1) {
      maxWidth = maxEdgeLength = getMaxEdgeLength(size, fields.sourceWidth);
      const height = round(maxWidth / sourceAspectRatio);
      resizedAspectRatio = round(maxWidth / height, 6);
    } else {
      /** 'Portrait' aspect ratio (height > width) */
      maxEdgeLength = getMaxEdgeLength(size, fields.sourceHeight); // this is max-height
      maxWidth = round(maxEdgeLength * sourceAspectRatio);
      resizedAspectRatio = round(maxWidth / maxEdgeLength, 6);
    }
    const arPercentage = round(100 / resizedAspectRatio, 6);
    const imageState: ImageState = {
      ...fields,
      arPaddingTop: `${arPercentage}%`,
      aspectRatio: resizedAspectRatio,
      maxWidth,
      src: imageSrc,
    };
    /** Override `imageState.src` if Visionary field `url` is a URL  */
    const urlFieldAsURL = createUrl(fields.url);
    if (urlFieldAsURL) {
      imageState.src = urlFieldAsURL.toString();
    }
    // if `imageSrc` isn't a URL and `url` field is a file ID, generate a URL for `imageState.src`
    else if (!createUrl(imageSrc) && isBase64UrlEncoded(fields.url)) {
      const generatedUrl = generateVisionaryUrl(fields, {
        endpoint: userConfig.endpoint,
        size: imageSize,
      });
      if (generatedUrl) {
        imageState.src = generatedUrl;
      }
    }
    if (userConfig.endpoint) {
      imageState.src = swapUrlOrigin(imageState.src, userConfig.endpoint);
    }
    const rgb = fields.bcc ? hexToRGB(fields.bcc) : null;
    if (rgb) {
      imageState.backgroundColor = generateRgbaString(rgb, bgColorAlpha);
    }
    /** Decode blurhash from string and create pixel data */
    if (!IS_SSR && fields.blurhash && !userConfig.disableBlurLayer) {
      const tStart = performance.now();
      const decodedBlurhash = decodeBlurHash(fields.blurhash, CANVAS_SIZE, CANVAS_SIZE, punch);
      const timeElapsed = performance.now() - tStart;
      if (userConfig.debug) {
        logDebug(`Blurhash decode time: ${round(timeElapsed, 1)} ms`);
      }
      if (decodedBlurhash) {
        imageState.pixels = decodedBlurhash;
      }
    }
    if (userConfig.debug) {
      logDebug("Visionary Image state: ", imageState);
    }
    return imageState;
  } catch (err) {
    return null;
  }
};
