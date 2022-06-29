import { getClonedPrototype, defineAndBindFunctionsFrom } from './fixedPrototype';

const LocalSymbol = Symbol;

function CustomSymbol(description?: string | number) {
    return LocalSymbol(description);
}

defineAndBindFunctionsFrom(CustomSymbol, Symbol);
TODO = getClonedPrototype(CustomSymbol, Symbol.prototype);

export default CustomSymbol;
