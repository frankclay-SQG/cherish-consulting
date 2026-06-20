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

// SOF-59: Walking the Labyrinth — subtasks SOF-66 through SOF-69 as video line items
const videos = [
  { title: "What is a Labyrinth",                        id: "Yy1GG91HqwU" },
  { title: "Inside the Ancient Practice of Labyrinth Walking", id: "Nbss93ILx2A" },
  { title: "A Story of Life and Labyrinths",              id: "CC7tG6png1E" },
  { title: "Labyrinth History & Walking",                 id: "o7u80ZLEh3M" },
];

const steps = [
  { step: "Remember", desc: "At the threshold — offer gratitude, set a healing intention." },
  { step: "Release",  desc: "Entering — quiet the mind and let go of mental chatter." },
  { step: "Receive",  desc: "At the center — pause, open your heart, and listen inward." },
  { step: "Return",   desc: "Outward — integrate your experience, restore and renew." },
];

export default function LabyrinthsPage() {
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
            Walking the Labyrinth
          </h1>
          <p className="text-[0.95rem] text-foreground/60 max-w-xl leading-relaxed">
            An ancient archetypal symbol used for walking meditation, prayer, and personal
            reflection — traced by millions across cultures and centuries.
          </p>
        </div>
      </div>

      {/* Intro + Remember / Release / Receive / Return */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl mb-16">
            <p className="text-[0.95rem] text-foreground/60 leading-relaxed mb-5">
              <strong className="text-foreground font-semibold">Welcome to the Labyrinth</strong> — an ancient archetypal symbol
              that has evolved for thousands of years. Labyrinths have been traced by finger or foot
              by millions of people from many cultures. Classical and Medieval designs are the most
              widely walked, and new forms continue to come into consciousness.
            </p>
            <p className="text-[0.95rem] text-foreground/60 leading-relaxed">
              The labyrinth creates a sacred time and space to look within, pray, meditate, and reflect.
              The meanders and rhythmic turning empty the mind, relax the body, and refresh the spirit.
            </p>
          </div>

          {/* Four steps */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border mb-20">
            {steps.map(({ step, desc }) => (
              <div key={step} className="bg-background p-6 text-center">
                <p
                  className="text-sm font-semibold text-primary mb-2"
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  {step}
                </p>
                <p className="text-xs text-foreground/50 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          {/* Video grid — SOF-66 · SOF-67 · SOF-68 · SOF-69 */}
          <div className="flex items-center gap-3 mb-8">
            <StarDivider count={3} />
            <span className="text-[10px] tracking-[0.25em] uppercase text-accent font-medium">
              Video Resources
            </span>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {videos.map(({ title, id }) => (
              <div key={id} className="bg-secondary border border-border overflow-hidden">
                <div className="relative aspect-video">
                  <iframe
                    src={`https://www.youtube.com/embed/${id}`}
                    title={title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
                <div className="px-4 py-3 border-t border-border">
                  <p className="text-xs font-medium text-foreground/70 tracking-wide">{title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
      <CookieBanner />
    </div>
  );
}
