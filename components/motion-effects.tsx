"use client";

import { useEffect } from "react";

const GRID_SELECTORS = [
  ".services-grid > *", ".benefits-grid > *", ".insights-grid > *",
  ".page-grid > *", ".about-values-grid > *", ".service-photo-grid > *",
  ".contact-grid > *", ".career-grid > *", ".about-feature-grid > *",
  ".admin-stats > *", ".admin-attention-grid > *", ".admin-content-grid > *",
  ".admin-content-grid > *", ".admin-activity-list > *", ".admin-quick-list > *",
  ".admin-mini-stats > *", ".admin-role-grid > *", ".admin-card-grid > *",
  ".admin-dashboard-grid > *",
];

export function MotionEffects({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    document.documentElement.classList.add("motion-enabled");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (!isIntersecting) return;
        const el = target as HTMLElement;
        el.classList.add("motion-visible");
        observer.unobserve(el);
        if (el.matches(".motion-counter")) animateCounter(el);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -45px 0px" });

    const observed = new WeakSet<Element>();
    const prepare = (el: Element, type: string, delay = 0) => {
      if (observed.has(el)) return;
      observed.add(el);
      const node = el as HTMLElement;
      node.classList.add("motion-target", `motion-${type}`);
      node.style.setProperty("--motion-delay", `${delay}ms`);
      if (type === "typewriter") {
        const textLength = Math.max(8, (node.textContent || "").trim().length);
        node.style.setProperty("--typing-steps", String(Math.min(64, textLength)));
        node.style.setProperty("--typing-duration", `${Math.min(3.1, Math.max(0.85, textLength * 0.035))}s`);
      }
      observer.observe(el);
    };

    const scan = () => {
      // Headings use distinct text-led effects throughout public and staff pages.
      document.querySelectorAll("main h1, .admin-content h1, .page-hero h1").forEach((el) => prepare(el, "typewriter"));
      document.querySelectorAll("main h2, .admin-content h2, .section-heading h2").forEach((el) => prepare(el, "word-reveal"));
      document.querySelectorAll(".hero-kicker, .eyebrow, .admin-eyebrow").forEach((el) => prepare(el, "kicker"));
      document.querySelectorAll(".hero-description, .section-lead, .page-hero p, .contact-copy > p, .about-copy > p").forEach((el) => prepare(el, "soft-reveal"));
      document.querySelectorAll(".hero-background-image, .hero-photo, .about-image-main img, .about-story-image img, .about-feature-image img, .service-photo img, .contact-photo img, .page-hero img, .insight-image img").forEach((el) => prepare(el, "image-reveal"));
      document.querySelectorAll(".hero-orb, .hero-spark, .business-ring, .business-art-dot").forEach((el) => {
        (el as HTMLElement).classList.add("motion-decor");
      });

      GRID_SELECTORS.forEach((selector) => {
        document.querySelectorAll(selector).forEach((el, index) => {
          const mode = index % 4 === 0 ? "slide-left" : index % 4 === 1 ? "slide-up" : index % 4 === 2 ? "slide-right" : "flip-in";
          prepare(el, mode, (index % 4) * 85);
        });
      });

      document.querySelectorAll(".service-card, .benefit-card, .insight-card, .value-card, .service-photo-card, .admin-stat-card, .admin-panel, .admin-attention-card, .admin-activity-row, .admin-role-card").forEach((el, index) => {
        const node = el as HTMLElement;
        node.classList.add("motion-interactive");
        if (node.matches(".admin-stat-card")) {
          const number = node.querySelector(".admin-stat-value, strong, h2");
          if (number && !node.classList.contains("motion-counter")) {
            node.classList.add("motion-counter");
            node.dataset.counterText = number.textContent || "";
            if (!observed.has(node)) prepare(node, "counter");
          }
        }
      });

      document.querySelectorAll(".admin-page-heading, .admin-stat-grid, .admin-panel, .admin-table-wrap, .admin-drawer, .admin-toolbar, .admin-profile-section, .admin-welcome").forEach((el, index) => {
        if (!el.classList.contains("motion-slide-left") && !el.classList.contains("motion-slide-right") && !el.classList.contains("motion-flip-in") && !el.classList.contains("motion-slide-up")) {
          prepare(el, index % 2 ? "slide-right" : "slide-left", (index % 3) * 70);
        }
      });
    };

    const animateCounter = (card: HTMLElement) => {
      const target = card.querySelector<HTMLElement>(".admin-stat-value, strong, h2");
      if (!target || target.dataset.counted === "true") return;
      const original = card.dataset.counterText || target.textContent || "";
      const match = original.match(/^([^0-9]*)([0-9][0-9,]*\.?[0-9]*)(.*)$/);
      if (!match) return;
      const end = Number(match[2].replace(/,/g, ""));
      if (!Number.isFinite(end) || end === 0) return;
      target.dataset.counted = "true";
      const prefix = match[1], suffix = match[3], start = performance.now(), duration = 900;
      const tick = (now: number) => {
        const progress = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - progress, 4);
        const value = end * eased;
        const formatted = Number.isInteger(end) ? Math.round(value).toLocaleString() : value.toFixed(1);
        target.textContent = `${prefix}${formatted}${suffix}`;
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    scan();
    const mutations = new MutationObserver(scan);
    mutations.observe(document.body, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
      mutations.disconnect();
      document.documentElement.classList.remove("motion-enabled");
    };
  }, []);

  return <>{children}</>;
}
