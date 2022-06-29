import { createExtendedClassCopyPrototypesAndBindOwned } from './fixedPrototype';

const CustomMouseEvent = createExtendedClassCopyPrototypesAndBindOwned(MouseEvent);

export default CustomMouseEvent;
