import { createEffect, createSignal, onCleanup } from 'solid-js';
import { documentReadyStateIsComplete } from '../state/documentState';
import useIsUserInGame from '../state/useIsUserInGame';
import localDocument from '../utils/localDocumentCopy';
import createScopedLogger from '../utils/logger';
import { createMutationObserverForStylesIfDisplayBlock, styleObserveConfig } from './utils/observerForStyles';

const LocalKeyboardEvent = KeyboardEvent;

const logger = createScopedLogger('[autoPickupJunk]');

export default function useAutoPickupJunk() {
    logger.log('initAutoPickupJunk');

    const isUserInGame = useIsUserInGame();

    const [isInteractMessageVisible, setIsInteractMessageVisible] = createSignal(false);
    const [isPickupJunkMessage, setIsPickupJunkMessage] = createSignal(false);
    const interactMessageObserver = createMutationObserverForStylesIfDisplayBlock(setIsInteractMessageVisible);
    createEffect(() => {
        if (!documentReadyStateIsComplete()) return;

        logger.log('document readyState complete, adding observer');

        const interactMsgEl = localDocument.getElementById('interactMsg');
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

        const node = Array.from(localDocument.getElementsByTagName('canvas')).pop();
        const eventData = {
            code: 'KeyG',
            composed: true,
            key: 'g',
            keyCode: 71,
            which: 71,
            bubbles: true,
            cancelable: true,
        };
        node?.dispatchEvent(new LocalKeyboardEvent('keydown', eventData));
        setWasInteractPressed(true);
    });

    createEffect(() => {
        if (!wasInteractPressed()) return;
        if (!isUserInGame()) return;
        if (isInteractMessageVisible()) return;

        logger.log('releasing interact button');

        const node = Array.from(localDocument.getElementsByTagName('canvas')).pop();
        const eventData = {
            code: 'KeyG',
            composed: true,
            key: 'g',
            keyCode: 71,
            which: 71,
            bubbles: true,
            cancelable: true,
        };
        node?.dispatchEvent(new LocalKeyboardEvent('keyup', eventData));
    });
}
