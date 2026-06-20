import { useState } from "react";
import {
  Lock, BarChart2, BookOpen, LogOut,
  ExternalLink, Check, AlertCircle, Eye, EyeOff, Printer,
} from "lucide-react";

// ─────────────────────────────────────────────────────────
// Master key — set VITE_ADMIN_KEY in Vercel:
//   Settings → Environment Variables → VITE_ADMIN_KEY
// The key is compared client-side so keep it non-sensitive
// (a passphrase, not a secret token). For production-grade
// auth, wire up Sanity's identity or a backend session.
// ─────────────────────────────────────────────────────────
const MASTER_KEY = import.meta.env.VITE_ADMIN_KEY as string | undefined;
const SESSION_FLAG = "cherish_admin_session";
const GA_STORAGE_KEY = "cherish_ga_id";

type Tab = "analytics" | "blog";

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
          Cherish Consulting · Admin
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
            Cherish Consulting
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

// ── Blog tab ──────────────────────────────────────────────

function BlogTab() {
  return (
    <div className="border border-[#2A3E4A]/14 bg-white p-12 text-center">
      <div className="w-12 h-12 border border-[#2A3E4A]/14 flex items-center justify-center mx-auto mb-6">
        <BookOpen size={16} className="text-[#2A3E4A]/40" strokeWidth={1.5} />
      </div>
      <p className="text-sm font-semibold text-[#1E1A14] mb-2">Blog — Coming Soon</p>
      <p className="text-[11px] text-[#6B5E4E] max-w-xs mx-auto leading-relaxed">
        Sanity CMS integration is in progress. Once connected, you'll create and manage
        posts, categories, and media directly from this panel.
      </p>
      <div className="mt-8 pt-8 border-t border-[#2A3E4A]/8">
        <a
          href="https://www.sanity.io/manage"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-[#6B5E4E] hover:text-[#2A3E4A] transition-colors"
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
  const [tab, setTab] = useState<Tab>("analytics");

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
              Cherish
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
              { id: "analytics" as Tab, label: "Analytics", Icon: BarChart2 },
              { id: "blog" as Tab, label: "Blog", Icon: BookOpen },
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
        {tab === "analytics" ? <AnalyticsTab /> : <BlogTab />}
      </main>
    </div>
  );
}
