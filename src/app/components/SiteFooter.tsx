import { Link } from "react-router-dom";

export function SiteFooter() {
  return (
    <footer className="bg-foreground text-background">
      <div className="flex h-0.5">
        <div className="flex-1 bg-[#1C2B4A]" />
        <div className="flex-1 bg-background/20" />
        <div className="flex-1 bg-[#8B2020]" />
      </div>
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-0.5">
            <span className="text-sm tracking-widest uppercase" style={{ fontFamily: "'Lora', serif" }}>
              Cherich Consulting
            </span>
            <span className="text-[#8B8060] text-[0.5rem] tracking-widest">★ ★ ★</span>
          </div>
          <p className="text-[10px] text-background/35 tracking-wide">
            Veteran-Owned · Mental Health &amp; Wellness · Tennessee &amp; Virginia
          </p>
        </div>
        <div className="flex flex-col items-center md:items-end gap-2">
          <p className="text-[10px] text-background/35 tracking-wide">
            © {new Date().getFullYear()} Dr. Carol J. Cherich, PhD · Honoring All Who Serve
          </p>
          <div className="flex items-center gap-4">
            <Link
              to="/tos"
              className="text-[10px] text-background/40 hover:text-background/70 tracking-wide transition-colors"
            >
              Terms of Service
            </Link>
            <span className="text-background/20 text-[10px]">·</span>
            <Link
              to="/privacy"
              className="text-[10px] text-background/40 hover:text-background/70 tracking-wide transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
