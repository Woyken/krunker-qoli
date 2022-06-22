import { createSignal, onCleanup } from 'solid-js';
import localDocument from '../../userScript/utils/localDocumentCopy';
import localWindow from '../../userScript/utils/localWindowCopy';

export default function useDocumentIsFocused() {
    const [isWindowFocused, setIsWindowFocused] = createSignal(localDocument.hasFocus());
    const handleFocus = () => setIsWindowFocused(true);
    const handleBlur = () => setIsWindowFocused(false);

    localWindow.addEventListener('focus', handleFocus);
    localWindow.addEventListener('blur', handleBlur);

    onCleanup(() => {
        localWindow.removeEventListener('focus', handleFocus);
        localWindow.removeEventListener('blur', handleBlur);
    });

    return isWindowFocused;
}
