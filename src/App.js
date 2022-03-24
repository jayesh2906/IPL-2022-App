import { Navbar, Footer } from "./components/layout";
import {
  Home,
  Schedule,
  Prediction,
  BestOfIpl,
  CreateXi,
  SelectXi,
} from "./components/pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { grey, red } from "@mui/material/colors";
import { Paper } from "@mui/material";
import { useState } from "react";

function App() {
  const [darkMode, setDarkMode] = useState(true);

  // Theme customization
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: red[600],
      },
      secondary: {
        main: grey[900],
      },
      background: {
        default: darkMode ? "#121212" : "#edf1fd",
      },
    },
  });

  const handleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <Paper
        sx={{
          minHeight: "100vh",
          backgroundColor: darkMode ? "#121212" : "#edf1fd",
        }}
      >
        <BrowserRouter>
          <Navbar handleTheme={handleTheme} />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/schedule" element={<Schedule />} />
            <Route exact path="/prediction" element={<Prediction />} />
            <Route exact path="/bestofipl" element={<BestOfIpl />} />
            <Route exact path="/createxi" element={<CreateXi />} />
            <Route exact path="/selectxi/:team" element={<SelectXi />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </Paper>
    </ThemeProvider>
  );
}

export default App;
