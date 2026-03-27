import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL; // Sem "/api" aqui

const api = axios.create({
  baseURL: API_URL, // BaseURL direto, sem duplicar /api
  timeout: 8000,
});

export const getMarketData = () =>
  api.get("/api/market").then((r) => {
    const data = r.data;

    return {
      ...data,
      assets: data.ativos?.map((a) => ({
        id: a.id,
        name: a.nome,
        value: a.valor,
        change: a.variação ?? a.alteração ?? a.troco ?? 0,
        type: a.tipo,
      })),
    };
  });

export const getHistoricalData = (id) =>
  api.get(`/api/market/history/${id}`).then((r) => r.data);

export const getInsights = () =>
  api.get("/api/insights").then((r) => r.data);

export const sendChat = (message) =>
  api.post("/api/chat", { message }).then((r) => r.data);

export default api;