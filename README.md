# Malachy Microfinance Bank Website

A fresh Next.js 15 App Router project for the Malachy MFB public website and initial admin dashboard preview.

## Requirements

- Node.js 20.9 or later
- npm

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Routes

- `/` — Homepage
- `/about` — About Malachy
- `/services` — Banking services
- `/blog` — Blog and insights preview
- `/careers` — Careers and vacancies preview
- `/contact` — Contact and enquiry form preview
- `/open-account` — Temporary account enquiry form (to be replaced with Malachy's approved account-opening template)
- `/internet-banking` — Placeholder until the official internet banking URL is supplied
- `/admin` — Initial admin dashboard UI preview (not connected to a live backend)

## Brand assets

- `public/malachy-logo.png` is the supplied Malachy logo with its black background made transparent. The artwork itself has not been redesigned.
- `app/icon.png` is a favicon derived from the supplied logo symbol.
- `public/malachy-logo.jpeg` is retained as the original uploaded source image.

## Important implementation notes

- The account enquiry form is a front-end preview only. It does not transmit or store submitted information.
- Do not collect BVN, NIN, passwords, PINs or other sensitive identity/banking data until the bank-approved onboarding flow and secure verification integrations are implemented.
- The contact form and admin dashboard are previews and require a secure Laravel backend before production use.
- Replace the internet banking placeholder with the bank's verified official destination before launch.
- Confirm product descriptions, fees, eligibility, disclosures, contact information and regulatory details with Malachy before publication.

## Homepage hero image
The homepage hero uses a full-width photographic background (not a separate image card). The image depicts everyday market activity at Bodija Market, Ibadan, Nigeria, photographed by Tunde Buremo and published on Unsplash under the Unsplash License:
https://unsplash.com/photos/a-group-of-people-standing-around-a-table-filled-with-tomatoes-cnVn4Gg4b00

The image is requested in WebP format from Unsplash. The hero uses a dark green overlay to keep the headline and calls to action legible. The original Malachy logo is unchanged.


## Performance notes

- Next.js image optimisation is enabled; do not add `images.unoptimized: true`.
- Homepage and inner-page hero photographs use `next/image` with `priority`, responsive `sizes`, and a moderate quality setting.
- Below-the-fold photography retains lazy loading and requests WebP from Unsplash.
- Removed the render-blocking Google Fonts CSS import; the site now uses a system font stack to avoid a third-party font request.
- Remote Unsplash images are optimised and cached by the Next.js image service in production.

### Lighthouse testing

Do not use `next dev` for a representative Lighthouse score. Run:

```bash
npm install
npm run build
npm start
```

Then audit `http://localhost:3000` in a clean Incognito window with extensions disabled. Clear site data / IndexedDB before the run, and use the same Lighthouse device and throttling settings when comparing results.


## Local image setup

All website image references now point to `/images/...` instead of remote Unsplash URLs. The image binaries are downloaded from their original Unsplash image sources on your machine so the same photographs are preserved, then converted to compressed WebP using Sharp. Run this once from the project root while connected to the internet:

```bash
npm install
npm run images:download
npm run dev
```

The downloader stores WebP image assets in `public/images/`. It skips files that are already present and can be rerun safely if a download is interrupted. For production, commit the downloaded assets to the project repository so deployment does not depend on the downloader or external image hosts.


## Admin dashboard phase 2

The admin portal now includes an operational UI prototype for overview, customer directory, account applications, and support tickets. All records shown are synthetic demo data. No live customer, KYC, account, loan, or transaction data is connected. Approval, export, assignment, and outbound customer messaging remain disabled until the authenticated Laravel backend, staff roles, maker-checker controls, audit logging, and BankOne integration are implemented.

### Admin preview routes

- `/admin` — operations overview
- `/admin/customers` — searchable customer directory and sample profile drawer
- `/admin/applications` — searchable onboarding queue
- `/admin/applications/APP-2026-038` — sample application review and onboarding checklist
- `/admin/tickets` — searchable support queue
- `/admin/tickets/MFB-1042` — sample ticket conversation and reply composer
- `/admin/loans`, `/admin/transactions`, `/admin/content`, `/admin/careers`, `/admin/pages`, `/admin/staff`, `/admin/reports`, `/admin/settings` — roadmap placeholders

The admin interface is currently a frontend prototype. Sample figures, names, messages and statuses are illustrative only. Reply composition is not delivered to a customer, and approval, export, account creation, assignment, transaction and loan actions are not connected. Before production, implement authenticated staff sessions, granular role-based permissions, maker-checker approval, CSRF protection, rate limiting, immutable audit events, secure document handling, and backend validation. Do not use this prototype with real customer information.

## Maker–Checker approval centre (prototype)

The admin preview includes `/admin/approvals`. The Approval Centre demonstrates a two-person review workflow for account openings, customer identity amendments, loan decisions, teller adjustments and transaction reversals. A maker cannot approve their own request; decisions require a reason. Checker roles are scoped by request category. Super Admin can view the queue but does not automatically receive business approval authority.

**Prototype only:** approval state is held in client-side memory and resets on refresh. No account, loan, payment or transaction is executed or changed. Before production, implement server-side RBAC and maker/checker enforcement, durable approval records, immutable audit events, evidence storage, step-up authentication, dual control for high-risk actions, and idempotent integration with the core banking system. Never rely on frontend role switching as an access-control mechanism.


## V6 — Motion system

The global motion layer now uses multiple animation styles across public pages and the staff dashboard:
- Typewriter-style reveal for page and dashboard headings.
- Masked upward reveal for section headings.
- Kicker tracking/slide-in and soft blur-to-focus copy reveals.
- Alternating left, right, upward and 3D flip entrances for content grids.
- Clipped image reveals and a separate hero background pan.
- Dashboard statistic count-up animation.
- Floating decorative accents, animated icon feedback, hover lift and drawer transitions.
- IntersectionObserver-based activation so off-screen content does not animate until it approaches the viewport.
- `prefers-reduced-motion` support.

No animation library was added.
