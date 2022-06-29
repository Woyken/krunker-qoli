import { createExtendedClassCopyPrototypesAndBindOwned } from './fixedPrototype';

const CustomPromise = createExtendedClassCopyPrototypesAndBindOwned(Promise<unknown>);

export default CustomPromise;
