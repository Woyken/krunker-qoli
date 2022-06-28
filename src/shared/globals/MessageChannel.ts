import fixedPrototype from './fixedPrototype';

class CustomMessageChannel extends MessageChannel {}

fixedPrototype(CustomMessageChannel, MessageChannel.prototype);

export default CustomMessageChannel;
