import type { Meta, StoryObj } from "@storybook/react";

import { ImageSizeToken } from "visionary-url";

import { Image } from "../components/Image/Image";

const IMG_WIDTH = 600;
const sharedProps = {
  debug: true,
  width: IMG_WIDTH,
};

const meta = {
  argTypes: {
    bgColorAlpha: {
      control: {
        max: 1,
        min: 0,
        step: 0.01,
        type: "range",
      },
    },
  },
  component: Image,
  decorators: [],
  tags: ["autodocs"],
  title: "Visionary Image",
} satisfies Meta<typeof Image>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FullImage: Story = {
  args: {
    ...sharedProps,
    src: "https://cdn.visionary.cloud/image/THVLc1dIUWJqcEY4ZnVLMzdwU25MITI0MDAhMTYwMCE0ZjZlOGEhVUhHYjssMEwtVXhiOHd-VkQlV0VFM0UzNG4lMnRVeFp4V0UxITQhNA/image.jpg",
  },
};

export const BlurOnly: Story = {
  args: {
    ...sharedProps,
    hideImageLayer: true,
    src: "https://cdn.visionary.cloud/image/THVLc1dIUWJqcEY4ZnVLMzdwU25MITI0MDAhMTYwMCE0ZjZlOGEhVUhHYjssMEwtVXhiOHd-VkQlV0VFM0UzNG4lMnRVeFp4V0UxITQhNA/image.jpg",
  },
};

export const BackgroundOnly: Story = {
  args: {
    ...sharedProps,
    disableBlurLayer: true,
    hideImageLayer: true,
    src: "https://cdn.visionary.cloud/image/THVLc1dIUWJqcEY4ZnVLMzdwU25MITI0MDAhMTYwMCE0ZjZlOGEhVUhHYjssMEwtVXhiOHd-VkQlV0VFM0UzNG4lMnRVeFp4V0UxITQhNA/image.jpg",
  },
};

export const PreventDrag: Story = {
  args: {
    ...sharedProps,
    preventDrag: true,
    src: "https://cdn.visionary.cloud/image/THVLc1dIUWJqcEY4ZnVLMzdwU25MITI0MDAhMTYwMCE0ZjZlOGEhVUhHYjssMEwtVXhiOHd-VkQlV0VFM0UzNG4lMnRVeFp4V0UxITQhNA/image.jpg",
  },
};

export const PreventSelection: Story = {
  args: {
    ...sharedProps,
    preventSelection: true,
    src: "https://cdn.visionary.cloud/image/THVLc1dIUWJqcEY4ZnVLMzdwU25MITI0MDAhMTYwMCE0ZjZlOGEhVUhHYjssMEwtVXhiOHd-VkQlV0VFM0UzNG4lMnRVeFp4V0UxITQhNA/image.jpg",
  },
};

export const CustomSizeToken: Story = {
  args: {
    ...sharedProps,
    disableBlurLayer: true,
    hideImageLayer: true,
    size: ImageSizeToken.xs,
    src: "https://cdn.visionary.cloud/image/THVLc1dIUWJqcEY4ZnVLMzdwU25MITI0MDAhMTYwMCE0ZjZlOGEhVUhHYjssMEwtVXhiOHd-VkQlV0VFM0UzNG4lMnRVeFp4V0UxITQhNA/xl/image.jpg",
  },
};

export const ExternalImageUrl: Story = {
  args: {
    ...sharedProps,
    debug: true,
    src: "https://link.visionary.cloud/image/aHR0cHM6Ly9pLmltZ3VyLmNvbS82VWxMa2dKX2Qud2VicD9tYXh3aWR0aD03NjAmZmlkZWxpdHk9Z3JhbmQhNzYwITMyMyE1ZjM2MGMhSzZBWyMqeDswaTF3eFk9djBqcnZ9cSEzITM/image.jpg",
  },
};

export const ExternalImageUrlViaCode: Story = {
  args: {
    ...sharedProps,
    debug: true,
    src: "aHR0cHM6Ly9pLmltZ3VyLmNvbS82VWxMa2dKX2Qud2VicD9tYXh3aWR0aD03NjAmZmlkZWxpdHk9Z3JhbmQhNzYwITMyMyE1ZjM2MGMhSzZBWyMqeDswaTF3eFk9djBqcnZ9cSEzITM",
  },
};

export const NativeImgFallback: Story = {
  args: {
    ...sharedProps,
    debug: true,
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/View_of_the_ISS_taken_during_Crew-2_flyaround_%28ISS066-E-081311%29.jpg/1280px-View_of_the_ISS_taken_during_Crew-2_flyaround_%28ISS066-E-081311%29.jpg",
  },
};
