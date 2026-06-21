import { useState, useEffect } from "react";
import {
  Lock, BarChart2, BookOpen, LogOut,
  ExternalLink, Check, AlertCircle, Eye, EyeOff, Printer, Search,
  RefreshCw, PenSquare, Trash2,
} from "lucide-react";
import { sanityClient, sanityAdminClient } from "../lib/sanity";

// ─────────────────────────────────────────────────────────
// Master key — set VITE_ADMIN_KEY in Vercel:
//   Settings → Environment Variables → VITE_ADMIN_KEY
// The key is compared client-side so keep it non-sensitive
// (a passphrase, not a secret token). For production-grade
// auth, wire up Sanity's identity or a backend session.
// ─────────────────────────────────────────────────────────
const MASTER_KEY = import.meta.env.VITE_ADMIN_KEY as string | undefined;
const SESSION_FLAG = "cherich_admin_session";
const GA_STORAGE_KEY = "cherich_ga_id";
const SEO_STORAGE_KEY = "cherich_seo_settings";

type Tab = "analytics" | "seo" | "blog";

// ── SEO types ─────────────────────────────────────────────

interface PageSEO {
  title: string;
  description: string;
  keywords: string;
}

interface SEOSettings {
  site: PageSEO;
  pages: Record<string, PageSEO>;
}

const PAGE_ROUTES: { key: string; label: string; path: string }[] = [
  { key: "home",       label: "Home",         path: "/" },
  { key: "books",      label: "Publications",  path: "/books" },
  { key: "labyrinths", label: "Labyrinths",    path: "/labyrinths" },
  { key: "esa",        label: "ESA Letters",   path: "/esa" },
  { key: "tos",        label: "Terms of Service", path: "/tos" },
  { key: "privacy",    label: "Privacy Policy", path: "/privacy" },
];

const DEFAULT_SEO: SEOSettings = {
  site: {
    title: "Cherich Consulting — Dr. Carol J. Cherich, PhD",
    description:
      "Veteran-owned mental health and wellness practice serving Tennessee and Virginia. Life coaching, PTSD support, substance abuse treatment, and more.",
    keywords:
      "mental health counseling, veterans counseling, life coaching, PTSD, Tennessee therapist, Virginia therapist, Cherich Consulting, Carol Cherich",
  },
  pages: {
    home: {
      title: "Cherich Consulting — Healing Through Experience, Grounded in Service",
      description:
        "Dr. Carol J. Cherich, PhD offers compassionate mental health treatment, veterans counseling, life coaching, and wellness services in Tennessee and Virginia.",
      keywords: "mental health, veterans support, life coaching, PTSD treatment, Tennessee, Virginia",
    },
    books: {
      title: "Books & E-Books — Cherich Consulting",
      description:
        "Published works by Dr. Carol J. Cherich spanning stress management, addiction recovery, chair yoga, cancer support, and clinical research. Available on Amazon.",
      keywords: "Carol Cherich books, stress management ebook, addiction recovery, chair yoga, cancer support",
    },
    labyrinths: {
      title: "Labyrinths — Cherich Consulting",
      description:
        "Explore the use of labyrinths as a meditative and therapeutic tool. Resources for veterans, mental health clinicians, and individuals seeking mindful movement.",
      keywords: "labyrinth meditation, therapeutic labyrinths, mindfulness, veterans wellness",
    },
    esa: {
      title: "ESA Letters — Cherich Consulting",
      description:
        "Emotional Support Animal evaluations and letters from a licensed mental health clinician. Dr. Carol J. Cherich, PhD provides professional ESA documentation.",
      keywords: "ESA letter, emotional support animal, ESA evaluation, licensed therapist",
    },
    tos: {
      title: "Terms of Service — Cherich Consulting",
      description: "Terms of Service for Cherich Consulting, a veteran-owned mental health practice.",
      keywords: "",
    },
    privacy: {
      title: "Privacy Policy — Cherich Consulting",
      description:
        "Privacy Policy for Cherich Consulting. We do not sell your personal information. All PII and PHI is held in strict confidence.",
      keywords: "",
    },
  },
};

function loadSEO(): SEOSettings {
  try {
    const raw = localStorage.getItem(SEO_STORAGE_KEY);
    if (raw) return { ...DEFAULT_SEO, ...JSON.parse(raw) };
  } catch {}
  return DEFAULT_SEO;
}

function saveSEO(settings: SEOSettings) {
  localStorage.setItem(SEO_STORAGE_KEY, JSON.stringify(settings));
}

// ── helpers ──────────────────────────────────────────────

function getStoredGaId() {
  return localStorage.getItem(GA_STORAGE_KEY) ?? "";
}

// ── Lock screen ──────────────────────────────────────────

function LockScreen({ onUnlock }: { onUnlock: () => void }) {
  const [value, setValue] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!MASTER_KEY) {
      // No key set in env — show setup hint instead of blocking
      setError(true);
      return;
    }
    if (value === MASTER_KEY) {
      sessionStorage.setItem(SESSION_FLAG, "1");
      onUnlock();
    } else {
      setError(true);
      setValue("");
    }
  }

  return (
    <div className="min-h-screen bg-[#2A3E4A] flex items-center justify-center px-6">
      <div className="w-full max-w-[340px]">
        {/* Logo mark */}
        <div className="flex justify-center mb-10">
          <div className="w-12 h-12 border border-white/12 flex items-center justify-center">
            <Lock size={16} className="text-white/40" strokeWidth={1.5} />
          </div>
        </div>

        <p className="text-[10px] tracking-[0.3em] uppercase text-white/30 text-center mb-8 font-medium">
          Cherich Consulting · Admin
        </p>

        <form onSubmit={submit} className="space-y-3">
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              value={value}
              autoFocus
              autoComplete="current-password"
              placeholder="Master key"
              onChange={(e) => { setValue(e.target.value); setError(false); }}
              className="w-full bg-white/6 border border-white/12 text-white text-sm px-4 py-3 pr-10 outline-none focus:border-white/30 transition-colors placeholder:text-white/20 tracking-wide"
            />
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/50 transition-colors"
            >
              {show ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>

          {error && (
            <p className="flex items-center gap-1.5 text-[11px] text-red-300/70">
              <AlertCircle size={11} />
              {!MASTER_KEY
                ? "VITE_ADMIN_KEY is not set — add it in Vercel → Settings → Environment Variables"
                : "Incorrect key"}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-white/90 text-[#2A3E4A] text-xs tracking-widest uppercase py-3 hover:bg-white transition-colors font-semibold"
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
}

// ── Analytics tab ─────────────────────────────────────────

function AnalyticsTab() {
  const [gaId, setGaId] = useState(getStoredGaId);
  const [saved, setSaved] = useState(false);
  const stored = getStoredGaId();
  const isValid = gaId.trim().toUpperCase().startsWith("G-");

  function save() {
    if (!isValid) return;
    localStorage.setItem(GA_STORAGE_KEY, gaId.trim());
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  function remove() {
    localStorage.removeItem(GA_STORAGE_KEY);
    setGaId("");
  }

  const printedAt = new Date().toLocaleDateString("en-US", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  return (
    <>
      {/* ── Print-only report — hidden on screen, rendered when printing ── */}
      <div className="hidden print:block">
        {/* Page setup */}
        <style>{`@page { margin: 1.5cm 2cm; } @media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }`}</style>

        {/* Report header */}
        <div style={{ borderBottom: "2px solid #2A3E4A", paddingBottom: "1.25rem", marginBottom: "2rem" }}>
          <p style={{ fontSize: "9px", letterSpacing: "0.25em", textTransform: "uppercase", color: "#7A5C3A", marginBottom: "0.5rem", fontFamily: "DM Sans, sans-serif" }}>
            Analytics Configuration Report
          </p>
          <h1 style={{ fontFamily: "Lora, Georgia, serif", fontSize: "1.6rem", fontWeight: 500, color: "#1E1A14", margin: "0 0 0.25rem" }}>
            Cherich Consulting
          </h1>
          <p style={{ fontSize: "11px", color: "#6B5E4E", margin: 0, fontFamily: "DM Sans, sans-serif" }}>
            Printed {printedAt}
          </p>
        </div>

        {/* Configuration table */}
        <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "2.5rem", fontFamily: "DM Sans, sans-serif" }}>
          <tbody>
            {(
              [
                ["Platform", "cherishconsulting.com"],
                ["Analytics Service", "Google Analytics 4"],
                ["Status", stored ? "● Active" : "○ Not configured"],
                ["Measurement ID", stored || "—"],
                ["Activation", "Dynamic — loads on each site visit when an ID is saved"],
                ["Managed via", "cherishconsulting.com/admin · Analytics tab"],
              ] as [string, string][]
            ).map(([label, value]) => (
              <tr key={label} style={{ borderBottom: "1px solid rgba(42,62,74,0.1)" }}>
                <td style={{ padding: "0.65rem 0", fontSize: "10px", color: "#6B5E4E", width: "36%", textTransform: "uppercase", letterSpacing: "0.12em", verticalAlign: "top", paddingRight: "1rem" }}>
                  {label}
                </td>
                <td style={{
                  padding: "0.65rem 0",
                  fontSize: "13px",
                  color: label === "Status" && stored ? "#15803d" : "#1E1A14",
                  fontFamily: label === "Measurement ID" ? "monospace" : "inherit",
                  fontWeight: label === "Measurement ID" && stored ? 600 : 400,
                }}>
                  {value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Footer note */}
        <p style={{ fontSize: "10px", color: "#6B5E4E", borderTop: "1px solid rgba(42,62,74,0.1)", paddingTop: "1rem", fontFamily: "DM Sans, sans-serif" }}>
          This report reflects the analytics configuration stored in this browser at the time of printing.
          To view live traffic data, visit <strong>analytics.google.com</strong>.
        </p>
      </div>

      {/* ── Screen UI — visible on screen, hidden when printing ── */}
      <div className="print:hidden space-y-6">

        {/* Print button — top-right */}
        <div className="flex justify-end">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-4 py-2 border border-[#2A3E4A]/14 text-xs tracking-widest uppercase text-[#6B5E4E] hover:border-[#2A3E4A]/30 hover:text-[#1E1A14] hover:bg-white transition-colors font-medium"
          >
            <Printer size={12} strokeWidth={1.5} /> Print
          </button>
        </div>

        {/* Status + ID input */}
        <div className="border border-[#2A3E4A]/14 bg-[#F2EDE4]/40 p-6">
          <div className="flex items-start justify-between gap-4 mb-5">
            <div>
              <p className="text-sm font-semibold text-[#1E1A14] mb-0.5">Google Analytics 4</p>
              <p className="text-[11px] text-[#6B5E4E] leading-relaxed">
                Your Measurement ID is saved in the browser and loaded on every site visit.
                Changing it here takes effect on the next page load.
              </p>
            </div>
            <span className={`flex-shrink-0 flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full ${
              stored
                ? "bg-emerald-100 text-emerald-700"
                : "bg-[#2A3E4A]/8 text-[#6B5E4E]"
            }`}>
              {stored ? <><Check size={10} /> Active</> : <><AlertCircle size={10} /> Not set</>}
            </span>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={gaId}
              onChange={(e) => { setGaId(e.target.value); setSaved(false); }}
              placeholder="G-XXXXXXXXXX"
              className="flex-1 bg-white border border-[#2A3E4A]/14 text-[#1E1A14] text-sm px-3 py-2.5 outline-none focus:border-[#2A3E4A]/40 transition-colors placeholder:text-[#6B5E4E]/40 font-mono tracking-wide"
            />
            <button
              onClick={save}
              disabled={!isValid}
              className="px-4 py-2.5 bg-[#2A3E4A] text-[#F2EDE4] text-xs tracking-widest uppercase font-semibold hover:bg-[#1E2E38] transition-colors disabled:opacity-30"
            >
              {saved ? "✓ Saved" : "Save"}
            </button>
            {stored && (
              <button
                onClick={remove}
                className="px-4 py-2.5 border border-[#2A3E4A]/14 text-[#6B5E4E] text-xs tracking-wide hover:border-[#2A3E4A]/30 hover:text-[#1E1A14] transition-colors"
              >
                Remove
              </button>
            )}
          </div>

          {gaId && !isValid && (
            <p className="text-[11px] text-red-500/70 mt-2 flex items-center gap-1">
              <AlertCircle size={10} /> Must begin with G-
            </p>
          )}
        </div>

        {/* Open GA dashboard */}
        {stored && (
          <a
            href="https://analytics.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-5 border border-[#2A3E4A]/14 hover:border-[#2A3E4A]/30 transition-colors group bg-white"
          >
            <div>
              <p className="text-sm font-semibold text-[#1E1A14] mb-0.5">Open Google Analytics</p>
              <p className="text-[11px] text-[#6B5E4E]">
                Real-time visitors · traffic sources · page events · conversions
              </p>
            </div>
            <ExternalLink size={14} className="text-[#6B5E4E] group-hover:text-[#2A3E4A] transition-colors flex-shrink-0" />
          </a>
        )}

        {/* Setup guide (shown when no ID is configured) */}
        {!stored && (
          <div className="border border-[#2A3E4A]/14 p-6 bg-white">
            <p className="text-[10px] tracking-[0.25em] uppercase text-[#7A5C3A] font-medium mb-4">
              Setup guide
            </p>
            <ol className="space-y-3">
              {[
                <>Go to <a href="https://analytics.google.com" target="_blank" rel="noopener noreferrer" className="text-[#2A3E4A] underline underline-offset-2">analytics.google.com</a> and sign in.</>,
                <>Create a property for <strong>cherishconsulting.com</strong> if you haven't already.</>,
                <>Copy your <strong>Measurement ID</strong> — it starts with G-.</>,
                <>Paste it above and click <strong>Save</strong>. Tracking activates on the next page load.</>,
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3 text-xs text-[#6B5E4E] leading-relaxed">
                  <span className="text-[#2A3E4A]/30 flex-shrink-0 w-4 font-mono">{i + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        )}

      </div>
    </>
  );
}

// ── SEO tab ───────────────────────────────────────────────

function SEOTab() {
  const [settings, setSettings] = useState<SEOSettings>(loadSEO);
  const [saved, setSaved] = useState(false);
  const [activeKey, setActiveKey] = useState("home");

  const activePage = settings.pages[activeKey] ?? { title: "", description: "", keywords: "" };

  function updatePage(field: keyof PageSEO, value: string) {
    setSettings(prev => ({
      ...prev,
      pages: { ...prev.pages, [activeKey]: { ...prev.pages[activeKey], [field]: value } },
    }));
  }

  function updateSite(field: keyof PageSEO, value: string) {
    setSettings(prev => ({ ...prev, site: { ...prev.site, [field]: value } }));
  }

  function handleSave() {
    saveSEO(settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  function handleReset() {
    setSettings(DEFAULT_SEO);
    saveSEO(DEFAULT_SEO);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  const titleLen = activePage.title.length;
  const descLen = activePage.description.length;

  return (
    <div className="space-y-8">

      {/* Info banner */}
      <div className="border border-[#2A3E4A]/14 bg-white px-5 py-4">
        <div className="flex items-start gap-3">
          <AlertCircle size={14} className="text-[#2A3E4A]/50 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
          <p className="text-[11px] text-[#6B5E4E] leading-relaxed">
            SEO settings are saved to this browser and applied at runtime. For best results, also update
            your <strong>Vercel project's</strong>{" "}
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-[#2A3E4A]"
            >
              environment variables
            </a>{" "}
            or hardcode meta tags in <code className="text-[10px] bg-[#F2EDE4] px-1 py-0.5">index.html</code> for
            crawlers that don't execute JavaScript.
          </p>
        </div>
      </div>

      {/* Global site defaults */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-[10px] tracking-[0.25em] uppercase text-[#6B5E4E] font-semibold">
            Site-Wide Defaults
          </h2>
          <div className="flex-1 h-px bg-[#2A3E4A]/8" />
        </div>
        <div className="border border-[#2A3E4A]/14 bg-white p-5 space-y-4">
          <div>
            <label className="text-[9px] tracking-[0.2em] uppercase text-[#6B5E4E] block mb-1.5">
              Default Title
            </label>
            <input
              type="text"
              value={settings.site.title}
              onChange={e => updateSite("title", e.target.value)}
              className="w-full border border-[#2A3E4A]/14 bg-[#F2EDE4] px-3 py-2 text-sm text-[#1E1A14] focus:outline-none focus:border-[#2A3E4A]/40"
              placeholder="Site name and tagline"
            />
          </div>
          <div>
            <label className="text-[9px] tracking-[0.2em] uppercase text-[#6B5E4E] block mb-1.5">
              Default Description
            </label>
            <textarea
              value={settings.site.description}
              onChange={e => updateSite("description", e.target.value)}
              rows={2}
              className="w-full border border-[#2A3E4A]/14 bg-[#F2EDE4] px-3 py-2 text-sm text-[#1E1A14] focus:outline-none focus:border-[#2A3E4A]/40 resize-none"
              placeholder="Fallback description for all pages"
            />
          </div>
          <div>
            <label className="text-[9px] tracking-[0.2em] uppercase text-[#6B5E4E] block mb-1.5">
              Keywords (comma-separated)
            </label>
            <input
              type="text"
              value={settings.site.keywords}
              onChange={e => updateSite("keywords", e.target.value)}
              className="w-full border border-[#2A3E4A]/14 bg-[#F2EDE4] px-3 py-2 text-sm text-[#1E1A14] focus:outline-none focus:border-[#2A3E4A]/40"
              placeholder="mental health, veterans, Tennessee"
            />
          </div>
        </div>
      </section>

      {/* Per-page SEO */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-[10px] tracking-[0.25em] uppercase text-[#6B5E4E] font-semibold">
            Per-Page SEO
          </h2>
          <div className="flex-1 h-px bg-[#2A3E4A]/8" />
        </div>

        {/* Page tabs */}
        <div className="flex flex-wrap gap-1 mb-4">
          {PAGE_ROUTES.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveKey(key)}
              className={`px-3 py-1.5 text-[10px] tracking-wide uppercase transition-colors ${
                activeKey === key
                  ? "bg-[#2A3E4A] text-white"
                  : "border border-[#2A3E4A]/14 text-[#6B5E4E] hover:border-[#2A3E4A]/30 hover:text-[#1E1A14] bg-white"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="border border-[#2A3E4A]/14 bg-white p-5 space-y-4">
          {/* Title */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[9px] tracking-[0.2em] uppercase text-[#6B5E4E]">
                Page Title
              </label>
              <span className={`text-[9px] tracking-wide ${titleLen > 60 ? "text-red-500" : "text-[#6B5E4E]/60"}`}>
                {titleLen}/60
              </span>
            </div>
            <input
              type="text"
              value={activePage.title}
              onChange={e => updatePage("title", e.target.value)}
              className="w-full border border-[#2A3E4A]/14 bg-[#F2EDE4] px-3 py-2 text-sm text-[#1E1A14] focus:outline-none focus:border-[#2A3E4A]/40"
              placeholder="Page Title — Site Name"
            />
          </div>

          {/* Description */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[9px] tracking-[0.2em] uppercase text-[#6B5E4E]">
                Meta Description
              </label>
              <span className={`text-[9px] tracking-wide ${descLen > 160 ? "text-red-500" : descLen < 120 ? "text-amber-500" : "text-green-600"}`}>
                {descLen}/160
              </span>
            </div>
            <textarea
              value={activePage.description}
              onChange={e => updatePage("description", e.target.value)}
              rows={3}
              className="w-full border border-[#2A3E4A]/14 bg-[#F2EDE4] px-3 py-2 text-sm text-[#1E1A14] focus:outline-none focus:border-[#2A3E4A]/40 resize-none"
              placeholder="2–3 sentence description for search engine results (120–160 chars)"
            />
          </div>

          {/* Keywords */}
          <div>
            <label className="text-[9px] tracking-[0.2em] uppercase text-[#6B5E4E] block mb-1.5">
              Keywords
            </label>
            <input
              type="text"
              value={activePage.keywords}
              onChange={e => updatePage("keywords", e.target.value)}
              className="w-full border border-[#2A3E4A]/14 bg-[#F2EDE4] px-3 py-2 text-sm text-[#1E1A14] focus:outline-none focus:border-[#2A3E4A]/40"
              placeholder="keyword1, keyword2, keyword3"
            />
          </div>

          {/* SERP Preview */}
          <div className="pt-4 border-t border-[#2A3E4A]/8">
            <p className="text-[9px] tracking-[0.2em] uppercase text-[#6B5E4E] mb-3">
              Search Result Preview
            </p>
            <div className="bg-white border border-[#2A3E4A]/10 p-4 rounded">
              <p className="text-[11px] text-[#6B5E4E]/60 mb-0.5">
                cherishconsulting.com{PAGE_ROUTES.find(r => r.key === activeKey)?.path}
              </p>
              <p className="text-[#1a0dab] text-[15px] leading-snug mb-1 font-normal hover:underline cursor-pointer">
                {activePage.title || settings.site.title || "Page Title"}
              </p>
              <p className="text-[#4d5156] text-[12px] leading-relaxed">
                {activePage.description
                  ? activePage.description.slice(0, 160)
                  : settings.site.description?.slice(0, 160) || "Page description will appear here."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Action buttons */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-2.5 bg-[#2A3E4A] text-white text-xs tracking-widest uppercase hover:opacity-90 transition-opacity"
        >
          {saved ? <Check size={12} /> : null}
          {saved ? "Saved" : "Save SEO Settings"}
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2.5 border border-[#2A3E4A]/14 text-[#6B5E4E] text-xs tracking-widest uppercase hover:border-[#2A3E4A]/30 hover:text-[#1E1A14] transition-colors"
        >
          Reset to Defaults
        </button>
      </div>

    </div>
  );
}

// ── Blog tab ──────────────────────────────────────────────

interface SanityPost {
  _id: string;
  _type: string;
  title: string;
  slug: { current: string } | null;
  excerpt: string | null;
  publishedAt: string | null;
  mainImage?: { asset?: { url: string }; alt?: string };
  author?: { name: string };
  categories?: { title: string }[];
}

const ADMIN_QUERY = `*[_type == "post"] | order(coalesce(publishedAt, _updatedAt) desc) {
  _id,
  _type,
  title,
  slug,
  excerpt,
  publishedAt,
  "mainImage": mainImage { "asset": asset->{ url }, alt },
  "author": author->{ name },
  "categories": categories[]->{ title }
}`;

const STUDIO_URL = "http://localhost:3333";

/** Extract plain text from the first text block of a body array (for auto-excerpt) */
function autoExcerpt(body: unknown[] | undefined): string {
  if (!Array.isArray(body)) return "";
  for (const block of body) {
    if (
      block &&
      typeof block === "object" &&
      (block as Record<string, unknown>)._type === "block"
    ) {
      const children = (block as Record<string, unknown[]>).children ?? [];
      const text = children
        .map((c) =>
          c && typeof c === "object" ? ((c as Record<string, unknown>).text as string) ?? "" : ""
        )
        .join("")
        .trim();
      if (text.length > 20) return text.slice(0, 180) + (text.length > 180 ? "…" : "");
    }
  }
  return "";
}

function postStatus(post: SanityPost): "draft" | "scheduled" | "published" {
  if (!post.publishedAt) return "draft";
  return new Date(post.publishedAt) > new Date() ? "scheduled" : "published";
}

const STATUS_STYLES = {
  draft:     "bg-[#2A3E4A]/8 text-[#6B5E4E]",
  scheduled: "bg-amber-100 text-amber-700",
  published: "bg-emerald-100 text-emerald-700",
};
const STATUS_LABELS = { draft: "Draft", scheduled: "Scheduled", published: "Published" };

function fmt(dateStr: string | null) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric", month: "short", day: "numeric",
  });
}

type Filter = "all" | "published" | "scheduled" | "draft";

function BlogTab() {
  const [posts, setPosts] = useState<SanityPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>("all");
  const [confirmDelete, setConfirmDelete] = useState<SanityPost | null>(null);
  const [deleting, setDeleting] = useState(false);

  async function fetchPosts() {
    setLoading(true);
    setError(null);
    try {
      const data = await sanityClient.fetch<SanityPost[]>(ADMIN_QUERY);
      setPosts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchPosts(); }, []);

  async function handleDelete(post: SanityPost) {
    setDeleting(true);
    try {
      const baseId = post._id.replace(/^drafts\./, "");
      // Delete published + draft versions (safe if either doesn't exist)
      await Promise.allSettled([
        sanityAdminClient.delete(baseId),
        sanityAdminClient.delete(`drafts.${baseId}`),
      ]);
      setPosts(prev => prev.filter(p => p._id !== post._id));
    } catch (err) {
      alert("Delete failed: " + (err instanceof Error ? err.message : String(err)));
    } finally {
      setDeleting(false);
      setConfirmDelete(null);
    }
  }

  const filtered = posts.filter(p => filter === "all" || postStatus(p) === filter);
  const counts = {
    all: posts.length,
    published: posts.filter(p => postStatus(p) === "published").length,
    scheduled: posts.filter(p => postStatus(p) === "scheduled").length,
    draft:     posts.filter(p => postStatus(p) === "draft").length,
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-[#1E1A14]">Blog Posts</p>
          <p className="text-[11px] text-[#6B5E4E] mt-0.5">
            {posts.length} post{posts.length !== 1 ? "s" : ""} · Sanity dataset{" "}
            <code className="bg-[#F2EDE4] px-1 text-[10px]">cherich</code>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={fetchPosts}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-2 border border-[#2A3E4A]/14 text-[11px] tracking-wide text-[#6B5E4E] hover:border-[#2A3E4A]/30 hover:text-[#1E1A14] transition-colors disabled:opacity-40"
          >
            <RefreshCw size={11} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
          <a
            href={`${STUDIO_URL}/structure/post`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-2 bg-[#2A3E4A] text-white text-[11px] tracking-wide hover:bg-[#1E2E38] transition-colors"
          >
            <PenSquare size={11} /> New Post
          </a>
        </div>
      </div>

      {/* Filter tabs */}
      {!loading && !error && (
        <div className="flex gap-1">
          {(["all", "published", "scheduled", "draft"] as Filter[]).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-[10px] tracking-wide uppercase transition-colors ${
                filter === f
                  ? "bg-[#2A3E4A] text-white"
                  : "border border-[#2A3E4A]/14 text-[#6B5E4E] hover:border-[#2A3E4A]/30 hover:text-[#1E1A14] bg-white"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
              <span className={`text-[9px] px-1 py-0.5 rounded-sm ${filter === f ? "bg-white/20" : "bg-[#2A3E4A]/8"}`}>
                {counts[f]}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="border border-[#2A3E4A]/14 bg-white p-12 text-center">
          <RefreshCw size={16} className="animate-spin text-[#2A3E4A]/30 mx-auto mb-3" />
          <p className="text-[11px] text-[#6B5E4E]">Loading posts from Sanity…</p>
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="border border-red-200 bg-red-50 p-5">
          <div className="flex items-start gap-3">
            <AlertCircle size={14} className="text-red-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs font-semibold text-red-700 mb-1">Could not connect to Sanity</p>
              <p className="text-[11px] text-red-600 font-mono break-all">{error}</p>
              <p className="text-[11px] text-red-500 mt-2">
                Make sure <code className="bg-red-100 px-1">VITE_SANITY_TOKEN</code> is in your{" "}
                <code className="bg-red-100 px-1">.env</code> file and restart the dev server.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && filtered.length === 0 && (
        <div className="border border-[#2A3E4A]/14 bg-white p-12 text-center">
          <div className="w-12 h-12 border border-[#2A3E4A]/14 flex items-center justify-center mx-auto mb-5">
            <BookOpen size={16} className="text-[#2A3E4A]/40" strokeWidth={1.5} />
          </div>
          <p className="text-sm font-semibold text-[#1E1A14] mb-1.5">
            {posts.length === 0 ? "No posts yet" : `No ${filter} posts`}
          </p>
          {posts.length === 0 && (
            <a
              href={`${STUDIO_URL}/structure/post`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-5 px-5 py-2.5 bg-[#2A3E4A] text-white text-xs tracking-widest uppercase hover:bg-[#1E2E38] transition-colors"
            >
              Create First Post <ExternalLink size={10} />
            </a>
          )}
        </div>
      )}

      {/* Post list */}
      {!loading && !error && filtered.length > 0 && (
        <div className="border border-[#2A3E4A]/14 divide-y divide-[#2A3E4A]/8 bg-white">
          {filtered.map(post => {
            const status = postStatus(post);
            const excerpt = post.excerpt || autoExcerpt((post as Record<string, unknown>).body as unknown[]);
            return (
              <div key={post._id} className="flex gap-4 px-5 py-4 hover:bg-[#F2EDE4]/30 transition-colors group">

                {/* Thumbnail */}
                <div className="flex-shrink-0 w-16 h-12 bg-[#2A3E4A]/6 border border-[#2A3E4A]/8 overflow-hidden">
                  {post.mainImage?.asset?.url ? (
                    <img
                      src={`${post.mainImage.asset.url}?w=128&h=96&fit=crop&auto=format`}
                      alt={post.mainImage.alt ?? post.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <BookOpen size={12} className="text-[#2A3E4A]/20" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm font-medium text-[#1E1A14] leading-snug">{post.title}</p>
                    <span className={`flex-shrink-0 text-[9px] tracking-wide uppercase px-1.5 py-0.5 ${STATUS_STYLES[status]}`}>
                      {STATUS_LABELS[status]}
                    </span>
                  </div>

                  {excerpt && (
                    <p className="text-[11px] text-[#6B5E4E] leading-relaxed mt-0.5 line-clamp-2">{excerpt}</p>
                  )}

                  <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                    {post.publishedAt && (
                      <span className="text-[10px] text-[#6B5E4E]">
                        {status === "scheduled" ? "Scheduled for " : ""}{fmt(post.publishedAt)}
                      </span>
                    )}
                    {post.author?.name && (
                      <span className="text-[10px] text-[#6B5E4E]">· {post.author.name}</span>
                    )}
                    {post.categories?.map(c => (
                      <span key={c.title} className="text-[9px] tracking-wide bg-[#2A3E4A]/6 text-[#2A3E4A]/50 px-1.5 py-0.5">
                        {c.title}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex-shrink-0 flex items-start gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <a
                    href={`${STUDIO_URL}/structure/post;${post._id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Edit in Studio"
                    className="flex items-center gap-1 px-2.5 py-1.5 border border-[#2A3E4A]/14 text-[10px] text-[#6B5E4E] hover:border-[#2A3E4A]/30 hover:text-[#1E1A14] transition-colors"
                  >
                    <PenSquare size={10} /> Edit
                  </a>
                  <button
                    onClick={() => setConfirmDelete(post)}
                    title="Delete post"
                    className="flex items-center gap-1 px-2.5 py-1.5 border border-red-200 text-[10px] text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                  >
                    <Trash2 size={10} /> Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Delete confirmation modal */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-6">
          <div className="bg-white border border-[#2A3E4A]/14 p-8 max-w-sm w-full shadow-xl">
            <div className="w-10 h-10 border border-red-200 flex items-center justify-center mx-auto mb-5">
              <Trash2 size={14} className="text-red-400" />
            </div>
            <p className="text-sm font-semibold text-[#1E1A14] text-center mb-1.5">Delete post?</p>
            <p className="text-[11px] text-[#6B5E4E] text-center leading-relaxed mb-6">
              "{confirmDelete.title}" will be permanently deleted from Sanity,
              including any draft version. This cannot be undone.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setConfirmDelete(null)}
                disabled={deleting}
                className="flex-1 py-2.5 border border-[#2A3E4A]/14 text-xs text-[#6B5E4E] hover:border-[#2A3E4A]/30 hover:text-[#1E1A14] transition-colors disabled:opacity-40"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(confirmDelete)}
                disabled={deleting}
                className="flex-1 py-2.5 bg-red-600 text-white text-xs tracking-wide hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {deleting ? "Deleting…" : "Delete permanently"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex justify-end pt-1">
        <a
          href="https://www.sanity.io/manage"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[11px] text-[#6B5E4E] hover:text-[#2A3E4A] transition-colors"
        >
          Sanity project dashboard <ExternalLink size={10} />
        </a>
      </div>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────

export default function AdminPage() {
  const [authed, setAuthed] = useState(
    () => sessionStorage.getItem(SESSION_FLAG) === "1"
  );
  const [tab, setTab] = useState<Tab>("seo");

  if (!authed) {
    return <LockScreen onUnlock={() => setAuthed(true)} />;
  }

  function logout() {
    sessionStorage.removeItem(SESSION_FLAG);
    setAuthed(false);
  }

  return (
    <div className="min-h-screen bg-[#F2EDE4]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Top bar */}
      <header className="print:hidden bg-[#2A3E4A] border-b border-white/8">
        <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold tracking-widest uppercase text-white/90"
              style={{ fontFamily: "'Lora', serif" }}>
              Cherich
            </span>
            <span className="text-[9px] tracking-[0.25em] uppercase text-white/30 border-l border-white/12 pl-3">
              Admin
            </span>
          </div>
          <div className="flex items-center gap-5">
            <a
              href="/"
              className="text-xs text-white/40 hover:text-white/70 transition-colors flex items-center gap-1.5"
            >
              View site <ExternalLink size={10} />
            </a>
            <button
              onClick={logout}
              className="text-xs text-white/40 hover:text-white/70 transition-colors flex items-center gap-1.5"
            >
              <LogOut size={12} /> Sign out
            </button>
          </div>
        </div>
      </header>

      {/* Tab bar */}
      <div className="print:hidden bg-[#2A3E4A] border-b border-white/8">
        <div className="max-w-3xl mx-auto px-6 flex">
          {(
            [
              { id: "seo"       as Tab, label: "SEO",       Icon: Search    },
              { id: "analytics" as Tab, label: "Analytics", Icon: BarChart2 },
              { id: "blog"      as Tab, label: "Blog",      Icon: BookOpen  },
            ] as const
          ).map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex items-center gap-2 px-4 py-3.5 text-xs tracking-wide border-b-2 transition-colors ${
                tab === id
                  ? "border-white/80 text-white"
                  : "border-transparent text-white/35 hover:text-white/55"
              }`}
            >
              <Icon size={13} strokeWidth={1.5} />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-6 py-10">
        {tab === "seo" ? <SEOTab /> : tab === "analytics" ? <AnalyticsTab /> : <BlogTab />}
      </main>
    </div>
  );
}
