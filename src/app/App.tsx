import { useState, useEffect } from "react";
import {
  Menu, X, Phone, Mail, ChevronRight,
  Heart, Shield, Users, Brain, Activity, ClipboardList,
  GraduationCap, MapPin, Cookie,
} from "lucide-react";

const COOKIE_CONSENT_KEY = "cherish_cookie_consent";

type CookieChoice = "all" | "essential" | "declined";

function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!stored) setVisible(true);
  }, []);

  const choose = (choice: CookieChoice) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, choice);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-6 z-[100] w-64 bg-background border border-border shadow-lg overflow-hidden">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <Cookie size={14} className="text-muted-foreground flex-shrink-0" />
          <p className="text-sm font-semibold text-foreground">Cookie Preferences</p>
        </div>
        <p className="text-xs text-foreground/60 leading-relaxed mb-1">
          We use cookies to improve your experience. Choose your preference.
        </p>
        <button className="text-xs text-primary underline underline-offset-2 mb-3 hover:opacity-80">
          Learn more
        </button>
        <button
          onClick={() => choose("all")}
          className="w-full bg-primary text-primary-foreground text-[10px] tracking-widest uppercase py-2 mb-2 hover:opacity-90 transition-opacity"
        >
          Accept All
        </button>
        <div className="grid grid-cols-2 gap-2 mb-3">
          <button
            onClick={() => choose("essential")}
            className="border border-border text-[10px] tracking-widest uppercase py-1.5 text-foreground/70 hover:bg-secondary transition-colors"
          >
            Essential
          </button>
          <button
            onClick={() => choose("declined")}
            className="border border-border text-[10px] tracking-widest uppercase py-1.5 text-foreground/70 hover:bg-secondary transition-colors"
          >
            Decline
          </button>
        </div>
        <a href="/privacy" className="text-[10px] text-primary underline underline-offset-2 hover:opacity-80">
          Privacy Policy
        </a>
      </div>
    </div>
  );
}

function StarDivider({ count = 3, className = "" }: { count?: number; className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="text-accent text-xs select-none" style={{ fontSize: "0.6rem" }}>
          ★
        </span>
      ))}
    </div>
  );
}

function VeteranOwnedBadge() {
  return (
    <div className="flex items-center gap-1.5 border border-accent/30 px-2.5 py-1">
      <span className="text-accent" style={{ fontSize: "0.55rem" }}>★</span>
      <span className="text-[8px] tracking-[0.2em] uppercase text-accent font-semibold">
        Veteran-Owned
      </span>
      <span className="text-accent" style={{ fontSize: "0.55rem" }}>★</span>
    </div>
  );
}

const services = [
  {
    icon: Heart,
    title: "Life Coaching & Wellness",
    desc: "Holistic health and wellness guidance tailored to your life circumstances and goals.",
  },
  {
    icon: Shield,
    title: "Veterans & Military Families",
    desc: "Specialized counseling for soldiers, veterans, and the families who stand beside them.",
  },
  {
    icon: Brain,
    title: "Mental Health Treatment",
    desc: "Evidence-based care for anxiety, depression, PTSD, and related conditions.",
  },
  {
    icon: Activity,
    title: "Stress & Anger Management",
    desc: "Practical, lasting tools for managing stress — the defining challenge of our era.",
  },
  {
    icon: Users,
    title: "Substance Abuse Treatment",
    desc: "Compassionate support for those navigating addiction and early recovery.",
  },
  {
    icon: Heart,
    title: "Cancer Survivor Support",
    desc: "Therapeutic presence through diagnosis, treatment, and life beyond cancer.",
  },
  {
    icon: ClipboardList,
    title: "DOT-SAP & DWI Evaluations",
    desc: "Certified evaluations for DOT Substance Abuse Program and DWI/DUI requirements.",
  },
  {
    icon: GraduationCap,
    title: "Clinical Supervision",
    desc: "Professional supervision and consultation for graduate counseling interns.",
  },
];

const publications = [
  {
    title: "Moving Beyond Stress",
    type: "E-Book",
    year: "2018",
    image: "https://images-na.ssl-images-amazon.com/images/P/B091DTLHXN.01._SY300_.jpg",
    buyUrl: "https://www.amazon.com/Moving-Beyond-Stress-Carol-Cherich-ebook/dp/B091DTLHXN/",
    description:
      "A practical learning tool focused on stress reduction — with quizzes, breathing techniques, and strategies for identifying and decreasing stressors. A quick desk reference for navigating life's pressures.",
  },
  {
    title: "Addicted Parents in Recovery & Treatment",
    type: "E-Book",
    year: "2013",
    image: "https://images-na.ssl-images-amazon.com/images/P/B0CTHSMV46.01._SY300_.jpg",
    buyUrl: "https://www.amazon.com/Addicted-parents-treatment-recovery-Cherich-ebook/dp/B0CTHSMV46/",
    description:
      "An evidence-based relapse prevention curriculum addressing substance-abusing parents — covering stress management, parenting skills, childcare resources, and money management.",
  },
  {
    title: "Chair Yoga",
    type: "E-Book",
    year: "2020",
    image: "https://images-na.ssl-images-amazon.com/images/P/B0D8B9JBDP.01._SY300_.jpg",
    buyUrl: "https://www.amazon.com/Chair-Yoga-Carol-Cherich-ebook/dp/B0D8B9JBDP/",
    description:
      "An accessible yoga guide for all ages from a 200-hour certified instructor and licensed clinician, bringing the benefits of mindful movement to those who prefer seated practice.",
  },
  {
    title: "Breast Cancer Support Curriculum",
    type: "E-Book",
    year: "2024",
    image: "https://images-na.ssl-images-amazon.com/images/P/B0D89M759R.01._SY300_.jpg",
    buyUrl: "https://www.amazon.com/Breast-cancer-support-curriculum-Cherich-ebook/dp/B0D89M759R/",
    description:
      "A self-help and facilitation guide for patients, caregivers, nurses, and counselors navigating the breast cancer journey — an inspirational tool built to support and educate.",
  },
  {
    title: "Psychosocial Stress and Alcohol Abuse Among Hispanic Males",
    type: "Research Paper",
    year: "2014",
    image: "https://images-na.ssl-images-amazon.com/images/P/B0D8C2PMJ1.01._SY300_.jpg",
    buyUrl: "https://www.amazon.com/Psychosocial-stress-alcohol-abuse-Hispanic-ebook/dp/B0D8C2PMJ1/",
    description:
      "Research examining psychosocial stressors and alcohol abuse, with evidence-based intervention outcomes developed through work at Providence Hospital, Washington, D.C.",
  },
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [formSent, setFormSent] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = ["about", "services", "contact"];
    const observers = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: "-30% 0px -55% 0px" }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((obs) => obs?.disconnect());
  }, []);

  return (
    <div
      className="min-h-screen bg-background text-foreground"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <CookieBanner />
      <a href="#about" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:text-xs focus:tracking-widest focus:uppercase">Skip to content</a>
      {/* ── NAV ── */}
      <nav
        aria-label="Main navigation"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center h-16 gap-10">
          <div className="flex items-center gap-4">
            <a href="#" aria-label="Cherich Consulting home">
              <img src="/cherish-logo.png" alt="Cherich Consulting" className="h-10 w-auto" />
            </a>
            <VeteranOwnedBadge />
          </div>

          <div className="hidden md:flex items-center gap-8 ml-auto">
            {["About", "Services"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className={`text-sm tracking-wide transition-colors ${activeSection === link.toLowerCase() ? "text-foreground border-b border-primary pb-0.5" : "text-foreground/55 hover:text-foreground"}`}
              >
                {link}
              </a>
            ))}
            <a
              href="/books"
              className="text-sm tracking-wide transition-colors text-foreground/55 hover:text-foreground"
            >
              Publications
            </a>
            <a
              href="/labyrinths"
              className="text-sm tracking-wide transition-colors text-foreground/55 hover:text-foreground"
            >
              Labyrinths
            </a>
            <a
              href="https://www.ptsd.va.gov/appvid/video/index.asp"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm tracking-wide transition-colors text-foreground/55 hover:text-foreground"
            >
              VA PTSD
            </a>
            <a
              href="https://learn.psycharmor.org/collections"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm tracking-wide transition-colors text-foreground/55 hover:text-foreground"
            >
              Veterans Courses
            </a>
            <a
              href="#contact"
              className={`text-sm tracking-wide transition-colors ${activeSection === "contact" ? "text-foreground border-b border-primary pb-0.5" : "text-foreground/55 hover:text-foreground"}`}
            >
              Contact
            </a>
            <a
              href="#contact"
              className="px-5 py-2 bg-primary text-primary-foreground text-xs tracking-widest uppercase hover:opacity-90 transition-opacity"
            >
              Schedule a Session
            </a>
          </div>

          <button
            className="md:hidden text-foreground p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-background border-t border-border px-6 py-5 flex flex-col gap-5">
            {["About", "Services"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-sm text-foreground/70 hover:text-foreground"
                onClick={() => setMenuOpen(false)}
              >
                {link}
              </a>
            ))}
            <a
              href="/books"
              className="text-sm text-foreground/70 hover:text-foreground"
              onClick={() => setMenuOpen(false)}
            >
              Publications
            </a>
            <a
              href="/labyrinths"
              className="text-sm text-foreground/70 hover:text-foreground"
              onClick={() => setMenuOpen(false)}
            >
              Labyrinths
            </a>
            <a
              href="https://www.ptsd.va.gov/appvid/video/index.asp"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-foreground/70 hover:text-foreground"
              onClick={() => setMenuOpen(false)}
            >
              VA PTSD
            </a>
            <a
              href="https://learn.psycharmor.org/collections"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-foreground/70 hover:text-foreground"
              onClick={() => setMenuOpen(false)}
            >
              Veterans Courses
            </a>
            <a
              href="#contact"
              className="text-sm text-foreground/70 hover:text-foreground"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </a>
            <a
              href="#contact"
              className="px-5 py-3 bg-primary text-primary-foreground text-xs tracking-widest uppercase text-center"
              onClick={() => setMenuOpen(false)}
            >
              Schedule a Session
            </a>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section className="min-h-screen grid md:grid-cols-2 items-stretch">
        {/* Text */}
        <div className="flex flex-col min-w-0 overflow-hidden px-8 md:px-14 lg:px-20 pt-28 pb-12 bg-background">
          <div className="flex items-center gap-3 mb-6">
            <StarDivider count={3} />
            <span className="text-[10px] tracking-[0.25em] uppercase text-accent font-medium">
              Dr. Carol J. Cherich, PhD
            </span>
          </div>

          <h1
            className="text-5xl md:text-[3.25rem] lg:text-[3.75rem] leading-[1.1] text-foreground mb-7"
            style={{ fontFamily: "'Lora', serif", fontWeight: 500 }}
          >
            Healing Through
            <br />
            <span className="text-primary">Experience,</span>
            <br />
            Grounded in
            <br />
            <em className="not-italic text-accent">Service.</em>
          </h1>

          <p className="text-[0.95rem] text-foreground/60 leading-relaxed max-w-md mb-10">
            A veteran-owned counseling and wellness practice serving soldiers, veterans, cancer
            survivors, and families across Tennessee and Virginia — for over 15 years.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground text-xs tracking-widest uppercase hover:opacity-90 transition-opacity"
            >
              Get In Touch <ChevronRight size={12} />
            </a>
            <a
              href="#services"
              className="inline-flex items-center gap-2 px-6 py-3 border border-foreground/20 text-foreground/60 text-xs tracking-widest uppercase hover:bg-secondary transition-colors"
            >
              Our Services
            </a>
          </div>

          <div className="mt-auto pt-8 border-t border-border grid grid-cols-3 gap-6">
            {[
              { val: "15+", label: "Years in Practice" },
              { val: "PhD", label: "Capella University" },
              { val: "TN & VA", label: "Licensed" },
            ].map((stat) => (
              <div key={stat.val}>
                <div
                  className="text-2xl text-primary mb-1"
                  style={{ fontFamily: "'Lora', serif", fontWeight: 500 }}
                >
                  {stat.val}
                </div>
                <div className="text-[9px] text-muted-foreground tracking-widest uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Image */}
        <div className="relative min-h-[55vw] bg-secondary overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1000&h=1200&fit=crop&auto=format"
            alt="Alpine mountain sunset panoramic view"
            loading="eager"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-background/30" />
          <div className="absolute inset-0 bg-primary/10" />

          <div className="absolute bottom-8 left-8 right-8 md:right-auto md:max-w-sm bg-background/92 backdrop-blur-sm overflow-hidden">
            {/* Tricolor stripe */}
            <div className="flex h-1">
              <div className="flex-1 bg-[#1C2B4A]" />
              <div className="flex-1 bg-background/60" />
              <div className="flex-1 bg-[#8B2020]" />
            </div>
            <div className="p-7 border-l-2 border-primary">
              <p className="text-[1rem] text-foreground/70 italic leading-relaxed">
                "Stress is the disease of the twenty-first century — but it doesn't have to define
                your life."
              </p>
              <p className="text-[11px] text-primary mt-4 font-semibold tracking-wide uppercase">
                — Dr. Carol J. Cherich
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-24 bg-secondary">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-[2fr_3fr] gap-14 lg:gap-20 items-center">
          <div className="relative">
            <div className="aspect-[3/4] bg-muted overflow-hidden">
              <img
                src="/carol-portrait.png"
                alt="Dr. Carol J. Cherich, PhD, licensed mental health clinician"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-5 -right-5 w-28 h-28 bg-primary flex flex-col items-center justify-center text-primary-foreground text-center p-3">
              <span
                className="text-2xl"
                style={{ fontFamily: "'Lora', serif", fontWeight: 500 }}
              >
                15+
              </span>
              <span className="text-[8px] tracking-[0.15em] uppercase leading-tight mt-1 opacity-80">
                Years Clinical Practice
              </span>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-5">
              <StarDivider count={3} />
              <span className="text-[10px] tracking-[0.25em] uppercase text-accent font-medium">
                About Dr. Cherich
              </span>
            </div>
            <h2
              className="text-3xl md:text-4xl leading-tight mb-6 text-foreground"
              style={{ fontFamily: "'Lora', serif", fontWeight: 500 }}
            >
              A Clinician Shaped by Service and Compassion
            </h2>
            <p className="text-[0.95rem] text-foreground/60 leading-relaxed mb-5">
              Dr. Carol J. Cherich holds a PhD from Capella University and brings more than 15 years
              of experience as a licensed clinician in mental health and addictions. Her background as
              an active-duty military medic gives her a rare, firsthand understanding of the challenges
              faced by those who serve — and those who love them.
            </p>
            <p className="text-[0.95rem] text-foreground/60 leading-relaxed mb-8">
              A certified yoga instructor and experienced clinical supervisor, Dr. Cherich integrates
              body, mind, and spirit into her practice — recognizing that true healing is never simply
              clinical. She currently serves clients in Tennessee and Virginia through individual
              sessions, group work, evaluations, and consultation.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "Licensed Mental Health Clinician",
                "Certified Yoga Instructor",
                "Former Active-Duty Military Medic",
                "Clinical Supervisor, Graduate Interns",
              ].map((credential) => (
                <div key={credential} className="flex items-start gap-2.5">
                  <span className="text-accent flex-shrink-0 mt-0.5 leading-none" style={{ fontSize: "0.55rem" }}>★</span>
                  <span className="text-sm text-foreground/65 leading-snug">{credential}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PHILOSOPHY ── */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="w-px h-14 bg-primary-foreground/25 mx-auto mb-10" />
          <blockquote
            className="text-2xl md:text-3xl lg:text-4xl leading-relaxed italic"
            style={{ fontFamily: "'Lora', serif", fontWeight: 400 }}
          >
            "Stress is the disease of the twenty-first century. Left unmanaged, it touches every
            dimension of life — and met with courage, it becomes the gateway to resilience."
          </blockquote>
          <div className="w-px h-14 bg-primary-foreground/25 mx-auto mt-10 mb-8" />
          <p className="text-[10px] tracking-[0.25em] uppercase text-primary-foreground/50 font-medium">
            Dr. Carol J. Cherich, PhD — Core Philosophy
          </p>
        </div>
      </section>

      {/* ── VETERAN BAND ── */}
      <section className="relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1777058984349-0e176b203d7e?w=1400&h=600&fit=crop&auto=format"
          alt="Military honor guard carefully folding the American flag"
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#1C2B4A]/72" />
        <div className="absolute top-0 left-0 right-0 flex h-1">
          <div className="flex-1 bg-[#1C2B4A]" />
          <div className="w-px bg-white/30" />
          <div className="flex-1 bg-[#8B2020]" />
        </div>

        <div className="relative z-10 py-20 px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-[1fr_1px_1fr_1px_1fr] gap-0 items-stretch">
            <div className="text-center px-8 py-4">
              <StarDivider count={5} className="justify-center mb-4" />
              <p
                className="text-3xl md:text-4xl text-white mb-3"
                style={{ fontFamily: "'Lora', serif", fontWeight: 500 }}
              >
                For Those Who Served
              </p>
              <p className="text-sm text-white/60 leading-relaxed max-w-xs mx-auto">
                Dr. Cherich's military background as an active-duty medic grounds her work with
                veterans in genuine understanding — not just clinical training.
              </p>
            </div>

            <div className="hidden md:block bg-white/10" />

            <div className="text-center px-8 py-4 mt-8 md:mt-0">
              <div className="grid grid-cols-2 gap-6 max-w-xs mx-auto">
                {[
                  { val: "PTSD", label: "Treatment" },
                  { val: "MST", label: "Support" },
                  { val: "Transition", label: "Counseling" },
                  { val: "Family", label: "Sessions" },
                ].map(({ val, label }) => (
                  <div key={val} className="text-center">
                    <p
                      className="text-xl text-white"
                      style={{ fontFamily: "'Lora', serif" }}
                    >
                      {val}
                    </p>
                    <p className="text-[9px] tracking-[0.2em] uppercase text-white/45 mt-0.5">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden md:block bg-white/10" />

            <div className="text-center px-8 py-4 mt-8 md:mt-0 flex flex-col items-center justify-center">
              <div className="border border-white/20 p-5 max-w-xs">
                <StarDivider count={5} className="justify-center mb-3" />
                <p className="text-sm text-white/70 italic leading-relaxed">
                  "I know what it costs to serve. That experience is at the heart of every
                  session I offer veterans and their families."
                </p>
                <p className="text-[9px] text-white/40 tracking-[0.2em] uppercase mt-3">
                  — Dr. Carol J. Cherich
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 flex h-1">
          <div className="flex-1 bg-[#1C2B4A]" />
          <div className="w-px bg-white/30" />
          <div className="flex-1 bg-[#8B2020]" />
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="py-24 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-4">
            <StarDivider count={3} />
            <span className="text-[10px] tracking-[0.25em] uppercase text-accent font-medium">
              What We Offer
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
            <h2
              className="text-3xl md:text-4xl leading-tight text-foreground max-w-md"
              style={{ fontFamily: "'Lora', serif", fontWeight: 500 }}
            >
              Services Tailored to Where You Are
            </h2>
            <p className="text-sm text-foreground/50 max-w-xs leading-relaxed">
              Every service is delivered with the same commitment to your long-term wellbeing —
              clinical and compassionate.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
            {services.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-background p-7 hover:bg-secondary transition-colors group cursor-default"
              >
                <div className="mb-5">
                  <Icon
                    size={16}
                    className="text-primary group-hover:text-accent transition-colors"
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="text-sm font-semibold text-foreground mb-2 leading-snug">{title}</h3>
                <p className="text-xs text-foreground/50 leading-relaxed mb-4">{desc}</p>
                <ChevronRight size={12} className="text-primary/0 group-hover:text-primary/60 transition-colors mt-auto" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-24 bg-background">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-[5fr_7fr] gap-14 lg:gap-20">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <StarDivider count={3} />
              <span className="text-[10px] tracking-[0.25em] uppercase text-accent font-medium">
                Get In Touch
              </span>
            </div>
            <h2
              className="text-3xl md:text-4xl leading-tight text-foreground mb-5"
              style={{ fontFamily: "'Lora', serif", fontWeight: 500 }}
            >
              Begin Your Path to Wellness
            </h2>
            <p className="text-[0.95rem] text-foreground/55 leading-relaxed mb-10">
              Whether you are seeking support for yourself, your family, or your team — we would
              welcome the opportunity to connect. Reach out directly or send a message.
            </p>

            <div className="space-y-5">
              {[
                {
                  icon: Phone,
                  label: "Phone",
                  value: "301-956-3185",
                  href: "tel:3019563185",
                },
                {
                  icon: Mail,
                  label: "Email",
                  value: "drcarol@cherishconsulting.com",
                  href: "mailto:drcarol@cherishconsulting.com",
                },
                {
                  icon: MapPin,
                  label: "Serving",
                  value: "Tennessee & Virginia",
                  href: undefined,
                },
              ].map(({ icon: Icon, label, value, href }) => {
                const inner = (
                  <div className="flex items-center gap-4 group">
                    <div className="w-10 h-10 border border-border flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:border-primary transition-colors">
                      <Icon
                        size={13}
                        strokeWidth={1.5}
                        className="text-foreground/50 group-hover:text-primary-foreground transition-colors"
                      />
                    </div>
                    <div>
                      <p className="text-[9px] text-muted-foreground tracking-[0.2em] uppercase mb-0.5">
                        {label}
                      </p>
                      <p className="text-sm text-foreground">{value}</p>
                    </div>
                  </div>
                );
                return href ? (
                  <a key={label} href={href}>
                    {inner}
                  </a>
                ) : (
                  <div key={label}>{inner}</div>
                );
              })}
            </div>
          </div>

          {formSent ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[320px] text-center gap-4">
              <div className="w-12 h-12 border border-primary flex items-center justify-center">
                <span className="text-primary text-lg">✓</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground mb-1">Message Sent</p>
                <p className="text-xs text-foreground/50">Thank you for reaching out. Dr. Cherich will be in touch shortly.</p>
              </div>
              <button onClick={() => setFormSent(false)} className="text-xs text-primary underline underline-offset-2 hover:opacity-70 mt-2">Send another message</button>
            </div>
          ) : (
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setFormSent(true); }}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[9px] text-muted-foreground tracking-[0.2em] uppercase block mb-1.5">
                  First Name
                </label>
                <input
                  type="text"
                  className="w-full border border-border bg-secondary px-3 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors placeholder:text-foreground/30"
                  placeholder="First"
                />
              </div>
              <div>
                <label className="text-[9px] text-muted-foreground tracking-[0.2em] uppercase block mb-1.5">
                  Last Name
                </label>
                <input
                  type="text"
                  className="w-full border border-border bg-secondary px-3 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors placeholder:text-foreground/30"
                  placeholder="Last"
                />
              </div>
            </div>
            <div>
              <label className="text-[9px] text-muted-foreground tracking-[0.2em] uppercase block mb-1.5">
                Email
              </label>
              <input
                type="email"
                className="w-full border border-border bg-secondary px-3 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors placeholder:text-foreground/30"
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label className="text-[9px] text-muted-foreground tracking-[0.2em] uppercase block mb-1.5">
                Area of Interest
              </label>
              <select className="w-full border border-border bg-secondary px-3 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors text-foreground/70">
                <option value="">Select a service…</option>
                {services.map((s) => (
                  <option key={s.title}>{s.title}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[9px] text-muted-foreground tracking-[0.2em] uppercase block mb-1.5">
                Message
              </label>
              <textarea
                rows={4}
                className="w-full border border-border bg-secondary px-3 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors resize-none placeholder:text-foreground/30"
                placeholder="Tell us how we can help…"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground py-3 text-xs tracking-widest uppercase hover:opacity-90 transition-opacity"
            >
              Send Message
            </button>
          </form>
          )}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-foreground text-background">
        <div className="flex h-0.5">
          <div className="flex-1 bg-[#1C2B4A]" />
          <div className="flex-1 bg-background/20" />
          <div className="flex-1 bg-[#8B2020]" />
        </div>
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-0.5">
              <span
                className="text-sm tracking-widest uppercase"
                style={{ fontFamily: "'Lora', serif" }}
              >
                Cherich Consulting
              </span>
              <span className="text-[#8B8060] text-[0.5rem] tracking-widest">★ ★ ★</span>
            </div>
            <p className="text-[10px] text-background/35 tracking-wide">
              Veteran-Owned · Mental Health & Wellness · Tennessee & Virginia
            </p>
          </div>
          <div className="flex flex-col items-center md:items-end gap-2">
            <p className="text-[10px] text-background/35 tracking-wide">
              © {new Date().getFullYear()} Dr. Carol J. Cherich, PhD · Honoring All Who Serve
            </p>
            <div className="flex items-center gap-4">
              <a href="/tos" className="text-[10px] text-background/40 hover:text-background/70 tracking-wide transition-colors">
                Terms of Service
              </a>
              <span className="text-background/20 text-[10px]">·</span>
              <a href="/privacy" className="text-[10px] text-background/40 hover:text-background/70 tracking-wide transition-colors">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
