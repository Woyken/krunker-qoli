import initAdPopupDismisser from './modules/adPopupDismisser';
import initAutoReload from './modules/autoReload';
import useFastRespawn from './modules/fastRespawn';
import getRemoteSettings from './settingsWindow/settingsWindowsOutCommunication';

initAdPopupDismisser();
useFastRespawn();
initAutoReload();

// TODO some kind of init
getRemoteSettings();
