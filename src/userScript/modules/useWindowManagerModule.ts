import { qoliBaseUrl } from '../settingsWindow/settingsWindowsOutCommunication';
import localWindow from '../utils/localWindowCopy';

export default function useWindowManagerModule() {
    if (window.opener) return;
    const krunkerRedirectUrl = window.location.href;
    const windowManagerUrl = new URL(`#windowManager?redirectKrunkerUrl=${krunkerRedirectUrl}`, qoliBaseUrl);
    localWindow.open(windowManagerUrl, '_self');
}
