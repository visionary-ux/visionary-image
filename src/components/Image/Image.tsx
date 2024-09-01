import classnames from "classnames";
import { useCallback, useMemo, useRef } from "react";
import type {
  CSSProperties,
  DetailedHTMLProps,
  HTMLAttributes,
  ImgHTMLAttributes,
  SyntheticEvent,
} from "react";
import { useInView } from "react-hook-inview";

import { ImageWrapper } from "./ImageWrapper";

import { BG_ALPHA, BLURHASH_PUNCH, CANVAS_SIZE } from "../../lib/constants";
import { useIsomorphicLayoutEffect } from "../../lib/hook";
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
  const [containerRef, isVisible] = useInView();

  useIsomorphicLayoutEffect(
    function renderBlurhashCanvas() {
      /** Wait until canvas and blurhash data are ready */
      const isPending = !canvasRef.current || !imageState?.blurhash;
      if (isPending) {
        return;
      }
      if (!imageState.pixels) {
        console.warn("No pixel data passed in, skipping");
        return;
      }
      const tStart = performance.now();
      const canvasRenderingContext = canvasRef.current.getContext("2d");
      if (!canvasRenderingContext) {
        console.warn("Cannot access canvasRenderingContext, skipping");
        return;
      }
      const imageData = canvasRenderingContext.createImageData(CANVAS_SIZE, CANVAS_SIZE);
      if (!imageData) {
        console.warn("Could not create ImageData on CanvasRenderingContext");
        return;
      }
      imageData.data.set(imageState.pixels);
      canvasRenderingContext.putImageData(imageData, 0, 0);

      if (debug) {
        const tElapsed = performance.now() - tStart;
        logDebug(`Canvas render time: ${round(tElapsed, 1)} ms`);
      }
    },
    [imageState?.blurhash, imageState?.pixels, debug]
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
    loading: !lazy || isVisible ? "eager" : "lazy",
    onLoad,
  };

  /**
   * Visionary data not detected, render fallback <img />
   */
  if (!imageState) {
    if (debug) {
      logDebug("Not a Visionary URL, rendering fallback <img />");
    }
    const fallbackImgProps: ImgHTMLAttributes<HTMLImageElement> = {
      ...sharedImgProps,
      className,
      height: userHeight,
      onClick,
      onError,
      src,
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
      // style={{ aspectRatio }}
      {...getDebugIdProp(imageState.url, debug)}
      {...getTestIdProp(TEST_IDS.CONTAINER)}
      {...containerProps}
    >
      {!disableBlurLayer && (
        <canvas
          height={CANVAS_SIZE}
          ref={canvasRef}
          style={canvasElementStyles}
          width={CANVAS_SIZE}
          {...getTestIdProp(TEST_IDS.CANVAS)}
        />
      )}

      {!disableImageLayer && (
        // eslint-disable-next-line jsx-a11y/alt-text -- `sharedImgProps` includes alt tag
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
