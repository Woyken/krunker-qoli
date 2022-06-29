import { createExtendedClassCopyPrototypesAndBindOwned } from './fixedPrototype';

const CustomMutationObserver = createExtendedClassCopyPrototypesAndBindOwned(MutationObserver);

export default CustomMutationObserver;
