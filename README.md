# Xuneel Services — Official Website v3.0

> Full-stack app development studio website. Zero images. 100% code-rendered graphics. Built for performance, accessibility, and a $100K aesthetic.

---

## ✦ Live Preview

**[www.xuneelservices.com](https://www.xuneelservices.com)**

---

## ✦ Tech Stack

| Layer | Choice |
|-------|--------|
| Structure | Semantic HTML5 · Single-File SPA |
| Styling | Pure CSS · Custom Design System |
| Scripting | Vanilla JS ES2022 · No frameworks |
| Fonts | Syne · DM Sans · JetBrains Mono |
| Icons | Devicon CDN · Inline SVG |
| Routing | Hash-based SPA with History API |
| Animations | CSS keyframes · Web Animations API |

---

## ✦ Features

### 🎨 Design System
- Dark / Light theme toggle with `localStorage` persistence
- CSS custom property token system (colours, spacing, radii, shadows, transitions)
- Responsive across mobile (320px), tablet (768px), laptop (1024px), desktop (1440px+)
- Dot-grid and circuit background patterns — zero images
- Cursor glow follow effect (desktop only)
- Scroll progress bar
- Floating animated tech chips on hero terminal

### ⚡ Performance
- Zero external image dependencies — all graphics are inline SVG or CSS
- Particle canvas pauses off-screen via IntersectionObserver
- Debounced resize handlers
- Lazy-populated stub pages (built once on first visit, cached in DOM)
- `prefers-reduced-motion` support throughout

### 📄 Pages

| Route | Page |
|-------|------|
| `#home` | Hero · Services · Stats · Portfolio preview · ROI Calculator · Testimonials |
| `#about` | Founder bio · Mission · Global time zones |
| `#services` | Services overview |
| `#services/mobile` | Mobile App Development detail |
| `#services/saas` | Custom SaaS Portals detail |
| `#services/ai` | Agentic AI & Automation + inline ROI calculator |
| `#portfolio` | Case studies grid with tag filters |
| `#portfolio/cs1` | FinTech Payment Intelligence Case Study |
| `#portfolio/cs2` | HealthTech Patient Workflow Case Study |
| `#portfolio/cs3` | E-Commerce Inventory AI Case Study |
| `#process` | 5-phase Sprint process + FAQ accordion |
| `#blog` | CTO Insights grid |
| `#blog/post1–3` | Full blog posts |
| `#anti-pitch` | Who we work with / who we do not |
| `#contact` | Contact form with validation |
| `#portal` | Client portal access |
| `#privacy` | Privacy Policy |
| `#terms` | Terms of Service |
| `#msa` | Master Service Agreement |

### 🧩 Interactive Components
- **ROI Calculator** — three-slider real-time savings estimator
- **Testimonials Carousel** — auto-play, touch swipe, keyboard, dot navigation
- **FAQ Accordion** — animated open/close, single-open
- **Portfolio Filter** — tag-based card filtering with smooth transitions
- **Contact Form** — client-side validation + loading state + success screen
- **Live World Clocks** — IST · SGT · EST, updates every 10 seconds
- **GitHub Feed** — pulls public activity via GitHub REST API
- **Ticker Bar** — cycles through live project updates with fade animation
- **Card Tilt Effect** — subtle 3D perspective mouse-tracking on service cards
- **Cookie Banner** — GDPR-style consent, stored in `localStorage`
- **Back to Top** — appears on scroll, smooth scroll to top

---

## ✦ File Structure

```
/
├── index.html      ← Full SPA — all pages inline
├── style.css       ← Complete design system + all responsive CSS
├── app.js          ← SPA router, interactivity, animations
└── README.md       ← This file
```

---

## ✦ Getting Started

### Local Development

No build step. No dependencies. Just open:

```bash
# Clone
git clone https://github.com/xeesee/xuneel-services.git
cd xuneel-services

# Open directly
open index.html

# Or serve locally (recommended — avoids font CORS on some browsers)
npx serve .
# or
python3 -m http.server 8080
```

Visit `http://localhost:8080`.

### Deploy to GitHub Pages

```bash
git add .
git commit -m "feat: launch v2.0"
git push origin main
# Settings → Pages → Source: main / root
```

### Deploy to Netlify

Drag the project folder to [app.netlify.com/drop](https://app.netlify.com/drop). No build config needed.

---

## ✦ Customisation

### Brand Colours

```css
/* style.css — :root */
--accent:   #6bbaec;   /* Primary accent (light beams, buttons) */
--accent-2: #2a509e;   /* Deep blue complement */
--accent-3: #89d0ff;   /* Gradient highlight */
```

### Add a New Page

**1. HTML** — add to `index.html`:
```html
<div id="page-mypage" class="page">
  <!-- your content -->
</div>
```

**2. Route** — register in `app.js`:
```js
const ROUTE_MAP = {
  // ... existing
  '#mypage': 'page-mypage',
};
```

**3. Link** — anywhere in the HTML:
```html
<a data-link="#mypage">My Page</a>
```

### Change GitHub Username

`app.js` line 10:
```js
const GITHUB_USER = 'your-username';
```

### Update Ticker Messages

`app.js`:
```js
const TICKER_MESSAGES = [
  'Your first live update here',
  'Your second live update here',
];
```

---

## ✦ Browser Support

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | 90+ | ✅ Full |
| Firefox | 88+ | ✅ Full |
| Safari | 14+ | ✅ Full |
| Edge | 90+ | ✅ Full |
| Mobile Chrome | Latest | ✅ Full |
| Mobile Safari | iOS 14+ | ✅ Full |

---

## ✦ Accessibility

- Semantic HTML5 landmarks (`<nav>`, `<main>`, `<section>`, `<footer>`, `<article>`)
- ARIA labels on all interactive controls
- Skip-to-main-content link (visible on focus)
- `role` attributes on carousels, stats, and navigation
- `aria-live` regions on dynamic content (ROI output, ticker)
- `aria-expanded` on hamburger / accordion toggles
- Focus-visible outlines on every interactive element
- Minimum 44×44px touch targets on mobile
- `prefers-reduced-motion` disables all keyframe animations

---

## ✦ Performance Checklist

- [x] Zero render-blocking scripts (`defer` on app.js)
- [x] Fonts via `preconnect` + `font-display: swap`
- [x] Canvas animation pauses off-screen (IntersectionObserver)
- [x] Passive scroll listeners
- [x] Debounced resize + mousemove handlers
- [x] No layout shifts (nav height anchored via CSS variable)
- [x] No unused CSS (everything is component-scoped)
- [x] No third-party tracking or analytics by default

---

## ✦ Contact

**Sunil Sharma** — Founder & CTO, Xuneel Services

| Channel | Link |
|---------|------|
| Email | [hello.xuneel@gmail.com](mailto:hello.xuneel@gmail.com) |
| Website | [www.xuneelservices.com](https://www.xuneelservices.com) |
| LinkedIn | [linkedin.com/in/sunil-sharma](https://linkedin.com/in/sunil-sharma) |
| GitHub | [github.com/xeesee](https://github.com/xeesee) |

---

## ✦ Changelog

### v2.0 — 2025
- Complete visual redesign — 3D glow theme, particle canvas, animated terminal
- Zero images — all visuals are SVG/CSS
- Full SPA router with 20+ pages/routes
- ROI Calculator with live sliders
- Testimonial carousel with swipe support
- Interactive GitHub feed
- FAQ accordion, portfolio tag filters
- World clocks (IST, SGT, EST)
- Dark/light theme with system persistence
- Full WCAG 2.1 AA accessibility pass
- Complete responsive system: 320px → 1440px+

### v1.0 — 2022
- Initial launch

---

## ✦ License

© 2025 Xuneel Services. All rights reserved.

This codebase is proprietary. You may fork for personal reference, but you may not redistribute, resell, or deploy a copy of this site as your own commercial product without written permission from Xuneel Services.

---

<div align="center">

**Xuneel Services · Delhi, India**

*Full Stack App Development Solutions*

*We Engineer Scalable Products That Drive Real Business Growth.*

</div>
