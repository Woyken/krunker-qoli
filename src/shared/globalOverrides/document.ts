/* eslint-disable @typescript-eslint/no-explicit-any */
import { clonePrototypesFunctionsAndBindToInstanceTree } from './fixedPrototype';

// This is going to be just simple object with all native functions taken from native prototype, bound to native instance and just copied to this object
const customDocument = {};

clonePrototypesFunctionsAndBindToInstanceTree(customDocument as any, document, document);

export default customDocument;
