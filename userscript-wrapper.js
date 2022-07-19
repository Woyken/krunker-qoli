
// ==UserScript==
// @name         Krunker Quoli
// @namespace    https://github.com/Woyken/krunker-qoli
// @version      0.5.11
// @description  Krunker quality of life improvements
// @author       Woyken
// @match        https://krunker.io/*
// @grant        none
// @run-at       document-start
// @downloadURL  https://woyken.github.io/krunker-qoli/script.user.js
// ==/UserScript==
/**/

const m=function(){const e=document.createElement("link").relList;return e&&e.supports&&e.supports("modulepreload")?"modulepreload":"preload"}(),d=function(o,e){return new URL(o,e).href},i={},f=function(e,s,l){return!s||s.length===0?e():Promise.all(s.map(t=>{if(t=d(t,l),t in i)return;i[t]=!0;const n=t.endsWith(".css"),c=n?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${t}"]${c}`))return;const r=document.createElement("link");if(r.rel=n?"stylesheet":m,n||(r.as="script",r.crossOrigin=""),r.href=t,document.head.appendChild(r),n)return new Promise((u,a)=>{r.addEventListener("load",u),r.addEventListener("error",()=>a(new Error(`Unable to preload CSS for ${t}`)))})})).then(()=>e())};f(()=>import("./script.user.js"),[],import.meta.url);
