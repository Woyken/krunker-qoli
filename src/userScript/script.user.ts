import initAdPopupDismisser from './modules/adPopupDismisser';
import initFastRespawn from './modules/fastRespawn';
import getRemoteSettings from './settingsWindow/settingsWindowsOutCommunication';
import localDocument from './utils/localDocumentCopy';

initAdPopupDismisser();
initFastRespawn();

// TODO find a better place for this...
function documentClick() {
    localDocument.removeEventListener('click', documentClick);
    localDocument.removeEventListener('keydown', documentClick);
    // TODO some kind of init
    getRemoteSettings();
}
localDocument.addEventListener('click', documentClick);
localDocument.addEventListener('keydown', documentClick);
