import { fileURLToPath } from "url";
import { defineConfig, PluginOption } from "vite";
import solidPlugin from "vite-plugin-solid";
import banner from "vite-plugin-banner";
import { resolve } from "path";
import Checker from "vite-plugin-checker";

import pkg from "./package.json";

const loaderModuleBanner = `
// ==UserScript==
// @name         ${pkg.displayName}
// @namespace    https://github.com/Woyken/krunker-qoli
// @version      ${pkg.version}
// @description  ${pkg.description}
// @author       ${pkg.author}
// @match        https://krunker.io/*
// @grant        none
// @run-at       document-start
// @downloadURL  https://woyken.github.io/krunker-qoli/script.user.js
// ==/UserScript==
/**/
`;

const isScriptBuild = process.env.BUILD_TYPE === "script";

const vitePlugins: PluginOption[] = [
  Checker({
    typescript: true,
    overlay: false,
  }),
];
if (isScriptBuild) vitePlugins.push(banner(loaderModuleBanner));
else vitePlugins.push(solidPlugin());

export default defineConfig({
  base: '/krunker-qoli/',
  plugins: vitePlugins,
  build: {
    emptyOutDir: isScriptBuild,
    target: "esnext",
    polyfillDynamicImport: false,
    rollupOptions: {
      output: {
        entryFileNames: `[name].js`,
        chunkFileNames: `[name].js`,
        assetFileNames: `[name].[ext]`,
      },
      input: isScriptBuild
        ? {
            "userscript-wrapper": fileURLToPath(
              new URL("./src/userScript/index.html", import.meta.url)
            ),
          }
        : {
            app: fileURLToPath(new URL("./index.html", import.meta.url)),
          },
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});
