import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import MenuIcon from "@mui/icons-material/Menu";

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggedRole, setLoggedRole] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const role = localStorage.getItem("userRole");

    setLoggedIn(!!userId);
    setLoggedRole(role);
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleNavigate = (pageRoute) => {
    navigate(pageRoute);
    handleCloseNavMenu();
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    setLoggedIn(false);
    setLoggedRole(false);

    navigate("/Entrar");
    window.location.reload();
  };

  return (
    <AppBar position="static" color="transparent">
      <Toolbar disableGutters>
        <Typography
          style={{ marginLeft: "35px" }}
          variant="h5"
          noWrap
          component="a"
          href="/Home"
          sx={{
            mr: 2,
            display: { xs: "none", md: "flex" },
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          SeparaLixo
        </Typography>

        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            aria-label="menu"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{ display: { xs: "block", md: "none" } }}
          >
            {loggedIn ? (
              <Grid container spacing={2}>
                <MenuItem onClick={() => handleNavigate("/Home")}>
                  <Typography textAlign="center">Home</Typography>
                </MenuItem>
                {loggedRole === "CONTRACTOR" && (
                  <MenuItem onClick={() => handleNavigate("/admin")}>
                    <Typography textAlign="center">Usuários</Typography>
                  </MenuItem>
                )}
                {loggedRole === "CONTRACTOR" && (
                  <MenuItem onClick={() => handleNavigate("/CriarConta")}>
                    <Typography textAlign="center">Nova Conta</Typography>
                  </MenuItem>
                )}
                <MenuItem onClick={() => handleNavigate("/MeuPerfil")}>
                  <Typography textAlign="center">Meu Perfil</Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <Typography textAlign="center">Sair</Typography>
                </MenuItem>
              </Grid>
            ) : (
              <Grid container spacing={2}>
                <MenuItem onClick={() => handleNavigate("/Home")}>
                  <Typography textAlign="center">Home</Typography>
                </MenuItem>
                <MenuItem onClick={() => handleNavigate("/Entrar")}>
                  <Typography textAlign="center">Entrar</Typography>
                </MenuItem>
              </Grid>
            )}
          </Menu>
        </Box>

        <Typography
          variant="h5"
          noWrap
          component="a"
          href="/Home"
          sx={{
            mr: 2,
            display: { xs: "flex", md: "none" },
            flexGrow: 1,
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          SeparaLixo
        </Typography>

        <Box
          sx={{
            flexGrow: 1,
            display: { xs: "none", md: "flex" },
            justifyContent: "flex-end",
          }}
        >
          {loggedIn ? (
            <Grid container spacing={1} paddingRight={4}>
              <Button
                onClick={() => handleNavigate("/Home")}
                variant="outlined"
              >
                Home
              </Button>
              {loggedRole === "CONTRACTOR" && (
                <Button
                  onClick={() => handleNavigate("/admin")}
                  variant="outlined"
                >
                  Usuários
                </Button>
              )}
              {loggedRole === "CONTRACTOR" && (
                <Button
                  onClick={() => handleNavigate("/CriarConta")}
                  variant="outlined"
                >
                  Nova Conta
                </Button>
              )}
              <Button
                onClick={() => handleNavigate("/MeuPerfil")}
                variant="outlined"
              >
                Meu Perfil
              </Button>
              <Button onClick={handleLogout} variant="outlined">
                Sair
              </Button>
            </Grid>
          ) : (
            <Grid container spacing={1} paddingRight={4}>
              <Button
                onClick={() => handleNavigate("/Home")}
                variant="outlined"
              >
                Home
              </Button>
              <Button
                onClick={() => handleNavigate("/Entrar")}
                variant="outlined"
              >
                Entrar
              </Button>
            </Grid>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default ResponsiveAppBar;
