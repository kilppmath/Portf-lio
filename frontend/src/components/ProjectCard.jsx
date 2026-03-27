import { Link } from "react-router-dom";

export default function ProjectCard({ project }) {
  return (
    <div className="card p-5 flex flex-col gap-4 hover:border-accent-blue/30 transition-all duration-300 group">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="text-xs font-mono text-text-muted mb-1.5 uppercase tracking-wider">{project.category}</div>
          <h3 className="font-display text-lg text-text-primary group-hover:text-accent-blue transition-colors">
            {project.title}
          </h3>
        </div>
        {project.status && (
          <span className={`tag mt-1 flex-shrink-0 ${project.status === "live" ? "text-bull border border-bull/20" : ""}`}>
            {project.status}
          </span>
        )}
      </div>

      {/* Descrição */}
      <p className="text-sm text-text-secondary leading-relaxed">{project.description}</p>

      {/* Stack */}
      <div className="flex gap-1.5 flex-wrap">
        {project.stack.map((tech) => (
          <span key={tech} className="tag">{tech}</span>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-auto pt-2 border-t border-bg-border flex items-center justify-between">
        <span className="text-xs text-text-muted font-mono">{project.dataSource}</span>
        <Link
          to={`/projetos`}
          className="text-xs text-accent-blue hover:underline font-medium transition-all"
        >
          Ver mais →
        </Link>
      </div>
    </div>
  );
}
