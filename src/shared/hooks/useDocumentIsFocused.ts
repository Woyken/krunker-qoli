import { createSignal, onCleanup } from 'solid-js';

export default function useDocumentIsFocused() {
    const [isWindowFocused, setIsWindowFocused] = createSignal(document.hasFocus());
    const handleFocus = () => setIsWindowFocused(true);
    const handleBlur = () => setIsWindowFocused(false);

    window.addEventListener('focus', handleFocus);
    window.addEventListener('blur', handleBlur);

    onCleanup(() => {
        window.removeEventListener('focus', handleFocus);
        window.removeEventListener('blur', handleBlur);
    });

    return isWindowFocused;
}
