require("dotenv").config();
const express = require("express");
const cors = require("cors");

const marketRoutes = require("./routes/market");
const insightsRoutes = require("./routes/insights");
const chatRoutes = require("./routes/chat");

const app = express();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Servidor rodando");
});

// Middlewares
app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:5173" }));
app.use(express.json());

// Routes
app.use("/api/market", marketRoutes);
app.use("/api/insights", insightsRoutes);
app.use("/api/chat", chatRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});


