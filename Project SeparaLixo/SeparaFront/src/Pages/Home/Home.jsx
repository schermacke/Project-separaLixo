import { useEffect, useState } from "react";
import "./App.css";
import Grid from "@mui/material/Grid2";
import {
  Box,
  Card,
  CircularProgress,
  ListItem,
  Typography,
} from "@mui/material";
import axios from "axios";
import BackgroundSection from "./BackgroundSection";
import BottomHome from "./BottomHome";

function Home() {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [babas, setBabas] = useState([]);

  const fetchBabas = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/babas");
      setBabas(response.data);
    } catch (error) {
      console.error("Erro ao buscar babás", error);
    } finally {
      setLoading(false); // Carregamento finalizado
    }
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      setLoggedIn(true);
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
      ) : loggedIn ? (
        <>
          <Typography paddingTop={5} variant="h4">
            Lista de Babás
          </Typography>
          <Grid
            container
            paddingTop={2}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            {babas.length > 0 ? (
              <Box sx={{ padding: 4 }}>
                <Grid container spacing={1}>
                  {babas.map((baba) => (
                    <Grid item xs={12} sm={6} md={4} key={baba.id}>
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
                          <h2>{baba.name}</h2>
                          <p>Email: {baba.email}</p>
                          <p>WhatsApp: {baba.whatsapp}</p>
                        </Card>
                      </ListItem>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            ) : (
              <Typography variant="body1">Nenhuma babá encontrada.</Typography>
            )}
          </Grid>
        </>
      ) : (
        <Grid>
          <BackgroundSection />
          <BottomHome />
        </Grid>
      )}
    </>
  );
}

export default Home;
