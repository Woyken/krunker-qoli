import { createExtendedClassCopyPrototypesAndBindOwned } from './fixedPrototype';

const CustomMap = createExtendedClassCopyPrototypesAndBindOwned(Map);

export default CustomMap;
