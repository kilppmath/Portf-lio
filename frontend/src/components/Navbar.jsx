import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-bg-border bg-bg-primary/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo / Nome */}
        <NavLink to="/" className="font-display text-lg text-text-primary tracking-tight">
          Portfolio<span className="text-accent-blue">.</span>
        </NavLink>

        {/* Links */}
        <div className="flex items-center gap-1">
          {[
            { to: "/", label: "Home" },
            { to: "/projetos", label: "Projetos" },
            { to: "/sobre", label: "Sobre" },
          ].map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `px-4 py-1.5 rounded-lg text-sm transition-all duration-200 ${
                  isActive
                    ? "bg-accent-blue-glow text-accent-blue font-medium"
                    : "text-text-secondary hover:text-text-primary hover:bg-bg-card"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* Badge status */}
        <div className="flex items-center gap-2 text-xs text-text-muted font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-bull animate-pulse2" />
          live
        </div>
      </div>
    </nav>
  );
}
