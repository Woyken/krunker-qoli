import { createNanoEvents } from 'nanoevents';
import toReadonlyEventEmitter from '../../shared/utils/toReadonlyEventEmitter';
import { createFunctionProxy } from './proxyUtils';

interface WindowEvents {
    locationChanged: () => void;
}

const windowEvents = createNanoEvents<WindowEvents>();

const originalHistoryPushState = window.history.pushState;
window.history.pushState = createFunctionProxy(originalHistoryPushState, undefined, () =>
    windowEvents.emit('locationChanged')
);
const originalHistoryReplaceState = window.history.replaceState;
window.history.replaceState = createFunctionProxy(originalHistoryReplaceState, undefined, () =>
    windowEvents.emit('locationChanged')
);

window.addEventListener('hashchange', () => windowEvents.emit('locationChanged'));
window.addEventListener('popstate', () => windowEvents.emit('locationChanged'));

export default toReadonlyEventEmitter(windowEvents);
