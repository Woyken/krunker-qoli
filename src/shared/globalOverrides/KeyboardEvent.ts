import { getClonedPrototype } from './fixedPrototype';

class CustomKeyboardEvent extends KeyboardEvent {}

TODO = getClonedPrototype(CustomKeyboardEvent, KeyboardEvent.prototype);

export default CustomKeyboardEvent;
