---
title: Building a Static Markdown Blog in Next.js
date: 2026-02-10
description: Practical notes on adding a markdown blog with static generation, no database, and a simple publish workflow.
excerpt: Practical notes on adding a markdown blog with static generation, no database, and a simple publish workflow.
tags:
  - nextjs
  - markdown
  - static-site
draft: true
---

## Why I picked static generation

I wanted a blog that stays simple:

- no external database
- no CMS setup
- publish by committing markdown and redeploying

That keeps the system predictable and easy to maintain.

## Content model

Every post lives in `content/blog/*.md` and uses frontmatter:

```yaml
title: Post title
date: 2026-02-10
description: Short summary
draft: false
```

Only `title`, `date`, and `description` are required.

## Example code block

```ts
export async function getLatestPosts(limit: number) {
  const posts = await getAllPosts({ includeDrafts: false });
  return posts.slice(0, limit);
}
```

## Quick comparison

| Approach | Infra | Publish flow |
| --- | --- | --- |
| Static markdown | None | Commit + deploy |
| Dynamic DB | DB + runtime | Write to DB |

## Notes

> Simple systems age better when the content workflow is clear.

If you want to test images, this should render from `public/`:

![Profile image sample](/imgs/davenov_icon.jpeg)

That is it for the first real sample.
