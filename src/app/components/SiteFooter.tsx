import { Link } from "react-router-dom";

export function SiteFooter() {
  return (
    <footer className="bg-foreground text-background">
      <div className="flex h-0.5">
        <div className="flex-1 bg-[#1C2B4A]" />
        <div className="flex-1 bg-background/20" />
        <div className="flex-1 bg-[#8B2020]" />
      </div>
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className="text-sm tracking-widest uppercase" style={{ fontFamily: "'Lora', serif" }}>
              Cherich Consulting
            </span>
            <span className="text-[#8B8060] text-[0.5rem] tracking-widest">★ ★ ★</span>
          </div>
          <p className="text-xs text-background/70 tracking-wide">
            Veteran-Owned · Mental Health &amp; Wellness · Tennessee &amp; Virginia
          </p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2 text-[13px]">
          <Link to="/veterans-evaluations" className="text-background/85 hover:text-background">Veterans Evaluations</Link>
          <Link to="/dot-evaluations" className="text-background/85 hover:text-background">DOT / SAP</Link>
          <Link to="/labyrinths" className="text-background/85 hover:text-background">The Labyrinth</Link>
          <a href="tel:3019563185" className="text-background/85 hover:text-background">301-956-3185</a>
        </nav>
      </div>
      <div className="border-t border-background/10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-background/70">
          <p>© {new Date().getFullYear()} Dr. Carol J. Cherich, PhD. All rights reserved. · Honoring All Who Serve</p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            <Link to="/tos" className="hover:text-background transition-colors">Terms of Service</Link>
            <span aria-hidden="true">·</span>
            <Link to="/privacy" className="hover:text-background transition-colors">Privacy Policy</Link>
            <span aria-hidden="true">·</span>
            <span>
              Website by{" "}
              <a
                href="https://www.newdawnconsultants.com/"
                target="_blank"
                rel="noopener"
                className="text-background/90 underline underline-offset-2 hover:text-background"
              >
                New Dawn Consulting
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
