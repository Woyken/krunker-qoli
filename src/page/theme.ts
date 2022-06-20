import { createTheme } from "@suid/material";
import { createEffect, createSignal } from "solid-js";
import { useMediaQuery } from "./hooks/useMediaQuery";

const themeTypographyFont = {
  typography: {
    fontFamily: '"PressStart2P", "Helvetica", "Arial", sans-serif',
  },
};

const lightTheme = createTheme({
  ...themeTypographyFont,
  palette: {
    mode: "light",
    primary: {
      main: "#885200",
      contrastText: "#ffffff",
      light: "#ffddb8",
      dark: "#2c1700",
    },
    secondary: {
      main: "#715a41",
      contrastText: "#ffffff",
      light: "#fdddbd",
      dark: "#281805",
    },
    error: {
      main: "#ba1b1b",
      contrastText: "#ffffff",
      light: "#ffdad4",
      dark: "#410001",
    },
    divider: "#837568",
  },
});

const darkTheme = createTheme({
  ...themeTypographyFont,
  palette: {
    mode: "dark",
    primary: {
      main: "#ffb85f",
      contrastText: "#482900",
      light: "#673d00",
      dark: "#ffddb8",
    },
    secondary: {
      main: "#dfc1a2",
      contrastText: "#3f2d17",
      light: "#58432b",
      dark: "#fdddbd",
    },
    error: {
      main: "#ffb4a9",
      contrastText: "#680003",
      light: "#930006",
      dark: "#ffdad4",
    },
    divider: "#9d8e81",
  },
});

export const useAppTheme = () => {
  const isDarkTheme = useMediaQuery("(prefers-color-scheme: dark)");
  const [theme, setTheme] = createSignal(darkTheme);
  createEffect(() => {
    setTheme(isDarkTheme() ? darkTheme : lightTheme);
  });

  return theme;
};
