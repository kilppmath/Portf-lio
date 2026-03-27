const { getMarketData } = require("./marketService");

/**
 * InsightsService
 * Gera insights automáticos com base nas variações de mercado.
 * MVP com regras simples — preparado para integração com ML/LLM no futuro.
 */

function generateInsight(asset) {
  const { name, change, type } = asset;
  const abs = Math.abs(change);

  // Intensidade da variação
  const intensity = abs > 2 ? "forte" : abs > 0.8 ? "moderado" : "leve";

  if (change > 0) {
    const messages = [
      `${name} apresenta movimento de alta ${intensity}, refletindo apetite por risco.`,
      `Pressão compradora sustenta ${name} em campo positivo com variação de +${abs.toFixed(2)}%.`,
      `${name} sobe ${abs.toFixed(2)}% — fluxo de entrada indica confiança dos agentes.`,
    ];
    return messages[Math.floor(Math.abs(Math.sin(change * 100)) * messages.length)];
  } else {
    const messages = [
      `${name} registra movimento de correção ${intensity}, com variação de -${abs.toFixed(2)}%.`,
      `Pressão vendedora leva ${name} ao campo negativo — realização de lucros ou aversão a risco.`,
      `${name} recua ${abs.toFixed(2)}% — agentes aguardam sinais mais claros antes de nova entrada.`,
    ];
    return messages[Math.floor(Math.abs(Math.sin(change * 100)) * messages.length)];
  }
}

function getInsights() {
  const { assets, timestamp } = getMarketData();

  const insights = assets.map((asset) => ({
    assetId: asset.id,
    assetName: asset.name,
    change: asset.change,
    insight: generateInsight(asset),
    sentiment: asset.change > 0 ? "bullish" : "bearish",
  }));

  // Insight geral de mercado
  const bullishCount = insights.filter((i) => i.sentiment === "bullish").length;
  const overallSentiment = bullishCount >= 3 ? "bullish" : "bearish";
  const generalInsight =
    overallSentiment === "bullish"
      ? `Maioria dos ativos em alta — ambiente de risco indica viés comprador no curto prazo.`
      : `Mercado com viés vendedor — cautela domina e agentes reduzem exposição a risco.`;

  return {
    timestamp,
    overall: { sentiment: overallSentiment, insight: generalInsight },
    assets: insights,
  };
}

module.exports = { getInsights };
