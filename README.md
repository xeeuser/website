# ◈ AUXANO STUDIO — Website

> **Premium Full Stack Web & App Development Studio**  
> Founded by Pratik Sharma · Delhi, India

---

## 🌐 Live Preview

Open `index.html` in any modern browser. No build step, no dependencies to install.

---

## 📁 File Structure

```
auxano-studio/
├── index.html   — Complete HTML structure (all 18 sections)
├── style.css    — Full CSS (variables, animations, responsive)
├── app.js       — All JavaScript (Three.js, interactions, UI)
└── README.md    — This file
```

---

## ✨ Features

### Visual & Design
- 🌐 **Three.js Hero** — Animated wireframe icosphere with orbit rings & floating particles
- 🪟 **Glassmorphism** — Frosted-glass cards with `backdrop-filter` blur throughout
- 💡 **Glow Effects** — Bloom on icons, borders, buttons, and focus states
- 🎨 **CSS 3D Cube** — Rotating cube in the About section (pure CSS `transform-style: preserve-3d`)
- ✨ **Grain/Noise Overlay** — Subtle noise texture for depth
- 🖱️ **Custom Cursor** — Magnetic dot + ring with hover expansion
- 📽️ **Reveal Animations** — Staggered fade + slide via IntersectionObserver
- 🎯 **Card Tilt** — Mouse-parallax 3D tilt on service cards

### Sections (18 total)
| # | Section | Notes |
|---|---------|-------|
| 1 | **Loader** | Animated progress bar 0→100% |
| 2 | **Navigation** | Sticky, glassmorphism on scroll, mobile hamburger |
| 3 | **Hero** | Three.js sphere, typewriter, KPIs |
| 4 | **Marquee** | Infinite scroll tech keywords |
| 5 | **Services** | 6 cards: Web, Mobile, UI/UX, Cloud, AI, Brand |
| 6 | **Stats** | Animated counters: 150+ projects, 98% satisfaction |
| 7 | **About** | 3D rotating cube, floating info cards |
| 8 | **Process** | 4-step timeline: Discover → Design → Develop → Launch |
| 9 | **Portfolio** | 6 projects with CSS mockups, filter by category |
| 10 | **Tech Stack** | 6 categories × 5 technologies |
| 11 | **Why Us** | 6 USP cards |
| 12 | **Team** | Pratik Sharma + 4 specialists |
| 13 | **Testimonials** | Auto-sliding carousel, 5 reviews |
| 14 | **Pricing** | 3 tiers + monthly/project toggle |
| 15 | **FAQ** | Accordion with smooth height transitions |
| 16 | **Contact** | Validated form + info cards |
| 17 | **Footer** | 5-column with social links |
| 18 | **Scroll Top** | Sticky floating button |

### Interactions
- ✅ Typewriter cycling through 5 phrases
- ✅ Portfolio category filtering (All / Web / Mobile / AI / Design)
- ✅ Testimonials auto-slider with dot navigation
- ✅ Pricing toggle: Monthly ↔ Project-based
- ✅ FAQ accordion (one open at a time)
- ✅ Contact form with field-level validation
- ✅ Active nav link tracking on scroll
- ✅ Smooth scroll to all sections
- ✅ Three.js mouse parallax
- ✅ Scroll-to-top button (appears after 500px)
- ✅ Animated counter numbers on scroll into view

---

## 🎨 Brand Colors (Sapphire Palette)

| Variable | Hex | Usage |
|----------|-----|-------|
| `--c-bg` | `#010815` | Main background |
| `--c-bg2` | `#020d20` | Alternate section background |
| `--c-primary` | `#2a6be8` | Buttons, active states |
| `--c-bright` | `#6bbaec` | Tags, secondary accents |
| `--c-accent` | `#00d4ff` | Glows, icons, highlights |
| `--c-mid` | `#1e3a6e` | Mid tones |

---

## 🔤 Typography

| Font | Usage |
|------|-------|
| **Syne** | All headings (font-head) |
| **DM Sans** | Body text (font-body) |
| **Space Mono** | Badges, code, mono labels |

---

## 📱 Responsive Breakpoints

| Breakpoint | Target |
|------------|--------|
| `≥ 1200px` | Full desktop — 3-col grids |
| `≥ 1024px` | Large tablet |
| `≤ 1100px` | Footer 2-col, about stacked |
| `≤ 900px` | Mobile nav, 1-col testimonials |
| `≤ 700px` | Full mobile layout |
| `≤ 480px` | Small phones |

---

## 🚀 How to Run

```bash
# Option 1: Open directly
open index.html          # macOS
start index.html         # Windows
xdg-open index.html      # Linux

# Option 2: Local server (recommended for Three.js)
npx serve .
# or
python3 -m http.server 8080
# then visit http://localhost:8080
```

> **Note:** Three.js is loaded from Cloudflare CDN. An internet connection is required for the hero sphere animation and Google Fonts.

---

## 🛠️ Customisation

### Update Contact Details
In `index.html`, search for:
- `hello.auxano@gmail.com` — your email
- `6 Marg, Delhi` — your address
- `wa.me/919999999999` — your WhatsApp number

### Change Colours
Edit CSS variables in `style.css` under `:root { }`.

### Add/Remove Portfolio Projects
Copy a `.port-card` block in `index.html`, set `data-cat` to `web`, `mobile`, `ai`, or `design`.

### Add Real Social Links
Replace `href="#"` on all `.ts-btn`, `.footer-socials a`, and `.cs-btn` elements.

### Connect Contact Form
Replace the `setTimeout` simulation in `app.js` `initContactForm()` with a real API call (EmailJS, Formspree, or your backend).

---

## 📦 External Dependencies (CDN)

| Library | Version | Purpose |
|---------|---------|---------|
| Three.js | r128 | Hero 3D sphere |
| Font Awesome | 6.5.0 | Icons throughout |
| Google Fonts | — | Syne, DM Sans, Space Mono |

---

## 📞 Contact

**Auxano Studio**  
Founder: Pratik Sharma  
Email: hello.auxano@gmail.com  
Location: 6 Marg, Delhi, India  

---

*© 2026 Auxano Studio. Built with ♥ in Delhi, India.*
