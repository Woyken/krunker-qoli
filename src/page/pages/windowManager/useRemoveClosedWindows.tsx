import { type Accessor, onCleanup, type Setter } from 'solid-js';
import createScopedLogger from '../../../userScript/utils/logger';
import type { SavedManagedWindow } from './windowManagerPage';

const logger = createScopedLogger('[useRemoveClosedWindows]');

export function useRemoveClosedWindows(windows: Accessor<SavedManagedWindow[]>, setWindows: Setter<SavedManagedWindow[]>) {
    const interval = setInterval(() => {
        const areSomeClosed = windows().some((w) => w.wnd.closed);
        if (areSomeClosed) {
            logger.log('some are closed', windows());
            setWindows(windows().filter((w) => !w.wnd.closed));
        }
    }, 1000);
    onCleanup(() => clearInterval(interval));
}

export function useOnWindowClosedRemove(window: Accessor<Window | undefined>, setWindow: Setter<Window | undefined>) {
    const interval = setInterval(() => {
        const foundWindow = window();
        if (foundWindow && foundWindow.closed) {
            logger.log('is closed', window());
            setWindow();
        }
    }, 1000);
    onCleanup(() => clearInterval(interval));
}
