import { getClonedPrototype, defineAndBindFunctionsFrom } from './fixedPrototype';

class CustomObject extends Object {}

defineAndBindFunctionsFrom(CustomObject, Object);
TODO = getClonedPrototype(CustomObject, Object.prototype);

export default CustomObject;
