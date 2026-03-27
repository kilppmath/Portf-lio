// hooks/useData.js
import { useState, useEffect, useCallback } from "react";
import axios from "axios";

// URL base da API (Vercel e Render)
const API_URL = import.meta.env.VITE_API_URL || "https://portf-lio-ue9u.onrender.com";

const api = axios.create({
  baseURL: API_URL,
  timeout: 8000,
});

// -------------------- Serviços --------------------
export const getMarketData = () => api.get("/api/market").then((r) => r.data);
export const getHistoricalData = (id) => api.get(`/api/market/history/${id}`).then((r) => r.data);
export const getInsights = () => api.get("/api/insights").then((r) => r.data);
export const sendChat = (message) => api.post("/api/chat", { message }).then((r) => r.data);

// -------------------- Hook: Market --------------------
export function useMarket(interval = 60000) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetch = useCallback(async () => {
    try {
      const result = await getMarketData();
      setData(result);
      setError(null);
    } catch (e) {
      setError("Falha ao carregar dados de mercado.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch();
    const timer = setInterval(fetch, interval);
    return () => clearInterval(timer);
  }, [fetch, interval]);

  return { data, loading, error, refetch: fetch };
}

// -------------------- Hook: Histórico --------------------
export function useHistory(assetId) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!assetId) return;
    setLoading(true);
    getHistoricalData(assetId)
      .then(setData)
      .finally(() => setLoading(false));
  }, [assetId]);

  return { data, loading };
}

// -------------------- Hook: Insights --------------------
export function useInsights() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getInsights()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
}

// -------------------- Hook: Chatbot --------------------
export function useChat() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Olá. Sou seu mentor de carreira e mentalidade. Pergunte sobre decisões, carreira, análise de dados ou desenvolvimento profissional.",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [loading, setLoading] = useState(false);

  const send = useCallback(async (text) => {
    if (!text.trim() || loading) return;

    const userMsg = { role: "user", text, timestamp: new Date().toISOString() };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const result = await sendChat(text);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: result.response, timestamp: result.timestamp },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "Não consegui processar. Tente novamente.", timestamp: new Date().toISOString() },
      ]);
    } finally {
      setLoading(false);
    }
  }, [loading]);

  return { messages, send, loading };
}

export default api;