// SOF-86 — DOT Evaluations dedicated page
import { useState } from "react";
import { Phone, ChevronDown, ChevronUp, ChevronRight } from "lucide-react";
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

const sapSteps = [
  {
    step: "01",
    title: "Initial Evaluation",
    desc: "A face-to-face (or telehealth) clinical interview with Dr. Cherich, a DOT-qualified Substance Abuse Professional. She assesses whether a substance use disorder is present and determines the appropriate level of care.",
  },
  {
    step: "02",
    title: "Treatment Recommendation",
    desc: "Based on the evaluation, Dr. Cherich provides a written SAP report recommending education, treatment, or both. Recommendations comply with DOT 49 CFR Part 40 and FMCSA standards.",
  },
  {
    step: "03",
    title: "Follow-Up Evaluation",
    desc: "After the employee completes the recommended education or treatment program, Dr. Cherich conducts a follow-up evaluation to determine if the employee has complied and is ready to return to safety-sensitive duties.",
  },
  {
    step: "04",
    title: "Return-to-Duty Clearance",
    desc: "Dr. Cherich provides a written report to the employer stating whether the employee has met the requirements. The employer then makes the final return-to-duty decision per their policy.",
  },
];

const faqs: { q: string; a: string }[] = [
  {
    q: "What is a DOT Substance Abuse Professional (SAP)?",
    a: "A SAP is a licensed professional who evaluates employees who have violated DOT drug and alcohol regulations. The SAP determines what assistance is needed before the employee can return to safety-sensitive functions. Dr. Cherich is a qualified SAP under 49 CFR Part 40.",
  },
  {
    q: "Who needs a SAP evaluation?",
    a: "Any DOT-regulated employee (CDL drivers, aviation, transit, pipeline, railroad workers) who tests positive for drugs or alcohol, refuses a test, or otherwise violates DOT drug and alcohol regulations must complete the SAP process before returning to safety-sensitive duties.",
  },
  {
    q: "Is the SAP process the same as treatment?",
    a: "No. The SAP is an independent evaluator — not a treating clinician. The SAP determines what education or treatment is needed and verifies compliance. Actual treatment is provided by a separate program or provider.",
  },
  {
    q: "How long does the SAP process take?",
    a: "Timelines vary based on the recommended education or treatment program. The initial evaluation is typically completed within a few business days of scheduling. Follow-up evaluations occur after the recommended program is completed.",
  },
  {
    q: "Does Dr. Cherich serve employers and employees?",
    a: "Yes. Dr. Cherich works with both individual employees referred by employers and with companies seeking a qualified SAP for their drug and alcohol program compliance needs.",
  },
  {
    q: "What happens if an employee does not complete the SAP process?",
    a: "The employee cannot return to DOT safety-sensitive functions. Failure to comply with the SAP's recommendations is a violation of DOT regulations and may result in permanent disqualification.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border">
      <button
        className="w-full flex items-center justify-between py-5 text-left gap-4 group"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
      >
        <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors leading-snug">
          {q}
        </span>
        {open ? (
          <ChevronUp size={14} className="text-primary flex-shrink-0" />
        ) : (
          <ChevronDown size={14} className="text-foreground/40 flex-shrink-0" />
        )}
      </button>
      {open && (
        <p className="text-[0.9rem] text-foreground/60 leading-relaxed pb-5">
          {a}
        </p>
      )}
    </div>
  );
}

export default function DOTEvaluationsPage() {
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
            DOT Evaluations &amp;<br />FMCSA SAP Services
          </h1>
          <p className="text-[0.95rem] text-foreground/60 max-w-xl leading-relaxed mb-6">
            Dr. Carol J. Cherich, PhD is a qualified DOT Substance Abuse Professional (SAP)
            providing evaluations and return-to-duty services for FMCSA-regulated employees
            across Tennessee and Virginia.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="tel:3019563185"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground text-xs tracking-widest uppercase hover:opacity-90 transition-opacity"
            >
              <Phone size={12} /> Call to Schedule
            </a>
            <a
              href="#faq"
              className="inline-flex items-center gap-2 px-6 py-3 border border-foreground/20 text-foreground/60 text-xs tracking-widest uppercase hover:bg-secondary transition-colors"
            >
              FAQ <ChevronRight size={12} />
            </a>
          </div>
        </div>
      </div>

      {/* SAP Process steps */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-4">
            <StarDivider count={3} />
            <span className="text-[10px] tracking-[0.25em] uppercase text-accent font-medium">
              The SAP Process
            </span>
          </div>
          <h2
            className="text-3xl md:text-4xl leading-tight text-foreground mb-4 max-w-lg"
            style={{ fontFamily: "'Lora', serif", fontWeight: 500 }}
          >
            Four Steps to Return-to-Duty
          </h2>
          <p className="text-sm text-foreground/50 max-w-xl leading-relaxed mb-14">
            The DOT SAP process is defined by 49 CFR Part 40. Dr. Cherich guides employees and
            employers through each required step with clear documentation at every stage.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
            {sapSteps.map(({ step, title, desc }) => (
              <div key={step} className="bg-background p-7 hover:bg-secondary transition-colors group">
                <div
                  className="text-4xl text-border group-hover:text-primary/20 transition-colors mb-5"
                  style={{ fontFamily: "'Lora', serif", fontWeight: 500 }}
                >
                  {step}
                </div>
                <h3 className="text-sm font-semibold text-foreground mb-3 leading-snug">{title}</h3>
                <p className="text-xs text-foreground/50 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials + compliance band */}
      <section className="py-20 bg-secondary border-y border-border">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-[3fr_2fr] gap-14 lg:gap-20 items-start">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <StarDivider count={3} />
              <span className="text-[10px] tracking-[0.25em] uppercase text-accent font-medium">
                Credentials &amp; Compliance
              </span>
            </div>
            <h2
              className="text-3xl md:text-4xl leading-tight text-foreground mb-6"
              style={{ fontFamily: "'Lora', serif", fontWeight: 500 }}
            >
              A Qualified SAP Under 49 CFR Part 40
            </h2>
            <p className="text-[0.95rem] text-foreground/60 leading-relaxed mb-5">
              Dr. Cherich meets the qualification requirements for a DOT Substance Abuse
              Professional as defined by 49 CFR Part 40, Subpart O. She holds a PhD in
              counseling, maintains active licensure as a mental health clinician in Tennessee
              and Virginia, and has specialized training in DOT drug and alcohol regulations.
            </p>
            <p className="text-[0.95rem] text-foreground/60 leading-relaxed mb-8">
              Her background as a former active-duty military medic provides additional context
              for working with commercial drivers and safety-sensitive workers — she understands
              both the professional stakes and the human dimensions of the return-to-duty process.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "DOT-Qualified Substance Abuse Professional (SAP)",
                "49 CFR Part 40 Compliant",
                "FMCSA SAP Registry Eligible",
                "Licensed in Tennessee & Virginia",
                "PhD — Mental Health & Addictions",
                "15+ Years Clinical Experience",
              ].map((cred) => (
                <div key={cred} className="flex items-start gap-2.5">
                  <span className="text-accent flex-shrink-0 mt-0.5 leading-none" style={{ fontSize: "0.55rem" }}>★</span>
                  <span className="text-sm text-foreground/65 leading-snug">{cred}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA card */}
          <div className="bg-background border border-border p-7">
            <div className="w-px h-10 bg-primary/30 mb-6" />
            <p className="text-[10px] tracking-[0.2em] uppercase text-accent font-medium mb-3">
              Schedule a SAP Evaluation
            </p>
            <p className="text-sm text-foreground/60 leading-relaxed mb-7">
              Evaluations are available via telehealth or in person. Contact Dr. Cherich directly
              to confirm scheduling and discuss your specific DOT program requirements.
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
                className="w-full flex items-center justify-center gap-2 px-5 py-3 border border-border text-foreground/60 text-xs tracking-widest uppercase hover:bg-secondary transition-colors"
              >
                Send an Email
              </a>
            </div>
            <p className="text-[10px] text-muted-foreground mt-5 leading-relaxed">
              Dr. Cherich serves individual employees, employers, and third-party administrators
              (TPAs) seeking SAP services for their DOT drug and alcohol compliance programs.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-4">
            <StarDivider count={3} />
            <span className="text-[10px] tracking-[0.25em] uppercase text-accent font-medium">
              Frequently Asked Questions
            </span>
          </div>
          <h2
            className="text-3xl md:text-4xl leading-tight text-foreground mb-12"
            style={{ fontFamily: "'Lora', serif", fontWeight: 500 }}
          >
            DOT SAP — Common Questions
          </h2>
          <div>
            {faqs.map((faq) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
          <div className="mt-12 border-t border-border pt-10">
            <p className="text-sm text-foreground/50 leading-relaxed max-w-xl">
              Have a question not covered here?{" "}
              <a href="tel:3019563185" className="text-primary underline underline-offset-2 hover:opacity-70">
                Call Dr. Cherich directly
              </a>{" "}
              or{" "}
              <a href="mailto:drcarol@cherishconsulting.com" className="text-primary underline underline-offset-2 hover:opacity-70">
                send an email
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
