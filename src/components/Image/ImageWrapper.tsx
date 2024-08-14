import type { CSSProperties, ReactNode } from "react";

interface ImageWrapperProps {
  aspectRatio: CSSProperties["aspectRatio"];
  children: ReactNode;
}

const imageWrapperStyles: CSSProperties = {
  overflow: "hidden",
};

/**
 * Wrapper component that applies a user-specified aspect ratio.
 * - Wraps the usual `<Image />` component when the user specifies `aspect-ratio` via the `style` prop.
 * - Position the inner image and blur by using `top`/`left` or `transform: translateX/translateY` on the `<Image />` component.
 * - Storybook example: https://visionary-ux.github.io/visionary-image/?path=/story/visionary-image--custom-aspect-ratio
 */
export const ImageWrapper = ({ aspectRatio, children }: ImageWrapperProps) => (
  <div style={{ aspectRatio, ...imageWrapperStyles }}>{children}</div>
);
