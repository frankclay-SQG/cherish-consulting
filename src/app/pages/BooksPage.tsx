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

const books = [
  {
    title: "Moving Beyond Stress",
    type: "E-Book",
    year: "2018",
    asin: "B091DTLHXN",
    desc: "A practical learning tool for stress reduction with quizzes, breathing techniques, and strategies for identifying and managing life's stressors. A quick desk reference for navigating life's pressures.",
    url: "https://www.amazon.com/Moving-Beyond-Stress-Carol-Cherich-ebook/dp/B091DTLHXN/",
  },
  {
    title: "Addicted Parents in Recovery & Treatment",
    type: "E-Book",
    year: "2013",
    asin: "B0CTHSMV46",
    desc: "An evidence-based relapse-prevention curriculum covering stress management, parenting skills, childcare resources, and money management for families in recovery.",
    url: "https://www.amazon.com/Addicted-parents-treatment-recovery-Cherich-ebook/dp/B0CTHSMV46/",
  },
  {
    title: "Chair Yoga",
    type: "E-Book",
    year: "2024",
    asin: "B0D8B9JBDP",
    desc: "Accessible yoga adapted for all ages and ability levels, written by a 200-hour certified instructor and licensed mental health clinician.",
    url: "https://www.amazon.com/Chair-Yoga-Carol-Cherich-ebook/dp/B0D8B9JBDP/",
  },
  {
    title: "Breast Cancer Support Curriculum",
    type: "E-Book",
    year: "2024",
    asin: "B0D89M759R",
    desc: "An inspirational self-help and teaching guide for patients, counselors, nurses, and caregivers navigating a breast cancer diagnosis.",
    url: "https://www.amazon.com/Breast-cancer-support-curriculum-Cherich-ebook/dp/B0D89M759R/",
  },
  {
    title: "Psychosocial Stress and Alcohol Abuse Among Hispanic Males",
    type: "Research Paper",
    year: "2014",
    asin: "B0D8C2PMJ1",
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

      {/* Book cards */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {books.map(({ title, type, year, asin, desc, url }) => (
              <a
                key={title}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex gap-5 border border-border p-5 hover:bg-secondary transition-colors"
              >
                {/* Cover image */}
                <div className="flex-shrink-0">
                  <img
                    src={`https://images-na.ssl-images-amazon.com/images/P/${asin}.01._SY300_.jpg`}
                    alt={title}
                    className="w-20 object-contain"
                    loading="lazy"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>

                {/* Info */}
                <div className="flex flex-col justify-between min-w-0 flex-1">
                  <div>
                    <p className="text-[10px] tracking-widest uppercase text-muted-foreground mb-1">
                      {type} · {year}
                    </p>
                    <p className="text-sm font-semibold text-foreground mb-2 leading-snug">
                      {title}
                    </p>
                    <p className="text-xs text-foreground/55 leading-relaxed">
                      {desc}
                    </p>
                  </div>
                  <div className="mt-3 flex items-center gap-1 text-[10px] tracking-widest uppercase text-primary group-hover:text-accent transition-colors font-semibold">
                    Buy on Amazon <ExternalLink size={10} />
                  </div>
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
