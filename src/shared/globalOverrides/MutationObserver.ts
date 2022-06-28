import clonePrototype from './fixedPrototype';

class CustomMutationObserver extends MutationObserver {}

clonePrototype(CustomMutationObserver, MutationObserver.prototype);

export default CustomMutationObserver;
