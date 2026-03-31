const express = require("express");
const router = express.Router();
const { getMarketData, getHistoricalData } = require("../services/marketService");

router.get("/", (req, res) => {
  try {
    const data = getMarketData();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar dados de mercado", detail: err.message });
  }
});

router.get("/history/:id", (req, res) => {
  try {
    const data = getHistoricalData(req.params.id);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar histórico", detail: err.message });
  }
});

module.exports = router;