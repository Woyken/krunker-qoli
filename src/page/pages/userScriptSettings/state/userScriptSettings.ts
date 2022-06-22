import { createEffect, createSignal } from 'solid-js';

export const [enabledFastRespawn, setEnabledFastRespawn] = createSignal((localStorage.getItem('enabledFastRespawn') ?? 'true') === 'true');
export const [enabledAdPopupRemoval, setEnabledAdPopupRemoval] = createSignal((localStorage.getItem('enabledAdPopupRemoval') ?? 'true') === 'true');

// Persist state
createEffect(() => {
    localStorage.setItem('enabledFastRespawn', `${enabledFastRespawn()}`);
});
createEffect(() => {
    localStorage.setItem('enabledAdPopupRemoval', `${enabledAdPopupRemoval()}`);
});
