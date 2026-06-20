import { Phone } from "lucide-react";
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

export default function ESAPage() {
  return (
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <SiteNav alwaysSolid />

      {/* Page header */}
      <div className="pt-16 bg-secondary border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <StarDivider count={3} className="mb-4" />
          <h1
            className="text-4xl md:text-5xl leading-tight text-foreground mb-4"
            style={{ fontFamily: "'Lora', serif", fontWeight: 500 }}
          >
            Emotional Support<br />Animal Letters
          </h1>
          <p className="text-[0.95rem] text-foreground/60 max-w-xl leading-relaxed">
            Licensed evaluations and documentation provided by Dr. Carol J. Cherich, PhD —
            a licensed mental-health professional authorized to issue ESA letters.
          </p>
        </div>
      </div>

      {/* SOF-58 / SOF-65 — ESA content */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-[3fr_2fr] gap-14 lg:gap-20 items-start">

            {/* Description */}
            <div>
              <h2
                className="text-2xl md:text-3xl leading-tight text-foreground mb-6"
                style={{ fontFamily: "'Lora', serif", fontWeight: 500 }}
              >
                What is an Emotional Support Animal Letter?
              </h2>
              <p className="text-[0.95rem] text-foreground/60 leading-relaxed mb-5">
                An Emotional Support Animal is more than a pet — it is a companion prescribed
                by a licensed mental-health professional to help its handler manage a diagnosed
                psychological or emotional disability. Unlike a service dog trained to perform
                specific tasks, an ESA's value lies in its calming presence, predictable routine,
                and unconditional affection.
              </p>
              <p className="text-[0.95rem] text-foreground/60 leading-relaxed mb-8">
                With valid ESA documentation, a handler gains federal housing protections that
                ordinary pets do not receive. No federal law limits ESA species or size — dogs,
                cats, rabbits, birds, and others are eligible, provided the animal is safe and
                well-behaved.
              </p>

              <h3
                className="text-lg text-foreground mb-4"
                style={{ fontFamily: "'Lora', serif", fontWeight: 500 }}
              >
                Legal criteria for an ESA
              </h3>
              <div className="space-y-3 mb-10">
                {[
                  "The handler has a diagnosed emotional, psychological, or cognitive condition recognized by DSM-5.",
                  "A licensed healthcare professional writes a letter explaining how the animal supports the person's condition.",
                  "Must be in established care with Dr. Cherich (minimum 3 sessions) before annual renewal.",
                ].map((point, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <span className="text-accent flex-shrink-0 mt-0.5 leading-none" style={{ fontSize: "0.55rem" }}>★</span>
                    <span className="text-sm text-foreground/65 leading-snug">{point}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-8">
                <p className="text-xs text-muted-foreground leading-relaxed max-w-lg">
                  Dr. Cherich provides ESA evaluation letters after a virtual evaluation session.
                  Please call to discuss your situation and confirm eligibility before scheduling.
                </p>
              </div>
            </div>

            {/* Pricing card */}
            <div className="bg-secondary border border-border p-7">
              <div className="w-px h-10 bg-primary/30 mb-6" />
              <p className="text-[10px] tracking-[0.2em] uppercase text-accent font-medium mb-6">
                ESA Evaluation Fees
              </p>
              <div className="space-y-5 mb-7">
                <div className="pb-5 border-b border-border flex justify-between items-baseline gap-4">
                  <div>
                    <p className="text-sm font-medium text-foreground">Initial Evaluation &amp; Letter</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Virtual session + documentation</p>
                  </div>
                  <span
                    className="text-2xl text-primary flex-shrink-0"
                    style={{ fontFamily: "'Lora', serif" }}
                  >
                    $300
                  </span>
                </div>
                <div className="flex justify-between items-baseline gap-4">
                  <div>
                    <p className="text-sm font-medium text-foreground">Annual Renewal</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Established clients only</p>
                  </div>
                  <span
                    className="text-2xl text-primary flex-shrink-0"
                    style={{ fontFamily: "'Lora', serif" }}
                  >
                    $75
                  </span>
                </div>
              </div>
              <a
                href="tel:3019563185"
                className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-primary text-primary-foreground text-xs tracking-widest uppercase hover:opacity-90 transition-opacity"
              >
                <Phone size={12} /> Call 301-956-3185
              </a>
            </div>

          </div>
        </div>
      </section>

      <SiteFooter />
      <CookieBanner />
    </div>
  );
}
