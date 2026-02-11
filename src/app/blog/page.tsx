import type { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { formatBlogDate, getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog | David Novák",
  description:
    "Thoughts on tech, privacy, Bitcoin, music production, and building things.",
};

export default async function BlogListPage() {
  const posts = await getAllPosts();

  return (
    <>
      <Navigation variant="blog" />
      <main className="min-h-screen pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-6">
          <header className="mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Blog
            </h1>
            <p className="text-lg text-muted-foreground">
              Thoughts on tech, privacy, and building things.
            </p>
          </header>

          {posts.length === 0 ? (
            <section className="rounded-2xl border border-border bg-card p-8 md:p-10 text-center">
              <h2 className="font-display text-3xl font-semibold mb-3">
                No posts yet
              </h2>
              <p className="text-muted-foreground text-lg">
                Check back soon for new writing.
              </p>
            </section>
          ) : (
            <section className="space-y-8">
              {posts.map((post) => (
                <article
                  key={post.slug}
                  className="group rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/10 hover:border-accent/30"
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    className="block"
                  >
                    <time className="text-sm text-muted-foreground">
                      {formatBlogDate(post.date)}
                    </time>
                    <h2 className="mt-2 text-2xl font-semibold text-foreground group-hover:text-accent transition-colors">
                      {post.title}
                    </h2>
                    <p className="mt-2 text-muted-foreground">{post.excerpt}</p>
                    {post.tags && post.tags.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
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
                  </Link>
                </article>
              ))}
            </section>
          )}
        </div>
      </main>
    </>
  );
}
