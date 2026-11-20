"use client";

import type { FormEvent } from "react";
import { useState } from "react";

export function AccountOpeningForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <form className="account-form" onSubmit={handleSubmit}>
      <label>Full name<input name="fullName" type="text" placeholder="Enter your full name" required /></label>
      <label>Email address<input name="email" type="email" placeholder="you@example.com" required /></label>
      <label>Phone number<input name="phone" type="tel" placeholder="Enter your phone number" required /></label>
      <label>Account type<select name="accountType" defaultValue="" required><option value="" disabled>Select account type</option><option>Individual savings</option><option>Individual current</option><option>Business / SME</option><option>Group account</option></select></label>
      <label className="full">Anything you would like us to know? <textarea name="notes" rows={4} placeholder="Optional message" /></label>
      <div className="form-note full">Please do not enter your BVN, NIN, passwords, PINs or other sensitive identity or banking information in this temporary form. This preview does not transmit or store your details. The official secure onboarding process will be configured after Malachy approves the account-opening template and verification provider.</div>
      <button className="button button-primary full" type="submit">Continue account enquiry</button>
      {submitted && <p className="form-note full" role="status">Thank you. This is a design preview only; your details have not been sent to Malachy. The form will be connected after the official onboarding template is approved.</p>}
    </form>
  );
}
