// SOF-87 — Veterans Claims Evaluations dedicated page
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

const evalTypes = [
  {
    title: "VA Disability Claims Evaluation",
    desc: "A comprehensive mental health evaluation documenting symptoms, diagnosis, and functional impairment to support a VA disability compensation claim. Provides the clinical foundation your claim needs.",
  },
  {
    title: "Nexus Letters",
    desc: "A written medical opinion connecting your current condition to your military service — a critical document for establishing service connection with the VA.",
  },
  {
    title: "DBQ Completion (Disability Benefits Questionnaire)",
    desc: "Completion of VA-required DBQ forms for mental health conditions including PTSD, depression, anxiety, and adjustment disorders. Dr. Cherich completes DBQs as a licensed private clinician.",
  },
  {
    title: "Independent Medical Opinion (IMO)",
    desc: "An expert clinical opinion independent of VA examiners — often used when VA ratings are disputed or when additional evidence is needed for a higher-level review or Board of Veterans' Appeals.",
  },
];

const differentiators = [
  {
    label: "Therapy / Treatment",
    desc: "Ongoing clinical sessions focused on symptom relief, coping skills, and long-term wellbeing. Billed through insurance (where applicable). Not oriented toward documentation for claims.",
  },
  {
    label: "Evaluation / Assessment",
    desc: "A structured, time-limited evaluation producing written documentation — diagnosis, severity ratings, nexus opinions, or DBQs. Oriented toward supporting a VA claim or other legal/administrative process.",
  },
];

export default function VeteransEvaluationsPage() {
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
            Veterans Claims<br />Evaluations
          </h1>
          <p className="text-[0.95rem] text-foreground/60 max-w-xl leading-relaxed mb-6">
            Independent mental health evaluations, nexus letters, and DBQ completion for veterans
            pursuing VA disability claims — provided by Dr. Carol J. Cherich, PhD, a former
            active-duty military medic and licensed clinician.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="tel:3019563185"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground text-xs tracking-widest uppercase hover:opacity-90 transition-opacity"
            >
              <Phone size={12} /> Call to Schedule
            </a>
            <a
              href="#what-to-expect"
              className="inline-flex items-center gap-2 px-6 py-3 border border-foreground/20 text-foreground/60 text-xs tracking-widest uppercase hover:bg-secondary transition-colors"
            >
              What to Expect <ChevronRight size={12} />
            </a>
          </div>
        </div>
      </div>

      {/* Therapy vs Evaluation distinction */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-4">
            <StarDivider count={3} />
            <span className="text-[10px] tracking-[0.25em] uppercase text-accent font-medium">
              Understanding the Difference
            </span>
          </div>
          <h2
            className="text-3xl md:text-4xl leading-tight text-foreground mb-5 max-w-xl"
            style={{ fontFamily: "'Lora', serif", fontWeight: 500 }}
          >
            Evaluation Services vs. Therapy
          </h2>
          <p className="text-sm text-foreground/50 max-w-xl leading-relaxed mb-14">
            Many veterans need evaluation documentation — not ongoing therapy. These are distinct
            services with different purposes, timelines, and outcomes.
          </p>

          <div className="grid md:grid-cols-2 gap-px bg-border mb-14">
            {differentiators.map(({ label, desc }) => (
              <div key={label} className="bg-background p-8 hover:bg-secondary transition-colors group">
                <div className="flex items-center gap-2.5 mb-5">
                  <span className="text-accent" style={{ fontSize: "0.55rem" }}>★</span>
                  <h3 className="text-sm font-semibold text-foreground tracking-wide">{label}</h3>
                </div>
                <p className="text-[0.9rem] text-foreground/55 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <p className="text-sm text-foreground/50 max-w-2xl leading-relaxed border-l-2 border-primary pl-5">
            Dr. Cherich offers <strong className="text-foreground/70 font-medium">both</strong> services. If you need an evaluation for a claims purpose,
            that does not require ongoing therapy enrollment. Call to discuss which service fits
            your situation.
          </p>
        </div>
      </section>

      {/* Evaluation types */}
      <section className="py-20 bg-secondary border-y border-border">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-4">
            <StarDivider count={3} />
            <span className="text-[10px] tracking-[0.25em] uppercase text-accent font-medium">
              Evaluation Services
            </span>
          </div>
          <h2
            className="text-3xl md:text-4xl leading-tight text-foreground mb-14 max-w-lg"
            style={{ fontFamily: "'Lora', serif", fontWeight: 500 }}
          >
            What Veterans Claims Evaluations Include
          </h2>
          <div className="grid sm:grid-cols-2 gap-px bg-border">
            {evalTypes.map(({ title, desc }) => (
              <div key={title} className="bg-secondary p-7 hover:bg-background transition-colors group">
                <div className="flex items-center gap-2.5 mb-4">
                  <span className="text-accent flex-shrink-0" style={{ fontSize: "0.55rem" }}>★</span>
                  <h3 className="text-sm font-semibold text-foreground leading-snug">{title}</h3>
                </div>
                <p className="text-xs text-foreground/50 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What to expect + Dr. Cherich credentials */}
      <section id="what-to-expect" className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-[3fr_2fr] gap-14 lg:gap-20 items-start">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <StarDivider count={3} />
              <span className="text-[10px] tracking-[0.25em] uppercase text-accent font-medium">
                What to Expect
              </span>
            </div>
            <h2
              className="text-3xl md:text-4xl leading-tight text-foreground mb-6"
              style={{ fontFamily: "'Lora', serif", fontWeight: 500 }}
            >
              The Evaluation Process
            </h2>
            <p className="text-[0.95rem] text-foreground/60 leading-relaxed mb-5">
              A veterans mental health evaluation with Dr. Cherich typically involves a
              structured clinical interview (60–90 minutes), review of relevant military and
              medical records you provide, and use of validated assessment instruments where
              appropriate (e.g., PCL-5 for PTSD).
            </p>
            <p className="text-[0.95rem] text-foreground/60 leading-relaxed mb-5">
              Following the evaluation, Dr. Cherich prepares written documentation — a nexus
              letter, completed DBQ, or comprehensive evaluation report — based on what your
              claim requires. Turnaround is typically 5–10 business days after the evaluation
              session.
            </p>
            <p className="text-[0.95rem] text-foreground/60 leading-relaxed mb-10">
              Dr. Cherich's background as a former active-duty military medic means she brings
              firsthand understanding of military culture, service conditions, and the specific
              stressors that affect those who serve. This credibility extends to her clinical
              documentation.
            </p>

            {/* Anonymized case example */}
            <div className="bg-secondary border border-border p-6">
              <p className="text-[10px] tracking-[0.2em] uppercase text-accent font-medium mb-4">
                Case Example (Anonymized)
              </p>
              <p className="text-sm text-foreground/65 italic leading-relaxed mb-4">
                "A veteran in his late 40s had been denied a PTSD rating three times. After
                an independent evaluation with Dr. Cherich — including a completed DBQ and nexus
                letter documenting service connection — he submitted a supplemental claim and
                received a 70% rating. The documentation clearly linked his combat exposures to
                his current diagnosis and functional limitations."
              </p>
              <p className="text-[10px] text-muted-foreground tracking-wide">
                Individual outcomes vary. This example is anonymized and shared for illustrative purposes only.
              </p>
            </div>
          </div>

          {/* CTA card */}
          <div className="bg-secondary border border-border p-7">
            <div className="w-px h-10 bg-primary/30 mb-6" />
            <p className="text-[10px] tracking-[0.2em] uppercase text-accent font-medium mb-3">
              Get Your Evaluation
            </p>
            <p className="text-sm text-foreground/60 leading-relaxed mb-7">
              Call or email to discuss your claim situation and confirm whether an evaluation is
              the right next step. Dr. Cherich offers telehealth evaluations for clients across
              Tennessee and Virginia.
            </p>
            <div className="space-y-3">
              <a
                href="tel:3019563185"
                className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-primary text-primary-foreground text-xs tracking-widest uppercase hover:opacity-90 transition-opacity"
              >
                <Phone size={12} /> 301-956-3185
              </a>
              <a
                href="mailto:drcarol@cherishconsulting.com"
                className="w-full flex items-center justify-center gap-2 px-5 py-3 border border-border text-foreground/60 text-xs tracking-widest uppercase hover:bg-background transition-colors"
              >
                Send an Email
              </a>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
