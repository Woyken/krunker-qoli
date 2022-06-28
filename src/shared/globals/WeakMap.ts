import fixedPrototype, { boundFunctions } from './fixedPrototype';

class CustomWeakMap extends WeakMap {}

boundFunctions(CustomWeakMap, WeakMap);
fixedPrototype(CustomWeakMap, WeakMap.prototype);

export default CustomWeakMap;
