/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { createEffect, createSignal, onCleanup } from 'solid-js';
import useDocumentIsFocused from '@/shared/hooks/useDocumentIsFocused';
import { enabledFastRespawn } from '@/shared/state';
import useDocumentIsPointerLocked from '../state/useDocumentIsPointerLocked';
import useIsUserInGame from '../state/useIsUserInGame';
import useIsUserInKillCam from '../state/useIsUserInKillCam';
import documentEvents from '../utils/unsafe.documentEvents';
import createScopedLogger from '../utils/logger';

const logger = createScopedLogger('[fastRespawn]');

function tryToActivateGame() {
    logger.log('trying to activate game');
    const node = Array.from(document.getElementsByTagName('canvas')).pop();
    node?.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true }));
    node?.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, cancelable: true }));
}

export default function useFastRespawn() {
    logger.log('initFastRespawn');

    const isUserInKillCam = useIsUserInKillCam();
    const isUserInGame = useIsUserInGame();
    const isPointerLocked = useDocumentIsPointerLocked();
    const documentIsFocused = useDocumentIsFocused();

    // If user presses ESC, only event on document will be fired 'pointerlockchange'
    // Application can call document.exitPointerLock() to get out of pointer lock mode
    // That's what Krunker does after you die.
    const [wasExitPointerLockCalled, setWasExitPointerLockCalled] = createSignal(false);
    // eslint-disable-next-line solid/reactivity
    const unsub = documentEvents.on('calledExitPointerLock', () => {
        // Ignore if user has manually exited to game menu
        if (isPointerLocked()) setWasExitPointerLockCalled(true);
    });

    onCleanup(() => {
        unsub();
    });

    createEffect(() => {
        if (isPointerLocked()) setWasExitPointerLockCalled(false);
    });

    createEffect(() => {
        if (!enabledFastRespawn()) return;
        if (!documentIsFocused()) return;
        if (!wasExitPointerLockCalled()) return;
        if (isPointerLocked()) return;
        if (isUserInGame()) return;
        if (!isUserInKillCam()) return;

        // Reset exitPointerLock tracker, it will only get set on next call
        setWasExitPointerLockCalled(false);
        tryToActivateGame();
    });
}
