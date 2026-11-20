import type { AdminRole } from "./admin-roles";

/** Central UI permission policy for the Malachy staff portal prototype.
 * Production APIs must enforce the same policy server-side.
 */
export const applicationRoles = ["super_admin", "junior_it", "customer_service"] as const satisfies readonly AdminRole[];
export const applicationDecisionRoles = ["super_admin", "customer_service"] as const satisfies readonly AdminRole[];
export const supportTicketRoles = ["super_admin", "junior_it"] as const satisfies readonly AdminRole[];

export function canViewApplications(role: AdminRole) {
  return (applicationRoles as readonly string[]).includes(role);
}
export function canEditApplications(role: AdminRole) {
  return canViewApplications(role);
}
export function canDecideApplications(role: AdminRole) {
  return (applicationDecisionRoles as readonly string[]).includes(role);
}
export function canViewSupportTickets(role: AdminRole) {
  return (supportTicketRoles as readonly string[]).includes(role);
}

export function canAccessAdminPath(role: AdminRole, pathname: string) {
  if (pathname === "/admin" || pathname === "/admin/change-password" || pathname === "/admin/login") return true;
  if (pathname === "/admin/applications" || pathname.startsWith("/admin/applications/")) return canViewApplications(role);
  if (pathname === "/admin/tickets" || pathname.startsWith("/admin/tickets/")) return canViewSupportTickets(role);

  const roleRoutes: Record<string, AdminRole[]> = {
    "/admin/customers": ["super_admin", "customer_service", "operations", "head_operations", "compliance", "finance", "auditor"],
    "/admin/approvals": ["super_admin", "head_operations", "compliance", "loans", "finance"],
    "/admin/loans": ["super_admin", "loans", "head_operations", "finance", "auditor"],
    "/admin/transactions": ["super_admin", "teller", "operations", "head_operations", "finance", "auditor"],
    "/admin/careers": ["super_admin", "hr"],
    "/admin/content": ["super_admin", "hr"],
    "/admin/pages": ["super_admin", "junior_it"],
    "/admin/staff": ["super_admin"],
    "/admin/employees": ["super_admin", "hr"],
    "/admin/reports": ["super_admin", "head_operations", "compliance", "finance", "auditor"],
    "/admin/settings": ["super_admin", "junior_it"],
  };
  const route = Object.keys(roleRoutes).find((base) => pathname === base || pathname.startsWith(`${base}/`));
  return route ? roleRoutes[route].includes(role) : false;
}
