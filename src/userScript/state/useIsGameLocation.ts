import { createEffect, createSignal } from 'solid-js';
import useLocationHref from './useLocationHref';

export default function useIsGameLocation() {
    const [isGameLocation, setIsGameLocation] = createSignal(false);
    const locationHref = useLocationHref();
    createEffect(() => {
        const url = new URL(locationHref());
        if (url.pathname === '/') return setIsGameLocation(true);
        return setIsGameLocation(false);
    });
    return isGameLocation;
}
