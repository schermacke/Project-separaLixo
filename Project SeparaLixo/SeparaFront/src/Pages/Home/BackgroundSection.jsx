import { Box, Button, Card, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

const BackgroundSection = () => {
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Box
      sx={{
        backgroundImage: 'url("/background.webp")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "120vh",
        maskImage: "linear-gradient(to bottom, black 80%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, black 85%, transparent 100%)",
      }}
    >
      <Grid
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={2}
        paddingTop={10}
      >
        <Button
          variant="contained"
          size="large"
          color="primary"
          onClick={() => scrollToSection("services")}
        >
          Sobre
        </Button>
        <Button
          variant="contained"
          size="large"
          color="primary"
          onClick={() => scrollToSection("benefits")}
        >
          Beneficios
        </Button>
        <Button
          variant="contained"
          size="large"
          color="primary"
          onClick={() => scrollToSection("contact")}
        >
          Contato
        </Button>
      </Grid>
      <Grid
        paddingTop={20}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        flexdirection={"column"}
      >
        <Card
          sx={{
            borderRadius: "40px 20px",
            backgroundColor: "rgba(25, 118, 210, 0.7)",
            maxWidth: "1000px",
            padding: "1rem",
          }}
        >
          <Typography
            color="white"
            variant="h3"
            gutterBottom
            align="center"
            fontFamily={"cursive"}
          >
            Bem-vindo ao website do meio ambiente, onde protegemos, cuidamos e
            preservamos o futuro do nosso planeta!
          </Typography>
        </Card>
      </Grid>
    </Box>
  );
};

export default BackgroundSection;
