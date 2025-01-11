import Grid from "@mui/material/Grid2";
import { Typography } from "@mui/material";

function MyProfile() {
  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item size={{ xs: 10, md: 10 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Meu Perfil
        </Typography>
      </Grid>
    </Grid>
  );
}

export default MyProfile;
