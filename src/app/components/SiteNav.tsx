import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ExternalLink } from "lucide-react";

function VeteranOwnedBadge() {
  return (
    <div className="flex items-center gap-1.5 border border-accent/30 px-2.5 py-1">
      <span className="text-accent" style={{ fontSize: "0.55rem" }}>★</span>
      <span className="text-[8px] tracking-[0.2em] uppercase text-accent font-semibold">Veteran-Owned</span>
      <span className="text-accent" style={{ fontSize: "0.55rem" }}>★</span>
    </div>
  );
}

type AnchorItem = { label: string; href: string; external?: boolean };
type PageItem   = { label: string; to: string };
type NavItem    = AnchorItem | PageItem;

function isPageItem(item: NavItem): item is PageItem {
  return "to" in item;
}

const NAV_ITEMS: NavItem[] = [
  { label: "About",            href: "/#about" },
  { label: "Services",         href: "/#services" },
  { label: "Publications",     to:   "/books" },
  { label: "Labyrinths",       to:   "/labyrinths" },
  { label: "VA PTSD",          href: "https://www.ptsd.va.gov/appvid/video/index.asp", external: true },
  { label: "Veterans Courses", href: "https://learn.psycharmor.org/collections", external: true },
  { label: "Contact",          href: "/#contact" },
];

export function SiteNav({ alwaysSolid = false }: { alwaysSolid?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(alwaysSolid);
  const location = useLocation();

  useEffect(() => {
    if (alwaysSolid) { setScrolled(true); return; }
    setScrolled(window.scrollY > 48);
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [alwaysSolid]);

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  const renderItem = (item: NavItem, mobile = false) => {
    const base = mobile
      ? "text-sm text-foreground/70 hover:text-foreground flex items-center gap-1.5 transition-colors"
      : "text-sm text-foreground/60 hover:text-foreground transition-colors tracking-wide flex items-center gap-1";

    if (isPageItem(item)) {
      const active = location.pathname === item.to;
      return (
        <Link
          key={item.label}
          to={item.to}
          onClick={mobile ? () => setMenuOpen(false) : undefined}
          className={`${base} ${active ? "!text-foreground font-medium" : ""}`}
        >
          {item.label}
        </Link>
      );
    }

    const { label, href, external } = item as AnchorItem;
    return (
      <a
        key={label}
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        onClick={mobile ? () => setMenuOpen(false) : undefined}
        className={base}
      >
        {label}
        {external && <ExternalLink size={10} className="opacity-55" />}
      </a>
    );
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
        : "bg-transparent"
    }`}>
      <div className="max-w-6xl mx-auto px-6 flex items-center h-16 gap-10">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <Link to="/" aria-label="Cherich Consulting home">
            <img src="/cherich-logo.png" alt="Cherich Consulting" className="h-10 w-auto" />
          </Link>
          <VeteranOwnedBadge />
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6 ml-auto">
          {NAV_ITEMS.map(item => renderItem(item))}
          <a
            href="/#contact"
            className="px-5 py-2 bg-primary text-primary-foreground text-xs tracking-widest uppercase hover:opacity-90 transition-opacity"
          >
            Schedule a Session
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground p-1"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="md:hidden bg-background border-t border-border px-6 py-5 flex flex-col gap-5">
          {NAV_ITEMS.map(item => renderItem(item, true))}
          <a
            href="/#contact"
            className="px-5 py-3 bg-primary text-primary-foreground text-xs tracking-widest uppercase text-center"
            onClick={() => setMenuOpen(false)}
          >
            Schedule a Session
          </a>
        </div>
      )}
    </nav>
  );
}
