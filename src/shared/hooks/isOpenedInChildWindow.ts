import { createSignal } from 'solid-js';

const [isOpenedInChildWindow] = createSignal(window.opener != null);

export default isOpenedInChildWindow;
