/**
 * Inline loader, built as an IIFE and exposed as a string by `visionary-image/server`.
 *
 * Attributes:
 *   data-debug               - Enable debug logging
 *   data-eager-canvas        - Paint `priority` canvases as the parser reaches them
 *   data-eager-canvas="all"  - Paint every canvas during parsing, up to a 2ms budget
 */
import { initEagerCanvasPaint, initOnDOMLoaded } from "./canvas";

// `document.currentScript` resolves while the script is executing; config should be read here
const scriptTag = document.currentScript as HTMLScriptElement | null;

const debug = scriptTag?.hasAttribute("data-debug") ?? false;
const eagerCanvasPaint = scriptTag?.getAttribute("data-eager-canvas");

if (eagerCanvasPaint === null) {
  initOnDOMLoaded(debug);
} else {
  initEagerCanvasPaint(debug, eagerCanvasPaint === "all" ? "all" : "priority");
}
