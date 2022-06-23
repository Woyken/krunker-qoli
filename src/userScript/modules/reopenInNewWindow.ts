import { createEffect, createSignal, onCleanup } from 'solid-js';
import localWindow from '../utils/localWindowCopy';

// Problem with this...
// If you resize window and then "onlyOneTab" causes it to reload...
// We don't have any context to go with now
// Maybe
const [isOpenedInNewWindowByWindowSize] = createSignal(window.innerHeight === 413 && window.innerWidth === 413);

export default function useReopenInNewWindow() {
    createEffect(() => {
        if (!isOpenedInNewWindowByWindowSize()) {
            const t = localWindow.setTimeout(() => {
                localWindow.open(window.location.href, 'newWindowKrunker', 'width=413,height=413');
                localWindow.open('about:blank', '_self');
            }, 200);
            onCleanup(() => clearTimeout(t));
        }
    });
}
