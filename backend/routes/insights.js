const express = require("express");
const router = express.Router();
const { getInsights } = require("../services/insightsService");

router.get("/", (req, res) => {
  try {
    res.json(getInsights());
  } catch (err) {
    res.status(500).json({ error: "Erro ao gerar insights", detail: err.message });
  }
});

module.exports = router;
