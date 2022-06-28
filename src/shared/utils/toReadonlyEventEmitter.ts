import type { Emitter } from 'nanoevents';

export default function toReadonlyEventEmitter<T>(emitter: Emitter<T>) {
    return {
        on: emitter.on.bind(emitter),
    };
}
