import './utils/unsafe.panic';
import { createEffect, createRoot } from 'solid-js';
import useAdPopupDismisser from './modules/adPopupDismisser';
import useAutoReload from './modules/autoReload';
import useFastRespawn from './modules/fastRespawn';
import useWindowManagerModule from './modules/useWindowManagerModule';
import useSettingsRemoteConnection from './settingsWindow/settingsWindowsOutCommunication';
import useIsGameLocation from './state/useIsGameLocation';
import useAutoPickupJunk from './modules/autoPickupJunk';

function initModules() {
    // Init solid-js reactive root manually, since we're not actually rendering anything
    createRoot(() => {
        const isGameLocation = useIsGameLocation();
        createEffect(() => {
            // Let's not mess with social links
            if (!isGameLocation()) return;

            useAdPopupDismisser();
            useFastRespawn();
            useAutoReload();
            useAutoPickupJunk();
            useWindowManagerModule();
            useSettingsRemoteConnection();
        });
    });
}

initModules();
