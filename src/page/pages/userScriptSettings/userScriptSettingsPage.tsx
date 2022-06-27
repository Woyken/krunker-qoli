import Typography from '@suid/material/Typography';
import { createEffect, createSignal } from 'solid-js';
import SettingsList from './settingsList';
import { SettingsCommunicationState, useExposeSettingsCommunication } from './settingsWindowsInCommunication';

function useCurrentStatusMessage() {
    const { communicatorState } = useExposeSettingsCommunication(window.opener);
    const [statusMessage, setStatusMessage] = createSignal('Unknown state');
    if (!window.opener) {
        setStatusMessage('😞 Not connected to Krunker instance');
        return statusMessage;
    }
    createEffect(() => {
        switch (communicatorState()) {
            case SettingsCommunicationState.WaitingForCallbackRegistration:
                setStatusMessage('😄 Waiting for Krunker connection');
                break;
            case SettingsCommunicationState.ReadyToPushEvents:
                setStatusMessage('🎮 Connected to Krunker!');
                break;
            default:
                break;
        }
    });

    return statusMessage;
}

export default function UserScriptSettingsPage() {
    const statusMessage = useCurrentStatusMessage();
    return (
        <>
            <Typography variant="h4" component="div" gutterBottom>
                Settings
            </Typography>
            <Typography variant="body1" component="div">
                {statusMessage()}
            </Typography>
            <SettingsList />
        </>
    );
}
