# visionary-image

![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/visionary-ux/visionary-image/.github%2Fworkflows%2Fci-cd-workflow.yml?branch=master&style=flat-square)

> Visionary Image rapidly renders blurhash placeholders and boosts Core Web Vitals.

**Features:**

- Blurhash data encoded in the image URL via [visionary-url](https://github.com/visionary-ux/visionary-url) means zero latency image placeholders
- Renders a true-to-size, responsive blurhash placeholder while the image loads, <u>eliminating Cumulative Layout Shift (CLS)</u>
- Off-screen images are lazily loaded, reducing initial pageload size and request count, <u>improving Interaction to Next Paint (INP)</u>
- Framework-tested (Remix, Next.js, Vite) with support for both client and server-side rendering (SSR, SSG) environments
- Additional features: Prevent dragging, user-selection of image
- Improves Core Web Vitals scores (CLS, and often INP and LCP) which are a primary ranking signal in Google Search

> "We highly recommend site owners achieve good Core Web Vitals for success with Search", [Google Search Central](https://developers.google.com/search/docs/appearance/core-web-vitals)

## Installation

Install via npm, yarn, or pnpm.

```bash
npm install --save visionary-image
```

## Getting Started

To render a Visionary Image, first create a Visionary URL.

### Creating a Visionary Image URL

To create a Visionary URL from a public image URL see [Visionary URL Generator](#).

To generate Visionary data from a local file, use the [Drag-and-Drop Blurhash Generator](#).

- Generate a Visionary URL at [https://visionary.cloud/url-generator](https://visionary.cloud/url-generator)
- Copy a URL from your [Visionary Dashboard](https://visionary.cloud/dashboard)
- Use this [sample URL]()

### Render image component

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
