import clonePrototype, { defineAndBindFunctionsFrom } from './fixedPrototype';

class CustomWeakMap extends WeakMap {}

defineAndBindFunctionsFrom(CustomWeakMap, WeakMap);
clonePrototype(CustomWeakMap, WeakMap.prototype);

export default CustomWeakMap;
