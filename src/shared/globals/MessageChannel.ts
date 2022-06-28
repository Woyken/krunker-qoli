import clonePrototype from './fixedPrototype';

class CustomMessageChannel extends MessageChannel {}

clonePrototype(CustomMessageChannel, MessageChannel.prototype);

export default CustomMessageChannel;
