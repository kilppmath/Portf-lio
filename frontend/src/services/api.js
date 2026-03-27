import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: `${API_URL}/api`,
  timeout: 8000,
});

export const getMarketData = () =>
  api.get("/market").then((r) => {
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
  api.get(`/market/history/${id}`).then((r) => r.data);

export const getInsights = () =>
  api.get("/insights").then((r) => r.data);

export const sendChat = (message) =>
  api.post("/chat", { message }).then((r) => r.data);

export default api;