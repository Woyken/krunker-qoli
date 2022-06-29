import { getClonedPrototype, defineAndBindFunctionsFrom } from './fixedPrototype';

class CustomNumber extends Number {}

defineAndBindFunctionsFrom(CustomNumber, Number);
TODO = getClonedPrototype(CustomNumber, Number.prototype);

export default CustomNumber;
