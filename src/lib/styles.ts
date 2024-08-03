import type { CSSProperties } from "react";

const absoluteCoverStyles: CSSProperties = {
  bottom: 0,
  left: 0,
  position: "absolute",
  right: 0,
  top: 0,
};

/** We apply CSS on the image directly via the `style` prop, as a delay in .css file loading can cause a FOUC. */
export const imageStyles: CSSProperties = {
  ...absoluteCoverStyles,
  maxHeight: "100%",
  maxWidth: "100%",
};

export const canvasElementStyles: CSSProperties = {
  ...absoluteCoverStyles,
  height: "100%",
  width: "100%",
};
