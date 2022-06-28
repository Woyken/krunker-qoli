import clonePrototype from './fixedPrototype';

class CustomMouseEvent extends MouseEvent {}

clonePrototype(CustomMouseEvent, MouseEvent.prototype);

export default CustomMouseEvent;
