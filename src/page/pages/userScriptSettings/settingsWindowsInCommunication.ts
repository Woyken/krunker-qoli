import { expose } from 'comlink';
import { createEffect, createSignal, onCleanup } from 'solid-js';
import windowEndpointWithUnsubscribe from '../../../shared/utils/windowEndpointWithUnsubscribe';
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
    registerSettingsCallback: (apiVersion: string, callback: (settings: UserScriptSettings) => void) => void;
    ping: number;
}

export enum SettingsCommunicationState {
    WaitingForCallbackRegistration,
    ReadyToPushEvents,
}

export function useExposeSettingsCommunication(exposeToWindow: Window) {
    const [communicatorState, setCommunicatorState] = createSignal(SettingsCommunicationState.WaitingForCallbackRegistration);

    const windowOnUnloadPromise = new Promise<void>((resolve) => {
        window.addEventListener('beforeunload', () => {
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
        // eslint-disable-next-line solid/reactivity
        registerSettingsCallback: (apiVersion: string, callback: (settings: UserScriptSettings) => void) => {
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
    onCleanup(endpoint.unsubscribeAll.bind(endpoint));
    expose(exposedSettings, endpoint);

    const unsubscribeAll = endpoint.unsubscribeAll.bind(endpoint);

    return { communicatorState, unsubscribeAll };
}
