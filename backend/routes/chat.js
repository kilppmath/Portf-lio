const express = require("express");
const router = express.Router();
const { getMentorResponse } = require("../services/chatService");

router.post("/", (req, res) => {
  try {
    const { message } = req.body;
    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Campo 'message' obrigatório." });
    }
    const result = getMentorResponse(message.trim());
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Erro no chat", detail: err.message });
  }
});

module.exports = router;
