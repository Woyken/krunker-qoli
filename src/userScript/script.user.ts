import useAdPopupDismisser from './modules/adPopupDismisser';
import useAutoReload from './modules/autoReload';
import useFastRespawn from './modules/fastRespawn';
import useWindowManagerModule from './modules/useWindowManagerModule';
// import useOnlyOneTab from './modules/onlyOneTab';
// import useReopenInNewWindow from './modules/reopenInNewWindow';
import useSettingsRemoteConnection from './settingsWindow/settingsWindowsOutCommunication';

useAdPopupDismisser();
useFastRespawn();
useAutoReload();
// useOnlyOneTab();
// useReopenInNewWindow();
useWindowManagerModule();

useSettingsRemoteConnection();
