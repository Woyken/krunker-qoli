import { createNanoEvents } from 'nanoevents';
import { createFunctionProxy } from './proxyUtils';

interface DocumentEvents {
    calledExitPointerLock: () => void;
}

const documentEvents = createNanoEvents<DocumentEvents>();

const originalExitPointerLock = document.exitPointerLock;
document.exitPointerLock = createFunctionProxy(originalExitPointerLock, undefined, () =>
    documentEvents.emit('calledExitPointerLock')
);

export default documentEvents;
