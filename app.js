/* ═══════════════════════════════════════════════════════
   XUNEEL SERVICES — app.js
   Complete application logic. One file. Full soul.
═══════════════════════════════════════════════════════ */

'use strict';

/* ── ROUTER ────────────────────────────────────────── */
const Router = (() => {
  const routes = {};

  function register(hash, fn) { routes[hash] = fn; }

  function navigate(hash) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const id = 'page-' + hash.replace('#', '').replace(/\//g, '-');
    const page = document.getElementById(id);
    if (page) {
      page.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'instant' });
      updateNav(hash);
      if (routes[hash]) routes[hash]();
      ScrollAnim.refresh();
    }
  }

  function updateNav(hash) {
    document.querySelectorAll('[data-nav]').forEach(a => {
      a.classList.toggle('active', a.getAttribute('data-nav') === hash);
    });
  }

  function init() {
    window.addEventListener('hashchange', () => navigate(window.location.hash || '#home'));
    document.addEventListener('click', e => {
      const a = e.target.closest('[data-link]');
      if (a) {
        e.preventDefault();
        const href = a.getAttribute('data-link');
        window.location.hash = href;
        MobileNav.close();
      }
    });
    navigate(window.location.hash || '#home');
  }

  return { init, register, navigate };
})();

/* ── THEME TOGGLE ──────────────────────────────────── */
const Theme = (() => {
  function init() {
    const saved = localStorage.getItem('xuneel-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = saved || (prefersDark ? 'dark' : 'light');
    apply(theme);
    document.getElementById('theme-btn')?.addEventListener('click', toggle);
  }

  function apply(theme) {
    document.documentElement.setAttribute('data-theme', theme === 'light' ? 'light' : '');
    const btn = document.getElementById('theme-btn');
    if (btn) btn.innerHTML = theme === 'light' ? '🌙' : '☀️';
    localStorage.setItem('xuneel-theme', theme);
  }

  function toggle() {
    const current = document.documentElement.getAttribute('data-theme');
    apply(current === 'light' ? 'dark' : 'light');
  }

  return { init };
})();

/* ── MOBILE NAV ────────────────────────────────────── */
const MobileNav = (() => {
  let open = false;

  function init() {
    const btn = document.getElementById('hamburger');
    const nav = document.getElementById('mobile-nav');
    btn?.addEventListener('click', () => open ? close() : show());
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
    document.addEventListener('click', e => {
      if (open && !e.target.closest('#mobile-nav') && !e.target.closest('#hamburger')) close();
    });
  }

  function show() {
    open = true;
    document.getElementById('hamburger')?.classList.add('open');
    document.getElementById('mobile-nav')?.classList.add('open');
  }

  function close() {
    open = false;
    document.getElementById('hamburger')?.classList.remove('open');
    document.getElementById('mobile-nav')?.classList.remove('open');
  }

  return { init, close };
})();

/* ── STICKY NAV ────────────────────────────────────── */
const StickyNav = (() => {
  function init() {
    window.addEventListener('scroll', () => {
      document.getElementById('nav')?.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }
  return { init };
})();

/* ── SCROLL ANIMATIONS ─────────────────────────────── */
const ScrollAnim = (() => {
  let observer;

  function init() {
    observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in-view'); observer.unobserve(e.target); } });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    observe();
  }

  function observe() { document.querySelectorAll('.animate-on-scroll').forEach(el => observer?.observe(el)); }
  function refresh() { setTimeout(observe, 50); }

  return { init, refresh };
})();

/* ── LIVE TICKER ───────────────────────────────────── */
const Ticker = (() => {
  const adjectives = ['Aurora', 'Nebula', 'Cipher', 'Quantum', 'Vector', 'Nexus', 'Axiom', 'Prism'];
  const techs = ['API', 'Core', 'Flow', 'Sync', 'Hub', 'Stack', 'Node', 'Grid'];
  const statuses = ['In Build', 'QA Review', 'Client Feedback', 'Deploying', 'Discovery', 'Architecture'];

  function codename() { return adjectives[Math.floor(Math.random() * adjectives.length)] + '-' + techs[Math.floor(Math.random() * techs.length)]; }
  function status() { return statuses[Math.floor(Math.random() * statuses.length)]; }

  const projects = Array.from({ length: 4 }, () => ({ name: codename(), status: status() }));
  let idx = 0;

  function init() {
    const el = document.getElementById('ticker-text');
    const count = document.getElementById('ticker-count');
    if (!el) return;
    if (count) count.textContent = projects.length + ' active builds';
    rotate(el);
    setInterval(() => rotate(el), 4000);
  }

  function rotate(el) {
    el.style.opacity = '0';
    setTimeout(() => {
      const p = projects[idx % projects.length];
      el.textContent = p.name + ' · ' + p.status;
      el.style.opacity = '1';
      idx++;
    }, 200);
  }

  return { init };
})();

/* ── TIMEZONE CLOCKS ───────────────────────────────── */
const Clocks = (() => {
  const zones = [
    { id: 'clock-ist', tz: 'Asia/Kolkata', label: 'IST' },
    { id: 'clock-sgt', tz: 'Asia/Singapore', label: 'SGT' },
    { id: 'clock-est', tz: 'America/New_York', label: 'EST' },
  ];

  function init() {
    update();
    setInterval(update, 1000);
  }

  function update() {
    zones.forEach(z => {
      const el = document.getElementById(z.id);
      if (el) {
        el.textContent = new Date().toLocaleTimeString('en-US', {
          timeZone: z.tz, hour: '2-digit', minute: '2-digit', hour12: true
        });
      }
    });
    // Footer tz
    document.querySelectorAll('[data-tz]').forEach(el => {
      const tz = el.getAttribute('data-tz');
      el.textContent = new Date().toLocaleTimeString('en-US', { timeZone: tz, hour: '2-digit', minute: '2-digit', hour12: true });
    });
  }

  return { init };
})();

/* ── ROI CALCULATOR ────────────────────────────────── */
const ROICalc = (() => {
  function init() {
    const inputs = ['roi-hours', 'roi-rate', 'roi-saving'];
    inputs.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('input', () => { updateLabel(id); compute(); });
    });
    compute();
  }

  function updateLabel(id) {
    const el = document.getElementById(id);
    const label = document.getElementById(id + '-val');
    if (el && label) {
      if (id === 'roi-rate') label.textContent = '$' + el.value;
      else if (id === 'roi-saving') label.textContent = el.value + '%';
      else label.textContent = el.value;
    }
  }

  function compute() {
    const hours = parseFloat(document.getElementById('roi-hours')?.value || 40);
    const rate  = parseFloat(document.getElementById('roi-rate')?.value || 50);
    const save  = parseFloat(document.getElementById('roi-saving')?.value || 70) / 100;

    const wSaved  = (hours * save).toFixed(1);
    const wCost   = (hours * save * rate).toFixed(0);
    const aCost   = (hours * save * rate * 52).toFixed(0);
    const payback = Math.ceil(15000 / (hours * save * rate * 52 / 12));

    setText('roi-out-hours', wSaved + ' hrs');
    setText('roi-out-weekly', '$' + Number(wCost).toLocaleString());
    setText('roi-out-annual', '$' + Number(aCost).toLocaleString());
    setText('roi-out-payback', payback + ' mo');
  }

  function setText(id, val) {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  }

  return { init };
})();

/* ── TESTIMONIAL CAROUSEL ──────────────────────────── */
const Carousel = (() => {
  let cur = 0, total = 0, timer;

  function init() {
    const track = document.querySelector('.carousel-track');
    if (!track) return;
    total = track.children.length;
    buildDots();
    startAuto();
    document.getElementById('prev-btn')?.addEventListener('click', () => go(cur - 1));
    document.getElementById('next-btn')?.addEventListener('click', () => go(cur + 1));
    track.addEventListener('mouseenter', () => clearInterval(timer));
    track.addEventListener('mouseleave', startAuto);
    // Touch
    let tx = 0;
    track.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - tx;
      if (Math.abs(dx) > 50) go(dx < 0 ? cur + 1 : cur - 1);
    });
  }

  function buildDots() {
    const dc = document.querySelector('.carousel-dots');
    if (!dc) return;
    dc.innerHTML = '';
    for (let i = 0; i < total; i++) {
      const d = document.createElement('button');
      d.className = 'carousel-dot' + (i === 0 ? ' active' : '');
      d.setAttribute('aria-label', 'Go to slide ' + (i + 1));
      d.addEventListener('click', () => go(i));
      dc.appendChild(d);
    }
  }

  function go(n) {
    cur = ((n % total) + total) % total;
    const track = document.querySelector('.carousel-track');
    if (track) track.style.transform = `translateX(-${cur * 100}%)`;
    document.querySelectorAll('.carousel-dot').forEach((d, i) => d.classList.toggle('active', i === cur));
  }

  function startAuto() { clearInterval(timer); timer = setInterval(() => go(cur + 1), 5000); }

  return { init };
})();

/* ── PORTFOLIO FILTER ──────────────────────────────── */
const PortfolioFilter = (() => {
  function init() {
    document.querySelectorAll('[data-filter]').forEach(btn => {
      btn.addEventListener('click', () => {
        const f = btn.getAttribute('data-filter');
        document.querySelectorAll('[data-filter]').forEach(b => b.classList.remove('pill-solid'));
        btn.classList.add('pill-solid');
        document.querySelectorAll('.portfolio-card[data-tags]').forEach(card => {
          const tags = card.getAttribute('data-tags');
          const show = f === 'all' || tags.includes(f);
          card.style.opacity = show ? '1' : '0.3';
          card.style.pointerEvents = show ? 'auto' : 'none';
        });
      });
    });
  }
  return { init };
})();

/* ── GITHUB FEED ───────────────────────────────────── */
const GithubFeed = (() => {
  async function init() {
    const el = document.getElementById('github-feed');
    if (!el) return;
    try {
      const r = await fetch('https://api.github.com/users/xeesee/events?per_page=8');
      if (!r.ok) throw new Error('rate-limit');
      const data = await r.json();
      const events = data
        .filter(e => ['PushEvent', 'CreateEvent', 'PullRequestEvent', 'ReleaseEvent'].includes(e.type))
        .slice(0, 5);
      el.innerHTML = events.map(e => {
        const repo = e.repo.name.split('/')[1];
        const time = timeAgo(new Date(e.created_at));
        const msg = eventMsg(e);
        return `<div class="gh-item"><span>${msg}</span> on ${repo} · ${time}</div>`;
      }).join('');
    } catch {
      el.innerHTML = `<div class="gh-item">Follow our open source work → <a href="https://github.com/xeesee" target="_blank" rel="noopener" style="color:var(--accent)">github.com/xeesee</a></div>`;
    }
  }

  function eventMsg(e) {
    if (e.type === 'PushEvent') return `Pushed ${e.payload?.commits?.length || 1} commit(s)`;
    if (e.type === 'CreateEvent') return `Created ${e.payload?.ref_type} ${e.payload?.ref || ''}`;
    if (e.type === 'PullRequestEvent') return `${e.payload?.action} pull request`;
    if (e.type === 'ReleaseEvent') return `Released ${e.payload?.release?.tag_name || 'new version'}`;
    return 'Activity';
  }

  function timeAgo(d) {
    const s = Math.floor((Date.now() - d) / 1000);
    if (s < 60) return 'just now';
    if (s < 3600) return Math.floor(s / 60) + 'm ago';
    if (s < 86400) return Math.floor(s / 3600) + 'h ago';
    return Math.floor(s / 86400) + 'd ago';
  }

  return { init };
})();

/* ── FAQ ACCORDION ─────────────────────────────────── */
const FAQ = (() => {
  function init() {
    document.querySelectorAll('.faq-q').forEach(q => {
      q.addEventListener('click', () => {
        const item = q.closest('.faq-item');
        const isOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
      });
    });
  }
  return { init };
})();

/* ── CONTACT FORM ──────────────────────────────────── */
const ContactForm = (() => {
  function init() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!validate(form)) return;
      const btn = form.querySelector('[type="submit"]');
      btn.classList.add('btn-loading');
      btn.disabled = true;
      await new Promise(r => setTimeout(r, 1800));
      btn.classList.remove('btn-loading');
      const success = document.getElementById('form-success');
      if (success) { form.style.display = 'none'; success.style.display = 'block'; }
    });
    form.querySelectorAll('input, textarea, select').forEach(field => {
      field.addEventListener('blur', () => validateField(field));
      field.addEventListener('input', () => clearError(field));
    });
  }

  function validate(form) {
    let ok = true;
    form.querySelectorAll('[required]').forEach(f => { if (!validateField(f)) ok = false; });
    return ok;
  }

  function validateField(f) {
    clearError(f);
    if (!f.value.trim() && f.required) { showError(f, 'This field is required.'); return false; }
    if (f.type === 'email' && f.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.value)) { showError(f, 'Please enter a valid email.'); return false; }
    if (f.tagName === 'TEXTAREA' && f.value.trim().length < 20 && f.required) { showError(f, 'Please write at least 20 characters.'); return false; }
    return true;
  }

  function showError(f, msg) {
    f.classList.add('error');
    const err = f.parentElement.querySelector('.form-error');
    if (err) { err.textContent = msg; err.classList.add('show'); }
  }

  function clearError(f) {
    f.classList.remove('error');
    const err = f.parentElement.querySelector('.form-error');
    if (err) err.classList.remove('show');
  }

  return { init };
})();

/* ── PORTAL FORM ───────────────────────────────────── */
const PortalForm = (() => {
  function init() {
    const form = document.getElementById('portal-form');
    if (!form) return;
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      const email = form.querySelector('input[type="email"]').value;
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
      btn.classList.add('btn-loading');
      btn.disabled = true;
      await new Promise(r => setTimeout(r, 1200));
      btn.classList.remove('btn-loading');
      // ADD_PORTAL_URL_HERE — replace with your external dashboard URL
      const portalURL = null;
      if (portalURL) {
        window.location.href = portalURL;
      } else {
        document.getElementById('portal-success').style.display = 'block';
        form.style.display = 'none';
      }
    });
  }
  return { init };
})();

/* ── COOKIE CONSENT ────────────────────────────────── */
const Cookie = (() => {
  function init() {
    const banner = document.getElementById('cookie-banner');
    if (!banner) return;
    if (!localStorage.getItem('xuneel-consent')) {
      setTimeout(() => banner.classList.add('show'), 1500);
    }
    document.getElementById('accept-cookies')?.addEventListener('click', () => accept());
    document.getElementById('reject-cookies')?.addEventListener('click', () => reject());
    document.getElementById('close-cookie')?.addEventListener('click', () => reject());
  }

  function accept() {
    localStorage.setItem('xuneel-consent', 'accepted');
    hide();
    window.hasConsent = () => true;
    // ADD_GA_ID_HERE — initialise Google Analytics 4 after consent
  }

  function reject() {
    localStorage.setItem('xuneel-consent', 'rejected');
    hide();
    window.hasConsent = () => false;
  }

  function hide() { document.getElementById('cookie-banner')?.classList.remove('show'); }

  window.hasConsent = () => localStorage.getItem('xuneel-consent') === 'accepted';

  return { init };
})();

/* ── CASE STUDY ROUTER ─────────────────────────────── */
const CaseStudies = [
  {
    id: 'cs1',
    industry: 'FinTech',
    title: 'Real-Time Payment Intelligence Dashboard',
    challenge: 'A fast-growing fintech startup was processing thousands of daily transactions with zero real-time visibility for their ops team. Manual reconciliation was consuming 12+ hours per day and causing costly, compounding errors that eroded client trust and team morale.',
    stack: ['Node.js', 'PostgreSQL', 'Redis', 'React Native', 'AWS'],
    results: [{ num: '92%', label: 'Reduction in reconciliation time' }, { num: '$180K', label: 'Annual ops cost eliminated' }, { num: '99.98%', label: 'Uptime since launch' }],
    duration: '14 Weeks',
    next: '#portfolio/cs2',
    nextTitle: 'Patient Workflow Automation Suite'
  },
  {
    id: 'cs2',
    industry: 'HealthTech',
    title: 'Patient Workflow Automation Suite',
    challenge: 'A multi-clinic healthcare provider was managing patient intake, scheduling, and follow-ups entirely across spreadsheets and email threads. Staff burnout was high and appointment no-show rates had climbed past 35%, directly affecting revenue and care quality.',
    stack: ['Supabase', 'n8n', 'TypeScript', 'React Native', 'GCP'],
    results: [{ num: '9%', label: 'No-show rate (down from 35%)' }, { num: '68%', label: 'Staff admin hours reduced' }, { num: '+41%', label: 'Patient satisfaction score' }],
    duration: '20 Weeks',
    next: '#portfolio/cs3',
    nextTitle: 'AI-Powered Inventory Intelligence'
  },
  {
    id: 'cs3',
    industry: 'E-Commerce',
    title: 'AI-Powered Inventory Intelligence System',
    challenge: 'A D2C e-commerce brand was losing over $200K annually to stockouts and overstock events driven entirely by manual inventory decisions. Their team had no predictive capability and continuously reacted to problems rather than preventing them.',
    stack: ['Python', 'PostgreSQL', 'n8n', 'GraphQL', 'AWS'],
    results: [{ num: '80%', label: 'Stockout events reduced' }, { num: '$210K', label: 'Inventory waste recovered' }, { num: '94%', label: 'Demand forecasting accuracy' }],
    duration: '10 Weeks',
    next: '#portfolio/cs1',
    nextTitle: 'Real-Time Payment Dashboard'
  }
];

function renderCaseStudy(cs) {
  const page = document.getElementById('page-portfolio-' + cs.id);
  if (!page) return;
  page.innerHTML = `
    <section class="cs-hero dot-grid">
      <div class="container">
        <div class="cs-hero-meta">
          <span class="pill">${cs.industry}</span>
          <span class="pill">${cs.duration}</span>
        </div>
        <h1>${cs.title}</h1>
        <div class="cs-stack-grid mt-4">
          ${cs.stack.map(s => `<div class="cs-stack-item">${stackIcon(s)} ${s}</div>`).join('')}
        </div>
      </div>
    </section>
    <div class="container">
      <div class="cs-section">
        <h2>The Challenge</h2>
        <p style="font-size:1.1rem;color:var(--text-muted);line-height:1.9;max-width:720px;">${cs.challenge}</p>
      </div>
      <div class="cs-section">
        <h2>The Result</h2>
        <div class="cs-results">
          ${cs.results.map(r => `<div class="cs-result-card animate-on-scroll"><div class="cs-result-num">${r.num}</div><div class="cs-result-label">${r.label}</div></div>`).join('')}
        </div>
      </div>
      <div class="cs-nav">
        <a data-link="#portfolio" class="btn btn-ghost">← Back to Portfolio</a>
        <a data-link="${cs.next}" class="btn btn-primary">Next: ${cs.nextTitle} →</a>
      </div>
    </div>
  `;
}

function stackIcon(tech) {
  const icons = { 'Node.js': '⬡', 'PostgreSQL': '🐘', 'Redis': '⚡', 'React Native': '⚛', 'AWS': '☁', 'Supabase': '⚡', 'n8n': '🔗', 'TypeScript': '𝗧', 'GCP': '☁', 'Python': '🐍', 'GraphQL': '◈' };
  return `<span>${icons[tech] || '●'}</span>`;
}

/* ── BLOG POSTS DATA ───────────────────────────────── */
const BlogPosts = [
  {
    id: 'post1',
    title: 'Why Your SaaS Architecture Decision at Week 1 Will Cost You at Year 2',
    excerpt: 'The choices you make when laying your SaaS foundation are not just technical — they are financial. This piece breaks down the three architecture decisions that silently compound into six-figure refactor bills.',
    tags: ['Architecture', 'SaaS', 'Technical Debt'],
    date: 'March 12, 2025',
    readTime: '8 min read',
    body: `
      <h2>The Hidden Cost of Early Decisions</h2>
      <p>When founders come to us at Xuneel, they often have the same problem: something their team built in the first 90 days is now a ceiling on their growth. They did not make bad decisions. They made fast decisions. Those are not the same thing — but the bill arrives the same way.</p>
      <p>Here are the three architecture decisions we see most often become six-figure refactors at the 18-month mark.</p>
      <h2>1. The Monolith vs. Modular Decision</h2>
      <p>Building a monolith first is not wrong. But building a monolith with no seam lines is. When every feature is tightly coupled to every other feature, extracting any single service becomes a full rebuild. The fix costs more than starting over.</p>
      <blockquote>"Build a monolith. But draw the domain boundaries as if you will split it next year. You probably will."</blockquote>
      <p>Our standard: define your core domain entities in week one. Never let two domains write to each other's tables directly. This single rule has saved our clients hundreds of hours of migration work.</p>
      <h2>2. The Database Schema Lock-In</h2>
      <p>Relational databases are not the problem. Relational databases with no migration discipline are. We have audited codebases where the schema had never been versioned — the production database was the only source of truth for what the schema actually was.</p>
      <pre>-- What we always enforce from day one:
-- /db/migrations/001_initial_schema.sql
-- /db/migrations/002_add_user_roles.sql
-- /db/migrations/003_invoice_table.sql

-- Never ALTER production without a migration file.
-- Never assume your schema is what you think it is.</pre>
      <h2>3. The Auth Layer as an Afterthought</h2>
      <p>We have rebuilt authentication systems for three clients in the past year. In each case, auth was added after the data model was established — meaning permissions had to be retrofitted onto a schema that was not designed for them. Role-based access on top of flat tables is painful. Plan your access layer in week one.</p>
      <h3>The Principle We Follow</h3>
      <p>Every architecture decision should be made with a two-year horizon. Not a five-year horizon — that leads to over-engineering. Two years forces you to think past launch without building systems for problems you do not yet have.</p>
    `
  },
  {
    id: 'post2',
    title: 'Build Custom vs. Buy Off-The-Shelf: The Framework We Use With Every Client',
    excerpt: 'Most agencies will build anything you pay them to build. We will tell you when not to build — and exactly when you absolutely should. Here is the decision matrix we use internally.',
    tags: ['Strategy', 'SaaS', 'ROI'],
    date: 'February 3, 2025',
    readTime: '6 min read',
    body: `
      <h2>The Question Nobody Asks Their Agency</h2>
      <p>Should you build this? Almost no development agency will tell you not to build. It is not in their financial interest. We think this is wrong, and we have lost deals because of it. We have also built longer, more trusting client relationships because of it.</p>
      <p>Here is the framework we walk every new client through before we write a single line of code.</p>
      <h2>The Decision Matrix</h2>
      <table style="width:100%;border-collapse:collapse;margin:var(--s4) 0;font-size:0.9rem;">
        <thead><tr style="background:var(--surface-alt);">
          <th style="padding:0.75rem;text-align:left;border:1px solid var(--border);color:var(--accent);">Criterion</th>
          <th style="padding:0.75rem;text-align:left;border:1px solid var(--border);color:var(--accent);">Build Custom</th>
          <th style="padding:0.75rem;text-align:left;border:1px solid var(--border);color:var(--accent);">Buy Off-Shelf</th>
        </tr></thead>
        <tbody>
          <tr><td style="padding:0.75rem;border:1px solid var(--border);color:var(--text-muted);">Core differentiator?</td><td style="padding:0.75rem;border:1px solid var(--border);color:var(--success);">Yes — Build it</td><td style="padding:0.75rem;border:1px solid var(--border);color:var(--text-dim);">Not really</td></tr>
          <tr><td style="padding:0.75rem;border:1px solid var(--border);color:var(--text-muted);">SaaS exists that fits?</td><td style="padding:0.75rem;border:1px solid var(--border);color:var(--text-dim);">No fit found</td><td style="padding:0.75rem;border:1px solid var(--border);color:var(--success);">Yes — Buy it</td></tr>
          <tr><td style="padding:0.75rem;border:1px solid var(--border);color:var(--text-muted);">Data ownership critical?</td><td style="padding:0.75rem;border:1px solid var(--border);color:var(--success);">Yes — Build it</td><td style="padding:0.75rem;border:1px solid var(--border);color:var(--text-dim);">Not required</td></tr>
          <tr><td style="padding:0.75rem;border:1px solid var(--border);color:var(--text-muted);">Volume exceeds SaaS pricing?</td><td style="padding:0.75rem;border:1px solid var(--border);color:var(--success);">Yes — Build it</td><td style="padding:0.75rem;border:1px solid var(--border);color:var(--text-dim);">Not yet</td></tr>
          <tr><td style="padding:0.75rem;border:1px solid var(--border);color:var(--text-muted);">Deep integration needed?</td><td style="padding:0.75rem;border:1px solid var(--border);color:var(--success);">Yes — Build it</td><td style="padding:0.75rem;border:1px solid var(--border);color:var(--text-dim);">API is sufficient</td></tr>
        </tbody>
      </table>
      <h2>The Rule We Always Come Back To</h2>
      <blockquote>"If the feature is not the reason your customers pay you, do not build it."</blockquote>
      <p>Your CRM is not your product. Your invoicing is not your product. Your auth system is not your product. The thing your customers pay you specifically to do — that is your product. Build that. Buy everything else.</p>
      <h2>When We Tell Clients Not to Build</h2>
      <p>We have had several calls where we told a founder: do not build yet. Validate with no-code first. Two of those founders came back six months later with a validated product and a budget that actually matched the scope. Those engagements went better than any we rushed into.</p>
    `
  },
  {
    id: 'post3',
    title: 'Agentic AI Is Not a Feature — It Is a Business Model Shift',
    excerpt: 'Companies treating AI as a chatbot add-on are leaving the real value on the table. Here is what it actually means to build an agentic system that replaces entire operational workflows.',
    tags: ['AI', 'Automation', 'Engineering'],
    date: 'January 15, 2025',
    readTime: '10 min read',
    body: `
      <h2>The Chatbot Trap</h2>
      <p>When most companies say they are "adding AI", they mean they added a chatbot to their support page. That is not a business model shift. That is a widget. The companies that are extracting real value from AI right now are not thinking about it as a feature — they are redesigning their operations around what AI makes possible.</p>
      <h2>What Agentic Actually Means</h2>
      <p>An agentic system is one that can take action, not just respond. It can query a database, write to a CRM, send an email, trigger a workflow, call an API, evaluate the result, and decide what to do next — without a human in the loop.</p>
      <blockquote>"The difference between a chatbot and an agent is the difference between an assistant who tells you what to do and one who actually does it."</blockquote>
      <h2>A Real Example: Inventory Agent</h2>
      <p>One of our e-commerce clients now runs a nightly inventory agent built on n8n + PostgreSQL + GPT-4o. Here is a simplified version of one of its nodes:</p>
      <pre>// n8n Function Node — Inventory Decision Agent
const inventory = $input.all();
const decisions = inventory.map(item => {
  const velocity = item.json.sold_last_30d / 30;
  const daysLeft  = item.json.stock / velocity;

  if (daysLeft < 7)  return { ...item.json, action: 'REORDER_URGENT' };
  if (daysLeft > 90) return { ...item.json, action: 'FLAG_OVERSTOCK' };
  return { ...item.json, action: 'MONITOR' };
});

return decisions.filter(d => d.action !== 'MONITOR');</pre>
      <p>This runs every night. It pushes REORDER_URGENT items to their supplier portal and OVERSTOCK items to their markdown pricing tool. No human touches it unless an exception is raised. Their team used to spend 3 hours a day on this. Now they spend 15 minutes reviewing edge cases.</p>
      <h2>The Business Model Shift</h2>
      <p>When you eliminate 70% of your operational overhead through automation, your margins change fundamentally. You can serve more clients with the same team. You can price more competitively. You can redirect human effort toward the creative, strategic work that actually builds your moat.</p>
      <p>That is not a feature. That is a different company.</p>
    `
  }
];

function renderPost(post) {
  const page = document.getElementById('page-blog-' + post.id);
  if (!page) return;
  page.innerHTML = `
    <div class="post-hero">
      <div class="container">
        <div class="cs-hero-meta" style="margin-bottom:var(--s3);">
          ${post.tags.map(t => `<span class="pill">${t}</span>`).join('')}
        </div>
        <h1>${post.title}</h1>
        <div class="post-meta">
          <span>Sunil Sharma</span>
          <span>·</span>
          <span>${post.date}</span>
          <span>·</span>
          <span>${post.readTime}</span>
        </div>
      </div>
    </div>
    <div class="container" style="padding-bottom:var(--s12);">
      <div class="post-body">${post.body}</div>
      <div class="author-card mt-6">
        <div class="author-avatar">👨‍💻</div>
        <div>
          <div style="font-family:var(--font-head);font-weight:700;margin-bottom:0.25rem;">Sunil Sharma</div>
          <div style="font-size:0.8rem;color:var(--accent);font-family:var(--font-mono);margin-bottom:var(--s1);">Founder & CTO, Xuneel Services</div>
          <p style="font-size:0.88rem;color:var(--text-muted);margin:0;">Building high-performance software for growth-stage companies since 2022. Writing about architecture, automation, and what actually moves the needle.</p>
        </div>
      </div>
      <div style="margin-top:var(--s6);padding-top:var(--s4);border-top:1px solid var(--border);">
        <a data-link="#blog" class="btn btn-ghost">← Back to Insights</a>
      </div>
    </div>
  `;
}

/* ── INIT ──────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  Theme.init();
  MobileNav.init();
  StickyNav.init();
  ScrollAnim.init();
  Ticker.init();
  Clocks.init();
  Carousel.init();
  FAQ.init();
  Cookie.init();
  PortfolioFilter.init();

  // Render dynamic pages
  CaseStudies.forEach(cs => renderCaseStudy(cs));
  BlogPosts.forEach(post => renderPost(post));

  // Init page-specific modules after render
  Router.register('#portfolio/cs1', () => { ScrollAnim.refresh(); });
  Router.register('#portfolio/cs2', () => { ScrollAnim.refresh(); });
  Router.register('#portfolio/cs3', () => { ScrollAnim.refresh(); });
  Router.register('#contact', () => { ContactForm.init(); });
  Router.register('#portal', () => { PortalForm.init(); });
  Router.register('#home', () => { ROICalc.init(); GithubFeed.init(); });

  Router.init();
});
