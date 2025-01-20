import { useEffect, useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid2";
import { Card, ListItemText, Stack, Typography } from "@mui/material";

const ListAppointments = () => {
  const [agendamentos, setAgendamentos] = useState([]);
  const userName = localStorage.getItem("userName");

  const fetchAgendamentos = async () => {
    try {
      const response = await axios.get(
        `https://separalixoback.onrender.com/api/agendamentos`
      );
      setAgendamentos(response.data);
    } catch (error) {
      console.error("Erro ao buscar agendamentos:", error);
    }
  };

  useEffect(() => {
    fetchAgendamentos();
  }, []);

  const getOptionsPersonLabel = (value) => {
    switch (value) {
      case "YES":
        return "Sim";
      case "NOT":
        return "Não";
      default:
        return "";
    }
  };

  return (
    <Grid
      container
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      direction={"column"}
      paddingBottom={2}
    >
      <Grid item paddingTop={10}>
        <Typography variant="h4">Agendamentos</Typography>
        <Stack spacing={2} paddingTop={5}>
          {agendamentos.map((agendamento) => (
            <Card
              key={agendamento.id}
              variant="elevation"
              sx={{
                padding: 1.5,
                backgroundColor: "rgba(179, 255, 0, 0.19)",
              }}
            >
              <ListItemText
                primary={
                  <Grid display={"grid"}>
                    <Typography variant="h6">
                      Usuário: {agendamento.userName}
                    </Typography>
                    <Typography variant="overline">
                      Serviço: {agendamento.servico}
                    </Typography>
                    <Typography variant="overline">
                      Necessidades especiais:{" "}
                      {getOptionsPersonLabel(agendamento.optionsPerson)}
                    </Typography>
                  </Grid>
                }
                secondary={`Data: ${new Date(
                  agendamento.data
                ).toLocaleString()}`}
              />
            </Card>
          ))}
        </Stack>
      </Grid>
    </Grid>
  );
};

export default ListAppointments;
