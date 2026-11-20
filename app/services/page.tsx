import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { InnerPage, PageCTA } from "@/components/inner-page";
export const metadata: Metadata = { title: "Banking Services" };
const products = [
  { slug:"savings-accounts", title:"Savings accounts", text:"Savings options designed to help you build steadily towards your plans.", image:"/images/photo-1579621970563-ebec7560ff3e.webp", tag:"SAVE WITH PURPOSE" },
  { slug:"current-accounts", title:"Current accounts", text:"Everyday account services for managing your money and regular transactions.", image:"/images/photo-1556742049-0cfed4f6a45d.webp", tag:"EVERYDAY BANKING" },
  { slug:"business-sme-banking", title:"Business and SME banking", text:"Practical banking support for entrepreneurs and growing businesses.", image:"/images/photo-1497366754035-f200968a6e72.webp", tag:"BUSINESS GROWTH" },
  { slug:"loans-credit", title:"Loans and credit", text:"Explore financing options subject to eligibility and approved product terms.", image:"/images/photo-1454165804606-c3d57bc86b40.webp", tag:"FUND YOUR PLANS" },
  { slug:"payments-transfers", title:"Payments and transfers", text:"Payment and transfer services through supported banking channels.", image:"/images/photo-1556740749-887f6717d7e4.webp", tag:"MOVE MONEY" },
  { slug:"fixed-deposits", title:"Fixed deposits", text:"Place funds for an agreed period under the applicable deposit terms.", image:"/images/photo-1563013544-824ae1b704d3.webp", tag:"PLAN AHEAD" },
];
export default function ServicesPage() {
 return <InnerPage eyebrow="OUR SERVICES" title="Banking solutions for real life." description="Explore financial services designed around the way you live, work, save and plan for the future." heroImage="/images/photo-1556742049-0cfed4f6a45d.webp">
  <section className="page-content"><div className="container"><div className="services-page-intro"><p className="eyebrow">EXPLORE MALACHY</p><h2>Practical services for your next step.</h2><p>Whether you are managing everyday finances, building savings or running a business, explore the services that may fit your needs.</p></div><div className="service-photo-grid">{products.map((item)=><Link href={`/services/${item.slug}`} className="service-photo-card service-photo-card-link" key={item.title} target="_self" aria-label={`View details about ${item.title}`}><div className="service-photo"><img src={item.image} alt="" loading="lazy"/><span>{item.tag}</span></div><div className="service-photo-copy"><h3>{item.title}</h3><p>{item.text}</p></div><span className="service-card-readmore">View service details <ArrowUpRight size={15}/></span></Link>)}</div><p className="availability-note">Product availability, eligibility, fees and terms are subject to Malachy’s approved product documentation.</p><div className="services-cta"><div><p className="eyebrow">READY TO GET STARTED?</p><h2>Find an account that works for you.</h2><p>Begin an account opening enquiry and the bank can guide you through the next steps.</p></div><PageCTA /></div></div></section>
 </InnerPage>;
}
