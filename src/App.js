import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { AppBar, Toolbar, Button, Box, Container } from "@mui/material";
import { AuthProvider, AuthContext } from "./AuthContext";
import Home from "./pages/Home";
import Crypto from "./pages/Crypto";
import Login from "./pages/Login";
import Register from "./pages/Register"; // Importa o componente Register

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppBar position="static">
          <Toolbar>
            {/* O Box organiza os botões de navegação */}
            <Container sx={{ display: "flex", justifyContent: "center" }}>
              {" "}
              {/* Adiciona um Container para centralizar os botões */}
              <Box sx={{ display: "flex", gap: 7 }}>
                {" "}
                {/* gap: espaçamento entre os botões */}
                <Button component={Link} to="/" color="inherit" sx={{ mx: 1 }}>
                  Home
                </Button>
                <Button
                  component={Link}
                  to="/crypto"
                  color="inherit"
                  sx={{ mx: 1 }}
                >
                  Crypto
                </Button>
                <Button
                  component={Link}
                  to="/login"
                  color="inherit"
                  sx={{ mx: 1 }}
                >
                  Login
                </Button>
                <Button
                  component={Link}
                  to="/register"
                  color="inherit"
                  sx={{ mx: 1 }}
                >
                  Register
                </Button>
              </Box>
            </Container>
            <LogoutButton />
          </Toolbar>
        </AppBar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/crypto"
            element={
              <PrivateRoute>
                <Crypto />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

// Componente para proteger rotas privadas
function PrivateRoute({ children }) {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? children : <Login />;
}

// Componente de Logout
function LogoutButton() {
  const { isAuthenticated, logout } = useContext(AuthContext);
  return (
    isAuthenticated && (
      <Button color="inherit" onClick={logout}>
        Logout
      </Button>
    )
  );
}

export default App;
