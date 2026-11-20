import type { Metadata } from "next";
import { Clock3 } from "lucide-react";
import Link from "next/link";
import { InnerPage } from "@/components/inner-page";
export const metadata: Metadata = { title: "Blog and Insights" };
const articles = [
  { slug:"building-a-savings-habit", category:"FINANCIAL WELLNESS", read:"4 MIN READ", title:"Building a savings habit that works for your life", text:"Simple ways to make saving part of your routine, one step at a time.", image:"/images/photo-1579621970563-ebec7560ff3e.webp" },
  { slug:"giving-your-business-room-to-grow", category:"SMALL BUSINESS", read:"5 MIN READ", title:"Giving your business room to grow", text:"Thoughtful financial habits that can help small businesses plan ahead.", image:"/images/photo-1497366754035-f200968a6e72.webp" },
  { slug:"choosing-a-bank-account", category:"MONEY BASICS", read:"3 MIN READ", title:"Know what to look for in a bank account", text:"A useful checklist for choosing an account that suits your needs.", image:"/images/photo-1554224155-6726b3ff858f.webp" },
  { slug:"making-a-simple-monthly-budget", category:"MONEY MANAGEMENT", read:"4 MIN READ", title:"Making a simple monthly budget", text:"A practical starting point for understanding what comes in and what goes out.", image:"/images/photo-1460925895917-afdab827c52f.webp" },
  { slug:"separating-business-and-personal-finances", category:"BUSINESS BANKING", read:"6 MIN READ", title:"Why it helps to separate business and personal finances", text:"Simple record-keeping habits that make it easier to understand business performance.", image:"/images/photo-1556761175-b413da4baf72.webp" },
  { slug:"planning-for-a-financial-goal", category:"SAVINGS", read:"3 MIN READ", title:"Turning a financial goal into a savings plan", text:"Break a big goal into smaller, more manageable steps.", image:"/images/photo-1454165804606-c3d57bc86b40.webp" },
];
export default function BlogPage() {
  return <InnerPage eyebrow="MALACHY INSIGHTS" title="Ideas for your financial journey." description="Financial education, practical money tips, bank announcements and stories to help you make informed decisions." heroImage="/images/photo-1497366811353-6870744d04b2.webp">
    <section className="page-content"><div className="container"><div className="blog-intro"><div><p className="eyebrow">THE LATEST FROM MALACHY</p><h2>Knowledge for the decisions ahead.</h2></div><p>Explore practical ideas about saving, everyday banking and running a business. These demonstration articles will be replaced with approved editorial content managed through the admin dashboard.</p></div>
      <div className="blog-grid">{articles.map((article)=><article className="blog-card" key={article.slug}><Link href={`/blog/${article.slug}`} className="blog-image"><img src={article.image} alt="" loading="lazy"/><span>{article.category}</span></Link><div className="blog-card-body"><div className="blog-meta"><span>{article.category}</span><span><Clock3 size={13}/>{article.read}</span></div><h3><Link href={`/blog/${article.slug}`}>{article.title}</Link></h3><p>{article.text}</p><Link href={`/blog/${article.slug}`} className="blog-read-more">Read article <span aria-hidden="true">→</span></Link></div></article>)}</div>
      <p className="availability-note">Demo articles for layout and navigation testing. Content, publication dates and editorial approvals will be managed through the Malachy admin dashboard.</p></div></section>
  </InnerPage>;
}
