import { createExtendedClassCopyPrototypesAndBindOwned } from './fixedPrototype';

const CustomObject = createExtendedClassCopyPrototypesAndBindOwned(Object);

export default CustomObject;
