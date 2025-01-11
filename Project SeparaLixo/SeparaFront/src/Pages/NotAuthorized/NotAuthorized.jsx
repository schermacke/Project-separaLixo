import { Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Navigate } from "react-router-dom";

const NotAuthorized = () => {
  return (
    <Grid
      container
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      direction={"column"}
    >
      <h1>Acesso não Autorizado!</h1>
      <p>Somente administradores.</p>
      <Grid>
        <Button variant="contained" onClick={() => Navigate("/")}>
          Voltar para a página inicial
        </Button>
      </Grid>
    </Grid>
  );
};

export default NotAuthorized;
