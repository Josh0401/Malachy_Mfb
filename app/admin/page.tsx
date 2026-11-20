"use client";
import Link from "next/link";
import { useAdminRole, roleOptions } from "@/components/admin-shell";
import { Activity, ArrowDownLeft, ArrowUpRight, ArrowLeftRight, ClipboardList, LifeBuoy, Users, Wallet, Clock3, ChevronRight, ShieldCheck, FileSearch, BarChart3, BriefcaseBusiness, FileText, Landmark } from "lucide-react";

const statsByRole: Record<string, {label:string;value:string;note:string;icon:any;tone:string}[]> = {
 super_admin:[
  {label:"Total customers",value:"2,450",note:"Sample bank-wide record count",icon:Users,tone:"green"},
  {label:"Pending applications",value:"38",note:"Awaiting operational review",icon:ClipboardList,tone:"gold"},
  {label:"Open support tickets",value:"16",note:"Across departmental queues",icon:LifeBuoy,tone:"blue"},
  {label:"Loan applications",value:"24",note:"Awaiting credit review",icon:Wallet,tone:"purple"}],
 customer_service:[
  {label:"Applications to review",value:"18",note:"Account opening requests",icon:ClipboardList,tone:"gold"},
  {label:"Customer profiles",value:"2,450",note:"Permitted service view",icon:Users,tone:"green"},
  {label:"Profile updates",value:"12",note:"Sample contact detail requests",icon:Activity,tone:"blue"},
  {label:"Customer enquiries",value:"24",note:"Sample service follow-ups",icon:Clock3,tone:"purple"}],
 teller:[
  {label:"Transactions today",value:"128",note:"Sample branch activity",icon:ArrowLeftRight,tone:"green"},
  {label:"Pending authorisations",value:"4",note:"Awaiting checker review",icon:ClipboardList,tone:"gold"},
  {label:"Cash adjustments",value:"2",note:"Sample open requests",icon:Wallet,tone:"blue"},
  {label:"Service exceptions",value:"1",note:"Requires supervisor review",icon:Activity,tone:"purple"}],
 operations:[
  {label:"Operational requests",value:"38",note:"Sample department workload",icon:ClipboardList,tone:"gold"},
  {label:"Customer updates",value:"21",note:"Awaiting processing",icon:Users,tone:"green"},
  {label:"Pending approvals",value:"12",note:"Submitted for checker review",icon:ShieldCheck,tone:"blue"},
  {label:"Operational exceptions",value:"5",note:"Require attention",icon:Activity,tone:"purple"}],
 head_operations:[
  {label:"Pending approvals",value:"12",note:"Across operational teams",icon:ShieldCheck,tone:"gold"},
  {label:"Operational requests",value:"38",note:"Awaiting departmental review",icon:ClipboardList,tone:"green"},
  {label:"Service exceptions",value:"5",note:"Open operational issues",icon:Activity,tone:"blue"},
  {label:"Department tickets",value:"16",note:"Sample support workload",icon:LifeBuoy,tone:"purple"}],
 junior_it:[
  {label:"IT service tickets",value:"9",note:"Assigned technical queue",icon:LifeBuoy,tone:"blue"},
  {label:"Unassigned tickets",value:"3",note:"Awaiting ownership",icon:Clock3,tone:"gold"},
  {label:"Website updates",value:"4",note:"Sample pending content tasks",icon:Activity,tone:"green"},
  {label:"System alerts",value:"2",note:"Sample alerts for review",icon:ShieldCheck,tone:"purple"}],
 loans:[
  {label:"Loan applications",value:"24",note:"Sample assigned queue",icon:Wallet,tone:"green"},
  {label:"Credit assessments",value:"9",note:"Awaiting assessment",icon:ClipboardList,tone:"gold"},
  {label:"Repayment follow-ups",value:"12",note:"Sample accounts to review",icon:Activity,tone:"blue"},
  {label:"Pending decisions",value:"5",note:"Awaiting authorised checker",icon:ShieldCheck,tone:"purple"}],
 compliance:[
  {label:"Pending KYC",value:"42",note:"Sample verification queue",icon:ShieldCheck,tone:"gold"},
  {label:"Compliance reviews",value:"18",note:"Identity checks required",icon:ClipboardList,tone:"green"},
  {label:"Compliance cases",value:"6",note:"Sample open cases",icon:FileSearch,tone:"blue"},
  {label:"Escalations",value:"2",note:"Require attention",icon:Activity,tone:"purple"}],
 hr:[
  {label:"Employee records",value:"86",note:"Sample people directory",icon:Users,tone:"green"},
  {label:"Open vacancies",value:"4",note:"Sample recruitment listings",icon:BriefcaseBusiness,tone:"gold"},
  {label:"Onboarding",value:"3",note:"New employee records",icon:ClipboardList,tone:"blue"},
  {label:"HR requests",value:"7",note:"Sample pending requests",icon:Activity,tone:"purple"}],
 finance:[
  {label:"Reconciliation items",value:"14",note:"Sample items to review",icon:Landmark,tone:"green"},
  {label:"Pending approvals",value:"6",note:"Finance-related check queue",icon:ShieldCheck,tone:"gold"},
  {label:"Teller adjustments",value:"2",note:"Awaiting review",icon:Wallet,tone:"blue"},
  {label:"Reports",value:"8",note:"Sample reporting tasks",icon:BarChart3,tone:"purple"}],
 auditor:[
  {label:"Audit items",value:"18",note:"Sample review workpapers",icon:FileSearch,tone:"green"},
  {label:"Open findings",value:"3",note:"Sample control observations",icon:ShieldCheck,tone:"gold"},
  {label:"Evidence requests",value:"7",note:"Awaiting supporting records",icon:ClipboardList,tone:"blue"},
  {label:"Review activity",value:"24",note:"Sample records in scope",icon:Activity,tone:"purple"}],
};
const activity = [
  { title: "New account application received", detail: "Individual savings account · Demo customer", time: "12 minutes ago", icon: ClipboardList },
  { title: "Support ticket updated", detail: "Card and payment enquiry · Ticket #MFB-1042", time: "38 minutes ago", icon: LifeBuoy },
  { title: "Customer profile created", detail: "Business account · Demo customer", time: "1 hour ago", icon: Users },
  { title: "Loan application submitted", detail: "SME working capital · Demo customer", time: "2 hours ago", icon: Wallet },
];
export default function AdminOverview() {
  const { role } = useAdminRole();
  const activeRole = roleOptions.find(item => item.id === role)!;
  const stats = statsByRole[role] ?? statsByRole.super_admin;
  const canSeeApplications = ["super_admin","junior_it","customer_service"].includes(role);
  const canSeeTickets = ["super_admin","junior_it"].includes(role);
  const visibleActivity = activity.filter(item => (!item.title.toLowerCase().includes("account application") || canSeeApplications) && (!item.title.toLowerCase().includes("support ticket") || canSeeTickets));
  const roleIntro: Record<string, string> = { super_admin: "Platform health, access governance and bank-wide operations overview.", customer_service: "Customer enquiries, account applications and permitted customer profile updates.", teller: "Your branch counter workspace and assigned service activity.", operations: "Account servicing, onboarding checks and operational work queues.", head_operations: "Department performance, approvals and operational exceptions.", junior_it: "IT support requests, website operations and technical service health.", loans: "Loan applications, credit assessments and repayment follow-up.", compliance: "KYC reviews, identity verification and compliance exceptions.", hr: "Staff administration, recruitment and people operations.", finance: "Financial reporting, reconciliation and finance operations.", auditor: "Read-only oversight, control evidence and audit activity." };
  return <>
    <div className="admin-welcome"><div><p className="admin-eyebrow">{activeRole.department.toUpperCase()} WORKSPACE</p><h1>{activeRole.label} dashboard</h1><p>{roleIntro[role]}</p></div><div className="admin-date-chip"><Clock3 size={15}/> Wednesday, 18 November 2026</div></div>
    <div className="admin-stats">{stats.map(stat => { const Icon = stat.icon; return <article className="admin-stat-card" key={stat.label}><div className="admin-stat-top"><span>{stat.label}</span><i className={stat.tone}><Icon size={18}/></i></div><strong className="admin-stat-value">{stat.value}</strong><small>{stat.note}</small></article>; })}</div>
    <div className="admin-content-grid"><section className="admin-panel admin-activity"><div className="admin-panel-heading"><div><h2>Recent activity</h2><p>Latest updates across your workspace</p></div><span className="admin-muted-link">Live feed preview</span></div><div className="admin-activity-list">{visibleActivity.map((item,i) => { const Icon=item.icon; return <div className="admin-activity-row" key={item.title}><span className="admin-activity-icon"><Icon size={17}/></span><div><strong>{item.title}</strong><p>{item.detail}</p></div><time>{item.time}</time></div>; })}</div></section>
      <section className="admin-panel admin-quick"><div className="admin-panel-heading"><div><h2>Quick actions</h2><p>Go straight to a work queue</p></div></div><div className="admin-quick-list">{({super_admin:[["/admin/staff","Manage staff accounts",Users],["/admin/approvals","Approval centre",ShieldCheck],["/admin/tickets","Support tickets",LifeBuoy],["/admin/reports","View reports",BarChart3]],customer_service:[["/admin/customers","Find a customer",Users],["/admin/applications","View applications",ClipboardList]],teller:[["/admin/transactions","Transaction workspace",ArrowLeftRight],["/admin/approvals","Approval requests",ShieldCheck]],operations:[["/admin/customers","Find a customer",Users],["/admin/approvals","Submit for approval",ShieldCheck]],head_operations:[["/admin/approvals","Review approvals",ShieldCheck],["/admin/reports","Department reports",BarChart3]],junior_it:[["/admin/applications","Account applications",ClipboardList],["/admin/tickets","IT service desk",LifeBuoy],["/admin/settings","System settings",Activity],["/admin/pages","Website pages",FileText]],loans:[["/admin/loans","Loan applications",Wallet],["/admin/approvals","Loan decisions",ShieldCheck]],compliance:[["/admin/approvals","Review requests",ClipboardList],["/admin/reports","Compliance reports",BarChart3]],hr:[["/admin/employees","Employee records",Users],["/admin/careers","Recruitment listings",BriefcaseBusiness],["/admin/content","Manage blog content",FileText]],finance:[["/admin/transactions","Reconciliation",ArrowLeftRight],["/admin/loans","Loan records",Wallet],["/admin/approvals","Finance approvals",ShieldCheck]],auditor:[["/admin/reports","Audit reports",FileSearch],["/admin/customers","Customer records",Users],["/admin/transactions","Transaction records",ArrowLeftRight]]} as Record<string,[string,string,any][]>)[role].map(([href,label,Icon])=><Link href={href} key={href}><span><Icon size={17}/></span><strong>{label}</strong><ChevronRight size={15}/></Link>)}</div></section></div>
    <section className="admin-panel admin-queue"><div className="admin-panel-heading"><div><h2>Items requiring attention</h2><p>Prioritised work across your permitted workspace</p></div>{canSeeApplications&&<Link href="/admin/applications" className="admin-text-link">View applications <ArrowUpRight size={14}/></Link>}</div><div className="admin-attention-grid">{canSeeApplications&&<Link href="/admin/applications" className="admin-attention-card"><span className="admin-attention-icon gold"><ClipboardList size={18}/></span><div><strong>Account applications</strong><small>38 waiting for review</small></div><b>38</b><ChevronRight size={16}/></Link>}{canSeeTickets&&<Link href="/admin/tickets" className="admin-attention-card"><span className="admin-attention-icon green"><LifeBuoy size={18}/></span><div><strong>Unassigned tickets</strong><small>3 need an owner</small></div><b>03</b><ChevronRight size={16}/></Link>}{["super_admin","loans","head_operations","finance","auditor"].includes(role)&&<Link href="/admin/loans" className="admin-attention-card"><span className="admin-attention-icon blue"><Wallet size={18}/></span><div><strong>Loan assessments</strong><small>24 in the review queue</small></div><b>24</b><ChevronRight size={16}/></Link>}</div></section>
  </>;
}
