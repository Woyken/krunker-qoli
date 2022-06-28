import fixedPrototype, { boundFunctions } from './fixedPrototype';

const LocalSymbol = Symbol;

function CustomSymbol(description?: string | number) {
    return LocalSymbol(description);
}

boundFunctions(CustomSymbol, Symbol);
fixedPrototype(CustomSymbol, Symbol.prototype);

export default CustomSymbol;
