import clonePrototype, { defineAndBindFunctionsFrom } from './fixedPrototype';

class CustomArray extends Array {}

defineAndBindFunctionsFrom(CustomArray, Array);
clonePrototype(CustomArray, Array.prototype);

export default CustomArray;
