import { type Accessor, onCleanup, type Setter } from 'solid-js';
import type { SavedManagedWindow } from './windowManagerPage';

export default function useRemoveClosedWindows(windows: Accessor<SavedManagedWindow[]>, setWindows: Setter<SavedManagedWindow[]>) {
    const interval = setInterval(() => {
        const areSomeClosed = windows().some((w) => w.wnd.closed);
        if (areSomeClosed) {
            setWindows(windows().filter((w) => !w.wnd.closed));
        }
    }, 1000);
    onCleanup(() => clearInterval(interval));
}
