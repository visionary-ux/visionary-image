/**
 * Blurhash rendering utilities shared across entry points:
 *
 * - `visionary-image` (React component) - uses getRenderedCanvasSet(), getOrDecodePixels()
 * - `visionary-image/loader` (early loader) - calls initOnDOMLoaded()
 * - `visionary-image/blurhash` (manual) - exports initBlurhashCanvases()
 * - `visionary-image/server` (inline loader) - calls initEagerCanvasPaint() or initOnDOMLoaded()
 * - `visionary-image/web-component` - uses getPixelCache()
 */

import { parseVisionaryString } from "blurhash-url";
import { decodeBlurHash } from "fast-blurhash";

import { BLURHASH_PUNCH, CANVAS_SIZE, EAGER_CANVAS_BUDGET_MS } from "./constants";

declare global {
  interface Window {
    /** Set of canvas keys that have been rendered */
    V7Y_CANVAS_RENDERED?: Set<string>;
    /** Cache of decoded blurhash pixels, keyed by "blurhash:size:punch" */
    V7Y_PIXEL_CACHE?: Map<string, Uint8ClampedArray>;
  }
}

/** Returns the global set tracking rendered canvas keys */
export function getRenderedCanvasSet(): Set<string> {
  if (typeof window === "undefined") {
    return new Set();
  }
  if (!window.V7Y_CANVAS_RENDERED) {
    window.V7Y_CANVAS_RENDERED = new Set();
  }
  return window.V7Y_CANVAS_RENDERED;
}

/** Returns the global pixel cache */
export function getPixelCache(): Map<string, Uint8ClampedArray> {
  if (typeof window === "undefined") {
    return new Map();
  }
  if (!window.V7Y_PIXEL_CACHE) {
    window.V7Y_PIXEL_CACHE = new Map();
  }
  return window.V7Y_PIXEL_CACHE;
}

/** Generate a cache key for decoded pixels */
function getPixelCacheKey(blurhash: string, size: number, punch: number): string {
  return `${blurhash}:${size}:${punch}`;
}

/** Get or decode blurhash pixels, using cache when available */
export function getOrDecodePixels(blurhash: string, size: number, punch: number): Uint8ClampedArray | null {
  const cacheKey = getPixelCacheKey(blurhash, size, punch);
  const cache = getPixelCache();

  const cached = cache.get(cacheKey);
  if (cached) {
    return cached;
  }

  try {
    const pixels = decodeBlurHash(blurhash, size, size, punch);
    cache.set(cacheKey, pixels);
    return pixels;
  } catch (err) {
    console.warn("Blurhash decode error:", err);
    return null;
  }
}

/** Shared IntersectionObserver for loader and init entry points */
let sharedObserver: IntersectionObserver | null = null;
let loaderDebug = false;

function getSharedObserver(): IntersectionObserver {
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const canvas = entry.target as HTMLCanvasElement;
            renderCanvasBlurhash(canvas, loaderDebug);
            sharedObserver?.unobserve(canvas);
          }
        });
      },
      { rootMargin: "200px" } // Render blurhash 200px before entering viewport
    );
  }
  return sharedObserver;
}

/** Render blurhash to a single canvas element */
export function renderCanvasBlurhash(canvas: HTMLCanvasElement, debug: boolean): void {
  const canvasKey = canvas.dataset.v7yKey;
  if (!canvasKey) return;

  const renderedSet = getRenderedCanvasSet();

  // Skip if already rendered
  if (renderedSet.has(canvasKey)) {
    if (debug) {
      console.log(`[visionary-loader] Canvas already rendered, skipping`);
    }
    return;
  }

  // Find sibling img element to get the Blurhash URL
  const siblingImg = canvas.parentElement?.querySelector("img") as HTMLImageElement | null;
  if (!siblingImg?.src) {
    if (debug) {
      console.log(`[visionary-loader] Canvas has no sibling img, skipping`);
    }
    return;
  }

  // Parse Blurhash URL data to extract blurhash
  const blurhashUrlData = parseVisionaryString(siblingImg.src);
  if (!blurhashUrlData?.fields?.blurhash) {
    if (debug) {
      console.log(`[visionary-loader] Sibling img is not a Blurhash URL, skipping`);
    }
    return;
  }

  const { blurhash } = blurhashUrlData.fields;

  if (debug) {
    console.log(`[visionary-loader] Rendering canvas:`, {
      blurhash: blurhash.slice(0, 20) + "...",
      punch: BLURHASH_PUNCH,
      size: CANVAS_SIZE,
    });
  }

  const pixels = getOrDecodePixels(blurhash, CANVAS_SIZE, BLURHASH_PUNCH);
  if (!pixels) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const imageData = ctx.createImageData(CANVAS_SIZE, CANVAS_SIZE);
  imageData.data.set(pixels);
  ctx.putImageData(imageData, 0, 0);

  // Track as rendered
  renderedSet.add(canvasKey);

  if (debug) {
    console.log(`[visionary-loader] Canvas rendered at ${performance.now().toFixed(1)}ms`);
  }
}

/**
 * Finds server-rendered canvas elements and renders blurhash to them.
 * Uses IntersectionObserver: above-fold renders immediately, below-fold defers.
 *
 * Exported via `visionary-image/blurhash` for manual control:
 * ```js
 * import { initBlurhashCanvases } from 'visionary-image/blurhash';
 * document.addEventListener('DOMContentLoaded', () => initBlurhashCanvases());
 * ```
 */
export function initBlurhashCanvases(debug = false): void {
  loaderDebug = debug;

  // Find all canvas elements with v7y-key (server-rendered by React)
  const canvases = document.querySelectorAll<HTMLCanvasElement>("canvas[data-v7y-key]");

  if (debug) {
    console.log(`[visionary-loader] Found ${canvases.length} canvas(es) with data-v7y-key`);
  }

  const observer = getSharedObserver();

  canvases.forEach((canvas) => {
    const canvasKey = canvas.dataset.v7yKey;
    if (canvasKey && getRenderedCanvasSet().has(canvasKey)) {
      return;
    }
    // Observe each canvas - IntersectionObserver will call renderCanvasBlurhash
    // when canvas is within 200px of viewport (fires immediately for visible ones)
    observer.observe(canvas);
  });
}

/**
 * Runs initBlurhashCanvases() at DOMContentLoaded (or immediately if already loaded).
 * Called by the loader entry point (`visionary-image/loader`).
 *
 * Usage:
 * ```js
 * import 'visionary-image/loader';
 * ```
 */
export function initOnDOMLoaded(debug = false): void {
  if (typeof document === "undefined") return;

  const run = () => {
    if (debug) {
      console.log(
        `[visionary-loader] initOnDOMLoaded running at ${performance.now().toFixed(1)}ms, readyState: ${
          document.readyState
        }`
      );
    }
    initBlurhashCanvases(debug);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }
}

export type EagerCanvasMode = "all" | "priority";

function forEachBlurhashCanvasAround(
  node: Element,
  onCanvasFound: (canvas: HTMLCanvasElement) => void
): void {
  const containers = new Set<Element>();
  const closest = node.closest("[data-v7y]");
  if (closest) {
    containers.add(closest);
  }
  node.querySelectorAll("[data-v7y]").forEach((container) => containers.add(container));

  containers.forEach((container) => {
    container.querySelectorAll<HTMLCanvasElement>("canvas[data-v7y-key]").forEach(onCanvasFound);
  });
}

function parsedSiblingImage(canvas: HTMLCanvasElement): HTMLImageElement | null {
  const img = canvas.parentElement?.querySelector("img");
  if (!(img instanceof HTMLImageElement) || !img.src) {
    return null;
  }
  return img;
}

/**
 * Paints server-rendered Blurhash canvases during HTML parsing. Changes canvas pixels only (does not
 * mutate DOM attributes to guard against React hydration warnings). Must run from a `<head>` script.
 *
 * - `priority`: paints canvases with `<img fetchpriority="high">`. Others paint near the viewport.
 * - `all`: paints every canvas until `EAGER_CANVAS_BUDGET_MS` of decode time, then only priority canvases.
 */
export function initEagerCanvasPaint(debug = false, mode: EagerCanvasMode = "priority"): void {
  if (typeof document === "undefined") return;

  loaderDebug = debug;

  if (document.readyState !== "loading") {
    initBlurhashCanvases(debug);
    return;
  }

  const budget = { spentMs: 0 };
  const scheduled = new WeakSet<HTMLCanvasElement>();

  const paintParsedCanvases = (node: Element): void => {
    forEachBlurhashCanvasAround(node, (canvas) => {
      const canvasKey = canvas.dataset.v7yKey;
      if (!canvasKey || getRenderedCanvasSet().has(canvasKey) || scheduled.has(canvas)) {
        return;
      }

      const img = parsedSiblingImage(canvas);
      if (!img) {
        return;
      }

      const isPriority = img.getAttribute("fetchpriority")?.toLowerCase() === "high";
      const withinBudget = mode === "all" && budget.spentMs < EAGER_CANVAS_BUDGET_MS;
      if (isPriority || withinBudget) {
        const start = performance.now();
        renderCanvasBlurhash(canvas, debug);
        if (mode === "all") {
          budget.spentMs += performance.now() - start;
        }
        if (getRenderedCanvasSet().has(canvasKey)) {
          return;
        }
      } else if (debug) {
        console.log("[visionary-loader] Deferring canvas until it is near the viewport");
      }

      scheduled.add(canvas);
      getSharedObserver().observe(canvas);
    });
  };

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node instanceof Element) {
          paintParsedCanvases(node);
        }
      });
    });
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });

  document.addEventListener(
    "DOMContentLoaded",
    () => {
      observer.disconnect();
      initBlurhashCanvases(debug);
    },
    { once: true }
  );
}
