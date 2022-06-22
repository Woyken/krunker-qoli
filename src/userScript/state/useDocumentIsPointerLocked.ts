import { createEffect, createSignal } from 'solid-js';
import localDocument from '../utils/localDocumentCopy';
import documentReadyStateIsComplete from './documentState';

export default function useDocumentIsPointerLocked() {
    const [documentIsPointerLocked, setDocumentIsPointerLocked] = createSignal(false);
    createEffect(() => {
        if (!documentReadyStateIsComplete()) return;

        localDocument.addEventListener('pointerlockchange', () => {
            setDocumentIsPointerLocked(!!document.pointerLockElement);
        });
    });

    return documentIsPointerLocked;
}
