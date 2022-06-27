import { type Accessor, onCleanup } from 'solid-js';
import createScopedLogger from '../../../userScript/utils/logger';
import type { SavedManagedWindow } from './windowManagerPage';

const logger = createScopedLogger('[useOnBeforeUnloadCloseWindows]');

/**
 * will close all windows on window event beforeunload
 * and on cleanup
 */
export default function useOnBeforeUnloadCloseWindows(windows: Accessor<SavedManagedWindow[]>) {
    function onWindowBeforeUnload() {
        windows().forEach((w) => {
            w.wnd.close();
        });
    }
    window.addEventListener('beforeunload', onWindowBeforeUnload);
    onCleanup(() => {
        logger.log('onCleanup');
        window.removeEventListener('beforeunload', onWindowBeforeUnload);
        onWindowBeforeUnload();
    });
}
