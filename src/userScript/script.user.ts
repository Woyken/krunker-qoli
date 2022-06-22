import initAdPopupDismisser from './modules/adPopupDismisser';
import initAutoReload from './modules/autoReload';
import initFastRespawn from './modules/fastRespawn';
import getRemoteSettings from './settingsWindow/settingsWindowsOutCommunication';

initAdPopupDismisser();
initFastRespawn();
initAutoReload();

// TODO some kind of init
getRemoteSettings();
