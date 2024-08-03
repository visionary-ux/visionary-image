import { ImageSizeToken } from "visionary-url";

/** Placeholder div background-color alpha channel */
export const BG_ALPHA = 0.7;

/** Blurhash punch value */
export const BLURHASH_PUNCH = 1;

/** Width/height of canvas element (this is stretched to fill the image background layer) */
export const CANVAS_SIZE = 24;

/** If Visionary data is present without a specified resolution, default to `lg` (1280px) */
export const DEFAULT_IMAGE_SIZE = ImageSizeToken.lg;

/** Environment */
export const NODE_ENV = process.env.NODE_ENV;
export const IS_DEVELOPMENT = NODE_ENV === "development";
export const IS_SSR = typeof document === "undefined";
export const IS_TEST = NODE_ENV === "test";
