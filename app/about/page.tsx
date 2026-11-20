import type { Metadata } from "next";
import { ArrowUpRight, HeartHandshake, ShieldCheck, TrendingUp } from "lucide-react";
import { InnerPage, PageCTA } from "@/components/inner-page";
export const metadata: Metadata = { title: "About Us" };
const values = [
  { icon: HeartHandshake, title: "People first", text: "We aim to make every customer interaction respectful, helpful and straightforward." },
  { icon: ShieldCheck, title: "Responsible banking", text: "We believe in clear information, responsible financial services and careful stewardship." },
  { icon: TrendingUp, title: "Built for progress", text: "We want to support personal financial goals and the growth of businesses and communities." },
];
export default function AboutPage() {
  return <InnerPage eyebrow="GET TO KNOW MALACHY" title="A banking partner for what’s next." description="We believe banking should be clear, responsible and centred on the people and businesses it serves." heroImage="/images/photo-1521737711867-e3b97375f902.webp">
    <section className="page-content about-page-content"><div className="container">
      <div className="about-story-grid">
        <div className="about-story-copy"><p className="eyebrow">OUR APPROACH</p><h2>Helping people move forward with confidence.</h2><p className="section-lead">Malachy Microfinance Bank is focused on providing practical financial services for individuals, families and businesses. Our aim is to make everyday banking more approachable while supporting customers as their goals evolve.</p><p className="section-lead">We believe financial services should be understandable, accessible and designed around real needs. From everyday account services to savings and business banking, our focus is on helping customers take their next step with greater confidence.</p><PageCTA label="Start banking with Malachy" /></div>
        <div className="about-story-image"><img src="/images/photo-1556761175-b413da4baf72.webp" alt="Colleagues working together around a table" loading="lazy"/><div className="about-image-caption"><strong>Progress starts with partnership.</strong><span>People, plans and possibilities.</span></div></div>
      </div>
      <div className="about-purpose-band"><div><p className="eyebrow">OUR PURPOSE</p><h2>Making everyday banking more approachable.</h2></div><p>We want customers to feel informed and supported as they save, manage money and build their businesses. Our work is guided by service, responsibility and a commitment to keep improving.</p></div>
      <div className="about-values-heading"><p className="eyebrow">WHAT GUIDES US</p><h2>Principles behind every interaction.</h2></div>
      <div className="page-grid about-values-grid">{values.map(({icon: Icon,title,text})=><article className="value-card" key={title}><span className="value-icon"><Icon size={23}/></span><h3>{title}</h3><p>{text}</p></article>)}</div>
      <div className="about-feature-grid"><div className="about-feature-image"><img src="/images/photo-1556742049-0cfed4f6a45d.webp" alt="Customer making a payment using a bank card" loading="lazy"/></div><div className="about-feature-copy"><p className="eyebrow">LOOKING AHEAD</p><h2>Banking that grows with your goals.</h2><p>As customer needs change, we want to keep making our services more useful, our communication clearer and our digital experiences easier to use.</p><a className="text-link" href="/services">Explore our services <ArrowUpRight size={16}/></a></div></div>
      <div className="about-cta"><div><p className="eyebrow">YOUR NEXT CHAPTER</p><h2>Let’s take the next step together.</h2><p>Explore Malachy’s services or begin an account opening enquiry.</p></div><PageCTA /></div>
    </div></section>
  </InnerPage>;
}
