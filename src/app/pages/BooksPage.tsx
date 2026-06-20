import { ExternalLink } from "lucide-react";
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

// SOF-54: Selling Books — subtasks SOF-60 through SOF-64 as line items
const books = [
  {
    title: "Moving Beyond Stress",
    type: "E-Book", year: "2018",
    desc: "A practical learning tool for stress reduction with quizzes, breathing techniques, and strategies for identifying and managing life's stressors.",
    url: "https://www.amazon.com/Moving-Beyond-Stress-Carol-Cherich-ebook/dp/B091DTLHXN/",
  },
  {
    title: "Addicted Parents in Recovery & Treatment",
    type: "E-Book", year: "2013",
    desc: "A relapse-prevention curriculum covering stress management, parenting skills, childcare resources, and money management for families in recovery.",
    url: "https://www.amazon.com/Addicted-parents-treatment-recovery-Cherich-ebook/dp/B0CTHSMV46/",
  },
  {
    title: "Chair Yoga",
    type: "E-Book", year: "2024",
    desc: "Accessible yoga adapted for all ages and ability levels, written by a 200-hour certified instructor and licensed mental health clinician.",
    url: "https://www.amazon.com/Chair-Yoga-Carol-Cherich-ebook/dp/B0D8B9JBDP/",
  },
  {
    title: "Breast Cancer Support Curriculum",
    type: "E-Book", year: "2024",
    desc: "An inspirational self-help and teaching guide for patients, counselors, nurses, and caregivers navigating a breast cancer diagnosis.",
    url: "https://www.amazon.com/Breast-cancer-support-curriculum-Cherich-ebook/dp/B0D89M759R/",
  },
  {
    title: "Psychosocial Stress and Alcohol Abuse Among Hispanic Males",
    type: "Research Paper", year: "2014",
    desc: "Research examining psychosocial stressors, cultural factors, and their relationship to alcohol use among Hispanic male populations.",
    url: "https://www.amazon.com/Psychosocial-stress-alcohol-abuse-Hispanic-ebook/dp/B0D8C2PMJ1/",
  },
];

export default function BooksPage() {
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
            Books &amp; E-Books
          </h1>
          <p className="text-[0.95rem] text-foreground/60 max-w-xl leading-relaxed">
            Published works by Dr. Carol J. Cherich spanning stress management, addiction
            recovery, yoga, cancer support, and clinical research. All titles available on Amazon.
          </p>
        </div>
      </div>

      {/* Book list — SOF-60 · SOF-61 · SOF-62 · SOF-63 · SOF-64 */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <div className="space-y-px">
            {books.map(({ title, type, year, desc, url }, i) => (
              <a
                key={title}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-background hover:bg-secondary transition-colors px-6 py-6 flex items-center justify-between gap-6 group border border-border/0 hover:border-border"
              >
                <div className="flex items-start gap-6 min-w-0 flex-1">
                  <span
                    className="text-2xl text-primary/20 w-9 flex-shrink-0 select-none pt-0.5"
                    style={{ fontFamily: "'Lora', serif" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-foreground mb-1">{title}</p>
                    <p className="text-xs text-muted-foreground mb-2">{type} · {year}</p>
                    <p className="text-xs text-foreground/50 leading-relaxed">{desc}</p>
                  </div>
                </div>
                <div className="flex-shrink-0 flex items-center gap-1.5 text-xs tracking-widest uppercase text-primary group-hover:text-accent transition-colors font-medium">
                  Buy <ExternalLink size={11} />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
      <CookieBanner />
    </div>
  );
}
