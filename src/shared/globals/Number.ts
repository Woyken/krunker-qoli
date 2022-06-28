import fixedPrototype, { boundFunctions } from './fixedPrototype';

class CustomNumber extends Number {}

boundFunctions(CustomNumber, Number);
fixedPrototype(CustomNumber, Number.prototype);

export default CustomNumber;
