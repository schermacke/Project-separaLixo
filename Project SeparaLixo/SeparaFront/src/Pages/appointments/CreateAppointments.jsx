import { useState } from "react";
import axios from "axios";
import {
  Button,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  TextField,
  Typography,
  Card,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

const CreateAppointments = () => {
  const [servico, setServico] = useState("");
  const [data, setData] = useState("");
  const [optionsPerson, setOptionsPerson] = useState("");
  const userName = localStorage.getItem("userName");

  const handleAgendar = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `https://separalixoback.onrender.com/api/agendamento`,
        {
          userName,
          servico,
          data,
          optionsPerson
        }
      );
      alert("Agendamento criado com sucesso!");
      setServico("");
      setData("");
      setOptionsPerson("");
    } catch {
      alert("Erro ao criar agendamento.");
    }
  };

  return (
    <Grid
      container
      display="flex"
      justifyContent="center"
      alignItems="center"
      direction="column"
      paddingTop={10}
    >
      <Card
        variant="elevation"
        sx={{
          padding: 2,
          width: "100%",
          maxWidth: 600,
        }}
      >
        <h1>Agendamento de Serviços</h1>
        <form onSubmit={handleAgendar}>
          <Grid item sx={{ paddingTop: 0.5, paddingBottom: 2 }}>
            <Typography variant="h5">Usuário: {userName}</Typography>
          </Grid>
          <Grid item sx={{ xs: 10, md: 10 }}>
            <TextField
              sx={{ paddingBottom: 1 }}
              fullWidth
              size="small"
              label="Serviço Desejado?"
              type="text"
              value={servico}
              onChange={(e) => setServico(e.target.value)}
              required
            />
            <TextField
              sx={{ paddingBottom: 1 }}
              fullWidth
              size="small"
              type="datetime-local"
              value={data}
              onChange={(e) => setData(e.target.value)}
              required
            />
            <FormControl fullWidth required sx={{ paddingBottom: 1 }}>
              <FormHelperText sx={{ fontSize: "17px" }}>
                Pessoa com necessidades especiais?
              </FormHelperText>
              <Select
                labelId="option-label"
                size="small"
                value={optionsPerson}
                onChange={(e) => setOptionsPerson(e.target.value)}
              >
                <MenuItem value="YES">Sim</MenuItem>
                <MenuItem value="NOT">Não</MenuItem>
              </Select>
            </FormControl>
            <Button fullWidth variant="contained" type="submit">
              Agendar
            </Button>
          </Grid>
        </form>
      </Card>
    </Grid>
  );
};

export default CreateAppointments;
