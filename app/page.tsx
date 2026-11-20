import Image from "next/image";
import Link from "next/link";
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, BriefcaseBusiness, Building2,
  CheckCircle2, ChevronRight, Clock3, CreditCard, HandCoins, HeartHandshake,
  Landmark, PiggyBank, ShieldCheck, Sparkles, Wallet,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { LoanCalculator } from "@/components/loan-calculator";

const services = [
  { icon: PiggyBank, title: "Savings accounts", text: "Make room for tomorrow with savings options designed to help you build steadily." },
  { icon: Wallet, title: "Current accounts", text: "Manage your everyday money with convenient account services." },
  { icon: Building2, title: "Business banking", text: "Practical banking support for entrepreneurs and growing businesses." },
  { icon: HandCoins, title: "Loans & credit", text: "Explore financing options for personal needs and business ambitions." },
  { icon: CreditCard, title: "Payments & transfers", text: "Move money and manage everyday payments through supported channels." },
  { icon: Landmark, title: "Fixed deposits", text: "Put funds aside for an agreed period with product terms explained upfront." },
];

const benefits = [
  { icon: ShieldCheck, title: "Your trust matters", text: "We put responsible banking, transparency and the protection of customer information first." },
  { icon: HeartHandshake, title: "People at the centre", text: "Banking should feel clear and approachable. Our goal is to make every interaction count." },
  { icon: Sparkles, title: "Room to grow", text: "From personal savings to business banking, we want to support your next step." },
];

export default function HomePage() {
  return (
    <main id="home">
      <SiteHeader />

      <section className="hero-section">
        <Image
          src="/images/photo-1734255026082-82fdc81991f0.webp"
          alt=""
          fill
          priority
          fetchPriority="high"
          quality={72}
          sizes="100vw"
          className="hero-background-image"
        />
        <div className="hero-orb hero-orb-one" /><div className="hero-orb hero-orb-two" />
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="hero-kicker"><span className="kicker-dot" /> PROSPERITY FOR ALL</div>
            <h1>Make your money move <span>your life forward.</span></h1>
            <p className="hero-description">Whether you&apos;re building your savings, growing a business or planning what comes next, Malachy is here to help you move forward with confidence.</p>
            <div className="hero-actions">
              <Link href="/open-account" className="button button-primary">Open an account <ArrowUpRight size={17} /></Link>
              <Link href="/services" className="button button-outline">Explore our services <ArrowDownRight size={17} /></Link>
            </div>
            <div className="hero-trust"><div className="trust-icon"><ShieldCheck size={17} /></div><span>Thoughtful banking. A future-focused approach.</span></div>
            <p className="hero-motto-line">BANKING THAT MOVES WITH YOU</p>
          </div>
        </div>
        <div className="container hero-bottom"><span>PERSONAL BANKING</span><i /><span>BUSINESS BANKING</span><i /><span>SAVINGS & CREDIT</span><i /><span>PAYMENTS</span></div>
      </section>

      <section className="intro-strip"><div className="container intro-strip-inner"><p>Good banking is more than transactions. It&apos;s about the possibilities they create.</p><Link href="/about" className="text-link">Get to know Malachy <ArrowUpRight size={16}/></Link></div></section>

      <section className="section services-section" id="services">
        <div className="container">
          <div className="section-heading section-heading-row"><div><p className="eyebrow">BANKING FOR REAL LIFE</p><h2>Everything you need to <span>keep moving.</span></h2></div><p className="section-lead">Explore banking services designed around the way you live, work and plan for the future.</p></div>
          <div className="services-grid">
            {services.map((service, index) => {
              const Icon = service.icon;
              return <article className="service-card" key={service.title}><div className="service-card-top"><span className="service-icon"><Icon size={22}/></span><span className="service-number">0{index + 1}</span></div><h3>{service.title}</h3><p>{service.text}</p><Link href="/contact" aria-label={`Enquire about ${service.title}`} className="card-arrow"><ArrowUpRight size={18}/></Link></article>;
            })}
          </div>
          <p className="availability-note">Product availability, eligibility, fees and terms are subject to Malachy&apos;s approved product documentation.</p>
        </div>
      </section>

      <section className="section about-section" id="about">
        <div className="container about-grid">
          <div className="about-visual"><div className="about-image-main"><Image src="/images/photo-1521737711867-e3b97375f902.webp" alt="Colleagues collaborating around a table" fill sizes="(max-width: 900px) 100vw, 48vw" /></div><div className="about-stamp"><span>THE MALACHY<br/>APPROACH</span><ArrowDownRight size={23}/></div><div className="about-caption"><span className="caption-line"/>Here for the journey.</div></div>
          <div className="about-copy"><p className="eyebrow">A BANKING PARTNER FOR WHAT&apos;S NEXT</p><h2>We believe every big future starts with a <span>good step.</span></h2><p>At Malachy Microfinance Bank, our focus is helping individuals, families and businesses access practical financial services that support their goals.</p><p>We believe banking should be clear, responsible and centred on the people who use it. That belief guides how we serve our customers and how we keep building for the future.</p><div className="about-points"><div><CheckCircle2 size={18}/><span>A people-first approach</span></div><div><CheckCircle2 size={18}/><span>Solutions for individuals and businesses</span></div><div><CheckCircle2 size={18}/><span>A commitment to responsible banking</span></div></div><Link href="/about" className="button button-dark">Learn more about us <ArrowUpRight size={16}/></Link></div>
        </div>
      </section>

      <section className="section benefits-section"><div className="container"><div className="section-heading centered-heading"><p className="eyebrow">THE MALACHY DIFFERENCE</p><h2>Banking should work <span>for you.</span></h2><p className="section-lead">The right financial partner listens, makes things clear and helps you take the next step.</p></div><div className="benefits-grid">{benefits.map((benefit) => {const Icon = benefit.icon; return <article className="benefit-card" key={benefit.title}><span className="benefit-icon"><Icon size={23}/></span><h3>{benefit.title}</h3><p>{benefit.text}</p></article>;})}</div></div></section>

      <section className="calculator-section" id="loan-calculator"><div className="container"><div className="section-heading calculator-section-heading"><p className="eyebrow">PLAN YOUR NEXT STEP</p><h2>Explore your borrowing <span>possibilities.</span></h2><p className="section-lead">Use our calculator to get an illustrative idea of what repayments could look like.</p></div><LoanCalculator /></div></section>

      <section className="section business-section"><div className="container business-panel"><div className="business-copy"><p className="eyebrow eyebrow-light">FOR THE PEOPLE BUILDING WHAT&apos;S NEXT</p><h2>Your business has plans. <span>Let&apos;s move them forward.</span></h2><p>From managing everyday finances to exploring funding options, discover banking support for the people and businesses creating opportunities.</p><Link href="/services" className="button button-light">Explore business banking <ArrowUpRight size={16}/></Link></div><div className="business-art"><div className="business-ring ring-one"/><div className="business-ring ring-two"/><div className="business-art-card"><Building2 size={31}/><span>Ideas into action.</span><small>Business banking with purpose</small></div><div className="business-art-dot"/></div></div></section>

      <section className="section insights-section" id="insights"><div className="container"><div className="section-heading section-heading-row"><div><p className="eyebrow">THE MALACHY JOURNAL</p><h2>Ideas for your <span>next move.</span></h2></div><Link href="/blog" className="text-link">Visit our blog <ArrowUpRight size={16}/></Link></div><div className="insights-grid"><article className="insight-card insight-featured"><div className="insight-image insight-image-one"><span>SMART MONEY</span></div><div className="insight-content"><div className="insight-meta"><span>FINANCIAL WELLNESS</span><span><Clock3 size={13}/> 4 MIN READ</span></div><h3>Building a savings habit that works for your life</h3><p>Simple ways to make saving part of your routine, one step at a time.</p><Link href="/blog" className="text-link">Read article <ArrowRight size={15}/></Link></div></article><article className="insight-card"><div className="insight-image insight-image-two"><span>BUSINESS</span></div><div className="insight-content"><div className="insight-meta"><span>SMALL BUSINESS</span><span><Clock3 size={13}/> 5 MIN READ</span></div><h3>Giving your business room to grow</h3><p>Thoughtful financial habits that can help small businesses plan ahead.</p><Link href="/blog" className="text-link">Read article <ArrowRight size={15}/></Link></div></article><article className="insight-card"><div className="insight-image insight-image-three"><span>EVERYDAY BANKING</span></div><div className="insight-content"><div className="insight-meta"><span>MONEY BASICS</span><span><Clock3 size={13}/> 3 MIN READ</span></div><h3>Know what to look for in a bank account</h3><p>A useful checklist for choosing an account that suits your needs.</p><Link href="/blog" className="text-link">Read article <ArrowRight size={15}/></Link></div></article></div><p className="availability-note">These are sample editorial topics. Articles will be published and managed through the admin dashboard.</p></div></section>

      <section className="careers-section" id="careers"><div className="container careers-inner"><div><p className="eyebrow">GROW WITH US</p><h2>Bring your ambition.<br/><span>Build what&apos;s next.</span></h2><p>We&apos;re building a team of thoughtful people who care about customers, communities and better banking.</p></div><Link href="/careers" className="button button-dark">Explore careers <ArrowUpRight size={16}/></Link></div></section>

      <footer className="site-footer"><div className="container"><div className="footer-main"><div className="footer-brand"><div className="footer-logo"><Image src="/malachy-logo.png" alt="Malachy logo" width={92} height={92}/></div><p>Banking designed around your ambitions. Save, spend and grow with Malachy Microfinance Bank.</p></div><div className="footer-column"><h4>Explore</h4><Link href="/about">About us</Link><Link href="/services">Our services</Link><Link href="/blog">Blog & insights</Link><Link href="/careers">Careers</Link></div><div className="footer-column"><h4>Banking</h4><Link href="/services">Savings accounts</Link><Link href="/services">Business banking</Link><Link href="/services">Loan calculator</Link><a href="https://malachymfb.qoreonline.com/" target="_blank" rel="noopener noreferrer">Internet banking <ArrowUpRight size={13}/></a></div><div className="footer-column"><h4>Support</h4><Link href="/contact">Contact us</Link><Link href="/contact">Help & enquiries</Link><Link href="/contact">Report an issue</Link><Link href="/contact">Privacy & security</Link></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Malachy Microfinance Bank. All rights reserved.</span><span>Save. Spend. Grow.</span></div><p className="footer-legal">Website preview. Official contact information, product terms, regulatory disclosures, privacy policy and internet banking destination must be confirmed by Malachy before publication.</p></div></footer>
    </main>
  );
}
