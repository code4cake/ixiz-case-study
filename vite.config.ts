/// <reference types="vitest" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
// import path from 'path';
// import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // test: {
  //   testTimeout: 10000,
  //   hookTimeout: 10000,
  //   globals: true,
  //   environment: "jsdom",
  //   setupFiles: "./setupTests.ts",
  //   coverage: {
  //     provider: "v8",
  //     reporter: ["text", "html", "json"],
  //   },
  // },
  // resolve: {
  //   alias: {
  //     "@": path.resolve(__dirname, "./src/."),
  //   },
  // },
});
