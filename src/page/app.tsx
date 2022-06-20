import { Route, Routes } from "solid-app-router";
import HomePage from "./pages/homePage";
import UserScriptSettingsPage from "./pages/userScriptSettings/userScriptSettingsPage";
import { hashIntegration, Router } from "solid-app-router";
import { ThemeProvider as ThemeProviderMUI } from "@suid/material";
import CssBaseline from "@suid/material/CssBaseline";
import GlobalStyles from "@suid/material/GlobalStyles";
import type { SxPropsObject } from "@suid/system/sxProps";
import { useAppTheme } from "./theme";

export default function App() {
  const theme = useAppTheme();
  return (
    <>
      <GlobalStyles
        styles={{
          "@font-face": {
            fontFamily: "PressStart2P",
            src: `url(https://fonts.gstatic.com/s/pressstart2p/v14/e3t4euO8T-267oIAQAu6jDQyK3nVivM.woff2) format('woff2')`,
          } as SxPropsObject & { src?: string },
        }}
      />
      <ThemeProviderMUI theme={theme()}>
        <CssBaseline />
        <Router source={hashIntegration()}>
          <Routes>
            <Route
              path="/userScriptSettings"
              element={<UserScriptSettingsPage />}
            />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </Router>
      </ThemeProviderMUI>
    </>
  );
}
