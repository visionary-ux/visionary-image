/**
 * Blurhash utilities for manual initialization.
 *
 * Usage:
 * ```js
 * import { initBlurhashCanvases } from 'visionary-image/blurhash';
 * document.addEventListener('DOMContentLoaded', () => initBlurhashCanvases());
 * ```
 */
export {
  getOrDecodePixels,
  getPixelCache,
  getRenderedCanvasSet,
  initBlurhashCanvases,
  initOnDOMLoaded,
} from "./lib/canvas";
