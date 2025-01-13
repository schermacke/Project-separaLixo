import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Box, Fab } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Home from "./Pages/Home/Home.jsx";
import "./index.css";
import LoginFormPage from "../src/Pages/Login/PageLogin.jsx";
import UserFormPage from "../src/Pages/CreateUser/CreateUser.jsx";
import ResponsiveAppBar from "./components/NavBar.jsx";
import MyProfile from "../src/Pages/Profile/MyProfile.jsx";
import { FaSun } from "react-icons/fa";
import { FaMoon } from "react-icons/fa";
import ResetPasswordFinally from "../src/Pages/ResetPassword/ResetPasswordFinally.jsx";
import PasswordReset from "../src/Pages/ResetPassword/PasswordReset.jsx";
import {
  createTheme,
  CssBaseline,
  IconButton,
  ThemeProvider,
} from "@mui/material";
import NotAuthorized from "./Pages/NotAuthorized/NotAuthorized.jsx";
import ProtectedRoute from "./Pages/Login/ProtectedRoute.jsx";
import AdminProtect from "./Pages/Home/AdminProtect.jsx";
import NotFound from "./Pages/NotFound/NotFound.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";

function Main() {
  const [themeSelected, setThemeSelected] = useState("light");

  const darkMode = createTheme({
    palette: {
      mode: "dark",
      background: {
        paper: "#252525",
        default: "#252525",
      },
    },
  });

  const lightMode = createTheme({
    palette: {
      mode: "light",
      background: {
        paper: "#FFFFFF",
        default: "#FFFFFF",
      },
    },
  });
  return (
    <ThemeProvider theme={themeSelected === "light" ? lightMode : darkMode}>
      <CssBaseline />
      <IconButton
        sx={{
          position: "absolute",
          right: 15,
          top: 75,
          zIndex: 1000,
        }}
        onClick={() =>
          setThemeSelected(themeSelected === "light" ? "dark" : "light")
        }
      >
        {themeSelected === "dark" ? (
          <Fab color="primary" size="medium">
            <FaSun fontSize={35} color="rgb(251, 255, 0)" />
          </Fab>
        ) : (
          <Fab color="primary" size="medium">
            <FaMoon fontSize={35} color="rgb(51, 51, 51)" />
          </Fab>
        )}
      </IconButton>
      <Router>
        <Grid style={{ height: "100vh" }}>
          <ResponsiveAppBar />
          <Box>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Entrar" element={<LoginFormPage />} />
              <Route path="/CriarConta" element={<UserFormPage />} />
              <Route path="/RecuperarConta" element={<PasswordReset />} />
              <Route path="/MeuPerfil" element={<MyProfile />} />
              <Route
                path="/reset-password/:token"
                element={<ResetPasswordFinally />}
              />
              <Route
                path="/acessoNegado"
                element={
                  <ProtectedRoute role="BABA">
                    <NotAuthorized />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute role="CONTRACTOR">
                    <AdminProtect />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/notFound" replace />} />
              <Route path="/notFound" element={<NotFound />} />
            </Routes>
          </Box>
        </Grid>
      </Router>
    </ThemeProvider>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
