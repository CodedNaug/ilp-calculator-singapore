import React, { useEffect, useState } from "react";
import InputPercent from "./InputPercent";
import type { PlanChoice, ProductPreset } from "../types";

interface Props {
  productPreset: ProductPreset;
  applyPreset: (p: ProductPreset) => void;
  monthlyPremium: number;
  setMonthlyPremium: (v: number) => void;
  years: number;
  setYears: (v: number) => void;
  planChoice: PlanChoice;
  setPlanChoice: (v: PlanChoice) => void;

  y1AllocPct: number;
  setY1AllocPct: (v: number) => void;
  y2AllocPct: number;
  setY2AllocPct: (v: number) => void;
  laterAllocPct: number;
  setLaterAllocPct: (v: number) => void;

  welcomeBonusPct: number;
  setWelcomeBonusPct: (v: number) => void;
  campaignBonusPct: number;
  setCampaignBonusPct: (v: number) => void;

  ilpNetReturnPct: number;
  setIlpNetReturnPct: (v: number) => void;
  etfNetReturnPct: number;
  setEtfNetReturnPct: (v: number) => void;
  headlineGrossPct: number;
  setHeadlineGrossPct: (v: number) => void;

  setOptimisticAgentPitch: () => void;
  setConservativePitch: () => void;
}

export default function AssumptionsPanel(props: Props) {
  const {
    productPreset, applyPreset, monthlyPremium, setMonthlyPremium,
    years, setYears, planChoice, setPlanChoice,
    y1AllocPct, setY1AllocPct, y2AllocPct, setY2AllocPct, laterAllocPct, setLaterAllocPct,
    welcomeBonusPct, setWelcomeBonusPct, campaignBonusPct, setCampaignBonusPct,
    ilpNetReturnPct, setIlpNetReturnPct, etfNetReturnPct, setEtfNetReturnPct, headlineGrossPct, setHeadlineGrossPct,
    setOptimisticAgentPitch, setConservativePitch
  } = props;

  // Local text state for Monthly Premium so placeholder "0" shows when empty
  const [mpText, setMpText] = useState<string>(String(monthlyPremium ?? 0));
  useEffect(() => {
    if (mpText !== "") setMpText(String(monthlyPremium));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [monthlyPremium]);

  const [yrsText, setYrsText] = useState<string>(String(years ?? 0));
  useEffect(() => {
    if (yrsText !== "") setYrsText(String(years));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [years]);

  // === Auto-calc ILP Net Return (read-only) ===
  // Realistic defaults (you can later expose these if needed)
  const FUND_TER = 1.2;   // % p.a.
  const WRAPPER = 1.0;   // % p.a.
  const SPREAD = 0.2;   // % p.a.
  const VEST_YEARS = 5;   // straight-line vest assumption

  React.useEffect(() => {
    const raw = headlineGrossPct - FUND_TER - WRAPPER - SPREAD;
    const clamped = Math.max(-50, Math.min(50, Number(raw.toFixed(2))));
    setIlpNetReturnPct(clamped);
  }, [headlineGrossPct, setIlpNetReturnPct]); // bonuses removed from deps

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 sm:p-5">
      <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Assumptions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="flex flex-col gap-1">
          <span className="text-sm text-neutral-400">Product Preset</span>
          <select
            value={productPreset}
            onChange={(e) => applyPreset(e.target.value as ProductPreset)}
            className="bg-neutral-800 rounded-xl px-3 py-2 outline-none"
          >
            <option value="Typical ILP">Typical ILP</option>
            <option value="GWA4">Great Eastern GWA4</option>
          </select>
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm text-neutral-400">Monthly Premium</span>
          <input
            type="number"
            value={mpText}
            placeholder="0"
            onChange={(e) => {
              const val = e.target.value;
              setMpText(val);
              if (val === "") {
                setMonthlyPremium(0);
              } else {
                const num = Math.max(0, Number(val));
                if (!Number.isNaN(num)) setMonthlyPremium(num);
              }
            }}
            className="bg-neutral-800 rounded-xl px-3 py-2 outline-none"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm text-neutral-400">Years</span>
          <input
            type="number"
            value={yrsText}
            placeholder="0"
            onChange={(e) => {
              const val = e.target.value;
              setYrsText(val);
              if (val === "") {
                setYears(0); // treat empty as 0 until typed
              } else {
                const num = Math.min(50, Math.max(1, Number(val)));
                if (!Number.isNaN(num)) setYears(num);
              }
            }}
            className="bg-neutral-800 rounded-xl px-3 py-2 outline-none"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm text-neutral-400">Plan Choice (GWA4 only)</span>
          <select
            value={planChoice}
            onChange={(e) => (setPlanChoice(Number(e.target.value) as any))}
            className="bg-neutral-800 rounded-xl px-3 py-2 outline-none"
            disabled={productPreset !== "GWA4"}
          >
            <option value={5}>Choice 5 — Premium bonus from Year 6, Loyalty from Year 10</option>
            <option value={10}>Choice 10 — Premium bonus from Year 11, Loyalty from Year 10</option>
            <option value={15}>Choice 15 — Premium bonus from Year 16, Loyalty from Year 15</option>
          </select>
          {productPreset !== "GWA4" && (
            <span className="text-xs text-neutral-500">Plan Choice applies only to GWA4.</span>
          )}
        </label>

        <div className="sm:col-span-2 border-t border-neutral-800 my-2" />

        <label className="flex flex-col gap-1">
          <span className="text-sm text-neutral-400">ILP Allocated in Year 1</span>
          <InputPercent value={y1AllocPct} onChange={setY1AllocPct} />
          <span className="text-xs text-neutral-500">Portion of premium actually invested in funds in Year 1.</span>
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm text-neutral-400">ILP Allocated in Year 2</span>
          <InputPercent value={y2AllocPct} onChange={setY2AllocPct} />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm text-neutral-400">ILP Allocated Year 3+</span>
          <InputPercent value={laterAllocPct} onChange={setLaterAllocPct} />
        </label>

        <div className="sm:col-span-2 border-t border-neutral-800 my-2" />

        <label className="flex flex-col gap-1">
          <span className="text-sm text-neutral-400">Welcome Bonus (Y1, % of invested)</span>
          <InputPercent value={welcomeBonusPct} onChange={setWelcomeBonusPct} />
          <span className="text-xs text-neutral-500">
            On 1st-year basic regular premiums only, up to 55% (≥ S$12k annual). No bonus on single premiums/top-ups. Paid as ILP units. REF: GWA4 offers 55% welcome bonus.
          </span>
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm text-neutral-400">Campaign Bonus (Y1, % of invested)</span>
          <InputPercent value={campaignBonusPct} onChange={setCampaignBonusPct} />
        </label>

        <div className="sm:col-span-2 border-t border-neutral-800 my-2" />

        <label className="flex flex-col gap-1">
          <span className="text-sm text-neutral-400">Headline Gross (Agent Illustration)</span>
          <InputPercent value={headlineGrossPct} onChange={setHeadlineGrossPct} step={0.1} />
        </label>

        {/* Read-only auto calculation */}
        <label className="flex flex-col gap-1">
          <span className="text-sm text-neutral-400">
            ILP Net Return <span className="text-neutral-500">(auto)</span>
          </span>
          <InputPercent value={ilpNetReturnPct} onChange={setIlpNetReturnPct} step={0.1} readOnly />
          <span className="text-xs text-neutral-500">
            Computed as: Headline − {FUND_TER}% fund TER − {WRAPPER}% wrapper − {SPREAD}% trading/cash drag.
          </span>
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm text-neutral-400">Term+ETF Net Return</span>
          <InputPercent value={etfNetReturnPct} onChange={setEtfNetReturnPct} step={0.1} />
          <span className="text-xs text-neutral-500">
            Typical net return for investing in S&P500 = ~7–9%
          </span>
        </label>

        <div className="sm:col-span-2 border-t border-neutral-800 my-2" />

        <div className="flex gap-2">
          <button onClick={setOptimisticAgentPitch} className="px-3 py-2 rounded-xl border border-neutral-700 hover:bg-neutral-800">
            Optimistic (9% Headline)
          </button>
          <button onClick={setConservativePitch} className="px-3 py-2 rounded-xl border border-neutral-700 hover:bg-neutral-800">
            Conservative
          </button>
        </div>
      </div>
    </div>
  );
}
