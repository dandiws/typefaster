import type React from "react";
import theme from "theme";
import { ThemeProvider } from "theme-ui";

function MockThemeUI({ children }: React.PropsWithChildren) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default MockThemeUI;
