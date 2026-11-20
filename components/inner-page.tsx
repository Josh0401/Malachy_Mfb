import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";

export function InnerPage({
  eyebrow,
  title,
  description,
  heroImage,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  heroImage: string;
  children: React.ReactNode;
}) {
  return (
    <main>
      <SiteHeader />
      <section className="page-hero">
        <Image src={heroImage} alt="" fill priority quality={72} sizes="100vw" className="page-hero-background" />
        <div className="container page-hero-content">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
      </section>
      {children}
      <footer className="site-footer">
        <div className="container">
          <div className="footer-main">
            <div className="footer-brand">
              <div className="footer-logo"><Image src="/malachy-logo.png" alt="Malachy logo" width={112} height={116} /></div>
              <p>Banking designed around your ambitions. Save, spend and grow with Malachy Microfinance Bank.</p>
            </div>
            <div className="footer-column"><h4>Explore</h4><Link href="/about">About us</Link><Link href="/services">Our services</Link><Link href="/blog">Blog</Link><Link href="/careers">Careers</Link></div>
            <div className="footer-column"><h4>Banking</h4><Link href="/open-account">Open an account</Link><Link href="/services">Banking services</Link><a href="https://malachymfb.qoreonline.com/" target="_blank" rel="noopener noreferrer">Internet banking <ArrowUpRight size={13}/></a></div>
            <div className="footer-column"><h4>Support</h4><Link href="/contact">Contact us</Link><Link href="/contact">Help & enquiries</Link></div>
          </div>
          <div className="footer-bottom"><span>© {new Date().getFullYear()} Malachy Microfinance Bank. All rights reserved.</span><span>Save. Spend. Grow.</span></div>
          <p className="footer-legal">Website preview. Official contact information, product terms, regulatory disclosures and service destinations must be confirmed by Malachy before publication.</p>
        </div>
      </footer>
    </main>
  );
}

export function PageCard({ title, text, image, eyebrow, href }: { title: string; text: string; image?: string; eyebrow?: string; href?: string }) {
  return (
    <article className={`page-card ${image ? "page-card-image" : ""}`}>
      {image && <div className="page-card-image-wrap"><img src={image} alt="" loading="lazy" /></div>}
      <div className="page-card-body">
        {eyebrow && <p className="card-eyebrow">{eyebrow}</p>}
        <h3>{title}</h3><p>{text}</p>
        {href && <Link className="text-link page-card-link" href={href}>Read more <ArrowUpRight size={15} /></Link>}
      </div>
    </article>
  );
}

export function PageCTA({ label = "Open an account" }: { label?: string }) {
  return <Link href="/open-account" className="button button-primary">{label} <ArrowUpRight size={16} /></Link>;
}
