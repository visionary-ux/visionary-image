import loaderSource from "synthetic:visionary-loader";

import { escapeAttr } from "./lib/util";

/** Minified source of the inline loader script */
export const LOADER_SCRIPT: string = loaderSource;

export interface LoaderScriptOptions {
  /** Enable debug logging (`data-debug`) */
  debug?: boolean;
  /** Paint canvases as the parser reaches them (`data-eager-canvas`), recommended for images above the fold */
  eagerCanvasPaint?: boolean;
  /** CSP nonce for the inline script */
  nonce?: string;
}

/**
 * Render the loader as an inline `<script>` tag for your server-rendered `<head>`.
 * Paints blurhash canvases of server-rendered `<Image />` components before the React bundle loads.
 */
export const renderLoaderScript = (options: LoaderScriptOptions = {}): string => {
  const { debug, eagerCanvasPaint, nonce } = options;
  const attrs = [
    nonce ? ` nonce="${escapeAttr(nonce)}"` : "",
    eagerCanvasPaint ? " data-eager-canvas" : "",
    debug ? " data-debug" : "",
  ].join("");

  return `<script${attrs}>${LOADER_SCRIPT}</script>`;
};
