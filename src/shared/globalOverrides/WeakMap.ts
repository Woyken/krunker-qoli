import { createExtendedClassCopyPrototypesAndBindOwned } from './fixedPrototype';

const CustomWeakMap = createExtendedClassCopyPrototypesAndBindOwned(WeakMap);

export default CustomWeakMap;
