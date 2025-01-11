import Grid from "@mui/material/Grid2";
import { Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ResetPasswordFinally = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("As Senhas não Coincidem.");
      return;
    }

    if (!token) {
      setError("Token não está disponível.");
      return;
    }

    try {
      await axios.post(`http://localhost:3000/api/reset-password/${token}`, {
        newPassword,
      });

      setMessage(
        "Senha redefinida com sucesso! Você será redirecionado para a página de login."
      );
      setError("");
      setTimeout(() => {
        navigate("/Entrar");
      }, 3000);
    } catch (error) {
      if (error.response) {
        setError(
          error.response.data.message ||
            "Erro ao redefinir senha. Por favor, tente novamente."
        );
      } else {
        setError("Erro ao redefinir senha. Por favor, tente novamente.");
      }
      console.log(error);
    }
  };

  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      alignItems="center"
      paddingTop={15}
      display="flex"
    >
      <Grid item size={{ xs: 12 }}>
        <Typography variant="h5">Redefinir Senha</Typography>
      </Grid>
      <Grid item size={{ xs: 12, md: 4 }}>
        <form onSubmit={handleSubmit}>
          <TextField sx={{ paddingBottom: 2 }}
            label="Nova Senha:"
            type="password"
            fullWidth
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            autoComplete="new-password"
          />
          <TextField sx={{ paddingBottom: 2 }}
            label="Confirme a Nova Senha:"
            type="password"
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            autoComplete="new-password"
          />
          {error && <Typography color="error">{error}</Typography>}
          {message && <Typography color="success">{message}</Typography>}
          <Button variant="contained" type="submit" fullWidth>
            Redefinir Senha
          </Button>
        </form>
      </Grid>
    </Grid>
  );
};

export default ResetPasswordFinally;
 
