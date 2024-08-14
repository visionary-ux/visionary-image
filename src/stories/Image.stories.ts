import type { Meta, StoryObj } from "@storybook/react";

import { ImageSizeToken } from "visionary-url";

import { Image } from "../components/Image/Image";

const sharedProps = {
  alt: "White-petaled cherry blossom focused against a blurry background",
  debug: false,
  src: "https://cdn.visionary.cloud/image/Y3Fra2RzdHFwcCEyMDAwITEzMzMhYTdjMWM0IVVuR20zfC5tdFFzLnlGYmNSamFmSW9SUFdCV1dSKk5HVkBqWyE0ITQ/md/image.jpg",
  width: 600,
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
  },
};

export const BlurOnly: Story = {
  args: {
    ...sharedProps,
    hideImageLayer: true,
  },
};

export const BackgroundOnly: Story = {
  args: {
    ...sharedProps,
    disableBlurLayer: true,
    hideImageLayer: true,
  },
};

export const PreventDrag: Story = {
  args: {
    ...sharedProps,
    preventDrag: true,
  },
};

export const PreventSelection: Story = {
  args: {
    ...sharedProps,
    preventSelection: true,
  },
};

export const CustomAspectRatio: Story = {
  args: {
    ...sharedProps,
    style: {
      aspectRatio: "3 / 1",
      transform: "translateY(-30%)",
    },
  },
};

export const CustomSizeToken: Story = {
  args: {
    ...sharedProps,
    size: ImageSizeToken.xs,
  },
};

export const ExternalImageUrl: Story = {
  args: {
    ...sharedProps,
    src: "https://link.visionary.cloud/image/aHR0cHM6Ly9pLmltZ3VyLmNvbS82VWxMa2dKX2Qud2VicD9tYXh3aWR0aD03NjAmZmlkZWxpdHk9Z3JhbmQhNzYwITMyMyE1ZjM2MGMhSzZBWyMqeDswaTF3eFk9djBqcnZ9cSEzITM/image.jpg",
  },
};

export const ExternalImageUrlViaCode: Story = {
  args: {
    ...sharedProps,
    src: "aHR0cHM6Ly9pLmltZ3VyLmNvbS82VWxMa2dKX2Qud2VicD9tYXh3aWR0aD03NjAmZmlkZWxpdHk9Z3JhbmQhNzYwITMyMyE1ZjM2MGMhSzZBWyMqeDswaTF3eFk9djBqcnZ9cSEzITM",
  },
};

export const NativeImgFallback: Story = {
  args: {
    ...sharedProps,
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/View_of_the_ISS_taken_during_Crew-2_flyaround_%28ISS066-E-081311%29.jpg/1280px-View_of_the_ISS_taken_during_Crew-2_flyaround_%28ISS066-E-081311%29.jpg",
  },
};
