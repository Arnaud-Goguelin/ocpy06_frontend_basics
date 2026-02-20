import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";

export default defineConfig([
    {
        files: ["js/**/*.js"],
        plugins: { js },
        extends: ["js/recommended"],
        languageOptions: {
            globals: globals.browser,
        },
        rules: {
            "no-unused-vars": "warn",
            "no-undef": "warn",
        },
    },
]);
