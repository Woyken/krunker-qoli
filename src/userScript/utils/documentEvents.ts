import { createNanoEvents } from 'nanoevents';
import toReadonlyEventEmitter from '../../shared/utils/toReadonlyEventEmitter';
import { createFunctionProxy } from './proxyUtils';

interface DocumentEvents {
    calledExitPointerLock: () => void;
}

const documentEvents = createNanoEvents<DocumentEvents>();

const originalExitPointerLock = document.exitPointerLock;
document.exitPointerLock = createFunctionProxy(originalExitPointerLock, undefined, () =>
    documentEvents.emit('calledExitPointerLock')
);

export default toReadonlyEventEmitter(documentEvents);
