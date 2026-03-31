import { useState } from "react";

// ─── Dados ──────────────────────────────────────────────────────

const TECH = {
  "Frontend":   ["React", "Vite", "TailwindCSS", "Recharts", "JavaScript"],
  "Backend":    ["Node.js", "Express", "Python", "R"],
  "Dados & ML": ["pandas", "NumPy", "scikit-learn", "statsmodels", "ggplot2"],
  "Ferramentas":["Git", "Vercel", "Jupyter", "RStudio", "VS Code"],
};

const TIMELINE = [
  {
    period: "Julho 2024 – Jan 2026",
    title: "Auxiliar de Escritório | Sc Souvenir – Florianópolis, SC",
    desc: (
      <ul className="list-disc pl-5 space-y-1 text-sm text-content-md">
        <li>Automação e Relatórios: Desenvolvimento de relatórios automáticos de pedidos utilizando Power BI e Excel, reduzindo o tempo de resposta operacional.</li>
        <li>Gestão de Dados: Criação de dashboards interativos com indicadores operacionais e financeiros (KPIs) em tempo real para suporte à diretoria.</li>
        <li>Melhoria de Processos: Identificação de padrões de desempenho para ajuste de estratégias comerciais e evolução de campanhas.</li>
        <li>Metodologia Ágil: Gestão e priorização de demandas administrativas utilizando Scrum, garantindo a pontualidade nas entregas.</li>
        <li>Rotinas Administrativas: Emissão de notas fiscais, controle de fluxo de vendas e manutenção de planilhas de controle interno.</li>
      </ul>
    ),
  },
  {
    period: "2023–",
    title: "Desenvolvimento Full-Stack",
    desc: "Construção de aplicações web modernas com React e Node.js. Exploração de APIs, bancos de dados e arquitetura de software.",
  },
  {
    period: "2021–22",
    title: "Início em Programação",
    desc: "Primeiros passos com Python e JavaScript. Interesse crescente em dados, estatística e automação.",
  },
];

const CERTS = [
  {
    title:  "Curso xp para certificacao ancord",
    issuer: "XP / rafael toro",
    year:   "2026",
    what:   "Curso preparatório para certificação Ancord, focado em fundamentos de investimentos e mercado financeiro.",
    learned:"Conceitos de renda fixa, renda variável, fundos de investimento e regulamentação do mercado.",
    apply:  "Aplicação prática dos conceitos para análise de portfólio e compreensão de produtos financeiros.",
    impact: "Base sólida em produtos financeiros e regulamentação, facilitando a comunicação com stakeholders e compreensão de mercados.",
  },
  {
    title:  "Sql+PowerBI para análise de dados",
    issuer: "Udemy",
    year:   "2025",
    what:   "Curso prático de SQL e PowerBI para análise de dados.",
    learned:"Modelagem de dados, criação de dashboards e storytelling com dados.",
    apply:  "Desenvolvimento de dashboards financeiros para monitoramento de KPIs pessoais.",
    impact: "Capacidade de transformar dados brutos em insights visuais e acionáveis.",
  },
  {
    title: "MongoDb para iniciantes",
    issuer: "mongodb university",
    year: "2025",
    what: "Curso introdutório sobre bancos de dados NoSQL com MongoDB.",
    learned: "Modelagem de dados, consultas e integração com aplicações.",
    apply: "Uso de MongoDB para armazenamento e consulta de dados financeiros em projetos pessoais.",
    impact: "Capacidade de trabalhar com grandes volumes de dados não estruturados.",
  },
  {
    title: "python — The Complete Guide",
    issuer: "Udemy",
    year: "2023",
    what: "Curso completo de python para dados e automação.",
    learned: "Programação em python, manipulação de dados e automação de tarefas.",
    apply: "Uso de python para automação de relatórios e análise de dados financeiros.",
    impact: "Aumento da eficiência e consistência na análise de dados.",
  },
];

// ─── Modal ──────────────────────────────────────────────────────
function CertModal({ cert, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="card p-6 max-w-md w-full space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between">
          <div>
            <p className="label mb-1">{cert.issuer}</p>
            <h3 className="font-display text-lg text-content-hi">{cert.title}</h3>
          </div>
          <button onClick={onClose}>✕</button>
        </div>

        <div className="space-y-3 text-sm text-content-md">
          <p><b>O que é:</b> {cert.what}</p>
          <p><b>Aprendizado:</b> {cert.learned}</p>
          <p><b>Aplicação:</b> {cert.apply}</p>
          <p><b>Impacto:</b> {cert.impact}</p>
        </div>

        <span className="pill">{cert.year}</span>
      </div>
    </div>
  );
}

// ─── Página ──────────────────────────────────────────────────────
export default function About() {
  const [selectedCert, setSelectedCert] = useState(null);

  const objectives = [
    "Atuar na intersecção de tecnologia e finanças quantitativas",
    "Construir produtos de dados que influenciem decisões reais",
    "Desenvolver expertise em machine learning aplicado a mercados",
    "conseguir a certificação Ancord para aprofundar conhecimento em produtos financeiros",
  ];

  const contacts = [
    { label: "Email", value: "matheuskilpp7@gmail.com", href: "mailto:matheuskilpp7@gmail.com" },
    { label: "LinkedIn", value: "linkedin.com/in/matheuskilpp", href: "https://linkedin.com/in/matheuskilpp" },
    { label: "GitHub", value: "github.com/matheuskilpp", href: "https://github.com/matheuskilpp" },
  ];

  return (
    <>
      {selectedCert && (
        <CertModal cert={selectedCert} onClose={() => setSelectedCert(null)} />
      )}

      <main className="max-w-6xl mx-auto px-6 pt-24 pb-16 space-y-20">

        {/* HERO + Objetivos */}
        <section className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12">
          <div className="space-y-6">
            <div>
              <p className="label mb-3">Sobre</p>
              <h1 className="font-display text-5xl text-content-hi">
                Olá, sou <span className="text-blue">Matheus Kilpp</span>.
              </h1>
              <div className="space-y-4 text-content-md">
                <p>
                  Desenvolvedor full-stack e entusiasta de análise financeira, com interesse em transformar dados complexos em decisões estratégicas.
                </p>
                <p>
                  Minha jornada começou com curiosidade em mercados financeiros e evoluiu para o desenvolvimento de ferramentas que integram análise quantitativa, design e engenharia de software.
                </p>
                <p>
                  Acredito que o diferencial no mercado atual está em quem consegue unir pensamento analítico com capacidade de construir — e comunicar resultados de forma clara.
                </p>
              </div>
            </div>

            {/* Stack */}
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(TECH).map(([cat, items]) => (
                <div key={cat} className="card p-4">
                  <p className="label mb-2">{cat}</p>
                  <div className="flex flex-wrap gap-1">
                    {items.map((t) => (
                      <span key={t} className="pill">{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card de objetivos e contatos */}
          <div className="space-y-4">
            <div className="card p-6 border-l-2 border-blue">
              <h3 className="text-xs font-mono text-text-muted uppercase tracking-wider mb-3">Objetivos Profissionais</h3>
              <ul className="space-y-3">
                {objectives.map((obj, i) => (
                  <li key={i} className="flex gap-2 text-sm text-content-md">
                    <span className="text-blue mt-0.5">▸</span>
                    {obj}
                  </li>
                ))}
              </ul>
            </div>

            <div className="card p-5">
              <h3 className="text-xs font-mono text-text-muted uppercase tracking-wider mb-3">Contato</h3>
              <div className="space-y-2 text-sm">
                {contacts.map(({ label, value, href }) => (
                  <div key={label} className="flex justify-between items-center">
                    <span className="text-text-muted font-mono text-xs">{label}</span>
                    <a href={href} className="text-content-md hover:text-blue transition-colors">
                      {value}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* TIMELINE */}
        <section>
          <h2 className="section-title">Trajetória</h2>
          <p className="section-sub">Como cheguei até aqui</p>
          <div className="space-y-4">
            {TIMELINE.map((t) => (
              <div key={t.period} className="card p-5 flex gap-5 items-start">
                <span className="font-mono text-xs text-blue w-16 flex-shrink-0 pt-0.5">{t.period}</span>
                <div>
                  <h3 className="text-content-hi font-medium mb-1">{t.title}</h3>
                  <p className="text-sm text-content-md leading-relaxed">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CERTIFICADOS */}
        <section>
          <h2 className="section-title">Certificados</h2>
          <p className="section-sub">Formação complementar e aprendizado contínuo</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {CERTS.map((cert) => (
              <button
                key={cert.title}
                onClick={() => setSelectedCert(cert)}
                className="card p-4 text-left hover:border-blue/30 transition-all"
              >
                <p className="text-content-hi">{cert.title}</p>
                <span className="text-xs text-content-lo">{cert.year}</span>
              </button>
            ))}

            {/* Placeholder */}
            <div className="card p-4 border-dashed opacity-40 flex items-center justify-center">
              <span className="text-xs text-text-muted font-mono">+ Em breve</span>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}