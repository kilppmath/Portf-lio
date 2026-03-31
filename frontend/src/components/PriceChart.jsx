
import { useState, useEffect } from "react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid,
} from "recharts";
import { useHistory } from "../hooks/useData";
import { analyzeMarket } from "../utils/marketAnalysis"; // ✅ IMPORTANTE

const ASSETS = [
  { id: "ibovespa", label: "IBOV" },
  { id: "usdbrl", label: "USD/BRL" },
  { id: "bitcoin", label: "BTC" },
  { id: "petr4", label: "PETR4" },
  { id: "vale3", label: "VALE3" },
];

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  const val = payload?.[0]?.value ?? 0;

  return (
    <div className="bg-surface-3 border border-surface-border-hi rounded-xl px-3 py-2">
      <p className="font-mono text-2xs text-content-lo mb-1">{label}</p>
      <p className="font-mono text-sm text-content-hi font-medium">
        {Number(val).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
      </p>
    </div>
  );
}

// ✅ AGORA RECEBE onAssetData DO HOME
export default function PriceChart({ onAssetData }) {
  const [selected, setSelected] = useState("ibovespa");
  const { data, loading } = useHistory(selected);

  const points = Array.isArray(data?.data) ? data.data : [];

  const first = points.length > 0 ? points[0]?.value ?? 0 : 0;
  const last = points.length > 0 ? points[points.length - 1]?.value ?? 0 : 0;

  const pct =
    points.length > 1 && first !== 0
      ? ((last / first - 1) * 100)
      : null;

  const isUp = pct !== null && pct >= 0;

  // ✅ AQUI ESTÁ A MÁGICA (SEM QUEBRAR NADA)
  useEffect(() => {
    if (!points.length) return;

    const analysis = analyzeMarket(points);

    if (onAssetData) {
      onAssetData(analysis);
    }
  }, [points, selected]);

  return (
    <div className="card p-6 flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <p className="label mb-1.5">Histórico de Preços</p>
          <div className="flex items-baseline gap-3">
            <span className="font-display text-2xl font-semibold text-content-hi">
              {ASSETS.find((a) => a.id === selected)?.label}
            </span>
            {pct !== null && (
              <span className={`font-mono text-sm font-medium ${isUp ? "text-bull" : "text-bear"}`}>
                {isUp ? "+" : ""}{pct.toFixed(2)}% <span className="text-content-lo font-normal">30d</span>
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-1 flex-wrap">
          {ASSETS.map((a) => (
            <button
              key={a.id}
              onClick={() => setSelected(a.id)}
              className={`font-mono text-2xs px-3 py-1.5 rounded-lg transition-all duration-150 ${
                selected === a.id
                  ? "bg-blue text-white"
                  : "bg-surface-3 text-content-md hover:text-content-hi border border-surface-border"
              }`}
            >
              {a.label}
            </button>
          ))}
        </div>
      </div>

      {/* Gráfico */}
      {loading ? (
        <div className="h-56 flex items-center justify-center">
          <span className="font-mono text-xs text-content-lo animate-pulse">Carregando dados...</span>
        </div>
      ) : points.length === 0 ? (
        <div className="h-56 flex items-center justify-center text-content-lo font-mono text-xs">
          Sem dados disponíveis
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={points}>
            <CartesianGrid stroke="#1C1E27" vertical={false} />

            <XAxis
              dataKey="date"
              tick={{ fill: "#4A4D60", fontSize: 10 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => v?.slice?.(5) ?? ""}
            />

            <YAxis
              tick={{ fill: "#4A4D60", fontSize: 10 }}
              tickLine={false}
              axisLine={false}
            />

            <Tooltip content={<ChartTooltip />} />

            <Area
              type="monotone"
              dataKey="value"
              stroke={isUp ? "#22C55E" : "#F43F5E"}
              fillOpacity={0.1}
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}