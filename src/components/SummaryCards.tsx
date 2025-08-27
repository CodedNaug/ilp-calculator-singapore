import React from "react";
import { currency } from "../utils/format";

interface Props {
  years: number;
  monthlyPremium: number;
  totals: {
    totalPaid: number;
    ilpEnd: number;
    etfEnd: number;
    gap: number;
    investedToDateILP: number;
    investedToDateETF: number;
    totalWelcome: number;
    breakEvenYear: number | null;
  };
}

export default function SummaryCards({ years, monthlyPremium, totals }: Props) {
  const { totalPaid, ilpEnd, etfEnd, gap, investedToDateILP, investedToDateETF, totalWelcome, breakEvenYear } = totals;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 sm:p-5">
        <div className="text-sm text-neutral-400">Total Premiums Paid</div>
        <div className="text-2xl font-semibold">{currency(totalPaid)}</div>
        <div className="text-xs text-neutral-500 mt-1">
          {years} years × {currency(monthlyPremium)} / month
        </div>
      </div>
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 sm:p-5">
        <div className="flex items-baseline justify-between gap-2">
          <div>
            <div className="text-sm text-neutral-400">ILP Ending Value (Net, incl. bonuses)</div>
            <div className="text-2xl font-semibold">{currency(ilpEnd)}</div>
          </div>
          <div className="text-xs text-neutral-500">Invested: {currency(investedToDateILP)} | Welcome: {currency(totalWelcome)}</div>
        </div>
      </div>
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 sm:p-5">
        <div className="flex items-baseline justify-between gap-2">
          <div>
            <div className="text-sm text-neutral-400">Term+ETF Ending Value</div>
            <div className="text-2xl font-semibold">{currency(etfEnd)}</div>
          </div>
          <div className="text-xs text-neutral-500">Invested: {currency(investedToDateETF)}</div>
        </div>
      </div>
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 sm:p-5">
        <div className="text-sm text-neutral-400">Value Gap (Kept by You vs ILP)</div>
        <div className="text-2xl font-semibold">{currency(gap)}</div>
        <div className="text-xs text-neutral-500 mt-1">Break-even milestone: {breakEvenYear ? `Year ${breakEvenYear}` : "N/A"}</div>
      </div>
    </div>
  );
}
