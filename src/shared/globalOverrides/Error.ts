import { createExtendedClassCopyPrototypesAndBindOwned } from './fixedPrototype';

const CustomError = createExtendedClassCopyPrototypesAndBindOwned(Error);

export default CustomError;
