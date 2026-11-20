"use client";

import { FormEvent } from "react";
import { ArrowUpRight } from "lucide-react";

export function EnquiryForm() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    window.alert(
      "The enquiry form is a front-end preview. It will be connected to Malachy's secure enquiry and ticketing backend before launch."
    );
  }

  return (
    <div className="contact-card">
      <p className="eyebrow">SEND AN ENQUIRY</p>
      <h3>How can we help?</h3>
      <form className="contact-form" onSubmit={handleSubmit}>
        <label>
          Full name
          <input type="text" name="name" placeholder="Your full name" required />
        </label>
        <label>
          Email address
          <input type="email" name="email" placeholder="you@example.com" required />
        </label>
        <label>
          What is your enquiry about?
          <select name="topic" defaultValue="" required>
            <option value="" disabled>Select a topic</option>
            <option>Opening an account</option>
            <option>Savings</option>
            <option>Business banking</option>
            <option>Loans</option>
            <option>Other enquiry</option>
          </select>
        </label>
        <label>
          Message
          <textarea name="message" rows={4} placeholder="Tell us how we can help..." required />
        </label>
        <button type="submit" className="button button-primary form-button">
          Submit enquiry <ArrowUpRight size={16} />
        </button>
        <p className="form-disclaimer">
          This preview form is not connected to a live submission service.
        </p>
      </form>
    </div>
  );
}
