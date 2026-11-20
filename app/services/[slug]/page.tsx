import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { InnerPage, PageCTA } from "@/components/inner-page";

const services = {
  "savings-accounts": {
    title: "Savings accounts",
    eyebrow: "SAVE WITH PURPOSE",
    description: "Build a savings habit with an account designed to help you set money aside and work towards your goals.",
    image: "/images/photo-1579621970563-ebec7560ff3e.webp",
    intro: "A savings account can help you organise your money, prepare for planned expenses and build a financial cushion over time.",
    benefits: ["A place to keep money set aside for future needs", "Account information and transaction records", "Access to applicable savings options and terms"],
    note: "Specific interest rates, minimum balances, fees and withdrawal conditions will be published once Malachy's approved product terms are confirmed."
  },
  "current-accounts": {
    title: "Current accounts",
    eyebrow: "EVERYDAY BANKING",
    description: "Everyday account services to help you manage incoming funds, payments and regular transactions.",
    image: "/images/photo-1556742049-0cfed4f6a45d.webp",
    intro: "A current account is designed for day-to-day money management. It can support regular deposits, withdrawals and eligible payment services.",
    benefits: ["Manage everyday account activity", "Keep track of account transactions", "Access supported banking channels and services"],
    note: "Eligibility, account charges, limits and available transaction channels are subject to the bank's approved terms."
  },
  "business-sme-banking": {
    title: "Business and SME banking",
    eyebrow: "BUSINESS GROWTH",
    description: "Practical banking support for entrepreneurs, traders and growing businesses.",
    image: "/images/photo-1497366754035-f200968a6e72.webp",
    intro: "Running a business means balancing daily transactions with longer-term plans. Malachy's business banking offering is intended to support businesses as they manage their finances and plan for growth.",
    benefits: ["Banking options for eligible registered businesses", "Support for day-to-day business finances", "Access to relevant savings, payment and credit products"],
    note: "Business account opening is subject to documentation, beneficial ownership checks and the bank's onboarding requirements."
  },
  "loans-credit": {
    title: "Loans and credit",
    eyebrow: "FUND YOUR PLANS",
    description: "Explore financing options for eligible personal and business needs, subject to assessment and approval.",
    image: "/images/photo-1454165804606-c3d57bc86b40.webp",
    intro: "Credit can help customers address planned expenses or pursue business opportunities when it is appropriate and affordable. Applications are assessed against the bank's credit policy.",
    benefits: ["Explore available loan products", "Estimate repayments with the loan calculator", "Submit an application for assessment"],
    note: "A calculator estimate is not an offer or approval. Rates, fees, eligibility, collateral and repayment terms are confirmed by the bank."
  },
  "payments-transfers": {
    title: "Payments and transfers",
    eyebrow: "MOVE MONEY",
    description: "Manage eligible payments and transfers through banking channels supported by Malachy.",
    image: "/images/photo-1556740749-887f6717d7e4.webp",
    intro: "Reliable payment services help customers move money and manage everyday financial commitments. Available services depend on the channels and payment partners enabled by the bank.",
    benefits: ["Access supported transfer services", "Make eligible payments through approved channels", "Keep track of transaction references and records"],
    note: "Transfer limits, charges, processing times and supported payment types will be displayed in the relevant banking channel."
  },
  "fixed-deposits": {
    title: "Fixed deposits",
    eyebrow: "PLAN AHEAD",
    description: "Set funds aside for an agreed period under the bank's applicable fixed-deposit terms.",
    image: "/images/photo-1563013544-824ae1b704d3.webp",
    intro: "A fixed deposit may suit customers who can set aside funds for a defined period. Before placing a deposit, customers should understand the maturity date and applicable conditions.",
    benefits: ["Choose from available deposit tenures", "Understand the applicable return and maturity terms", "Receive information about renewal and early liquidation conditions"],
    note: "Rates, minimum placement amounts, tenure options and early liquidation rules must be confirmed in Malachy's approved product schedule."
  }
} as const;

type ServiceSlug = keyof typeof services;

export function generateStaticParams() {
  return Object.keys(services).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = services[slug as ServiceSlug];
  return { title: service ? service.title : "Banking Service" };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services[slug as ServiceSlug];
  if (!service) notFound();

  return (
    <InnerPage eyebrow={service.eyebrow} title={service.title} description={service.description} heroImage={service.image}>
      <section className="page-content">
        <div className="container service-detail-layout">
          <div className="service-detail-main">
            <Link href="/services" className="article-back" target="_self"><ArrowLeft size={15}/> All services</Link>
            <p className="eyebrow">HOW IT CAN HELP</p>
            <h2>{service.title}, made clearer.</h2>
            <p className="section-lead service-detail-intro">{service.intro}</p>
            <div className="service-detail-benefits">
              {service.benefits.map((benefit) => <div key={benefit}><CheckCircle2 size={19}/><span>{benefit}</span></div>)}
            </div>
            <div className="service-detail-note">{service.note}</div>
            <div className="service-detail-actions"><PageCTA label="Enquire about this service"/><Link href="/contact" className="text-link" target="_self">Contact Malachy <ArrowUpRight size={15}/></Link></div>
          </div>
          <aside className="service-detail-image"><img src={service.image} alt={`${service.title} at Malachy Microfinance Bank`} loading="lazy"/><div><span className="eyebrow">MALACHY MICROFINANCE BANK</span><h3>Save. Spend. Grow.</h3><p>Banking designed around your ambitions.</p></div></aside>
        </div>
      </section>
    </InnerPage>
  );
}
