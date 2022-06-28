import fixedPrototype, { boundFunctions } from './fixedPrototype';

class CustomPromise extends Promise<unknown> {}

boundFunctions(CustomPromise, Promise);
fixedPrototype(CustomPromise, Promise.prototype);

export default CustomPromise;
