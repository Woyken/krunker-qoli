import { createSignal } from 'solid-js';
import localWindow from '../utils/localWindowCopy';
import windowEvents from '../utils/unsafe.windowEvents';

export default function useLocationHref() {
    const [currentLocationHref, setCurrentLocationHref] = createSignal(localWindow.location.href);
    windowEvents.on('locationChanged', () => {
        setCurrentLocationHref(localWindow.location.href);
    });

    return currentLocationHref;
}
