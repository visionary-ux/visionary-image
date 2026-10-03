/**
 * Inline loader, built as an IIFE and exposed as a string by `visionary-image/server`.
 *
 * Attributes:
 *   data-debug          - Enable debug logging
 *   data-eager-canvas   - Paint canvases as the parser reaches them instead of at DOMContentLoaded
 */
import { initEagerCanvasPaint, initOnDOMLoaded } from "./canvas";

// `document.currentScript` resolves while the script is executing; config should be read here
const scriptTag = document.currentScript as HTMLScriptElement | null;

const debug = scriptTag?.hasAttribute("data-debug") ?? false;
const eagerCanvasPaint = scriptTag?.hasAttribute("data-eager-canvas") ?? false;

if (eagerCanvasPaint) {
  initEagerCanvasPaint(debug);
} else {
  initOnDOMLoaded(debug);
}
