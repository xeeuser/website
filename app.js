/**
 * ==========================================================================
 * XUNEEL SERVICES - ENTERPRISE APP.JS
 * CHUNK 1 OF 8: Core Architecture & SPA Routing Engine
 * ==========================================================================
 */

/**
 * Global App Namespace to prevent variable pollution
 * @namespace XuneelApp
 */
const XuneelApp = (function () {
  'use strict';

  // Core Configuration
  const config = {
    defaultPage: 'home',
    pageClass: '.page',
    linkSelector: '[data-link]',
    activeClass: 'active',
    animationDuration: 400 // Matches CSS fade transition
  };

  // State Container
  const state = {
    currentPage: null,
    isNavigating: false
  };

  /**
   * Application Router Module
   * Handles seamless transitions between virtual pages based on ID matching.
   */
  const Router = {
    /**
     * Initializes the routing engine.
     */
    init() {
      this.cacheDOM();
      this.bindEvents();
      this.handleInitialRoute();
    },

    cacheDOM() {
      this.pages = Array.from(document.querySelectorAll(config.pageClass));
      this.navLinks = Array.from(document.querySelectorAll(config.linkSelector));
    },

    bindEvents() {
      // Listen to all internal routing links
      this.navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const targetHash = link.getAttribute('data-link').replace('#', '');
          this.navigate(targetHash);
        });
      });

      // Handle browser back/forward buttons
      window.addEventListener('hashchange', () => {
        const hash = window.location.hash.replace('#', '');
        this.navigate(hash || config.defaultPage, false);
      });
    },

    /**
     * Executes the page transition
     * @param {string} targetId - The ID of the page to load (e.g., 'about')
     * @param {boolean} updateHistory - Whether to push to browser history
     */
    navigate(targetPath, updateHistory = true) {
      if (state.isNavigating) return;

      // Handle nested routes (e.g., services/mobile -> page-services-mobile)
      const targetId = `page-${targetPath.replace(/\//g, '-')}`;
      const targetPage = document.getElementById(targetId);

      if (!targetPage) {
        console.warn(`[Router] Route not found: ${targetId}. Redirecting to home.`);
        this.navigate(config.defaultPage);
        return;
      }

      if (state.currentPage === targetPage) return;

      state.isNavigating = true;

      // 1. Fade out current page
      if (state.currentPage) {
        state.currentPage.classList.remove(config.activeClass);
        // Wait for CSS transition to finish before hiding
        setTimeout(() => {
          this.showNewPage(targetPage, targetPath, updateHistory);
        }, config.animationDuration);
      } else {
        // Initial load
        this.showNewPage(targetPage, targetPath, updateHistory);
      }
    },

    /**
     * Displays the new page and updates states
     */
    showNewPage(targetPage, targetPath, updateHistory) {
      // Hide all pages to be safe
      this.pages.forEach(p => p.classList.remove(config.activeClass));
      
      // Show new page
      targetPage.classList.add(config.activeClass);
      state.currentPage = targetPage;

      // Update URL and History
      if (updateHistory) {
        window.history.pushState({ page: targetPath }, '', `#${targetPath}`);
      }

      // Update Navigation Highlights
      this.updateActiveLinks(targetPath);

      // Scroll to top of the new page
      window.scrollTo({ top: 0, behavior: 'instant' });

      // Trigger custom event for other modules (like scroll reveal) to re-init
      window.dispatchEvent(new CustomEvent('xuneel:pageChanged', { 
        detail: { page: targetPath } 
      }));

      state.isNavigating = false;
    },

    /**
     * Updates active states on navigation links
     */
    updateActiveLinks(currentPath) {
      // Extract base path for main nav highlighting (e.g., 'services/mobile' -> 'services')
      const basePath = currentPath.split('/')[0];

      this.navLinks.forEach(link => {
        link.classList.remove(config.activeClass);
        const linkTarget = link.getAttribute('data-nav') || link.getAttribute('data-link');
        if (linkTarget === `#${basePath}` || linkTarget === `#${currentPath}`) {
          link.classList.add(config.activeClass);
        }
      });
    },

    /**
     * Determines which page to show on initial page load
     */
    handleInitialRoute() {
      const hash = window.location.hash.replace('#', '');
      this.navigate(hash || config.defaultPage, false);
    }
  };

  // Expose initialization method
  return {
    init: () => {
      console.log('Xuneel Services App Initialized');
      Router.init();
    }
  };

})();

// Initialize the core when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  XuneelApp.init();
});

/* --- END OF CHUNK 1 --- */
/**
 * ==========================================================================
 * XUNEEL SERVICES - ENTERPRISE APP.JS
 * CHUNK 2 OF 8: State Management & Theme Engine
 * ==========================================================================
 */

(function() {
  'use strict';

  /**
   * Theme Engine Module
   * Manages Light/Dark mode, system preference detection, and persistence.
   */
  const ThemeEngine = {
    config: {
      btnId: 'theme-btn',
      storageKey: 'xuneel-theme',
      lightThemeAttr: 'light',
      darkThemeAttr: 'dark' // Default in our CSS is dark, so absence of attr = dark
    },

    state: {
      currentTheme: 'dark'
    },

    init() {
      this.themeBtn = document.getElementById(this.config.btnId);
      this.htmlEl = document.documentElement;

      this.determineInitialTheme();
      this.bindEvents();
    },

    /**
     * Determines theme based on localStorage or OS-level preference.
     */
    determineInitialTheme() {
      const savedTheme = localStorage.getItem(this.config.storageKey);
      
      if (savedTheme) {
        this.setTheme(savedTheme, false);
      } else {
        // Check system preference if no explicit choice was saved
        const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
        this.setTheme(prefersLight ? this.config.lightThemeAttr : this.config.darkThemeAttr, false);
      }
    },

    bindEvents() {
      if (this.themeBtn) {
        // Accessibility: Allow keyboard triggering
        this.themeBtn.addEventListener('click', () => this.toggleTheme());
        this.themeBtn.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.toggleTheme();
          }
        });
      }

      // Listen for OS-level theme changes in real-time
      if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
          // Only auto-switch if the user hasn't explicitly saved a preference
          if (!localStorage.getItem(this.config.storageKey)) {
            this.setTheme(e.matches ? this.config.lightThemeAttr : this.config.darkThemeAttr, false);
          }
        });
      }
    },

    /**
     * Applies the theme to the DOM and updates the UI toggle button.
     * @param {string} theme - 'light' or 'dark'
     * @param {boolean} save - Whether to save to localStorage
     */
    setTheme(theme, save = true) {
      this.state.currentTheme = theme;
      
      if (theme === this.config.lightThemeAttr) {
        this.htmlEl.setAttribute('data-theme', this.config.lightThemeAttr);
        if (this.themeBtn) {
          this.themeBtn.innerText = '🌙'; 
          this.themeBtn.setAttribute('aria-label', 'Switch to dark mode');
        }
      } else {
        this.htmlEl.removeAttribute('data-theme'); // Removing attr reverts to our default CSS dark mode
        if (this.themeBtn) {
          this.themeBtn.innerText = '☀️'; 
          this.themeBtn.setAttribute('aria-label', 'Switch to light mode');
        }
      }

      if (save) {
        localStorage.setItem(this.config.storageKey, theme);
      }

      // Dispatch event for other modules (e.g., if you add canvas/charts later)
      window.dispatchEvent(new CustomEvent('xuneel:themeChanged', { 
        detail: { theme: this.state.currentTheme } 
      }));
    },

    toggleTheme() {
      const newTheme = this.state.currentTheme === this.config.lightThemeAttr 
        ? this.config.darkThemeAttr 
        : this.config.lightThemeAttr;
        
      this.setTheme(newTheme, true);
    }
  };

  // Initialize when DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    ThemeEngine.init();
  });

})();

/* --- END OF CHUNK 2 --- */
/**
 * ==========================================================================
 * XUNEEL SERVICES - ENTERPRISE APP.JS
 * CHUNK 3 OF 8: Scroll & Intersection Observer Engine
 * ==========================================================================
 */

(function() {
  'use strict';

  /**
   * ScrollEngine Module
   * Manages hardware-accelerated scroll reveals and sticky navigation states.
   */
  const ScrollEngine = {
    config: {
      navId: 'nav',
      scrolledClass: 'scrolled',
      scrollThreshold: 50,
      animationTargetClass: '.animate-on-scroll',
      visibleClass: 'is-visible'
    },

    init() {
      this.nav = document.getElementById(this.config.navId);
      this.initNavScroll();
      this.initRevealObserver();
      this.bindEvents();
    },

    /**
     * Handles the sticky navigation glassmorphism effect optimally via rAF
     */
    initNavScroll() {
      if (!this.nav) return;

      let ticking = false;

      const updateNavState = () => {
        if (window.scrollY > this.config.scrollThreshold) {
          this.nav.classList.add(this.config.scrolledClass);
        } else {
          this.nav.classList.remove(this.config.scrolledClass);
        }
        ticking = false;
      };

      // Passive listener for silky smooth scrolling performance
      window.addEventListener('scroll', () => {
        if (!ticking) {
          window.requestAnimationFrame(updateNavState);
          ticking = true;
        }
      }, { passive: true });

      // Trigger once on load to catch initial state
      updateNavState();
    },

    /**
     * High-performance Intersection Observer for 3D scroll reveals
     */
    initRevealObserver() {
      const options = {
        root: null,
        rootMargin: '0px 0px -10% 0px', // Triggers slightly before the element hits the bottom
        threshold: 0.1 // Triggers when 10% of the element is visible
      };

      this.observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add(this.config.visibleClass);
            // Stop observing once animated to prevent re-triggering and save CPU
            observer.unobserve(entry.target);
          }
        });
      }, options);

      this.observeElements();
    },

    /**
     * Finds and observes all animatable elements
     */
    observeElements() {
      if (!this.observer) return;
      
      const elements = document.querySelectorAll(this.config.animationTargetClass);
      elements.forEach(el => {
        // Reset state for SPA navigation re-renders
        el.classList.remove(this.config.visibleClass);
        this.observer.observe(el);
      });
    },

    bindEvents() {
      // Hook into our custom Router event from Chunk 1 to re-observe elements on new pages
      window.addEventListener('xuneel:pageChanged', () => {
        // Small delay to ensure the DOM has fully rendered the new active page
        setTimeout(() => {
          this.observeElements();
          
          // Re-check nav state in case the new page is shorter
          if (this.nav) {
             if (window.scrollY <= this.config.scrollThreshold) {
                this.nav.classList.remove(this.config.scrolledClass);
             }
          }
        }, 50);
      });
    }
  };

  // Initialize when DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    ScrollEngine.init();
  });

})();

/* --- END OF CHUNK 3 --- */
/**
 * ==========================================================================
 * XUNEEL SERVICES - ENTERPRISE APP.JS
 * CHUNK 4 OF 8: Navigation & Mobile Menu Controller
 * ==========================================================================
 */

(function() {
  'use strict';

  /**
   * NavigationController Module
   * Manages mobile menu state, accessibility (ARIA), and scroll locking.
   */
  const NavigationController = {
    config: {
      hamburgerId: 'hamburger',
      mobileNavId: 'mobile-nav',
      activeClass: 'open',
      desktopBreakpoint: 900 // Matches CSS media query
    },

    state: {
      isOpen: false
    },

    init() {
      this.hamburger = document.getElementById(this.config.hamburgerId);
      this.mobileNav = document.getElementById(this.config.mobileNavId);
      
      if (!this.hamburger || !this.mobileNav) {
        console.warn('[NavigationController] Missing required DOM elements.');
        return;
      }

      this.mobileLinks = this.mobileNav.querySelectorAll('a, button');
      this.bindEvents();
    },

    bindEvents() {
      // Toggle menu on click
      this.hamburger.addEventListener('click', () => this.toggleMenu());

      // Close menu when a link is clicked
      this.mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
          if (this.state.isOpen) this.closeMenu();
        });
      });

      // Accessibility: Close on Escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.state.isOpen) {
          this.closeMenu();
          this.hamburger.focus(); // Return focus to button
        }
      });

      // Edge case: User rotates device or resizes window past mobile breakpoint
      window.addEventListener('resize', () => {
        if (this.state.isOpen && window.innerWidth >= this.config.desktopBreakpoint) {
          this.closeMenu();
        }
      });

      // Hook into SPA router: Ensure menu is closed after navigation
      window.addEventListener('xuneel:pageChanged', () => {
        if (this.state.isOpen) this.closeMenu();
      });
    },

    toggleMenu() {
      this.state.isOpen ? this.closeMenu() : this.openMenu();
    },

    openMenu() {
      this.state.isOpen = true;
      this.hamburger.classList.add(this.config.activeClass);
      this.mobileNav.classList.add(this.config.activeClass);
      
      // Accessibility updates
      this.hamburger.setAttribute('aria-expanded', 'true');
      
      // Lock background scrolling
      document.body.style.overflow = 'hidden';
    },

    closeMenu() {
      this.state.isOpen = false;
      this.hamburger.classList.remove(this.config.activeClass);
      this.mobileNav.classList.remove(this.config.activeClass);
      
      // Accessibility updates
      this.hamburger.setAttribute('aria-expanded', 'false');
      
      // Restore background scrolling
      document.body.style.overflow = '';
    }
  };

  // Initialize when DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    NavigationController.init();
  });

})();

/* --- END OF CHUNK 4 --- */
/**
 * ==========================================================================
 * XUNEEL SERVICES - ENTERPRISE APP.JS
 * CHUNK 5 OF 8: Dynamic ROI Calculator Engine
 * ==========================================================================
 */

(function() {
  'use strict';

  /**
   * ROICalculator Module
   * Processes live inputs to calculate and format Return on Investment metrics.
   */
  const ROICalculator = {
    // DOM Element IDs mapped from index.html
    config: {
      inputs: {
        hours: 'roi-hours',
        rate: 'roi-rate',
        saving: 'roi-saving'
      },
      labels: {
        hours: 'roi-hours-val',
        rate: 'roi-rate-val',
        saving: 'roi-saving-val'
      },
      outputs: {
        hours: 'roi-out-hours',
        weekly: 'roi-out-weekly',
        annual: 'roi-out-annual',
        payback: 'roi-out-payback'
      }
    },

    elements: {},

    init() {
      if (!this.cacheDOM()) {
        // Silently exit if calculator isn't on the current page
        return; 
      }
      this.bindEvents();
      this.calculate(); // Run initial calculation on load
    },

    /**
     * Safely caches DOM elements and verifies calculator existence
     * @returns {boolean} True if calculator elements exist
     */
    cacheDOM() {
      const getEl = (id) => document.getElementById(id);
      
      this.elements = {
        inHours: getEl(this.config.inputs.hours),
        inRate: getEl(this.config.inputs.rate),
        inSaving: getEl(this.config.inputs.saving),
        
        lblHours: getEl(this.config.labels.hours),
        lblRate: getEl(this.config.labels.rate),
        lblSaving: getEl(this.config.labels.saving),
        
        outHours: getEl(this.config.outputs.hours),
        outWeekly: getEl(this.config.outputs.weekly),
        outAnnual: getEl(this.config.outputs.annual),
        outPayback: getEl(this.config.outputs.payback)
      };

      // Check if primary inputs exist before proceeding
      return !!(this.elements.inHours && this.elements.inRate && this.elements.inSaving);
    },

    bindEvents() {
      // Listen to real-time 'input' events (not 'change' which waits for release)
      const inputs = [this.elements.inHours, this.elements.inRate, this.elements.inSaving];
      inputs.forEach(input => {
        input.addEventListener('input', () => this.calculate());
      });

      // Hook into SPA router to re-init if navigating back to the page
      window.addEventListener('xuneel:pageChanged', () => {
        if (this.cacheDOM()) this.calculate();
      });
    },

    /**
     * Core math logic and DOM updating
     */
    calculate() {
      // 1. Parse Inputs
      const hours = parseFloat(this.elements.inHours.value) || 0;
      const rate = parseFloat(this.elements.inRate.value) || 0;
      const savingPercent = parseFloat(this.elements.inSaving.value) || 0;
      const savingDecimal = savingPercent / 100;

      // 2. Update Input Labels (The text next to the slider)
      if (this.elements.lblHours) this.elements.lblHours.innerText = hours;
      if (this.elements.lblRate) this.elements.lblRate.innerText = `$${rate}`;
      if (this.elements.lblSaving) this.elements.lblSaving.innerText = `${savingPercent}%`;

      // 3. Perform Calculations
      const savedHoursWeekly = hours * savingDecimal;
      const savedMoneyWeekly = savedHoursWeekly * rate;
      const savedMoneyAnnual = savedMoneyWeekly * 52;

      // 4. Determine Dynamic Payback Period
      let paybackText = '1 mo';
      if (savedMoneyAnnual < 20000) {
        paybackText = '6 mo';
      } else if (savedMoneyAnnual < 50000) {
        paybackText = '4 mo';
      } else if (savedMoneyAnnual < 100000) {
        paybackText = '2 mo';
      }

      // 5. Format and Render Outputs
      // Using toLocaleString for proper comma formatting (e.g. 100,000)
      if (this.elements.outHours) {
        // Round to 1 decimal if needed, otherwise whole number
        const formattedHours = savedHoursWeekly % 1 !== 0 ? savedHoursWeekly.toFixed(1) : savedHoursWeekly;
        this.elements.outHours.innerText = `${formattedHours} hrs`;
      }
      
      if (this.elements.outWeekly) {
        this.elements.outWeekly.innerText = `$${Math.round(savedMoneyWeekly).toLocaleString()}`;
      }
      
      if (this.elements.outAnnual) {
        this.elements.outAnnual.innerText = `$${Math.round(savedMoneyAnnual).toLocaleString()}`;
      }
      
      if (this.elements.outPayback) {
        this.elements.outPayback.innerText = paybackText;
      }
    }
  };

  // Initialize when DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    ROICalculator.init();
  });

})();

/* --- END OF CHUNK 5 --- */
/**
 * ==========================================================================
 * XUNEEL SERVICES - ENTERPRISE APP.JS
 * CHUNK 6 OF 8: Interactive Components (FAQ & Carousel)
 * ==========================================================================
 */

(function() {
  'use strict';

  /**
   * InteractiveComponents Module
   * Handles UI components like the FAQ accordion and testimonial carousel.
   */
  const InteractiveComponents = {
    init() {
      this.initFAQ();
      this.initCarousel();
      this.bindEvents();
    },

    /**
     * FAQ Accordion Engine
     * Opens clicked items, closes others, and updates ARIA states.
     */
    initFAQ() {
      this.faqItems = document.querySelectorAll('.faq-item');
      if (!this.faqItems.length) return;

      this.faqItems.forEach(item => {
        const question = item.querySelector('.faq-q');
        if (!question) return;

        // Ensure accessibility attributes are present initially
        const isOpenInitially = item.classList.contains('open');
        question.setAttribute('aria-expanded', isOpenInitially ? 'true' : 'false');

        question.addEventListener('click', () => {
          const isCurrentlyOpen = item.classList.contains('open');
          
          // Close all FAQ items for a clean accordion effect
          this.faqItems.forEach(i => {
            i.classList.remove('open');
            const q = i.querySelector('.faq-q');
            if (q) q.setAttribute('aria-expanded', 'false');
          });

          // Toggle the clicked item
          if (!isCurrentlyOpen) {
            item.classList.add('open');
            question.setAttribute('aria-expanded', 'true');
          }
        });

        // Keyboard accessibility (Enter/Space to toggle)
        question.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            question.click();
          }
        });
      });
    },

    /**
     * Testimonial Carousel Controller
     * Enhances the native CSS scroll-snapping with button controls.
     */
    initCarousel() {
      this.track = document.querySelector('.carousel-track');
      this.prevBtn = document.getElementById('prev-btn');
      this.nextBtn = document.getElementById('next-btn');

      if (!this.track) return;

      if (this.nextBtn) {
        this.nextBtn.addEventListener('click', () => this.scrollCarousel(1));
      }
      
      if (this.prevBtn) {
        this.prevBtn.addEventListener('click', () => this.scrollCarousel(-1));
      }
    },

    /**
     * Scrolls the carousel programmatically
     * @param {number} direction - 1 for next (right), -1 for prev (left)
     */
    scrollCarousel(direction) {
      // Calculate dynamic scroll amount: 
      // On mobile, scroll by the window width. On desktop, scroll by approx one card width.
      const scrollAmount = window.innerWidth < 768 ? window.innerWidth : 420;
      
      this.track.scrollBy({
        left: scrollAmount * direction,
        behavior: 'smooth'
      });
    },

    bindEvents() {
      // Re-initialize components when navigating to a new SPA route
      window.addEventListener('xuneel:pageChanged', () => {
        this.initFAQ();
        this.initCarousel();
      });
    }
  };

  // Initialize when DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    InteractiveComponents.init();
  });

})();

/* --- END OF CHUNK 6 --- */
/**
 * ==========================================================================
 * XUNEEL SERVICES - ENTERPRISE APP.JS
 * CHUNK 7 OF 8: Live Data Services (Timezones & API Feeds)
 * ==========================================================================
 */

(function() {
  'use strict';

  /**
   * DataServices Module
   * Manages real-time data updates for timezones and external API integrations.
   */
  const DataServices = {
    config: {
      clockSelector: '[data-tz]',
      githubContainerId: 'github-feed',
      githubUser: 'xuneel', // Replace with your actual GitHub username
      updateInterval: 1000 * 60 // Update clocks every minute
    },

    init() {
      this.initTimezones();
      this.initGitHubFeed();
    },

    /**
     * Real-time Global Clock Engine
     * Updates all elements with [data-tz] attributes based on their timezone value.
     */
    initTimezones() {
      const clockElements = document.querySelectorAll(this.config.clockSelector);
      if (!clockElements.length) return;

      const updateClocks = () => {
        const now = new Date();
        
        clockElements.forEach(el => {
          const tz = el.getAttribute('data-tz');
          try {
            const timeString = new Intl.DateTimeFormat('en-US', {
              timeZone: tz,
              hour: '2-digit',
              minute: '2-digit',
              hour12: true
            }).format(now);
            
            el.innerText = timeString;
          } catch (e) {
            console.error(`[DataServices] Invalid timezone: ${tz}`);
          }
        });
      };

      // Run immediately and set interval
      updateClocks();
      this.clockTimer = setInterval(updateClocks, this.config.updateInterval);
    },

    /**
     * GitHub Feed Integration
     * Fetches recent public activity to demonstrate "Live" engineering status.
     */
    async initGitHubFeed() {
      const container = document.getElementById(this.config.githubContainerId);
      if (!container) return;

      // Placeholder while loading
      container.innerHTML = '<div class="gh-item">Syncing with GitHub...</div>';

      try {
        const response = await fetch(`https://api.github.com/users/${this.config.githubUser}/events/public`);
        if (!response.ok) throw new Error('API limit reached or user not found');
        
        const data = await response.json();
        const pushEvents = data.filter(event => event.type === 'PushEvent').slice(0, 3);

        if (pushEvents.length === 0) {
          container.innerHTML = '<div class="gh-item">No recent public commits found.</div>';
          return;
        }

        container.innerHTML = ''; // Clear placeholder

        pushEvents.forEach(event => {
          const repoName = event.repo.name.split('/')[1];
          const commitMsg = event.payload.commits[0].message;
          const timeAgo = this.formatRelativeTime(new Date(event.created_at));

          const item = document.createElement('div');
          item.className = 'gh-item';
          item.innerHTML = `
            <span>Deployed:</span> ${repoName} 
            <br>
            <small style="color:var(--text-dim)">"${commitMsg}" — ${timeAgo}</small>
          `;
          container.appendChild(item);
        });

      } catch (error) {
        console.warn('[DataServices] GitHub feed failed:', error);
        container.innerHTML = '<div class="gh-item">Remote activity feed currently offline.</div>';
      }
    },

    /**
     * Helper to format dates into relative strings (e.g. "2 hours ago")
     */
    formatRelativeTime(date) {
      const now = new Date();
      const diffInSeconds = Math.floor((now - date) / 1000);
      
      if (diffInSeconds < 60) return 'Just now';
      if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
      if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
      return `${Math.floor(diffInSeconds / 86400)}d ago`;
    },

    // Cleanup method for SPA navigation
    destroy() {
      if (this.clockTimer) clearInterval(this.clockTimer);
    }
  };

  // Initialize when DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    DataServices.init();
  });

  // Re-init on SPA navigation
  window.addEventListener('xuneel:pageChanged', () => {
    DataServices.destroy();
    DataServices.init();
  });

})();

/* --- END OF CHUNK 7 --- */
/**
 * ==========================================================================
 * XUNEEL SERVICES - ENTERPRISE APP.JS
 * CHUNK 8 OF 8: Form Security, Portal Logic & Cookie Persistence
 * ==========================================================================
 */

(function() {
  'use strict';

  /**
   * SecurityAndForms Module
   * Manages form validation, bot protection, and privacy compliance.
   */
  const SecurityAndForms = {
    config: {
      cookieBannerId: 'cookie-banner',
      cookieStorageKey: 'xuneel-consent',
      portalFormId: 'portal-form',
      portalSuccessId: 'portal-success',
      contactFormClass: '.contact-form'
    },

    init() {
      this.initCookieBanner();
      this.initPortalLogic();
      this.initContactValidation();
    },

    /**
     * Privacy Persistence System
     * Manages the cookie consent lifecycle.
     */
    initCookieBanner() {
      const banner = document.getElementById(this.config.cookieBannerId);
      if (!banner) return;

      const consent = localStorage.getItem(this.config.cookieStorageKey);

      // Show banner with a delay if no consent exists
      if (!consent) {
        setTimeout(() => banner.classList.add('show'), 2000);
      }

      document.getElementById('accept-cookies')?.addEventListener('click', () => {
        this.saveConsent(banner, 'all');
      });

      document.getElementById('reject-cookies')?.addEventListener('click', () => {
        this.saveConsent(banner, 'essential');
      });
    },

    saveConsent(el, type) {
      localStorage.setItem(this.config.cookieStorageKey, type);
      el.classList.remove('show');
      console.log(`[Security] Consent saved: ${type}`);
    },

    /**
     * Client Portal Engine
     * Simulates secure access with UI feedback.
     */
    initPortalLogic() {
      const form = document.getElementById(this.config.portalFormId);
      const successMsg = document.getElementById(this.config.portalSuccessId);
      
      if (!form) return;

      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button');
        const email = form.querySelector('input[type="email"]').value;

        // Visual loading state
        btn.classList.add('btn-loading');
        btn.disabled = true;

        // Simulate secure API verification
        setTimeout(() => {
          form.style.display = 'none';
          if (successMsg) {
            successMsg.style.display = 'block';
            successMsg.innerHTML = `
              <p>Success! A secure access link has been sent to <strong>${email}</strong>.</p>
              <small style="display:block; margin-top:10px; color:var(--text-dim)">Link expires in 15 minutes.</small>
            `;
          }
          btn.classList.remove('btn-loading');
        }, 1500);
      });
    },

    /**
     * Contact Form Validation & Bot Protection
     * Ensures clean data entry and prevents automated spam.
     */
    initContactValidation() {
      const contactForm = document.querySelector(this.config.contactFormClass);
      if (!contactForm) return;

      contactForm.addEventListener('submit', (e) => {
        // Simple Honeypot Check (if you added a hidden field)
        const honeypot = contactForm.querySelector('[name="bot-field"]');
        if (honeypot && honeypot.value !== "") {
          e.preventDefault();
          console.warn("[Security] Bot detected. Submission blocked.");
          return;
        }

        const inputs = contactForm.querySelectorAll('input[required], textarea[required]');
        let isValid = true;

        inputs.forEach(input => {
          const group = input.closest('.form-group');
          if (!input.value.trim()) {
            isValid = false;
            if (group) group.classList.add('error');
          } else {
            if (group) group.classList.remove('error');
          }
        });

        if (!isValid) {
          e.preventDefault();
          console.warn("[Forms] Validation failed.");
        }
      });
    }
  };

  // Initialize when DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    SecurityAndForms.init();
  });

  // Re-hook for SPA route changes
  window.addEventListener('xuneel:pageChanged', () => {
    SecurityAndForms.initPortalLogic();
    SecurityAndForms.initContactValidation();
  });

})();

/**
 * ==========================================================================
 * XUNEEL SERVICES - CORE EXECUTION COMPLETE
 * All 8 Chunks successfully integrated.
 * ==========================================================================
 */
