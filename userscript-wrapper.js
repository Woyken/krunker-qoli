
// ==UserScript==
// @name         Krunker Quoli
// @namespace    https://github.com/Woyken/krunker-qoli
// @version      0.4.2
// @description  
// @author       Woyken
// @match        https://krunker.io/*
// @grant        none
// @run-at       document-start
// @downloadURL  https://woyken.github.io/krunker-qoli/script.user.js
// ==/UserScript==
/**/

const f=function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&t(o)}).observe(document,{childList:!0,subtree:!0});function i(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function t(e){if(e.ep)return;e.ep=!0;const r=i(e);fetch(e.href,r)}};f();const a="modulepreload",s={},d="/krunker-qoli/",m=function(n,i){return!i||i.length===0?n():Promise.all(i.map(t=>{if(t=`${d}${t}`,t in s)return;s[t]=!0;const e=t.endsWith(".css"),r=e?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${t}"]${r}`))return;const o=document.createElement("link");if(o.rel=e?"stylesheet":a,e||(o.as="script",o.crossOrigin=""),o.href=t,document.head.appendChild(o),e)return new Promise((c,u)=>{o.addEventListener("load",c),o.addEventListener("error",()=>u(new Error(`Unable to preload CSS for ${t}`)))})})).then(()=>n())};m(()=>import("./script.user.js"),[]);
