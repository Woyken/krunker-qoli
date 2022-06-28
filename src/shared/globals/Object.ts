import fixedPrototype, { boundFunctions } from './fixedPrototype';

class CustomObject extends Object {}

boundFunctions(CustomObject, Object);
fixedPrototype(CustomObject, Object.prototype);

export default CustomObject;
