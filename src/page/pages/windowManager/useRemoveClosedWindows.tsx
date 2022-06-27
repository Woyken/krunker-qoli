import { type Accessor, onCleanup, type Setter } from 'solid-js';
import type { SavedManagedWindow } from './windowManagerPage';

export function useRemoveClosedWindows(windows: Accessor<SavedManagedWindow[]>, setWindows: Setter<SavedManagedWindow[]>) {
    const interval = setInterval(() => {
        const areSomeClosed = windows().some((w) => w.wnd.closed);
        if (areSomeClosed) {
            setWindows(windows().filter((w) => !w.wnd.closed));
        }
    }, 1000);
    onCleanup(() => clearInterval(interval));
}

export function useOnWindowClosedRemove(window: Accessor<Window | undefined>, setWindow: Setter<Window | undefined>) {
    const interval = setInterval(() => {
        const foundWindow = window();
        if (foundWindow && foundWindow.closed) {
            setWindow();
        }
    }, 1000);
    onCleanup(() => clearInterval(interval));
}
