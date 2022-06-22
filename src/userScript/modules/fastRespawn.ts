import { createEffect, createSignal } from 'solid-js';
import documentReadyStateIsComplete from '../state/documentState';
import { enabledFastRespawn } from '../state/userScriptSettingsState';
import localArray from '../utils/localArrayCopy';
import localDocument from '../utils/localDocumentCopy';
import createScopedLogger from '../utils/logger';
import { createMutationObserverForStylesIfDisplayBlock, styleObserveConfig } from './utils/observerForStyles';

const LocalMouseEvent = MouseEvent;

const logger = createScopedLogger('[fastRespawn]');

const [isUserInDeathWindow, setIsUserInDeathWindow] = createSignal(false);
const killCardHolderObserver = createMutationObserverForStylesIfDisplayBlock(setIsUserInDeathWindow);

createEffect(() => {
    logger.log('isUserInDeathWindow', isUserInDeathWindow());
});

const [isUserInGame, setIsUserInGame] = createSignal(false);
const inGameUiObserver = createMutationObserverForStylesIfDisplayBlock(setIsUserInGame);

createEffect(() => {
    logger.log('isUserInGame', isUserInGame());
});

const [isPointerLocked, setIsPointerLocked] = createSignal(false);

createEffect(() => {
    logger.log('isPointerLocked', isPointerLocked());
});

function tryToActivateGame() {
    logger.log('trying to activate game');
    const node = localArray.arrayFrom(localDocument.getElementsByTagName('canvas')).pop();
    node?.dispatchEvent(new LocalMouseEvent('mousedown', { bubbles: true, cancelable: true }));
    node?.dispatchEvent(new LocalMouseEvent('mouseup', { bubbles: true, cancelable: true }));
}

createEffect(() => {
    if (!enabledFastRespawn()) return;
    if (isPointerLocked()) return;
    if (isUserInGame()) return;
    if (!isUserInDeathWindow()) return;

    tryToActivateGame();
});

export default function initFastRespawn() {
    logger.log('initFastRespawn');
    createEffect(() => {
        if (!documentReadyStateIsComplete()) return;

        logger.log('document readyState complete, adding observer');

        const inGameUiEl = localDocument.getElementById('inGameUI');
        if (inGameUiEl) {
            setIsUserInGame(inGameUiEl.style.display === 'block');
            inGameUiObserver.observe(inGameUiEl, styleObserveConfig);
        }

        const killCardHolderEl = localDocument.getElementById('killCardHolder');
        if (killCardHolderEl) {
            setIsUserInDeathWindow(killCardHolderEl.style.display === 'block');
            killCardHolderObserver.observe(killCardHolderEl, styleObserveConfig);
        }

        localDocument.addEventListener('pointerlockchange', () => {
            setIsPointerLocked(!!document.pointerLockElement);
        });
    });
}
