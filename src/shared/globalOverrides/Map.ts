import { getClonedPrototype } from './fixedPrototype';

class CustomMap extends Map {}

TODO = getClonedPrototype(CustomMap, Map.prototype);

export default CustomMap;
