import { createExtendedClassCopyPrototypesAndBindOwned } from './fixedPrototype';

const CustomArray = createExtendedClassCopyPrototypesAndBindOwned(Array);

export default CustomArray;
