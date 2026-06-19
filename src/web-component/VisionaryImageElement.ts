import { decodeBlurHash } from "fast-blurhash";
import { parseVisionaryString } from "visionary-url";

import { getPixelCache } from "../lib/canvas";
import { BG_ALPHA, BLURHASH_PUNCH, CANVAS_SIZE } from "../lib/constants";
import { generateRgbaString, hexToRGB } from "../lib/util";

/** Shared IntersectionObserver for all lazy visionary-image elements */
let lazyObserver: IntersectionObserver | null = null;

function getLazyObserver(): IntersectionObserver {
  if (!lazyObserver) {
    lazyObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target as VisionaryImageElement;
            element.renderBlurhashNow();
            lazyObserver?.unobserve(element);
          }
        });
      },
      { rootMargin: "200px" } // Render blurhash 200px before entering viewport
    );
  }
  return lazyObserver;
}

/**
 * Web Component for Visionary Image with lazy blurhash rendering.
 *
 * Usage:
 * ```html
 * <visionary-image
 *   src="https://example.com/image/..."
 *   alt="Description"
 *   lazy="true"
 * ></visionary-image>
 * ```
 *
 * For lazy="true" (default), blurhash renders when element approaches viewport (200px margin).
 * For lazy="false", blurhash renders immediately in connectedCallback.
 */
export class VisionaryImageElement extends HTMLElement {
  private canvas: HTMLCanvasElement | null = null;
  private img: HTMLImageElement | null = null;
  private container: HTMLDivElement | null = null;
  private blurhash: string | null = null;
  private hasRenderedBlurhash = false;

  static get observedAttributes() {
    return ["src", "alt", "lazy", "priority"];
  }

  connectedCallback() {
    this.render();
  }

  disconnectedCallback() {
    // Clean up observer when element is removed
    getLazyObserver().unobserve(this);
  }

  attributeChangedCallback() {
    // Re-render if attributes change after initial mount
    if (this.container) {
      this.hasRenderedBlurhash = false;
      this.render();
    }
  }

  /** Called by IntersectionObserver when element approaches viewport */
  renderBlurhashNow() {
    if (this.hasRenderedBlurhash || !this.blurhash || !this.canvas) return;
    this.renderBlurhashToCanvas(this.blurhash);
    this.hasRenderedBlurhash = true;
  }

  private render() {
    const src = this.getAttribute("src");
    if (!src) return;

    // Parse visionary data from URL
    const visionaryData = parseVisionaryString(src);
    if (!visionaryData) {
      // Fallback: just render a regular img
      this.renderFallbackImage(src);
      return;
    }

    const { fields } = visionaryData;
    const { blurhash, sourceWidth, sourceHeight, bcc } = fields;
    const isPriority = this.getAttribute("priority") === "true";
    const isLazy = !isPriority && this.getAttribute("lazy") !== "false";

    // Store blurhash for lazy rendering
    this.blurhash = blurhash || null;

    // Calculate aspect ratio
    const aspectRatio = sourceWidth / sourceHeight;

    // Create container with background color (reserves space immediately)
    this.container = document.createElement("div");
    this.container.style.cssText = `
      position: relative;
      width: 100%;
      aspect-ratio: ${aspectRatio};
      overflow: hidden;
    `;

    // Set background color if available (shows immediately, before blurhash)
    if (bcc) {
      const rgb = hexToRGB(bcc);
      if (rgb) {
        this.container.style.backgroundColor = generateRgbaString(rgb, BG_ALPHA);
      }
    }

    // Create canvas for blurhash
    if (blurhash) {
      this.canvas = document.createElement("canvas");
      this.canvas.width = CANVAS_SIZE;
      this.canvas.height = CANVAS_SIZE;
      this.canvas.style.cssText = `
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
      `;
      this.container.appendChild(this.canvas);

      if (isLazy) {
        // Defer blurhash rendering until approaching viewport
        getLazyObserver().observe(this);
      } else {
        // Render immediately for eager loading
        this.renderBlurhashToCanvas(blurhash);
        this.hasRenderedBlurhash = true;
      }
    }

    // Create image element
    this.img = document.createElement("img");
    this.img.src = src;
    this.img.alt = this.getAttribute("alt") || "";
    this.img.loading = isLazy ? "lazy" : "eager";
    if (isPriority) {
      this.img.fetchPriority = "high";
    }
    this.img.style.cssText = `
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    `;

    this.img.onload = () => {
      // Fade out canvas after image loads
      if (this.canvas) {
        this.canvas.style.opacity = "0";
        this.canvas.style.transition = "opacity 0.3s ease-out";
      }
    };

    this.container.appendChild(this.img);

    // Clear and append
    this.innerHTML = "";
    this.appendChild(this.container);
  }

  private renderBlurhashToCanvas(blurhash: string) {
    if (!this.canvas) return;

    const ctx = this.canvas.getContext("2d");
    if (!ctx) return;

    // Use shared pixel cache
    const cache = getPixelCache();
    const cacheKey = `${blurhash}:${CANVAS_SIZE}:${BLURHASH_PUNCH}`;
    let pixels = cache.get(cacheKey);

    if (!pixels) {
      try {
        pixels = decodeBlurHash(blurhash, CANVAS_SIZE, CANVAS_SIZE, BLURHASH_PUNCH);
        cache.set(cacheKey, pixels);
      } catch (err) {
        console.warn("Blurhash decode error:", err);
        return;
      }
    }

    const imageData = ctx.createImageData(CANVAS_SIZE, CANVAS_SIZE);
    imageData.data.set(pixels);
    ctx.putImageData(imageData, 0, 0);
  }

  private renderFallbackImage(src: string) {
    this.innerHTML = "";
    const img = document.createElement("img");
    img.src = src;
    img.alt = this.getAttribute("alt") || "";
    const isPriority = this.getAttribute("priority") === "true";
    img.loading = isPriority || this.getAttribute("lazy") === "false" ? "eager" : "lazy";
    if (isPriority) {
      img.fetchPriority = "high";
    }
    img.style.cssText = "width: 100%; height: auto;";
    this.appendChild(img);
  }
}

/**
 * Register the custom element. Call this once in your app:
 *
 * ```js
 * import { registerVisionaryImage } from 'visionary-image/web-component';
 * registerVisionaryImage();
 * ```
 *
 * Or use the auto-registering import:
 * ```js
 * import 'visionary-image/web-component/register';
 * ```
 */
export function registerVisionaryImage(tagName = "visionary-image") {
  if (typeof customElements === "undefined") return;
  if (customElements.get(tagName)) return; // Already registered

  customElements.define(tagName, VisionaryImageElement);
}
