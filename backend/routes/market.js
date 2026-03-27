const express = require("express");
const router = express.Router();
const { getMarketData, getHistoricalData } = require("../services/marketService");

// GET /api/market — dados atuais
router.get("/", (req, res) => {
  try {
    const data = getMarketData();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar dados de mercado", detail: err.message });
  }
});

// GET /api/market/history/:id — histórico de 30 dias
router.get("/history/:id", (req, res) => {
  try {
    const data = getHistoricalData(req.params.id);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar histórico", detail: err.message });
  }
});

module.exports = router;
