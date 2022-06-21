import { expose, windowEndpoint } from "comlink";
import { createEffect } from "solid-js";
import {
  enabledFastRespawn,
  enabledAdPopupRemoval,
} from "./state/userScriptSettings";

// TODO wrap all this login into function that is called in settings page
const onUnloadPromise = new Promise<void>((resolve) => {
  window.addEventListener("beforeunload", () => {
    resolve();
  });
});

export interface UserScriptSettings {
  enabledFastRespawn: boolean;
  enabledAdPopupRemoval: boolean;
}

// TODO const [currentCallback, setCurrentCallback] = createSignal<(settings: UserScriptSettings) => void>();
let currentCallback: ((settings: UserScriptSettings) => void) | undefined;

const exposedSettings = {
  onUnloadPromise,
  doStufff: () => {
    console.log("TODO doStufff");
    return Math.random();
  },
  registerCallback: (
    apiVersion: string,
    callback: (settings: UserScriptSettings) => void
  ) => {
    currentCallback = callback;
    // callback just registered, send them an update as soon as possible
    currentCallback({
      enabledFastRespawn: enabledFastRespawn(),
      enabledAdPopupRemoval: enabledAdPopupRemoval(),
    });
  },
  ping: 0,
};
export type exposedSettings = typeof exposedSettings;

createEffect(() => {
  const enabledFastRespawnB = enabledFastRespawn();
  const enabledAdPopupRemovalB = enabledAdPopupRemoval();
  currentCallback?.({
    enabledFastRespawn: enabledFastRespawnB,
    enabledAdPopupRemoval: enabledAdPopupRemovalB,
  });
});

expose(exposedSettings, windowEndpoint(window.opener));
