import { proxy, wrap } from 'comlink';
import { createEffect, createSignal, onCleanup } from 'solid-js';
import {
    setEnabledFastRespawn,
    setEnabledAdPopupDismisser,
    setEnabledAutoReload,
    setEnabledWindowManager,
    setEnabledAutoClickJunkPickup,
} from '@/shared/state';
import { apiVersion } from '../../shared/globals';
import type {
    UserScriptSettings,
    ExposedSettings,
} from '../../page/pages/userScriptSettings/settingsWindowsInCommunication';
import createScopedLogger from '../utils/logger';
import windowEndpointWithUnsubscribe from '../../shared/utils/windowEndpointWithUnsubscribe';
import { useOnWindowClosedRemove } from '../../page/pages/windowManager/useRemoveClosedWindows';
import { useDocumentReadyState } from '../state/documentState';
import useLocationHref from '../state/useLocationHref';

const logger = createScopedLogger('[Settings window communication]');

const LocalURL = URL;

// export const qoliBaseUrl = new LocalURL('http://localhost:3000');
export const qoliBaseUrl = new LocalURL('https://woyken.github.io/krunker-qoli');

const endpointMessageListeners: Record<string, EventListenerOrEventListenerObject[]> = {};

// Stop our communication messages from reaching page js
window.addEventListener('message', (e) => {
    if (e.origin === qoliBaseUrl.origin) e.stopImmediatePropagation();
    endpointMessageListeners.message?.forEach((listener) => {
        if ('handleEvent' in listener) listener.handleEvent(e);
        else listener(e);
    });
});

function settingsUpdatedCallback(settings: UserScriptSettings) {
    logger.log('settingsUpdatedCallback', settings);
    setEnabledFastRespawn(settings.enabledFastRespawn);
    setEnabledAdPopupDismisser(settings.enabledAdPopupDismisser);
    setEnabledAutoReload(settings.enabledAutoReload);
    setEnabledWindowManager(settings.enabledWindowManager);
    setEnabledAutoClickJunkPickup(settings.enabledAutoClickJunkPickup);
}

function promiseWrapperWithThrowTimeout<T>(inputPromise: Promise<T>, timeout: number): Promise<T> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(new Error('Promise timed out'));
        }, timeout);
        inputPromise.then(resolve, reject);
    });
}

let hasOpenedSettings = false;

function useSettingsWindow() {
    const [wnd, setWnd] = createSignal<Window>();
    if (window.opener) setWnd(window.opener);
    else {
        const { isDocumentAtLeastInteractive } = useDocumentReadyState();
        createEffect(() => {
            if (hasOpenedSettings) return;
            // Let's not open popup too soon, firefox will stop loading current page if we do
            if (!isDocumentAtLeastInteractive()) return;
            logger.log('opening new settings window');
            const openedWnd = window.open(
                new LocalURL('#userScriptSettings', qoliBaseUrl).href,
                'settingsWindow',
                'width=400,height=450'
            );
            hasOpenedSettings = true;
            if (!openedWnd) {
                window.alert('Failed to open settings window, allow popups for Krunker Qoli to work');
                throw new Error('Failed to open settings window');
            }
            setWnd(openedWnd);
            onCleanup(() => {
                logger.log('onCleanup, closing settings window', openedWnd);
                openedWnd.close();
            });
            function handleBeforeUnload() {
                logger.log('handleBeforeUnload, closing settings window', openedWnd);
                openedWnd?.close();
            }
            window.addEventListener('beforeunload', handleBeforeUnload);
            onCleanup(() => window.removeEventListener('beforeunload', handleBeforeUnload));
            useOnWindowClosedRemove(wnd, setWnd);
        });
    }
    return wnd;
}

async function useSettingsConnection(wnd: Window) {
    const [state, setState] = createSignal<'connecting' | 'disposed' | 'error' | 'available'>('connecting');
    onCleanup(() => setState('disposed'));
    const endpoint = windowEndpointWithUnsubscribe(
        wnd,
        {
            addEventListener(type, listener) {
                if (endpointMessageListeners[type]) endpointMessageListeners[type].push(listener);
                else endpointMessageListeners[type] = [listener];
            },
            removeEventListener(type, listener) {
                if (endpointMessageListeners[type])
                    endpointMessageListeners[type] = endpointMessageListeners[type].filter((l) => l !== listener);
            },
        },
        '*'
    );

    const remoteExposedSettings = wrap<ExposedSettings>(endpoint);
    onCleanup(() => endpoint.unsubscribeAll());

    function handleBeforeUnload() {
        remoteExposedSettings.scriptUnloading().catch((e) => logger.log('on beforeUnload error', e));
    }
    window.addEventListener('beforeunload', handleBeforeUnload);
    onCleanup(() => window.removeEventListener('beforeunload', handleBeforeUnload));

    const currentLocationHref = useLocationHref();
    createEffect(() => {
        remoteExposedSettings.scriptLocationChanged(currentLocationHref());
    });

    const onSettingsWindowAvailablePromise = new Promise<void>((resolve) => {
        logger.log('waiting for settings window');
        const intervalId = setInterval(() => {
            logger.log('checking for settings window');
            promiseWrapperWithThrowTimeout(remoteExposedSettings.ping, 200)
                .then(() => {
                    clearInterval(intervalId);
                    resolve();
                })
                .catch((e) => {
                    logger.log('[onSettingsWindowAvailablePromise]', 'error', e);
                });
        }, 200);
    });

    promiseWrapperWithThrowTimeout(onSettingsWindowAvailablePromise, 60000)
        .then(() => {
            remoteExposedSettings.onUnloadPromise.then(() => {
                logger.log('settings window unloaded');
                setState('disposed');
            });
            logger.log('settings window available');
            setState('available');
        })
        .catch((e) => {
            logger.log('settings window connection error', e);
            setState('error');
        });

    createEffect(() => {
        logger.log('settings connection state changed', state());
        if (state() === 'available') {
            logger.log('registering for remote settings callbacks');
            remoteExposedSettings.registerSettingsCallback(apiVersion, proxy(settingsUpdatedCallback));
        }
    });

    return {
        state,
        remoteExposedSettings,
    };
}

export default function useSettingsRemoteConnection() {
    const wnd = useSettingsWindow();
    const [remoteConnection, setRemoteConnection] = createSignal<ReturnType<typeof useSettingsConnection>>();
    createEffect(() => {
        const settingsWnd = wnd();
        if (!settingsWnd) return;
        const remoteConnectionState = useSettingsConnection(settingsWnd);
        setRemoteConnection(remoteConnectionState);
    });

    return remoteConnection;
}
