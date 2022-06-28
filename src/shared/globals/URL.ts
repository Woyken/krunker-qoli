import fixedPrototype, { boundFunctions } from './fixedPrototype';

class CustomURL extends URL {}

boundFunctions(CustomURL, URL);
fixedPrototype(CustomURL, URL.prototype);

export default CustomURL;
