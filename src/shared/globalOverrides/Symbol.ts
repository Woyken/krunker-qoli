import clonePrototype, { defineAndBindFunctionsFrom } from './fixedPrototype';

const LocalSymbol = Symbol;

function CustomSymbol(description?: string | number) {
    return LocalSymbol(description);
}

defineAndBindFunctionsFrom(CustomSymbol, Symbol);
clonePrototype(CustomSymbol, Symbol.prototype);

export default CustomSymbol;
