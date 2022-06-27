import { windowEndpoint } from 'comlink';

export default function windowEndpointWithUnsubscribe(...args: Parameters<typeof windowEndpoint>) {
    const endpoint = windowEndpoint(...args);

    const activeEventListeners: Record<string, EventListenerOrEventListenerObject[]> = {};
    const originalAdd = endpoint.addEventListener.bind(endpoint);
    endpoint.addEventListener = (...addArgs) => {
        const found = activeEventListeners[addArgs[0]];
        if (found) found.push(addArgs[1]);
        else activeEventListeners[addArgs[0]] = [addArgs[1]];

        return originalAdd(...addArgs);
    };
    const originalRemove = endpoint.removeEventListener.bind(endpoint);
    endpoint.removeEventListener = (...removeArgs) => {
        const found = activeEventListeners[removeArgs[0]];
        if (found) activeEventListeners[removeArgs[0]] = found.filter((f) => f !== removeArgs[1]);

        return originalRemove(...removeArgs);
    };
    function unsubscribeAll() {
        Object.keys(activeEventListeners).forEach((key) => {
            activeEventListeners[key].forEach((fn) => {
                originalRemove(key, fn);
            });
        });
    }
    return {
        unsubscribeAll,
        ...endpoint,
    };
}
