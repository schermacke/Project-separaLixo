import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import { Typography, Box, TextField, Divider } from "@mui/material";
import axios from "axios";
import { Button, Paper } from "@mui/material";
import ReplyIcon from "@mui/icons-material/Reply";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";

function MyProfile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [message, setMessage] = useState("");

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        console.error("Token não encontrado.");
        throw new Error("Token não encontrado. Faça o login.");
      }

      const response = await axios.get("http://localhost:3000/api/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUserData(response.data);
      setEditedData(response.data);
    } catch (error) {
      console.error("Erro ao buscar dados do usuário:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.put("http://localhost:3000/api/profile", editedData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setMessage("Perfil salvo com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar o perfil:", error);
      alert("Ocorreu um erro ao atualizar o perfil.");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (loading) {
    return (
      <Grid container justifyContent="center" alignItems="center">
        <Typography variant="h6">Carregando...</Typography>
      </Grid>
    );
  }

  if (!userData) {
    return (
      <Grid container justifyContent={"center"} alignItems={"center"}>
        <Typography variant="h6">Erro ao carregar perfil.</Typography>
      </Grid>
    );
  }

  return (
    <Grid
      container
      display={"flex"}
      justifyContent={"center"}
      direction={"column"}
    >
      <Box sx={{ p: 4, paddingTop: 12 }}>
        <Paper
          elevation={3}
          sx={{ p: 2, maxWidth: 900, mx: "auto", borderRadius: 2 }}
        >
          <Box textAlign={"center"} sx={{ mb: 3 }}>
            {isEditing && (
              <Box position={"absolute"}>
                <Button>
                  <ReplyIcon
                    fontSize="large"
                    onClick={() => setIsEditing((prev) => !prev)}
                  />
                </Button>
              </Box>
            )}
            <Typography variant="h4" component="h2" gutterBottom>
              Meu Perfil
            </Typography>
          </Box>
          {message && (
            <Typography
              color={
                message === "Perfil salvo com sucesso!" ? "success" : "error"
              }
            >
              {message}
            </Typography>
          )}
          {[
            { label: "Nome", name: "name" },
            { label: "Email", name: "email" },
            { label: "Telefone", name: "whatsapp" },
            { label: "Rua", name: "street" },
            { label: "Número", name: "number" },
            { label: "Bairro", name: "neighborhood" },
            { label: "CEP", name: "zipCode" },
            { label: "Cidade", name: "city" },
            { label: "Estado", name: "state" },
          ].map((field) => (
            <Box key={field.name} sx={{ md: 2, padding: 0.5 }}>
              {isEditing ? (
                <TextField
                  label={field.label}
                  name={field.name}
                  value={editedData[field.name] || ""}
                  onChange={handleInputChange}
                  fullWidth
                />
              ) : (
                <Typography variant="body1">
                  {field.label} : {userData[field.name]}
                </Typography>
              )}
            </Box>
          ))}
          <Grid
            paddingTop={1.5}
            display={"flex"}
            justifyContent={"center"}
            gap={2}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => setIsEditing((prev) => !prev)}
              startIcon={isEditing ? <CancelIcon /> : <EditIcon />}
            >
              {isEditing ? "Cancelar" : "Editar Perfil"}
            </Button>
            {isEditing && (
              <Box textAlign={"center"}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSave}
                >
                  <SaveIcon style={{ marginRight: "7px" }} />
                  Salvar
                </Button>
              </Box>
            )}
          </Grid>
        </Paper>
      </Box>
    </Grid>
  );
}

export default MyProfile;
