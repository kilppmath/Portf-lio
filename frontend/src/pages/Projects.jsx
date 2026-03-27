import { useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid, BarChart, Bar,
} from "recharts";

// ─── Dados mock dos projetos completos ───────────────────────────────────────
const PROJECTS = [
  {
    id: "b3-dashboard",
    title: "Dashboard B3 — Análise de Ativos",
    category: "Análise Financeira",
    status: "live",
    problem:
      "Acompanhar múltiplos ativos da B3 de forma eficiente, com métricas de risco e retorno consolidadas em um único painel.",
    dataSource: "Brapi / Alpha Vantage / Yahoo Finance",
    stack: ["React", "Recharts", "Node.js", "Axios", "Express"],
    insights: [
      "PETR4 apresentou correlação de 0.72 com a variação do preço do Brent no período analisado.",
      "A volatilidade do portfólio reduziu 18% com a adição de ativos de renda fixa como hedge.",
      "Semanas pré-COPOM historicamente elevam a volatilidade implícita dos ativos analisados.",
    ],
    chartData: Array.from({ length: 20 }, (_, i) => ({
      day: `Dia ${i + 1}`,
      petr4: +(38 + Math.sin(i * 0.5) * 3 + Math.random()).toFixed(2),
      vale3: +(62 + Math.cos(i * 0.4) * 4 + Math.random()).toFixed(2),
    })),
    chartType: "line",
    forecast: "Tendência de alta moderada no curto prazo, com suporte em R$ 36,20 para PETR4.",
  },
  {
    id: "ml-volatility",
    title: "Previsão de Volatilidade com ML",
    category: "Machine Learning",
    status: "em breve",
    problem:
      "Prever a volatilidade futura de ativos usando modelos de machine learning treinados com dados históricos de preços e volume.",
    dataSource: "Yahoo Finance — dados históricos diários",
    stack: ["Python", "scikit-learn", "statsmodels", "pandas", "matplotlib"],
    insights: [
      "Modelos GARCH(1,1) superaram regressão linear simples em 23% de acurácia (RMSE).",
      "Features de momentum (RSI, MACD) melhoraram a previsão em janelas de 5 dias.",
      "Períodos de alta correlação entre ativos reduziram a eficácia do modelo univariado.",
    ],
    chartData: Array.from({ length: 15 }, (_, i) => ({
      day: `Sem ${i + 1}`,
      real: +(18 + Math.sin(i * 0.8) * 6 + Math.random() * 2).toFixed(2),
      previsto: +(17 + Math.sin(i * 0.8) * 5.5 + Math.random()).toFixed(2),
    })),
    chartType: "line",
    forecast: "Volatilidade implícita acima de 22% sinaliza janela de risco elevado para os próximos 10 pregões.",
  },
  {
    id: "markowitz",
    title: "Portfólio Eficiente de Markowitz",
    category: "Finanças Quantitativas",
    status: "em breve",
    problem:
      "Encontrar a alocação ótima de ativos que maximiza retorno esperado para um dado nível de risco, usando a teoria moderna de portfólio.",
    dataSource: "Dados históricos B3 — últimos 5 anos",
    stack: ["Python", "NumPy", "scipy", "Plotly", "pandas"],
    insights: [
      "Portfólio de mínima variância reduziu o desvio padrão anualizado de 28% para 14%.",
      "Diversificação entre setores (energia, mineração, financeiro) gerou o maior Índice Sharpe.",
      "Correlação negativa entre VALE3 e ativos de consumo interno permitiu hedge natural.",
    ],
    chartData: Array.from({ length: 8 }, (_, i) => ({
      ativo: ["PETR4", "VALE3", "ITUB4", "BBDC4", "WEGE3", "RENT3", "MGLU3", "TOTS3"][i],
      alocacao: [18, 22, 15, 12, 14, 8, 6, 5][i],
    })),
    chartType: "bar",
    forecast: "Fronteira eficiente sugere alocação de 22% em VALE3 como ponto ótimo de retorno/risco.",
  },
];

// ─── Tooltip customizado ───────────────────────────────────────────────────
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="card px-3 py-2 text-xs font-mono space-y-1">
      <div className="text-text-muted">{label}</div>
      {payload.map((p) => (
        <div key={p.name} style={{ color: p.color }}>
          {p.name}: {Number(p.value).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
        </div>
      ))}
    </div>
  );
}

// ─── Componente de detalhe do projeto ────────────────────────────────────────
function ProjectDetail({ project, onBack }) {
  return (
    <div className="space-y-8 animate-fade-up">
      {/* Breadcrumb */}
      <button
        onClick={onBack}
        className="text-sm text-text-muted hover:text-text-primary transition-colors font-mono flex items-center gap-2"
      >
        ← Voltar aos projetos
      </button>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <span className="text-xs font-mono text-accent-blue uppercase tracking-wider">{project.category}</span>
          <h2 className="font-display text-4xl text-text-primary mt-1">{project.title}</h2>
        </div>
        <span className={`tag mt-2 self-start ${project.status === "live" ? "text-bull border border-bull/20" : ""}`}>
          {project.status}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Coluna principal */}
        <div className="lg:col-span-2 space-y-6">
          {/* Problema */}
          <div className="card p-5">
            <h3 className="text-xs font-mono text-text-muted uppercase tracking-wider mb-3">Problema Resolvido</h3>
            <p className="text-text-secondary leading-relaxed">{project.problem}</p>
          </div>

          {/* Dashboard visual */}
          <div className="card p-5">
            <h3 className="text-xs font-mono text-text-muted uppercase tracking-wider mb-5">Dashboard Visual</h3>
            <ResponsiveContainer width="100%" height={220}>
              {project.chartType === "bar" ? (
                <BarChart data={project.chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E1E2A" vertical={false} />
                  <XAxis dataKey="ativo" tick={{ fill: "#55556A", fontSize: 10 }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fill: "#55556A", fontSize: 10 }} tickLine={false} axisLine={false} unit="%" />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="alocacao" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
              ) : (
                <LineChart data={project.chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E1E2A" vertical={false} />
                  <XAxis dataKey="day" tick={{ fill: "#55556A", fontSize: 10 }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fill: "#55556A", fontSize: 10 }} tickLine={false} axisLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line type="monotone" dataKey={Object.keys(project.chartData[0])[1]} stroke="#3B82F6" strokeWidth={2} dot={false} />
                  {Object.keys(project.chartData[0]).length > 2 && (
                    <Line type="monotone" dataKey={Object.keys(project.chartData[0])[2]} stroke="#22C55E" strokeWidth={2} dot={false} />
                  )}
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>

          {/* Previsão */}
          <div className="card p-5 border-l-2 border-accent-blue">
            <h3 className="text-xs font-mono text-text-muted uppercase tracking-wider mb-2">Previsão / Conclusão</h3>
            <p className="text-text-secondary">{project.forecast}</p>
          </div>
        </div>

        {/* Coluna lateral */}
        <div className="space-y-4">
          {/* Stack */}
          <div className="card p-5">
            <h3 className="text-xs font-mono text-text-muted uppercase tracking-wider mb-3">Ferramentas</h3>
            <div className="flex flex-wrap gap-1.5">
              {project.stack.map((t) => <span key={t} className="tag">{t}</span>)}
            </div>
          </div>

          {/* Fonte */}
          <div className="card p-5">
            <h3 className="text-xs font-mono text-text-muted uppercase tracking-wider mb-2">Fonte dos Dados</h3>
            <p className="text-sm text-text-secondary">{project.dataSource}</p>
          </div>

          {/* Insights */}
          <div className="card p-5">
            <h3 className="text-xs font-mono text-text-muted uppercase tracking-wider mb-3">Insights</h3>
            <ul className="space-y-3">
              {project.insights.map((ins, i) => (
                <li key={i} className="flex gap-2 text-sm text-text-secondary">
                  <span className="text-accent-blue mt-0.5 flex-shrink-0">▸</span>
                  {ins}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Lista de projetos ────────────────────────────────────────────────────────
function ProjectListItem({ project, onClick }) {
  return (
    <div
      onClick={() => onClick(project)}
      className="card p-6 cursor-pointer hover:border-accent-blue/30 transition-all duration-200 group"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono text-text-muted uppercase tracking-wider">{project.category}</span>
            <span className={`tag ${project.status === "live" ? "text-bull border border-bull/20" : ""}`}>
              {project.status}
            </span>
          </div>
          <h3 className="font-display text-xl text-text-primary group-hover:text-accent-blue transition-colors mb-2">
            {project.title}
          </h3>
          <p className="text-sm text-text-secondary leading-relaxed mb-4">{project.problem}</p>
          <div className="flex gap-1.5 flex-wrap">
            {project.stack.map((t) => <span key={t} className="tag">{t}</span>)}
          </div>
        </div>
        <span className="text-text-muted group-hover:text-accent-blue transition-colors text-xl mt-1">→</span>
      </div>
    </div>
  );
}

// ─── Página de Projetos ───────────────────────────────────────────────────────
export default function Projects() {
  const [selected, setSelected] = useState(null);

  return (
    <main className="max-w-6xl mx-auto px-6 pt-24 pb-16">
      {selected ? (
        <ProjectDetail project={selected} onBack={() => setSelected(null)} />
      ) : (
        <>
          <div className="mb-10 animate-fade-up">
            <p className="text-xs font-mono text-accent-blue uppercase tracking-widest mb-3">Portfólio</p>
            <h1 className="font-display text-5xl text-text-primary mb-3">Projetos</h1>
            <p className="text-text-secondary max-w-xl">
              Análises, dashboards e modelos aplicados a finanças quantitativas e ciência de dados.
              Cada projeto documenta problema, metodologia, dados e conclusões.
            </p>
          </div>

          <div className="space-y-4 animate-stagger">
            {PROJECTS.map((p) => (
              <ProjectListItem key={p.id} project={p} onClick={setSelected} />
            ))}
          </div>

          {/* Card de projeto futuro */}
          <div className="mt-6 card p-6 border-dashed opacity-50 text-center">
            <p className="text-text-muted text-sm font-mono">+ Mais projetos em desenvolvimento</p>
          </div>
        </>
      )}
    </main>
  );
}
