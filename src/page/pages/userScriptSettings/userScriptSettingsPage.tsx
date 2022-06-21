import Typography from "@suid/material/Typography";
import { createEffect, createSignal } from "solid-js";
import { SettingsList } from "./settingsList";
import {
  SettingsCommunicationState,
  useSettingsCommunication,
} from "./settingsWindowsInCommunication";

function useCurrentStatusMessage() {
  const { communicatorState } = useSettingsCommunication();
  const [statusMessage, setStatusMessage] = createSignal("Unknown state");
  createEffect(() => {
    switch (communicatorState()) {
      case SettingsCommunicationState.NoOpener:
        setStatusMessage("Not connected to Krunker instance");
        break;
      case SettingsCommunicationState.WaitingForCallbackRegistration:
        setStatusMessage("Waiting for Krunker connection");
        break;
      case SettingsCommunicationState.ReadyToPushEvents:
        setStatusMessage("Connected to Krunker!");
        break;
      default:
        break;
    }
  });

  return statusMessage;
}

export default function UserScriptSettingsPage() {
  const statusMessage = useCurrentStatusMessage();
  return (
    <>
      <Typography variant="h2" component="div" gutterBottom>
        Krunker Qoli settings
      </Typography>
      <Typography variant="body1" component="div">
        {statusMessage()}
      </Typography>
      <SettingsList />
    </>
  );
}
