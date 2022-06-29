import { getClonedPrototype, defineAndBindFunctionsFrom } from './fixedPrototype';

class CustomURL extends URL {}

defineAndBindFunctionsFrom(CustomURL, URL);
TODO = getClonedPrototype(CustomURL, URL.prototype);

export default CustomURL;
