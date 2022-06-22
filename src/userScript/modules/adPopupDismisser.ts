import { createEffect, createSignal } from 'solid-js';
import documentReadyStateIsComplete from '../state/documentState';
import { enabledAdPopupDismisser } from '../state/userScriptSettingsState';
import localDocument from '../utils/localDocumentCopy';
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

        const el = localDocument.getElementById('popupHolder');
        if (el) {
            setIsAdPopupActive(el.style.display === 'block');
            adPopupHolderObserver.observe(el, styleObserveConfig);
        }
    });

    createEffect(() => {
        if (!enabledAdPopupDismisser()) return;

        logger.log('isAdPopupActive effect', isAdPopupActive());
        if (isAdPopupActive()) localDocument.getElementById('popupBack')?.click();
    });
}
