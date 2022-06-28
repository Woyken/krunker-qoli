import clonePrototype, { defineAndBindFunctionsFrom } from './fixedPrototype';

class CustomURL extends URL {}

defineAndBindFunctionsFrom(CustomURL, URL);
clonePrototype(CustomURL, URL.prototype);

export default CustomURL;
