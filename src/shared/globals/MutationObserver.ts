import fixedPrototype from './fixedPrototype';

class CustomMutationObserver extends MutationObserver {}

fixedPrototype(CustomMutationObserver, MutationObserver.prototype);

export default CustomMutationObserver;
