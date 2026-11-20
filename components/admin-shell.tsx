"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession, signOut, type DemoSession } from "@/lib/demo-auth";
import { canAccessAdminPath } from "@/lib/admin-permissions";
import type { AdminRole } from "@/lib/admin-roles";
import {
  Activity, Bell, BriefcaseBusiness, Building2, ChevronDown, CircleHelp,
  ClipboardList, FileText, LayoutDashboard, LifeBuoy, Menu, Search, Settings,
  ShieldCheck, Users, Wallet, X, ArrowLeftRight, BarChart3, Landmark,
  Headset, Banknote, ClipboardCheck, MonitorCog, UserCog, FileSearch, LogOut,
} from "lucide-react";

export const roleOptions: { id: AdminRole; label: string; department: string; description: string }[] = [
  { id: "super_admin", label: "Super Admin", department: "IT / Systems", description: "Platform configuration, staff access and audited emergency access." },
  { id: "customer_service", label: "Customer Service", department: "Customer Experience", description: "Customer enquiries, account applications and approved profile updates." },
  { id: "teller", label: "Teller", department: "Branch Operations", description: "Counter workflows and permitted transaction processing." },
  { id: "operations", label: "Operations Officer", department: "Operations", description: "Account servicing, onboarding checks and operational queues." },
  { id: "head_operations", label: "Head of Operations", department: "Operations Management", description: "Operations oversight, approvals and departmental reporting." },
  { id: "junior_it", label: "Junior IT Staff", department: "IT Support", description: "Technical support, application maintenance and IT service desk tasks." },
  { id: "loans", label: "Loan Officer", department: "Loans & Credit", description: "Loan applications, assessments and repayment monitoring." },
  { id: "compliance", label: "Compliance / KYC", department: "Compliance", description: "Identity verification, KYC reviews and compliance cases." },
  { id: "hr", label: "HR Officer", department: "Human Resources", description: "Employee records, recruitment, leave and people administration." },
  { id: "finance", label: "Finance Officer", department: "Finance", description: "Financial reports, reconciliations and authorised financial approvals." },
  { id: "auditor", label: "Internal Auditor", department: "Internal Audit", description: "Read-only review of approved records and audit trails." },
];
const RoleContext = createContext<{ role: AdminRole; user: DemoSession | null; logout: () => void }>({ role: "super_admin", user: null, logout: () => {} });
export const useAdminRole = () => useContext(RoleContext);

const allGroups = [
  { title: "WORKSPACE", items: [
    { label: "Overview", href: "/admin", icon: LayoutDashboard, roles: ["super_admin","customer_service","teller","operations","head_operations","junior_it","loans","compliance","hr","finance","auditor"] },
    { label: "Customers", href: "/admin/customers", icon: Users, roles: ["super_admin","customer_service","operations","head_operations","compliance","finance","auditor"] },
    { label: "Account applications", href: "/admin/applications", icon: ClipboardList, roles: ["super_admin","junior_it","customer_service"] },
    { label: "Approval centre", href: "/admin/approvals", icon: ClipboardCheck, roles: ["super_admin","head_operations","compliance","loans","finance"] },
    { label: "Loan management", href: "/admin/loans", icon: Wallet, roles: ["super_admin","loans","head_operations","finance","auditor"] },
    { label: "Transactions", href: "/admin/transactions", icon: ArrowLeftRight, roles: ["super_admin","teller","operations","head_operations","finance","auditor"] },
  ]},
  { title: "CUSTOMER EXPERIENCE", items: [
    { label: "Careers", href: "/admin/careers", icon: BriefcaseBusiness, roles: ["super_admin","hr"] },
    { label: "Blog & content", href: "/admin/content", icon: FileText, roles: ["super_admin","hr"] },
  ]},
  { title: "IT SUPPORT", items: [
    { label: "Support tickets", href: "/admin/tickets", icon: LifeBuoy, roles: ["super_admin","junior_it"] },
    { label: "Website pages", href: "/admin/pages", icon: Building2, roles: ["super_admin","junior_it"] },
  ]},
  { title: "DEPARTMENT TOOLS", items: [

    { label: "Audit & reports", href: "/admin/reports", icon: FileSearch, roles: ["super_admin","head_operations","compliance","finance","auditor"] },
  ]},
  { title: "PEOPLE MANAGEMENT", items: [
    { label: "Employee records", href: "/admin/employees", icon: Users, roles: ["super_admin","hr"] },
  ]},
  { title: "SYSTEM ADMINISTRATION", items: [
    { label: "Staff & permissions", href: "/admin/staff", icon: ShieldCheck, roles: ["super_admin"] },
    { label: "Settings", href: "/admin/settings", icon: Settings, roles: ["super_admin","junior_it"] },
  ]},
];

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [user, setUser] = useState<DemoSession | null>(null);
  const [ready, setReady] = useState(false);
  const role = user?.role ?? "super_admin";
  const activeRole = roleOptions.find(item => item.id === role)!;
  const groups = useMemo(() => allGroups.map(group => ({ ...group, items: group.items.filter(item => item.roles.includes(role)) })).filter(group => group.items.length), [role]);
  const activeLabel = groups.flatMap(g => g.items).find(i => i.href === pathname || (i.href !== "/admin" && pathname.startsWith(i.href)))?.label ?? "Overview";
  const routeAllowed = user ? canAccessAdminPath(user.role, pathname) : false;

  useEffect(() => {
    const current = getSession();
    setUser(current);
    setReady(true);
    if (pathname === "/admin/login") {
      if (current) router.replace("/admin");
      return;
    }
    if (!current) {
      router.replace("/admin/login");
      return;
    }
    if (current?.mustChangePassword && pathname !== "/admin/change-password") { router.replace("/admin/change-password"); return; }
    if (pathname === "/admin/change-password") return;
    if (!canAccessAdminPath(current.role, pathname)) router.replace("/admin");
  }, [pathname, router]);

  const logout = () => { signOut(); setUser(null); router.replace("/admin/login"); };
  if (pathname === "/admin/login" || pathname === "/admin/change-password") return <>{children}</>;
  if (!ready || !user) return <div className="admin-auth-loading"><span className="admin-auth-spinner"/><p>Securing your workspace…</p></div>;
  if (!routeAllowed) return <div className="admin-auth-loading"><ShieldCheck size={30}/><strong>Access restricted</strong><p>Your staff role does not have permission to view this workspace.</p><Link className="admin-primary-button" href="/admin">Return to your dashboard</Link></div>;

  return <RoleContext.Provider value={{ role, user, logout }}><div className="admin-shell">
    <aside className={`admin-sidebar ${mobileOpen ? "mobile-open" : ""}`}>
      <Link href="/" className="admin-brand" onClick={() => setMobileOpen(false)}>
        <span className="admin-logo"><Image src="/malachy-logo.png" alt="Malachy logo" width={54} height={54} priority /></span>
        <span><strong>Malachy</strong><small>DEPARTMENT PORTAL</small></span>
      </Link>
      <div className="admin-role-summary"><span className="admin-role-icon"><ShieldCheck size={16}/></span><div><strong>{activeRole.label}</strong><small>{activeRole.department}</small></div></div>
      <div className="admin-nav">
        {groups.map(group => <div className="admin-nav-group" key={group.title}>
          <p>{group.title}</p>
          {group.items.map(item => { const Icon = item.icon; const active = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href); return <Link href={item.href} key={`${group.title}-${item.label}`} onClick={() => setMobileOpen(false)} className={`admin-nav-item ${active ? "selected" : ""}`}><Icon size={17}/><span>{item.label}</span>{item.href === "/admin/tickets" && <i>03</i>}</Link>; })}
        </div>)}
      </div>
      <div className="admin-sidebar-bottom">
        <div className="admin-help"><CircleHelp size={18}/><span><strong>Need help?</strong><small>Contact your system administrator</small></span></div>
        <div className="admin-user"><div className="admin-avatar">{user.name.split(" ").map(x=>x[0]).slice(0,2).join("")}</div><span><strong>{user.name}</strong><small>{user.jobTitle}</small></span><button className="admin-logout-button" onClick={logout} title="Sign out" aria-label="Sign out"><LogOut size={15}/></button></div>
      </div>
    </aside>
    {mobileOpen && <button className="admin-mobile-scrim" aria-label="Close navigation" onClick={() => setMobileOpen(false)} />}
    <section className="admin-main">
      <header className="admin-topbar">
        <div className="admin-top-left"><button className="admin-mobile-menu" aria-label="Open navigation" onClick={() => setMobileOpen(true)}><Menu size={20}/></button><div className="admin-breadcrumb">Workspace <span>/</span> <strong>{activeLabel}</strong></div></div>
        <div className="admin-top-actions">
          <div className="admin-signed-in"><strong>{user.name}</strong><small>{activeRole.label} · {user.staffId}</small></div>
          <button className="admin-mobile-search" aria-label="Toggle search" onClick={() => setSearchOpen(v => !v)}><Search size={17}/></button>
          <label className={`admin-search ${searchOpen ? "search-open" : ""}`}><Search size={16}/><input placeholder="Search dashboard" aria-label="Search dashboard" onKeyDown={e => { if (e.key === "Escape") setSearchOpen(false); }}/></label>
          <button className="admin-icon-button" aria-label="Notifications"><Bell size={18}/><i/></button>
          <div className="admin-top-avatar">{user.name.split(" ").map(x=>x[0]).slice(0,2).join("")}</div>
          <button className="admin-top-logout" onClick={logout}>Sign out</button>
        </div>
      </header>
      <div className="admin-content">
        {children}
        <footer className="admin-footer"><span>© 2026 Malachy Microfinance Bank</span><span>Secure operations workspace · Preview</span></footer>
      </div>
    </section>
  </div></RoleContext.Provider>;
}
