module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
        jest: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "prettier",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: "latest",
        sourceType: "module",
        impliedStrict: true,
    },
    plugins: [
        "@typescript-eslint",
        "react",
        "import",
        // Not strictly needed but fixes un-used imports via --fix
        "unused-imports",
    ],
    rules: {
        "import/order": "error",
        "no-unused-vars": "off",
        "unused-imports/no-unused-imports": "error",
        /**
         * ignore if the variable starts with an underscore
         */
        "@typescript-eslint/no-unused-vars": [
            "error",
            { varsIgnorePattern: "^_", argsIgnorePattern: "^_" },
        ],
        "@typescript-eslint/no-empty-function": "off",
        "@typescript-eslint/ban-ts-comment": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "react/prop-types": 0,
        "react/display-name": 0,
        "no-console": "error",
        "func-names": ["error", "always"],
        strict: ["error", "global"],
        "prefer-const": "error",
        "react/no-unknown-property": [
            "error",
            {
                ignore: [
                    "css",
                    "vertexColors",
                    "args",
                    "attach",
                    "transparent",
                    "geometry",
                    "visible",
                    "wireframe",
                ],
            },
        ],
    },
    settings: {
        react: {
            createClass: "createReactClass", // Regex for Component Factory to use,
            // default to "createReactClass"
            pragma: "React", // Pragma to use, default to "React"
            version: "detect", // React version. "detect" automatically picks the version you have installed.
        },
    },
};
