// 📊 Classificação de volatilidade
export function getVolatility(change) {
  const abs = Math.abs(change);

  if (abs > 2) return "Alta";
  if (abs > 1) return "Moderada";
  return "Baixa";
}

// 📈 Tendência
export function getTrend(change) {
  if (change > 0) return "Alta";
  if (change < 0) return "Baixa";
  return "Lateral";
}

// 🧠 Sentimento
export function getSentiment(change) {
  if (change > 1) return "Bullish";
  if (change < -1) return "Bearish";
  return "Neutro";
}

// 🧾 Geração de insight automático
export function generateInsight(name, change) {
  const abs = Math.abs(change);

  if (change > 1.5) {
    return `${name} apresenta forte movimento de alta, indicando pressão compradora consistente.`;
  }

  if (change < -1.5) {
    return `${name} registra queda relevante, com predominância de fluxo vendedor no curto prazo.`;
  }

  if (abs <= 0.2) {
    return `${name} opera de forma lateral, aguardando novos catalisadores de mercado.`;
  }

  return `${name} apresenta variação moderada dentro de um cenário de ajuste de preços.`;
}

export function generateOverallInsight(data) {
  const avg = data.reduce((acc, item) => acc + item.change, 0) / data.length;

  if (avg > 0.5) {
    return "Mercado com viés comprador — apetite por risco em destaque.";
  }

  if (avg < -0.5) {
    return "Mercado com viés vendedor — cautela domina e redução de exposição.";
  }

  return "Mercado sem direção clara, com comportamento lateral.";
}

// ✅ Compatibilidade para PriceChart.jsx
export function analyzeMarket(data) {
  return data.map((item) => ({
    ...item,
    insight: generateInsight(item.name, item.change),
    volatility: getVolatility(item.change),
    trend: getTrend(item.change),
    sentiment: getSentiment(item.change),
  }));
}