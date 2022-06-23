import { proxy, Remote, windowEndpoint, wrap } from 'comlink';
import { apiVersion } from '../../shared/globals';
import type { UserScriptSettings, ExposedSettings } from '../../page/pages/userScriptSettings/settingsWindowsInCommunication';
import { setEnabledAdPopupDismisser, setEnabledAutoReload, setEnabledFastRespawn } from '../state/userScriptSettingsState';
import localWindow from '../utils/localWindowCopy';
import createScopedLogger from '../utils/logger';

const logger = createScopedLogger('[Settings window communication]');

const LocalURL = URL;

let settingsWindow: Window | null = null;

// const qoliBaseUrl = new LocalURL('http://localhost:3000');
const qoliBaseUrl = new LocalURL('https://woyken.github.io/krunker-qoli');

const endpointMessageListeners: {
    type: string;
    listener: EventListenerOrEventListenerObject;
}[] = [];

localWindow.addEventListener('message', (e) => {
    if (e.origin === qoliBaseUrl.origin) e.stopImmediatePropagation();
    // TODO rewrite with map of arrays by type
    endpointMessageListeners
        .filter((l) => l.type === 'message')
        .forEach(({ listener }) => {
            if ('handleEvent' in listener) listener.handleEvent(e);
            else listener(e);
        });
});

function settingsUpdatedCallback(settings: UserScriptSettings) {
    logger.log('settingsUpdatedCallback', settings);
    setEnabledFastRespawn(settings.enabledFastRespawn);
    setEnabledAdPopupDismisser(settings.enabledAdPopupRemoval);
    setEnabledAutoReload(settings.enabledAutoReload);
}

let remoteExposedSettingsPromise: Promise<Remote<ExposedSettings>> | undefined;

function closeSettingsWindow() {
    remoteExposedSettingsPromise = undefined;
    if (settingsWindow) {
        settingsWindow.close();
        settingsWindow = null;
    }
}

function promiseWrapperWithThrowTimeout<T>(inputPromise: Promise<T>, timeout: number): Promise<T> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(new Error('Promise timed out'));
        }, timeout);
        inputPromise.then(resolve, reject);
    });
}

async function openSettingsWindow() {
    const wnd = localWindow.open(new LocalURL('#userScriptSettings', qoliBaseUrl).href, 'settingsWindow', 'width=400,height=400');
    if (!wnd) {
        alert('Failed to open settings window, allow popups for Krunker Qoli to work');
        throw new Error('Failed to open settings window');
    }
    closeSettingsWindow();
    settingsWindow = wnd;
    const endpoint = windowEndpoint(
        settingsWindow,
        {
            addEventListener(type, listener) {
                endpointMessageListeners.push({ type, listener });
            },
            removeEventListener(type, listener) {
                const foundIdx = endpointMessageListeners.findIndex(({ type: t, listener: l }) => t === type && l === listener);
                if (foundIdx >= 0) endpointMessageListeners.splice(foundIdx, 1);
            },
        },
        '*'
    );

    const remoteExposedSettings = wrap<ExposedSettings>(endpoint);

    const onSettingsWindowAvailablePromise = new Promise<void>((resolve) => {
        logger.log('waiting for settings window');
        const intervalId = setInterval(() => {
            logger.log('checking for settings window');
            promiseWrapperWithThrowTimeout(remoteExposedSettings.ping, 200)
                .then(() => {
                    clearInterval(intervalId);
                    resolve();
                })
                .catch(() => {
                    // TODO
                });
        }, 200);
    });

    await onSettingsWindowAvailablePromise.then(() => {
        remoteExposedSettings.onUnloadPromise.then(() => {
            logger.log('settings window unloaded');
            closeSettingsWindow();
        });
    });
    logger.log('settings window available');

    remoteExposedSettings.registerCallback(apiVersion, proxy(settingsUpdatedCallback));

    return remoteExposedSettings;
}

export default async function getRemoteSettings() {
    if (!remoteExposedSettingsPromise) remoteExposedSettingsPromise = openSettingsWindow();

    return remoteExposedSettingsPromise;
}

localWindow.addEventListener('beforeunload', () => {
    closeSettingsWindow();
});
