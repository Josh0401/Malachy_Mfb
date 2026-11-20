"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, Calculator, Info } from "lucide-react";

const formatNaira = (value: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(value);

export function LoanCalculator() {
  const [amount, setAmount] = useState(500000);
  const [annualRate, setAnnualRate] = useState(18);
  const [months, setMonths] = useState(12);

  const estimate = useMemo(() => {
    const monthlyRate = annualRate / 100 / 12;
    const monthly = monthlyRate === 0
      ? amount / months
      : (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
    return { monthly, total: monthly * months, interest: monthly * months - amount };
  }, [amount, annualRate, months]);

  return (
    <div className="calculator-card">
      <div className="calculator-form">
        <div className="calculator-heading">
          <span className="icon-bubble"><Calculator size={20} /></span>
          <div>
            <p className="eyebrow">PLAN WITH CONFIDENCE</p>
            <h3>Loan repayment calculator</h3>
          </div>
        </div>
        <div className="range-field">
          <div className="range-label"><label htmlFor="loan-amount">How much would you like?</label><strong>{formatNaira(amount)}</strong></div>
          <input id="loan-amount" type="range" min="50000" max="5000000" step="50000" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
          <div className="range-ends"><span>₦50,000</span><span>₦5,000,000</span></div>
        </div>
        <div className="range-field">
          <div className="range-label"><label htmlFor="loan-rate">Illustrative annual interest rate</label><strong>{annualRate}%</strong></div>
          <input id="loan-rate" type="range" min="6" max="36" step="1" value={annualRate} onChange={(e) => setAnnualRate(Number(e.target.value))} />
          <div className="range-ends"><span>6%</span><span>36%</span></div>
        </div>
        <div className="range-field">
          <div className="range-label"><label htmlFor="loan-tenure">Repayment period</label><strong>{months} months</strong></div>
          <input id="loan-tenure" type="range" min="3" max="36" step="3" value={months} onChange={(e) => setMonths(Number(e.target.value))} />
          <div className="range-ends"><span>3 months</span><span>36 months</span></div>
        </div>
        <p className="calculator-note"><Info size={15} /> This is an illustrative estimate using a reducing-balance calculation. Actual rates, fees, eligibility and repayment terms are subject to Malachy&apos;s approved loan products.</p>
      </div>
      <div className="calculator-result">
        <p className="result-label">ESTIMATED MONTHLY REPAYMENT</p>
        <p className="monthly-amount">{formatNaira(estimate.monthly)}</p>
        <div className="result-divider" />
        <div className="result-row"><span>Loan amount</span><strong>{formatNaira(amount)}</strong></div>
        <div className="result-row"><span>Estimated interest</span><strong>{formatNaira(estimate.interest)}</strong></div>
        <div className="result-row"><span>Total repayment</span><strong>{formatNaira(estimate.total)}</strong></div>
        <a className="button button-light result-button" href="/contact">Enquire about a loan <ArrowUpRight size={16} /></a>
      </div>
    </div>
  );
}
