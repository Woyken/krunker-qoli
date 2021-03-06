import { createEffect, createSignal, onCleanup } from 'solid-js';
import { enabledFastRespawn } from '@/shared/state';
import { documentReadyStateIsComplete } from '../state/documentState';
import useDocumentIsPointerLocked from '../state/useDocumentIsPointerLocked';
import useIsUserInGame from '../state/useIsUserInGame';
import createScopedLogger from '../utils/logger';
import { createMutationObserverForStylesIfDisplayBlock, styleObserveConfig } from './utils/observerForStyles';

const logger = createScopedLogger('[autoReload]');

export default function useAutoReload() {
    logger.log('initAutoReload');

    const isUserInGame = useIsUserInGame();

    const [isReloadMessageVisible, setIsReloadMessageVisible] = createSignal(false);
    const reloadMessageObserver = createMutationObserverForStylesIfDisplayBlock(setIsReloadMessageVisible);
    createEffect(() => {
        if (!documentReadyStateIsComplete()) return;

        logger.log('document readyState complete, adding observer');

        const reloadMsgEl = document.getElementById('reloadMsg');
        if (reloadMsgEl) {
            setIsReloadMessageVisible(reloadMsgEl.style.display === 'block');
            reloadMessageObserver.observe(reloadMsgEl, styleObserveConfig);
            onCleanup(reloadMessageObserver.disconnect.bind(reloadMessageObserver));
        }
    });

    const [wasReloadPressed, setWasReloadPressed] = createSignal(false);
    createEffect(() => {
        if (!enabledFastRespawn()) return;
        if (!isReloadMessageVisible()) return;

        logger.log('pressing down reload button');

        const node = Array.from(document.getElementsByTagName('canvas')).pop();
        const eventData = {
            code: 'KeyR',
            composed: true,
            key: 'r',
            keyCode: 82,
            which: 82,
            bubbles: true,
            cancelable: true,
        };
        node?.dispatchEvent(new KeyboardEvent('keydown', eventData));
        setWasReloadPressed(true);
    });

    const isPointerLocked = useDocumentIsPointerLocked();
    createEffect(() => {
        if (!wasReloadPressed()) return;
        if (!isUserInGame()) return;
        if (!isPointerLocked()) return;
        if (isReloadMessageVisible()) return;

        logger.log('releasing reload button');

        const node = Array.from(document.getElementsByTagName('canvas')).pop();
        const eventData = {
            code: 'KeyR',
            composed: true,
            key: 'r',
            keyCode: 82,
            which: 82,
            bubbles: true,
            cancelable: true,
        };
        node?.dispatchEvent(new KeyboardEvent('keyup', eventData));
    });
}
