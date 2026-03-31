/**
 * MarketService
 * Retorna dados de mercado simulados com variação realista.
 * Pronto para integração com APIs reais (Alpha Vantage, Yahoo Finance, Brapi, etc.)
 */

// Simula variação de preço com base em seed temporal (muda a cada minuto)
function mockVariation(base, volatility = 0.015) {
  const seed = Math.floor(Date.now() / 60000); // muda a cada 1 min
  const pseudo = Math.sin(seed * base) * 0.5 + 0.5; // 0 a 1
  const change = (pseudo - 0.5) * 2 * volatility;
  return parseFloat((base * (1 + change)).toFixed(2));
}

function getMarketData() {
  const ibov = mockVariation(126000, 0.012);
  const usd = mockVariation(4.97, 0.008);
  const btc = mockVariation(312000, 0.025);
  const petr4 = mockVariation(38.5, 0.018);
  const vale3 = mockVariation(62.8, 0.02);

  return {
    timestamp: new Date().toISOString(),
    assets: [
      {
        id: "ibovespa",
        name: "IBOVESPA",
        value: ibov,
        currency: "BRL",
        change: parseFloat(((ibov / 126000 - 1) * 100).toFixed(2)),
        type: "index",
      },
      {
        id: "usdbrl",
        name: "USD/BRL",
        value: usd,
        currency: "BRL",
        change: parseFloat(((usd / 4.97 - 1) * 100).toFixed(2)),
        type: "forex",
      },
      {
        id: "bitcoin",
        name: "Bitcoin",
        value: btc,
        currency: "BRL",
        change: parseFloat(((btc / 312000 - 1) * 100).toFixed(2)),
        type: "crypto",
      },
      {
        id: "petr4",
        name: "PETR4",
        value: petr4,
        currency: "BRL",
        change: parseFloat(((petr4 / 38.5 - 1) * 100).toFixed(2)),
        type: "stock",
      },
      {
        id: "vale3",
        name: "VALE3",
        value: vale3,
        currency: "BRL",
        change: parseFloat(((vale3 / 62.8 - 1) * 100).toFixed(2)),
        type: "stock",
      },
    ],
  };
}

// Gera histórico simulado dos últimos 30 dias
function getHistoricalData(assetId) {
  const bases = {
    ibovespa: 126000,
    usdbrl: 4.97,
    bitcoin: 312000,
    petr4: 38.5,
    vale3: 62.8,
  };

  const base = bases[assetId] || 100;
  const points = [];
  const now = Date.now();

  for (let i = 29; i >= 0; i--) {
    const date = new Date(now - i * 24 * 60 * 60 * 1000);
    const noise = (Math.sin(i * 2.3 + base * 0.01) * 0.5 + 0.5 - 0.5) * 0.06;
    const value = parseFloat((base * (1 + noise)).toFixed(2));
    points.push({
      date: date.toISOString().split("T")[0],
      value,
    });
  }

  return { assetId, data: points };
}

module.exports = { getMarketData, getHistoricalData };