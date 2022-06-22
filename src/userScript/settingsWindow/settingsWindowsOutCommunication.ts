import { proxy, Remote, windowEndpoint, wrap } from "comlink";
import { apiVersion } from "../../shared/globals";
import type {
  UserScriptSettings,
  ExposedSettings,
} from "../../page/pages/userScriptSettings/settingsWindowsInCommunication";
import {
  setEnabledAdPopupDismisser,
  setEnabledFastRespawn,
} from "../state/userScriptSettingsState";
import { localWindow } from "../utils/localWindowCopy";
import { createScopedLogger } from "../utils/logger";

const logger = createScopedLogger("[Settings window communication]");

let settingsWindow: Window | null = null;

// const settingsUrl = new URL("http://localhost:3000/#userScriptSettings");
const settingsUrl = new URL("https://woyken.github.io/krunker-qoli/#userScriptSettings");

const endpointMessageListeners: {
  type: string;
  listener: EventListenerOrEventListenerObject;
}[] = [];

window.addEventListener("message", (e) => {
  if (e.origin === settingsUrl.origin) e.stopImmediatePropagation();
  // TODO rewrite with map of arrays by type
  endpointMessageListeners
    .filter((l) => l.type === "message")
    .forEach(({ listener }) => {
      if ("handleEvent" in listener) listener.handleEvent(e);
      else listener(e);
    });
});

function settingsUpdatedCallback(settings: UserScriptSettings) {
  logger.log("settingsUpdatedCallback", settings);
  setEnabledFastRespawn(settings.enabledFastRespawn);
  setEnabledAdPopupDismisser(settings.enabledAdPopupRemoval);
}

async function openSettingsWindow() {
  const wnd = localWindow.open(
    settingsUrl.href,
    "settingsWindow",
    "width=400,height=400"
  );
  if (!wnd) {
    alert(
      "Failed to open settings window, allow popups for Krunker Qoli to work"
    );
    throw new Error("Failed to open settings window");
  }
  closeSettingsWindow();
  settingsWindow = wnd;
  const endpoint = windowEndpoint(
    settingsWindow,
    {
      addEventListener(type, listener, options?) {
        endpointMessageListeners.push({ type, listener });
      },
      removeEventListener(type, listener, options?) {
        const foundIdx = endpointMessageListeners.findIndex(
          ({ type: t, listener: l }) => t === type && l === listener
        );
        if (foundIdx >= 0) endpointMessageListeners.splice(foundIdx, 1);
      },
    },
    "*"
  );

  const remoteExposedSettings = wrap<ExposedSettings>(endpoint);

  const onSettingsWindowAvailablePromise = new Promise<void>((resolve) => {
    logger.log("waiting for settings window");
    const intervalId = setInterval(() => {
      logger.log("checking for settings window");
      promiseWrapperWithThrowTimeout(remoteExposedSettings.ping, 200).then(
        () => {
          clearInterval(intervalId);
          resolve();
        }
      );
    }, 200);
  });

  await onSettingsWindowAvailablePromise.then(() => {
    remoteExposedSettings.onUnloadPromise.then(() => {
      logger.log("settings window unloaded");
      closeSettingsWindow();
    });
  });
  logger.log("settings window available");

  remoteExposedSettings.registerCallback(
    apiVersion,
    proxy(settingsUpdatedCallback)
  );

  return remoteExposedSettings;
}

function promiseWrapperWithThrowTimeout<T>(
  inputPromise: Promise<T>,
  timeout: number
): Promise<T> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error("Promise timed out"));
    }, timeout);
    inputPromise.then(resolve, reject);
  });
}

let remoteExposedSettingsPromise: Promise<Remote<ExposedSettings>> | undefined;

export async function getRemoteSettings() {
  if (!remoteExposedSettingsPromise)
    remoteExposedSettingsPromise = openSettingsWindow();

  return remoteExposedSettingsPromise;
}

function closeSettingsWindow() {
  remoteExposedSettingsPromise = undefined;
  if (settingsWindow) {
    settingsWindow.close();
    settingsWindow = null;
  }
}

window.addEventListener("beforeunload", (e) => {
  closeSettingsWindow();
});
