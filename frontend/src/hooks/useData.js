import { useState, useEffect, useCallback } from "react";
import { getMarketData, getHistoricalData, getInsights, sendChat } from "../services/api";

// Hook para dados de mercado
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

// Hook para histórico de preços
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

// Hook para insights
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

// Hook para o chatbot mentor
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