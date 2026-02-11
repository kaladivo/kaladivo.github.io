import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const BLOG_DIRECTORY = path.join(process.cwd(), "content", "blog");
const POST_EXTENSION = ".md";
const DATE_FORMAT_REGEX = /^\d{4}-\d{2}-\d{2}$/;

export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  description: string;
  tags?: string[];
  coverImage?: string;
  draft?: boolean;
}

export interface BlogPost extends BlogPostMeta {
  content: string;
}

interface GetAllPostsOptions {
  includeDrafts?: boolean;
}

interface RawFrontmatter {
  title?: unknown;
  date?: unknown;
  description?: unknown;
  excerpt?: unknown;
  tags?: unknown;
  coverImage?: unknown;
  draft?: unknown;
  published?: unknown;
}

interface ParsedFrontmatter {
  title: string;
  date: string;
  description: string;
  excerpt: string;
  tags?: string[];
  coverImage?: string;
  draft?: boolean;
}

function isFileNotFoundError(error: unknown): boolean {
  return (
    !!error &&
    typeof error === "object" &&
    "code" in error &&
    error.code === "ENOENT"
  );
}

function coerceDateValue(value: unknown): string {
  if (typeof value === "string") {
    return value.trim();
  }

  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }

  return "";
}

function isValidDateString(date: string): boolean {
  if (!DATE_FORMAT_REGEX.test(date)) {
    return false;
  }

  const parsed = new Date(`${date}T00:00:00.000Z`);

  if (Number.isNaN(parsed.getTime())) {
    return false;
  }

  return parsed.toISOString().startsWith(date);
}

function parseFrontmatter(frontmatter: RawFrontmatter, fileName: string) {
  const title =
    typeof frontmatter.title === "string" ? frontmatter.title.trim() : "";
  const date = coerceDateValue(frontmatter.date);
  const description =
    typeof frontmatter.description === "string"
      ? frontmatter.description.trim()
      : "";
  const excerpt =
    typeof frontmatter.excerpt === "string" ? frontmatter.excerpt.trim() : "";
  const summary = description || excerpt;
  const coverImage =
    typeof frontmatter.coverImage === "string"
      ? frontmatter.coverImage.trim()
      : undefined;
  const tags = Array.isArray(frontmatter.tags)
    ? frontmatter.tags
    : frontmatter.tags === undefined
      ? undefined
      : null;

  if (!title) {
    throw new Error(`Missing or invalid 'title' in ${fileName}`);
  }

  if (!date || !isValidDateString(date)) {
    throw new Error(
      `Missing or invalid 'date' in ${fileName}. Expected YYYY-MM-DD format.`
    );
  }

  if (!summary) {
    throw new Error(
      `Missing summary in ${fileName}. Provide either 'description' or 'excerpt'.`
    );
  }

  if (
    typeof frontmatter.draft !== "undefined" &&
    typeof frontmatter.draft !== "boolean"
  ) {
    throw new Error(`Invalid 'draft' value in ${fileName}. Expected boolean.`);
  }

  if (
    typeof frontmatter.published !== "undefined" &&
    typeof frontmatter.published !== "boolean"
  ) {
    throw new Error(
      `Invalid 'published' value in ${fileName}. Expected boolean.`
    );
  }

  if (tags === null || tags?.some((tag) => typeof tag !== "string")) {
    throw new Error(
      `Invalid 'tags' value in ${fileName}. Expected an array of strings.`
    );
  }

  const normalizedTags = tags
    ?.map((tag) => tag.trim())
    .filter((tag) => tag.length > 0);

  const isDraft = frontmatter.draft === true || frontmatter.published === false;

  return {
    title,
    date,
    description: summary,
    excerpt: summary,
    tags: normalizedTags && normalizedTags.length > 0 ? normalizedTags : undefined,
    coverImage: coverImage || undefined,
    draft: isDraft,
  } satisfies ParsedFrontmatter;
}

function parsePostFile(fileName: string, source: string): BlogPost {
  const { content, data } = matter(source);
  const parsed = parseFrontmatter(data as RawFrontmatter, fileName);

  return {
    slug: path.basename(fileName, POST_EXTENSION),
    title: parsed.title,
    date: parsed.date,
    excerpt: parsed.excerpt,
    description: parsed.description,
    tags: parsed.tags,
    coverImage: parsed.coverImage,
    draft: parsed.draft,
    content,
  } satisfies BlogPost;
}

async function getMarkdownFiles(): Promise<string[]> {
  try {
    const entries = await fs.readdir(BLOG_DIRECTORY, { withFileTypes: true });

    return entries
      .filter((entry) => entry.isFile() && entry.name.endsWith(POST_EXTENSION))
      .map((entry) => entry.name);
  } catch (error) {
    if (isFileNotFoundError(error)) {
      return [];
    }

    throw error;
  }
}

function sortPostsByDateDesc<T extends { date: string }>(posts: T[]) {
  return posts.sort((left, right) => right.date.localeCompare(left.date));
}

export async function getAllPosts(
  options: GetAllPostsOptions = {}
): Promise<BlogPost[]> {
  const { includeDrafts = false } = options;
  const markdownFiles = await getMarkdownFiles();

  const posts = await Promise.all(
    markdownFiles.map(async (fileName) => {
      const filePath = path.join(BLOG_DIRECTORY, fileName);
      const source = await fs.readFile(filePath, "utf8");
      return parsePostFile(fileName, source);
    })
  );

  const publishedPosts = includeDrafts
    ? posts
    : posts.filter((post) => !post.draft);

  return sortPostsByDateDesc(publishedPosts);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const fileName = `${slug}${POST_EXTENSION}`;
  const filePath = path.join(BLOG_DIRECTORY, fileName);

  try {
    const source = await fs.readFile(filePath, "utf8");
    const post = parsePostFile(fileName, source);
    return post.draft ? null : post;
  } catch (error) {
    if (isFileNotFoundError(error)) {
      return null;
    }

    throw error;
  }
}

export async function getLatestPosts(limit: number): Promise<BlogPostMeta[]> {
  const posts = await getAllPosts({ includeDrafts: false });

  return posts.slice(0, limit).map((post) => ({
    slug: post.slug,
    title: post.title,
    date: post.date,
    excerpt: post.excerpt,
    description: post.description,
    tags: post.tags,
    coverImage: post.coverImage,
    draft: post.draft,
  }));
}

export async function getAllPublishedSlugs(): Promise<string[]> {
  const posts = await getAllPosts({ includeDrafts: false });
  return posts.map((post) => post.slug);
}

export function formatBlogDate(date: string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(`${date}T00:00:00.000Z`));
}
