import { Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Grid
      container
      textAlign={"center"}
      justifyContent={"center"}
      display={"flex"}
      direction={"column"}
    >
      <h1>404 - Página não encontrada</h1>
      <p>A página que você está procurando não existe.</p>
      <Grid item>
        <Button variant="contained" onClick={() => navigate("/")}>
          Voltar para a página inicial
        </Button>
      </Grid>
    </Grid>
  );
};

export default NotFound;
