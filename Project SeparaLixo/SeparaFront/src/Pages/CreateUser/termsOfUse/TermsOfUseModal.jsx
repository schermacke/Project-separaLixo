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
              xs: "90%", // 90% da largura da tela em dispositivos móveis
              sm: "80%", // 80% da largura da tela em dispositivos pequenos
              md: 1000, // 1000px em telas médias e maiores
            },
            height: {
              xs: "80%", // 80% da altura da tela em dispositivos móveis
              sm: "70%", // 70% da altura da tela em dispositivos pequenos
              md: 600, // 600px em telas médias e maiores
            },
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            overflowY: "auto",
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            Termo de Uso do Site!
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            Aceitação dos Termos Ao acessar e utilizar nosso site dedicado à
            reciclagem e descarte correto de lixo, você concorda em cumprir e
            estar vinculado a estes Termos de Uso. Se você não concordar com
            estes termos, não deverá utilizar nosso site. Objetivo do Site Nosso
            site tem como objetivo fornecer informações e serviços para o
            descarte correto de resíduos e promover práticas de reciclagem.
            Oferecemos orientações sobre como separar, armazenar e destinar de
            forma adequada diversos tipos de lixo, com foco na preservação
            ambiental e sustentabilidade. Cadastro e Uso das Informações 3.1. Ao
            se cadastrar ou utilizar nossos serviços, você concorda em fornecer
            informações verdadeiras, completas e atualizadas. É sua
            responsabilidade manter a precisão dessas informações. 3.2. Você
            compromete-se a utilizar as informações e serviços disponíveis no
            site exclusivamente para fins relacionados à reciclagem e descarte
            adequado de lixo, respeitando as normas ambientais e as legislações
            locais. Responsabilidade do Usuário Você reconhece e concorda que a
            utilização das informações e orientações fornecidas no site é de sua
            exclusiva responsabilidade. O site ou seu desenvolvedor não se
            responsabiliza por quaisquer incidentes, danos ou problemas que
            possam ocorrer como resultado do uso inadequado das informações ou
            da falha no descarte correto dos resíduos. Isenção de
            Responsabilidade O site não se responsabiliza por quaisquer danos ou
            consequências decorrentes do descarte incorreto de lixo ou da não
            conformidade com as orientações fornecidas. O uso do serviço é feito
            por sua conta e risco, e é sua responsabilidade garantir que o
            descarte de resíduos siga as normas ambientais e regulamentos
            locais. Modificações nos Termos Reservamo-nos o direito de modificar
            estes Termos de Uso a qualquer momento. As alterações serão
            publicadas nesta página e entrarão em vigor assim que forem
            publicadas. É sua responsabilidade revisar periodicamente os Termos
            de Uso para estar ciente de quaisquer mudanças. Lei Aplicável Este
            Termo de Uso será regido e interpretado de acordo com as leis do
            Brasil, e qualquer disputa será resolvida no foro competente do
            local de residência do usuário. Contato Se você tiver qualquer
            dúvida ou preocupação sobre estes Termos de Uso, entre em contato
            conosco por meio do e-mail: [separalixosustentavel@gmail.com].
          </Typography>
          <Grid
            item
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            gap={2}
          >
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
