import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const BLING_TOKEN = process.env.BLING_TOKEN;

// 🔹 buscar produtos
app.get("/produtos", async (req, res) => {
  try {
    const response = await fetch(
      "https://api.bling.com.br/Api/v3/produtos",
      {
        headers: {
          Authorization: `Bearer ${BLING_TOKEN}`
        }
      }
    );

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao buscar produtos" });
  }
});

// 🔹 criar pedido
app.post("/pedido", async (req, res) => {
  try {
    const response = await fetch(
      "https://api.bling.com.br/Api/v3/pedidos/vendas",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${BLING_TOKEN}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(req.body)
      }
    );

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao criar pedido" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("API rodando");
});