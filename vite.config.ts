/// <reference types="vitest" />

import * as path from "path";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
  },
  test: {
    globals: true,
    environment: "jsdom",
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/_exports.scss";`,
      },
    },
  },
});
