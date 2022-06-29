
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

const a=function(){const t=document.createElement("link").relList;return t&&t.supports&&t.supports("modulepreload")?"modulepreload":"preload"}(),s={},d="/krunker-qoli/",m=function(t,o){return!o||o.length===0?t():Promise.all(o.map(e=>{if(e=`${d}${e}`,e in s)return;s[e]=!0;const n=e.endsWith(".css"),l=n?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${e}"]${l}`))return;const r=document.createElement("link");if(r.rel=n?"stylesheet":a,n||(r.as="script",r.crossOrigin=""),r.href=e,document.head.appendChild(r),n)return new Promise((c,u)=>{r.addEventListener("load",c),r.addEventListener("error",()=>u(new Error(`Unable to preload CSS for ${e}`)))})})).then(()=>t())};m(()=>import("./script.user.js"),[]);
