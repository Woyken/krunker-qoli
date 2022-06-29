import { getClonedPrototype } from './fixedPrototype';

class CustomMutationObserver extends MutationObserver {}

TODO = getClonedPrototype(CustomMutationObserver, MutationObserver.prototype);

export default CustomMutationObserver;
