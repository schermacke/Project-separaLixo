import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid2";
import {
  Button,
  Box,
  TextField,
  Typography,
  Snackbar,
  Alert,
  Card,
} from "@mui/material";
import PropTypes from "prop-types";



const LoginFormPage = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const navigate = useNavigate();

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handlePasswordReset = () => {
    navigate("/RecuperarConta");
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!/\S+@\S+\.\S+/.test(email)) {
      setSnackbarMessage("Por favor, insira um e-mail válido.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    const credentials = { email, password };

    try {
      const response = await axios.post(
        `https://separalixoback.onrender.com/api/login`,
        credentials
      );
      if (response.status === 200) {
        const { token, userId, role } = response.data;
        localStorage.setItem("authToken", token);
        localStorage.setItem("userId", userId);
        localStorage.setItem("userRole", role);
        localStorage.setItem("userName", name);
        
        if (typeof onLogin === "function") {
          onLogin();
        }

        navigate("/");
        window.location.reload();
      } else {
        setSnackbarMessage("Erro ao realizar login.");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error("Erro:", error);
      setSnackbarMessage(
        error.response?.data?.message || "Erro ao realizar login."
      );
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  return (
    <>
      <Grid
        container
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        paddingTop={15}
      >
        <Grid item size={{ xs: 12, md: 4 }}>
          <Card variant="elevation" sx={{ padding: 2, backgroundColor:"rgba(104, 165, 99, 0.03)" }} >
            <Grid item>
              <Typography variant="h5" component="h2" gutterBottom>
                Entrar
              </Typography>
            </Grid>
            <Box component="form" onSubmit={handleLogin}>
              <TextField
                size="small"
                label="E-mail"
                type="email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ marginBottom: "1em" }}
              />
              <TextField
                size="small"
                label="Senha"
                type="password"
                variant="outlined"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ marginBottom: "2em" }}
              />
              <Button
                style={{ marginBottom: "15px" }}
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
              >
                Entrar
              </Button>
              <Button
                onClick={handlePasswordReset}
                variant="contained"
                color="primary"
                fullWidth
              >
                Recuperar senha
              </Button>
            </Box>
          </Card>
        </Grid>
      </Grid>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

LoginFormPage.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default LoginFormPage;
