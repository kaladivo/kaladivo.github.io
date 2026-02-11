import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navigation } from "@/components/navigation";
import {
  formatBlogDate,
  getAllPublishedSlugs,
  getPostBySlug,
} from "@/lib/blog";
import { MarkdownContent } from "@/components/blog/markdown-content";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;
export const dynamic = "force-static";

export async function generateStaticParams() {
  const slugs = await getAllPublishedSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found | David Novák",
      description: "The requested blog post could not be found.",
    };
  }

  return {
    title: `${post.title} | David Novák`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Navigation variant="blog" />
      <main className="min-h-screen pt-24 pb-16">
        <article className="max-w-3xl mx-auto px-6">
          <header className="mb-10">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-accent transition-colors mb-6"
            >
              <span aria-hidden="true">&larr;</span>
              Back to blog
            </Link>
            <time className="block text-sm text-muted-foreground mb-2">
              {formatBlogDate(post.date)}
            </time>
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-4">
              {post.title}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              {post.excerpt}
            </p>
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
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
          </header>

          <div className="border-t border-border pt-10">
            <MarkdownContent content={post.content} />
          </div>
        </article>
      </main>
    </>
  );
}
