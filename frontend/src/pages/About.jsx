// Dados configuráveis — edite conforme necessário
const TECH_STACK = {
  "Frontend": ["React", "Vite", "TailwindCSS", "Recharts", "JavaScript"],
  "Backend": ["Node.js", "Express", "Python", "R"],
  "Dados & ML": ["pandas", "NumPy", "scikit-learn", "statsmodels", "ggplot2"],
  "Ferramentas": ["Git", "Vercel", "VS Code", "Jupyter", "RStudio"],
};

const CERTIFICATES = [
  {
    title: "Google Data Analytics Certificate",
    issuer: "Google / Coursera",
    year: "2024",
    link: "#",
  },
  {
    title: "Financial Markets",
    issuer: "Yale / Coursera",
    year: "2024",
    link: "#",
  },
  {
    title: "Python for Data Science",
    issuer: "IBM / Coursera",
    year: "2023",
    link: "#",
  },
  {
    title: "React — The Complete Guide",
    issuer: "Udemy",
    year: "2023",
    link: "#",
  },
  // Adicione mais certificados aqui no futuro
];

const TIMELINE = [
  {
    year: "2024 →",
    title: "Análise Financeira & Produtos de Dados",
    desc: "Foco em unir desenvolvimento de software com análise quantitativa, criando ferramentas que transformam dados em decisões.",
  },
  {
    year: "2022–24",
    title: "Desenvolvimento Full-Stack",
    desc: "Construção de aplicações web modernas com React e Node.js. Exploração de APIs, bancos de dados e arquitetura de software.",
  },
  {
    year: "2021–22",
    title: "Início em Programação",
    desc: "Primeiros passos com Python e JavaScript. Interesse crescente em dados, estatística e automação.",
  },
];

export default function About() {
  return (
    <main className="max-w-6xl mx-auto px-6 pt-24 pb-16 space-y-16">

      {/* ─── Header ─── */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start animate-fade-up">
        <div>
          <p className="text-xs font-mono text-accent-blue uppercase tracking-widest mb-3">Sobre</p>
          <h1 className="font-display text-5xl text-text-primary mb-6">
            Olá, sou<br />
            <span className="italic">Seu Nome</span>
            <span className="text-accent-blue">.</span>
          </h1>
          <div className="space-y-4 text-text-secondary leading-relaxed">
            <p>
              Desenvolvedor full-stack e entusiasta de análise financeira, com interesse em transformar
              dados complexos em visualizações e produtos que geram valor real.
            </p>
            <p>
              Minha jornada começou com curiosidade em mercados financeiros e evoluiu para o desenvolvimento
              de ferramentas que integram análise quantitativa, design e engenharia de software.
            </p>
            <p>
              Acredito que o diferencial no mercado atual está em quem consegue unir pensamento analítico
              com capacidade de construir — e comunicar resultados de forma clara.
            </p>
          </div>
        </div>

        {/* Card de objetivos */}
        <div className="space-y-4">
          <div className="card p-6 border-l-2 border-accent-blue">
            <h3 className="text-xs font-mono text-text-muted uppercase tracking-wider mb-3">Objetivos Profissionais</h3>
            <ul className="space-y-3">
              {[
                "Atuar na intersecção de tecnologia e finanças quantitativas",
                "Construir produtos de dados que influenciem decisões reais",
                "Desenvolver expertise em machine learning aplicado a mercados",
                "Contribuir para projetos open-source na área de fintech",
              ].map((obj, i) => (
                <li key={i} className="flex gap-2 text-sm text-text-secondary">
                  <span className="text-accent-blue mt-0.5">▸</span>
                  {obj}
                </li>
              ))}
            </ul>
          </div>

          {/* Contato / Links */}
          <div className="card p-5">
            <h3 className="text-xs font-mono text-text-muted uppercase tracking-wider mb-3">Contato</h3>
            <div className="space-y-2">
              {[
                { label: "Email", value: "seuemail@exemplo.com", href: "mailto:seuemail@exemplo.com" },
                { label: "LinkedIn", value: "linkedin.com/in/seuperfil", href: "#" },
                { label: "GitHub", value: "github.com/seuperfil", href: "#" },
              ].map(({ label, value, href }) => (
                <div key={label} className="flex justify-between items-center text-sm">
                  <span className="text-text-muted font-mono text-xs">{label}</span>
                  <a href={href} className="text-text-secondary hover:text-accent-blue transition-colors">
                    {value}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Timeline ─── */}
      <section>
        <h2 className="section-title">Trajetória</h2>
        <p className="section-sub">Como cheguei até aqui</p>
        <div className="space-y-4 animate-stagger">
          {TIMELINE.map(({ year, title, desc }) => (
            <div key={year} className="card p-5 flex gap-5 items-start">
              <span className="font-mono text-xs text-accent-blue w-16 flex-shrink-0 pt-0.5">{year}</span>
              <div>
                <h3 className="text-text-primary font-medium mb-1">{title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Stack de tecnologias ─── */}
      <section>
        <h2 className="section-title">Tecnologias</h2>
        <p className="section-sub">Stack atual e ferramentas de trabalho</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(TECH_STACK).map(([category, techs]) => (
            <div key={category} className="card p-5">
              <h3 className="text-xs font-mono text-text-muted uppercase tracking-wider mb-3">{category}</h3>
              <div className="flex flex-wrap gap-1.5">
                {techs.map((tech) => (
                  <span key={tech} className="tag">{tech}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Certificados ─── */}
      <section>
        <h2 className="section-title">Certificados</h2>
        <p className="section-sub">Formação complementar e aprendizado contínuo</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 animate-stagger">
          {CERTIFICATES.map((cert) => (
            <a
              key={cert.title}
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="card p-4 flex items-start justify-between gap-3 hover:border-accent-blue/30 transition-all group"
            >
              <div>
                <div className="text-sm text-text-primary group-hover:text-accent-blue transition-colors font-medium mb-1">
                  {cert.title}
                </div>
                <div className="text-xs text-text-muted font-mono">{cert.issuer}</div>
              </div>
              <span className="tag flex-shrink-0 mt-0.5">{cert.year}</span>
            </a>
          ))}

          {/* Placeholder para novos certificados */}
          <div className="card p-4 border-dashed opacity-40 flex items-center justify-center">
            <span className="text-xs text-text-muted font-mono">+ Em breve</span>
          </div>
        </div>
      </section>
    </main>
  );
}
