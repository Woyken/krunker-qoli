import useAdPopupDismisser from './modules/adPopupDismisser';
import useAutoReload from './modules/autoReload';
import useFastRespawn from './modules/fastRespawn';
import useOnlyOneTab from './modules/onlyOneTab';
import useReopenInNewWindow from './modules/reopenInNewWindow';
import useSettingsRemoteConnection from './settingsWindow/settingsWindowsOutCommunication';

useAdPopupDismisser();
useFastRespawn();
useAutoReload();
useOnlyOneTab();
useReopenInNewWindow();

useSettingsRemoteConnection();
