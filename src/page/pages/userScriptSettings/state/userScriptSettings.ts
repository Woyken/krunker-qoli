import { createEffect, onCleanup } from 'solid-js';
import {
    enabledAdPopupDismisser,
    enabledAutoClickJunkPickup,
    enabledAutoReload,
    enabledFastRespawn,
    enabledWindowManager,
    setEnabledAdPopupDismisser,
    setEnabledAutoClickJunkPickup,
    setEnabledAutoReload,
    setEnabledFastRespawn,
    setEnabledWindowManager,
} from '@/shared/state';

export default function useSavedSettings() {
    function handleOnStorageEvent() {
        setEnabledAutoReload((localStorage.getItem('enabledAutoReload') ?? 'true') === 'true');
        setEnabledFastRespawn((localStorage.getItem('enabledFastRespawn') ?? 'true') === 'true');
        setEnabledAdPopupDismisser((localStorage.getItem('enabledAdPopupRemoval') ?? 'true') === 'true');
        setEnabledAutoClickJunkPickup((localStorage.getItem('enabledAutoClickJunkPickup') ?? 'true') === 'true');
        setEnabledWindowManager((localStorage.getItem('enabledWindowManager') ?? 'false') === 'true');
    }
    // set initial state
    createEffect(handleOnStorageEvent);

    // Persist state
    createEffect(() => localStorage.setItem('enabledAutoReload', `${enabledAutoReload()}`));
    createEffect(() => localStorage.setItem('enabledFastRespawn', `${enabledFastRespawn()}`));
    createEffect(() => localStorage.setItem('enabledAdPopupRemoval', `${enabledAdPopupDismisser()}`));
    createEffect(() => localStorage.setItem('enabledAutoClickJunkPickup', `${enabledAutoClickJunkPickup()}`));
    createEffect(() => localStorage.setItem('enabledWindowManager', `${enabledWindowManager()}`));

    // this will be triggered if anything changes in localStorage from another tab
    window.addEventListener('storage', handleOnStorageEvent);
    onCleanup(() => window.removeEventListener('storage', handleOnStorageEvent));
}
