import { decodeBlurHash } from "fast-blurhash";
import { generateBlurhashUrl, isBase64UrlEncoded, parseVisionaryString } from "blurhash-url";
import type { GenerateBlurhashUrlInput } from "blurhash-url";
import { IMAGE_SIZES } from "blurhash-url/constants";

import { BG_ALPHA, BLURHASH_PUNCH, CANVAS_SIZE, DEFAULT_IMAGE_SIZE, IS_SSR } from "./constants";
import { logDebug } from "./logger";
import { generateRgbaString, hexToRGB, getMaxEdgeLength, round, createUrl, swapUrlOrigin } from "./util";

import type { ImageState, ImageStateConfig } from "../types/visionary-image";

/**
 * Parses `imageSrc` for Blurhash URL data. If present, calculates image properties, decodes blurhash
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
    const blurhashUrlData = parseVisionaryString(imageSrc);
    if (userConfig.debug) {
      logDebug("Blurhash URL data: ", blurhashUrlData);
    }
    if (!blurhashUrlData) {
      throw new Error("Could not parse Blurhash URL");
    }
    const { fields, options } = blurhashUrlData;
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
    /** Override `imageState.src` if Blurhash URL `url` field is a URL  */
    const urlFieldAsURL = createUrl(fields.url);
    if (urlFieldAsURL) {
      imageState.src = urlFieldAsURL.toString();
    }
    // if `imageSrc` isn't a URL and `url` field is a file ID, generate a URL for `imageState.src`
    else if (!createUrl(imageSrc) && isBase64UrlEncoded(fields.url)) {
      const generateInput: GenerateBlurhashUrlInput = {
        altText: fields.altText,
        bcc: fields.bcc,
        blurhash: fields.blurhash,
        sourceHeight: fields.sourceHeight,
        sourceWidth: fields.sourceWidth,
        url: fields.url,
      };
      const generatedUrl = generateBlurhashUrl(generateInput, {
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
  } catch {
    return null;
  }
};
