import loaderSource from "synthetic:visionary-loader";

import { escapeAttr } from "./lib/util";

/** Minified source of the inline loader script */
export const LOADER_SCRIPT: string = loaderSource;

export interface LoaderScriptOptions {
  /** Enable debug logging (`data-debug`) */
  debug?: boolean;
  /**
   * `true` paints `priority` canvases as the parser reaches them and observes the rest (`data-eager-canvas`).
   * `"all"` paints every canvas during parsing, up to 2ms (`data-eager-canvas="all"`).
   */
  eagerCanvasPaint?: boolean | "all";
  /** CSP nonce for the inline script */
  nonce?: string;
}

/**
 * Render the loader as an inline `<script>` tag for your server-rendered `<head>`.
 * Paints blurhash canvases of server-rendered `<Image />` components before the React bundle loads.
 */
export const renderLoaderScript = (options: LoaderScriptOptions = {}): string => {
  const { debug, eagerCanvasPaint, nonce } = options;
  const attrs: string[] = [];

  if (nonce) {
    attrs.push(` nonce="${escapeAttr(nonce)}"`);
  }
  if (eagerCanvasPaint === "all") {
    attrs.push(` data-eager-canvas="all"`);
  } else if (eagerCanvasPaint) {
    attrs.push(" data-eager-canvas");
  }
  if (debug) {
    attrs.push(" data-debug");
  }

  return `<script${attrs.join("")}>${LOADER_SCRIPT}</script>`;
};
