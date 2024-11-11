import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#d7e3fc",
      light: "#82a6f6",
      dark: "#072057",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#c1d3fe",
      light: "#6a96fd",
      dark: "#011b58",
      contrastText: "#ffffff",
    },

    text: {
      primary: "#072057", // Dark color for primary text
      secondary: "#011b58", // Secondary color for txt
    },
  },
});

export default theme;
