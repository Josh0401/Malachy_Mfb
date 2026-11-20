import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, LockKeyhole, ShieldCheck } from "lucide-react";
import { InnerPage } from "@/components/inner-page";
export const metadata: Metadata = { title: "Internet Banking" };
export default function InternetBankingPage() {
 return <InnerPage eyebrow="SECURE BANKING" title="Your banking, wherever you are." description="Access Malachy’s internet banking service through the bank’s approved secure banking portal." heroImage="/images/photo-1556742049-0cfed4f6a45d.webp">
  <section className="page-content"><div className="container"><div className="internet-banking-layout"><div className="internet-banking-image"><img src="/images/photo-1516321318423-f06f85e504b3.webp" alt="Person using a laptop for online banking" loading="lazy"/></div><div className="internet-banking-copy"><p className="eyebrow">BANK WITH CONFIDENCE</p><h2>Access your account securely.</h2><p className="section-lead">Access Malachy’s internet banking platform through our secure Qore Online portal.</p><div className="security-note"><ShieldCheck size={21}/><p>Always check that you are using the bank’s official website before entering your login details. Never share your password, PIN or one-time passcode.</p></div><a href="https://malachymfb.qoreonline.com/" target="_blank" rel="noopener noreferrer" className="button button-primary"><LockKeyhole size={16}/> Open Internet Banking <ArrowUpRight size={15}/></a><p className="availability-note">You’ll be redirected to Malachy’s secure internet banking portal in a new tab.</p><Link href="/contact" className="text-link">Need help? Contact us <ArrowUpRight size={15}/></Link></div></div></div></section>
 </InnerPage>;
}
