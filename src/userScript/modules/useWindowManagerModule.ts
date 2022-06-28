import { createEffect } from 'solid-js';
import { qoliBaseUrl } from '../settingsWindow/settingsWindowsOutCommunication';
import { enabledWindowManager } from '../state/userScriptSettingsState';
import localWindow from '../utils/localWindowCopy';

export default function useWindowManagerModule() {
    createEffect(() => {
        if (!enabledWindowManager()) return;
        if (localWindow.opener) return;
        const krunkerRedirectUrl = localWindow.location.href;
        const windowManagerUrl = new URL(`#windowManager?redirectKrunkerUrl=${krunkerRedirectUrl}`, qoliBaseUrl);
        localWindow.open(windowManagerUrl, '_self');
    });
}
