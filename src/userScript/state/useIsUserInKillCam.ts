import { createEffect, createSignal, onCleanup } from 'solid-js';
import { createMutationObserverForStylesIfDisplayBlock, styleObserveConfig } from '../modules/utils/observerForStyles';
import { documentReadyStateIsComplete } from './documentState';

export default function useIsUserInKillCam() {
    const [isUserInKillCam, setIsUserInKillCam] = createSignal(false);
    const killCardHolderObserver = createMutationObserverForStylesIfDisplayBlock(setIsUserInKillCam);

    createEffect(() => {
        // init observer when document is loaded
        if (!documentReadyStateIsComplete()) return;

        const killCardHolderEl = document.getElementById('killCardHolder');
        if (killCardHolderEl) {
            setIsUserInKillCam(killCardHolderEl.style.display === 'block');
            killCardHolderObserver.observe(killCardHolderEl, styleObserveConfig);
            onCleanup(killCardHolderObserver.disconnect.bind(killCardHolderObserver));
        }
    });

    return isUserInKillCam;
}
