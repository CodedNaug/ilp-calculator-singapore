import React, { useMemo, useRef, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from "recharts";
import { currency } from "../utils/format";

interface Props {
  data: Array<{
    year: number;
    ilpValue: number;
    ilpHeadline: number;
    etfValue: number;
  }>;
}

export default function GrowthChart({ data }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Track tooltip position and clamp to chart bounds on mouse/touch move
  const [tipPos, setTipPos] = useState<{ x: number; y: number } | undefined>();

  const chartData = useMemo(() => {
    return data.map((d) => ({
      ...d,
      ilpLoss: d.etfValue - d.ilpValue, // positive => investor loses by choosing ILP
    }));
  }, [data]);

  const handleMouseMove = (state: any) => {
    if (!state?.activeCoordinate || !wrapperRef.current) return;

    const rect = wrapperRef.current.getBoundingClientRect();

    // Recharts gives x/y relative to the chart’s internal coordinate space.
    // We clamp these so the tooltip stays inside the visible chart area.
    const { x, y } = state.activeCoordinate;

    const PAD = 8;
    // Reasonable mobile-friendly tooltip size (also enforced via contentStyle below)
    const TIP_W = 280;
    const TIP_H = 170;

    const maxX = rect.width - TIP_W - PAD;
    const maxY = rect.height - TIP_H - PAD;

    const clampedX = Math.max(PAD, Math.min(x, maxX));
    const clampedY = Math.max(PAD, Math.min(y, maxY));

    setTipPos({ x: clampedX, y: clampedY });
  };

  const handleMouseLeave = () => setTipPos(undefined);

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5" ref={wrapperRef}>
      <h2 className="text-xl font-semibold mb-4">Growth Over Time</h2>
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 10, right: 20, bottom: 0, left: 0 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
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
              // Use the clamped coordinates
              position={tipPos}
              // Prevent rendering outside of chart viewbox
              allowEscapeViewBox={{ x: false, y: false }}
              formatter={(v: any) => currency(Number(v))}
              labelFormatter={(l) => `Year ${l}`}
              // Dark/light handled by CSS variables; also constrain size for mobile
              contentStyle={{
                backgroundColor: "var(--card)",
                border: "1px solid var(--border)",
                color: "var(--text)",
                maxWidth: 280,
                maxHeight: 170,
                overflow: "hidden",
                padding: "10px",
              }}
              wrapperStyle={{
                pointerEvents: "none", // don’t block touch scrolling
              }}
            />

            <Legend
              formatter={(value) => (value.includes("Headline") ? `${value}` : value)}
            />
            <Line type="monotone" dataKey="etfValue" name="Term+ETF (Net)" stroke="#3b82f6" strokeWidth={3} dot={false} />
            <Line type="monotone" dataKey="ilpHeadline" name="⚠︎ ILP (Marketed)" stroke="#65a30d" strokeWidth={1} strokeDasharray="5 5" dot={false} />
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
