import { createEffect, createSignal, onCleanup } from 'solid-js';
import { createMutationObserverForStylesIfDisplayBlock, styleObserveConfig } from '../modules/utils/observerForStyles';
import { documentReadyStateIsComplete } from './documentState';

export default function useIsUserInGame() {
    const [isUserInGame, setIsUserInGame] = createSignal(false);
    const inGameUiObserver = createMutationObserverForStylesIfDisplayBlock(setIsUserInGame);

    createEffect(() => {
        // init observer when document is loaded
        if (!documentReadyStateIsComplete()) return;

        const inGameUiEl = document.getElementById('inGameUI');
        if (inGameUiEl) {
            setIsUserInGame(inGameUiEl.style.display === 'block');
            inGameUiObserver.observe(inGameUiEl, styleObserveConfig);
            onCleanup(inGameUiObserver.disconnect.bind(inGameUiObserver));
        }
    });

    return isUserInGame;
}
