import { expose } from 'comlink';
import { createEffect, createSignal, onCleanup } from 'solid-js';
import windowEndpointWithUnsubscribe from '../../../shared/utils/windowEndpointWithUnsubscribe';
import localWindow from '../../../userScript/utils/localWindowCopy';
import createScopedLogger from '../../../userScript/utils/logger';
import {
    enabledFastRespawn,
    enabledAdPopupRemoval,
    enabledAutoReload,
    enabledWindowManager,
} from './state/userScriptSettings';

const logger = createScopedLogger('[Window settings communicator]');

export interface UserScriptSettings {
    enabledFastRespawn: boolean;
    enabledAdPopupRemoval: boolean;
    enabledAutoReload: boolean;
    enabledWindowManager: boolean;
}

export interface ExposedSettings {
    onUnloadPromise: Promise<void>;
    doStufff: () => number;
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
        localWindow.addEventListener('beforeunload', () => {
            resolve();
        });
    });

    const [currentCallback, setCurrentCallback] = createSignal(
        exposedSettingsPerWindow.get(exposeToWindow)?.lastCallback
    );
    createEffect(() => {
        exposedSettingsPerWindow.set(exposeToWindow, { lastCallback: currentCallback() });
    });

    const exposedSettings: ExposedSettings = {
        onUnloadPromise: windowOnUnloadPromise,
        scriptUnloading() {
            logger.log('scriptUnloading, TODO');
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

    createEffect(() => {
        logger.log(
            'settings callback',
            currentCallback(),
            enabledFastRespawn(),
            enabledAdPopupRemoval(),
            enabledAutoReload(),
            enabledWindowManager()
        );
        currentCallback()?.({
            enabledFastRespawn: enabledFastRespawn(),
            enabledAdPopupRemoval: enabledAdPopupRemoval(),
            enabledAutoReload: enabledAutoReload(),
            enabledWindowManager: enabledWindowManager(),
        });
    });

    const endpoint = windowEndpointWithUnsubscribe(exposeToWindow);

    onCleanup(endpoint.unsubscribeAll.bind(endpoint));
    expose(exposedSettings, endpoint);

    const unsubscribeAll = () => {
        exposedSettingsPerWindow.delete(exposeToWindow);
        endpoint.unsubscribeAll();
    };

    const ret = { communicatorState, krunkerUrl, unsubscribeAll };

    return ret;
}
