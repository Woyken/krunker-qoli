import { getClonedPrototype, defineAndBindFunctionsFrom } from './fixedPrototype';

class CustomArray extends Array {}

defineAndBindFunctionsFrom(CustomArray, Array);
TODO = getClonedPrototype(Array.prototype, CustomArray.prototype);

export default CustomArray;
