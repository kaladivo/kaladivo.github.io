# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
# Development (uses Turbopack)
bun dev

# Build static export
bun build

# Quality checks
bun typecheck          # TypeScript type checking
bun lint               # ESLint
bun lint:fix           # Auto-fix linting issues
bun format             # Format with Prettier
bun format:check       # Verify formatting
bun check              # Run all checks (typecheck + lint + format:check)
```

## Architecture

**Stack:** Next.js 16 (App Router) + TypeScript + Tailwind CSS + Framer Motion + Bun

**Static Export:** This site builds to static HTML (`output: "export"` in next.config.ts). No server runtime needed - deploys to static hosting.

### Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with metadata, fonts, theme
│   ├── page.tsx           # Home page (single-page portfolio)
│   └── globals.css        # CSS variables, animations, global styles
├── components/
│   ├── navigation.tsx     # Sticky scroll-spy nav with mobile hamburger
│   ├── theme-provider.tsx # System-preference dark mode detection
│   ├── typewriter.tsx     # Typewriter animation effect
│   ├── generative-background.tsx  # Canvas particle system
│   └── sections/          # Page sections (hero, vexl, projects, etc.)
├── hooks/
│   └── use-in-view.ts    # IntersectionObserver for scroll animations
└── lib/
    └── utils.ts           # cn() utility for Tailwind class merging
```

### Key Patterns

**Theme System:** Uses system preference detection (`prefers-color-scheme`). Colors defined as HSL CSS variables in globals.css with light/dark variants.

**Animations:** Framer Motion for component transitions, canvas-based particle system for background, Intersection Observer for scroll-triggered effects.

**Styling:** Tailwind utility classes + custom CSS variables. Use `cn()` from `@/lib/utils` for conditional class merging.

**Path Alias:** `@/*` maps to `./src/*`

## Workflow

After completing a feature, commit the changes and ask the user if they want to push to the repository.
