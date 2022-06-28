import { createSignal, onCleanup } from 'solid-js';
import localWindow from '../../userScript/utils/localWindowCopy';

export default function useDocumentIsFocused() {
    const [isWindowFocused, setIsWindowFocused] = createSignal(document.hasFocus());
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
