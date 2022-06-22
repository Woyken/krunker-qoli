import initAdPopupDismisser from './modules/adPopupDismisser';
import useAutoReload from './modules/autoReload';
import useFastRespawn from './modules/fastRespawn';
import getRemoteSettings from './settingsWindow/settingsWindowsOutCommunication';

initAdPopupDismisser();
useFastRespawn();
useAutoReload();

// TODO some kind of init
getRemoteSettings();
