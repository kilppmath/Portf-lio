import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: `${API_URL}/api`,
  timeout: 8000,
});

export const getMarketData = () => api.get("/market").then((r) => r.data);
export const getHistoricalData = (id) => api.get(`/market/history/${id}`).then((r) => r.data);
export const getInsights = () => api.get("/insights").then((r) => r.data);
export const sendChat = (message) => api.post("/chat", { message }).then((r) => r.data);

export default api;