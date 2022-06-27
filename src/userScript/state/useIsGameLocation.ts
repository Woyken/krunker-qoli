import { createEffect, createSignal } from 'solid-js';
import useLocationHref from './useLocationHref';

export default function useIsGameLocation() {
    const [isGameLocation, setIsGameLocation] = createSignal(false);
    const locationHref = useLocationHref();
    createEffect(() => {
        if (new URL(locationHref()).searchParams.get('game')) {
            setIsGameLocation(true);
        }
    });
    return isGameLocation;
}
