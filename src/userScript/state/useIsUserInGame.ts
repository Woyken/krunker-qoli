import { createEffect, createSignal } from 'solid-js';
import { createMutationObserverForStylesIfDisplayBlock, styleObserveConfig } from '../modules/utils/observerForStyles';
import localDocument from '../utils/localDocumentCopy';
import documentReadyStateIsComplete from './documentState';

export default function useIsUserInGame() {
    const [isUserInGame, setIsUserInGame] = createSignal(false);
    const inGameUiObserver = createMutationObserverForStylesIfDisplayBlock(setIsUserInGame);

    createEffect(() => {
        // init observer when document is loaded
        if (!documentReadyStateIsComplete()) return;

        const inGameUiEl = localDocument.getElementById('inGameUI');
        if (inGameUiEl) {
            setIsUserInGame(inGameUiEl.style.display === 'block');
            inGameUiObserver.observe(inGameUiEl, styleObserveConfig);
        }
    });

    return isUserInGame;
}
