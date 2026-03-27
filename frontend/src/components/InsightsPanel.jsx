import { useInsights } from "../hooks/useData";

function InsightCard({ item }) {
  const isUp = item.sentiment === "bullish";
  return (
    <div className="card p-4 flex gap-3 items-start">
      {/* Indicador */}
      <div className={`mt-0.5 w-2 h-2 rounded-full flex-shrink-0 ${isUp ? "bg-bull" : "bg-bear"}`} />
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-mono text-text-muted">{item.assetName}</span>
          <span className={`text-xs font-mono ${isUp ? "text-bull" : "text-bear"}`}>
            {isUp ? "+" : ""}{item?.change?.toFixed(2) ?? "0.00"}%
          </span>
        </div>
        <p className="text-sm text-text-secondary leading-relaxed">{item.insight}</p>
      </div>
    </div>
  );
}

export default function InsightsPanel() {
  const { data, loading } = useInsights();

  return (
    <div>
      <h3 className="section-title">Insights Automáticos</h3>
      <p className="section-sub">Análise baseada em variação de mercado</p>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="card p-4 h-16 animate-pulse" />
          ))}
        </div>
      ) : (
        <>
          {/* Insight geral */}
          {data?.overall && (
            <div
              className={`card p-4 mb-4 border-l-2 ${
                data.overall.sentiment === "bullish" ? "border-bull" : "border-bear"
              }`}
            >
              <span className="text-xs font-mono text-text-muted mb-1 block">VISÃO GERAL</span>
              <p className="text-sm text-text-primary">{data.overall.insight}</p>
            </div>
          )}

          {/* Por ativo */}
          <div className="space-y-2 animate-stagger">
            {data?.assets?.map((item) => (
              <InsightCard key={item.assetId} item={item} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}