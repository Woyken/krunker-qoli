
// ==UserScript==
// @name         Krunker Quoli
// @namespace    https://github.com/Woyken/krunker-qoli
// @version      0.5.8
// @description  Krunker quality of life improvements
// @author       Woyken
// @match        https://krunker.io/*
// @grant        none
// @run-at       document-start
// @downloadURL  https://woyken.github.io/krunker-qoli/script.user.js
// ==/UserScript==
/**/

const a=function(){const r=document.createElement("link").relList;return r&&r.supports&&r.supports("modulepreload")?"modulepreload":"preload"}(),s={},d="./",m=function(r,o){return!o||o.length===0?r():Promise.all(o.map(e=>{if(e=`${d}${e}`,e in s)return;s[e]=!0;const n=e.endsWith(".css"),l=n?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${e}"]${l}`))return;const t=document.createElement("link");if(t.rel=n?"stylesheet":a,n||(t.as="script",t.crossOrigin=""),t.href=e,document.head.appendChild(t),n)return new Promise((c,u)=>{t.addEventListener("load",c),t.addEventListener("error",()=>u(new Error(`Unable to preload CSS for ${e}`)))})})).then(()=>r())};m(()=>import("./script.user.js"),[]);
