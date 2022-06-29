import { createExtendedClassCopyPrototypesAndBindOwned } from './fixedPrototype';

const CustomKeyboardEvent = createExtendedClassCopyPrototypesAndBindOwned(KeyboardEvent);

export default CustomKeyboardEvent;
