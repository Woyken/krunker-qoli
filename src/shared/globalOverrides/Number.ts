import clonePrototype, { defineAndBindFunctionsFrom } from './fixedPrototype';

class CustomNumber extends Number {}

defineAndBindFunctionsFrom(CustomNumber, Number);
clonePrototype(CustomNumber, Number.prototype);

export default CustomNumber;
