import { getClonedPrototype, defineAndBindFunctionsFrom } from './fixedPrototype';

class CustomPromise extends Promise<unknown> {}

defineAndBindFunctionsFrom(CustomPromise, Promise);
TODO = getClonedPrototype(CustomPromise, Promise.prototype);

export default CustomPromise;
