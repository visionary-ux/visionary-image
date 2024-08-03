import type { CSSProperties } from "react";
import { ImageSizeToken } from "visionary-url";
import type { VisionaryImageFields, VisionaryImageOptions } from "visionary-url";

export interface VisionaryImageProps {
  /**
   * Image `alt` tag; Adding alt text to images is *highly* recommended to accommodate accessible devices and improve discoverability.
   */
  alt?: string;
  /**
   * Base layer (background color) alpha channel (default: 0.7)
   */
  bgColorAlpha?: number;
  /** Classname applied to the container `div` or the fallback `img` element. */
  className?: string;
  /**
   * Print debug info (Visionary data, render times) to the console
   */
  debug?: boolean;
  /**
   * Disable rendering of blur layer
   */
  disableBlurLayer?: boolean;
  /**
   * Disable rendering of image layer
   */
  disableImageLayer?: boolean;
  /** Custom endpoint for image URLs (when using `generateVisionaryUrl()`) */
  endpoint?: string;
  height?: number | string;
  /**
   * Hides the image layer via CSS
   */
  hideImageLayer?: boolean;
  /**
   * Should image load lazily (default: true)
   */
  lazy?: boolean;
  /**
   * Callback function to run after click
   */
  onClick?: () => void;
  /**
   * Callback function to run if image resource failed to load
   */
  onError?: () => void;
  /**
   * Callback function to run after image load
   */
  onLoad?: () => void;
  options?: VisionaryImageOptions;
  /**
   * Prevents user from dragging the image element
   */
  preventDrag?: boolean;
  /**
   * Prevents user from highlighting the image element
   */
  preventSelection?: boolean;
  /**
   * Blurhash punch parameter (default: 1)
   */
  punch?: number;
  /** If specified, overrides the size specified in a Visionary URL */
  size?: ImageSizeToken;
  /**
   * Image `src` prop; if `src` contains a Visionary code, a Visionary image will be rendered, otherwise we fall back to a native `<img />` tag
   */
  src: string;
  /** Styles are applied to the Visionary container (or the fallback <img> if a Visionary Image is not rendered) */
  style?: CSSProperties;
  width?: number | string;
}

export interface ImageState extends VisionaryImageFields {
  /** Aspect ratio of the image as a percentage, applied as padding-top */
  arPaddingTop?: string;

  // TODO: Rename to usableAspectRatio or remove.
  // - Note that aspect ratios will differ slightly between image resizes
  aspectRatio: number;

  /** Background color of the container div */
  backgroundColor?: string;

  /** Maximum width (in pixels) supported by this image */
  maxWidth: number;

  /** Holds blurhash pixel data */
  pixels?: Uint8ClampedArray;

  /** Image URL (original or computed). Passed to `<Image/>` `src` prop */
  src: string;
}

export interface ImageStateConfig extends Pick<VisionaryImageOptions, "debug" | "endpoint" | "size"> {
  disableBlurLayer?: boolean;
}
