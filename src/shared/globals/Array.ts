import fixedPrototype, { boundFunctions } from './fixedPrototype';

// const customArray = spreadObjectAndBindFunctions(window.Array as any) as typeof window.Array;
class CustomArray extends Array {}

boundFunctions(CustomArray, Array);
fixedPrototype(CustomArray, Array.prototype);

export default CustomArray;
