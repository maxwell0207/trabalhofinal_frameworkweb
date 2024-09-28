import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Container, Typography, Box } from "@mui/material";
import axios from "axios";
import { AuthContext } from "../AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        "https://66f1e5de4153791915527e26.mockapi.io/users",
        {
          params: {
            email: email,
            password: password,
          },
        }
      );

      const user = response.data.find(
        (user) => user.email === email && user.password === password
      );

      if (user) {
        login(); // Marca o usuário como autenticado
        navigate("/crypto"); // Redireciona para a página Crypto
      } else {
        setMessage("Credenciais inválidas!");
      }
    } catch (error) {
      setMessage("Erro ao conectar com o servidor.");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          mt: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Login
        </Button>
        {message && <Typography color="error">{message}</Typography>}
      </Box>
    </Container>
  );
}

export default Login;
