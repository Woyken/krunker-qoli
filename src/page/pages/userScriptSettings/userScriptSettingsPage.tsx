import Typography from "@suid/material/Typography";
import { SettingsList } from "./settingsList";
import "./settingsWindowsInCommunication";

// TODO add message for current connection to game status
// function useCurrentStatusMessage() {
//   if (!window.opener) return "Not connected to Krunker instance";

  // <Typography variant="p" component="div"> {}
//}

export default function UserScriptSettingsPage() {
  return (
    <>
      <Typography variant="h2" component="div" gutterBottom>
        Krunker Qoli settings
      </Typography>
      <SettingsList />
    </>
  );
}
