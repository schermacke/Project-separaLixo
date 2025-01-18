import { Box, Button, Modal, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import PropTypes from "prop-types";

const TermsOfUseModal = ({ open, handleClose }) => {
  return (
    <Grid container>
      <Modal
        open={open}
        onClose={() => handleClose(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: {
              xs: '90%', // 90% da largura da tela em dispositivos móveis
              sm: '80%', // 80% da largura da tela em dispositivos pequenos
              md: 1000  // 1000px em telas médias e maiores
            },
            height: {
              xs: '80%', // 80% da altura da tela em dispositivos móveis
              sm: '70%', // 70% da altura da tela em dispositivos pequenos
              md: 600    // 600px em telas médias e maiores
            },
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            overflowY: 'auto',
          }}

        >
          <Typography id="modal-title" variant="h6" component="h2">
            Termo de Uso do Site!
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            1. Aceitação dos Termos, Ao acessar e usar nosso site de cadastro de
            babás, você concorda em cumprir e estar vinculado a estes Termos de
            Uso. Se você não concordar com estes termos, não deverá utilizar
            nosso site. 2. O objetivo do Site, Nosso site permite que contratantes
            acessem informações sobre babás cadastradas, incluindo nome,
            WhatsApp e e-mail, para facilitar o contato e a contratação de
            serviços de babás na sua cidade. 3. Cadastro e Uso das Informações
            3.1. Ao se cadastrar, você concorda em fornecer informações
            verdadeiras, completas e atualizadas. É sua responsabilidade manter
            a precisão dessas informações. 3.2. As informações de contato das
            babás disponíveis no site (nome, WhatsApp e e-mail) são fornecidas
            para facilitar a comunicação entre contratantes e babás. Ao entrar
            em contato com as babás, você concorda em fazê-lo de maneira
            respeitosa e profissional. 4. Responsabilidade do Usuário, Você
            reconhece e concorda que o uso das informações disponíveis no site é
            de sua exclusiva responsabilidade. O site ou seu desenvolvedor ou mantedor
             não se responsabiliza por
            qualquer incidente, problema, ou dano que possa ocorrer como
            resultado do contato ou da contratação das babás cadastradas. 5.
            Isenção de Responsabilidade. O site não se responsabiliza por
            quaisquer ações ou omissões das babás, incluindo, mas não se
            limitando a, comportamento, qualidade do serviço, e quaisquer danos
            que possam ocorrer durante a prestação dos serviços. O uso do
            serviço é feito por sua conta e risco. 6. Modificações nos Termos.
            Reservamo-nos o direito de modificar estes Termos de Uso a qualquer
            momento. As alterações serão publicadas nesta página e entrarão em
            vigor assim que forem publicadas. É sua responsabilidade revisar
            periodicamente os Termos de Uso para estar ciente de quaisquer
            mudanças. 7. Lei Aplicável Este Termo de Uso será regido e
            interpretado de acordo com as leis do Brasil. 8. Contato Se você
            tiver alguma dúvida ou preocupação sobre estes Termos de Uso, entre
            em contato conosco através do e-mail [separalixosustentavel@gmail.com].
          </Typography>
          <Grid item display={"flex"} justifyContent={"center"} alignItems={"center"} gap={2}>
            <Button
              variant="contained"
              onClick={() => handleClose(true)}
              sx={{ mt: 3 }}
            >
              Aceito
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleClose(false)}
              sx={{ mt: 3 }}
            >
              Não Aceito
            </Button>
          </Grid>
        </Box>
      </Modal>
    </Grid>
  );
};

TermsOfUseModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default TermsOfUseModal;
