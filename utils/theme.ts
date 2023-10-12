import { grey } from "@mui/material/colors";
import { createTheme, ThemeOptions } from "@mui/material/styles";

export const theme = createTheme({
  divider: grey[200],
  // palette: {
  //   mode: "dark",
  // },
  typography: {
    fontFamily: "Nunito, sans-serif",
  },
} as ThemeOptions);
