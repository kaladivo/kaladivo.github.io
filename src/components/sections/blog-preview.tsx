import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { CSSProperties } from "react";
import type { BlogPostMeta } from "@/lib/blog";
import { BlogPreviewInView } from "@/components/sections/client/blog-preview-in-view";

interface BlogPreviewSectionProps {
  posts: BlogPostMeta[];
}

function formatBlogCardDate(date: string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(`${date}T00:00:00.000Z`));
}

export function BlogPreviewSection({ posts }: BlogPreviewSectionProps) {
  return (
    <section id="blog" className="relative py-24 md:py-32">
      <BlogPreviewInView sectionId="blog" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="max-w-5xl mx-auto px-6">
        <div
          data-blog-preview-animate
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
          style={headerAnimationStyle}
        >
          <div className="max-w-2xl">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-3">
              Latest Writing
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Notes on tech, privacy, product decisions, and practical lessons
              from projects.
            </p>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-accent text-accent-foreground font-medium hover:opacity-90 transition-opacity"
          >
            Browse all posts
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {posts.length === 0 ? (
          <div className="rounded-2xl border border-border bg-card p-8 md:p-10">
            <p className="text-lg text-muted-foreground">
              No blog posts published yet. New articles will appear here after
              the next deploy.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {posts.map((post, index) => (
              <div
                key={post.slug}
                data-blog-preview-animate
                style={getPostAnimationStyle(index)}
              >
                <article className="rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5">
                  <time className="block text-xs uppercase tracking-wide text-muted-foreground mb-3">
                    {formatBlogCardDate(post.date)}
                  </time>
                  <h3 className="font-display text-2xl font-semibold mb-3">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                  {post.tags && post.tags.length > 0 && (
                    <div className="mb-5 flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={`${post.slug}-${tag}`}
                          className="text-xs px-2 py-1 rounded-full bg-accent/10 text-accent"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-accent font-medium hover:gap-3 transition-all"
                  >
                    Read article
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </article>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

const headerAnimationStyle: CSSProperties = {
  opacity: 0,
  transform: "translateY(40px)",
  transition: "opacity 0.6s ease, transform 0.6s ease",
};

function getPostAnimationStyle(index: number): CSSProperties {
  const delay = 0.08 * (index + 1);

  return {
    opacity: 0,
    transform: "translateY(28px)",
    transition: `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s`,
  };
}
