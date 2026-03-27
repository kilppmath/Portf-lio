import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { useHistory } from "../hooks/useData";

const ASSETS = [
  { id: "ibovespa", label: "IBOVESPA" },
  { id: "usdbrl", label: "USD/BRL" },
  { id: "bitcoin", label: "Bitcoin" },
  { id: "petr4", label: "PETR4" },
  { id: "vale3", label: "VALE3" },
];

// Tooltip customizado
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="card px-3 py-2 text-xs font-mono">
      <div className="text-text-muted mb-1">{label}</div>
      <div className="text-accent-blue font-medium">
        {Number(payload[0].value).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
      </div>
    </div>
  );
}

export default function PriceChart() {
  const [selected, setSelected] = useState("ibovespa");
  const { data, loading } = useHistory(selected);

  return (
    <div className="card p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="section-title">Histórico de Preços</h3>
          <p className="section-sub">Últimos 30 dias — dados simulados</p>
        </div>
        {/* Seletor de ativo */}
        <div className="flex gap-1 flex-wrap">
          {ASSETS.map((a) => (
            <button
              key={a.id}
              onClick={() => setSelected(a.id)}
              className={`text-xs font-mono px-3 py-1 rounded-lg transition-all ${
                selected === a.id
                  ? "bg-accent-blue text-white"
                  : "bg-bg-border text-text-secondary hover:text-text-primary"
              }`}
            >
              {a.label}
            </button>
          ))}
        </div>
      </div>

      {/* Gráfico */}
      {loading ? (
        <div className="h-[240px] flex items-center justify-center text-text-muted text-sm font-mono">
          Carregando...
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={data?.data || []} margin={{ top: 4, right: 8, bottom: 0, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1E1E2A" vertical={false} />
            <XAxis
              dataKey="date"
              tick={{ fill: "#55556A", fontSize: 10, fontFamily: "JetBrains Mono" }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => v.slice(5)} // mostra MM-DD
              interval="preserveStartEnd"
            />
            <YAxis
              tick={{ fill: "#55556A", fontSize: 10, fontFamily: "JetBrains Mono" }}
              tickLine={false}
              axisLine={false}
              width={70}
              tickFormatter={(v) => v.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#3B82F6"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: "#3B82F6", stroke: "#0B0B0F", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
