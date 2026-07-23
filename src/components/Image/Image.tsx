import classnames from "classnames";
import { useCallback, useId, useMemo, useRef } from "react";
import type {
  CSSProperties,
  DetailedHTMLProps,
  HTMLAttributes,
  ImgHTMLAttributes,
  SyntheticEvent,
} from "react";

import { ImageWrapper } from "./ImageWrapper";

import { useInView } from "../../hook/useInView";
import { useIsomorphicLayoutEffect } from "../../hook/useIsomorphicLayoutEffect";
import { getRenderedCanvasSet, getOrDecodePixels } from "../../lib/canvas";
import { BG_ALPHA, BLURHASH_PUNCH, CANVAS_SIZE } from "../../lib/constants";
import { logDebug } from "../../lib/logger";
import { computeImageState } from "../../lib/state";
import { canvasElementStyles, getImageStyles } from "../../lib/styles";
import { TEST_IDS } from "../../lib/test";
import { getDebugIdProp, getTestIdProp, round } from "../../lib/util";

import type { ImageStateConfig, VisionaryImageProps } from "../../types/visionary-image";

import styles from "./Image.module.scss";

export const Image = ({
  alt: altText,
  bgColorAlpha = BG_ALPHA,
  className,
  debug = false,
  disableBlurLayer = false,
  disableImageLayer = false,
  endpoint,
  height: userHeight,
  hideImageLayer = false,
  lazy = true,
  priority = false,
  onClick,
  onError,
  onLoad,
  preventDrag = false,
  preventSelection = false,
  punch = BLURHASH_PUNCH,
  size,
  src,
  style: userStyles,
  width: userWidth,
}: VisionaryImageProps) => {
  const imageState = useMemo(() => {
    const config: ImageStateConfig = {
      debug,
      disableBlurLayer,
      endpoint,
      size,
    };
    return computeImageState(src, config, bgColorAlpha, punch);
  }, [bgColorAlpha, debug, disableBlurLayer, endpoint, punch, size, src]);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  /** Track visibility with 200px margin so blurhash renders before entering viewport */
  const [containerRef, isVisible] = useInView({ rootMargin: "200px" });
  /** Unique key for this canvas instance, stable across server/client rendering */
  const canvasKey = useId();
  /** Track the latest blurhash+punch rendered for this instance */
  const lastRenderKeyRef = useRef<string | null>(null);

  useIsomorphicLayoutEffect(
    function renderBlurhashCanvas() {
      const canvas = canvasRef.current;
      const blurhash = imageState?.blurhash;

      // Reset paint tracking when the canvas is removed so a replacement canvas gets painted
      if (disableBlurLayer) {
        lastRenderKeyRef.current = null;
        return;
      }
      // Canvas element not ready
      if (!canvas) {
        return;
      }
      // No blurhash data available
      if (!blurhash) {
        console.error("[visionary-image] No blurhash in imageState, cannot render canvas");
        return;
      }
      const renderKey = `${blurhash}:${punch}`;
      // For lazy images (non-priority), defer blurhash until approaching viewport
      if (!priority && lazy && !isVisible) {
        if (debug) {
          logDebug("Lazy image not yet visible, deferring blurhash render");
        }
        return;
      }
      // Skip redundant repaint
      if (lastRenderKeyRef.current === renderKey) {
        return;
      }

      // Prevent duplicate first paint from SSR/loader; subsequent blurhash changes can redraw
      if (lastRenderKeyRef.current === null) {
        const renderedSet = getRenderedCanvasSet();
        // Loader renders with default punch, so only skip the first paint when punch matches.
        if (renderedSet.has(canvasKey) && punch === BLURHASH_PUNCH) {
          if (debug) {
            logDebug("Canvas already rendered by early loader, skipping");
          }
          lastRenderKeyRef.current = renderKey;
          return;
        }
      }

      const tStart = performance.now();
      const pixels = getOrDecodePixels(blurhash, CANVAS_SIZE, punch);
      if (!pixels) {
        console.error("[visionary-image] Could not decode blurhash pixels");
        return;
      }
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        console.error("[visionary-image] Cannot access canvas 2d context");
        return;
      }
      const imageData = ctx.createImageData(CANVAS_SIZE, CANVAS_SIZE);
      imageData.data.set(pixels);
      ctx.putImageData(imageData, 0, 0);
      lastRenderKeyRef.current = renderKey;

      if (debug) {
        const tElapsed = performance.now() - tStart;
        logDebug(`Canvas render time: ${round(tElapsed, 1)} ms`);
      }
    },
    [canvasKey, imageState?.blurhash, punch, debug, disableBlurLayer, lazy, priority, isVisible]
  );

  const handleImageError = useCallback(
    (error: SyntheticEvent<HTMLImageElement, Event>) => {
      if (debug) {
        logDebug("Image load error ", error);
      }
      if (onError) {
        onError();
      }
    },
    [debug, onError]
  );

  /** Props for both the Visionary <img /> element as well as the fallback <img /> */
  const sharedImgProps: ImgHTMLAttributes<HTMLImageElement> = {
    alt: altText,
    fetchPriority: priority ? "high" : undefined,
    loading: priority || !lazy || isVisible ? "eager" : "lazy",
    onLoad,
  };

  /**
   * Blurhash URL data not detected, render fallback <img />
   */
  if (!imageState) {
    if (debug) {
      logDebug("Not a Blurhash URL, rendering fallback <img />");
    }
    const fallbackImgProps: ImgHTMLAttributes<HTMLImageElement> = {
      ...sharedImgProps,
      className,
      height: userHeight,
      onClick,
      onError,
      src: src || undefined,
      style: userStyles,
      width: userWidth,
    };
    // eslint-disable-next-line jsx-a11y/alt-text -- `imgProps` includes alt tag
    return <img {...fallbackImgProps} />;
  }

  const containerClasses = classnames(styles.container, className, {
    [styles.preventDrag]: !!preventDrag,
    [styles.preventSelection]: !!preventSelection,
  });
  /** Aspect ratio percentage to be applied as padding-top */
  const customAspectRatioCssVariable = {
    "--v-ar": imageState.arPaddingTop,
  } as CSSProperties;
  const containerStyles: CSSProperties = {
    ...customAspectRatioCssVariable,
    ...userStyles,
    aspectRatio: imageState.aspectRatio,
    backgroundColor: imageState?.backgroundColor ?? undefined,
    maxWidth: imageState.maxWidth,
    position: "relative",
    width: "100%",
  };
  // Apply user-specified container width
  if (userWidth) {
    containerStyles.width = userWidth;
  }
  // Apply user-specified container height
  if (userHeight) {
    containerStyles.height = userHeight;
  }
  // Allow user to override container's max-width
  if (userStyles?.maxWidth) {
    containerStyles.maxWidth = userStyles.maxWidth;
  }
  const containerProps: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> = {
    onClick,
  };
  const imageStyles = getImageStyles(hideImageLayer);
  const imageComponent = (
    <div
      className={containerClasses}
      ref={containerRef}
      style={containerStyles}
      {...getDebugIdProp(imageState.url, debug)}
      {...getTestIdProp(TEST_IDS.CONTAINER)}
      {...containerProps}
    >
      {!disableBlurLayer && (
        <canvas
          data-v7y-key={canvasKey}
          height={CANVAS_SIZE}
          ref={canvasRef}
          style={canvasElementStyles}
          width={CANVAS_SIZE}
          {...getTestIdProp(TEST_IDS.CANVAS)}
        />
      )}

      {!disableImageLayer && (
        // eslint-disable-next-line jsx-a11y/alt-text -- (`sharedImgProps` includes alt tag)
        <img
          {...sharedImgProps}
          {...getTestIdProp(TEST_IDS.IMAGE)}
          onError={handleImageError}
          src={imageState.src}
          style={imageStyles}
        />
      )}
    </div>
  );

  // Apply user-specified aspect ratio via <ImageWrapper>
  if (userStyles?.aspectRatio) {
    return <ImageWrapper aspectRatio={userStyles.aspectRatio}>{imageComponent}</ImageWrapper>;
  }
  return imageComponent;
};
