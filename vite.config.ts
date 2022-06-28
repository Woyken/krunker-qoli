/* eslint-disable import/no-extraneous-dependencies */
import { fileURLToPath } from 'url';
import { defineConfig, PluginOption } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import banner from 'vite-plugin-banner';
import { resolve } from 'path';
import Checker from 'vite-plugin-checker';
import eslint from 'vite-plugin-eslint';
import inject from '@rollup/plugin-inject';
import pkg from './package.json';

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

const isScriptBuild = process.env.BUILD_TYPE === 'script';

const vitePlugins: PluginOption[] = [
    Checker({
        typescript: true,
        overlay: false,
    }),
    eslint({ fix: true }),
];
if (isScriptBuild) vitePlugins.push(banner(loaderModuleBanner));
else vitePlugins.push(solidPlugin());

export default defineConfig({
    base: '/krunker-qoli/',
    plugins: vitePlugins,
    build: {
        emptyOutDir: isScriptBuild,
        target: 'esnext',
        polyfillDynamicImport: false,
        rollupOptions: {
            plugins: [
                // Overriding globals with custom objects. Copying and saving original prototype functions
                // This way we can avoid prototype overrides. Will always call original function
                // Some functions/properties might be undefined, need to check manually
                inject({
                    // files called "unsafe.***" will be ignored
                    include: /(?!.*\/(unsafe\.|globalOverrides))(src\/.*)|(node_modules)/,
                    Array: '@/shared/globalOverrides/Array',
                    window: '@/shared/globalOverrides/window',
                    document: '@/shared/globalOverrides/document',
                    Error: '@/shared/globalOverrides/Error',
                    KeyboardEvent: '@/shared/globalOverrides/KeyboardEvent',
                    Map: '@/shared/globalOverrides/Map',
                    Math: '@/shared/globalOverrides/Math',
                    MessageChannel: '@/shared/globalOverrides/MessageChannel',
                    MouseEvent: '@/shared/globalOverrides/MouseEvent',
                    MutationObserver: '@/shared/globalOverrides/MutationObserver',
                    Number: '@/shared/globalOverrides/Number',
                    Object: '@/shared/globalOverrides/Object',
                    Promise: '@/shared/globalOverrides/Promise',
                    Proxy: '@/shared/globalOverrides/Proxy',
                    Symbol: '@/shared/globalOverrides/Symbol',
                    URL: '@/shared/globalOverrides/URL',
                    WeakMap: '@/shared/globalOverrides/WeakMap',
                }),
            ],
            output: {
                entryFileNames: '[name].js',
                chunkFileNames: '[name].js',
                assetFileNames: '[name].[ext]',
            },
            input: isScriptBuild
                ? {
                      'userscript-wrapper': fileURLToPath(new URL('./src/userScript/index.html', import.meta.url)),
                  }
                : {
                      app: fileURLToPath(new URL('./index.html', import.meta.url)),
                  },
        },
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
        },
    },
});
