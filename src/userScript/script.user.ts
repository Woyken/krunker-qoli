import useAdPopupDismisser from './modules/adPopupDismisser';
import useAutoReload from './modules/autoReload';
import useFastRespawn from './modules/fastRespawn';
import getRemoteSettings from './settingsWindow/settingsWindowsOutCommunication';
import localWindow from './utils/localWindowCopy';

useAdPopupDismisser();
useFastRespawn();
useAutoReload();

// TODO some kind of init
localWindow.setTimeout(() => {
    getRemoteSettings();
}, 100);
