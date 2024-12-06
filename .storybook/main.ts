import type { StorybookConfig } from "@storybook/react-vite";

export default {
    stories: ["../stories/**/*.stories.@(ts|tsx|js|jsx)"],

    // https://storybook.js.org/docs/react/configure/typescript#mainjs-configuration
    typescript: {
        check: true,
        reactDocgen: "react-docgen",
    },

    addons: ["@storybook/addon-designs"],

    framework: {
        name: "@storybook/react-vite",
        options: {},
    },
} satisfies StorybookConfig;
