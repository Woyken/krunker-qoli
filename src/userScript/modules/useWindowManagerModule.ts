import { createEffect } from 'solid-js';
import { qoliBaseUrl } from '../settingsWindow/settingsWindowsOutCommunication';
import { enabledWindowManager } from '../state/userScriptSettingsState';
import localWindow from '../utils/localWindowCopy';

export default function useWindowManagerModule() {
    createEffect(() => {
        if (!enabledWindowManager()) return;
        if (window.opener) return;
        const krunkerRedirectUrl = window.location.href;
        const windowManagerUrl = new URL(`#windowManager?redirectKrunkerUrl=${krunkerRedirectUrl}`, qoliBaseUrl);
        localWindow.open(windowManagerUrl, '_self');
    });
}
