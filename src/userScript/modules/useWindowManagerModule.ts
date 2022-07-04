import { enabledWindowManager } from '@/shared/state';
import { createEffect } from 'solid-js';
import { qoliBaseUrl } from '../settingsWindow/settingsWindowsOutCommunication';

export default function useWindowManagerModule() {
    createEffect(() => {
        if (!enabledWindowManager()) return;
        if (window.opener) return;
        const krunkerRedirectUrl = window.location.href;
        const windowManagerUrl = new URL(`#windowManager?redirectKrunkerUrl=${krunkerRedirectUrl}`, qoliBaseUrl);
        window.open(windowManagerUrl, '_self');
    });
}
