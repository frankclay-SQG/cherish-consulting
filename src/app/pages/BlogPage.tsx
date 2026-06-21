import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SiteNav } from "../components/SiteNav";
import { SiteFooter } from "../components/SiteFooter";
import { CookieBanner } from "../components/CookieBanner";
import { sanityClient } from "../../lib/sanity";

interface PostSummary {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  publishedAt?: string;
  mainImage?: { asset?: { url: string }; alt?: string };
  categories?: { title: string }[];
}

const BLOG_LIST_QUERY = `*[_type == "post" && publishedAt <= now()] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  "mainImage": mainImage { "asset": asset->{ url }, alt },
  "categories": categories[]->{ title }
}`;

function StarDivider({ count = 3, className = "" }: { count?: number; className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="text-accent select-none" style={{ fontSize: "0.6rem" }}>★</span>
      ))}
    </div>
  );
}

function formatDate(iso?: string) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function BlogPage() {
  const [posts, setPosts] = useState<PostSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    sanityClient
      .fetch<PostSummary[]>(BLOG_LIST_QUERY)
      .then(data => { setPosts(data); setLoading(false); })
      .catch(err => { setError(err instanceof Error ? err.message : "Failed to load posts"); setLoading(false); });
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <SiteNav alwaysSolid />
      <CookieBanner />

      {/* Hero */}
      <section className="pt-28 pb-14 px-6 border-b border-border bg-secondary/30">
        <div className="max-w-3xl mx-auto text-center">
          <StarDivider count={3} className="justify-center mb-5" />
          <h1 className="text-3xl md:text-4xl font-serif font-light tracking-wide text-foreground mb-4">
            Insights &amp; Resources
          </h1>
          <p className="text-foreground/60 text-sm leading-relaxed max-w-xl mx-auto">
            Articles on mental health, wellness, and healing — written by Carol Cherich, LCSW.
          </p>
        </div>
      </section>

      {/* Content */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-14">
        {loading && (
          <div className="flex justify-center py-20">
            <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          </div>
        )}

        {error && (
          <p className="text-center text-sm text-red-500 py-20">{error}</p>
        )}

        {!loading && !error && posts.length === 0 && (
          <p className="text-center text-foreground/50 text-sm py-20">No posts yet — check back soon.</p>
        )}

        {!loading && !error && posts.length > 0 && (
          <div className="grid gap-10">
            {posts.map(post => (
              <article key={post._id} className="group border border-border bg-white hover:border-primary/30 transition-colors">
                <Link to={`/blog/${post.slug.current}`} className="flex flex-col sm:flex-row">
                  {/* Image */}
                  {post.mainImage?.asset?.url && (
                    <div className="sm:w-56 sm:flex-shrink-0 overflow-hidden">
                      <img
                        src={post.mainImage.asset.url}
                        alt={post.mainImage.alt ?? post.title}
                        className="w-full h-44 sm:h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                      />
                    </div>
                  )}

                  {/* Text */}
                  <div className="p-6 flex flex-col justify-between gap-3">
                    <div>
                      {post.categories && post.categories.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {post.categories.map(cat => (
                            <span
                              key={cat.title}
                              className="text-[9px] tracking-[0.18em] uppercase text-primary/70 border border-primary/20 px-2 py-0.5"
                            >
                              {cat.title}
                            </span>
                          ))}
                        </div>
                      )}
                      <h2 className="text-lg font-serif font-light text-foreground group-hover:text-primary transition-colors leading-snug mb-2">
                        {post.title}
                      </h2>
                      {post.excerpt && (
                        <p className="text-sm text-foreground/60 leading-relaxed line-clamp-3">
                          {post.excerpt}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-[11px] text-foreground/40 tracking-wide">
                        {formatDate(post.publishedAt)}
                      </span>
                      <span className="text-[11px] tracking-widest uppercase text-primary/70 group-hover:text-primary transition-colors">
                        Read →
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
