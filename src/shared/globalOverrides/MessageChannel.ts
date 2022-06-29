import { getClonedPrototype } from './fixedPrototype';

class CustomMessageChannel extends MessageChannel {}

TODO = getClonedPrototype(CustomMessageChannel, MessageChannel.prototype);

export default CustomMessageChannel;
