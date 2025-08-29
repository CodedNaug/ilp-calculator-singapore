import React, { useMemo, useState } from "react";
import AssumptionsPanel from "../components/AssumptionsPanel";
import SummaryCards from "../components/SummaryCards";
import GrowthChart from "../components/GrowthChart";
import { useProjectionEngine } from "../hooks/useProjectionEngine";
import type { PlanChoice, ProductPreset } from "../types";
import FAQ from "../components/FAQ";

export default function ILPTruthPage() {
  const [monthlyPremium, setMonthlyPremium] = useState(1000);
  const [years, setYears] = useState(20);
  const [planChoice, setPlanChoice] = useState<PlanChoice>(15);
  const [productPreset, setProductPreset] = useState<ProductPreset>("Typical ILP");

  const [y1AllocPct, setY1AllocPct] = useState(100);
  const [y2AllocPct, setY2AllocPct] = useState(100);
  const [laterAllocPct, setLaterAllocPct] = useState(100);

  const [welcomeBonusPct, setWelcomeBonusPct] = useState(55);
  const [campaignBonusPct, setCampaignBonusPct] = useState(20);
  const [loyaltyRatePct, setLoyaltyRatePct] = useState(0.3); // 0.30%
  const [premiumBonusRatePct, setPremiumBonusRatePct] = useState(2);

  const [ilpNetReturnPct, setIlpNetReturnPct] = useState(4);
  const [etfNetReturnPct, setEtfNetReturnPct] = useState(8);
  const [headlineGrossPct, setHeadlineGrossPct] = useState(8);
  const [monthlyTermPremium, setMonthlyTermPremium] = useState(30);

  const ilpAllocationSchedulePct = useMemo(() => {
    const arr = [y1AllocPct, y2AllocPct];
    for (let i = 2; i < years; i++) arr.push(laterAllocPct);
    return arr;
  }, [y1AllocPct, y2AllocPct, laterAllocPct, years]);

  const { data, totals } = useProjectionEngine({
    monthlyPremium,
    monthlyTermPremium,
    years,
    planChoice,
    ilpAllocationSchedulePct,
    welcomeBonusPct,
    campaignBonusPct,
    loyaltyRatePct,
    premiumBonusRatePct,
    ilpNetReturnPct,
    etfNetReturnPct,
    headlineGrossPct,
  });

  const applyPreset = (preset: ProductPreset) => {
    setProductPreset(preset);
    if (preset === "GWA4") {
      setY1AllocPct(100);
      setY2AllocPct(100);
      setLaterAllocPct(100);
      setWelcomeBonusPct(55);
      setCampaignBonusPct(20);
      setPremiumBonusRatePct(2);
      setLoyaltyRatePct(0.3);
      setPlanChoice(15);
    } else {
      setY1AllocPct(40);
      setY2AllocPct(80);
      setLaterAllocPct(95);
      setWelcomeBonusPct(0);
      setCampaignBonusPct(0);
      setPremiumBonusRatePct(0);
      setLoyaltyRatePct(0);
      setPlanChoice(15);
    }
  };

  const setOptimisticAgentPitch = () => {
    setWelcomeBonusPct(55);
    setCampaignBonusPct(20);
    setEtfNetReturnPct(7.8);
    setHeadlineGrossPct(9);
  };

  const setConservativePitch = () => {
    setWelcomeBonusPct(25);
    setCampaignBonusPct(0);
    setEtfNetReturnPct(5);
    setHeadlineGrossPct(6);
  };

  React.useEffect(() => {
    applyPreset(productPreset);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <header className="px-6 py-10 md:py-14 bg-gradient-to-b from-neutral-900 to-neutral-950">
        <div className="max-w-6xl mx-auto text-center">
          {/* Main SEO headline */}
          <h1 className="text-3xl md:text-5xl font-bold max-w-3xl mx-auto">
            ILP Calculator for Singapore
          </h1>

          {/* Supporting headings */}
          <h2 className="mt-4 text-xl md:text-2xl font-semibold">
            Compare ILPs vs Term + ETF
          </h2>
          <h2 className="mt-2 text-lg md:text-xl text-neutral-300">
            How much do ILPs really cost?
          </h2>

          <p className="mt-4 text-neutral-300 max-w-3xl mx-auto">
            Free calculator to model Investment-Linked Policies (ILPs) in Singapore.
            Adjust premiums, bonuses, and fees to see how ILPs compare against
            buying Term Insurance plus investing in low-cost ETFs.
          </p>
        </div>
      </header>

      <section className="px-4 py-6 md:py-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <AssumptionsPanel
              productPreset={productPreset}
              applyPreset={applyPreset}
              monthlyPremium={monthlyPremium}
              setMonthlyPremium={setMonthlyPremium}
              years={years}
              setYears={setYears}
              planChoice={planChoice}
              setPlanChoice={setPlanChoice}
              y1AllocPct={y1AllocPct}
              setY1AllocPct={setY1AllocPct}
              y2AllocPct={y2AllocPct}
              setY2AllocPct={setY2AllocPct}
              laterAllocPct={laterAllocPct}
              setLaterAllocPct={setLaterAllocPct}
              welcomeBonusPct={welcomeBonusPct}
              setWelcomeBonusPct={setWelcomeBonusPct}
              campaignBonusPct={campaignBonusPct}
              setCampaignBonusPct={setCampaignBonusPct}
              ilpNetReturnPct={ilpNetReturnPct}
              setIlpNetReturnPct={setIlpNetReturnPct}
              etfNetReturnPct={etfNetReturnPct}
              setEtfNetReturnPct={setEtfNetReturnPct}
              headlineGrossPct={headlineGrossPct}
              setHeadlineGrossPct={setHeadlineGrossPct}
              setOptimisticAgentPitch={setOptimisticAgentPitch}
              setConservativePitch={setConservativePitch}
              monthlyTermPremium={monthlyTermPremium}
              setMonthlyTermPremium={setMonthlyTermPremium}
            />
          </div>
          <div className="lg:col-span-1">
            <SummaryCards years={years} monthlyPremium={monthlyPremium} monthlyTermPremium={monthlyTermPremium} totals={totals} />
          </div>
        </div>
      </section>

      <section className="px-6 pb-8">
        <div className="max-w-6xl mx-auto">
          <GrowthChart data={data} />
        </div>
      </section>

      <FAQ />

      <footer className="px-6 pb-12">
        <div className="max-w-6xl mx-auto text-xs text-neutral-400">
          <p className="mb-1">
            Educational only. Defaults approximate GWA4 mechanics; for exact terms see the Product Summary/PHS. Past performance is not
            indicative of future results.
          </p>
          <p>© {new Date().getFullYear()} ILP Transparency Project.</p>
        </div>
      </footer>
    </div>
  );
}
