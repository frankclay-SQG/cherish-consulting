// SOF-89 — Clinical Supervision dedicated page
import { useState } from "react";
import { Phone, ChevronDown, ChevronUp } from "lucide-react";
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

const formats = [
  {
    format: "Individual Supervision",
    duration: "50 minutes / session",
    desc: "One-on-one supervision with Dr. Cherich. Ideal for practitioners who prefer focused, personalized guidance on their caseload, clinical development, and licensure hour documentation.",
  },
  {
    format: "Group Supervision",
    duration: "90 minutes / session",
    desc: "Structured group supervision with 3–6 supervisees. Covers shared case presentations, ethical dilemmas, and skill development. Cost-effective format for those accumulating hours toward LPC or LCMHC licensure.",
  },
];

const faqs: { q: string; a: string }[] = [
  {
    q: "What licensure tracks does Dr. Cherich supervise for?",
    a: "Dr. Cherich provides clinical supervision for LPC and LCMHC candidates in Tennessee and Virginia. She is familiar with the hour requirements, supervision documentation, and board application processes in both states.",
  },
  {
    q: "What stages of licensure can I be in?",
    a: "Dr. Cherich supervises both practicum/internship students (pre-degree) and post-graduate associates accumulating supervised hours toward full licensure. Please contact her to confirm eligibility for your specific track.",
  },
  {
    q: "Does supervision happen in person or via telehealth?",
    a: "Both options are available. Telehealth supervision is fully accepted by the Tennessee and Virginia licensing boards, making it a convenient option for candidates in either state.",
  },
  {
    q: "What documentation will I receive?",
    a: "Dr. Cherich provides supervision logs and documentation suitable for licensure board submission. Documentation follows the format required by the Tennessee Health Related Boards and the Virginia Board of Counseling.",
  },
  {
    q: "Can I transfer my supervision hours from another supervisor?",
    a: "Yes, in most cases. If you have previously accumulated approved hours with another qualified supervisor, those hours count toward your total. Dr. Cherich can begin supervising at any point in your accumulation process.",
  },
  {
    q: "What is the cost of supervision?",
    a: "Please contact Dr. Cherich directly for current rates. Both individual and group supervision pricing is available. Rates vary by format and session length.",
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

export default function ClinicalSupervisionPage() {
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
            Supervision for LPC and<br />LCMHC Candidates in<br />Tennessee &amp; Virginia
          </h1>
          <p className="text-[0.95rem] text-foreground/60 max-w-xl leading-relaxed mb-6">
            Clinical supervision for master's-level interns, practicum students, and post-graduate
            counselors accumulating supervised hours toward full licensure — provided by
            Dr. Carol J. Cherich, PhD.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#inquiry-form"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground text-xs tracking-widest uppercase hover:opacity-90 transition-opacity"
            >
              Apply for Supervision
            </a>
            <a
              href="tel:3019563185"
              className="inline-flex items-center gap-2 px-6 py-3 border border-foreground/20 text-foreground/60 text-xs tracking-widest uppercase hover:bg-secondary transition-colors"
            >
              <Phone size={12} /> Call Dr. Cherich
            </a>
          </div>
        </div>
      </div>

      {/* Who this is for */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-[3fr_2fr] gap-14 lg:gap-20 items-start">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <StarDivider count={3} />
              <span className="text-[10px] tracking-[0.25em] uppercase text-accent font-medium">
                Who This Is For
              </span>
            </div>
            <h2
              className="text-3xl md:text-4xl leading-tight text-foreground mb-6"
              style={{ fontFamily: "'Lora', serif", fontWeight: 500 }}
            >
              Supervision for Every Stage of the Licensure Journey
            </h2>
            <p className="text-[0.95rem] text-foreground/60 leading-relaxed mb-5">
              Dr. Cherich provides supervision for master's-level counseling students in
              practicum and internship placements, as well as post-graduate associates who
              have completed their degree and are accumulating supervised hours toward
              LPC or LCMHC licensure.
            </p>
            <p className="text-[0.95rem] text-foreground/60 leading-relaxed mb-8">
              Whether you're in your first supervised clinical experience or in the final
              months before applying for your license, Dr. Cherich provides structured,
              professionally documented supervision aligned with Tennessee and Virginia
              licensing board requirements.
            </p>

            <div className="space-y-4">
              {[
                {
                  label: "Practicum & Internship Students",
                  desc: "Master's-level students completing supervised field hours as part of a CACREP-accredited or qualifying counseling program.",
                },
                {
                  label: "Post-Graduate LPC Associates",
                  desc: "Counselors who have completed their master's degree and are accumulating the post-degree supervised hours required for LPC licensure in Tennessee or Virginia.",
                },
                {
                  label: "LCMHC Candidates (Virginia)",
                  desc: "Virginia candidates pursuing the Licensed Clinical Mental Health Counselor credential, accumulating hours under a board-approved supervisor.",
                },
              ].map(({ label, desc }) => (
                <div key={label} className="flex items-start gap-3 pt-4 border-t border-border first:border-t-0 first:pt-0">
                  <span className="text-accent flex-shrink-0 mt-1" style={{ fontSize: "0.55rem" }}>★</span>
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-1">{label}</p>
                    <p className="text-sm text-foreground/55 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Supervisor card */}
          <div className="bg-secondary border border-border p-7">
            <div className="w-px h-10 bg-primary/30 mb-6" />
            <p className="text-[10px] tracking-[0.2em] uppercase text-accent font-medium mb-3">
              Your Supervisor
            </p>
            <p
              className="text-lg text-foreground mb-2"
              style={{ fontFamily: "'Lora', serif", fontWeight: 500 }}
            >
              Dr. Carol J. Cherich, PhD
            </p>
            <div className="space-y-2 mb-6">
              {[
                "PhD — Counseling",
                "Licensed in Tennessee & Virginia",
                "15+ Years Clinical Experience",
                "Specialties: Trauma, Veterans, Addictions",
                "Former Active-Duty Military Medic",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <span className="text-accent flex-shrink-0" style={{ fontSize: "0.5rem" }}>★</span>
                  <span className="text-xs text-foreground/65">{item}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-5 space-y-2">
              <p className="text-[10px] text-muted-foreground mb-3">
                Supervision openings are limited. Contact Dr. Cherich to check current availability.
              </p>
              <a
                href="#inquiry-form"
                className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-primary text-primary-foreground text-xs tracking-widest uppercase hover:opacity-90 transition-opacity"
              >
                Supervision Inquiry
              </a>
              <a
                href="tel:3019563185"
                className="w-full flex items-center justify-center gap-2 px-5 py-3 border border-border text-foreground/60 text-xs tracking-widest uppercase hover:bg-background transition-colors"
              >
                <Phone size={12} /> 301-956-3185
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Supervision formats */}
      <section className="py-20 bg-secondary border-y border-border">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-4">
            <StarDivider count={3} />
            <span className="text-[10px] tracking-[0.25em] uppercase text-accent font-medium">
              Supervision Formats
            </span>
          </div>
          <h2
            className="text-3xl md:text-4xl leading-tight text-foreground mb-14 max-w-lg"
            style={{ fontFamily: "'Lora', serif", fontWeight: 500 }}
          >
            Individual and Group Supervision Available
          </h2>
          <div className="grid md:grid-cols-2 gap-px bg-border">
            {formats.map(({ format, duration, desc }) => (
              <div key={format} className="bg-secondary p-8 hover:bg-background transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-foreground">{format}</h3>
                  <span className="text-[10px] tracking-[0.15em] uppercase text-accent font-medium">
                    {duration}
                  </span>
                </div>
                <p className="text-sm text-foreground/55 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 grid md:grid-cols-3 gap-px bg-border">
            {[
              { label: "Format", value: "In-person or telehealth" },
              { label: "States", value: "Tennessee & Virginia" },
              { label: "Documentation", value: "Board-compliant supervision logs" },
            ].map(({ label, value }) => (
              <div key={label} className="bg-secondary p-6">
                <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-medium mb-2">{label}</p>
                <p className="text-sm text-foreground font-medium">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-4">
            <StarDivider count={3} />
            <span className="text-[10px] tracking-[0.25em] uppercase text-accent font-medium">
              FAQ
            </span>
          </div>
          <h2
            className="text-3xl md:text-4xl leading-tight text-foreground mb-12"
            style={{ fontFamily: "'Lora', serif", fontWeight: 500 }}
          >
            Supervision — Common Questions
          </h2>
          <div>
            {faqs.map((faq) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry form */}
      <section id="inquiry-form" className="py-20 bg-secondary border-t border-border">
        <div className="max-w-3xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-4">
            <StarDivider count={3} />
            <span className="text-[10px] tracking-[0.25em] uppercase text-accent font-medium">
              Supervision Inquiry
            </span>
          </div>
          <h2
            className="text-3xl leading-tight text-foreground mb-5"
            style={{ fontFamily: "'Lora', serif", fontWeight: 500 }}
          >
            Apply for Supervision
          </h2>
          <p className="text-sm text-foreground/55 leading-relaxed mb-10 max-w-xl">
            Fill out the form below and Dr. Cherich will be in touch to discuss your
            licensure track, availability, and supervision format.
          </p>

          <form
            className="space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              const target = e.target as HTMLFormElement;
              const data = new FormData(target);
              const params = new URLSearchParams();
              data.forEach((value, key) => params.append(key, value as string));
              fetch("/", { method: "POST", body: params })
                .then(() => {
                  target.reset();
                  alert("Thank you! Dr. Cherich will be in touch shortly.");
                })
                .catch(() => {
                  alert("There was a problem submitting. Please call 301-956-3185 directly.");
                });
            }}
          >
            <input type="hidden" name="form-name" value="supervision-inquiry" />
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-medium mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full px-4 py-3 bg-background border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="block text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-medium mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 bg-background border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-medium mb-2">
                  State *
                </label>
                <select
                  name="state"
                  required
                  className="w-full px-4 py-3 bg-background border border-border text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                >
                  <option value="">Select state</option>
                  <option value="TN">Tennessee</option>
                  <option value="VA">Virginia</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-medium mb-2">
                  Licensure Goal *
                </label>
                <select
                  name="licensure-goal"
                  required
                  className="w-full px-4 py-3 bg-background border border-border text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                >
                  <option value="">Select track</option>
                  <option value="LPC-TN">LPC — Tennessee</option>
                  <option value="LCMHC-VA">LCMHC — Virginia</option>
                  <option value="LPC-VA">LPC — Virginia</option>
                  <option value="practicum">Practicum / Internship (student)</option>
                  <option value="other">Other / Unsure</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-medium mb-2">
                Hours Accumulated to Date
              </label>
              <input
                type="text"
                name="hours"
                className="w-full px-4 py-3 bg-background border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                placeholder="e.g., 0, 500, 1200 (leave blank if unsure)"
              />
            </div>
            <div>
              <label className="block text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-medium mb-2">
                Tell Dr. Cherich About Your Situation
              </label>
              <textarea
                name="message"
                rows={4}
                className="w-full px-4 py-3 bg-background border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                placeholder="Your clinical focus, current placement, questions about supervision..."
              />
            </div>
            <button
              type="submit"
              className="px-8 py-3 bg-primary text-primary-foreground text-xs tracking-widest uppercase hover:opacity-90 transition-opacity"
            >
              Submit Inquiry
            </button>
          </form>
          <p className="text-xs text-muted-foreground mt-6">
            Prefer to call?{" "}
            <a href="tel:3019563185" className="text-primary underline underline-offset-2 hover:opacity-70">
              301-956-3185
            </a>
            {" "}or email{" "}
            <a href="mailto:drcarol@cherishconsulting.com" className="text-primary underline underline-offset-2 hover:opacity-70">
              drcarol@cherishconsulting.com
            </a>
          </p>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
