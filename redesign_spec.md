# davenov.com Portfolio Redesign Specification

## Overview

A complete overhaul of David Novák's personal portfolio website. The site serves as a developer-first portfolio showcasing side projects, with subtle artistic touches reflecting David's creative side (Artific music project).

**URL:** davenov.com
**Email:** mail@davenov.com
**Primary Goal:** Showcase projects and invite exploration

---

## Tech Stack

- **Framework:** Next.js (latest)
- **Runtime:** Bun
- **Styling:** Tailwind CSS + shadcn/ui
- **Deployment:** Vercel
- **Analytics:** None (privacy-first approach)

---

## Design Direction

### Visual Style: Hybrid
Professional developer base with subtle artistic touches throughout. Clean and functional, but with personality.

### Artistic Elements (All Included)
- **Micro-animations:** Subtle hover effects, smooth transitions, animated UI elements
- **Typography play:** Mixed/expressive typography - combine serif + sans or distinctive display fonts
- **Color accents:** Mostly monochrome with strategic pops of color (designer's choice for accent color)
- **Generative/Abstract elements:**
  - Hero background: Subtle animated pattern
  - Section dividers: Decorative generative elements
  - Card hover effects: Interactive particles/effects on project cards
  - Global subtle: Very subtle noise/grain texture across the page

### Color Scheme
- Respects system preference (light/dark mode)
- Automatic switching based on OS preference

### Performance Strategy
Progressive loading: Core content loads fast, fancy visual effects load after initial render.

---

## Page Structure (Single Page)

### 1. Navigation
- Scroll spy navigation bar
- Sticky header with section links
- Highlights current section as user scrolls

### 2. Hero/Intro Section
- **Name:** David Novák
- **Title/Headline:** "Tech Lead at Vexl" prominently displayed
- **Photo:** Located at `imgs/davenov_icon.jpeg`
  - Style: Floating/3D effect with subtle shadow and depth
- **Background:** Subtle generative/animated pattern
- **Contact links:** mail@davenov.com, GitHub (@kaladivo), Instagram (@kaladivo)

### 3. Vexl Section (Separate/Dedicated)
David has been Tech Lead at Vexl since October 28, 2022.

**About Vexl:**
Vexl is a mobile app enabling peer-to-peer Bitcoin trading without identity verification. It connects users through their social networks (friends and friends of friends), allowing them to browse anonymized trade offers and communicate through end-to-end encrypted chat. The service emphasizes user privacy and control over personal data.

**Values to subtly hint at:** Bitcoin, privacy, peer-to-peer principles (don't preach, let Vexl's description convey naturally)

**Link:** https://vexl.it

### 4. Projects Section
Card grid layout with direct links to live projects.

#### Card Contents
- Logo/Screenshot
- Brief description (1-2 sentences)
- Live link button (clicking card goes directly to project URL)
- Hover effects with interactive particles/effects

#### Project Order (Favorites First)

**Tier 1 - Featured:**

1. **QR Terminal** (qrterminal.cz)
   - A payment processing solution enabling merchants to accept customer payments through QR codes. Eliminates traditional terminal fees by having customers initiate direct bank transfers via banking apps, with automatic verification of completed transactions.

2. **Hop na Workshop** (hopnaworkshop.cz)
   - A platform for workshop instructors and organizers in the Czech Republic. Streamlines workshop management with simplified registration, automated payment tracking with QR codes and variable symbols, and comprehensive participant management tools.

**Tier 2 - Standard:**

3. **Emotions Log** (emotionslog.com)
   - A mood-tracking mobile app where users rate their mood on a 5-point scale and log emotional patterns throughout the day. Features analytics, reminders, and a visual calendar. All data stored locally on device for privacy.

**Tier 3 - Less Prominent:**

4. **PouchFree** (pouchfree.app)
   - A companion app for quitting nicotine pouches. (Show as smaller/less prominent card, just link to it)

### 5. Artific Section
David's music project/brand.

**Content:**
- Spotify embed: https://open.spotify.com/artist/7tLieLkytLqnUldwoKWHEZ?si=AQPB8vwKRDiEoBbTY2Yr7w
- YouTube video embed: https://youtu.be/fDJlwtHrgn8?si=lYPcB3OqTZl5Kv4A
  - Click to play (shows thumbnail, plays on user interaction)
  - Include "Watch on YouTube" option to open in new tab
- Instagram: https://www.instagram.com/artificmusic

### 6. About/Bio Section
- **Tone:** Conversational, first-person, friendly and approachable
- Brief personal background
- What drives David (tech, music, building things)
- No skill bars or percentage visualizations
- No testimonials

### 7. Contact/Footer
- Email: mail@davenov.com
- GitHub: https://github.com/kaladivo
- Instagram: https://www.instagram.com/kaladivo/
- No contact form (just links)

---

## Special Features

### Scroll Effects
- Subtle parallax on background elements
- Progressive reveal as content comes into view

### 404 Page
Creative/artistic 404 page matching the site's vibe. Something fun and memorable.

### Favicon
Use the photo (`imgs/davenov_icon.jpeg`) cropped for favicon.

### Accessibility
Standard WCAG accessibility:
- Proper color contrast
- Alt text for images
- Keyboard navigation support

---

## Content & Language

- **Language:** English only
- **No tracking or analytics**
- **No blog section**
- **No skill bars or testimonials**

---

## Files to Remove

- Privacy policy folder
- Emotion log folder
- Fun folder and its contents

---

## Assets

- **Photo:** `imgs/davenov_icon.jpeg` (for hero and favicon)
- **Project screenshots/logos:** To be sourced or created

---

## Summary

| Aspect | Decision |
|--------|----------|
| Style | Hybrid (professional + artistic touches) |
| Identity | Developer-first, Artific secondary |
| Layout | Single page scroll |
| Navigation | Scroll spy sticky nav |
| Projects | Card grid, favorites first |
| Vexl | Dedicated section (not a project card) |
| Color mode | System preference |
| Performance | Progressive loading |
| Analytics | None |
| Language | English only |
| Contact | Links only (no form) |
| Deployment | Vercel |
