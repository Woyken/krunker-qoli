import { getClonedPrototype, defineAndBindFunctionsFrom } from './fixedPrototype';

class CustomWeakMap extends WeakMap {}

defineAndBindFunctionsFrom(CustomWeakMap, WeakMap);
TODO = getClonedPrototype(CustomWeakMap, WeakMap.prototype);

export default CustomWeakMap;
