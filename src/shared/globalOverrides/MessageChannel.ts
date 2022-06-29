import { createExtendedClassCopyPrototypesAndBindOwned } from './fixedPrototype';

const CustomMessageChannel = createExtendedClassCopyPrototypesAndBindOwned(MessageChannel);

export default CustomMessageChannel;
