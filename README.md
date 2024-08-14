# Visionary Image

React image component with built-in Blurhash placeholders for better UX and Core Web Vitals.

![GitHub Release](https://img.shields.io/github/v/release/visionary-ux/visionary-image?color=beige) [![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/visionary-ux/visionary-image/.github%2Fworkflows%2Fci-cd-workflow.yml?branch=master&style=flat-square)](https://github.com/visionary-ux/visionary-image/actions/workflows/ci-cd-workflow.yml?query=branch%3Amaster) [![npm package size (minzipped, via Bundlephobia)](https://img.shields.io/bundlephobia/minzip/visionary-image?style=flat-square&color=blue)](https://bundlephobia.com/package/visionary-image) [![Storybook demo](https://img.shields.io/badge/-Storybook-FF4785?style=flat-square&logo=storybook&logoColor=white)](https://visionary-ux.github.io/visionary-image/)

## Features

- **Easy Blurhash:** Get started with Blurhash in 60 seconds.
- **Layout stability**: Eliminates Cumulative Layout Shift (CLS) with true-to-size, responsive placeholders.
- **Automatic lazy loading**: Off-screen images are deferred, reducing initial pageload size and optimizing Interaction to Next Paint (INP).
- **Lighning-fast previews**: Renders placeholders early (by initial DOM layout) using URL-embedded Blurhash data, powered by [`visionary-url`](https://github.com/visionary-ux/visionary-url).
- **Framework tested**: Compatible with Remix, Next.js, and Vite and supports both client and server-side rendering (SSR, SSG).
- **Additional features**: Prevent image dragging; prevent user selecting image
- **Developer friendly**: Written in Typescript and [unit tested](./src/components/Image/__test__/).
  - Check out the [interactive Storybook sandbox](https://visionary-ux.github.io/visionary-image/)
- **Search performance**: Enhance search ranking potential by improving Core Web Vitals scores.
  > "We highly recommend site owners achieve good Core Web Vitals for success with Search" — [Google Search Central](https://developers.google.com/search/docs/appearance/core-web-vitals)

### Lighthouse Performance

Lighthouse report filmstrip showing three-layer image loading process
![Lighthouse report loading stage filmstrip](https://github.com/user-attachments/assets/20fd15ad-6801-4105-b75d-bf12cc8c704e)

## Installation

Install via npm, yarn, or pnpm.

```bash
npm install --save visionary-image
```

## Usage

Begin by creating a Visionary image URL. This is then passed to the `src` prop of the Image component.

### Creating a Visionary Image URL

There are several ways to create a Visionary URL.

1. Use the [Visionary URL Maker](https://visionary.cloud/url-maker) for public image URLs
2. Use the [Drag & Drop Blurhash Generator](https://visionary.cloud/image-to-blurhash) for local image files
3. Use [visionary-url](https://github.com/visionary-ux/visionary-url) to programmatically generate a URL

### Render Image

```tsx
import { Image } from "visionary-image";

const ImageDetails = () => <Image alt="..." src="<Visionary URL>" />;
```

## Component Props

| Name                              | Description                                                                                                                                                                              |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `alt` <br/> string                | Image `alt` tag. Adding alt text to images is highly recommended to accommodate accessible devices and improve discoverability.                                                          |
| `bgColorAlpha` <br/> number       | Base layer (background color) alpha channel.<br /> Default: `0.7`                                                                                                                        |
| `className` <br/> string          | Classname applied to the container `div` or the fallback `img` element.                                                                                                                  |
| `debug` <br/> boolean             | Prints handy debug info to the console (Visionary URL data, render times).                                                                                                               |
| `disableBlurLayer` <br/> boolean  | Disables rendering of the blur (canvas) layer.                                                                                                                                           |
| `disableImageLayer` <br/> boolean | Disables rendering of the image layer.                                                                                                                                                   |
| `height` <br/>number, string      | If set, will override internally computed image height. By default, Visionary renders optimally sized images, using the aspect-ratio and max-width placeholder data.                     |
| `hideImageLayer` <br/> boolean    | Hides the image layer, revealing the blur layer underneath.                                                                                                                              |
| `lazy` <br/> boolean              | Should image load lazily. <br/> Default: `true`                                                                                                                                          |
| `onClick` <br/> function          | Callback function to invoke when the image is clicked. function.                                                                                                                         |
| `onError` <br/> function          | Error callback function.                                                                                                                                                                 |
| `onLoad` <br/> function           | Image loaded callback function.                                                                                                                                                          |
| `preventDrag` <br/>boolean        | Prevents user from dragging the image element.                                                                                                                                           |
| `preventSelection` <br/>boolean   | Prevents user from highlighting the image element.                                                                                                                                       |
| `punch` <br/>number               | Blurhash punch parameter.<br /> Default: `1`                                                                                                                                             |
| `src` <br/>string                 | Visionary URL, Visionary Code, or ordinary image URL.<br/> If `src` contains Visionary data, placeholders will be rendered, otherwise falls back to an `img` element. <br/> **required** |
| `width` <br/>number, string       | If set, will override internally computed image width. By default, Visionary renders optimally sized images, using the aspect-ratio and max-width placeholder data.                      |

## Relevant Questions

### Do image placeholders render server-side?

Yes, Visionary Image supports server-side rendering (SSR) and static site generation (SSG), as well as client-side rendering. In server-rendered scenarios, the first layer (background color) renders immediately, followed by the Blurhash and image layers once the page loads in the client's browser.

### How long does the Blurhash canvas take to load?

Canvas operations are highly efficient in modern browsers. Rendering the 24x24 pixel Blurhash placeholder typically takes around 1ms.

### What is Blurhash and where can I learn more?

Blurhash uses Discrete Cosine Transforms to represent a color-accurate image placeholder as a compact string (in 20-30 characters). Check out the official [Blurhash docs](https://github.com/woltapp/blurhash) for more info.
