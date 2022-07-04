import {
    enabledFastRespawn,
    enabledAutoReload,
    enabledWindowManager,
    enabledAdPopupDismisser,
    enabledAutoClickJunkPickup,
} from '@/shared/state';
import { expose } from 'comlink';
import { createEffect, createSignal, onCleanup } from 'solid-js';
import windowEndpointWithUnsubscribe from '../../../shared/utils/windowEndpointWithUnsubscribe';
import createScopedLogger from '../../../userScript/utils/logger';

const logger = createScopedLogger('[Window settings communicator]');

export interface UserScriptSettings {
    enabledFastRespawn: boolean;
    enabledAdPopupDismisser: boolean;
    enabledAutoReload: boolean;
    enabledWindowManager: boolean;
    enabledAutoClickJunkPickup: boolean;
}

export interface ExposedSettings {
    onUnloadPromise: Promise<void>;
    scriptUnloading: () => void;
    scriptLocationChanged: (newLocation: string) => void;
    registerSettingsCallback: (apiVersion: string, callback: (settings: UserScriptSettings) => void) => void;
    ping: number;
}

export enum SettingsCommunicationState {
    WaitingForCallbackRegistration,
    ReadyToPushEvents,
}

const exposedSettingsPerWindow = new Map<
    Window,
    {
        lastCallback: ((settings: UserScriptSettings) => void) | undefined;
    }
>();

export function useExposeSettingsCommunication(exposeToWindow: Window) {
    logger.log('useExposeSettingsCommunication', exposeToWindow);
    const [communicatorState, setCommunicatorState] = createSignal(
        SettingsCommunicationState.WaitingForCallbackRegistration
    );
    const [krunkerUrl, setKrunkerUrl] = createSignal('https://krunker.io');

    const windowOnUnloadPromise = new Promise<void>((resolve) => {
        window.addEventListener('beforeunload', () => {
            resolve();
        });
    });

    const [currentCallback, setCurrentCallback] = createSignal(
        exposedSettingsPerWindow.get(exposeToWindow)?.lastCallback
    );
    createEffect(() => {
        exposedSettingsPerWindow.set(exposeToWindow, { lastCallback: currentCallback() });
    });

    const endpoint = windowEndpointWithUnsubscribe(exposeToWindow);
    onCleanup(endpoint.unsubscribeAll);

    const exposedSettings: ExposedSettings = {
        onUnloadPromise: windowOnUnloadPromise,
        scriptUnloading() {
            logger.log('[scriptUnloading]', 'might be loading new page', exposeToWindow);
        },
        scriptLocationChanged(newLocation: string) {
            setKrunkerUrl(newLocation);
        },
        // eslint-disable-next-line solid/reactivity
        registerSettingsCallback: (apiVersion: string, callback: (settings: UserScriptSettings) => void) => {
            logger.log('registerSettingsCallback', apiVersion, callback);
            setCurrentCallback(() => callback);

            if (communicatorState() === SettingsCommunicationState.WaitingForCallbackRegistration)
                setCommunicatorState(SettingsCommunicationState.ReadyToPushEvents);
        },
        ping: 0,
    };

    expose(exposedSettings, endpoint);

    createEffect(() => {
        logger.log(
            'settings callback',
            currentCallback(),
            enabledFastRespawn(),
            enabledAdPopupDismisser(),
            enabledAutoReload(),
            enabledWindowManager()
        );
        currentCallback()?.({
            enabledFastRespawn: enabledFastRespawn(),
            enabledAdPopupDismisser: enabledAdPopupDismisser(),
            enabledAutoReload: enabledAutoReload(),
            enabledWindowManager: enabledWindowManager(),
            enabledAutoClickJunkPickup: enabledAutoClickJunkPickup(),
        });
    });

    const unsubscribeAll = () => {
        exposedSettingsPerWindow.delete(exposeToWindow);
        endpoint.unsubscribeAll();
    };

    const ret = { communicatorState, krunkerUrl, unsubscribeAll };

    return ret;
}
