import { expose } from 'comlink';
import { createEffect, createSignal } from 'solid-js';
import windowEndpointWithUnsubscribe from '../../../shared/utils/windowEndpointWithUnsubscribe';
import localWindow from '../../../userScript/utils/localWindowCopy';
import createScopedLogger from '../../../userScript/utils/logger';
import { enabledFastRespawn, enabledAdPopupRemoval, enabledAutoReload } from './state/userScriptSettings';

const logger = createScopedLogger('[Window settings communicator]');

export interface UserScriptSettings {
    enabledFastRespawn: boolean;
    enabledAdPopupRemoval: boolean;
    enabledAutoReload: boolean;
}

export interface ExposedSettings {
    onUnloadPromise: Promise<void>;
    doStufff: () => number;
    scriptUnloading: () => void;
    registerSettingsCallback: (apiVersion: string, callback: (settings: UserScriptSettings) => void) => void;
    ping: number;
}

export enum SettingsCommunicationState {
    WaitingForCallbackRegistration,
    ReadyToPushEvents,
}

export function useExposeSettingsCommunication(exposeToWindow: Window) {
    logger.log('useExposeSettingsCommunication', exposeToWindow);
    const [communicatorState, setCommunicatorState] = createSignal(SettingsCommunicationState.WaitingForCallbackRegistration);

    const windowOnUnloadPromise = new Promise<void>((resolve) => {
        localWindow.addEventListener('beforeunload', () => {
            resolve();
        });
    });

    const [currentCallback, setCurrentCallback] = createSignal<(settings: UserScriptSettings) => void>();

    const exposedSettings: ExposedSettings = {
        onUnloadPromise: windowOnUnloadPromise,
        doStufff: () => {
            logger.log('TODO doStufff');
            return Math.random();
        },
        scriptUnloading() {
            logger.log('scriptUnloading, TODO');
        },
        // eslint-disable-next-line solid/reactivity
        registerSettingsCallback: (apiVersion: string, callback: (settings: UserScriptSettings) => void) => {
            logger.log('registerSettingsCallback', apiVersion, callback);
            setCurrentCallback(() => callback);

            if (communicatorState() === SettingsCommunicationState.WaitingForCallbackRegistration) setCommunicatorState(SettingsCommunicationState.ReadyToPushEvents);
        },
        ping: 0,
    };

    createEffect(() => {
        currentCallback()?.({
            enabledFastRespawn: enabledFastRespawn(),
            enabledAdPopupRemoval: enabledAdPopupRemoval(),
            enabledAutoReload: enabledAutoReload(),
        });
    });

    const endpoint = windowEndpointWithUnsubscribe(exposeToWindow);
    // TODO check if this cleanup works
    // onCleanup(endpoint.unsubscribeAll.bind(endpoint));
    expose(exposedSettings, endpoint);

    const unsubscribeAll = endpoint.unsubscribeAll.bind(endpoint);

    return { communicatorState, unsubscribeAll };
}
