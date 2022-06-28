import { createEffect, createSignal, onCleanup } from 'solid-js';
import { documentReadyStateIsComplete } from '../state/documentState';
import { enabledAdPopupDismisser } from '../state/userScriptSettingsState';
import createScopedLogger from '../utils/logger';
import { createMutationObserverForStylesIfDisplayBlock, styleObserveConfig } from './utils/observerForStyles';

const logger = createScopedLogger('[adPopupDismisser]');

export default function useAdPopupDismisser() {
    logger.log('initAdPopupDismisser');

    const [isAdPopupActive, setIsAdPopupActive] = createSignal(false);
    const adPopupHolderObserver = createMutationObserverForStylesIfDisplayBlock(setIsAdPopupActive);
    createEffect(() => {
        if (!documentReadyStateIsComplete()) return;

        logger.log('document readyState complete, adding observer');

        const el = document.getElementById('popupHolder');
        if (el) {
            setIsAdPopupActive(el.style.display === 'block');
            adPopupHolderObserver.observe(el, styleObserveConfig);
            onCleanup(adPopupHolderObserver.disconnect.bind(adPopupHolderObserver));
        }
    });

    createEffect(() => {
        if (!enabledAdPopupDismisser()) return;

        logger.log('isAdPopupActive effect', isAdPopupActive());
        if (isAdPopupActive()) document.getElementById('popupBack')?.click();
    });
}
