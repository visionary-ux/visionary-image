import { CSSProperties } from 'react';
import { ImageSizeToken } from 'visionary-url';
import { JSX as JSX_2 } from 'react/jsx-runtime';
import { VisionaryImageOptions } from 'visionary-url';

declare const Image_2: ({ alt: altText, bgColorAlpha, className, debug, disableBlurLayer, disableImageLayer, endpoint, height: userHeight, hideImageLayer, lazy, onClick, onError, onLoad, preventDrag, preventSelection, punch, size, src, style: userStyles, width: userWidth, }: VisionaryImageProps) => JSX_2.Element;
export { Image_2 as Image }

export declare interface VisionaryImageProps {
    /**
     * Image `alt` tag; Adding alt text to images is *highly* recommended to accommodate accessible devices and improve discoverability.
     */
    alt?: string;
    /**
     * Base layer (background color) alpha channel (default: 0.7)
     */
    bgColorAlpha?: number;
    /** Classname applied to the container `div` or the fallback `img` element. */
    className?: string;
    /**
     * Print debug info (Visionary data, render times) to the console
     */
    debug?: boolean;
    /**
     * Disable rendering of blur layer
     */
    disableBlurLayer?: boolean;
    /**
     * Disable rendering of image layer
     */
    disableImageLayer?: boolean;
    /** Custom endpoint for image URLs (when using `generateVisionaryUrl()`) */
    endpoint?: string;
    height?: number | string;
    /**
     * Hides the image layer via CSS
     */
    hideImageLayer?: boolean;
    /**
     * Should image load lazily (default: true)
     */
    lazy?: boolean;
    /**
     * Callback function to run after click
     */
    onClick?: () => void;
    /**
     * Callback function to run if image resource failed to load
     */
    onError?: () => void;
    /**
     * Callback function to run after image load
     */
    onLoad?: () => void;
    options?: VisionaryImageOptions;
    /**
     * Prevents user from dragging the image element
     */
    preventDrag?: boolean;
    /**
     * Prevents user from highlighting the image element
     */
    preventSelection?: boolean;
    /**
     * Blurhash punch parameter (default: 1)
     */
    punch?: number;
    /** If specified, overrides the size specified in a Visionary URL */
    size?: ImageSizeToken;
    /**
     * Image `src` prop; if `src` contains a Visionary code, a Visionary image will be rendered, otherwise we fall back to a native `<img />` tag
     */
    src: string;
    /** Styles are applied to the Visionary container (or the fallback <img> if a Visionary Image is not rendered) */
    style?: CSSProperties;
    width?: number | string;
}

export { }
