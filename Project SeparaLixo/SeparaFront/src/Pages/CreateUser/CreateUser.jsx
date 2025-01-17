import { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  TextField,
  Typography,
  Snackbar,
  Alert,
  FormControl,
  MenuItem,
  Select,
  Switch,
  FormControlLabel,
  Card,
  FormHelperText,
} from "@mui/material";
import TermsOfUseModal from "./termsOfUse/TermsOfUseModal";

const UserFormPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    whatsapp: "",
    role: "",
    street: "",
    neighborhood: "",
    number: "",
    city: "",
    zipCode: "",
    state: "",
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [checked, setChecked] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCloseSnackbar = () => setOpenSnackbar(false);

  const handleSwitchChange = (event) => {
    if (event.target.checked) {
      setModalOpen(true);
    } else {
      setChecked(false);
    }
  };

  const handleModalClose = (accepted) => {
    setModalOpen(false);
    setChecked(accepted);
  };

  const createUser = async (e) => {
    e.preventDefault();

    const { email, name, password, role } = formData;

    if (!email || !name || !password || !role) {
      setSnackbarMessage("Por favor, preencha todos os campos obrigatórios.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    try {
      const endpoint =
        role === "BABA"
          ? `https://separalixoback.onrender.com/api/babas`
          : `https://separalixoback.onrender.com/api/contratantes`;

      const response = await axios.post(endpoint, formData);

      if (response.status === 201) {
        setSnackbarMessage("Usuário criado com sucesso!");
        setSnackbarSeverity("success");
        setFormData({
          email: "",
          name: "",
          password: "",
          whatsapp: "",
          role: "",
          street: "",
          neighborhood: "",
          number: "",
          city: "",
          zipCode: "",
          state: "",
        });
        setChecked(false);
      } else {
        throw new Error("Erro ao criar usuário.");
      }
    } catch (error) {
      console.error("Erro:", error);
      const errorMsg =
        error.response?.data?.message || "Erro ao criar usuário.";
      setSnackbarMessage(errorMsg);
      setSnackbarSeverity("error");
    } finally {
      setOpenSnackbar(true);
    }
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        paddingTop={10}
      >
        <Card
          component="form"
          onSubmit={createUser}
          variant="elevation"
          sx={{
            padding: 2,
            width: "100%",
            maxWidth: 600,
          }}
        >
          <Typography variant="h4" component="h2" gutterBottom align="center">
            Novo Usuário
          </Typography>
          <TextField
            sx={{ paddingBottom: 1 }}
            size="small"
            label="E-mail"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            required
            fullWidth
          />
          <TextField
            sx={{ paddingBottom: 1 }}
            size="small"
            label="Nome"
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            required
            fullWidth
          />
          <TextField
            sx={{ paddingBottom: 1 }}
            size="small"
            label="Senha"
            type="password"
            value={formData.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            required
            fullWidth
          />
          <TextField
            sx={{ paddingBottom: 1 }}
            size="small"
            label="WhatsApp"
            type="text"
            value={formData.whatsapp}
            onChange={(e) => handleInputChange("whatsapp", e.target.value)}
            fullWidth
            error={formData.whatsapp && !/^\d+$/.test(formData.whatsapp)}
            helperText={
              formData.whatsapp && !/^\d+$/.test(formData.whatsapp)
                ? "Digite apenas números."
                : ""
            }
          />
          <TextField
            sx={{ paddingBottom: 1 }}
            size="small"
            label="Rua"
            type="text"
            value={formData.street}
            onChange={(e) => handleInputChange("street", e.target.value)}
            required
            fullWidth
          />
          <TextField
            sx={{ paddingBottom: 1 }}
            size="small"
            label="Bairro"
            type="text"
            value={formData.neighborhood}
            onChange={(e) => handleInputChange("neighborhood", e.target.value)}
            required
            fullWidth
          />
          <TextField
            sx={{ paddingBottom: 1 }}
            size="small"
            label="Número"
            type="text"
            value={formData.number}
            onChange={(e) => handleInputChange("number", e.target.value)}
            required
            fullWidth
          />
          <TextField
            sx={{ paddingBottom: 1 }}
            size="small"
            label="Cidade"
            type="text"
            value={formData.city}
            onChange={(e) => handleInputChange("city", e.target.value)}
            required
            fullWidth
          />
          <TextField
            sx={{ paddingBottom: 1 }}
            size="small"
            label="CEP"
            type="text"
            value={formData.zipCode}
            onChange={(e) => handleInputChange("zipCode", e.target.value)}
            required
            fullWidth
          />
          <TextField
            sx={{ paddingBottom: 1 }}
            size="small"
            label="Estado"
            type="text"
            value={formData.state}
            onChange={(e) => handleInputChange("state", e.target.value)}
            required
            fullWidth
          />
          <FormControl fullWidth required sx={{ paddingBottom: 1 }}>
            <FormHelperText sx={{ fontSize: "17px" }}>
              Defina o tipo de Usuário:
            </FormHelperText>
            <Select
              size="small"
              labelId="role-label"
              value={formData.role}
              onChange={(e) => handleInputChange("role", e.target.value)}
            >
              <MenuItem value="BABA">Cliente</MenuItem>
              <MenuItem value="CONTRACTOR">Administrador</MenuItem>
            </Select>
          </FormControl>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={checked}
                  onChange={handleSwitchChange}
                  name="controlled-switch"
                  color="primary"
                />
              }
              label="Aceitar termos de uso"
            />
            <TermsOfUseModal open={modalOpen} handleClose={handleModalClose} />
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              disabled={!checked}
            >
              Criar usuário
            </Button>
          </Box>
        </Card>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default UserFormPage;
