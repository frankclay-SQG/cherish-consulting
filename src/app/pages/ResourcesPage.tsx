// SOF-90 — Resources / digital products page
import { useState } from "react";
import { Download, BookOpen, Users, ArrowRight } from "lucide-react";
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

type Product = {
  title: string;
  subtitle: string;
  tag: string;
  icon: React.ReactNode;
  bullets: string[];
  cta: string;
  href: string;
  free?: boolean;
};

const products: Product[] = [
  {
    title: "How to Build Your Private Practice",
    subtitle: "A step-by-step guide for counselors launching their own practice",
    tag: "Counselors & Clinicians",
    icon: <BookOpen size={18} className="text-primary" />,
    bullets: [
      "Choosing your business structure (LLC vs sole proprietorship)",
      "Setting your rates and payment policies",
      "Getting credentialed and paneling with insurance",
      "Marketing your practice without paid ads",
      "Building your referral network from scratch",
    ],
    cta: "Get the eBook",
    href: "https://cherishconsulting.gumroad.com",
  },
  {
    title: "Marketing for Counselors",
    subtitle: "Practical strategies to fill your caseload without feeling salesy",
    tag: "Counselors & Clinicians",
    icon: <BookOpen size={18} className="text-primary" />,
    bullets: [
      "Psychology Today, Therapist Finder, and other directories",
      "Google Business Profile setup and optimization",
      "Content ideas for a counselor's website and blog",
      "Social media without oversharing client work",
      "Referral relationships with psychiatrists, PCPs, and schools",
    ],
    cta: "Get the eBook",
    href: "https://cherishconsulting.gumroad.com",
  },
  {
    title: "The Veterans VA Claims Guide",
    subtitle: "Navigating the VA disability process — from first claim to appeal",
    tag: "Veterans & Families",
    icon: <Users size={18} className="text-primary" />,
    bullets: [
      "How the VA disability rating system works",
      "What a nexus letter is and why you need one",
      "Filing a claim vs. filing a supplemental claim",
      "Working with VSOs and private attorneys",
      "What happens when the VA denies your claim",
    ],
    cta: "Get the Guide",
    href: "https://cherishconsulting.gumroad.com",
  },
  {
    title: "Wellness Foundations",
    subtitle: "Practical mental wellness habits from Dr. Cherich's clinical practice",
    tag: "General Wellness",
    icon: <Download size={18} className="text-primary" />,
    bullets: [
      "Evidence-based routines for managing anxiety day-to-day",
      "Sleep hygiene for trauma survivors",
      "Stress tracking and body-awareness exercises",
      "Boundary-setting scripts for common situations",
      "When to seek professional support",
    ],
    cta: "Download the Guide",
    href: "https://cherishconsulting.gumroad.com",
  },
];

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-background border border-border hover:border-primary/40 transition-colors group flex flex-col">
      <div className="p-7 flex-1">
        <div className="flex items-center justify-between mb-5">
          <div className="p-2.5 bg-secondary border border-border">
            {product.icon}
          </div>
          <span className="text-[9px] tracking-[0.2em] uppercase text-accent font-semibold border border-accent/30 px-2.5 py-1">
            {product.tag}
          </span>
        </div>
        <h3
          className="text-base font-semibold text-foreground mb-2 leading-snug"
          style={{ fontFamily: "'Lora', serif" }}
        >
          {product.title}
        </h3>
        <p className="text-sm text-foreground/55 leading-relaxed mb-5">{product.subtitle}</p>
        <ul className="space-y-2">
          {product.bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-2.5">
              <span className="text-accent flex-shrink-0 mt-0.5 leading-none" style={{ fontSize: "0.5rem" }}>★</span>
              <span className="text-xs text-foreground/55 leading-snug">{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="border-t border-border p-5">
        <a
          href={product.href}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-primary text-primary-foreground text-xs tracking-widest uppercase hover:opacity-90 transition-opacity group-hover:opacity-95"
        >
          {product.cta} <ArrowRight size={12} />
        </a>
      </div>
    </div>
  );
}

function LeadMagnet() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="text-center py-8">
        <p className="text-sm font-medium text-foreground mb-2">
          Thank you — check your inbox.
        </p>
        <p className="text-sm text-foreground/50">
          Your free excerpt is on its way. If you don't see it within a few minutes, check your spam folder.
        </p>
      </div>
    );
  }

  return (
    <form
      className="flex flex-col sm:flex-row gap-3"
      onSubmit={(e) => {
        e.preventDefault();
        const target = e.target as HTMLFormElement;
        const data = new FormData(target);
        const params = new URLSearchParams();
        data.forEach((value, key) => params.append(key, value as string));
        fetch("/", { method: "POST", body: params })
          .then(() => setSubmitted(true))
          .catch(() => setSubmitted(true)); // still show thank-you on error
      }}
    >
      <input type="hidden" name="form-name" value="free-excerpt" />
      <input
        type="email"
        name="email"
        required
        placeholder="your@email.com"
        className="flex-1 px-4 py-3 bg-background border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
      />
      <button
        type="submit"
        className="flex-shrink-0 px-6 py-3 bg-primary text-primary-foreground text-xs tracking-widest uppercase hover:opacity-90 transition-opacity"
      >
        Send Me the Excerpt
      </button>
    </form>
  );
}

export default function ResourcesPage() {
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
            Resources &amp;<br />Guides
          </h1>
          <p className="text-[0.95rem] text-foreground/60 max-w-xl leading-relaxed">
            Practical eBooks and guides from Dr. Carol J. Cherich, PhD — for counselors
            building private practices, veterans navigating VA claims, and anyone
            looking to build stronger mental wellness habits.
          </p>
        </div>
      </div>

      {/* Free excerpt lead magnet */}
      <div className="border-b border-border bg-primary/5">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="grid md:grid-cols-[3fr_2fr] gap-8 items-center">
            <div>
              <p className="text-[10px] tracking-[0.25em] uppercase text-accent font-semibold mb-2">
                Free Download
              </p>
              <p
                className="text-lg text-foreground leading-snug mb-1"
                style={{ fontFamily: "'Lora', serif", fontWeight: 500 }}
              >
                Get a free excerpt from "How to Build Your Private Practice"
              </p>
              <p className="text-sm text-foreground/55">
                Enter your email and we'll send you the first chapter — including Dr. Cherich's
                framework for choosing the right business structure.
              </p>
            </div>
            <div>
              <LeadMagnet />
            </div>
          </div>
        </div>
      </div>

      {/* Products grid */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-4">
            <StarDivider count={3} />
            <span className="text-[10px] tracking-[0.25em] uppercase text-accent font-medium">
              All Resources
            </span>
          </div>
          <h2
            className="text-3xl md:text-4xl leading-tight text-foreground mb-5"
            style={{ fontFamily: "'Lora', serif", fontWeight: 500 }}
          >
            eBooks &amp; Downloadable Guides
          </h2>
          <p className="text-sm text-foreground/50 max-w-xl leading-relaxed mb-14">
            Written by Dr. Cherich from 15+ years of clinical practice, private practice
            operation, and veteran services.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard key={product.title} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Counselors vs Veterans split CTA */}
      <section className="py-20 bg-secondary border-y border-border">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-px bg-border">
            <div className="bg-secondary p-8">
              <div className="flex items-center gap-2.5 mb-5">
                <span className="text-accent" style={{ fontSize: "0.55rem" }}>★</span>
                <span className="text-[10px] tracking-[0.25em] uppercase text-accent font-medium">
                  For Counselors
                </span>
              </div>
              <h3
                className="text-xl leading-snug text-foreground mb-4"
                style={{ fontFamily: "'Lora', serif", fontWeight: 500 }}
              >
                Build a Practice.<br />Fill a Caseload.
              </h3>
              <p className="text-sm text-foreground/55 leading-relaxed mb-6">
                Dr. Cherich built Cherish Consulting from the ground up and writes from direct
                experience — what worked, what didn't, and what she wishes she had known.
              </p>
              <a
                href="https://cherishconsulting.gumroad.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-primary font-medium hover:opacity-70 transition-opacity"
              >
                Browse counselor resources <ArrowRight size={14} />
              </a>
            </div>
            <div className="bg-background p-8">
              <div className="flex items-center gap-2.5 mb-5">
                <span className="text-accent" style={{ fontSize: "0.55rem" }}>★</span>
                <span className="text-[10px] tracking-[0.25em] uppercase text-accent font-medium">
                  For Veterans
                </span>
              </div>
              <h3
                className="text-xl leading-snug text-foreground mb-4"
                style={{ fontFamily: "'Lora', serif", fontWeight: 500 }}
              >
                Navigate the VA.<br />Get What You've Earned.
              </h3>
              <p className="text-sm text-foreground/55 leading-relaxed mb-6">
                The VA system is complex. Dr. Cherich — herself a veteran and clinician who
                works with veterans daily — breaks down the claims process in plain language.
              </p>
              <a
                href="https://cherishconsulting.gumroad.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-primary font-medium hover:opacity-70 transition-opacity"
              >
                Browse veteran resources <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
