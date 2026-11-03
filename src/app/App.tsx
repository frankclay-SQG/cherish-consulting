import { submitToHubSpot } from "./lib/hubspot";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Phone, Mail, ChevronRight, Play,
  Heart, Shield, Users, Brain, Activity, ClipboardList,
  GraduationCap, MapPin,
} from "lucide-react";
import { SiteNav } from "./components/SiteNav";
import { SiteFooter } from "./components/SiteFooter";
import { CookieBanner } from "./components/CookieBanner";

const serif = { fontFamily: "'Lora', serif", fontWeight: 500 } as const;

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className={`${light ? "text-muted" : "text-accent"} select-none`} style={{ fontSize: "0.6rem" }} aria-hidden="true">★ ★ ★</span>
      <span className={`text-[11px] tracking-[0.25em] uppercase font-semibold ${light ? "text-muted" : "text-accent"}`}>
        {children}
      </span>
    </div>
  );
}

function Stripe() {
  return (
    <div className="flex h-1" aria-hidden="true">
      <div className="flex-1 bg-[#1C2B4A]" />
      <div className="flex-1 bg-secondary" />
      <div className="flex-1 bg-[#8B2020]" />
    </div>
  );
}

const services = [
  { icon: Shield, title: "Veterans Claims Evaluations", desc: "Independent evaluations, DBQs, nexus letters and IMOs for VA disability claims.", to: "/veterans-evaluations" },
  { icon: ClipboardList, title: "DOT-SAP & DWI Evaluations", desc: "Qualified SAP evaluations and return-to-duty services, plus DWI/DUI evaluations.", to: "/dot-evaluations" },
  { icon: Brain, title: "Mental Health Treatment", desc: "Evidence-based care for anxiety, depression, PTSD, and related conditions.", to: null },
  { icon: Activity, title: "Stress & Anger Management", desc: "Practical, lasting tools for managing stress — the defining challenge of our era.", to: null },
  { icon: Users, title: "Substance Abuse Treatment", desc: "Compassionate support for those navigating addiction and early recovery.", to: "/assessments" },
  { icon: Heart, title: "Cancer Survivor Support", desc: "Therapeutic presence through diagnosis, treatment, and life beyond cancer.", to: null },
  { icon: Heart, title: "Life Coaching & Wellness", desc: "Holistic health and wellness guidance tailored to your life circumstances and goals.", to: null },
  { icon: GraduationCap, title: "Clinical Supervision", desc: "Professional supervision and consultation for graduate counseling interns.", to: "/clinical-supervision" },
] as { icon: typeof Heart; title: string; desc: string; to: string | null }[];

const movements = ["Arrive", "Release", "Breathe", "Rest", "Receive", "Return", "Go forward"];

const inputCls =
  "w-full border border-primary/30 bg-white px-3 py-3 text-sm focus:outline-none focus:border-primary transition-colors";
const labelCls = "text-xs font-medium text-foreground block mb-1.5";

export default function App() {
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent" | "fallback">("idle");

  return (
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <SiteNav alwaysSolid />
      <CookieBanner />
      <a href="#paths" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:text-xs focus:tracking-widest focus:uppercase">Skip to content</a>

      {/* ── HERO: wide headshot, headline in the negative space ── */}
      <section className="relative bg-[#c5a581] overflow-hidden pt-16">
        <picture>
          <source type="image/avif" sizes="100vw" srcSet="/images/cherich-wide-640.avif 640w, /images/cherich-wide-1024.avif 1024w, /images/cherich-wide-1536.avif 1536w" />
          <source type="image/webp" sizes="100vw" srcSet="/images/cherich-wide-640.webp 640w, /images/cherich-wide-1024.webp 1024w, /images/cherich-wide-1536.webp 1536w" />
          <img
            src="/images/cherich-wide-1536.jpg"
            alt="Dr. Carol J. Cherich, PhD"
            width={1536}
            height={1024}
            fetchPriority="high"
            className="block w-full h-auto aspect-[3/2] object-cover md:absolute md:inset-0 md:h-full md:aspect-auto"
            style={{ objectPosition: "25% 30%" }}
          />
        </picture>
        <div className="relative max-w-6xl mx-auto px-6 py-10 md:py-28 lg:py-36 flex md:justify-end">
          <div className="md:max-w-[520px]">
            <p className="text-[11px] tracking-[0.25em] uppercase font-semibold text-foreground mb-5">
              <span aria-hidden="true">★★★ </span>Dr. Carol J. Cherich, PhD
              <br />Former Active-Duty Military Medic
            </p>
            <h1 className="text-[2.5rem] md:text-5xl lg:text-[3.5rem] leading-[1.1] text-foreground mb-5" style={serif}>
              Independent evaluations for <span className="text-primary">veterans</span> and <em>CDL drivers.</em>
            </h1>
            <p className="text-lg leading-relaxed text-foreground mb-8">
              Clear, thorough clinical documentation from a licensed clinician who has served.
              Telehealth across Tennessee and Virginia.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#veterans" className="inline-flex items-center gap-2 px-6 py-4 bg-primary text-primary-foreground text-xs tracking-widest uppercase hover:opacity-90">
                I'm a veteran
              </a>
              <a href="#drivers" className="inline-flex items-center gap-2 px-6 py-4 bg-foreground text-primary-foreground text-xs tracking-widest uppercase hover:opacity-90">
                I'm a CDL driver
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── TWO PATHS ── */}
      <section id="paths" className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid md:grid-cols-2 gap-6">
          <article id="veterans" className="bg-[#F2EDE4] flex flex-col scroll-mt-24">
            <Stripe />
            <div className="p-8 flex flex-col gap-4 flex-1">
              <p className="text-[11px] tracking-[0.25em] uppercase font-semibold text-accent">For Veterans</p>
              <h2 className="text-3xl leading-tight" style={serif}>VA Claim Evaluations</h2>
              <ul className="list-disc pl-5 space-y-1.5 text-[15px] leading-relaxed">
                <li>Mental health evaluations and DBQs</li>
                <li>Nexus letters on service connection</li>
                <li>Independent medical opinions (IMOs)</li>
                <li>Written documentation in 5–10 business days</li>
              </ul>
              <div className="mt-auto pt-2 flex flex-wrap items-center gap-4">
                <Link to="/veterans-evaluations" className="inline-flex items-center gap-2 px-6 py-4 bg-primary text-primary-foreground text-xs tracking-widest uppercase hover:opacity-90">
                  Veterans: start here <ChevronRight size={12} />
                </Link>
                <a href="/downloads/Cherich-VA-Evaluation-Prep-Checklist.pdf" className="text-sm text-primary underline underline-offset-4">
                  Free prep checklist (PDF)
                </a>
              </div>
            </div>
          </article>
          <article id="drivers" className="bg-[#F2EDE4] flex flex-col scroll-mt-24">
            <Stripe />
            <div className="p-8 flex flex-col gap-4 flex-1">
              <p className="text-[11px] tracking-[0.25em] uppercase font-semibold text-accent">For CDL Drivers &amp; Employers</p>
              <h2 className="text-3xl leading-tight" style={serif}>DOT SAP Evaluations</h2>
              <ul className="list-disc pl-5 space-y-1.5 text-[15px] leading-relaxed">
                <li>Initial and follow-up SAP evaluations</li>
                <li>Remote evaluations available in TN &amp; VA</li>
                <li>Clearinghouse reporting at every step</li>
                <li>Clear return-to-duty guidance from day one</li>
              </ul>
              <div className="mt-auto pt-2 flex flex-wrap items-center gap-4">
                <Link to="/dot-evaluations" className="inline-flex items-center gap-2 px-6 py-4 bg-primary text-primary-foreground text-xs tracking-widest uppercase hover:opacity-90">
                  Drivers: start here <ChevronRight size={12} />
                </Link>
                <a href="/downloads/Cherich-CDL-Return-to-Duty-Roadmap.pdf" className="text-sm text-primary underline underline-offset-4">
                  Return-to-duty roadmap (PDF)
                </a>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* ── CREDENTIALS ── */}
      <section className="bg-secondary border-y border-border">
        <div className="max-w-6xl mx-auto px-6 py-7 grid grid-cols-2 md:grid-cols-5 gap-5">
          {[
            { val: "15+ years", label: "in practice" },
            { val: "PhD", label: "Capella University" },
            { val: "TN & VA", label: "Licensed, telehealth" },
            { val: "DOT SAP", label: "Qualified under 49 CFR Part 40" },
            { val: "Veriditas", label: "Labyrinth facilitator member" },
          ].map(({ val, label }) => (
            <div key={val}>
              <p className="text-2xl text-primary" style={serif}>{val}</p>
              <p className="text-xs text-muted-foreground mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── LABYRINTH FEATURE ── */}
      <section id="labyrinth" className="bg-[#1C2B4A] text-[#F2EDE4]">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-24 grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <Eyebrow light>Dr. Cherich's signature practice</Eyebrow>
            <h2 className="text-4xl md:text-5xl leading-tight mb-6" style={serif}>Walk the Labyrinth</h2>
            <p className="text-[17px] leading-relaxed text-[#E8EDE5] mb-4">
              An ancient walking meditation with one path in and one path out. No decisions, no wrong
              turns — just steady steps, slow breathing, and room to set something down.
            </p>
            <p className="text-[17px] leading-relaxed text-[#E8EDE5] mb-8">
              Free to watch and free to print. Walk along with the guided video at home, trace a
              finger labyrinth at your desk, or join Dr. Cherich for a group walk.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              <Link to="/labyrinths" className="px-6 py-4 bg-[#F2EDE4] text-[#1C2B4A] text-xs tracking-widest uppercase font-semibold hover:opacity-90">
                Take the guided walk
              </Link>
              <Link to="/labyrinths#downloads" className="px-6 py-4 border border-[#F2EDE4]/50 text-[#F2EDE4] text-xs tracking-widest uppercase hover:bg-[#F2EDE4]/10">
                Free printable labyrinths
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <img src="/images/via-member.png" alt="Veriditas International Association of Professional Labyrinth Facilitators — VIA Member" width={89} height={85} loading="lazy" className="w-[72px] h-auto bg-white" />
              <p className="text-[13px] leading-snug text-muted">
                Member, Veriditas International Association<br />of Professional Labyrinth Facilitators
              </p>
            </div>
          </div>
          <div>
            <Link to="/labyrinths#walk" className="relative block aspect-[16/10] bg-primary overflow-hidden group" aria-label="Watch the guided labyrinth walk">
              <svg viewBox="0 0 200 200" className="absolute inset-0 m-auto w-[70%] h-[70%]" aria-hidden="true">
                <g fill="none" stroke="#F2EDE4" strokeOpacity="0.22" strokeWidth="5">
                  <path d="M100 190 A90 90 0 1 1 112 189" /><path d="M112 189 L112 175" />
                  <path d="M100 175 A75 75 0 1 1 88 174" /><path d="M100 160 A60 60 0 1 1 112 159" />
                  <path d="M100 145 A45 45 0 1 1 88 144" /><path d="M100 130 A30 30 0 1 1 112 129" />
                  <path d="M100 190 L100 130" />
                </g>
              </svg>
              <span className="absolute inset-0 m-auto w-[88px] h-[88px] rounded-full bg-[#F2EDE4] text-[#1C2B4A] flex items-center justify-center group-hover:scale-105 transition-transform">
                <Play size={30} fill="currentColor" />
              </span>
              <span className="absolute left-5 bottom-4 text-[13px] text-[#E8EDE5]">Guided walk · seven movements</span>
            </Link>
            <ol className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-px bg-[#F2EDE4]/20 mt-px">
              {movements.map((m, i) => (
                <li key={m} className="bg-[#1C2B4A] px-3 py-3 text-[13px] text-[#E8EDE5]">{i + 1} · {m}</li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ── WHAT TO EXPECT ── */}
      <section className="max-w-6xl mx-auto px-6 py-20 md:py-24">
        <Eyebrow>What to expect</Eyebrow>
        <h2 className="text-3xl md:text-4xl leading-tight mb-10" style={serif}>Straightforward, start to finish</h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-xl text-primary mb-5" style={{ fontFamily: "'Lora', serif", fontWeight: 600 }}>Veterans claim evaluations</h3>
            <ol className="list-decimal pl-5 space-y-3 text-[15px] leading-relaxed">
              <li><strong>Call to talk through your claim.</strong> We confirm which documents you need: evaluation, DBQ, nexus letter or IMO.</li>
              <li><strong>Your evaluation.</strong> A 60–90 minute clinical interview by telehealth, plus review of the records you provide.</li>
              <li><strong>Your documentation.</strong> A written report in 5–10 business days, ready to submit with your claim.</li>
            </ol>
            <p className="mt-5 text-[13px] leading-relaxed text-muted-foreground">
              Dr. Cherich provides independent clinical evaluations and documentation. She does not file or
              represent VA claims; an accredited representative or veterans service organization can help
              you file at no cost.
            </p>
          </div>
          <div>
            <h3 className="text-xl text-primary mb-5" style={{ fontFamily: "'Lora', serif", fontWeight: 600 }}>CDL drivers: back to duty</h3>
            <ol className="list-decimal pl-5 space-y-3 text-[15px] leading-relaxed">
              <li><strong>Designate Dr. Cherich as your SAP</strong> in the FMCSA Clearinghouse, then call to book.</li>
              <li><strong>Initial evaluation,</strong> in person or remote, with a written education or treatment recommendation.</li>
              <li><strong>Follow-up evaluation</strong> once you complete the program; results are reported to the Clearinghouse.</li>
              <li><strong>Return-to-duty test</strong> through your employer, and you are back on the road.</li>
            </ol>
            <p className="mt-5 text-[13px] leading-relaxed text-muted-foreground">
              Employers: ask about SAP services for your DOT drug and alcohol program.
            </p>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-20 md:py-24 bg-secondary scroll-mt-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-[2fr_3fr] gap-14 lg:gap-20 items-center">
          <picture>
            <source type="image/avif" srcSet="/images/cherich-portrait-400.avif 400w, /images/cherich-portrait-800.avif 800w" sizes="(min-width: 768px) 400px, 100vw" />
            <source type="image/webp" srcSet="/images/cherich-portrait-400.webp 400w, /images/cherich-portrait-800.webp 800w" sizes="(min-width: 768px) 400px, 100vw" />
            <img src="/images/cherich-portrait-800.jpg" alt="Dr. Carol J. Cherich, PhD" width={800} height={977} loading="lazy" className="w-full h-auto aspect-[3/4] object-cover" />
          </picture>
          <div>
            <Eyebrow>About Dr. Cherich</Eyebrow>
            <h2 className="text-3xl md:text-4xl leading-tight mb-6" style={serif}>She has served. She understands.</h2>
            <p className="text-base text-muted-foreground leading-relaxed mb-5">
              Dr. Carol J. Cherich holds a PhD from Capella University and brings more than 15 years
              of experience as a licensed clinician in mental health and addictions. Her background as
              an active-duty military medic gives her a firsthand understanding of the challenges
              faced by those who serve, and that understanding shows in her evaluations.
            </p>
            <p className="text-base text-muted-foreground leading-relaxed mb-6">
              She is a DOT-qualified Substance Abuse Professional, an experienced clinical supervisor,
              a certified yoga instructor and a Veriditas labyrinth facilitator, integrating body, mind,
              and spirit into her practice.
            </p>
            <blockquote className="text-lg italic leading-relaxed text-foreground" style={{ fontFamily: "'Lora', serif" }}>
              "Stress is the disease of the twenty-first century — but it doesn't have to define your life."
            </blockquote>
          </div>
        </div>
      </section>

      {/* ── ALL SERVICES ── */}
      <section id="services" className="py-20 md:py-24 bg-background scroll-mt-16">
        <div className="max-w-6xl mx-auto px-6">
          <Eyebrow>Also offered</Eyebrow>
          <h2 className="text-3xl md:text-4xl leading-tight mb-10" style={serif}>All services</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
            {services.map(({ icon: Icon, title, desc, to }) => {
              const inner = (
                <>
                  <Icon size={16} className="text-primary mb-5" strokeWidth={1.5} />
                  <h3 className="text-sm font-semibold text-foreground mb-2 leading-snug">{title}</h3>
                  <p className="text-[13px] text-muted-foreground leading-relaxed">{desc}</p>
                </>
              );
              return to ? (
                <Link key={title} to={to} className="bg-background p-7 hover:bg-secondary transition-colors block">{inner}</Link>
              ) : (
                <div key={title} className="bg-background p-7">{inner}</div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-20 md:py-24 bg-secondary scroll-mt-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-[5fr_7fr] gap-14 lg:gap-20">
          <div>
            <Eyebrow>Get started</Eyebrow>
            <h2 className="text-3xl md:text-4xl leading-tight mb-5" style={serif}>Tell us what you need</h2>
            <p className="text-base text-muted-foreground leading-relaxed mb-8">
              Prefer to talk? Call now — most people hear back within one business day.
            </p>
            <div className="space-y-5">
              {[
                { icon: Phone, label: "Phone", value: "301-956-3185", href: "tel:3019563185" },
                { icon: Mail, label: "Email", value: "drcarol@cherishconsulting.com", href: "mailto:drcarol@cherishconsulting.com" },
                { icon: MapPin, label: "Serving", value: "Tennessee & Virginia, by telehealth", href: undefined },
              ].map(({ icon: Icon, label, value, href }) => {
                const inner = (
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 border border-primary/30 flex items-center justify-center flex-shrink-0">
                      <Icon size={15} strokeWidth={1.5} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-[11px] text-muted-foreground tracking-[0.15em] uppercase mb-0.5">{label}</p>
                      <p className="text-[15px] text-foreground">{value}</p>
                    </div>
                  </div>
                );
                return href ? <a key={label} href={href}>{inner}</a> : <div key={label}>{inner}</div>;
              })}
            </div>
          </div>

          {formStatus === "sent" || formStatus === "fallback" ? (
            <div className="flex flex-col items-center justify-center min-h-[320px] text-center gap-4 bg-[#F2EDE4] p-8" role="status">
              {formStatus === "sent" ? (
                <>
                  <p className="text-lg text-foreground" style={serif}>Thank you. Your request is on its way.</p>
                  <p className="text-sm text-muted-foreground">Dr. Cherich will be in touch shortly. Need her sooner? Call <a href="tel:3019563185" className="underline">301-956-3185</a>.</p>
                </>
              ) : (
                <>
                  <p className="text-lg text-foreground" style={serif}>Almost done. Press send in your email app.</p>
                  <p className="text-sm text-muted-foreground">Your request opened as a new email to Dr. Cherich. If nothing opened, email <a href="mailto:drcarol@cherishconsulting.com" className="underline">drcarol@cherishconsulting.com</a> or call <a href="tel:3019563185" className="underline">301-956-3185</a>.</p>
                </>
              )}
              <button onClick={() => setFormStatus("idle")} className="text-sm text-primary underline underline-offset-2">Send another request</button>
            </div>
          ) : (
            <form className="bg-[#F2EDE4] p-8 grid sm:grid-cols-2 gap-5" onSubmit={async (e) => {
              e.preventDefault();
              const f = e.currentTarget;
              const v = (id: string) => ((f.querySelector(`#${id}`) as HTMLInputElement | null)?.value || "").trim();
              const data = { name: v("c-name"), phone: v("c-phone"), email: v("c-email"), topic: v("c-topic"), state: v("c-state"), message: v("c-msg") };
              setFormStatus("sending");
              try {
                await submitToHubSpot(data);
                setFormStatus("sent");
              } catch (err) {
                console.error(err);
                // Fallback: open the visitor's email app so the request still reaches Dr. Cherich.
                const topic = data.topic || "General inquiry";
                const body = [`Name: ${data.name}`, `Phone: ${data.phone}`, `Email: ${data.email}`, `Reaching out about: ${topic}`, `State: ${data.state}`, "", data.message].join("\n");
                window.location.href = `mailto:drcarol@cherishconsulting.com?subject=${encodeURIComponent(`Website request: ${topic}`)}&body=${encodeURIComponent(body)}`;
                setFormStatus("fallback");
              }
            }}>
              <div>
                <label htmlFor="c-name" className={labelCls}>Name</label>
                <input id="c-name" type="text" autoComplete="name" className={inputCls} required />
              </div>
              <div>
                <label htmlFor="c-phone" className={labelCls}>Phone</label>
                <input id="c-phone" type="tel" autoComplete="tel" className={inputCls} />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="c-email" className={labelCls}>Email</label>
                <input id="c-email" type="email" autoComplete="email" className={inputCls} required />
              </div>
              <div>
                <label htmlFor="c-topic" className={labelCls}>I'm reaching out about</label>
                <select id="c-topic" className={inputCls} defaultValue="">
                  <option value="" disabled>Choose one…</option>
                  <option>VA claim evaluation</option>
                  <option>DOT SAP evaluation (driver)</option>
                  <option>SAP services for my company</option>
                  <option>Labyrinth walk or workshop</option>
                  <option>Counseling or other services</option>
                </select>
              </div>
              <div>
                <label htmlFor="c-state" className={labelCls}>State</label>
                <select id="c-state" className={inputCls} defaultValue="">
                  <option value="" disabled>Choose one…</option>
                  <option>Tennessee</option>
                  <option>Virginia</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="c-msg" className={labelCls}>Anything we should know? (optional)</label>
                <textarea id="c-msg" rows={3} className={`${inputCls} resize-none`} />
              </div>
              <p className="sm:col-span-2 text-xs text-muted-foreground">
                Please don't include medical details here. We'll discuss those privately.
              </p>
              <button type="submit" disabled={formStatus === "sending"} className="sm:col-span-2 justify-self-start bg-primary text-primary-foreground px-7 py-4 text-xs tracking-widest uppercase hover:opacity-90 disabled:opacity-60">
                {formStatus === "sending" ? "Sending…" : "Send request"}
              </button>
            </form>
          )}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
