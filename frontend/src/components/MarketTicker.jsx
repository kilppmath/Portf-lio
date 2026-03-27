import { useMarket } from "../hooks/useData";

function formatValue(asset) {
  if (asset.id === "bitcoin" || asset.id === "ibovespa") {
    return asset.value.toLocaleString("pt-BR", { maximumFractionDigits: 0 });
  }
  return asset.value.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function AssetCard({ asset }) {
  const isUp = asset.change >= 0;
  return (
    <div className="card p-4 flex flex-col gap-1 min-w-[140px] glow-blue">
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono text-text-muted uppercase tracking-wider">{asset.name || asset.nome}</span>
        <span className={`text-xs font-mono px-1.5 py-0.5 rounded ${isUp ? "bg-bull/10 text-bull" : "bg-bear/10 text-bear"}`}>
          {isUp ? "+" : ""}{asset?.change?.toFixed(2) ?? asset?.alteracao?.toFixed(2) ?? "0.00"}%
        </span>
      </div>
      <div className="font-mono text-xl text-text-primary font-medium">
        {asset.id === "usdbrl" ? "R$ " : asset.id === "bitcoin" || asset.id === "ibovespa" ? "" : "R$ "}
        {asset?.value !== undefined
          ? formatValue(asset)
          : asset?.valor !== undefined
          ? asset.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
          : "0,00"}
      </div>
      <div className="text-xs text-text-muted">
        {asset.type === "index" || asset.tipo === "índice"
          ? "Índice"
          : asset.type === "forex" || asset.tipo === "Câmbio"
          ? "Câmbio"
          : asset.type === "crypto" || asset.tipo === "Cripto"
          ? "Cripto"
          : "Ação"}
      </div>
    </div>
  );
}

export default function MarketTicker() {
  const { data, loading, error } = useMarket();

  if (loading) {
    return (
      <div className="flex gap-3 overflow-x-auto pb-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="card p-4 min-w-[140px] h-[88px] animate-pulse bg-bg-card" />
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-text-muted text-sm font-mono">{error}</div>;
  }

  // fallback para garantir compatibilidade com backend
  const assets = data?.assets || data?.ativos || [];

  return (
    <div className="flex gap-3 overflow-x-auto pb-2 animate-stagger">
      {assets.map((asset) => (
        <AssetCard key={asset.id || asset.nome} asset={asset} />
      ))}
    </div>
  );
}