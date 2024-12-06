import { resolve } from "path";
import { defineConfig, mergeConfig } from "vite";
import { defineConfig as defineVitestConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

const vitestConfig = defineVitestConfig({
    test: {
        globals: true,
        include: ["test/**/*.{ts,tsx}"],
    },
});

export default mergeConfig(
    defineConfig({
        plugins: [react()],
        build: {
            lib: {
                // Could also be a dictionary or array of multiple entry points
                entry: resolve(__dirname, "src/index.tsx"),
                // the proper extensions will be added
                fileName: "index",
                formats: ["es", "cjs"],
            },
            minify: false,
            rollupOptions: {
                // make sure to externalize deps that shouldn't be bundled
                // into your library
                external: [
                    "react",
                    "react-dom",
                    "@react-three/fiber",
                    "@react-three/drei",
                    "three",
                    "three-stdlib",
                ],
            },
        },
    }),
    vitestConfig,
);
