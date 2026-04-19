/* ═══════════════════════════════════════════════════════
   XUNEEL SERVICES — app.js  v2.0
   Full client-side SPA engine · $100K quality
═══════════════════════════════════════════════════════ */

'use strict';

/* ══════════════════════════════════════════════════════
   CONSTANTS & STATE
══════════════════════════════════════════════════════ */
const GITHUB_USER = 'xeesee';
const TICKER_MESSAGES = [
  'Building a payment intelligence dashboard — 92% faster reconciliation',
  'Automating patient workflows — no-show rate dropped from 35% to 9%',
  'Deploying inventory AI — $210K waste recovered for e-commerce client',
  'Engineering agentic automation — 68% admin time saved in 10 weeks',
];

let carouselIndex   = 0;
let carouselTotal   = 0;
let tickerInterval  = null;
let tickerIdx       = 0;

/* ══════════════════════════════════════════════════════
   UTILITY
══════════════════════════════════════════════════════ */
const $  = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

function debounce(fn, delay = 150) {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), delay); };
}

/* ══════════════════════════════════════════════════════
   ROUTER — Hash-based SPA
══════════════════════════════════════════════════════ */
const ROUTE_MAP = {
  '#home':            'page-home',
  '#about':           'page-about',
  '#services':        'page-services',
  '#services/mobile': 'page-services-mobile',
  '#services/saas':   'page-services-saas',
  '#services/ai':     'page-services-ai',
  '#portfolio':       'page-portfolio',
  '#portfolio/cs1':   'page-portfolio-cs1',
  '#portfolio/cs2':   'page-portfolio-cs2',
  '#portfolio/cs3':   'page-portfolio-cs3',
  '#process':         'page-process',
  '#blog':            'page-blog',
  '#blog/post1':      'page-blog-post1',
  '#blog/post2':      'page-blog-post2',
  '#blog/post3':      'page-blog-post3',
  '#anti-pitch':      'page-anti-pitch',
  '#contact':         'page-contact',
  '#portal':          'page-portal',
  '#privacy':         'page-privacy',
  '#terms':           'page-terms',
  '#msa':             'page-msa',
};

function navigateTo(hash) {
  hash = (hash || '#home').split('?')[0];
  const pageId = ROUTE_MAP[hash] || 'page-home';

  $$('.page').forEach(p => p.classList.remove('active'));

  const target = document.getElementById(pageId);
  if (!target) return;

  target.classList.add('active');
  populateStubPage(pageId);
  window.scrollTo({ top: 0, behavior: 'smooth' });

  $$('[data-nav]').forEach(a =>
    a.classList.toggle('active', a.getAttribute('data-nav') === hash)
  );

  closeMobileMenu();
  setTimeout(initScrollAnimations, 80);

  if (hash === '#services/ai') setTimeout(() => initROICalc('2'), 100);
  updateClocks();
}

/* ── Stub page builder ─────────────────────────────── */
function populateStubPage(pageId) {
  const STUBS = {
    'page-portfolio-cs1': buildCS1,
    'page-portfolio-cs2': buildCS2,
    'page-portfolio-cs3': buildCS3,
    'page-blog-post1':    buildPost1,
    'page-blog-post2':    buildPost2,
    'page-blog-post3':    buildPost3,
  };
  const page = document.getElementById(pageId);
  if (page && STUBS[pageId] && !page.dataset.populated) {
    page.innerHTML = STUBS[pageId]();
    page.dataset.populated = '1';
    attachLinks(page);
    setTimeout(initScrollAnimations, 50);
  }
}

/* ── Attach [data-link] inside a context ───────────── */
function attachLinks(ctx = document) {
  $$('[data-link]', ctx).forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      const h = el.getAttribute('data-link');
      history.pushState(null, '', h);
      navigateTo(h);
    });
  });
}

/* ══════════════════════════════════════════════════════
   STUB PAGE CONTENT
══════════════════════════════════════════════════════ */
function buildCS1() {
  return `
  <section class="about-hero dot-grid"><div class="container" style="max-width:820px;">
    <a data-link="#portfolio" class="btn btn-ghost btn-sm" style="margin-bottom:var(--s4);">← Back to Portfolio</a>
    <span class="eyebrow">Case Study · FinTech · 14 Weeks</span>
    <h1>Real-Time Payment Intelligence Dashboard</h1>
    <p>How we reduced reconciliation time by 92% for a fast-growing FinTech company processing $40M+ monthly.</p>
  </div></section>
  <section class="section"><div class="container" style="max-width:820px;">
    <div class="divider"></div>
    <div class="grid-2" style="gap:var(--s6);margin-bottom:var(--s8);">
      <div class="animate-on-scroll">
        <span class="eyebrow">The Problem</span>
        <h2 style="font-size:1.5rem;margin-bottom:var(--s2);">40+ Manual Hours a Week — and Errors That Surfaced Days Later</h2>
        <p style="color:var(--text-muted);line-height:1.9;">Their finance team was cross-referencing three payment processors, a Stripe account, and an internal CRM every single morning. By the time an error surfaced, it was already two days old. Scaling was impossible with this foundation.</p>
      </div>
      <div class="animate-on-scroll delay-2" style="background:var(--surface);border:1px solid var(--border);border-radius:var(--r-lg);padding:var(--s4);">
        <span class="eyebrow">Stack Used</span>
        <div style="display:flex;flex-wrap:wrap;gap:0.5rem;margin-top:var(--s2);"><span class="pill">Node.js</span><span class="pill">PostgreSQL</span><span class="pill">Redis</span><span class="pill">React Native</span><span class="pill">AWS Lambda</span><span class="pill">WebSockets</span></div>
        <div class="divider" style="margin:var(--s3) 0;"></div>
        <span class="eyebrow">Timeline</span>
        <p style="font-family:var(--font-mono);font-size:0.82rem;color:var(--text-muted);margin-top:var(--s1);">14 weeks · Discovery → Production</p>
      </div>
    </div>
    <span class="eyebrow animate-on-scroll">The Outcome</span>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:var(--s4);margin-top:var(--s3);">
      <div class="card animate-on-scroll delay-1" style="text-align:center;"><div class="stat-num">92%</div><div class="stat-label">Reconciliation Time Reduced</div></div>
      <div class="card animate-on-scroll delay-2" style="text-align:center;"><div class="stat-num">99.98%</div><div class="stat-label">Production Uptime</div></div>
      <div class="card animate-on-scroll delay-3" style="text-align:center;"><div class="stat-num">&lt;200ms</div><div class="stat-label">Real-Time Data Latency</div></div>
    </div>
    <div class="divider"></div>
    <h2 class="animate-on-scroll" style="margin-bottom:var(--s3);">What We Built</h2>
    <p style="color:var(--text-muted);line-height:1.9;" class="animate-on-scroll">A unified real-time dashboard that ingests webhooks from all payment processors simultaneously, normalises transaction data into a single schema, flags discrepancies automatically, and surfaces daily reconciliation reports with zero manual input. Anomaly alerts fire via Slack before the finance team arrives at their desks.</p>
    <div class="divider"></div>
    <div class="text-center animate-on-scroll"><a data-link="#contact" class="btn btn-primary btn-lg">Build Something Like This →</a><a data-link="#portfolio" class="btn btn-ghost btn-lg" style="margin-left:var(--s2);">← All Case Studies</a></div>
  </div></section>`;
}

function buildCS2() {
  return `
  <section class="about-hero dot-grid"><div class="container" style="max-width:820px;">
    <a data-link="#portfolio" class="btn btn-ghost btn-sm" style="margin-bottom:var(--s4);">← Back to Portfolio</a>
    <span class="eyebrow">Case Study · HealthTech · 20 Weeks</span>
    <h1>Patient Workflow Automation Suite</h1>
    <p>How we cut no-show rates from 35% to 9% and recovered $180K annually for a multi-location healthcare provider.</p>
  </div></section>
  <section class="section"><div class="container" style="max-width:820px;">
    <div class="divider"></div>
    <div class="grid-2" style="gap:var(--s6);margin-bottom:var(--s8);">
      <div class="animate-on-scroll">
        <span class="eyebrow">The Problem</span>
        <h2 style="font-size:1.5rem;margin-bottom:var(--s2);">35% No-Show Rate Was Burning $180K Annually</h2>
        <p style="color:var(--text-muted);line-height:1.9;">Staff manually called patients the day before. Confirmations lived in spreadsheets. Reminders went to wrong numbers. Each no-show was both lost revenue and a gap that could have served another patient.</p>
      </div>
      <div class="animate-on-scroll delay-2" style="background:var(--surface);border:1px solid var(--border);border-radius:var(--r-lg);padding:var(--s4);">
        <span class="eyebrow">Stack Used</span>
        <div style="display:flex;flex-wrap:wrap;gap:0.5rem;margin-top:var(--s2);"><span class="pill">Supabase</span><span class="pill">n8n</span><span class="pill">TypeScript</span><span class="pill">React Native</span><span class="pill">GCP</span><span class="pill">Twilio</span></div>
        <div class="divider" style="margin:var(--s3) 0;"></div>
        <span class="eyebrow">Timeline</span>
        <p style="font-family:var(--font-mono);font-size:0.82rem;color:var(--text-muted);margin-top:var(--s1);">20 weeks · Discovery → Production</p>
      </div>
    </div>
    <span class="eyebrow animate-on-scroll">The Outcome</span>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:var(--s4);margin-top:var(--s3);">
      <div class="card animate-on-scroll delay-1" style="text-align:center;"><div class="stat-num">9%</div><div class="stat-label">No-Show Rate (from 35%)</div></div>
      <div class="card animate-on-scroll delay-2" style="text-align:center;"><div class="stat-num">68%</div><div class="stat-label">Admin Time Saved</div></div>
      <div class="card animate-on-scroll delay-3" style="text-align:center;"><div class="stat-num">$180K</div><div class="stat-label">Annual Revenue Recovered</div></div>
    </div>
    <div class="divider"></div>
    <h2 class="animate-on-scroll" style="margin-bottom:var(--s3);">What We Built</h2>
    <p style="color:var(--text-muted);line-height:1.9;" class="animate-on-scroll">An intelligent patient engagement system using n8n orchestration, Twilio SMS/voice, and real-time Supabase triggers. Patients receive multi-step reminders at 72h, 24h, and 2h before their appointment. Confirmations update the scheduling system in real time. The system handles rescheduling, cancellations, and waitlist backfills automatically — no staff involvement required.</p>
    <div class="divider"></div>
    <div class="text-center animate-on-scroll"><a data-link="#contact" class="btn btn-primary btn-lg">Build Something Like This →</a><a data-link="#portfolio" class="btn btn-ghost btn-lg" style="margin-left:var(--s2);">← All Case Studies</a></div>
  </div></section>`;
}

function buildCS3() {
  return `
  <section class="about-hero dot-grid"><div class="container" style="max-width:820px;">
    <a data-link="#portfolio" class="btn btn-ghost btn-sm" style="margin-bottom:var(--s4);">← Back to Portfolio</a>
    <span class="eyebrow">Case Study · E-Commerce · 10 Weeks</span>
    <h1>AI-Powered Inventory Intelligence System</h1>
    <p>How we recovered $210K in inventory waste for an e-commerce brand using agentic AI that runs nightly with zero manual review.</p>
  </div></section>
  <section class="section"><div class="container" style="max-width:820px;">
    <div class="divider"></div>
    <div class="grid-2" style="gap:var(--s6);margin-bottom:var(--s8);">
      <div class="animate-on-scroll">
        <span class="eyebrow">The Problem</span>
        <h2 style="font-size:1.5rem;margin-bottom:var(--s2);">Over-Ordering Slow SKUs, Running Out of Fast-Moving Stock</h2>
        <p style="color:var(--text-muted);line-height:1.9;">Their buying team relied on gut instinct and monthly reports. Capital was tied up in slow-moving inventory while fast-moving products stocked out. The compounding cost of inaction was six figures per year.</p>
      </div>
      <div class="animate-on-scroll delay-2" style="background:var(--surface);border:1px solid var(--border);border-radius:var(--r-lg);padding:var(--s4);">
        <span class="eyebrow">Stack Used</span>
        <div style="display:flex;flex-wrap:wrap;gap:0.5rem;margin-top:var(--s2);"><span class="pill">Python</span><span class="pill">PostgreSQL</span><span class="pill">n8n</span><span class="pill">GraphQL</span><span class="pill">AWS</span><span class="pill">OpenAI API</span></div>
        <div class="divider" style="margin:var(--s3) 0;"></div>
        <span class="eyebrow">Timeline</span>
        <p style="font-family:var(--font-mono);font-size:0.82rem;color:var(--text-muted);margin-top:var(--s1);">10 weeks · Discovery → Production</p>
      </div>
    </div>
    <span class="eyebrow animate-on-scroll">The Outcome</span>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:var(--s4);margin-top:var(--s3);">
      <div class="card animate-on-scroll delay-1" style="text-align:center;"><div class="stat-num">$210K</div><div class="stat-label">Inventory Waste Recovered</div></div>
      <div class="card animate-on-scroll delay-2" style="text-align:center;"><div class="stat-num">94%</div><div class="stat-label">Decision Accuracy</div></div>
      <div class="card animate-on-scroll delay-3" style="text-align:center;"><div class="stat-num">0 hrs</div><div class="stat-label">Manual Review Weekly</div></div>
    </div>
    <div class="divider"></div>
    <h2 class="animate-on-scroll" style="margin-bottom:var(--s3);">What We Built</h2>
    <p style="color:var(--text-muted);line-height:1.9;" class="animate-on-scroll">A nightly agentic pipeline that ingests 30-day sales velocity per SKU, calculates days-of-stock remaining, classifies each item as REORDER_URGENT, MONITOR, or FLAG_OVERSTOCK, and sends structured purchase recommendations directly to the buying team's Slack. The system learns from purchasing outcomes and improves accuracy each cycle.</p>
    <div class="divider"></div>
    <div class="text-center animate-on-scroll"><a data-link="#contact" class="btn btn-primary btn-lg">Build Something Like This →</a><a data-link="#portfolio" class="btn btn-ghost btn-lg" style="margin-left:var(--s2);">← All Case Studies</a></div>
  </div></section>`;
}

function buildPost1() {
  return `
  <section class="blog-hero dot-grid"><div class="container" style="max-width:760px;">
    <a data-link="#blog" class="btn btn-ghost btn-sm" style="margin-bottom:var(--s4);">← Back to Insights</a>
    <div style="display:flex;flex-wrap:wrap;gap:0.5rem;margin-bottom:var(--s3);"><span class="pill">Architecture</span><span class="pill">SaaS</span><span class="pill">Tech Debt</span></div>
    <h1 style="font-size:clamp(1.8rem,4vw,2.8rem);">Why Your SaaS Architecture Decision at Week 1 Will Cost You at Year 2</h1>
    <div style="font-family:var(--font-mono);font-size:0.72rem;color:var(--text-dim);margin-top:var(--s3);display:flex;flex-wrap:wrap;gap:0.5rem;align-items:center;">
      <span>Sunil Sharma</span><span>·</span><span>Founder &amp; CTO</span><span>·</span><span>March 12, 2025</span><span>·</span><span>8 min read</span>
    </div>
  </div></section>
  <section class="section"><div class="container" style="max-width:760px;">
    <p style="color:var(--text-muted);font-size:1.05rem;line-height:1.9;border-left:3px solid var(--accent);padding-left:var(--s3);margin-bottom:var(--s6);">Most founders do not think about architecture as a financial decision. They think about it as a technical one. That is the first mistake.</p>
    <h2 style="margin-bottom:var(--s3);">Decision 1: Single-Tenant vs. Multi-Tenant</h2>
    <p style="color:var(--text-muted);line-height:1.9;">Building single-tenant first feels faster. One database schema, no row-level security complexity, no tenant isolation headaches. Most dev shops recommend it because it ships quicker — and they earn more on the rebuild. We do not recommend it, because we do not bill for refactors.</p>
    <p style="color:var(--text-muted);line-height:1.9;margin-top:var(--s2);">The cost of retrofitting multi-tenancy into a mature single-tenant system is typically 3–5x the original build cost. We have seen this exact scenario play out for clients who came to us after another agency. Build the tenant layer on day one. It costs 20–30% more upfront and saves you everything at year two.</p>
    <h2 style="margin-top:var(--s6);margin-bottom:var(--s3);">Decision 2: Unstructured Monolith vs. Domain Boundaries</h2>
    <p style="color:var(--text-muted);line-height:1.9;">We are not microservices evangelists. A well-structured monolith with clean domain boundaries is an excellent choice for most early SaaS products. What kills you is the unstructured monolith — where billing logic bleeds into authentication, and your database schema is a 300-table nightmare nobody can explain.</p>
    <p style="color:var(--text-muted);line-height:1.9;margin-top:var(--s2);">Enforce module boundaries from day one. Keep domains separated even inside a monolith. The extractability of a well-bounded monolith into services later is near-trivial. The refactoring of a spaghetti monolith is a six-month engineering sink.</p>
    <h2 style="margin-top:var(--s6);margin-bottom:var(--s3);">Decision 3: Async-First vs. Synchronous Everything</h2>
    <p style="color:var(--text-muted);line-height:1.9;">Every long-running operation you put in a synchronous request handler will eventually fail at scale. Email sends. Report generation. Third-party API calls with unpredictable latency. Build queue infrastructure from day one. It costs almost nothing to add early. It costs a full engineering sprint to retrofit later — usually after your first major production incident.</p>
    <div class="divider"></div>
    <p style="color:var(--text-muted);line-height:1.9;font-style:italic;">These three decisions are the ones we review in every Discovery Sprint. They are the architecture choices that determine whether your engineering team is shipping features in year two — or paying down debt.</p>
    <div style="margin-top:var(--s6);text-align:center;"><a data-link="#contact" class="btn btn-primary btn-lg">Talk Architecture With Us →</a></div>
  </div></section>`;
}

function buildPost2() {
  return `
  <section class="blog-hero dot-grid"><div class="container" style="max-width:760px;">
    <a data-link="#blog" class="btn btn-ghost btn-sm" style="margin-bottom:var(--s4);">← Back to Insights</a>
    <div style="display:flex;flex-wrap:wrap;gap:0.5rem;margin-bottom:var(--s3);"><span class="pill">Strategy</span><span class="pill">SaaS</span><span class="pill">ROI</span></div>
    <h1 style="font-size:clamp(1.8rem,4vw,2.8rem);">Build Custom vs. Buy Off-The-Shelf: The Framework We Use With Every Client</h1>
    <div style="font-family:var(--font-mono);font-size:0.72rem;color:var(--text-dim);margin-top:var(--s3);display:flex;flex-wrap:wrap;gap:0.5rem;align-items:center;">
      <span>Sunil Sharma</span><span>·</span><span>Founder &amp; CTO</span><span>·</span><span>Feb 3, 2025</span><span>·</span><span>6 min read</span>
    </div>
  </div></section>
  <section class="section"><div class="container" style="max-width:760px;">
    <p style="color:var(--text-muted);font-size:1.05rem;line-height:1.9;border-left:3px solid var(--accent);padding-left:var(--s3);margin-bottom:var(--s6);">Most agencies will build anything you pay them to build. We will tell you when not to build — and exactly when you absolutely should.</p>
    <h2 style="margin-bottom:var(--s3);">When to Buy Off-The-Shelf</h2>
    <p style="color:var(--text-muted);line-height:1.9;">If your process looks like every other business in your category, there is probably a SaaS tool that handles it well enough. CRM, basic HR, standard email marketing, generic payment processing — buy these. The compounding subscription costs are almost always cheaper than the engineering cost to build and maintain custom equivalents. The integration tax is lower. The maintenance burden is zero.</p>
    <h2 style="margin-top:var(--s6);margin-bottom:var(--s3);">When to Build Custom</h2>
    <p style="color:var(--text-muted);line-height:1.9;">Build when your process is your competitive advantage. When the way you do something is fundamentally different from your competitors — and no off-the-shelf tool will ever fit without compromising that edge.</p>
    <p style="color:var(--text-muted);line-height:1.9;margin-top:var(--s2);">Build when off-the-shelf integration tax has become a full-time job. When you have three developers maintaining Zapier automations and API wrappers because the vendor's data model does not match yours. Build when you need data ownership and portability that vendor platforms simply cannot give you — especially in regulated industries.</p>
    <h2 style="margin-top:var(--s6);margin-bottom:var(--s3);">The Three-Question Decision Matrix</h2>
    <div style="display:flex;flex-direction:column;gap:var(--s2);">
      <div class="card" style="display:flex;gap:var(--s2);align-items:flex-start;"><span style="color:var(--accent);font-family:var(--font-mono);font-size:0.8rem;flex-shrink:0;margin-top:2px;">01</span><p style="color:var(--text-muted);font-size:0.9rem;line-height:1.7;"><strong>Commodity or differentiator?</strong> If every competitor uses the same tools to do the same process, it is a commodity. If your process is part of your value proposition to customers, it is a differentiator worth building.</p></div>
      <div class="card" style="display:flex;gap:var(--s2);align-items:flex-start;"><span style="color:var(--accent);font-family:var(--font-mono);font-size:0.8rem;flex-shrink:0;margin-top:2px;">02</span><p style="color:var(--text-muted);font-size:0.9rem;line-height:1.7;"><strong>5-year cost comparison.</strong> SaaS subscription × seats × years vs. one-time build cost + maintenance. At scale, custom frequently wins — especially with seat-based pricing that punishes growth.</p></div>
      <div class="card" style="display:flex;gap:var(--s2);align-items:flex-start;"><span style="color:var(--accent);font-family:var(--font-mono);font-size:0.8rem;flex-shrink:0;margin-top:2px;">03</span><p style="color:var(--text-muted);font-size:0.9rem;line-height:1.7;"><strong>Vendor lock-in risk.</strong> What does it cost you if the vendor raises prices 40%? Changes your tier? Shuts down? For mission-critical processes, the lock-in risk alone often justifies building.</p></div>
    </div>
    <div style="margin-top:var(--s6);text-align:center;"><a data-link="#contact" class="btn btn-primary btn-lg">Get Our Honest Assessment →</a></div>
  </div></section>`;
}

function buildPost3() {
  return `
  <section class="blog-hero dot-grid"><div class="container" style="max-width:760px;">
    <a data-link="#blog" class="btn btn-ghost btn-sm" style="margin-bottom:var(--s4);">← Back to Insights</a>
    <div style="display:flex;flex-wrap:wrap;gap:0.5rem;margin-bottom:var(--s3);"><span class="pill">AI</span><span class="pill">Automation</span><span class="pill">Engineering</span></div>
    <h1 style="font-size:clamp(1.8rem,4vw,2.8rem);">Agentic AI Is Not a Feature — It Is a Business Model Shift</h1>
    <div style="font-family:var(--font-mono);font-size:0.72rem;color:var(--text-dim);margin-top:var(--s3);display:flex;flex-wrap:wrap;gap:0.5rem;align-items:center;">
      <span>Sunil Sharma</span><span>·</span><span>Founder &amp; CTO</span><span>·</span><span>Jan 15, 2025</span><span>·</span><span>10 min read</span>
    </div>
  </div></section>
  <section class="section"><div class="container" style="max-width:760px;">
    <p style="color:var(--text-muted);font-size:1.05rem;line-height:1.9;border-left:3px solid var(--accent);padding-left:var(--s3);margin-bottom:var(--s6);">Companies treating AI as a chatbot add-on are leaving the real value on the table. The businesses compounding fastest over the next five years are building agentic systems — not AI features.</p>
    <h2 style="margin-bottom:var(--s3);">The Difference Between AI Features and Agentic Systems</h2>
    <p style="color:var(--text-muted);line-height:1.9;">An AI feature adds a capability to an existing workflow. A chatbot on your support page. Autocomplete in your editor. Sentiment tagging on your tickets. These are useful. They are not transformative.</p>
    <p style="color:var(--text-muted);line-height:1.9;margin-top:var(--s2);">An agentic system replaces an entire workflow. It perceives inputs, decides what to do, takes actions, observes results, and adapts — without a human in the loop for routine decisions. The inventory intelligence system we built for our e-commerce client does not assist a buyer. It replaces a buyer for 94% of decisions.</p>
    <h2 style="margin-top:var(--s6);margin-bottom:var(--s3);">What This Means for Your Operational Costs</h2>
    <p style="color:var(--text-muted);line-height:1.9;">That is not a productivity gain. That is a structural cost reduction that compounds every single month. The healthcare automation system eliminates most appointment reminder calls entirely. The financial reconciliation system removes 40 hours of manual finance work every week.</p>
    <p style="color:var(--text-muted);line-height:1.9;margin-top:var(--s2);">Each of these is not a 10% efficiency improvement. Each is a 60–94% structural elimination of a cost centre. That is the difference between an AI feature and an agentic system.</p>
    <h2 style="margin-top:var(--s6);margin-bottom:var(--s3);">The Engineering Challenge Nobody Talks About</h2>
    <p style="color:var(--text-muted);line-height:1.9;">Building reliable agentic systems is genuinely hard. The LLM is the easy part. The hard part is the orchestration layer: handling failures, retries, state management across steps, human escalation paths, audit trails, rollback logic, and cost controls.</p>
    <p style="color:var(--text-muted);line-height:1.9;margin-top:var(--s2);">Most teams underestimate this orchestration layer by a factor of three. They build the happy path in a weekend and spend six months hardening it for production. We have built this infrastructure enough times that we know exactly where it fails — and we build the failure handling first.</p>
    <div style="margin-top:var(--s6);text-align:center;"><a data-link="#contact" class="btn btn-primary btn-lg">Let's Build Your Agentic System →</a></div>
  </div></section>`;
}

/* ══════════════════════════════════════════════════════
   PARTICLE CANVAS
══════════════════════════════════════════════════════ */
function initParticles() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles, raf;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function makeParticles(n) {
    return Array.from({ length: n }, () => ({
      x:  Math.random() * W,
      y:  Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r:  Math.random() * 1.5 + 0.5,
      a:  Math.random() * 0.6 + 0.2,
    }));
  }

  resize();
  particles = makeParticles(80);
  window.addEventListener('resize', debounce(() => { resize(); particles = makeParticles(80); }));

  const isDark = () => document.documentElement.getAttribute('data-theme') !== 'light';

  function draw() {
    ctx.clearRect(0, 0, W, H);
    const base = isDark() ? '107,186,236' : '42,80,158';

    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${base},${p.a * 0.5})`;
      ctx.fill();
    });

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < 110) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(${base},${(1 - d / 110) * 0.1})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    raf = requestAnimationFrame(draw);
  }

  draw();

  new IntersectionObserver(([e]) => {
    if (e.isIntersecting) { if (!raf) draw(); }
    else { cancelAnimationFrame(raf); raf = null; }
  }, { threshold: 0 }).observe(canvas);
}

/* ══════════════════════════════════════════════════════
   CURSOR GLOW
══════════════════════════════════════════════════════ */
function initCursorGlow() {
  const glow = document.getElementById('cursor-glow');
  if (!glow || window.matchMedia('(pointer:coarse)').matches) return;

  let mx = 0, my = 0, cx = 0, cy = 0, shown = false;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    if (!shown) { glow.style.opacity = '1'; shown = true; }
  });
  document.addEventListener('mouseleave', () => { glow.style.opacity = '0'; shown = false; });

  (function loop() {
    cx += (mx - cx) * 0.08; cy += (my - cy) * 0.08;
    glow.style.left = cx + 'px'; glow.style.top = cy + 'px';
    requestAnimationFrame(loop);
  })();
}

/* ══════════════════════════════════════════════════════
   THEME
══════════════════════════════════════════════════════ */
function initTheme() {
  const saved = localStorage.getItem('xuneel-theme') || 'dark';
  applyTheme(saved);
  document.getElementById('theme-btn')?.addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    applyTheme(next);
    localStorage.setItem('xuneel-theme', next);
  });
}

function applyTheme(t) {
  document.documentElement.setAttribute('data-theme', t === 'light' ? 'light' : '');
  setTimeout(refreshRanges, 50);
}

/* ══════════════════════════════════════════════════════
   NAV SCROLL
══════════════════════════════════════════════════════ */
function initNav() {
  const nav  = document.getElementById('nav');
  const prog = document.getElementById('scroll-progress');
  const btt  = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    nav?.classList.toggle('scrolled', window.scrollY > 20);
    const tot = document.documentElement.scrollHeight - window.innerHeight;
    if (prog && tot > 0) prog.style.width = (window.scrollY / tot * 100) + '%';
    btt?.classList.toggle('show', window.scrollY > 400);
  }, { passive: true });
}

/* ══════════════════════════════════════════════════════
   MOBILE NAV
══════════════════════════════════════════════════════ */
function initMobileNav() {
  const ham = document.getElementById('hamburger');
  const mob = document.getElementById('mobile-nav');

  ham?.addEventListener('click', () => {
    const open = !mob.classList.contains('open');
    mob.classList.toggle('open', open);
    ham.classList.toggle('open', open);
    ham.setAttribute('aria-expanded', open);
  });

  document.addEventListener('click', e => {
    if (!ham?.contains(e.target) && !mob?.contains(e.target)) closeMobileMenu();
  });
}

function closeMobileMenu() {
  document.getElementById('mobile-nav')?.classList.remove('open');
  const h = document.getElementById('hamburger');
  if (h) { h.classList.remove('open'); h.setAttribute('aria-expanded', 'false'); }
}

/* ══════════════════════════════════════════════════════
   SCROLL ANIMATIONS
══════════════════════════════════════════════════════ */
function initScrollAnimations() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('visible');
      $$('[data-count]', e.target).forEach(animateCount);
      if (e.target.hasAttribute('data-count')) animateCount(e.target);
      io.unobserve(e.target);
    });
  }, { threshold: 0.12 });

  $$('.animate-on-scroll:not(.visible)').forEach(el => io.observe(el));

  // Also watch .stat-num directly
  const sio = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      $$('.stat-num[data-count]', e.target).forEach(animateCount);
      sio.unobserve(e.target);
    });
  }, { threshold: 0.3 });
  $$('.stats-band').forEach(el => sio.observe(el));
}

function animateCount(el) {
  if (el.dataset.animated) return;
  el.dataset.animated = '1';
  const target = parseFloat(el.dataset.count);
  const pre    = el.dataset.prefix  || '';
  const suf    = el.dataset.suffix  || '';
  const dur    = 1800;
  const t0     = performance.now();
  const float  = !Number.isInteger(target);

  (function tick(now) {
    const p   = Math.min((now - t0) / dur, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    el.textContent = pre + (float ? (target * ease).toFixed(2) : Math.round(target * ease)) + suf;
    if (p < 1) requestAnimationFrame(tick);
  })(performance.now());
}

/* ══════════════════════════════════════════════════════
   TICKER
══════════════════════════════════════════════════════ */
function initTicker() {
  const txt   = document.getElementById('ticker-text');
  const count = document.getElementById('ticker-count');
  if (!txt) return;
  txt.style.transition = 'opacity 0.3s ease';
  txt.textContent  = TICKER_MESSAGES[0];
  count.textContent = `[1/${TICKER_MESSAGES.length}]`;

  clearInterval(tickerInterval);
  tickerInterval = setInterval(() => {
    txt.style.opacity = '0';
    setTimeout(() => {
      tickerIdx = (tickerIdx + 1) % TICKER_MESSAGES.length;
      txt.textContent   = TICKER_MESSAGES[tickerIdx];
      count.textContent = `[${tickerIdx + 1}/${TICKER_MESSAGES.length}]`;
      txt.style.opacity = '1';
    }, 300);
  }, 4200);
}

/* ══════════════════════════════════════════════════════
   ROI CALCULATOR
══════════════════════════════════════════════════════ */
function initROICalc(sfx) {
  const hEl = document.getElementById('roi-hours'  + sfx);
  const rEl = document.getElementById('roi-rate'   + sfx);
  const sEl = document.getElementById('roi-saving' + sfx);
  if (!hEl) return;

  function calc() {
    const h = +hEl.value, r = +rEl.value, s = +sEl.value;
    const savedH  = Math.round(h * s / 100);
    const weekly  = savedH * r;
    const annual  = weekly * 52;
    const payback = weekly > 0 ? Math.round(25000 / (weekly * 4)) : 0;

    const q = id => document.getElementById(id + sfx);
    const set = (id, v) => { const el = q(id); if (el) el.textContent = v; };

    set('roi-out-hours',   savedH + ' hrs');
    set('roi-out-weekly',  '$' + weekly.toLocaleString());
    set('roi-out-annual',  '$' + annual.toLocaleString());
    set('roi-out-payback', payback + ' mo');
    set('roi-hours-val',   h + ' hrs');
    set('roi-rate-val',    '$' + r);
    set('roi-saving-val',  s + '%');

    setRange(hEl, 1,  80);
    setRange(rEl, 25, 200);
    setRange(sEl, 30, 95);
  }

  [hEl, rEl, sEl].forEach(el => el.addEventListener('input', calc));
  calc();
}

function setRange(el, min, max) {
  if (!el) return;
  el.style.setProperty('--pct', ((el.value - min) / (max - min) * 100) + '%');
}

function refreshRanges() {
  [['roi-hours','',1,80],['roi-rate','',25,200],['roi-saving','',30,95],
   ['roi-hours','2',1,80],['roi-rate','2',25,200],['roi-saving','2',30,95]]
  .forEach(([id, sfx, mn, mx]) => setRange(document.getElementById(id + sfx), mn, mx));
}

/* ══════════════════════════════════════════════════════
   CAROUSEL
══════════════════════════════════════════════════════ */
function initCarousel() {
  const track  = $('.carousel-track');
  const dotsEl = $('.carousel-dots');
  if (!track) return;

  const cards = $$('.testimonial-card', track);
  carouselTotal = cards.length;
  carouselIndex = 0;

  if (dotsEl) {
    dotsEl.innerHTML = '';
    cards.forEach((_, i) => {
      const d = document.createElement('button');
      d.className = 'carousel-dot' + (i === 0 ? ' active' : '');
      d.setAttribute('aria-label', `Testimonial ${i + 1}`);
      d.addEventListener('click', () => go(i));
      dotsEl.appendChild(d);
    });
  }

  function go(idx) {
    carouselIndex = Math.max(0, Math.min(idx, carouselTotal - 1));
    const w = (cards[0]?.offsetWidth || 0) + 16;
    track.style.transform = `translateX(-${carouselIndex * w}px)`;
    $$('.carousel-dot', dotsEl).forEach((d, i) => d.classList.toggle('active', i === carouselIndex));
  }

  document.getElementById('prev-btn')?.addEventListener('click', () => go(carouselIndex - 1));
  document.getElementById('next-btn')?.addEventListener('click', () => go(carouselIndex + 1));

  let auto = setInterval(() => go((carouselIndex + 1) % carouselTotal), 5500);
  track.addEventListener('mouseenter', () => clearInterval(auto));
  track.addEventListener('mouseleave', () => { auto = setInterval(() => go((carouselIndex + 1) % carouselTotal), 5500); });

  let sx = 0;
  track.addEventListener('touchstart', e => { sx = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend',   e => {
    const dx = e.changedTouches[0].clientX - sx;
    if (Math.abs(dx) > 50) go(dx < 0 ? carouselIndex + 1 : carouselIndex - 1);
  });
}

/* ══════════════════════════════════════════════════════
   FAQ
══════════════════════════════════════════════════════ */
function initFAQ() {
  document.addEventListener('click', e => {
    const q = e.target.closest('.faq-q');
    if (!q) return;
    const item = q.closest('.faq-item');
    const wasOpen = item.classList.contains('open');
    $$('.faq-item.open').forEach(i => i.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
  });
}

/* ══════════════════════════════════════════════════════
   PORTFOLIO FILTERS
══════════════════════════════════════════════════════ */
function initPortfolioFilters() {
  document.addEventListener('click', e => {
    const btn = e.target.closest('[data-filter]');
    if (!btn) return;
    const f = btn.getAttribute('data-filter');
    $$('[data-filter]').forEach(b => b.classList.remove('pill-solid'));
    btn.classList.add('pill-solid');
    $$('.portfolio-card[data-tags]').forEach(c => {
      const show = f === 'all' || c.dataset.tags.includes(f);
      c.style.opacity      = show ? '1' : '0.25';
      c.style.transform    = show ? '' : 'scale(0.97)';
      c.style.pointerEvents = show ? 'auto' : 'none';
      c.style.transition   = 'all 0.3s ease';
    });
  });
}

/* ══════════════════════════════════════════════════════
   CONTACT FORM
══════════════════════════════════════════════════════ */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const succ = document.getElementById('form-success');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;

    $$('.form-error', form).forEach(el => { el.classList.remove('show'); el.textContent = ''; });
    $$('input,textarea,select', form).forEach(el => el.classList.remove('error'));

    const name  = form.querySelector('#cf-name');
    const email = form.querySelector('#cf-email');
    const msg   = form.querySelector('#cf-message');
    const bgt   = form.querySelector('#cf-budget');

    if (!name?.value.trim())            { showErr(name,  'Please enter your name.');               valid = false; }
    if (!validEmail(email?.value))      { showErr(email, 'Enter a valid email address.');          valid = false; }
    if ((msg?.value.trim().length||0) < 20) { showErr(msg, 'Describe your project (20+ chars).'); valid = false; }
    if (!bgt?.value)                    { showErr(bgt,   'Select a budget range.');                valid = false; }
    if (!valid) return;

    const btn = form.querySelector('button[type="submit"]');
    btn.classList.add('btn-loading'); btn.disabled = true;
    setTimeout(() => { form.style.display = 'none'; if (succ) succ.style.display = 'block'; }, 1200);
  });
}

function showErr(el, msg) {
  if (!el) return;
  el.classList.add('error');
  const err = el.nextElementSibling;
  if (err?.classList.contains('form-error')) { err.textContent = msg; err.classList.add('show'); }
}

function validEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v || ''); }

/* ══════════════════════════════════════════════════════
   PORTAL FORM
══════════════════════════════════════════════════════ */
function initPortalForm() {
  const form = document.getElementById('portal-form');
  const succ = document.getElementById('portal-success');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const email = form.querySelector('#portal-email');
    if (!validEmail(email?.value)) { email?.classList.add('error'); return; }
    const btn = form.querySelector('button');
    btn.classList.add('btn-loading'); btn.disabled = true;
    setTimeout(() => { form.style.display = 'none'; if (succ) succ.style.display = 'block'; }, 1000);
  });
}

/* ══════════════════════════════════════════════════════
   COOKIE BANNER
══════════════════════════════════════════════════════ */
function initCookieBanner() {
  const banner = document.getElementById('cookie-banner');
  if (!banner) return;
  if (localStorage.getItem('xuneel-cookies')) { banner.classList.add('hidden'); return; }

  const hide = () => banner.classList.add('hidden');
  document.getElementById('accept-cookies')?.addEventListener('click', () => { localStorage.setItem('xuneel-cookies', '1'); hide(); });
  document.getElementById('reject-cookies')?.addEventListener('click', () => { localStorage.setItem('xuneel-cookies', '0'); hide(); });
  document.getElementById('close-cookie')?.addEventListener('click',   hide);
}

/* ══════════════════════════════════════════════════════
   CLOCKS
══════════════════════════════════════════════════════ */
function updateClocks() {
  const fmt = tz => {
    try {
      return new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', timeZone: tz, hour12: true });
    } catch { return '--:--'; }
  };

  const set = (id, tz) => { const el = document.getElementById(id); if (el) el.textContent = fmt(tz); };
  set('clock-ist', 'Asia/Kolkata');
  set('clock-sgt', 'Asia/Singapore');
  set('clock-est', 'America/New_York');

  $$('.tz-time[data-tz]').forEach(el => { el.textContent = fmt(el.dataset.tz); });
}

/* ══════════════════════════════════════════════════════
   GITHUB FEED
══════════════════════════════════════════════════════ */
async function loadGitHub() {
  const el = document.getElementById('github-feed');
  if (!el) return;
  try {
    const res = await fetch(`https://api.github.com/users/${GITHUB_USER}/events/public?per_page=8`, {
      headers: { Accept: 'application/vnd.github+json' }
    });
    if (!res.ok) throw new Error();
    const events = await res.json();
    const map = { PushEvent: '⬆ PUSH', CreateEvent: '✦ CREATE', WatchEvent: '★ STAR', ForkEvent: '⑂ FORK', IssuesEvent: '◉ ISSUE' };
    const html = events
      .filter(ev => map[ev.type])
      .slice(0, 4)
      .map(ev => {
        const label = map[ev.type];
        const repo  = (ev.repo?.name || '').replace(GITHUB_USER + '/', '') || 'repository';
        const age   = relTime(new Date(ev.created_at));
        return `<div class="gh-item"><span class="gh-type">${label}</span><span>${repo}</span><span class="gh-repo">${age}</span></div>`;
      }).join('');
    el.innerHTML = html || `<div class="gh-item">Visit <a href="https://github.com/${GITHUB_USER}" target="_blank" rel="noopener">github.com/${GITHUB_USER}</a> for latest activity.</div>`;
  } catch {
    el.innerHTML = `<div class="gh-item">Visit <a href="https://github.com/${GITHUB_USER}" target="_blank" rel="noopener">github.com/${GITHUB_USER}</a></div>`;
  }
}

function relTime(d) {
  const s = (Date.now() - d) / 1000;
  if (s < 60)    return 'just now';
  if (s < 3600)  return Math.floor(s / 60) + 'm ago';
  if (s < 86400) return Math.floor(s / 3600) + 'h ago';
  return Math.floor(s / 86400) + 'd ago';
}

/* ══════════════════════════════════════════════════════
   TILT EFFECT
══════════════════════════════════════════════════════ */
function initTilt() {
  if (window.matchMedia('(pointer:coarse)').matches) return;

  document.addEventListener('mousemove', e => {
    $$('[data-tilt]').forEach(card => {
      const r  = card.getBoundingClientRect();
      const dx = (e.clientX - r.left - r.width / 2)  / (r.width / 2);
      const dy = (e.clientY - r.top  - r.height / 2) / (r.height / 2);
      if (Math.abs(dx) <= 1.2 && Math.abs(dy) <= 1.2) {
        card.style.transform = `perspective(900px) rotateY(${dx*5}deg) rotateX(${-dy*5}deg) translateY(-4px)`;
      }
    });
  });

  $$('[data-tilt]').forEach(c => {
    c.addEventListener('mouseleave', () => { c.style.transform = ''; });
  });
}

/* ══════════════════════════════════════════════════════
   KEYBOARD
══════════════════════════════════════════════════════ */
function initKeyboard() {
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMobileMenu();
  });
}

/* ══════════════════════════════════════════════════════
   INJECT PERSISTENT UI ELEMENTS
══════════════════════════════════════════════════════ */
function injectUI() {
  if (!document.getElementById('scroll-progress')) {
    const el = Object.assign(document.createElement('div'), { id: 'scroll-progress' });
    document.body.prepend(el);
  }
  if (!document.getElementById('back-to-top')) {
    const el = document.createElement('button');
    el.id = 'back-to-top';
    el.setAttribute('aria-label', 'Back to top');
    el.innerHTML = `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" width="16" height="16"><path stroke-linecap="round" stroke-linejoin="round" d="M8 12V4m-4 4 4-4 4 4"/></svg>`;
    el.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    document.body.appendChild(el);
  }
}

/* ══════════════════════════════════════════════════════
   BOOT
══════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {

  injectUI();
  attachLinks();
  initTheme();
  initNav();
  initMobileNav();
  initParticles();
  initCursorGlow();
  initTicker();
  initROICalc('');
  initCarousel();
  initFAQ();
  initPortfolioFilters();
  initContactForm();
  initPortalForm();
  initCookieBanner();
  initScrollAnimations();
  initTilt();
  initKeyboard();

  updateClocks();
  setInterval(updateClocks, 10000);
  loadGitHub();

  // Initial route
  navigateTo(window.location.hash || '#home');

  // Browser back / forward
  window.addEventListener('popstate', () => navigateTo(window.location.hash || '#home'));

});
