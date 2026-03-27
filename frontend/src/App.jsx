import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import About from "./pages/About";

export default function App() {
  return (
    <div className="min-h-screen bg-bg-primary">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projetos" element={<Projects />} />
        <Route path="/sobre" element={<About />} />
      </Routes>
      {/* Aviso legal */}
      <footer className="text-center py-6 text-text-muted text-xs font-mono border-t border-bg-border mt-12">
        Este projeto tem fins educacionais e não constitui recomendação de investimento.
      </footer>
    </div>
  );
}
