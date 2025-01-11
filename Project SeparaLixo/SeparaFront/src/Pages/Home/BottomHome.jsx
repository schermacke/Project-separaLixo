import { Box, Button, Container, Divider, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TelegramIcon from "@mui/icons-material/Telegram";
import EmailIcon from "@mui/icons-material/Email";

function BottomHome() {
  return (
    <Container>
      <Box id="services" sx={{ py: 25 }}>
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
              O objetivo principal deste website é oferecer uma plataforma
              simples e eficiente para facilitar o descarte correto de resíduos,
              promovendo a sustentabilidade e o cuidado com o meio ambiente.
              Nossa missão é conscientizar e conectar cidadãos com pontos de
              coleta seletiva, oferecendo informações claras sobre como separar
              e descartar cada tipo de lixo de forma adequada, contribuindo para
              um futuro mais sustentável. Este site foi criado com a visão de
              simplificar o processo de descarte consciente, tornando mais
              acessível a busca por informações e locais apropriados para cada
              tipo de resíduo, como recicláveis, orgânicos e perigosos.
            </Typography>
            <br />
            <Typography align="center">
              Aqui, os usuários podem facilmente localizar os pontos de coleta
              mais próximos, obter orientações detalhadas sobre separação de
              materiais e entender a importância de suas ações para a
              preservação ambiental. No futuro, planejamos expandir as
              funcionalidades do site, incluindo ferramentas interativas, como
              notificações personalizadas para dias de coleta em diferentes
              regiões e um sistema de recompensa para incentivar o descarte
              correto.
            </Typography>
            <br />
            <Typography>
              Caso o projeto ganhe relevância, também estudamos a possibilidade
              de oferecer uma versão premium com recursos adicionais, como
              relatórios detalhados de impacto ambiental e suporte
              especializado. Nosso compromisso é ajudar cada pessoa a fazer sua
              parte para construir um mundo mais limpo e sustentável.
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
            Tem dúvidas, sugestões ou ideias que possam melhorar o nosso site?
            Estamos sempre abertos para ouvir você! Queremos construir uma
            experiência cada vez mais útil e funcional para todos os usuários.
            Se você tem sugestões de melhorias, encontrou algum problema, ou
            deseja ver alguma funcionalidade nova implementada, não hesite em
            nos enviar uma mensagem. Sua opinião é muito importante para nós!
          </Typography>
          <Typography textAlign="center" paddingTop={5}>
            Além disso, se você está planejando criar o seu próprio site, seja
            para um projeto pessoal ou profissional, conte conosco! Oferecemos
            soluções personalizadas para atender às suas necessidades, desde o
            design até o desenvolvimento completo, utilizando tecnologias
            modernas e eficientes.
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
      <Grid
        item
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Typography
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <EmailIcon style={{ marginRight: "5px" }} />
          recuperacaoseparalixo@gmail.com
        </Typography>
      </Grid>
      <Typography style={{ height: 0 }} variant="body1" color="textSecondary">
        © {new Date().getFullYear()} Eduardo Schermack. Todos os direitos
        reservados.
      </Typography>
    </Container>
  );
}

export default BottomHome;
