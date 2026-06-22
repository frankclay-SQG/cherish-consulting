// SOF-88 — Assessments dedicated page
import { Phone, ChevronRight } from "lucide-react";
import { SiteNav } from "../components/SiteNav";
import { SiteFooter } from "../components/SiteFooter";
import { CookieBanner } from "../components/CookieBanner";

function StarDivider({ count = 3, className = "" }: { count?: number; className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="text-accent select-none" style={{ fontSize: "0.6rem" }}>★</span>
      ))}
    </div>
  );
}

const assessmentTypes = [
  {
    category: "Substance Abuse Assessments",
    items: [
      "Court-ordered DWI / DUI assessments",
      "Pre-treatment substance use evaluations",
      "Alcohol and drug screenings for employment or legal purposes",
      "Comprehensive substance abuse assessments for referral and treatment planning",
    ],
    note: "Required by courts, employers, and licensing boards. Dr. Cherich provides written assessment reports accepted by Tennessee and Virginia courts.",
  },
  {
    category: "Mental Health Assessments",
    items: [
      "Anxiety and depression screenings",
      "PTSD assessments (PCL-5 and clinical interview)",
      "Comprehensive diagnostic evaluations",
      "Mood disorder and behavioral health assessments",
    ],
    note: "Structured assessments with written reports. Suitable for clinical, legal, or administrative purposes.",
  },
  {
    category: "Pre-Employment & Fitness-for-Duty Assessments",
    items: [
      "Pre-employment psychological screenings",
      "Fitness-for-duty evaluations for safety-sensitive roles",
      "Return-to-work mental health clearances",
      "Workplace behavioral health assessments",
    ],
    note: "Structured evaluations producing written documentation for employers, HR departments, and occupational health programs.",
  },
  {
    category: "Veterans Disability-Related Assessments",
    items: [
      "VA disability claims mental health assessments",
      "PTSD assessment for service connection documentation",
      "Functional impairment evaluation for disability ratings",
      "Assessment documentation for nexus letters and DBQs",
    ],
    note: "Specialized assessments for veterans pursuing VA disability compensation. See our Veterans Evaluations page for more detail.",
  },
];

export default function AssessmentsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <SiteNav alwaysSolid />
      <CookieBanner />

      {/* Page header */}
      <div className="pt-16 bg-secondary border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <StarDivider count={3} className="mb-4" />
          <h1
            className="text-4xl md:text-5xl leading-tight text-foreground mb-4"
            style={{ fontFamily: "'Lora', serif", fontWeight: 500 }}
          >
            Assessments &amp;<br />Evaluations
          </h1>
          <p className="text-[0.95rem] text-foreground/60 max-w-xl leading-relaxed mb-6">
            One-time clinical assessments for legal, employment, veterans, and mental health
            purposes — provided by Dr. Carol J. Cherich, PhD, licensed in Tennessee and Virginia.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="tel:3019563185"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground text-xs tracking-widest uppercase hover:opacity-90 transition-opacity"
            >
              <Phone size={12} /> Call to Schedule
            </a>
            <a
              href="#assessment-types"
              className="inline-flex items-center gap-2 px-6 py-3 border border-foreground/20 text-foreground/60 text-xs tracking-widest uppercase hover:bg-secondary transition-colors"
            >
              Assessment Types <ChevronRight size={12} />
            </a>
          </div>
        </div>
      </div>

      {/* Assessment vs Therapy distinction */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-[3fr_2fr] gap-14 lg:gap-20 items-start">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <StarDivider count={3} />
              <span className="text-[10px] tracking-[0.25em] uppercase text-accent font-medium">
                Assessments vs. Therapy
              </span>
            </div>
            <h2
              className="text-3xl md:text-4xl leading-tight text-foreground mb-6"
              style={{ fontFamily: "'Lora', serif", fontWeight: 500 }}
            >
              One-Time Assessment —<br />No Ongoing Commitment Required
            </h2>
            <p className="text-[0.95rem] text-foreground/60 leading-relaxed mb-5">
              Many people who come to Dr. Cherich for an assessment do not need ongoing therapy.
              A clinical assessment is a structured, time-limited service that produces a written
              report — for a court, an employer, the VA, or your own records.
            </p>
            <p className="text-[0.95rem] text-foreground/60 leading-relaxed mb-5">
              Therapy is a separate, ongoing relationship focused on treatment. Assessments and
              therapy serve different purposes — and you can receive an assessment without
              enrolling in therapy.
            </p>
            <p className="text-[0.95rem] text-foreground/60 leading-relaxed mb-8">
              If your court, employer, or VA claim requires a written assessment report, Dr. Cherich
              can provide that service as a standalone engagement.
            </p>
            <div className="border-l-2 border-primary pl-5">
              <p className="text-sm text-foreground/60 italic leading-relaxed">
                "Many of my clients come for a single assessment — a court requirement, a VA
                claim, a job clearance — and leave with the documentation they need. No long-term
                enrollment required."
              </p>
              <p className="text-[10px] text-primary mt-3 tracking-wide uppercase font-semibold">
                — Dr. Carol J. Cherich, PhD
              </p>
            </div>
          </div>

          {/* Quick facts card */}
          <div className="bg-secondary border border-border p-7">
            <div className="w-px h-10 bg-primary/30 mb-6" />
            <p className="text-[10px] tracking-[0.2em] uppercase text-accent font-medium mb-5">
              Assessment Quick Facts
            </p>
            <div className="space-y-4">
              {[
                { label: "Duration", value: "60–90 minutes (typically)" },
                { label: "Format", value: "In-person or telehealth" },
                { label: "Output", value: "Written report or letter" },
                { label: "Turnaround", value: "5–10 business days" },
                { label: "States Served", value: "Tennessee & Virginia" },
                { label: "Therapy Required?", value: "No" },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between items-baseline gap-4 pb-4 border-b border-border last:border-0 last:pb-0">
                  <span className="text-xs text-muted-foreground tracking-wide">{label}</span>
                  <span className="text-sm text-foreground font-medium text-right">{value}</span>
                </div>
              ))}
            </div>
            <a
              href="tel:3019563185"
              className="mt-7 w-full flex items-center justify-center gap-2 px-5 py-3 bg-primary text-primary-foreground text-xs tracking-widest uppercase hover:opacity-90 transition-opacity"
            >
              <Phone size={12} /> 301-956-3185
            </a>
          </div>
        </div>
      </section>

      {/* Assessment types */}
      <section id="assessment-types" className="py-20 bg-secondary border-y border-border">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-4">
            <StarDivider count={3} />
            <span className="text-[10px] tracking-[0.25em] uppercase text-accent font-medium">
              Assessment Types
            </span>
          </div>
          <h2
            className="text-3xl md:text-4xl leading-tight text-foreground mb-5 max-w-lg"
            style={{ fontFamily: "'Lora', serif", fontWeight: 500 }}
          >
            Clinical Assessments Offered
          </h2>
          <p className="text-sm text-foreground/50 max-w-xl leading-relaxed mb-14">
            Dr. Cherich provides written assessment reports accepted by courts, employers,
            licensing boards, and the VA.
          </p>

          <div className="grid sm:grid-cols-2 gap-px bg-border">
            {assessmentTypes.map(({ category, items, note }) => (
              <div key={category} className="bg-secondary p-7 hover:bg-background transition-colors">
                <h3
                  className="text-base font-semibold text-foreground mb-5 leading-snug"
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  {category}
                </h3>
                <ul className="space-y-2.5 mb-5">
                  {items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span className="text-accent flex-shrink-0 mt-0.5 leading-none" style={{ fontSize: "0.55rem" }}>★</span>
                      <span className="text-sm text-foreground/65 leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-muted-foreground leading-relaxed border-t border-border pt-4">
                  {note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <StarDivider count={3} className="justify-center mb-6" />
          <h2
            className="text-3xl leading-tight text-foreground mb-5"
            style={{ fontFamily: "'Lora', serif", fontWeight: 500 }}
          >
            Need an Assessment?
          </h2>
          <p className="text-[0.95rem] text-foreground/55 leading-relaxed max-w-lg mx-auto mb-10">
            Call Dr. Cherich to discuss your assessment needs, confirm eligibility, and schedule.
            Most assessments can be scheduled within 1–2 weeks.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="tel:3019563185"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground text-xs tracking-widest uppercase hover:opacity-90 transition-opacity"
            >
              <Phone size={12} /> 301-956-3185
            </a>
            <a
              href="mailto:drcarol@cherishconsulting.com"
              className="inline-flex items-center gap-2 px-6 py-3 border border-foreground/20 text-foreground/60 text-xs tracking-widest uppercase hover:bg-secondary transition-colors"
            >
              Email Dr. Cherich
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
