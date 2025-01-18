import { useEffect, useState } from "react";
import "./App.css";
import Grid from "@mui/material/Grid2";
import {
  Box,
  CircularProgress,
  Typography,
  Container,
  Button,
  Toolbar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Card,
} from "@mui/material";
import axios from "axios";
import BackgroundSection from "./BackgroundSection";
import BottomHome from "./BottomHome";
import {
  Recycling,
  Nature,
  Info,
  BatteryChargingFull,
  WaterDrop,
  LocalFlorist,
  Store,
  CleanHands,
} from "@mui/icons-material";
import WifiProtectedSetupIcon from "@mui/icons-material/WifiProtectedSetup";

function Home() {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [babas, setBabas] = useState([]);

  const fetchBabas = async () => {
    try {
      const response = await axios.get(
        `https://separalixoback.onrender.com/api/babas`
      );
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
          <Box>
            {/* Navigation Bar */}
            <Grid
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              sx={{ flexGrow: 1, paddingTop: 9 }}
            >
              <Toolbar>
                <Button color="inherit" href="#tips">
                  Dicas
                </Button>
                <Button color="inherit" href="#how-to-dispose">
                  Como Descartar
                </Button>
                <Button color="inherit" href="#map-section">
                  Locais
                </Button>
              </Toolbar>
            </Grid>

            {/* Hero Section */}
            <Box
              sx={{
                backgroundImage: `url(floresta.webp)`,
                backgroundSize: "cover",
                backgroundPosition: "top",
                py: 20,
                textAlign: "center",
                color: "#fff",
                mt: 5,
              }}
            >
              <Grid
                item
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Card
                  sx={{
                    backgroundColor: "rgba(39, 121, 39, 0.81)",
                    borderRadius: "40px",
                    padding: 3,
                  }}
                >
                  <Typography
                    variant="h3"
                    gutterBottom
                    fontFamily={"monospace"}
                    sx={{
                      fontSize: {
                        xs: "2rem",
                        md: "2.5rem",
                      },
                    }}
                  >
                    Descarte Consciente:
                    <br /> Cuidando do Planeta com Responsabilidade
                  </Typography>
                  <Typography variant="h5" gutterBottom paddingTop={3}>
                    "Cada pequena ação conta para um futuro melhor. Juntos,
                    podemos transformar o planeta com atitudes conscientes!"
                  </Typography>
                </Card>
              </Grid>
            </Box>

            {/* Tips Section */}
            <Container id="tips" sx={{ py: 15, textAlign: "center" }}>
              <Divider>
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{
                    fontSize: {
                      xs: "1rem",
                      sm: "1.7rem",
                      md: "2.5rem",
                    },
                  }}
                >
                  Dicas para Descartar Conscientemente
                </Typography>
              </Divider>
              <List sx={{ paddingTop: 3 }}>
                <ListItem>
                  <ListItemIcon>
                    <Recycling color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Separe os recicláveis do lixo orgânico"
                    secondary="Utilize lixeiras coloridas para facilitar a separação."
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemIcon>
                    <Nature color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Faça compostagem com resíduos orgânicos"
                    secondary="Transforme restos de alimentos em adubo natural."
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemIcon>
                    <Info color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Evite plásticos descartáveis"
                    secondary="Opte por itens reutilizáveis no dia a dia."
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemIcon>
                    <BatteryChargingFull color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Descarte baterias em pontos de coleta"
                    secondary="Evite jogar baterias no lixo comum para prevenir a contaminação do solo."
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemIcon>
                    <WaterDrop color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Evite descartar óleo de cozinha na pia"
                    secondary="Armazene o óleo usado em garrafas plásticas e leve a pontos de coleta."
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemIcon>
                    <LocalFlorist color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Plante árvores e crie áreas verdes"
                    secondary="Aproveite o espaço para criar jardins com materiais reciclados."
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemIcon>
                    <Store color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Entregue eletrônicos em lojas especializadas"
                    secondary="Muitas lojas possuem pontos de descarte para celulares e eletrônicos."
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemIcon>
                    <CleanHands color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Lave e seque materiais recicláveis"
                    secondary="Limpe embalagens antes de descartá-las para evitar contaminação."
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemIcon>
                    <WifiProtectedSetupIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Reutilize embalagens sempre que possível"
                    secondary="Use potes e garrafas para armazenamento em vez de descartá-los."
                  />
                </ListItem>
                <Divider />
              </List>
            </Container>

            {/* How to Dispose of Waste Correctly Section */}
            <Container id="how-to-dispose" sx={{ py: 1 }}>
              <Divider>
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{
                    fontSize: {
                      xs: "1rem",
                      sm: "1.7rem",
                      md: "2.5rem",
                    },
                  }}
                >
                  Como Descartar o Lixo Corretamente
                </Typography>
              </Divider>
              <Grid container spacing={4} sx={{ mt: 3, paddingTop: 3 }}>
                <Grid item xs={12} md={6}>
                  <Card
                    sx={{ p: 3, backgroundColor: "rgba(236, 247, 84, 0.40)" }}
                  >
                    <Typography variant="h6" color="warning" gutterBottom>
                      Lixo Reciclável
                    </Typography>
                    <Typography variant="body1">
                      Separe papéis, plásticos, vidros e metais em recipientes
                      diferentes e limpos, garantindo que estejam secos e livres
                      de resíduos orgânicos. Utilize sacos resistentes ou caixas
                      organizadoras para facilitar o transporte até um ponto de
                      coleta seletiva ou cooperativa de reciclagem, contribuindo
                      para o reaproveitamento eficiente desses materiais e a
                      redução do impacto ambiental.
                    </Typography>
                  </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Card
                    sx={{ p: 3, backgroundColor: "rgba(58, 98, 207, 0.4)" }}
                  >
                    <Typography variant="h6" color="error" gutterBottom>
                      Lixo Perigoso
                    </Typography>
                    <Typography variant="body1">
                      Pilhas, baterias, lâmpadas fluorescentes e resíduos
                      químicos devem ser descartados em locais especializados,
                      como pontos de coleta em lojas ou postos de combustível,
                      garantindo que esses materiais sejam tratados
                      adequadamente para evitar a contaminação do solo, da água
                      e danos ao meio ambiente.
                    </Typography>
                  </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card
                    sx={{ p: 3, backgroundColor: "rgba(38, 209, 4, 0.40)" }}
                  >
                    <Typography variant="h6" color="secondary" gutterBottom>
                      Lixo Orgânico
                    </Typography>
                    <Typography variant="body1">
                      Resíduos como restos de alimentos, como cascas de frutas,
                      vegetais, borra de café e até mesmo folhas secas, podem
                      ser usados para fazer compostagem, transformando-os em um
                      adubo natural rico em nutrientes para suas plantas e
                      jardins, além de ajudar a reduzir significativamente a
                      quantidade de lixo orgânico descartado em aterros
                      sanitários.
                    </Typography>
                  </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card
                    sx={{ p: 3, backgroundColor: "rgba(201, 197, 3, 0.40)" }}
                  >
                    <Typography variant="h6" color="success" gutterBottom>
                      Eletroeletrônicos
                    </Typography>
                    <Typography variant="body1">
                      Equipamentos eletrônicos, como celulares, computadores e
                      baterias, devem ser levados a pontos de coleta específicos
                      ou doados para instituições que promovam o reuso desses
                      itens, contribuindo para a redução do lixo eletrônico e
                      permitindo que componentes ainda funcionais sejam
                      reaproveitados de forma sustentável.
                    </Typography>
                  </Card>
                </Grid>
              </Grid>
            </Container>

            <Container id="map-section" sx={{ py: 15 }}>
              <Divider>
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{
                    fontSize: {
                      xs: "1rem",
                      sm: "1.7rem",
                      md: "2.5rem",
                    },
                  }}
                >
                  Localize Pontos de Coleta Próximos
                </Typography>
              </Divider>
              <Typography sx={{ mb: 2, paddingTop: 3 }}>
                Encontre o ponto de coleta seletiva ou especializado mais
                próximo para descartar seus resíduos corretamente.
              </Typography>
              <Box
                sx={{
                  height: "400px",
                  width: "100%",
                  border: "2px solid #ccc",
                  borderRadius: "8px",
                  overflow: "hidden",
                }}
              >
                {/* Placeholder for the map */}
                <iframe
                  title="Mapa de Pontos de Coleta"
                  src="https://maps.google.com/maps?q=Panambi,RS&z=12&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: "none" }}
                ></iframe>
              </Box>
            </Container>

            {/* Footer */}
            <Box
              sx={{
                backgroundColor: "#357ff5",
                py: 1.5,
                textAlign: "center",
                color: "white",
                mt: 5,
              }}
            >
              <Typography
                sx={{
                  fontSize: {
                    xs: "0.7rem",
                    md: "0.9rem",
                  },
                }}
              >
                © {new Date().getFullYear()} Descarte Consciente. Todos os
                direitos reservados.
              </Typography>
            </Box>
          </Box>
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
