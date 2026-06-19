/**
 * Early Loader - renders blurhash to server-rendered canvases at DOMContentLoaded.
 * Import for side effects. Use with React component for faster blurhash display.
 *
 * Usage:
 * ```js
 * import 'visionary-image/loader';
 * ```
 */
import { initOnDOMLoaded } from "./lib/canvas";
initOnDOMLoaded();
