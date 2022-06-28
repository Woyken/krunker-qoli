import fixedPrototype from './fixedPrototype';

class CustomMouseEvent extends MouseEvent {}

fixedPrototype(CustomMouseEvent, MouseEvent.prototype);

export default CustomMouseEvent;
