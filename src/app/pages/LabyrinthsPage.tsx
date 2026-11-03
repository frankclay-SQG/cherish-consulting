import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Download, ExternalLink, Smartphone } from "lucide-react";
import { SiteNav } from "../components/SiteNav";
import { SiteFooter } from "../components/SiteFooter";
import { CookieBanner } from "../components/CookieBanner";

const serif = { fontFamily: "'Lora', serif", fontWeight: 500 } as const;

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  const c = light ? "text-muted" : "text-accent";
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className={c} style={{ fontSize: "0.6rem" }} aria-hidden="true">★ ★ ★</span>
      <span className={`text-[11px] tracking-[0.25em] uppercase font-semibold ${c}`}>{children}</span>
    </div>
  );
}

// SOF-59: Walking the Labyrinth — SOF-66 through SOF-69 video line items
const videos = [
  { title: "What is a Labyrinth", id: "Yy1GG91HqwU" },
  { title: "Inside the Ancient Practice of Labyrinth Walking", id: "Nbss93ILx2A" },
  { title: "A Story of Life and Labyrinths", id: "CC7tG6png1E" },
  { title: "Labyrinth History & Walking", id: "o7u80ZLEh3M" },
];

// Full narrated guided walk. Set to the YouTube ID once the video is uploaded.
const GUIDED_WALK_VIDEO_ID = "";

const movements = [
  { name: "Invocation", verb: "Arrive", desc: "Pause at the entrance. Let your feet settle and set a simple intention." },
  { name: "Recognition", verb: "Release", desc: "Notice your old patterns of thought, and loosen your grip on them." },
  { name: "Centering", verb: "Breathe", desc: "Walk slowly. Breathe in, breathe out. What needs to be changed, forgiven, or healed?" },
  { name: "Unification", verb: "Rest", desc: "Rest in the center. Breathe slowly. Stay as long as you like." },
  { name: "Realization", verb: "Receive", desc: "Give yourself permission to feel more centered and at peace." },
  { name: "Thanksgiving", verb: "Return", desc: "Walk back out the same path, giving thanks with each step." },
  { name: "Benediction", verb: "Go forward", desc: "Turn and face the labyrinth. Close with a blessing: and so it is." },
];

const downloads = [
  { title: "Finger Labyrinth Guide", meta: "PDF · 2 pages", desc: "A guided meditation to read while you trace, from invocation to benediction.", href: "/downloads/Cherich-Finger-Labyrinth-Guide.pdf" },
  { title: "Printable Labyrinths", meta: "PDF · 4 pages", desc: "Chartres, Triple Spiral, Classical Seven- and Eleven-Circuit designs, one per page.", href: "/downloads/Cherich-Printable-Labyrinths.pdf" },
  { title: "Walking the Labyrinth Card", meta: "PDF · 1 page", desc: "The seven movements and the breathing pattern on one page, to carry on your walk.", href: "/downloads/Cherich-Walking-the-Labyrinth-Card.pdf" },
];

export default function LabyrinthsPage() {
  const { hash } = useLocation();
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView();
  }, [hash]);

  return (
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <SiteNav alwaysSolid />
      <CookieBanner />

      {/* Header */}
      <section className="pt-16 bg-[#1C2B4A] text-[#F2EDE4]">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-24 flex flex-wrap gap-12 items-end">
          <div className="flex-1 basis-[520px] min-w-0">
            <Eyebrow light>A guided practice</Eyebrow>
            <h1 className="text-5xl md:text-6xl leading-[1.1] mb-5" style={serif}>Walking the Labyrinth</h1>
            <p className="text-lg md:text-xl leading-relaxed text-[#E8EDE5] max-w-xl mb-8">
              For slowing down, letting go, and coming back to yourself. There is one way in and one
              way out. You cannot get lost.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#walk" className="px-6 py-4 bg-[#F2EDE4] text-[#1C2B4A] text-xs tracking-widest uppercase font-semibold hover:opacity-90">Start the guided walk</a>
              <a href="#downloads" className="px-6 py-4 border border-[#F2EDE4]/50 text-[#F2EDE4] text-xs tracking-widest uppercase hover:bg-[#F2EDE4]/10">Free downloads</a>
            </div>
          </div>
          <div className="flex items-center gap-4 basis-[280px]">
            <img src="/images/via-member.png" alt="Veriditas International Association of Professional Labyrinth Facilitators — VIA Member" width={96} height={92} className="w-24 h-auto bg-white" />
            <p className="text-[13px] leading-snug text-muted">
              Guided by Dr. Carol J. Cherich, PhD, LPC, member of the Veriditas International Association of
              Professional Labyrinth Facilitators
            </p>
          </div>
        </div>
      </section>

      {/* What + why */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-14">
        <div>
          <h2 className="text-3xl leading-tight mb-4" style={serif}>What is a labyrinth?</h2>
          <p className="text-base leading-relaxed text-muted-foreground mb-4">
            A single winding path that turns back and forth to a center, then leads you out the same way.
            Unlike a maze, it has no dead ends or wrong turns, so your mind is free to rest, notice, and
            listen.
          </p>
          <p className="text-base leading-relaxed text-muted-foreground">
            Labyrinths have been traced by finger or foot by people across many cultures for thousands of
            years — carved in stone, set into cathedral floors, and found today in parks, hospitals and
            retreat centers.
          </p>
        </div>
        <div>
          <h2 className="text-3xl leading-tight mb-4" style={serif}>Why walk it?</h2>
          <ul className="list-disc pl-5 space-y-2 text-base leading-relaxed">
            <li>Less stress and frustration</li>
            <li>Deeper relaxation and calm</li>
            <li>Greater mindfulness and focus</li>
            <li>A clearer sense of what you're ready to set down</li>
          </ul>
          <p className="mt-4 text-sm text-muted-foreground">No special beliefs or experience needed. Come as you are.</p>
          <blockquote className="mt-6 text-base italic leading-relaxed" style={{ fontFamily: "'Lora', serif" }}>
            "Throughout the long history of labyrinths whenever and wherever society is going through rapid
            change and development the labyrinth has blossomed. Now, humanity is seeking the sure path of
            the labyrinth in an uncertain and confusing world."
            <footer className="not-italic mt-2 text-xs font-semibold tracking-wide text-accent" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              — Jeff Saward, labyrinth historian
            </footer>
          </blockquote>
        </div>
      </section>

      {/* Guided walk */}
      <section id="walk" className="bg-secondary scroll-mt-16">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <Eyebrow>Walk along with us</Eyebrow>
          <h2 className="text-3xl md:text-4xl leading-tight mb-8" style={serif}>The guided walk: seven movements</h2>
          <div className="relative aspect-video bg-primary mb-10 overflow-hidden">
            {GUIDED_WALK_VIDEO_ID ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${GUIDED_WALK_VIDEO_ID}`}
                title="Guided labyrinth walk with Dr. Cherich"
                loading="lazy"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center px-6">
                <p className="text-2xl text-[#F2EDE4]" style={serif}>Guided walk video coming soon</p>
                <p className="text-sm text-muted">Until then, follow the seven movements below, or download the pocket card.</p>
              </div>
            )}
          </div>
          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
            {movements.map((m, i) => (
              <li key={m.name} className="bg-background p-6">
                <p className="text-xl text-primary mb-1" style={serif}>{i + 1} · {m.name}</p>
                <p className="text-[11px] tracking-[0.2em] uppercase font-semibold text-accent mb-2">{m.verb}</p>
                <p className="text-sm leading-relaxed text-muted-foreground">{m.desc}</p>
              </li>
            ))}
            <li className="bg-background p-6">
              <p className="text-xl text-primary mb-1" style={serif}>The breath</p>
              <p className="text-sm leading-relaxed text-muted-foreground">Slowly breathe in, slowly breathe out. Again. Return to it whenever your mind wanders.</p>
            </li>
          </ol>
        </div>
      </section>

      {/* Downloads */}
      <section id="downloads" className="max-w-6xl mx-auto px-6 py-20 scroll-mt-16">
        <Eyebrow>Free resources</Eyebrow>
        <h2 className="text-3xl md:text-4xl leading-tight mb-3" style={serif}>No labyrinth nearby? Bring one home.</h2>
        <p className="text-base leading-relaxed text-muted-foreground max-w-2xl mb-10">
          Trace a printed labyrinth slowly with your fingertip while following the guide. It works at a
          kitchen table, an office desk or a hospital bedside.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {downloads.map((d) => (
            <article key={d.title} className="bg-[#F2EDE4] p-7 flex flex-col gap-3">
              <p className="text-[11px] tracking-[0.2em] uppercase font-semibold text-accent">{d.meta}</p>
              <h3 className="text-xl" style={{ fontFamily: "'Lora', serif", fontWeight: 600 }}>{d.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{d.desc}</p>
              <a href={d.href} download className="mt-auto self-start inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-3.5 text-xs tracking-widest uppercase hover:opacity-90">
                <Download size={13} /> Download PDF
              </a>
            </article>
          ))}
        </div>

        {/* Recommended app */}
        <article className="mt-6 border border-border p-7 md:p-8 flex flex-wrap items-center gap-6">
          <div className="p-3 bg-secondary border border-border" aria-hidden="true">
            <Smartphone size={22} className="text-primary" />
          </div>
          <div className="flex-1 basis-[320px] min-w-0">
            <p className="text-[11px] tracking-[0.2em] uppercase font-semibold text-accent mb-1">Free app · iPhone &amp; iPad</p>
            <h3 className="text-xl mb-2" style={{ fontFamily: "'Lora', serif", fontWeight: 600 }}>Labyrinth Journey</h3>
            <p className="text-sm leading-relaxed text-muted-foreground max-w-2xl">
              Trace a Chartres-style labyrinth with your fingertip on your phone or tablet, with a gentle
              soundscape that changes every journey. Follow along with the Finger Labyrinth Guide above
              as you trace.
            </p>
          </div>
          <a
            href="https://apps.apple.com/us/app/labyrinth-journey/id1420284868"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-3.5 text-xs tracking-widest uppercase hover:opacity-90"
          >
            Get it on the App Store <ExternalLink size={13} />
          </a>
        </article>
      </section>

      {/* Video library */}
      <section className="bg-secondary">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <Eyebrow>Video library</Eyebrow>
          <h2 className="text-3xl leading-tight mb-8" style={serif}>Learn more about labyrinths</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {videos.map(({ title, id }) => (
              <div key={id} className="bg-background border border-border overflow-hidden">
                <div className="relative aspect-video">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${id}`}
                    title={title}
                    loading="lazy"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
                <p className="px-4 py-3 border-t border-border text-sm font-medium">{title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Group walks + evaluations */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <picture>
          <source type="image/avif" sizes="(min-width: 1152px) 1104px, 100vw" srcSet="/images/cherich-wide-1024.avif 1024w, /images/cherich-wide-1536.avif 1536w" />
          <source type="image/webp" sizes="(min-width: 1152px) 1104px, 100vw" srcSet="/images/cherich-wide-1024.webp 1024w, /images/cherich-wide-1536.webp 1536w" />
          <img src="/images/cherich-wide-1536.jpg" alt="Dr. Carol J. Cherich, PhD, LPC" width={1536} height={1024} loading="lazy" className="w-full h-auto aspect-[2/1] object-cover mb-6" style={{ objectPosition: "50% 25%" }} />
        </picture>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-[#1C2B4A] text-[#F2EDE4] p-10 flex flex-col gap-4">
            <h2 className="text-3xl" style={serif}>Walk with Dr. Cherich</h2>
            <p className="text-[15px] leading-relaxed text-[#E8EDE5]">
              Guided walks for individuals, groups, retreats, churches and workplace wellness programs: a
              short introduction, a facilitated walk, and time to reflect.
            </p>
            <a href="/#contact" className="mt-2 self-start px-5 py-3.5 bg-[#F2EDE4] text-[#1C2B4A] text-xs tracking-widest uppercase font-semibold hover:opacity-90">Book a group walk</a>
          </div>
          <div className="bg-[#F2EDE4] p-10 flex flex-col gap-4">
            <h2 className="text-3xl" style={serif}>Here for an evaluation?</h2>
            <p className="text-[15px] leading-relaxed text-muted-foreground">
              Dr. Cherich also provides VA claim evaluations for veterans and DOT SAP evaluations for CDL
              drivers, by telehealth across Tennessee and Virginia.
            </p>
            <div className="mt-2 flex flex-wrap gap-3">
              <Link to="/veterans-evaluations" className="px-5 py-3.5 bg-primary text-primary-foreground text-xs tracking-widest uppercase hover:opacity-90">Veterans</Link>
              <Link to="/dot-evaluations" className="px-5 py-3.5 bg-primary text-primary-foreground text-xs tracking-widest uppercase hover:opacity-90">CDL drivers</Link>
            </div>
          </div>
        </div>
        <p className="mt-10 text-xs leading-relaxed text-muted-foreground">
          Guided walk adapted from <em>The Awkward Season: Prayers for Lent</em> by Pamela C. Hawkins, pp.
          111–112. Copyright © 2009 by Upper Room Books. Used with permission.
        </p>
      </section>

      <SiteFooter />
    </div>
  );
}
