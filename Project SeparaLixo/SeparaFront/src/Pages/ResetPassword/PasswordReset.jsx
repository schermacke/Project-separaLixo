import { useState } from "react";
import axios from "axios";
import { Button, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useNavigate } from "react-router-dom";

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/sendEmail", {
        userEmail: email,
      });

      setMessage(response.data.message);
      setError("");
    } catch (e) {
      setError(`Erro ao enviar e-mail: ${e.message}`);
      setMessage("");
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Grid
      container
      spacing={2}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      paddingTop={15}
    >
      <Grid item size={{ xs: 12 }}>
        <Typography variant="h5" component="h4">
          Recuperar Senha
        </Typography>
      </Grid>
      <Grid item size={{ xs: 12, md: 4 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            sx={{ paddingBottom: 2 }}
            label="Digite seu e-mail"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
          />
          <Grid sx={{ paddingBottom: 2 }}>
            <Button variant="contained" type="submit" fullWidth>
              Enviar E-mail de Recuperação
            </Button>
          </Grid>
          <Grid>
            <Button variant="contained" fullWidth onClick={handleGoBack}>
              Voltar
            </Button>
          </Grid>
        </form>
      </Grid>
      {message && (
        <Grid item size={{ xs: 10, md: 10 }}>
          <Typography className="success-message">{message}</Typography>
        </Grid>
      )}
      {error && (
        <Grid item size={{ xs: 10, md: 10 }}>
          <Typography className="error-message">{error}</Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default PasswordReset;
