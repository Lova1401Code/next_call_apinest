// src/styles/theme.ts
import { createTheme } from "@mui/material/styles";

// Créer un thème personnalisé inspiré de Netflix
const theme = createTheme({
  palette: {
    mode: "dark", // Thème sombre par défaut
    primary: {
      main: "#e50914", // Rouge Netflix
    },
    background: {
      default: "#141414", // Fond noir profond
      paper: "#181818", // Fond des éléments comme les cartes
    },
    text: {
      primary: "#ffffff", // Texte blanc
      secondary: "#b3b3b3", // Texte gris clair
    },
  },
  typography: {
    fontFamily: "Arial, sans-serif", // Police utilisée par Netflix
    h1: {
      fontWeight: 600,
      fontSize: "2.5rem",
      lineHeight: 1.2,
    },
    h2: {
      fontWeight: 600,
      fontSize: "2rem",
    },
    h3: {
      fontWeight: 600,
      fontSize: "1.75rem",
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
      color: "#b3b3b3", // Texte secondaire gris
    },
  },
});

export default theme;
