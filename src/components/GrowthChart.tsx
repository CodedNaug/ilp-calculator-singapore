import React, { useMemo } from "react";
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from "recharts";
import { currency } from "../utils/format";

interface Props {
  data: Array<{ year: number; ilpValue: number; ilpHeadline: number; etfValue: number; }>;
}

export default function GrowthChart({ data }: Props) {
  const chartData = useMemo(() => {
    return data.map(d => ({
      ...d,
      ilpLoss: d.etfValue - d.ilpValue,  // positive means investor loses by choosing ILP
    }));
  }, [data]);
  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5">
      <h2 className="text-xl font-semibold mb-4">Growth Over Time</h2>
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 10, right: 20, bottom: 0, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
            <XAxis dataKey="year" stroke="#9ca3af" />
            <YAxis
              stroke="#9ca3af"
              tickFormatter={(v) =>
                v >= 1_000_000 ? `${(v / 1_000_000).toFixed(1)}m`
                  : v >= 1_000 ? `${(v / 1_000).toFixed(0)}k`
                    : String(v)
              }
            />
            <Tooltip
              formatter={(v: any) => currency(Number(v))}
              labelFormatter={(l) => `Year ${l}`}
              contentStyle={{ backgroundColor: "#111", border: "1px solid #333" }}
            />
            <Legend
              formatter={(value) => {
                if (value.includes("Headline")) return `${value}`;
                return value;
              }}
            />
            <Line type="monotone" dataKey="etfValue" name="Term+ETF (Net)" stroke="#3b82f6" strokeWidth={3} dot={false} />
            <Line type="monotone" dataKey="ilpHeadline" name="⚠︎ ILP (Marketed Illustration)" stroke="#65a30d" strokeWidth={1} strokeDasharray="5 5" dot={false} />
            <Line type="monotone" dataKey="ilpValue" name="ILP (Net After Fees)" stroke="#f97316" strokeWidth={3} dot={false} />
            <Line type="monotone" dataKey="ilpLoss" name="Loss vs ETF" stroke="#ef4444" strokeWidth={2} strokeDasharray="4 2" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <p className="text-xs text-neutral-400 mt-3">
        The green curve mirrors an optimistic brochure pitch (headline gross + bonuses). The blue curve shows a more realistic, net-of-fees outcome.
      </p>
    </div>
  );
}
