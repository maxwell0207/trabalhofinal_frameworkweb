import React, { useState, useEffect, useContext } from "react"; // Importa useContext
import axios from "axios";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Button, // Importa o componente Button do MUI
} from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { AuthContext } from "../AuthContext"; // Importa o AuthContext

function Crypto() {
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cryptoData, setCryptoData] = useState([]);

  const { logout } = useContext(AuthContext); // Usa o contexto de autenticação para acessar a função logout

  useEffect(() => {
    // API para pegar os dados das criptomoedas
    axios
      .get("https://api.coingecko.com/api/v3/coins/markets", {
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: 10,
          page: 1,
        },
      })
      .then((response) => {
        setCryptos(response.data);
        // Monta os dados para o gráfico com base no preço atual
        const formattedData = response.data.map((crypto) => ({
          name: crypto.name,
          price: crypto.current_price,
        }));
        setCryptoData(formattedData);
        setLoading(false);
      });
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Top 10 Criptomoedas
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <div>
          <List>
            {cryptos.map((crypto) => (
              <ListItem key={crypto.id}>
                <ListItemText
                  primary={`${crypto.name} - $${crypto.current_price}`}
                  secondary={`Market Cap: $${crypto.market_cap}`}
                />
              </ListItem>
            ))}
          </List>
          {/* Adicionando o gráfico de linha */}
          <Typography variant="h5" gutterBottom>
            Variação de Preço das Criptomoedas
          </Typography>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={cryptoData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </Container>
  );
}

export default Crypto;
