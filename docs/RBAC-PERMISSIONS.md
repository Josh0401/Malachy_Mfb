# Malachy MFB Staff RBAC Specification

Version: 2.1 — 18 November 2026

This document records the agreed role and feature-access baseline for the staff portal prototype. It is not a substitute for server-side authorisation. Every API endpoint and data query must enforce the same or stricter policy.

## Agreed special access rules

### Account applications
- View: Super Admin, Junior IT Staff, Customer Service.
- Edit: Super Admin, Junior IT Staff, Customer Service.
- Approve/reject: Super Admin and Customer Service only.
- All other roles are denied access to the account application list and detail routes.
- Junior IT may edit application information but cannot make an approval decision.
- Approval/rejection requires a reason and must be recorded in an immutable audit event in production.

### Support tickets
- View/manage: Super Admin and Junior IT Staff only.
- All other roles, including Customer Service, are denied access to the ticket list and detail routes.
- Customer enquiries can still be received through public channels; only IT and Super Admin can access the internal support-ticket workspace under this policy.

### Customer profiles and identity data
- Super Admin: full customer profile and identity data access, including BVN/NIN.
- Compliance/KYC: authorised KYC access, including BVN/NIN reveal, subject to audit logging.
- Customer Service: can edit only email, phone number and address; cannot edit identity information.
- Finance: read-only access to customer name, email, phone and account relationship information needed for financial operations. No BVN/NIN, DOB, gender, address, employment, or next-of-kin sections.
- Other customer-profile access remains role-specific and read-only or limited as configured in the UI.

### Transaction approvals
- Head of Operations and Finance are the principal operational/financial checkers, depending on transaction type and delegated authority.
- Teller adjustments and transaction reversals require Head of Operations and Finance review as configured.
- Loan decisions use the loan-specific checker workflow; Finance review applies to financial disbursement controls where required.
- Maker/checker separation: a staff member cannot approve a request they initiated.

### HR and staff accounts
- HR creates and maintains employee records, recruitment, leave and employment lifecycle information.
- Super Admin has oversight/read access to employee records and exclusively provisions staff login accounts, roles and permissions.
- HR cannot create login credentials or grant application permissions.

## Roles

1. Super Admin — platform-wide administration and privileged access governance.
2. Junior IT Staff — technical support, website/system maintenance, account-application editing, support-ticket handling.
3. Customer Service Officer — customer enquiries, limited customer profile editing, account application editing and application approval/rejection.
4. Teller — branch counter and permitted transaction processing.
5. Operations Officer — operational servicing and permitted account maintenance.
6. Head of Operations — operations supervision and delegated transaction approvals.
7. Loan Officer — loan assessment, recommendations and repayment monitoring.
8. Compliance/KYC Officer — KYC verification, identity checks and compliance monitoring.
9. HR Officer — employee records, recruitment, leave and HR administration.
10. Finance Officer — financial reconciliation, reporting and delegated financial approvals; limited customer profile visibility.
11. Internal Auditor — read-only access to authorised audit evidence and logs.

## Production implementation requirements

- Enforce role and permission checks in Laravel middleware/policies and at service/query level; frontend menu hiding is not security.
- Use individual permissions (view/edit/approve/reject) rather than relying only on broad department roles.
- Log sensitive BVN/NIN reveals, customer edits, application decisions, staff provisioning, role changes and ticket access.
- Encrypt sensitive identity data at rest and in transit; mask it by default; require step-up authentication for privileged reveals.
- Use maker/checker separation, approval limits, branch scoping and dual control where required by bank policy.
- Use secure server-side sessions, CSRF protection, MFA, password hashing, account lockout and session revocation.

## Prototype limitation

The current Next.js demo uses synthetic records and local UI state. These controls demonstrate the intended experience only. They do not provide production security or persistent banking records until the Laravel backend enforces them.
