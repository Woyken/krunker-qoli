import { createSignal } from 'solid-js';
import localDocument from '../utils/localDocumentCopy';
import createScopedLogger from '../utils/logger';

const logger = createScopedLogger('[documentState]');

const [documentReadyStateIsComplete, setDocumentReadyStateIsComplete] = createSignal(false);
export { documentReadyStateIsComplete };

if (document.readyState !== 'complete') {
    // log("document readyState", document.readyState, "adding listener, waiting for reasyState complete event");
    localDocument.addEventListener('readystatechange', function readyStateChange() {
        if (document.readyState === 'complete') {
            localDocument.removeEventListener('readystatechange', readyStateChange);
            logger.log('document readyState complete event received, setting state true');
            setDocumentReadyStateIsComplete(true);
        }
    });
} else {
    setDocumentReadyStateIsComplete(true);
}

export function useDocumentReadyState() {
    const [documentReadyState, setDocumentReadyState] = createSignal(document.readyState);
    const isCurrentLoading = () => document.readyState === 'loading';
    const isCurrentInteractive = () => document.readyState === 'interactive';
    const isCurrentComplete = () => document.readyState === 'complete';
    const [isDocumentAtLeastLoading, setIsDocumentAtLeastLoading] = createSignal(
        isCurrentLoading() || isCurrentInteractive() || isCurrentComplete()
    );
    const [isDocumentAtLeastInteractive, setIsDocumentAtLeastInteractive] = createSignal(
        isCurrentInteractive() || isCurrentComplete()
    );
    const [isDocumentAtLeastComplete, setIsDocumentAtLeastComplete] = createSignal(isCurrentComplete());
    localDocument.addEventListener('readystatechange', function readyStateChange() {
        setDocumentReadyState(document.readyState);
        setIsDocumentAtLeastLoading(isCurrentLoading() || isCurrentInteractive() || isCurrentComplete());
        setIsDocumentAtLeastInteractive(isCurrentInteractive() || isCurrentComplete());
        setIsDocumentAtLeastComplete(isCurrentComplete());
        if (isCurrentComplete()) {
            localDocument.removeEventListener('readystatechange', readyStateChange);
        }
    });

    return {
        documentReadyState,
        isDocumentAtLeastLoading,
        isDocumentAtLeastInteractive,
        isDocumentAtLeastComplete,
    };
}
