import { createSignal } from 'solid-js';
import localDocument from '../utils/localDocumentCopy';
import createScopedLogger from '../utils/logger';

const logger = createScopedLogger('[documentState]');

const [documentReadyStateIsComplete, setDocumentReadyStateIsComplete] = createSignal(false);

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

export default documentReadyStateIsComplete;
