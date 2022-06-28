import clonePrototype from './fixedPrototype';

class CustomKeyboardEvent extends KeyboardEvent {}

clonePrototype(CustomKeyboardEvent, KeyboardEvent.prototype);

export default CustomKeyboardEvent;
