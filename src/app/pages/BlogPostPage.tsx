import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { PortableText } from "@portabletext/react";
import { SiteNav } from "../components/SiteNav";
import { SiteFooter } from "../components/SiteFooter";
import { CookieBanner } from "../components/CookieBanner";
import { sanityClient } from "../../lib/sanity";

interface SanityPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  publishedAt?: string;
  body?: unknown[];
  mainImage?: { asset?: { url: string }; alt?: string };
  author?: { name: string };
  categories?: { title: string }[];
}

const POST_QUERY = `*[_type == "post" && slug.current == $slug && publishedAt <= now()][0] {
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  body,
  "mainImage": mainImage { "asset": asset->{ url }, alt },
  "author": author->{ name },
  "categories": categories[]->{ title }
}`;

function formatDate(iso?: string) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

// Portable Text components styled to match site aesthetic
const ptComponents = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="text-foreground/80 leading-relaxed mb-5">{children}</p>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="text-xl font-serif font-light text-foreground mt-10 mb-4 leading-snug">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="text-lg font-serif font-light text-foreground mt-8 mb-3 leading-snug">{children}</h3>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-2 border-primary/40 pl-5 my-6 text-foreground/60 italic text-sm leading-relaxed">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="list-disc list-outside ml-5 mb-5 space-y-1.5 text-foreground/80 text-sm leading-relaxed">{children}</ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className="list-decimal list-outside ml-5 mb-5 space-y-1.5 text-foreground/80 text-sm leading-relaxed">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: { children?: React.ReactNode }) => <li>{children}</li>,
    number: ({ children }: { children?: React.ReactNode }) => <li>{children}</li>,
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-semibold text-foreground">{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => (
      <em className="italic">{children}</em>
    ),
    link: ({ value, children }: { value?: { href?: string }; children?: React.ReactNode }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary underline underline-offset-2 hover:opacity-75 transition-opacity"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }: { value?: { asset?: { url?: string }; alt?: string; caption?: string } }) => {
      if (!value?.asset?.url) return null;
      return (
        <figure className="my-8">
          <img
            src={value.asset.url}
            alt={value.alt ?? ""}
            className="w-full object-cover"
          />
          {value.caption && (
            <figcaption className="text-center text-xs text-foreground/40 mt-2 italic">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<SanityPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) { navigate("/blog"); return; }
    sanityClient
      .fetch<SanityPost | null>(POST_QUERY, { slug })
      .then(data => {
        if (!data) { navigate("/blog"); return; }
        setPost(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err instanceof Error ? err.message : "Failed to load post");
        setLoading(false);
      });
  }, [slug, navigate]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <SiteNav alwaysSolid />
      <CookieBanner />

      {loading && (
        <div className="flex flex-1 justify-center items-center py-20">
          <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      )}

      {error && (
        <main className="flex-1 flex items-center justify-center">
          <p className="text-sm text-red-500">{error}</p>
        </main>
      )}

      {!loading && !error && post && (
        <main className="flex-1">
          {/* Header image */}
          {post.mainImage?.asset?.url && (
            <div className="w-full h-64 md:h-96 overflow-hidden mt-16">
              <img
                src={post.mainImage.asset.url}
                alt={post.mainImage.alt ?? post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className={`max-w-2xl mx-auto px-6 ${post.mainImage?.asset?.url ? "pt-10" : "pt-28"} pb-20`}>
            {/* Back link */}
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 text-[11px] tracking-widest uppercase text-foreground/40 hover:text-foreground transition-colors mb-8"
            >
              ← All Posts
            </Link>

            {/* Meta */}
            {post.categories && post.categories.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-4">
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

            <h1 className="text-2xl md:text-3xl font-serif font-light text-foreground leading-snug mb-4">
              {post.title}
            </h1>

            <div className="flex items-center gap-3 text-[11px] text-foreground/40 tracking-wide mb-2">
              {post.author?.name && <span>{post.author.name}</span>}
              {post.author?.name && post.publishedAt && <span>·</span>}
              {post.publishedAt && <span>{formatDate(post.publishedAt)}</span>}
            </div>

            {post.excerpt && (
              <p className="text-sm text-foreground/60 leading-relaxed border-l-2 border-primary/30 pl-4 my-6 italic">
                {post.excerpt}
              </p>
            )}

            {/* Divider */}
            <div className="flex items-center gap-2 my-8">
              {[0,1,2].map(i => (
                <span key={i} className="text-accent select-none" style={{ fontSize: "0.6rem" }}>★</span>
              ))}
            </div>

            {/* Body */}
            {post.body && (
              <div className="prose-sm max-w-none">
                {/* @ts-expect-error – portabletext types are loose */}
                <PortableText value={post.body} components={ptComponents} />
              </div>
            )}

            {/* Footer nav */}
            <div className="mt-14 pt-8 border-t border-border">
              <Link
                to="/blog"
                className="inline-flex items-center gap-1.5 text-[11px] tracking-widest uppercase text-foreground/40 hover:text-foreground transition-colors"
              >
                ← Back to all posts
              </Link>
            </div>
          </div>
        </main>
      )}

      <SiteFooter />
    </div>
  );
}
