import localWindow from '../utils/localWindowCopy';
import createScopedLogger from '../utils/logger';

const logger = createScopedLogger('[only one tab]');

const LocalBroadcastChannel = BroadcastChannel;

const onlyOneTabBroadcastChannel = new LocalBroadcastChannel('only one tab');

const currentWindowId = `${document.URL}#${Math.random()}`;

export default function useOnlyOneTab() {
    onlyOneTabBroadcastChannel.addEventListener('message', (e) => {
        logger.log('received message', e);
        if (e.data.message === 'hi, I just started loading') {
            onlyOneTabBroadcastChannel.postMessage({
                targetWindowId: e.data.sourceWindowId,
                message: 'please close',
            });
            localWindow.open(e.data.pageUrl, '_self');
        }

        if (e.data.targetWindowId === currentWindowId && e.data.message === 'please close') {
            localWindow.open('about:blank', '_self');
        }
    });

    onlyOneTabBroadcastChannel.postMessage({
        pageUrl: window.location.href,
        sourceWindowId: currentWindowId,
        message: 'hi, I just started loading',
    });
}
