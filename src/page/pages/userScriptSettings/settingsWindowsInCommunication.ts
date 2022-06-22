import { expose, windowEndpoint } from 'comlink';
import { createEffect, createSignal } from 'solid-js';
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
    registerCallback: (apiVersion: string, callback: (settings: UserScriptSettings) => void) => void;
    ping: number;
}

export enum SettingsCommunicationState {
    NoOpener,
    WaitingForCallbackRegistration,
    ReadyToPushEvents,
}

export function useSettingsCommunication() {
    const [communicatorState, setCommunicatorState] = createSignal(SettingsCommunicationState.NoOpener);

    if (!window.opener) return { communicatorState };
    setCommunicatorState(SettingsCommunicationState.WaitingForCallbackRegistration);

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
        registerCallback: (apiVersion: string, callback: (settings: UserScriptSettings) => void) => {
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

    expose(exposedSettings, windowEndpoint(window.opener));

    return { communicatorState };
}
