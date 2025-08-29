import React from "react";

/**
 * Accessible FAQ using native <details>/<summary>.
 * - Keyboard and screen-reader friendly.
 * - Minimal JS, fast to render.
 * - Copy within answers should mirror your JSON-LD FAQ content.
 */
type FAQItem = {
    q: string;
    a: React.ReactNode;
    // Optional id for linking
    id?: string;
};

const faqs: FAQItem[] = [
    {
        id: "what-is-ilp-sg",
        q: "What is an ILP in Singapore?",
        a: (
            <div className="space-y-2 text-neutral-300">
                <p>
                    An Investment-Linked Policy (ILP) is a life insurance policy where your premiums buy
                    units in selected investment funds. Part of your premiums also pays for insurance charges
                    (e.g., mortality, riders). Investment values are not guaranteed—returns depend on the
                    underlying funds, while ongoing policy and fund fees reduce performance.
                </p>
                <p>
                    In Singapore, ILPs are regulated by MAS, and distributors must provide a Product
                    Highlights Sheet (PHS). Always review the PHS and policy illustration for fees, allocation
                    rates, and surrender terms before buying.
                </p>
            </div>
        ),
    },
    {
        id: "how-calculator-works",
        q: "How does this ILP Calculator work?",
        a: (
            <div className="space-y-2 text-neutral-300">
                <p>
                    This calculator models cash flows and growth based on your inputs:
                    monthly premium, years, allocation schedule (how much is actually invested vs. charges),
                    welcome/campaign/premium/loyalty bonuses, and net return assumptions.
                </p>
                <p>
                    We compare two paths:
                    <strong> (1) ILP (net, after typical fees/charges)</strong> and{" "}
                    <strong>(2) Term Insurance + low-cost ETF investing</strong>.
                    The chart and summary show ending values, total paid in, bonuses credited, and the “gap”
                    you keep by self-investing vs. an ILP.
                </p>
                <p>
                    We intentionally downplay brochure-style headline growth and emphasize a realistic
                    <em> net after fees</em> outcome, because ongoing costs compound against you.
                </p>
            </div>
        ),
    },
    {
        id: "fees-considered",
        q: "Which fees and charges are considered?",
        a: (
            <div className="space-y-2 text-neutral-300">
                <p>
                    The ILP “Net Return” is auto-derived from the headline rate by subtracting typical costs:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                    <li>
                        <strong>Fund Total Expense Ratio (TER)</strong> — ongoing fund management & administration (e.g., ~1.0–1.5% p.a. for many active ILP funds).
                    </li>
                    <li>
                        <strong>Wrapper / policy charges</strong> — policy/admin fees, cost of insurance, etc.
                    </li>
                    <li>
                        <strong>Trading/cash drag</strong> — spreads, switching, cash balances not fully invested.
                    </li>
                </ul>
                <p>
                    These reduce the headline brochure rate to a more realistic net return. You can still edit
                    the headline and the ETF return to see different scenarios.
                </p>
            </div>
        ),
    },
    {
        id: "bonuses",
        q: "Are ILP welcome or campaign bonuses included?",
        a: (
            <div className="space-y-2 text-neutral-300">
                <p>
                    Yes. You can toggle:
                    <strong> Welcome Bonus</strong> (often a % of first-year invested premiums),
                    <strong> Campaign Bonus</strong> (time-limited promos), and when applicable,
                    <strong> Premium</strong> / <strong>Loyalty Bonuses</strong> (credited from specific policy years).
                </p>
                <p>
                    Bonuses are usually credited as extra units. Once credited, those units are still subject
                    to fees and market risk. Some bonuses “vest” over time or are clawed back on early
                    surrender—always check the Product Summary/PHS.
                </p>
            </div>
        ),
    },
    {
        id: "term-etf-return",
        q: "What net return do you assume for Term + ETF?",
        a: (
            <div className="space-y-2 text-neutral-300">
                <p>
                    The default assumes a long-term net return range typical for broad, low-cost equity ETFs
                    (after fund fees). You can adjust the number to your own view. The key idea is that
                    low-cost ETFs minimize fees, so more of the market’s return accrues to you.
                </p>
                <p>
                    In practice, outcomes vary with asset mix, rebalancing, and investor behavior. This tool
                    is educational and not financial advice.
                </p>
            </div>
        ),
    },
    {
        id: "gwa4-vs-typical",
        q: "Does this calculator support GWA4 vs Typical ILP?",
        a: (
            <div className="space-y-2 text-neutral-300">
                <p>
                    Yes. Use the <strong>Product Preset</strong> dropdown to switch between{" "}
                    <strong>Great Eastern GWA4</strong> mechanics and a <strong>Typical ILP</strong> profile.
                    The preset toggles allocation schedule and bonus timing so you can replicate a typical
                    agent illustration.
                </p>
                <p>
                    You can still fine-tune inputs (e.g., allocation %, headline rate, bonuses) to mirror a
                    specific quote you were shown.
                </p>
            </div>
        ),
    },
    {
        id: "who-should-consider",
        q: "Who should consider an ILP vs Term + ETF?",
        a: (
            <div className="space-y-2 text-neutral-300">
                <p>
                    If your goal is <strong>cost-efficient investing</strong> and you’re comfortable buying a
                    separate Term policy for protection, the Term + ETF route is typically more transparent
                    and cheaper over decades.
                </p>
                <p>
                    ILPs may appeal if you strongly prefer “one combined product” with forced savings, or want
                    specific riders packaged together—but you pay for that convenience through multiple layers
                    of fees and surrender terms. Always compare the long-run compounding impact of fees.
                </p>
            </div>
        ),
    },
    {
        id: "surrender-terms",
        q: "What about surrender charges and early termination?",
        a: (
            <div className="space-y-2 text-neutral-300">
                <p>
                    Many ILPs impose surrender charges, especially in early years, and bonus claw-backs if you
                    terminate before vesting. This can significantly reduce proceeds compared to a pure
                    investment account. Review the policy illustration/PHS for the surrender schedule and any
                    conditions on bonuses.
                </p>
            </div>
        ),
    },
    {
        id: "data-privacy",
        q: "Do you collect personal data when I use this site?",
        a: (
            <div className="space-y-2 text-neutral-300">
                <p>
                    The calculator runs fully in your browser; inputs aren’t sent to a server unless you’ve
                    added analytics. If you use Google Analytics or similar, basic usage stats (page views,
                    device/browser, etc.) may be collected. You can remove or change analytics at any time in{" "}
                    <code>index.html</code>.
                </p>
            </div>
        ),
    },
    {
        id: "disclaimer",
        q: "Is this financial advice?",
        a: (
            <div className="space-y-2 text-neutral-300">
                <p>
                    No—this is an <strong>educational tool</strong>. It simplifies complex product mechanics
                    and uses assumptions that may not match a specific policy. Always read the official
                    documents and consider independent advice before making decisions.
                </p>
            </div>
        ),
    },
];

export default function FAQ() {
    return (
        <section className="px-6 pb-12">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>

                <div className="space-y-3">
                    {faqs.map((item) => (
                        <details
                            key={item.id ?? item.q}
                            className="group rounded-2xl border border-neutral-800 bg-neutral-900 open:bg-neutral-900/80 transition-colors"
                        >
                            <summary
                                className="cursor-pointer list-none px-4 py-3 md:px-5 md:py-4 flex items-center justify-between gap-3"
                                aria-controls={item.id ?? undefined}
                            >
                                <span className="font-medium text-neutral-100">{item.q}</span>
                                <span
                                    className="ml-2 inline-block transition-transform group-open:rotate-180"
                                    aria-hidden="true"
                                >
                                    ▾
                                </span>
                            </summary>
                            <div id={item.id} className="px-4 pb-4 md:px-5 md:pb-5">
                                {item.a}
                            </div>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
}
