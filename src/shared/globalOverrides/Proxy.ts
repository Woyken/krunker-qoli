import { createExtendedClassCopyPrototypesAndBindOwned } from './fixedPrototype';

let createTempPrototype = false;
if (!Proxy.prototype) createTempPrototype = true;
if (createTempPrototype) Proxy.prototype = Object.create(null);

const CustomProxy = createExtendedClassCopyPrototypesAndBindOwned(Proxy);
if (createTempPrototype) delete Proxy.prototype;

export default CustomProxy;
