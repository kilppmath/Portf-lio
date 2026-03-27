import axios from "axios";

// Pega a URL do backend definida no Vercel ou .env local
const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL, // não adiciona /api aqui
  timeout: 8000,
});

// Pega dados do mercado e transforma os campos para o formato do frontend
export const getMarketData = () =>
  api.get("/api/market").then((r) => {
    const data = r.data;

    return {
      ...data,
      assets: data.ativos?.map((a) => ({
        id: a.id,
        name: a.nome,
        value: a.valor ?? 0,
        change: a.variação ?? a.alteração ?? a.troco ?? 0,
        type: a.tipo ?? "Ação",
      })) ?? [],
    };
  });

// Pega histórico de preços de um ativo específico
export const getHistoricalData = (id) =>
  api.get(`/api/market/history/${id}`).then((r) => r.data);

// Pega insights automáticos
export const getInsights = () =>
  api.get("/api/insights").then((r) => r.data);

// Envia mensagem para o chatbot mentor
export const sendChat = (message) =>
  api.post("/api/chat", { message }).then((r) => r.data);

export default api;