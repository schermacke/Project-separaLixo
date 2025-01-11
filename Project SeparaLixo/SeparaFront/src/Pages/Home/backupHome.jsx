import { useEffect, useState } from "react";
import "./App.css";
import Grid from "@mui/material/Grid2";
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Container,
  Divider,
  ListItem,
  Typography,
} from "@mui/material";
import axios from "axios";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TelegramIcon from "@mui/icons-material/Telegram";

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

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
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
        <Grid container justifyContent="center" display="flex" paddingTop={2}>
          <Grid item size={{ xs: 12, md: 10 }}>
            <Box
              sx={{
                padding: "2rem",
              }}
            >
              <Box>
                <Button
                  size="large"
                  color="inherit"
                  onClick={() => scrollToSection("services")}
                >
                  Sobre
                </Button>
                <Button
                  size="large"
                  color="inherit"
                  onClick={() => scrollToSection("contact")}
                >
                  Contato
                </Button>
              </Box>
            </Box>
            <Container>
              <Box
                id="overview"
                sx={{
                  py: 28,
                  backgroundImage: 'url("/background.webp")',
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: "30px",
                }}
              >
                <Typography variant="h3" gutterBottom align="center">
                  Bem-vindo ao Nosso Site
                </Typography>
                <Typography variant="h6" align="center">
                  Aqui você encontra as melhores babás da cidade!
                </Typography>
              </Box>

              <Divider sx={{ my: 10, bgcolor: "primary.main" }} />

              <Box id="services" sx={{ py: 28 }}>
                <Typography variant="h3" gutterBottom align="center">
                  Nota sobre o Website
                </Typography>
                <Grid
                  container
                  spacing={4}
                  display={"flex"}
                  justifyContent={"space-around"}
                  paddingTop={5}
                >
                  <Grid item xs={12} sm={4}>
                    <Typography align="center">
                      O objetivo principal deste website é proporcionar uma
                      plataforma fácil e eficiente para conectar contratantes
                      com babás na cidade. Nossa missão é simplificar o processo
                      de encontrar e contratar babás, oferecendo aos
                      contratantes acesso rápido às informações de contato das
                      babás cadastradas, como nome, WhatsApp e e-mail. No
                      futuro, planejamos disponibilizar ainda mais informações
                      para facilitar a escolha e a contratação.
                    </Typography>
                    <br />
                    <Typography align="center">
                      O site foi criado com a ideia de simplificar a busca por
                      profissionais de confiança, oferecendo uma solução
                      acessível tanto para quem procura como para quem oferece
                      serviços de babá. Aqui, contratantes podem visualizar
                      perfis e entrar em contato diretamente com as babás, tudo
                      de forma rápida e prática.
                    </Typography>
                    <br />
                    <Typography>
                      Futuramente, se o site ganhar popularidade, planejamos
                      expandir os serviços e, possivelmente, oferecer uma versão
                      paga que trará ainda mais recursos para os usuários.
                    </Typography>
                  </Grid>
                </Grid>
              </Box>

              <Divider sx={{ my: 10, bgcolor: "primary.main" }} />

              <Box id="contact" sx={{ py: 28 }}>
                <Grid
                  item
                  display={"flex"}
                  alignItems={"center"}
                  flexDirection={"column"}
                >
                  <Typography variant="h3" gutterBottom textAlign="center">
                    Entre em Contato
                  </Typography>
                  <Typography textAlign="center" paddingTop={5}>
                    Se você tiver dúvidas, sugestões de melhorias ou ideias de
                    implementações que possam beneficiar os usuários ou o site,
                    sinta-se à vontade para entrar em contato conosco!
                  </Typography>
                  <Typography>
                    Se você deseja criar seu próprio website, entre em contato
                    conosco!
                  </Typography>
                </Grid>
                <Grid
                  item
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  gap={2}
                  paddingTop={5}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    onClick={() => {
                      window.location.href = "https://wa.me/5555996764737";
                    }}
                  >
                    <WhatsAppIcon
                      style={{
                        marginRight: "5px",
                        display: "flex",
                        textAlign: "center",
                      }}
                    />
                    WhatsApp
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    onClick={() => {
                      window.location.href = "https://t.me/Schermacke";
                    }}
                  >
                    <TelegramIcon
                      style={{
                        marginRight: "5px",
                        display: "flex",
                        textAlign: "center",
                      }}
                    />
                    Telegram
                  </Button>
                </Grid>
              </Box>
              <Typography
                style={{ height: 0 }}
                variant="body1"
                color="textSecondary"
              >
                © {new Date().getFullYear()} Eduardo Schermack. Todos os
                direitos reservados.
              </Typography>
            </Container>
          </Grid>
        </Grid>
      )}
    </>
  );
}

export default Home;
