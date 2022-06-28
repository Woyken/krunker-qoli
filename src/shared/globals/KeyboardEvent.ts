import fixedPrototype from './fixedPrototype';

class CustomKeyboardEvent extends KeyboardEvent {}

fixedPrototype(CustomKeyboardEvent, KeyboardEvent.prototype);

export default CustomKeyboardEvent;
