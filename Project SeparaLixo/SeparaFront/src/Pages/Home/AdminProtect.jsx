import Grid from "@mui/material/Grid2";
import {
  Box,
  Card,
  CircularProgress,
  ListItem,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

const AdminPage = () => {
  const [babas, setBabas] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBabas = async () => {
    try {
      const response = await axios.get(`https://separalixoback.onrender.com/api/babas`);
      setBabas(response.data);
    } catch (error) {
      console.error("Erro ao buscar babás", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      fetchBabas();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <>
      {loading ? (
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          padding={15}
        >
          <CircularProgress />
        </Grid>
      ) : (
        <>
          <Typography paddingTop={10} variant="h4">
            Lista de Usuários
          </Typography>
          <Grid
            container
            paddingTop={1}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            {babas.length > 0 ? (
              <Box sx={{ padding: 2 }}>
                <Grid container spacing={1}>
                  {babas.map((user) => (
                    <Grid item xs={12} sm={6} md={4} key={user.id}>
                      <ListItem
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          padding: "1px",
                        }}
                      >
                        <Card
                          variant="elevation"
                          sx={{
                            padding: 3,
                            margin: "10px",
                            textAlign: "center",
                          }}
                        >
                          <h2>{user.name}</h2>
                          <p>Email: {user.email}</p>
                          <p>WhatsApp: {user.whatsapp}</p>
                          <p>Rua: {user.street}</p>
                          <p>Bairro: {user.neighborhood}</p>
                          <p>Número: {user.number}</p>
                          <p>Cidade: {user.city}</p>
                        </Card>
                      </ListItem>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            ) : (
              <Typography variant="body1">Nenhuma usuário encontrado.</Typography>
            )}
          </Grid>
        </>
      )}
    </>
  );
};

export default AdminPage;
