
// ==UserScript==
// @name         Krunker Quoli
// @namespace    https://github.com/Woyken/krunker-qoli
// @version      0.5.2
// @description  
// @author       Woyken
// @match        https://krunker.io/*
// @grant        none
// @run-at       document-start
// @downloadURL  https://woyken.github.io/krunker-qoli/script.user.js
// ==/UserScript==
/**/

const Pe=(e,t)=>e===t,q={equals:Pe};let re=ae;const U={},C=1,W=2,Ie={owned:null,cleanups:null,context:null,owner:null};var w=null;let M=null,d=null,R=null,f=null,y=null,j=0;function u(e,t){t=t?Object.assign({},q,t):q;const n={value:e,observers:null,observerSlots:null,pending:U,comparator:t.equals||void 0},s=o=>(typeof o=="function"&&(o=o(n.pending!==U?n.pending:n.value)),_(n,o));return[Ue.bind(n),s]}function p(e,t,n){re=De;const s=Te(e,t,!1,C),o=J&&de(w,J.id);o&&(s.suspense=o),s.user=!0,y?y.push(s):$(s)}function Re(e){if(R)return e();let t;const n=R=[];try{t=e()}finally{R=null}return ie(()=>{for(let s=0;s<n.length;s+=1){const o=n[s];if(o.pending!==U){const i=o.pending;o.pending=U,_(o,i)}}},!1),t}function Ae(e){let t,n=d;return d=null,t=e(),d=n,t}function E(e){return w===null||(w.cleanups===null?w.cleanups=[e]:w.cleanups.push(e)),e}let J;function Ue(){const e=M;if(this.sources&&(this.state||e)){const t=f;f=null,this.state===C||e?$(this):F(this),f=t}if(d){const t=this.observers?this.observers.length:0;d.sources?(d.sources.push(this),d.sourceSlots.push(t)):(d.sources=[this],d.sourceSlots=[t]),this.observers?(this.observers.push(d),this.observerSlots.push(d.sources.length-1)):(this.observers=[d],this.observerSlots=[d.sources.length-1])}return this.value}function _(e,t,n){if(R)return e.pending===U&&R.push(e),e.pending=t,t;if(e.comparator&&e.comparator(e.value,t))return t;let s=!1;return e.value=t,e.observers&&e.observers.length&&ie(()=>{for(let o=0;o<e.observers.length;o+=1){const i=e.observers[o];s&&M.disposed.has(i),(s&&!i.tState||!s&&!i.state)&&(i.pure?f.push(i):y.push(i),i.observers&&ce(i)),s||(i.state=C)}if(f.length>1e6)throw f=[],new Error},!1),t}function $(e){if(!e.fn)return;le(e);const t=w,n=d,s=j;d=w=e,Me(e,e.value,s),d=n,w=t}function Me(e,t,n){let s;try{s=e.fn(t)}catch(o){ue(o)}(!e.updatedAt||e.updatedAt<=n)&&(e.observers&&e.observers.length?_(e,s):e.value=s,e.updatedAt=n)}function Te(e,t,n,s=C,o){const i={fn:e,state:s,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:w,context:null,pure:n};return w===null||w!==Ie&&(w.owned?w.owned.push(i):w.owned=[i]),i}function A(e){const t=M;if(e.state===0||t)return;if(e.state===W||t)return F(e);if(e.suspense&&Ae(e.suspense.inFallback))return e.suspense.effects.push(e);const n=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<j);)(e.state||t)&&n.push(e);for(let s=n.length-1;s>=0;s--)if(e=n[s],e.state===C||t)$(e);else if(e.state===W||t){const o=f;f=null,F(e,n[0]),f=o}}function ie(e,t){if(f)return e();let n=!1;t||(f=[]),y?n=!0:y=[],j++;try{const s=e();return xe(n),s}catch(s){ue(s)}finally{f=null,n||(y=null)}}function xe(e){f&&(ae(f),f=null),!e&&(y.length?Re(()=>{re(y),y=null}):y=null)}function ae(e){for(let t=0;t<e.length;t++)A(e[t])}function De(e){let t,n=0;for(t=0;t<e.length;t++){const o=e[t];o.user?e[n++]=o:A(o)}const s=e.length;for(t=0;t<n;t++)A(e[t]);for(t=s;t<e.length;t++)A(e[t])}function F(e,t){const n=M;e.state=0;for(let s=0;s<e.sources.length;s+=1){const o=e.sources[s];o.sources&&(o.state===C||n?o!==t&&A(o):(o.state===W||n)&&F(o,t))}}function ce(e){const t=M;for(let n=0;n<e.observers.length;n+=1){const s=e.observers[n];(!s.state||t)&&(s.state=W,s.pure?f.push(s):y.push(s),s.observers&&ce(s))}}function le(e){let t;if(e.sources)for(;e.sources.length;){const n=e.sources.pop(),s=e.sourceSlots.pop(),o=n.observers;if(o&&o.length){const i=o.pop(),r=n.observerSlots.pop();s<o.length&&(i.sourceSlots[r]=s,o[s]=i,n.observerSlots[s]=r)}}if(e.owned){for(t=0;t<e.owned.length;t++)le(e.owned[t]);e.owned=null}if(e.cleanups){for(t=0;t<e.cleanups.length;t++)e.cleanups[t]();e.cleanups=null}e.state=0,e.context=null}function ue(e){throw e}function de(e,t){return e?e.context&&e.context[t]!==void 0?e.context[t]:de(e.owner,t):void 0}const m={getElementById:document.getElementById.bind(document),getElementsByClassName:document.getElementsByClassName.bind(document),getElementsByTagName:document.getElementsByTagName.bind(document),addEventListener:document.addEventListener.bind(document),removeEventListener:document.removeEventListener.bind(document),createEvent:document.createEvent.bind(document),hasFocus:document.hasFocus.bind(document)},Oe=console.log.bind(console);class z{constructor(...t){this.argsScope=t}createScopedLogger(...t){return new z(...this.argsScope,...t)}log(...t){Oe(...this.argsScope,...t)}}function P(...e){return new z("[Krunker Qoli]",...e)}const We=P("[documentState]"),[T,Z]=u(!1);document.readyState!=="complete"?m.addEventListener("readystatechange",function e(){document.readyState==="complete"&&(m.removeEventListener("readystatechange",e),We.log("document readyState complete event received, setting state true"),Z(!0))}):Z(!0);function Fe(){const[e,t]=u(document.readyState),n=()=>document.readyState==="loading",s=()=>document.readyState==="interactive",o=()=>document.readyState==="complete",[i,r]=u(n()||s()||o()),[c,a]=u(s()||o()),[l,g]=u(o());return m.addEventListener("readystatechange",function h(){t(document.readyState),r(n()||s()||o()),a(s()||o()),g(o()),o()&&m.removeEventListener("readystatechange",h)}),{documentReadyState:e,isDocumentAtLeastLoading:i,isDocumentAtLeastInteractive:c,isDocumentAtLeastComplete:l}}const[Lt,Ne]=u(!1),[Be,He]=u(!1),[fe,Ge]=u(!1),[Ke,Ve]=u(!1);class je extends MutationObserver{constructor(){super(...arguments),this.observe=MutationObserver.prototype.observe}}function _e(e){return new je(t=>{t.forEach(n=>{n.type==="attributes"&&n.attributeName==="style"&&e(n.target.style)})})}function N(e){return _e(t=>{const n=t.display==="block";e(n)})}const B={attributes:!0,attributeFilter:["style"]},H=P("[adPopupDismisser]");function $e(){H.log("initAdPopupDismisser");const[e,t]=u(!1),n=N(t);p(()=>{if(!T())return;H.log("document readyState complete, adding observer");const s=m.getElementById("popupHolder");s&&(t(s.style.display==="block"),n.observe(s,B),E(n.disconnect.bind(n)))}),p(()=>{!Be()||(H.log("isAdPopupActive effect",e()),e()&&m.getElementById("popupBack")?.click())})}function ge(){const[e,t]=u(!1),n=N(t);return p(()=>{if(!T())return;const s=m.getElementById("inGameUI");s&&(t(s.style.display==="block"),n.observe(s,B),E(n.disconnect.bind(n)))}),e}const G={arrayFrom:Array.from.bind(Array)},ee=KeyboardEvent,D=P("[autoReload]");function ze(){D.log("initAutoReload");const e=ge(),[t,n]=u(!1),s=N(n);p(()=>{if(!T())return;D.log("document readyState complete, adding observer");const r=m.getElementById("reloadMsg");r&&(n(r.style.display==="block"),s.observe(r,B),E(s.disconnect.bind(s)))});const[o,i]=u(!1);p(()=>{if(!fe()||!t())return;D.log("pressing down reload button");const r=G.arrayFrom(m.getElementsByTagName("canvas")).pop(),c={code:"KeyR",composed:!0,key:"r",keyCode:82,which:82,bubbles:!0,cancelable:!0};r?.dispatchEvent(new ee("keydown",c)),i(!0)}),p(()=>{if(!o()||!e()||t())return;D.log("releasing reload button");const r=G.arrayFrom(m.getElementsByTagName("canvas")).pop(),c={code:"KeyR",composed:!0,key:"r",keyCode:82,which:82,bubbles:!0,cancelable:!0};r?.dispatchEvent(new ee("keyup",c))})}const v={open:window.open.bind(window),addEventListener:window.addEventListener.bind(window),removeEventListener:window.removeEventListener.bind(window),setTimeout:window.setTimeout.bind(window),clearTimeout:window.clearTimeout.bind(window)};function Qe(){const[e,t]=u(m.hasFocus()),n=()=>t(!0),s=()=>t(!1);return v.addEventListener("focus",n),v.addEventListener("blur",s),E(()=>{v.removeEventListener("focus",n),v.removeEventListener("blur",s)}),e}function Ye(){const[e,t]=u(!1);function n(){t(!!document.pointerLockElement)}return p(()=>{!T()||(m.addEventListener("pointerlockchange",n),E(()=>{m.removeEventListener("pointerlockchange",n)}))}),e}function Xe(){const[e,t]=u(!1),n=N(t);return p(()=>{if(!T())return;const s=m.getElementById("killCardHolder");s&&(t(s.style.display==="block"),n.observe(s,B),E(n.disconnect.bind(n)))}),e}let pe=()=>({events:{},emit(e,...t){let n=this.events[e]||[];for(let s=0,o=n.length;s<o;s++)n[s](...t)},on(e,t){return this.events[e]?.push(t)||(this.events[e]=[t]),()=>{this.events[e]=this.events[e]?.filter(n=>t!==n)}}});function Q(e,t,n){return new Proxy(e,{apply(s,o,i){t?.(...i);const r=s.apply(o,i);return n?.(...i),r}})}const me=pe(),qe=document.exitPointerLock;document.exitPointerLock=Q(qe,void 0,()=>me.emit("calledExitPointerLock"));const te=MouseEvent,he=P("[fastRespawn]");function Je(){he.log("trying to activate game");const e=G.arrayFrom(m.getElementsByTagName("canvas")).pop();e?.dispatchEvent(new te("mousedown",{bubbles:!0,cancelable:!0})),e?.dispatchEvent(new te("mouseup",{bubbles:!0,cancelable:!0}))}function Ze(){he.log("initFastRespawn");const e=Xe(),t=ge(),n=Ye(),s=Qe(),[o,i]=u(!1),r=me.on("calledExitPointerLock",()=>{n()&&i(!0)});E(()=>{r()}),p(()=>{n()&&i(!1)}),p(()=>{!fe()||!s()||!o()||n()||t()||!e()||(i(!1),Je())})}const we=Symbol("Comlink.proxy"),et=Symbol("Comlink.endpoint"),tt=Symbol("Comlink.releaseProxy"),K=Symbol("Comlink.thrown"),be=e=>typeof e=="object"&&e!==null||typeof e=="function",nt={canHandle:e=>be(e)&&e[we],serialize(e){const{port1:t,port2:n}=new MessageChannel;return Ee(e,t),[n,[n]]},deserialize(e){return e.start(),Le(e)}},st={canHandle:e=>be(e)&&K in e,serialize({value:e}){let t;return e instanceof Error?t={isError:!0,value:{message:e.message,name:e.name,stack:e.stack}}:t={isError:!1,value:e},[t,[]]},deserialize(e){throw e.isError?Object.assign(new Error(e.value.message),e.value):e.value}},ve=new Map([["proxy",nt],["throw",st]]);function Ee(e,t=self){t.addEventListener("message",function n(s){if(!s||!s.data)return;const{id:o,type:i,path:r}=Object.assign({path:[]},s.data),c=(s.data.argumentList||[]).map(S);let a;try{const l=r.slice(0,-1).reduce((h,I)=>h[I],e),g=r.reduce((h,I)=>h[I],e);switch(i){case"GET":a=g;break;case"SET":l[r.slice(-1)[0]]=S(s.data.value),a=!0;break;case"APPLY":a=g.apply(l,c);break;case"CONSTRUCT":{const h=new g(...c);a=ke(h)}break;case"ENDPOINT":{const{port1:h,port2:I}=new MessageChannel;Ee(e,I),a=it(h,[h])}break;case"RELEASE":a=void 0;break;default:return}}catch(l){a={value:l,[K]:0}}Promise.resolve(a).catch(l=>({value:l,[K]:0})).then(l=>{const[g,h]=Y(l);t.postMessage(Object.assign(Object.assign({},g),{id:o}),h),i==="RELEASE"&&(t.removeEventListener("message",n),ye(t))})}),t.start&&t.start()}function ot(e){return e.constructor.name==="MessagePort"}function ye(e){ot(e)&&e.close()}function Le(e,t){return V(e,[],t)}function O(e){if(e)throw new Error("Proxy has been released and is not useable")}function V(e,t=[],n=function(){}){let s=!1;const o=new Proxy(n,{get(i,r){if(O(s),r===tt)return()=>k(e,{type:"RELEASE",path:t.map(c=>c.toString())}).then(()=>{ye(e),s=!0});if(r==="then"){if(t.length===0)return{then:()=>o};const c=k(e,{type:"GET",path:t.map(a=>a.toString())}).then(S);return c.then.bind(c)}return V(e,[...t,r])},set(i,r,c){O(s);const[a,l]=Y(c);return k(e,{type:"SET",path:[...t,r].map(g=>g.toString()),value:a},l).then(S)},apply(i,r,c){O(s);const a=t[t.length-1];if(a===et)return k(e,{type:"ENDPOINT"}).then(S);if(a==="bind")return V(e,t.slice(0,-1));const[l,g]=ne(c);return k(e,{type:"APPLY",path:t.map(h=>h.toString()),argumentList:l},g).then(S)},construct(i,r){O(s);const[c,a]=ne(r);return k(e,{type:"CONSTRUCT",path:t.map(l=>l.toString()),argumentList:c},a).then(S)}});return o}function rt(e){return Array.prototype.concat.apply([],e)}function ne(e){const t=e.map(Y);return[t.map(n=>n[0]),rt(t.map(n=>n[1]))]}const Se=new WeakMap;function it(e,t){return Se.set(e,t),e}function ke(e){return Object.assign(e,{[we]:!0})}function at(e,t=self,n="*"){return{postMessage:(s,o)=>e.postMessage(s,n,o),addEventListener:t.addEventListener.bind(t),removeEventListener:t.removeEventListener.bind(t)}}function Y(e){for(const[t,n]of ve)if(n.canHandle(e)){const[s,o]=n.serialize(e);return[{type:"HANDLER",name:t,value:s},o]}return[{type:"RAW",value:e},Se.get(e)||[]]}function S(e){switch(e.type){case"HANDLER":return ve.get(e.name).deserialize(e.value);case"RAW":return e.value}}function k(e,t,n){return new Promise(s=>{const o=ct();e.addEventListener("message",function i(r){!r.data||!r.data.id||r.data.id!==o||(e.removeEventListener("message",i),s(r.data))}),e.start&&e.start(),e.postMessage(Object.assign({id:o},t),n)})}function ct(){return new Array(4).fill(0).map(()=>Math.floor(Math.random()*Number.MAX_SAFE_INTEGER).toString(16)).join("-")}const lt="0.5.2",ut=lt;function dt(...e){const t=at(...e),n={},s=t.addEventListener.bind(t);t.addEventListener=(...r)=>{const c=n[r[0]];return c?c.push(r[1]):n[r[0]]=[r[1]],s(...r)};const o=t.removeEventListener.bind(t);t.removeEventListener=(...r)=>{const c=n[r[0]];return c&&(n[r[0]]=c.filter(a=>a!==r[1])),o(...r)};function i(){Object.keys(n).forEach(r=>{n[r].forEach(c=>{o(r,c)})})}return{unsubscribeAll:i,...t}}const ft=P("[useRemoveClosedWindows]");function gt(e,t){const n=setInterval(()=>{const s=e();s&&s.closed&&(ft.log("is closed",e()),t())},1e3);E(()=>clearInterval(n))}const x=pe(),pt=window.history.pushState;window.history.pushState=Q(pt,void 0,()=>x.emit("locationChanged"));const mt=window.history.replaceState;window.history.replaceState=Q(mt,void 0,()=>x.emit("locationChanged"));v.addEventListener("hashchange",()=>x.emit("locationChanged"));v.addEventListener("popstate",()=>x.emit("locationChanged"));function ht(){const[e,t]=u(window.location.href);return x.on("locationChanged",()=>{t(window.location.href)}),e}const b=P("[Settings window communication]"),Ce=URL,X=new Ce("https://woyken.github.io/krunker-qoli"),L={};v.addEventListener("message",e=>{e.origin===X.origin&&e.stopImmediatePropagation(),L.message?.forEach(t=>{"handleEvent"in t?t.handleEvent(e):t(e)})});function wt(e){b.log("settingsUpdatedCallback",e),Ge(e.enabledFastRespawn),He(e.enabledAdPopupRemoval),Ne(e.enabledAutoReload),Ve(e.enabledWindowManager)}function se(e,t){return new Promise((n,s)=>{setTimeout(()=>{s(new Error("Promise timed out"))},t),e.then(n,s)})}let oe=!1;function bt(){const[e,t]=u();if(window.opener)t(window.opener);else{const{isDocumentAtLeastInteractive:n}=Fe();p(()=>{if(oe||!n())return;b.log("opening new settings window");const s=v.open(new Ce("#userScriptSettings",X).href,"settingsWindow","width=400,height=450");if(oe=!0,!s)throw alert("Failed to open settings window, allow popups for Krunker Qoli to work"),new Error("Failed to open settings window");t(s),E(()=>{b.log("onCleanup, closing settings window",s),s.close()});function o(){b.log("handleBeforeUnload, closing settings window",s),s?.close()}v.addEventListener("beforeunload",o),E(()=>v.removeEventListener("beforeunload",o)),gt(e,t)})}return e}async function vt(e){const[t,n]=u("connecting");E(()=>n("disposed"));const s=dt(e,{addEventListener(a,l){L[a]?L[a].push(l):L[a]=[l]},removeEventListener(a,l){L[a]&&(L[a]=L[a].filter(g=>g!==l))}},"*"),o=Le(s);E(()=>s.unsubscribeAll());function i(){o.scriptUnloading().catch(a=>b.log("on beforeUnload error",a))}v.addEventListener("beforeunload",i),E(()=>v.removeEventListener("beforeunload",i));const r=ht();p(()=>{o.scriptLocationChanged(r())});const c=new Promise(a=>{b.log("waiting for settings window");const l=setInterval(()=>{b.log("checking for settings window"),se(o.ping,200).then(()=>{clearInterval(l),a()}).catch(g=>{b.log("[onSettingsWindowAvailablePromise]","error",g)})},200)});return se(c,6e4).then(()=>{o.onUnloadPromise.then(()=>{b.log("settings window unloaded"),n("disposed")}),b.log("settings window available"),n("available")}).catch(a=>{b.log("settings window connection error",a),n("error")}),p(()=>{b.log("settings connection state changed",t()),t()==="available"&&(b.log("registering for remote settings callbacks"),o.registerSettingsCallback(ut,ke(wt)))}),{state:t,remoteExposedSettings:o}}function Et(){const e=bt(),[t,n]=u();return p(()=>{const s=e();if(!s)return;const o=vt(s);n(o)}),t}function yt(){p(()=>{if(!Ke()||window.opener)return;const e=window.location.href,t=new URL(`#windowManager?redirectKrunkerUrl=${e}`,X);v.open(t,"_self")})}$e();Ze();ze();yt();Et();
