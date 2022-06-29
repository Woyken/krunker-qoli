import { createExtendedClassCopyPrototypesAndBindOwned } from './fixedPrototype';

const CustomNumber = createExtendedClassCopyPrototypesAndBindOwned(Number);

export default CustomNumber;
