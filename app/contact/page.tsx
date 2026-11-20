import type { Metadata } from "next";
import { InnerPage } from "@/components/inner-page";
import { EnquiryForm } from "@/components/enquiry-form";
import { Mail, MapPin, Phone } from "lucide-react";
export const metadata: Metadata = { title: "Contact Us" };
export default function ContactPage() {
 return <InnerPage eyebrow="CONTACT MALACHY" title="Your next step starts with a conversation." description="Have a question about an account, a service or how to get started? Send an enquiry to the Malachy team." heroImage="/images/photo-1521791136064-7986c2920216.webp">
  <section className="page-content"><div className="container"><div className="contact-page-intro"><p className="eyebrow">WE’RE READY TO LISTEN</p><h2>How can we help you today?</h2><p>Send us a message using the form. Official contact details and branch information will be added once confirmed by the bank.</p></div><div className="contact-grid"><div className="contact-copy"><div className="contact-photo"><img src="/images/photo-1525186402429-b4ff38bedec6.webp" alt="Customer support representative ready to help" loading="lazy"/></div><h3>Talk to the Malachy team.</h3><p>Choose the topic that best describes your enquiry so it can be directed to the appropriate team.</p><div className="contact-detail"><span><Phone size={18}/></span><div><small>CALL US</small><strong>Contact details to be confirmed</strong></div></div><div className="contact-detail"><span><Mail size={18}/></span><div><small>EMAIL US</small><strong>Email address to be confirmed</strong></div></div><div className="contact-detail"><span><MapPin size={18}/></span><div><small>VISIT US</small><strong>Branch address to be confirmed</strong></div></div></div><EnquiryForm /></div></div></section>
 </InnerPage>;
}
