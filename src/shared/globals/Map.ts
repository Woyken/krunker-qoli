import fixedPrototype from './fixedPrototype';

class CustomMap extends Map {}

fixedPrototype(CustomMap, Map.prototype);

export default CustomMap;
