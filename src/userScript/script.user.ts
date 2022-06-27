import { createEffect } from 'solid-js';
import useAdPopupDismisser from './modules/adPopupDismisser';
import useAutoReload from './modules/autoReload';
import useFastRespawn from './modules/fastRespawn';
import useWindowManagerModule from './modules/useWindowManagerModule';
import useSettingsRemoteConnection from './settingsWindow/settingsWindowsOutCommunication';
import useIsGameLocation from './state/useIsGameLocation';

function initModules() {
    const isGameLocation = useIsGameLocation();
    createEffect(() => {
        // Let's not mess with social links
        if (!isGameLocation()) return;

        useAdPopupDismisser();
        useFastRespawn();
        useAutoReload();
        useWindowManagerModule();
        useSettingsRemoteConnection();
    });
}

initModules();
