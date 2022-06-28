
// ==UserScript==
// @name         Krunker Quoli
// @namespace    https://github.com/Woyken/krunker-qoli
// @version      0.5.5
// @description  
// @author       Woyken
// @match        https://krunker.io/*
// @grant        none
// @run-at       document-start
// @downloadURL  https://woyken.github.io/krunker-qoli/script.user.js
// ==/UserScript==
/**/

const Ce=(e,t)=>e===t,q={equals:Ce};let oe=ie;const U={},P=1,x=2,Pe={owned:null,cleanups:null,context:null,owner:null};var b=null;let M=null,f=null,R=null,p=null,E=null,V=0;function u(e,t){t=t?Object.assign({},q,t):q;const n={value:e,observers:null,observerSlots:null,pending:U,comparator:t.equals||void 0},s=o=>(typeof o=="function"&&(o=o(n.pending!==U?n.pending:n.value)),_(n,o));return[Ae.bind(n),s]}function d(e,t,n){oe=Oe;const s=Me(e,t,!1,P);s.user=!0,E?E.push(s):$(s)}function Ie(e){if(R)return e();let t;const n=R=[];try{t=e()}finally{R=null}return re(()=>{for(let s=0;s<n.length;s+=1){const o=n[s];if(o.pending!==U){const i=o.pending;o.pending=U,_(o,i)}}},!1),t}function Re(e){let t,n=f;return f=null,t=e(),f=n,t}function y(e){return b===null||(b.cleanups===null?b.cleanups=[e]:b.cleanups.push(e)),e}function Ae(){const e=M;if(this.sources&&(this.state||e)){const t=p;p=null,this.state===P||e?$(this):N(this),p=t}if(f){const t=this.observers?this.observers.length:0;f.sources?(f.sources.push(this),f.sourceSlots.push(t)):(f.sources=[this],f.sourceSlots=[t]),this.observers?(this.observers.push(f),this.observerSlots.push(f.sources.length-1)):(this.observers=[f],this.observerSlots=[f.sources.length-1])}return this.value}function _(e,t,n){if(R)return e.pending===U&&R.push(e),e.pending=t,t;if(e.comparator&&e.comparator(e.value,t))return t;let s=!1;return e.value=t,e.observers&&e.observers.length&&re(()=>{for(let o=0;o<e.observers.length;o+=1){const i=e.observers[o];s&&M.disposed.has(i),(s&&!i.tState||!s&&!i.state)&&(i.pure?p.push(i):E.push(i),i.observers&&ae(i)),s||(i.state=P)}if(p.length>1e6)throw p=[],new Error},!1),t}function $(e){if(!e.fn)return;ce(e);const t=b,n=f,s=V;f=b=e,Ue(e,e.value,s),f=n,b=t}function Ue(e,t,n){let s;try{s=e.fn(t)}catch(o){le(o)}(!e.updatedAt||e.updatedAt<=n)&&(e.observers&&e.observers.length?_(e,s):e.value=s,e.updatedAt=n)}function Me(e,t,n,s=P,o){const i={fn:e,state:s,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:b,context:null,pure:n};return b===null||b!==Pe&&(b.owned?b.owned.push(i):b.owned=[i]),i}function A(e){const t=M;if(e.state===0||t)return;if(e.state===x||t)return N(e);if(e.suspense&&Re(e.suspense.inFallback))return e.suspense.effects.push(e);const n=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<V);)(e.state||t)&&n.push(e);for(let s=n.length-1;s>=0;s--)if(e=n[s],e.state===P||t)$(e);else if(e.state===x||t){const o=p;p=null,N(e,n[0]),p=o}}function re(e,t){if(p)return e();let n=!1;t||(p=[]),E?n=!0:E=[],V++;try{const s=e();return Te(n),s}catch(s){le(s)}finally{p=null,n||(E=null)}}function Te(e){p&&(ie(p),p=null),!e&&(E.length?Ie(()=>{oe(E),E=null}):E=null)}function ie(e){for(let t=0;t<e.length;t++)A(e[t])}function Oe(e){let t,n=0;for(t=0;t<e.length;t++){const o=e[t];o.user?e[n++]=o:A(o)}const s=e.length;for(t=0;t<n;t++)A(e[t]);for(t=s;t<e.length;t++)A(e[t])}function N(e,t){const n=M;e.state=0;for(let s=0;s<e.sources.length;s+=1){const o=e.sources[s];o.sources&&(o.state===P||n?o!==t&&A(o):(o.state===x||n)&&N(o,t))}}function ae(e){const t=M;for(let n=0;n<e.observers.length;n+=1){const s=e.observers[n];(!s.state||t)&&(s.state=x,s.pure?p.push(s):E.push(s),s.observers&&ae(s))}}function ce(e){let t;if(e.sources)for(;e.sources.length;){const n=e.sources.pop(),s=e.sourceSlots.pop(),o=n.observers;if(o&&o.length){const i=o.pop(),r=n.observerSlots.pop();s<o.length&&(i.sourceSlots[r]=s,o[s]=i,n.observerSlots[s]=r)}}if(e.owned){for(t=0;t<e.owned.length;t++)ce(e.owned[t]);e.owned=null}if(e.cleanups){for(t=0;t<e.cleanups.length;t++)e.cleanups[t]();e.cleanups=null}e.state=0,e.context=null}function le(e){throw e}const m={getElementById:document.getElementById.bind(document),getElementsByClassName:document.getElementsByClassName.bind(document),getElementsByTagName:document.getElementsByTagName.bind(document),addEventListener:document.addEventListener.bind(document),removeEventListener:document.removeEventListener.bind(document),createEvent:document.createEvent.bind(document),hasFocus:document.hasFocus.bind(document)},De=console.log.bind(console);class z{constructor(...t){this.argsScope=t}createScopedLogger(...t){return new z(...this.argsScope,...t)}log(...t){De(...this.argsScope,...t)}}function k(...e){return new z("[Krunker Qoli]",...e)}const Fe=k("[documentState]"),[T,J]=u(!1);document.readyState!=="complete"?m.addEventListener("readystatechange",function e(){document.readyState==="complete"&&(m.removeEventListener("readystatechange",e),Fe.log("document readyState complete event received, setting state true"),J(!0))}):J(!0);function xe(){const[e,t]=u(document.readyState),n=()=>document.readyState==="loading",s=()=>document.readyState==="interactive",o=()=>document.readyState==="complete",[i,r]=u(n()||s()||o()),[l,a]=u(s()||o()),[c,g]=u(o());return m.addEventListener("readystatechange",function h(){t(document.readyState),r(n()||s()||o()),a(s()||o()),g(o()),o()&&m.removeEventListener("readystatechange",h)}),{documentReadyState:e,isDocumentAtLeastLoading:i,isDocumentAtLeastInteractive:l,isDocumentAtLeastComplete:c}}const[kt,Ne]=u(!1),[We,Be]=u(!1),[ue,He]=u(!1),[Ge,Ke]=u(!1);class je extends MutationObserver{constructor(){super(...arguments),this.observe=MutationObserver.prototype.observe}}function Ve(e){return new je(t=>{t.forEach(n=>{n.type==="attributes"&&n.attributeName==="style"&&e(n.target.style)})})}function W(e){return Ve(t=>{const n=t.display==="block";e(n)})}const B={attributes:!0,attributeFilter:["style"]},H=k("[adPopupDismisser]");function _e(){H.log("initAdPopupDismisser");const[e,t]=u(!1),n=W(t);d(()=>{if(!T())return;H.log("document readyState complete, adding observer");const s=m.getElementById("popupHolder");s&&(t(s.style.display==="block"),n.observe(s,B),y(n.disconnect.bind(n)))}),d(()=>{!We()||(H.log("isAdPopupActive effect",e()),e()&&m.getElementById("popupBack")?.click())})}function de(){const[e,t]=u(!1),n=W(t);return d(()=>{if(!T())return;const s=m.getElementById("inGameUI");s&&(t(s.style.display==="block"),n.observe(s,B),y(n.disconnect.bind(n)))}),e}const G={arrayFrom:Array.from.bind(Array)},Z=KeyboardEvent,D=k("[autoReload]");function $e(){D.log("initAutoReload");const e=de(),[t,n]=u(!1),s=W(n);d(()=>{if(!T())return;D.log("document readyState complete, adding observer");const r=m.getElementById("reloadMsg");r&&(n(r.style.display==="block"),s.observe(r,B),y(s.disconnect.bind(s)))});const[o,i]=u(!1);d(()=>{if(!ue()||!t())return;D.log("pressing down reload button");const r=G.arrayFrom(m.getElementsByTagName("canvas")).pop(),l={code:"KeyR",composed:!0,key:"r",keyCode:82,which:82,bubbles:!0,cancelable:!0};r?.dispatchEvent(new Z("keydown",l)),i(!0)}),d(()=>{if(!o()||!e()||t())return;D.log("releasing reload button");const r=G.arrayFrom(m.getElementsByTagName("canvas")).pop(),l={code:"KeyR",composed:!0,key:"r",keyCode:82,which:82,bubbles:!0,cancelable:!0};r?.dispatchEvent(new Z("keyup",l))})}const v={open:window.open.bind(window),addEventListener:window.addEventListener.bind(window),removeEventListener:window.removeEventListener.bind(window),setTimeout:window.setTimeout.bind(window),clearTimeout:window.clearTimeout.bind(window)};function ze(){const[e,t]=u(m.hasFocus()),n=()=>t(!0),s=()=>t(!1);return v.addEventListener("focus",n),v.addEventListener("blur",s),y(()=>{v.removeEventListener("focus",n),v.removeEventListener("blur",s)}),e}function Qe(){const[e,t]=u(!1);function n(){t(!!document.pointerLockElement)}return d(()=>{!T()||(m.addEventListener("pointerlockchange",n),y(()=>{m.removeEventListener("pointerlockchange",n)}))}),e}function Xe(){const[e,t]=u(!1),n=W(t);return d(()=>{if(!T())return;const s=m.getElementById("killCardHolder");s&&(t(s.style.display==="block"),n.observe(s,B),y(n.disconnect.bind(n)))}),e}let fe=()=>({events:{},emit(e,...t){let n=this.events[e]||[];for(let s=0,o=n.length;s<o;s++)n[s](...t)},on(e,t){return this.events[e]?.push(t)||(this.events[e]=[t]),()=>{this.events[e]=this.events[e]?.filter(n=>t!==n)}}});const Ye=Function.prototype.apply.apply.bind(Function.prototype.apply);function qe(e){return typeof e!="object"||e==null?!1:"stack"in e}function Q(e,t,n){const s=k("[createFunctionProxy]",e,t,n);return s.log("creating function proxy"),new Proxy(e,{apply(o,i,r){const l=s.createScopedLogger("[apply]",o,i,r);try{t?.(...r)}catch(c){l.log("beforeCallback error",c)}let a;try{a=Ye(o,[i,r])}catch(c){throw l.log("EXCEPTION",c),qe(c)&&(c.stack.includes("Object.apply")?c.stack=c.stack.replace(/\n.*Object\.apply.*/,""):c.stack.includes("apply@")&&(c.stack=c.stack.replace(/.*apply@.*\n/,""))),l.log("EXCEPTION before rethrow",c),c}try{n?.(...r)}catch(c){l.log("afterCallback error",c)}return a}})}const pe=fe(),Je=document.exitPointerLock;document.exitPointerLock=Q(Je,void 0,()=>pe.emit("calledExitPointerLock"));const ee=MouseEvent,ge=k("[fastRespawn]");function Ze(){ge.log("trying to activate game");const e=G.arrayFrom(m.getElementsByTagName("canvas")).pop();e?.dispatchEvent(new ee("mousedown",{bubbles:!0,cancelable:!0})),e?.dispatchEvent(new ee("mouseup",{bubbles:!0,cancelable:!0}))}function et(){ge.log("initFastRespawn");const e=Xe(),t=de(),n=Qe(),s=ze(),[o,i]=u(!1),r=pe.on("calledExitPointerLock",()=>{n()&&i(!0)});y(()=>{r()}),d(()=>{n()&&i(!1)}),d(()=>{!ue()||!s()||!o()||n()||t()||!e()||(i(!1),Ze())})}const me=Symbol("Comlink.proxy"),tt=Symbol("Comlink.endpoint"),nt=Symbol("Comlink.releaseProxy"),K=Symbol("Comlink.thrown"),he=e=>typeof e=="object"&&e!==null||typeof e=="function",st={canHandle:e=>he(e)&&e[me],serialize(e){const{port1:t,port2:n}=new MessageChannel;return be(e,t),[n,[n]]},deserialize(e){return e.start(),ye(e)}},ot={canHandle:e=>he(e)&&K in e,serialize({value:e}){let t;return e instanceof Error?t={isError:!0,value:{message:e.message,name:e.name,stack:e.stack}}:t={isError:!1,value:e},[t,[]]},deserialize(e){throw e.isError?Object.assign(new Error(e.value.message),e.value):e.value}},we=new Map([["proxy",st],["throw",ot]]);function be(e,t=self){t.addEventListener("message",function n(s){if(!s||!s.data)return;const{id:o,type:i,path:r}=Object.assign({path:[]},s.data),l=(s.data.argumentList||[]).map(S);let a;try{const c=r.slice(0,-1).reduce((h,I)=>h[I],e),g=r.reduce((h,I)=>h[I],e);switch(i){case"GET":a=g;break;case"SET":c[r.slice(-1)[0]]=S(s.data.value),a=!0;break;case"APPLY":a=g.apply(c,l);break;case"CONSTRUCT":{const h=new g(...l);a=Le(h)}break;case"ENDPOINT":{const{port1:h,port2:I}=new MessageChannel;be(e,I),a=at(h,[h])}break;case"RELEASE":a=void 0;break;default:return}}catch(c){a={value:c,[K]:0}}Promise.resolve(a).catch(c=>({value:c,[K]:0})).then(c=>{const[g,h]=X(c);t.postMessage(Object.assign(Object.assign({},g),{id:o}),h),i==="RELEASE"&&(t.removeEventListener("message",n),ve(t))})}),t.start&&t.start()}function rt(e){return e.constructor.name==="MessagePort"}function ve(e){rt(e)&&e.close()}function ye(e,t){return j(e,[],t)}function F(e){if(e)throw new Error("Proxy has been released and is not useable")}function j(e,t=[],n=function(){}){let s=!1;const o=new Proxy(n,{get(i,r){if(F(s),r===nt)return()=>C(e,{type:"RELEASE",path:t.map(l=>l.toString())}).then(()=>{ve(e),s=!0});if(r==="then"){if(t.length===0)return{then:()=>o};const l=C(e,{type:"GET",path:t.map(a=>a.toString())}).then(S);return l.then.bind(l)}return j(e,[...t,r])},set(i,r,l){F(s);const[a,c]=X(l);return C(e,{type:"SET",path:[...t,r].map(g=>g.toString()),value:a},c).then(S)},apply(i,r,l){F(s);const a=t[t.length-1];if(a===tt)return C(e,{type:"ENDPOINT"}).then(S);if(a==="bind")return j(e,t.slice(0,-1));const[c,g]=te(l);return C(e,{type:"APPLY",path:t.map(h=>h.toString()),argumentList:c},g).then(S)},construct(i,r){F(s);const[l,a]=te(r);return C(e,{type:"CONSTRUCT",path:t.map(c=>c.toString()),argumentList:l},a).then(S)}});return o}function it(e){return Array.prototype.concat.apply([],e)}function te(e){const t=e.map(X);return[t.map(n=>n[0]),it(t.map(n=>n[1]))]}const Ee=new WeakMap;function at(e,t){return Ee.set(e,t),e}function Le(e){return Object.assign(e,{[me]:!0})}function ct(e,t=self,n="*"){return{postMessage:(s,o)=>e.postMessage(s,n,o),addEventListener:t.addEventListener.bind(t),removeEventListener:t.removeEventListener.bind(t)}}function X(e){for(const[t,n]of we)if(n.canHandle(e)){const[s,o]=n.serialize(e);return[{type:"HANDLER",name:t,value:s},o]}return[{type:"RAW",value:e},Ee.get(e)||[]]}function S(e){switch(e.type){case"HANDLER":return we.get(e.name).deserialize(e.value);case"RAW":return e.value}}function C(e,t,n){return new Promise(s=>{const o=lt();e.addEventListener("message",function i(r){!r.data||!r.data.id||r.data.id!==o||(e.removeEventListener("message",i),s(r.data))}),e.start&&e.start(),e.postMessage(Object.assign({id:o},t),n)})}function lt(){return new Array(4).fill(0).map(()=>Math.floor(Math.random()*Number.MAX_SAFE_INTEGER).toString(16)).join("-")}const ut="0.5.5",dt=ut;function ft(...e){const t=ct(...e),n={},s=t.addEventListener.bind(t);t.addEventListener=(...r)=>{const l=n[r[0]];return l?l.push(r[1]):n[r[0]]=[r[1]],s(...r)};const o=t.removeEventListener.bind(t);t.removeEventListener=(...r)=>{const l=n[r[0]];return l&&(n[r[0]]=l.filter(a=>a!==r[1])),o(...r)};function i(){Object.keys(n).forEach(r=>{n[r].forEach(l=>{o(r,l)})})}return{unsubscribeAll:i,...t}}const pt=k("[useRemoveClosedWindows]");function gt(e,t){const n=setInterval(()=>{const s=e();s&&s.closed&&(pt.log("is closed",e()),t())},1e3);y(()=>clearInterval(n))}const O=fe(),mt=window.history.pushState;window.history.pushState=Q(mt,void 0,()=>O.emit("locationChanged"));const ht=window.history.replaceState;window.history.replaceState=Q(ht,void 0,()=>O.emit("locationChanged"));v.addEventListener("hashchange",()=>O.emit("locationChanged"));v.addEventListener("popstate",()=>O.emit("locationChanged"));function Se(){const[e,t]=u(window.location.href);return O.on("locationChanged",()=>{t(window.location.href)}),e}const w=k("[Settings window communication]"),ke=URL,Y=new ke("https://woyken.github.io/krunker-qoli"),L={};v.addEventListener("message",e=>{e.origin===Y.origin&&e.stopImmediatePropagation(),L.message?.forEach(t=>{"handleEvent"in t?t.handleEvent(e):t(e)})});function wt(e){w.log("settingsUpdatedCallback",e),He(e.enabledFastRespawn),Be(e.enabledAdPopupRemoval),Ne(e.enabledAutoReload),Ke(e.enabledWindowManager)}function ne(e,t){return new Promise((n,s)=>{setTimeout(()=>{s(new Error("Promise timed out"))},t),e.then(n,s)})}let se=!1;function bt(){const[e,t]=u();if(window.opener)t(window.opener);else{const{isDocumentAtLeastInteractive:n}=xe();d(()=>{if(se||!n())return;w.log("opening new settings window");const s=v.open(new ke("#userScriptSettings",Y).href,"settingsWindow","width=400,height=450");if(se=!0,!s)throw alert("Failed to open settings window, allow popups for Krunker Qoli to work"),new Error("Failed to open settings window");t(s),y(()=>{w.log("onCleanup, closing settings window",s),s.close()});function o(){w.log("handleBeforeUnload, closing settings window",s),s?.close()}v.addEventListener("beforeunload",o),y(()=>v.removeEventListener("beforeunload",o)),gt(e,t)})}return e}async function vt(e){const[t,n]=u("connecting");y(()=>n("disposed"));const s=ft(e,{addEventListener(a,c){L[a]?L[a].push(c):L[a]=[c]},removeEventListener(a,c){L[a]&&(L[a]=L[a].filter(g=>g!==c))}},"*"),o=ye(s);y(()=>s.unsubscribeAll());function i(){o.scriptUnloading().catch(a=>w.log("on beforeUnload error",a))}v.addEventListener("beforeunload",i),y(()=>v.removeEventListener("beforeunload",i));const r=Se();d(()=>{o.scriptLocationChanged(r())});const l=new Promise(a=>{w.log("waiting for settings window");const c=setInterval(()=>{w.log("checking for settings window"),ne(o.ping,200).then(()=>{clearInterval(c),a()}).catch(g=>{w.log("[onSettingsWindowAvailablePromise]","error",g)})},200)});return ne(l,6e4).then(()=>{o.onUnloadPromise.then(()=>{w.log("settings window unloaded"),n("disposed")}),w.log("settings window available"),n("available")}).catch(a=>{w.log("settings window connection error",a),n("error")}),d(()=>{w.log("settings connection state changed",t()),t()==="available"&&(w.log("registering for remote settings callbacks"),o.registerSettingsCallback(dt,Le(wt)))}),{state:t,remoteExposedSettings:o}}function yt(){const e=bt(),[t,n]=u();return d(()=>{const s=e();if(!s)return;const o=vt(s);n(o)}),t}function Et(){d(()=>{if(!Ge()||window.opener)return;const e=window.location.href,t=new URL(`#windowManager?redirectKrunkerUrl=${e}`,Y);v.open(t,"_self")})}function Lt(){const[e,t]=u(!1),n=Se();return d(()=>{new URL(n()).searchParams.get("game")&&t(!0)}),e}function St(){const e=Lt();d(()=>{!e()||(_e(),et(),$e(),Et(),yt())})}St();
