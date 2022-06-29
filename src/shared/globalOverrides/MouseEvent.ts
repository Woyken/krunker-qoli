import { getClonedPrototype } from './fixedPrototype';

class CustomMouseEvent extends MouseEvent {}

TODO = getClonedPrototype(CustomMouseEvent, MouseEvent.prototype);

export default CustomMouseEvent;
