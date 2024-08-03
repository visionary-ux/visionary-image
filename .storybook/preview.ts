import type { Preview } from "@storybook/react";
import { themes } from "@storybook/theming";

import "./storybook-global.scss";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    darkMode: {
      dark: { ...themes.dark, appBg: "black" },
      stylePreview: true,
    },
    layout: "centered", // options: padded (default), fullscreen, centered
  },
};

export default preview;
