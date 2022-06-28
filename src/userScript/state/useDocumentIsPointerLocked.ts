import { createEffect, createSignal, onCleanup } from 'solid-js';
import { documentReadyStateIsComplete } from './documentState';

export default function useDocumentIsPointerLocked() {
    const [documentIsPointerLocked, setDocumentIsPointerLocked] = createSignal(false);

    function handlePointerLockChange() {
        setDocumentIsPointerLocked(!!document.pointerLockElement);
    }

    createEffect(() => {
        if (!documentReadyStateIsComplete()) return;

        document.addEventListener('pointerlockchange', handlePointerLockChange);
        onCleanup(() => {
            document.removeEventListener('pointerlockchange', handlePointerLockChange);
        });
    });

    return documentIsPointerLocked;
}
