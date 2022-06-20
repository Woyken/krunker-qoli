import { createSignal, onCleanup } from "solid-js";

export const useMediaQuery = (query: string) => {
    const matcher = window.matchMedia(query);
    const [matches, setMatches] = createSignal(matcher.matches);

    const changeHandler = (ev: MediaQueryListEvent) => setMatches(ev.matches);
    matcher.addEventListener('change', changeHandler);
    onCleanup(() => matcher.removeEventListener('change', changeHandler));

    return matches
  }
