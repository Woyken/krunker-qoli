import { createEffect, createSignal, onCleanup } from 'solid-js';
import { enabledAutoClickJunkPickup } from '@/shared/state';
import { documentReadyStateIsComplete } from '../state/documentState';
import useIsUserInGame from '../state/useIsUserInGame';
import createScopedLogger from '../utils/logger';
import { createMutationObserverForStylesIfDisplayBlock, styleObserveConfig } from './utils/observerForStyles';

const logger = createScopedLogger('[autoPickupJunk]');

export default function useAutoPickupJunk() {
    logger.log('initAutoPickupJunk');

    const isUserInGame = useIsUserInGame();

    const [isInteractMessageVisible, setIsInteractMessageVisible] = createSignal(false);
    const [isPickupJunkMessage, setIsPickupJunkMessage] = createSignal(false);
    const interactMessageObserver = createMutationObserverForStylesIfDisplayBlock(setIsInteractMessageVisible);
    createEffect(() => {
        if (!documentReadyStateIsComplete()) return;
        if (!enabledAutoClickJunkPickup()) return;

        logger.log('document readyState complete, adding observer');

        const interactMsgEl = document.getElementById('interactMsg');
        if (interactMsgEl) {
            setIsPickupJunkMessage(interactMsgEl.innerHTML.includes('to pickup Junk'));
            setIsInteractMessageVisible(interactMsgEl.style.display === 'block');
            interactMessageObserver.observe(interactMsgEl, styleObserveConfig);
            onCleanup(interactMessageObserver.disconnect.bind(interactMessageObserver));
        }
    });

    const [wasInteractPressed, setWasInteractPressed] = createSignal(false);
    createEffect(() => {
        if (!isInteractMessageVisible()) return;
        if (!isPickupJunkMessage()) return;

        logger.log('pressing down interact button');

        const node = Array.from(document.getElementsByTagName('canvas')).pop();
        const eventData = {
            code: 'KeyG',
            composed: true,
            key: 'g',
            keyCode: 71,
            which: 71,
            bubbles: true,
            cancelable: true,
        };
        node?.dispatchEvent(new KeyboardEvent('keydown', eventData));
        setWasInteractPressed(true);
    });

    createEffect(() => {
        if (!wasInteractPressed()) return;
        if (!isUserInGame()) return;
        if (isInteractMessageVisible()) return;

        logger.log('releasing interact button');

        const node = Array.from(document.getElementsByTagName('canvas')).pop();
        const eventData = {
            code: 'KeyG',
            composed: true,
            key: 'g',
            keyCode: 71,
            which: 71,
            bubbles: true,
            cancelable: true,
        };
        node?.dispatchEvent(new KeyboardEvent('keyup', eventData));
    });
}
