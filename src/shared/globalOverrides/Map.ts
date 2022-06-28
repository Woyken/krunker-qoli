import clonePrototype from './fixedPrototype';

class CustomMap extends Map {}

clonePrototype(CustomMap, Map.prototype);

export default CustomMap;
