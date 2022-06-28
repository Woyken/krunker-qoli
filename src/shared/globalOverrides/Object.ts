import clonePrototype, { defineAndBindFunctionsFrom } from './fixedPrototype';

class CustomObject extends Object {}

defineAndBindFunctionsFrom(CustomObject, Object);
clonePrototype(CustomObject, Object.prototype);

export default CustomObject;
