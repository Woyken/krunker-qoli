import Typography from "@suid/material/Typography";
import { SettingsList } from "./settingsList";
import "./settingsWindowsInCommunication";

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
