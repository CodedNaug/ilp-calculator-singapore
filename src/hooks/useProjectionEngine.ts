import { useMemo } from "react";
import { p2d } from "../utils/percent";
import type { PlanChoice } from "../types";

export type EngineInputs = {
  monthlyPremium: number;
  years: number;
  planChoice: PlanChoice;
  ilpAllocationSchedulePct: number[]; // per-year %
  welcomeBonusPct: number;
  campaignBonusPct: number;
  loyaltyRatePct: number;      // % of base end value
  premiumBonusRatePct: number; // % of annual premium
  ilpNetReturnPct: number;
  etfNetReturnPct: number;
  headlineGrossPct: number;
};

export function useProjectionEngine(inputs: EngineInputs) {
  const {
    monthlyPremium, years, planChoice, ilpAllocationSchedulePct,
    welcomeBonusPct, campaignBonusPct, loyaltyRatePct, premiumBonusRatePct,
    ilpNetReturnPct, etfNetReturnPct, headlineGrossPct,
  } = inputs;

  const annualPremium = monthlyPremium * 12;
  const premiumBonusStartByPlan: Record<PlanChoice, number> = { 5: 6, 10: 11, 15: 16 };

  const data = useMemo(() => {
    let ilpVal = 0, ilpHeadlineVal = 0, etfVal = 0;
    const rows: Array<{
      year: number;
      ilpValue: number;
      ilpHeadline: number;
      etfValue: number;
      ilpInvestedToDate: number;
      etfInvestedToDate: number;
      bonusUnits: number;
      loyaltyUnits: number;
    }> = [];

    const ilpNet = p2d(ilpNetReturnPct);
    const etfNet = p2d(etfNetReturnPct);
    const headlineGross = p2d(headlineGrossPct);
    const loyaltyRate = p2d(loyaltyRatePct);
    const premiumBonusRate = p2d(premiumBonusRatePct);

    for (let y = 1; y <= years; y++) {
      const allocPct = ilpAllocationSchedulePct[Math.min(y - 1, ilpAllocationSchedulePct.length - 1)] ?? 0;
      const alloc = p2d(allocPct);
      const ilpInvest = annualPremium * alloc;
      const etfInvest = annualPremium;

      const welcomeUnits = y === 1 ? ilpInvest * p2d(welcomeBonusPct) : 0;
      const campaignUnits = y === 1 ? ilpInvest * p2d(campaignBonusPct) : 0;
      const premiumBonusUnits = y >= premiumBonusStartByPlan[planChoice] ? annualPremium * premiumBonusRate : 0;

      const ilpBaseEnd = (ilpVal + ilpInvest + welcomeUnits + campaignUnits + premiumBonusUnits) * (1 + ilpNet);
      const loyaltyStart = planChoice === 15 ? 15 : 10;
      const loyaltyUnits = y >= loyaltyStart ? ilpBaseEnd * loyaltyRate : 0;
      ilpVal = ilpBaseEnd + loyaltyUnits;

      const ilpHeadlineBaseEnd = (ilpHeadlineVal + ilpInvest + welcomeUnits + campaignUnits + premiumBonusUnits) * (1 + headlineGross);
      const ilpHeadlineLoyalty = y >= loyaltyStart ? ilpHeadlineBaseEnd * loyaltyRate : 0;
      ilpHeadlineVal = ilpHeadlineBaseEnd + ilpHeadlineLoyalty;

      etfVal = (etfVal + etfInvest) * (1 + etfNet);

      rows.push({
        year: y,
        ilpValue: ilpVal,
        ilpHeadline: ilpHeadlineVal,
        etfValue: etfVal,
        ilpInvestedToDate: (rows[y - 2]?.ilpInvestedToDate || 0) + ilpInvest,
        etfInvestedToDate: (rows[y - 2]?.etfInvestedToDate || 0) + etfInvest,
        bonusUnits: welcomeUnits + campaignUnits + premiumBonusUnits,
        loyaltyUnits,
      });
    }

    return rows;
  }, [years, monthlyPremium, planChoice, ilpAllocationSchedulePct, welcomeBonusPct, campaignBonusPct, premiumBonusRatePct, ilpNetReturnPct, etfNetReturnPct, headlineGrossPct, loyaltyRatePct]);

  const finalRow = data[data.length - 1];
  const totalPaid = annualPremium * years;
  const ilpEnd = finalRow?.ilpValue ?? 0;
  const etfEnd = finalRow?.etfValue ?? 0;
  const gap = etfEnd - ilpEnd;
  const investedToDateILP = finalRow?.ilpInvestedToDate ?? 0;
  const investedToDateETF = finalRow?.etfInvestedToDate ?? 0;
  const totalWelcome = annualPremium * p2d(ilpAllocationSchedulePct[0] ?? 0) * (p2d(welcomeBonusPct) + p2d(campaignBonusPct));

  const breakEvenYear = (() => {
    const threshold = monthlyPremium;
    for (const r of data) if (r.etfValue - r.ilpValue >= threshold) return r.year;
    return null;
  })();

  return {
    data,
    totals: { totalPaid, ilpEnd, etfEnd, gap, investedToDateILP, investedToDateETF, totalWelcome, breakEvenYear },
  } as const;
}
