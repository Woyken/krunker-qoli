import { createSignal } from 'solid-js';
import localWindow from '../../userScript/utils/localWindowCopy';

const [isOpenedInChildWindow] = createSignal(localWindow.opener != null);

export default isOpenedInChildWindow;
