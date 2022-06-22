import { createSignal } from 'solid-js';

export const [enabledAutoReload, setEnabledAutoReload] = createSignal(false);
export const [enabledAdPopupDismisser, setEnabledAdPopupDismisser] = createSignal(false);
export const [enabledFastRespawn, setEnabledFastRespawn] = createSignal(false);
