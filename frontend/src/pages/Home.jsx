import { useState } from "react";
import MarketStrip from "../components/MarketTicker";
import ChatBot from "../components/ChatBot";
import PriceChart from "../components/PriceChart";
import InsightsPanel from "../components/InsightsPanel";
import { Link } from "react-router-dom";


// ─── Projetos em destaque ──────────────────────────────────────────────
const FEATURED = [
  {
    id: "b3-dashboard",
    title: "Dashboard B3",
    category: "Análise Financeira",
    desc: "Painel interativo de ativos com métricas de risco, retorno e correlação.",
    stack: ["React", "Recharts", "Node.js"],
    status: "live",
  },
  {
    id: "ml-vol",
    title: "Volatilidade com ML",
    category: "Machine Learning",
    desc: "Previsão de volatilidade com modelos GARCH e features de momentum.",
    stack: ["Python", "scikit-learn", "statsmodels"],
    status: "em breve",
  },
  {
    id: "markowitz",
    title: "Portfólio Eficiente",
    category: "Finanças Quant.",
    desc: "Fronteira eficiente de Markowitz com otimização de Sharpe.",
    stack: ["Python", "NumPy", "scipy"],
    status: "em breve",
  },
];

function FeaturedCard({ p }) {
  return (
    <div className="card card-glow p-5 flex flex-col gap-4 group">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="label mb-1.5">{p.category}</p>
          <h3 className="font-display text-lg font-medium text-content-hi group-hover:text-blue transition-colors">
            {p.title}
          </h3>
        </div>
        <span
          className={`pill shrink-0 mt-0.5 ${
            p.status === "live" ? "text-bull border-bull/20" : ""
          }`}
        >
          {p.status}
        </span>
      </div>

      <p className="text-sm text-content-md leading-relaxed flex-1">
        {p.desc}
      </p>

      <div className="flex items-center justify-between pt-3 border-t border-surface-border">
        <div className="flex gap-1.5 flex-wrap">
          {p.stack?.map((t) => (
            <span key={t} className="pill">
              {t}
            </span>
          ))}
        </div>
        <Link
          to="/projetos"
          className="text-xs text-blue hover:underline font-mono shrink-0"
        >
          ver →
        </Link>
      </div>
    </div>
  );
}

export default function Home() {
  const [selectedAsset, setSelectedAsset] = useState("ibovespa");
  const [assetData, setAssetData] = useState(null);

  return (
    <>
      <div className="pt-13">
        <MarketStrip />
      </div>

      <main className="max-w-6xl mx-auto px-6 py-16 space-y-20">

        {/* ── HERO ── */}
        <section className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10 items-start">
          <div className="space-y-7 animate-in-up">
            <div className="space-y-4">
              <p className="label">Financial Analysis Portfolio</p>

              <h1 className="font-display text-5xl lg:text-6xl font-semibold text-content-hi leading-[1.08] tracking-tight">
                Matheus Kilpp<br />
                <span className="text-blue">Financial & Data Analysis</span>
              </h1>

              <p className="text-content-md text-lg leading-relaxed max-w-md font-body">
                Analiso o mercado financeiro com base em dados, risco e comportamento.
              </p>
            </div>

            <div className="flex gap-3 flex-wrap">
              <Link
                to="/projetos"
                className="px-5 py-2.5 bg-blue hover:bg-blue-dim text-white text-sm font-medium rounded-xl transition-all"
              >
                Ver Projetos
              </Link>
              <Link
                to="/trade"
                className="px-5 py-2.5 bg-surface-2 border border-surface-border hover:border-surface-border-hi text-content-md hover:text-content-hi text-sm font-medium rounded-xl transition-all"
              >
                Trade Reports
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-2">
              {[
                { n: "30+", l: "dias de dados" },
                { n: "5", l: "ativos monitorados" },
                { n: "3+", l: "projetos" },
              ].map(({ n, l }) => (
                <div key={l} className="card p-4 text-center">
                  <p className="font-display text-2xl font-semibold text-blue">
                    {n}
                  </p>
                  <p className="text-2xs text-content-lo font-mono mt-1">
                    {l}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="animate-in-up">
            <ChatBot />
          </div>
        </section>

        {/* ── CHART + INSIGHTS ── */}
        <section className="space-y-4">
          <div className="flex items-baseline justify-between">
            <div>
              <p className="label mb-1">Análise de Mercado</p>
              <h2 className="font-display text-2xl font-semibold text-content-hi">
                Preços & Insights
              </h2>
            </div>
            <span className="font-mono text-2xs text-content-lo">
              últimos 30 dias
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-4">

            {/* LEFT: CHART + MÉTRICAS */}
            <div className="flex flex-col gap-3">
              <PriceChart
                selected={selectedAsset}
                onChange={setSelectedAsset}
                onData={setAssetData}
              />

              {/* MINI MÉTRICAS */}
              <div className="grid grid-cols-3 gap-3">
                <div className="card p-3">
                  <p className="label">Volatilidade</p>
                  <p className="text-sm text-content-hi">
                    {assetData?.volatility || "Moderada"}
                  </p>
                </div>

                <div className="card p-3">
                  <p className="label">Tendência</p>
                  <p
                    className={`text-sm ${
                      assetData?.sentiment === "bullish" ? "text-bull" : "text-bear"
                    }`}
                  >
                    {assetData?.trend || "Neutra"}
                  </p>
                </div>

                <div className="card p-3">
                  <p className="label">Sentimento</p>
                  <p className="text-sm text-content-hi">
                    {assetData?.sentiment || "Neutro"}
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT: INSIGHTS */}
            <InsightsPanel 
              selectedAsset={selectedAsset} 
              onAssetData={setAssetData} 
            />
          </div>
        </section>

        {/* ── PROJETOS ── */}
        <section className="space-y-5">
          <div className="flex items-baseline justify-between">
            <div>
              <p className="label mb-1">Portfólio</p>
              <h2 className="font-display text-2xl font-semibold text-content-hi">
                Projetos em Destaque
              </h2>
            </div>
            <Link
              to="/projetos"
              className="font-mono text-xs text-blue hover:underline"
            >
              ver todos →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 stagger">
            {FEATURED.map((p) => (
              <FeaturedCard key={p.id} p={p} />
            ))}
          </div>
        </section>

      </main>
    </>
  );
}