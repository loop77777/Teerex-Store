import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let theme = createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif",
    allVariants: {
      color: "#0d1614",
    },
  },
  components: {
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: "#9c5e8d",
        },
      },
    },
  },
  palette: {
    text: {
      main: "#0d1614",
    },
    background: {
      main: "#fcfdfd",
    },
    primary: {
      main: "#804d58",
      textContrast: "#fcfdfd",
    },
    secondary: {
      main: "#eae0dc",
      textContrast: "#0d1614",
    },
    accent: {
      main: "#9c5e8d",
      textContrast: "#fcfdfd",
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
