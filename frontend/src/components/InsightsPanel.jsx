import { getVolatility, generateInsight, generateOverallInsight } from "../utils/marketAnalysis";

export default function InsightsPanel() {
  const DATA = [
    {
      name: "IBOVESPA",
      change: -0.05,
      text: "Mercado segue sem direção clara, com leve pressão vendedora.",
    },
    {
      name: "USD/BRL",
      change: 0.0,
      text: "Câmbio lateral aguardando novos dados macroeconômicos.",
    },
    {
      name: "Bitcoin",
      change: -2.41,
      text: "Alta volatilidade mantém comportamento especulativo.",
    },
    {
      name: "PETR4",
      change: -1.32,
      text: "Correção após movimento anterior, possível realização.",
    },
    {
      name: "VALE3",
      change: -1.74,
      text: "Pressão vendedora influenciada pelo cenário externo.",
    },
  ];
  const overall = generateOverallInsight(DATA);

  return (
    <div className="space-y-3">

      {/* VISÃO GERAL */}
      <div className="card p-5 border border-red-500/40">
        <p className="label mb-2">Visão Geral</p>
        <p className="text-sm text-content-md leading-relaxed">
          {overall}
        </p>
      </div>

      {/* INSIGHTS GERAIS */}
      {DATA.map((item) => {
        const volatility = getVolatility(item.change);
        const isUp = item.change >= 0;

        return (
          <div key={item.name} className="card p-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-mono text-content-lo">
                {item.name}
              </span>
              <span className={`text-xs font-mono ${isUp ? "text-bull" : "text-bear"}`}>
                {isUp ? "+" : ""}
                {item.change.toFixed(2)}%
              </span>
            </div>

            <p className="text-sm text-content-md">
  {generateInsight(item.name, item.change)} • Volatilidade: {volatility}
</p>
          </div>
        );
      })}
    </div>
  );
}