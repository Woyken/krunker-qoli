import { createSignal } from 'solid-js';
import windowEvents from '../utils/unsafe.windowEvents';

export default function useLocationHref() {
    const [currentLocationHref, setCurrentLocationHref] = createSignal(window.location.href);
    windowEvents.on('locationChanged', () => {
        setCurrentLocationHref(window.location.href);
    });

    return currentLocationHref;
}
