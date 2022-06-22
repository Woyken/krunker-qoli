import { createEffect, createSignal } from 'solid-js';

export const [enabledAutoReload, setEnabledAutoReload] = createSignal((localStorage.getItem('enabledAutoReload') ?? 'true') === 'true');
export const [enabledFastRespawn, setEnabledFastRespawn] = createSignal((localStorage.getItem('enabledFastRespawn') ?? 'true') === 'true');
export const [enabledAdPopupRemoval, setEnabledAdPopupRemoval] = createSignal((localStorage.getItem('enabledAdPopupRemoval') ?? 'true') === 'true');

// Persist state
createEffect(() => {
    localStorage.setItem('enabledAutoReload', `${enabledAutoReload()}`);
});
createEffect(() => {
    localStorage.setItem('enabledFastRespawn', `${enabledFastRespawn()}`);
});
createEffect(() => {
    localStorage.setItem('enabledAdPopupRemoval', `${enabledAdPopupRemoval()}`);
});

// this will be triggered if anything changes in localStorage from another tab
window.addEventListener('storage', () => {
    setEnabledAutoReload((localStorage.getItem('enabledAutoReload') ?? 'true') === 'true');
    setEnabledFastRespawn((localStorage.getItem('enabledFastRespawn') ?? 'true') === 'true');
    setEnabledAdPopupRemoval((localStorage.getItem('enabledAdPopupRemoval') ?? 'true') === 'true');
});
