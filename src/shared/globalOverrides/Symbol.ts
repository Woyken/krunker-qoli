/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineAndBindFunctionsFrom } from './fixedPrototype';

const LocalSymbolApply = Symbol.apply.bind(Symbol);

function CustomSymbol(...args: Parameters<typeof Symbol>) {
    return LocalSymbolApply(null, args);
}

defineAndBindFunctionsFrom(CustomSymbol, Symbol);

export default CustomSymbol;
