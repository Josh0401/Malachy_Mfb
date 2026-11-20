"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useState } from "react";

const links = [
  ["Home", "/"],
  ["About Us", "/about"],
  ["Services", "/services"],
  ["Blog", "/blog"],
  ["Careers", "/careers"],
  ["Contact Us", "/contact"],
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <Link
          href="/"
          className="brand"
          aria-label="Malachy Microfinance Bank home"
          onClick={() => setOpen(false)}
        >
          <span className="brand-logo-frame">
            <Image
              src="/malachy-logo.png"
              alt="Malachy Microfinance Bank Ltd"
              width={2048}
              height={682}
              priority
              sizes="(max-width: 480px) 160px, (max-width: 800px) 180px, 230px"
            />
          </span>
        </Link>

        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map(([label, href]) => {
            const active = pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));
            return <Link key={label} href={href} target="_self" className={active ? "nav-link active" : "nav-link"}>{label}</Link>;
          })}
        </nav>

        <div className="nav-actions">
          <a href="https://malachymfb.qoreonline.com/" target="_blank" rel="noopener noreferrer" className="internet-link">Internet Banking <ArrowUpRight size={15} /></a>
          <Link href="/open-account" target="_self" className="button button-primary nav-cta">Open an account <ArrowUpRight size={16} /></Link>
        </div>

        <button className="mobile-menu-button" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
          {open ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>

      {open && (
        <div className="mobile-nav">
          {links.map(([label, href]) => {
            const active = pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));
            return <Link key={label} href={href} target="_self" className={active ? "mobile-nav-active" : ""} onClick={() => setOpen(false)}>{label}</Link>;
          })}
          <a href="https://malachymfb.qoreonline.com/" target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>Internet Banking <ArrowUpRight size={15} /></a>
          <Link href="/open-account" target="_self" className="button button-primary" onClick={() => setOpen(false)}>Open an account <ArrowUpRight size={16} /></Link>
        </div>
      )}
    </header>
  );
}
