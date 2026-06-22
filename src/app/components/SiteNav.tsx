import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ExternalLink, ChevronDown } from "lucide-react";

function VeteranOwnedBadge() {
  return (
    <div className="flex items-center gap-1.5 border border-accent/30 px-2.5 py-1">
      <span className="text-accent" style={{ fontSize: "0.55rem" }}>★</span>
      <span className="text-[8px] tracking-[0.2em] uppercase text-accent font-semibold">Veteran-Owned</span>
      <span className="text-accent" style={{ fontSize: "0.55rem" }}>★</span>
    </div>
  );
}

type AnchorItem   = { label: string; href: string; external?: boolean };
type PageItem     = { label: string; to: string };
type DropdownItem = { label: string; href: string; children: (AnchorItem | PageItem)[] };
type NavItem      = AnchorItem | PageItem | DropdownItem;

function isPageItem(item: NavItem): item is PageItem {
  return "to" in item;
}
function isDropdownItem(item: NavItem): item is DropdownItem {
  return "children" in item;
}

const NAV_ITEMS: NavItem[] = [
  { label: "About",       href: "/#about" },
  {
    label: "Services",
    href: "/#services",
    children: [
      { label: "DOT Evaluations",      to: "/dot-evaluations" },
      { label: "Veterans Evaluations", to: "/veterans-evaluations" },
      { label: "Assessments",          to: "/assessments" },
      { label: "Clinical Supervision", to: "/clinical-supervision" },
      // { label: "Resources", to: "/resources" }, // hidden pending Dr. Cherich validation
    ],
  },
  { label: "Blog",             to:   "/blog" },
  { label: "Publications",     to:   "/books" },
  { label: "Labyrinths",       to:   "/labyrinths" },
  { label: "VA PTSD",          href: "https://www.ptsd.va.gov/appvid/video/index.asp", external: true },
  { label: "Veterans Courses", href: "https://learn.psycharmor.org/collections", external: true },
  { label: "Contact",          href: "/#contact" },
];

function DesktopDropdown({ item }: { item: DropdownItem }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // close on route change
  useEffect(() => { setOpen(false); }, [location.pathname]);

  const anyChildActive = item.children.some(
    c => isPageItem(c) && location.pathname === c.to
  );

  return (
    <div ref={ref} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <a
        href={item.href}
        className={`text-xs tracking-wide flex items-center gap-1 whitespace-nowrap transition-colors ${
          anyChildActive ? "text-foreground font-medium" : "text-foreground/60 hover:text-foreground"
        }`}
        onClick={e => { e.preventDefault(); setOpen(o => !o); }}
      >
        {item.label}
        <ChevronDown size={11} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </a>

      {open && (
        <div className="absolute top-full left-0 bg-background border border-border shadow-lg pt-3 pb-1 min-w-[200px] z-50">
          {item.children.map(child => {
            if (isPageItem(child)) {
              const active = location.pathname === child.to;
              return (
                <Link
                  key={child.label}
                  to={child.to}
                  className={`block px-4 py-2.5 text-xs tracking-wide transition-colors hover:bg-secondary ${
                    active ? "text-foreground font-medium" : "text-foreground/60 hover:text-foreground"
                  }`}
                >
                  {child.label}
                </Link>
              );
            }
            const c = child as AnchorItem;
            return (
              <a
                key={c.label}
                href={c.href}
                target={c.external ? "_blank" : undefined}
                rel={c.external ? "noopener noreferrer" : undefined}
                className="block px-4 py-2.5 text-xs tracking-wide text-foreground/60 hover:text-foreground hover:bg-secondary transition-colors"
              >
                {c.label}
                {c.external && <ExternalLink size={9} className="inline ml-1 opacity-55" />}
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function SiteNav({ alwaysSolid = false }: { alwaysSolid?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesExpanded, setServicesExpanded] = useState(false);
  const [scrolled, setScrolled] = useState(alwaysSolid);
  const location = useLocation();

  useEffect(() => {
    if (alwaysSolid) { setScrolled(true); return; }
    setScrolled(window.scrollY > 48);
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [alwaysSolid]);

  useEffect(() => { setMenuOpen(false); setServicesExpanded(false); }, [location.pathname]);

  const renderItem = (item: NavItem, mobile = false) => {
    const base = mobile
      ? "text-sm text-foreground/70 hover:text-foreground flex items-center gap-1.5 transition-colors"
      : "text-xs text-foreground/60 hover:text-foreground transition-colors tracking-wide flex items-center gap-1 whitespace-nowrap";

    if (isDropdownItem(item)) {
      if (!mobile) return <DesktopDropdown key={item.label} item={item} />;

      // Mobile: accordion
      return (
        <div key={item.label}>
          <button
            className={`${base} w-full text-left`}
            onClick={() => setServicesExpanded(o => !o)}
          >
            {item.label}
            <ChevronDown size={13} className={`ml-auto transition-transform duration-200 ${servicesExpanded ? "rotate-180" : ""}`} />
          </button>
          {servicesExpanded && (
            <div className="ml-4 mt-2 flex flex-col gap-3 border-l border-border pl-4">
              {item.children.map(child => {
                if (isPageItem(child)) {
                  const active = location.pathname === child.to;
                  return (
                    <Link
                      key={child.label}
                      to={child.to}
                      onClick={() => setMenuOpen(false)}
                      className={`text-sm transition-colors ${active ? "text-foreground font-medium" : "text-foreground/60 hover:text-foreground"}`}
                    >
                      {child.label}
                    </Link>
                  );
                }
                const c = child as AnchorItem;
                return (
                  <a
                    key={c.label}
                    href={c.href}
                    target={c.external ? "_blank" : undefined}
                    rel={c.external ? "noopener noreferrer" : undefined}
                    onClick={() => setMenuOpen(false)}
                    className="text-sm text-foreground/60 hover:text-foreground transition-colors"
                  >
                    {c.label}
                  </a>
                );
              })}
            </div>
          )}
        </div>
      );
    }

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
        <div className="hidden md:flex items-center gap-4 ml-auto">
          {NAV_ITEMS.map(item => renderItem(item))}
          <a
            href="/#contact"
            className="flex-shrink-0 px-4 py-2 bg-primary text-primary-foreground text-xs tracking-widest uppercase hover:opacity-90 transition-opacity"
          >
            Schedule a Session
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground p-1 ml-auto"
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
