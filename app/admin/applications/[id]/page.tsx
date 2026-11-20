"use client";
import Link from "next/link";
import { use, useState, type FormEvent } from "react";
import { ArrowLeft, CheckCircle2, FileText, LockKeyhole, Pencil, Save, ShieldCheck, X, XCircle } from "lucide-react";
import { useAdminRole } from "@/components/admin-shell";
import { canDecideApplications, canEditApplications } from "@/lib/admin-permissions";

type ApplicationStatus = "Pending review" | "Under review" | "Awaiting customer" | "Approved" | "Rejected";
type Applicant = { name:string; email:string; phone:string; accountType:string; address:string; date:string };

export default function ApplicationDetailPage({params}:{params:Promise<{id:string}>}) {
  const {id}=use(params);
  const {role}=useAdminRole();
  const canEdit=canEditApplications(role);
  const canDecide=canDecideApplications(role);
  const [applicant,setApplicant]=useState<Applicant>({name:"Amina Okafor",email:"amina.okafor@example.test",phone:"080 0000 4821",accountType:"Individual Savings",address:"Ikeja, Lagos State",date:"18 November 2026"});
  const [draft,setDraft]=useState(applicant);
  const [editing,setEditing]=useState(false);
  const [status,setStatus]=useState<ApplicationStatus>("Pending review");
  const [decision,setDecision]=useState<"Approved"|"Rejected"|null>(null);
  const [reason,setReason]=useState("");
  const [saved,setSaved]=useState(false);
  const [error,setError]=useState("");

  function save(e:FormEvent){e.preventDefault();setError("");if(!draft.name.trim()||!draft.email.trim()||!draft.phone.trim()){setError("Name, email and phone number are required.");return;}setApplicant(draft);setEditing(false);setSaved(true);}
  function confirmDecision(){if(!decision||reason.trim().length<12)return;setStatus(decision);setDecision(null);setReason("");}

  return <>
    <Link href="/admin/applications" className="admin-back-link"><ArrowLeft size={15}/> Back to applications</Link>
    <div className="admin-page-heading"><div><p className="admin-eyebrow">APPLICATION REVIEW · {id}</p><h1>Account application</h1><p>Review applicant information, update the application and record an authorised decision.</p></div><span className={`admin-pill ${status==="Approved"?"success":status==="Rejected"?"danger":status==="Awaiting customer"?"warning":"info"}`}>{status}</span></div>
    {saved&&<div className="admin-action-notice"><CheckCircle2 size={15}/> Application changes saved in this local preview.</div>}
    <div className="admin-detail-grid">
      <section className="admin-panel">
        <div className="admin-panel-heading"><div><h2>Applicant information</h2><p>Customer details submitted with the application</p></div>{canEdit&&!editing&&<button className="admin-outline-button" onClick={()=>{setDraft(applicant);setEditing(true)}}><Pencil size={14}/> Edit application</button>}</div>
        {editing?<form className="admin-application-edit-form" onSubmit={save}>
          <label>Applicant full name<input value={draft.name} onChange={e=>setDraft(v=>({...v,name:e.target.value}))} required/></label>
          <label>Email address<input type="email" value={draft.email} onChange={e=>setDraft(v=>({...v,email:e.target.value}))} required/></label>
          <label>Phone number<input value={draft.phone} onChange={e=>setDraft(v=>({...v,phone:e.target.value}))} required/></label>
          <label>Requested account type<select value={draft.accountType} onChange={e=>setDraft(v=>({...v,accountType:e.target.value}))}><option>Individual Savings</option><option>Current Account</option><option>Target Savings</option><option>Business Current</option><option>SME Account</option><option>Fixed Deposit</option></select></label>
          <label>Residential / business address<textarea rows={3} value={draft.address} onChange={e=>setDraft(v=>({...v,address:e.target.value}))}/></label>
          {error&&<p className="malachy-auth-error">{error}</p>}
          <div className="admin-application-form-actions"><button type="button" className="admin-outline-button" onClick={()=>{setEditing(false);setError("")}}>Cancel</button><button className="admin-primary-button" type="submit"><Save size={14}/> Save changes</button></div>
        </form>:<dl className="admin-detail-list"><div><dt>Applicant name</dt><dd>{applicant.name}</dd></div><div><dt>Application reference</dt><dd>{id}</dd></div><div><dt>Requested account</dt><dd>{applicant.accountType}</dd></div><div><dt>Email address</dt><dd>{applicant.email}</dd></div><div><dt>Phone number</dt><dd>{applicant.phone}</dd></div><div><dt>Address</dt><dd>{applicant.address}</dd></div><div><dt>Submitted</dt><dd>{applicant.date}</dd></div></dl>}
        {!canEdit&&<div className="admin-sensitive-notice"><LockKeyhole size={15}/> Your role has view-only access to this application.</div>}
      </section>
      <section className="admin-panel">
        <div className="admin-panel-heading"><div><h2>Onboarding checklist</h2><p>Illustrative review steps</p></div></div>
        <div className="admin-checklist"><p><CheckCircle2/> Application received</p><p><CheckCircle2/> Contact details supplied</p><p><FileText/> Identity verification <span>Awaiting integration</span></p><p><ShieldCheck/> Compliance screening <span>Awaiting integration</span></p></div>
        <div className="admin-action-notice">Approval must only happen after identity verification, required KYC/AML checks and any other applicable onboarding controls are complete.</div>
        {canDecide&&status==="Pending review"&&<div className="admin-application-decision-actions"><p>Authorised decision</p><div><button className="admin-primary-button" onClick={()=>setDecision("Approved")}><CheckCircle2 size={14}/> Approve application</button><button className="admin-outline-button admin-reject-button" onClick={()=>setDecision("Rejected")}><XCircle size={14}/> Reject application</button></div></div>}
        {!canDecide&&status==="Pending review"&&<div className="admin-sensitive-notice"><LockKeyhole size={15}/> You can edit this application, but only Super Admin and Customer Service can approve or reject it.</div>}
        {status!=="Pending review"&&<div className="admin-action-notice"><ShieldCheck size={15}/> This application has been marked {status.toLowerCase()} in the local preview.</div>}
      </section>
    </div>
    {decision&&<div className="admin-drawer-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)setDecision(null)}}><section className="admin-decision-modal"><div className="admin-drawer-head"><div><p className="admin-eyebrow">APPLICATION DECISION</p><h2>{decision} application?</h2></div><button onClick={()=>setDecision(null)} aria-label="Close"><X size={17}/></button></div><div className="admin-sensitive-notice"><ShieldCheck size={15}/> This decision will be recorded in the local preview. Production must record the staff ID, timestamp and decision reason in a server-side audit log.</div><label className="admin-decision-label">Decision reason <span>Required · at least 12 characters</span><textarea rows={4} value={reason} onChange={e=>setReason(e.target.value)} placeholder={decision==="Approved"?"Confirm the checks completed and basis for approval.":"Explain why the application is being rejected."}/></label><div className="admin-decision-actions"><button className="admin-outline-button" onClick={()=>setDecision(null)}>Cancel</button><button className="admin-primary-button" disabled={reason.trim().length<12} onClick={confirmDecision}>Confirm {decision.toLowerCase()}</button></div></section></div>}
  </>;
}
