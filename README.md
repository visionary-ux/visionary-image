# Visionary Image

SSR-ready Blurhash placeholders for React and Web Components that speed up pageload and improve Core Web Vitals.

![GitHub Release](https://img.shields.io/github/v/release/visionary-ux/visionary-image?color=beige) [![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/visionary-ux/visionary-image/.github%2Fworkflows%2Fci-cd-workflow.yml?branch=master)](https://github.com/visionary-ux/visionary-image/actions/workflows/ci-cd-workflow.yml?query=branch%3Amaster) [![NPM bundle size](https://deno.bundlejs.com/badge?q=visionary-image&config=%7Besbuild:%7Bexternal:%5B'react','react-dom'%5D%7D%7D)](https://bundlejs.com/?q=visionary-image&config=%7Besbuild:%7Bexternal:%5B'react','react-dom'%5D%7D%7D) ![NPM Downloads](https://img.shields.io/npm/d18m/visionary-image?color=lightgray) [![Storybook demo](https://img.shields.io/badge/-Storybook-FF4785?logo=storybook&logoColor=white)](https://visionary-ux.github.io/visionary-image/)

## Features

- **Easy Blurhash:** Get started with Blurhash in 60 seconds.
- **Layout stability**: Eliminates Cumulative Layout Shift (CLS) with true-to-size, responsive placeholders.
- **Automatic lazy loading**: Off-screen images are deferred, reducing initial pageload size and optimizing Interaction to Next Paint (INP).
- **Lightning-fast previews**: Paints placeholders in the browser's Critical Rendering Path (at First Contentful Paint, before DOMContentLoaded) using URL-embedded Blurhash data, powered by [`blurhash-url`](https://github.com/visionary-ux/blurhash-url).
- **Framework-ready**: Works with Next.js, Remix, and Vite and supports both client and server-side rendering (SSR, SSG).
- **Additional features**: Prevent image dragging; prevent user selecting image
- **Developer friendly**: Written in TypeScript and [unit tested](./src/components/Image/__test__/).
  - Check out the [interactive Storybook sandbox](https://visionary-ux.github.io/visionary-image/)
- **Search performance**: Enhance search ranking potential by improving Core Web Vitals scores.
  > "We highly recommend site owners achieve good Core Web Vitals for success with Search" — [Google Search Central](https://developers.google.com/search/docs/appearance/core-web-vitals)

### Lighthouse Performance

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://cdn.visionary.cloud/image/VGVpcWpoQkJrRCExNTY2ITM3OCEyYzNjMzQhTDEzSjB0dDdYNXQ3aGFheW9mYXlRQ2F5ZTpheQ/lg/core-web-vitals-100-dark.jpg" />
  <img src="https://cdn.visionary.cloud/image/OF9XODQ5OHJFdSE5OTYhMjIyIWY3ZmNmYSFMa1JwYXF4dW9meHVfTW9mZjZrQ3hialtheWpb/lg/core-web-vitals-100-light.jpg" alt="Example Lighthouse report showing scores of 100 across Performance, Accessibility, Best Practices, and SEO" width="640" />
</picture>

[See our PageSpeed Insights Report →](https://pagespeed.web.dev/analysis/https-visionary-cloud-gallery/w2oqqf6ldj?form_factor=desktop)

Lighthouse filmstrip showing the three-layer load: background color → Blurhash → full image

![Lighthouse report loading stage filmstrip](https://github.com/user-attachments/assets/20fd15ad-6801-4105-b75d-bf12cc8c704e)

## Installation

Install via npm, yarn, or pnpm.

```bash
pnpm add visionary-image
```

## Usage

Begin by creating a Blurhash URL. This is then passed to the `src` prop of the Image component.

### Creating a Blurhash URL

There are several ways to create a Blurhash URL.

1. Use the [Blurhash URL Maker](https://visionary.cloud/url-maker) for public image URLs
2. Use the [Drag & Drop Blurhash Generator](https://visionary.cloud/image-to-blurhash) for local image files
3. Use [blurhash-url](https://github.com/visionary-ux/blurhash-url) to programmatically generate a URL

### Render Image

```tsx
import { Image } from "visionary-image";

const ImageDetails = () => <Image alt="..." src="<Blurhash URL>" />;
```

## Component Props

| Name                              | Description                                                                                                                                                                                |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `alt` <br/> string                | Image `alt` tag. Adding alt text to images is highly recommended to accommodate accessible devices and improve discoverability.                                                            |
| `bgColorAlpha` <br/> number       | Base layer (background color) alpha channel.<br /> Default: `0.7`                                                                                                                          |
| `className` <br/> string          | Classname applied to the container `div` or the fallback `img` element.                                                                                                                    |
| `debug` <br/> boolean             | Prints handy debug info to the console (Blurhash URL data, render times).                                                                                                                  |
| `disableBlurLayer` <br/> boolean  | Disables rendering of the blur (canvas) layer.                                                                                                                                             |
| `disableImageLayer` <br/> boolean | Disables rendering of the image layer.                                                                                                                                                     |
| `height` <br/>number, string      | If set, will override internally computed image height. By default, Visionary renders optimally sized images, using the aspect-ratio and max-width placeholder data.                       |
| `hideImageLayer` <br/> boolean    | Hides the image layer, revealing the blur layer underneath.                                                                                                                                |
| `lazy` <br/> boolean              | Should image load lazily. <br/> Default: `true`                                                                                                                                            |
| `onClick` <br/> function          | Callback function to invoke when the image is clicked. function.                                                                                                                           |
| `onError` <br/> function          | Error callback function.                                                                                                                                                                   |
| `onLoad` <br/> function           | Image loaded callback function.                                                                                                                                                            |
| `preventDrag` <br/>boolean        | Prevents user from dragging the image element.                                                                                                                                             |
| `preventSelection` <br/>boolean   | Prevents user from highlighting the image element.                                                                                                                                         |
| `priority` <br/>boolean           | Mark as priority image (above-the-fold). Sets `fetchpriority="high"` and `loading="eager"`. Use for LCP images.<br /> Default: `false`                                                     |
| `punch` <br/>number               | Blurhash punch parameter.<br /> Default: `1`                                                                                                                                               |
| `src` <br/>string                 | Blurhash URL, Visionary Code, or ordinary image URL.<br/> If `src` contains Blurhash URL data, placeholders will be rendered, otherwise falls back to an `img` element. <br/> **required** |
| `width` <br/>number, string       | If set, will override internally computed image width. By default, Visionary renders optimally sized images, using the aspect-ratio and max-width placeholder data.                        |

## Relevant Questions

### Do image placeholders render server-side?

Yes. With server-side rendering (SSR) or static site generation (SSG), the placeholder's first layer (the solid background) renders in the initial HTML. This reserves the image's layout space and is painted on the Critical Rendering Path, early enough to affect First Contentful Paint (FCP), before `DOMContentLoaded`. The Blurhash and image layers then render client-side.

### How long does the Blurhash canvas take to load?

Canvas operations are highly efficient in modern browsers. Rendering the 24x24 pixel Blurhash placeholder typically takes around 1ms.

### What is Blurhash and where can I learn more?

Blurhash uses Discrete Cosine Transforms to represent a color-accurate image placeholder as a compact string (in 20-30 characters). Check out the official [Blurhash docs](https://github.com/woltapp/blurhash) for more info.

## Related packages

| Package                                                                    | Use for                                                            |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| **`visionary-image`** (this package)                                       | React apps (`<Image />`), or the `<visionary-image>` web component |
| [`visionary-image-js`](https://github.com/visionary-ux/visionary-image-js) | Zero-config `<script>` / CDN, or framework-agnostic SSR HTML       |
