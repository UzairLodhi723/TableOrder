import type {} from "@mui/lab/themeAugmentation";
import type {} from "@mui/material/themeCssVarsAugmentation";
import {ThemeProvider} from "@mui/material/styles";

import { createTheme } from "./create-theme";
import { createContext, useContext, useMemo, useState } from "react";
import { CssBaseline } from "@mui/material";

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};
export const ThemeModeContext = createContext<{
  mode: string;
  toggleMode: () => void;
}>({
  mode: "",
  toggleMode: () => {},
});
export const useThemeMode = () => useContext(ThemeModeContext);

export function ThemeProviders({ children }: Props) {
  const [mode, setMode] = useState<"light"|"dark">("light");
  
  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };
  const theme = useMemo(() =>
      createTheme(mode),
    [mode]);
  return (
    <ThemeModeContext.Provider value={{ mode, toggleMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}
