import clonePrototype, { defineAndBindFunctionsFrom } from './fixedPrototype';

class CustomPromise extends Promise<unknown> {}

defineAndBindFunctionsFrom(CustomPromise, Promise);
clonePrototype(CustomPromise, Promise.prototype);

export default CustomPromise;
