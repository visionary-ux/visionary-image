# Visionary Image

React image component with built-in Blurhash placeholders for better UX and Core Web Vitals.

[![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/visionary-ux/visionary-image/.github%2Fworkflows%2Fci-cd-workflow.yml?branch=master&style=flat-square)](https://github.com/visionary-ux/visionary-image/actions/workflows/ci-cd-workflow.yml?query=branch%3Amaster) [![npm package size (minzipped, via Bundlephobia)](https://img.shields.io/bundlephobia/minzip/visionary-image?style=flat-square&color=blue)](https://bundlephobia.com/package/visionary-image) [![Storybook demo](https://img.shields.io/badge/-Storybook-FF4785?style=flat-square&logo=storybook&logoColor=white)](https://visionary-ux.github.io/visionary-image/)

**Features:**

- Blurhash data encoded in the image URL via [visionary-url](https://github.com/visionary-ux/visionary-url) for instant image placeholders
- Renders a true-to-size, responsive Blurhash placeholder while the image loads, eliminating Cumulative Layout Shift (CLS)
- Images below the fold are lazily loaded, reducing initial page load size and request count, optimizing Interaction to Next Paint (INP)
- Framework-tested (Remix, Next.js, Vite) with support for both client and server-side rendering (SSR, SSG) environments
- Additional features: Prevent dragging, user-selection of image
- Improves Core Web Vitals scores which Google notes as an important ranking signal in Search.

> "We highly recommend site owners achieve good Core Web Vitals for success with Search", [Google Search Central](https://developers.google.com/search/docs/appearance/core-web-vitals)

## Installation

Install via npm, yarn, or pnpm.

```bash
npm install --save visionary-image
```

## Usage

Create a Visionary image URL to get started.

### Creating a Visionary Image URL

There are several ways to create a Visionary URL.

1. Use the [Visionary URL Maker](https://visionary.cloud/url-maker) for public image URLs
2. Use the [Drag & Drop Blurhash Generator](https://visionary.cloud/image-to-blurhash) for local image files
3. Use [visionary-url](https://github.com/visionary-ux/visionary-url) to programmatically generate a URL

### Render Image

```tsx
import { Image } from "visionary-image";

const imageUrl = "<visionary url or code>";
const altText = "Nighttime stroll in Tokyo, neon-lit with a purple glow";

const App = () => {
  <div>
    <Image alt={altText} src={imageUrl} />
  </div>;
};
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
| `hideImageLayer` <br/> boolean    | Hides the image layer, revealing the blur layer underneath.                                                                                                                              |
| `lazy` <br/> boolean              | Should image lazily load. <br/> Default: `true`                                                                                                                                          |
| `onClick` <br/> function          | Callback function to invoke when the image is clicked. function.                                                                                                                         |
| `onError` <br/> function          | Error callback function.                                                                                                                                                                 |
| `onLoad` <br/> function           | Image loaded callback function.                                                                                                                                                          |
| `preventDrag` <br/>boolean        | Prevents user from dragging the image element.                                                                                                                                           |
| `preventSelection` <br/>boolean   | Prevents user from highlighting the image element.                                                                                                                                       |
| `punch` <br/>number               | Blurhash punch parameter.<br /> Default: `1`                                                                                                                                             |
| `src` <br/>string                 | Visionary URL, Visionary Code, or ordinary image URL.<br/> If `src` contains Visionary data, placeholders will be rendered, otherwise falls back to an `img` element. <br/> **required** |

### More Props

|                   |                                                                                                                                                                          |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `height`, `width` | If set, will override internally computed image dimensions. By default, Visionary renders optimally sized images, using the aspect-ratio and max-width placeholder data. |
