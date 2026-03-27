import MarketTicker from "../components/MarketTicker";
import ChatBot from "../components/ChatBot";
import PriceChart from "../components/PriceChart";
import InsightsPanel from "../components/InsightsPanel";
import ProjectCard from "../components/ProjectCard";

// Dados mock dos projetos em destaque
const FEATURED_PROJECTS = [
  {
    id: 1,
    title: "Dashboard B3 — Análise de Ativos",
    category: "Análise Financeira",
    description: "Painel interativo para acompanhamento de ações da B3 com métricas de risco, retorno e correlação entre ativos.",
    stack: ["React", "Recharts", "Node.js", "Alpha Vantage"],
    dataSource: "API Brapi / B3",
    status: "live",
  },
  {
    id: 2,
    title: "Previsão de Volatilidade com ML",
    category: "Machine Learning",
    description: "Modelo preditivo de volatilidade de ativos usando regressão e séries temporais. Análise de dados com Python e R.",
    stack: ["Python", "R", "scikit-learn", "statsmodels"],
    dataSource: "Yahoo Finance",
    status: "em breve",
  },
  {
    id: 3,
    title: "Análise de Portfólio Eficiente",
    category: "Finanças Quantitativas",
    description: "Implementação da fronteira eficiente de Markowitz para otimização de portfólio com dados históricos reais.",
    stack: ["Python", "NumPy", "Plotly", "scipy"],
    dataSource: "Dados históricos B3",
    status: "em breve",
  },
];

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto px-6 pt-24 pb-16 space-y-16">

      {/* ─── SEÇÃO 1: Apresentação + Chat ─── */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Lado esquerdo — Apresentação */}
        <div className="space-y-6 animate-fade-up">
          <div>
            <p className="text-xs font-mono text-accent-blue uppercase tracking-widest mb-3">
              Portfólio & Análise Financeira
            </p>
            <h1 className="font-display text-5xl lg:text-6xl text-text-primary leading-tight mb-4">
              Matheus Kilpp Nogueira<span className="text-accent-blue">.</span>
            </h1>
            <p className="text-text-secondary text-lg leading-relaxed max-w-md">
              Desenvolvedor e analista de dados com foco em finanças quantitativas,
              visualização de dados e produtos orientados a métricas.
            </p>
          </div>

          {/* Tags de habilidades */}
          <div className="flex flex-wrap gap-2">
            {["React", "Node.js", "Python", "R", "Análise de Dados", "Finanças Quant."].map((skill) => (
              <span key={skill} className="tag">{skill}</span>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 pt-4">
            {[
              { value: "3+", label: "Anos de experiência" },
              { value: "12+", label: "Projetos" },
              { value: "5+", label: "Certificações" },
            ].map(({ value, label }) => (
              <div key={label} className="card p-4 text-center">
                <div className="font-display text-2xl text-accent-blue">{value}</div>
                <div className="text-xs text-text-muted mt-1 leading-snug">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Lado direito — Chatbot */}
        <div className="animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <ChatBot />
        </div>
      </section>

      {/* ─── SEÇÃO 2: Mercado em Tempo Real ─── */}
      <section>
        <div className="mb-4">
          <h2 className="section-title">Mercado ao Vivo</h2>
          <p className="section-sub">Atualizado automaticamente a cada minuto</p>
        </div>
        <MarketTicker />
      </section>

      {/* ─── SEÇÃO 3: Gráfico + Insights ─── */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Gráfico ocupa 2/3 */}
        <div className="lg:col-span-2">
          <PriceChart />
        </div>
        {/* Insights ocupa 1/3 */}
        <div>
          <InsightsPanel />
        </div>
      </section>

      {/* ─── SEÇÃO 4: Projetos em Destaque ─── */}
      <section>
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="section-title">Projetos em Destaque</h2>
            <p className="section-sub">Análise de dados aplicada a finanças</p>
          </div>
          <a href="/projetos" className="text-sm text-accent-blue hover:underline font-medium hidden sm:block">
            Ver todos →
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-stagger">
          {FEATURED_PROJECTS.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </section>
    </main>
  );
}
