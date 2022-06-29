import { createExtendedClassCopyPrototypesAndBindOwned } from './fixedPrototype';

const CustomURL = createExtendedClassCopyPrototypesAndBindOwned(URL);

export default CustomURL;
