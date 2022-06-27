import { createEffect, createSignal, onCleanup } from 'solid-js';
import localDocument from '../utils/localDocumentCopy';
import { documentReadyStateIsComplete } from './documentState';

export default function useDocumentIsPointerLocked() {
    const [documentIsPointerLocked, setDocumentIsPointerLocked] = createSignal(false);

    function handlePointerLockChange() {
        setDocumentIsPointerLocked(!!document.pointerLockElement);
    }

    createEffect(() => {
        if (!documentReadyStateIsComplete()) return;

        localDocument.addEventListener('pointerlockchange', handlePointerLockChange);
        onCleanup(() => {
            localDocument.removeEventListener('pointerlockchange', handlePointerLockChange);
        });
    });

    return documentIsPointerLocked;
}
