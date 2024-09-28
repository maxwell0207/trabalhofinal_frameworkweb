import React from "react";
import { Container, Typography, Box } from "@mui/material";

function Home() {
  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 18, textAlign: "center" }}>
        <Typography variant="h3" gutterBottom>
          Bem-vindo ao Dashboard de Criptomoedas!
        </Typography>
        <Typography variant="h6" color="textSecondary" paragraph>
          Este é um aplicativo desenvolvido em React para exibir informações
          sobre criptomoedas. Explore as diferentes funcionalidades e acompanhe
          os preços em tempo real.
        </Typography>
        <Typography variant="body1" paragraph>
          Navegue pelo aplicativo para ver as cotações das 10 principais
          criptomoedas e gerenciar sua conta.
        </Typography>
      </Box>
    </Container>
  );
}

export default Home;
