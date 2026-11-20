import type { Metadata } from "next";
import { InnerPage } from "@/components/inner-page";
import { AccountOpeningForm } from "@/components/account-opening-form";
export const metadata: Metadata = { title: "Open an Account" };
export default function OpenAccountPage() {
  return <InnerPage eyebrow="GET STARTED WITH MALACHY" title="Let’s get your account journey started." description="Share a few basic details and select the type of account you’re interested in. The full onboarding form will be updated to match Malachy’s approved account-opening template." heroImage="/images/photo-1556742049-0cfed4f6a45d.webp">
    <section className="page-content"><div className="container"><div className="account-form-wrap"><p className="eyebrow">ACCOUNT ENQUIRY</p><h2>Tell us about yourself.</h2><p className="section-lead" style={{ maxWidth: 650, marginBottom: 24 }}>This is a temporary form layout. We will replace or extend these fields when you provide the official account-opening template.</p>
      <AccountOpeningForm />
    </div></div></section>
  </InnerPage>;
}
