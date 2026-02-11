import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import { cn } from "@/lib/utils";

const markdownComponents: Components = {
  a: ({ href, children }) => (
    <a
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      className="text-accent underline underline-offset-4 hover:no-underline"
    >
      {children}
    </a>
  ),
  code: ({ className, children, ...props }) => {
    const isInline =
      !className?.includes("language-") && !String(children).includes("\n");

    return (
      <code
        {...props}
        className={cn(
          className,
          isInline && "px-1.5 py-0.5 rounded bg-muted text-sm font-mono"
        )}
      >
        {children}
      </code>
    );
  },
  pre: ({ children }) => (
    <pre className="mb-6 overflow-x-auto rounded-xl border border-border bg-muted/40 p-4">
      {children}
    </pre>
  ),
  img: ({ src, alt }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src ?? ""}
      alt={alt ?? ""}
      className="rounded-2xl border border-border shadow-sm my-6 max-w-full h-auto"
      loading="lazy"
    />
  ),
};

interface MarkdownContentProps {
  content: string;
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug, rehypeHighlight]}
        components={markdownComponents}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
