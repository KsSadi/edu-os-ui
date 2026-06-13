/**
 * nav-footer.js
 * Injects the shared dark nav + full footer into every public-facing root page.
 * Usage: <script src="nav-footer.js" data-page="features"></script>
 * data-page values: home | features | pricing | contact | ai | register
 */
(function () {
  const page = document.currentScript
    ? document.currentScript.getAttribute('data-page') || ''
    : '';

  /* ── NAV STYLES ────────────────────────────────────────── */
  const style = document.createElement('style');
  style.textContent = `
    /* Shared nav — dark glass */
    .nf-nav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
      padding: 0 5%;
      display: flex; align-items: center; justify-content: space-between;
      height: 68px;
      background: rgba(3,7,20,0.75);
      backdrop-filter: blur(24px);
      border-bottom: 1px solid rgba(255,255,255,0.07);
      transition: box-shadow .3s, background .3s;
    }
    .nf-nav.scrolled {
      background: rgba(3,7,20,0.92);
      box-shadow: 0 4px 32px rgba(0,0,0,0.5);
    }
    .nf-logo {
      display: flex; align-items: center; gap: 10px;
      text-decoration: none; flex-shrink: 0;
    }
    .nf-logo img { height: 40px; width: auto; display: block; filter: brightness(0) invert(1); }

    .nf-links {
      display: flex; align-items: center; gap: 28px;
    }
    .nf-links a {
      font-family: 'DM Sans', sans-serif;
      font-size: .88rem; font-weight: 500;
      color: rgba(255,255,255,0.6);
      text-decoration: none;
      transition: color .2s;
      position: relative;
    }
    .nf-links a:hover { color: #fff; }
    .nf-links a.nf-active { color: #fff; font-weight: 700; }
    .nf-links a.nf-active::after {
      content: ''; position: absolute; bottom: -4px; left: 0; right: 0;
      height: 2px; border-radius: 2px;
      background: linear-gradient(90deg, #7C3AED, #60A5FA);
    }
    .nf-links a.nf-ai {
      color: #A78BFA; font-weight: 700;
    }
    .nf-links a.nf-ai:hover { color: #C4B5FD; }

    .nf-cta { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }
    .nf-btn-outline {
      display: inline-flex; align-items: center; gap: 6px;
      background: transparent; color: rgba(255,255,255,0.8);
      border: 1.5px solid rgba(255,255,255,0.18);
      padding: 7px 18px; border-radius: 10px;
      font-family: 'DM Sans', sans-serif; font-size: .85rem; font-weight: 600;
      text-decoration: none; transition: all .2s; cursor: pointer;
    }
    .nf-btn-outline:hover {
      background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.32); color: #fff;
    }
    .nf-btn-primary {
      display: inline-flex; align-items: center; gap: 6px;
      background: linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%);
      color: #fff; padding: 7px 18px; border-radius: 10px;
      font-family: 'DM Sans', sans-serif; font-size: .85rem; font-weight: 700;
      text-decoration: none; transition: all .2s; cursor: pointer;
      box-shadow: 0 4px 18px rgba(124,58,237,0.38);
      border: none;
    }
    .nf-btn-primary:hover {
      transform: translateY(-1px); box-shadow: 0 8px 28px rgba(124,58,237,0.52);
    }

    /* Mobile hamburger */
    .nf-hamburger {
      display: none; flex-direction: column; gap: 5px; cursor: pointer;
      background: none; border: none; padding: 4px;
    }
    .nf-hamburger span {
      display: block; width: 22px; height: 2px;
      background: rgba(255,255,255,0.7); border-radius: 2px;
      transition: all .25s;
    }
    .nf-mobile-menu {
      display: none; position: fixed; top: 68px; left: 0; right: 0;
      background: rgba(3,7,20,0.97); backdrop-filter: blur(24px);
      border-bottom: 1px solid rgba(255,255,255,0.07);
      padding: 16px 5% 24px; z-index: 999;
      flex-direction: column; gap: 4px;
    }
    .nf-mobile-menu.open { display: flex; }
    .nf-mobile-menu a {
      font-family: 'DM Sans', sans-serif; font-size: .95rem; font-weight: 500;
      color: rgba(255,255,255,0.65); text-decoration: none;
      padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.05);
      transition: color .2s;
    }
    .nf-mobile-menu a:last-child { border: none; }
    .nf-mobile-menu a:hover, .nf-mobile-menu a.nf-active { color: #fff; }
    .nf-mobile-menu a.nf-ai { color: #A78BFA; }
    .nf-mobile-cta { display: flex; gap: 10px; margin-top: 14px; flex-wrap: wrap; }

    @media(max-width:820px) {
      .nf-links { display: none; }
      .nf-cta { display: none; }
      .nf-hamburger { display: flex; }
    }

    /* ── FOOTER STYLES ─────────────────────────────────────── */
    .nf-footer {
      background: #030510;
      color: #94A3B8;
      padding: 64px 5% 0;
      border-top: 1px solid rgba(255,255,255,0.05);
    }
    .nf-footer-grid {
      max-width: 1200px; margin: 0 auto;
      display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 48px;
      padding-bottom: 48px;
    }
    .nf-footer-brand {}
    .nf-footer-logo { margin-bottom: 14px; }
    .nf-footer-logo img { height: 38px; width: auto; display: block; }
    .nf-footer-desc {
      font-size: .88rem; line-height: 1.75; max-width: 260px; color: #64748B;
    }
    .nf-footer-social { display: flex; gap: 10px; margin-top: 20px; }
    .nf-footer-social a {
      width: 34px; height: 34px; border-radius: 8px;
      background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
      display: flex; align-items: center; justify-content: center;
      font-size: .9rem; text-decoration: none;
      transition: all .2s;
    }
    .nf-footer-social a:hover {
      background: rgba(124,58,237,0.15); border-color: rgba(124,58,237,0.3);
    }
    .nf-footer-col h4 {
      font-family: 'Sora', sans-serif; font-size: .82rem; font-weight: 800;
      color: rgba(255,255,255,0.8); margin-bottom: 16px;
      text-transform: uppercase; letter-spacing: .06em;
    }
    .nf-footer-col a {
      display: block; font-size: .85rem; color: #64748B;
      text-decoration: none; margin-bottom: 10px; transition: color .2s;
    }
    .nf-footer-col a:hover { color: rgba(255,255,255,0.8); }
    .nf-footer-col a.nf-ai-link { color: #A78BFA; font-weight: 700; }
    .nf-footer-col a.nf-admin-link { color: #475569; font-weight: 700; }
    .nf-footer-col a.nf-admin-link:hover { color: rgba(255,255,255,0.7); }

    /* Footer bottom bar */
    .nf-footer-bottom {
      max-width: 1200px; margin: 0 auto;
      border-top: 1px solid rgba(255,255,255,0.05);
      padding: 20px 0;
      display: flex; align-items: center; justify-content: space-between;
      flex-wrap: wrap; gap: 16px;
    }
    .nf-footer-copy { font-size: .78rem; color: #475569; }
    .nf-footer-status { display: flex; align-items: center; gap: 6px; font-size: .78rem; color: #475569; }
    .nf-footer-status-dot {
      width: 7px; height: 7px; border-radius: 50%; background: #22C55E;
      box-shadow: 0 0 8px rgba(34,197,94,0.45);
      animation: nf-pulse 2s ease-in-out infinite;
      display: inline-block;
    }
    @keyframes nf-pulse { 0%,100%{opacity:1;} 50%{opacity:.4;} }

    /* Prathomik strip */
    .nf-prathomik-strip {
      max-width: 1200px; margin: 0 auto;
      padding: 18px 0 24px;
      border-top: 1px solid rgba(255,255,255,0.04);
      display: flex; align-items: center; justify-content: center; gap: 10px;
    }
    .nf-prathomik-strip span {
      font-size: .75rem; color: #334155; font-weight: 500; letter-spacing: .03em;
    }
    .nf-prathomik-strip a {
      display: flex; align-items: center; text-decoration: none;
      opacity: .75; transition: opacity .2s;
    }
    .nf-prathomik-strip a:hover { opacity: 1; }
    .nf-prathomik-strip img { height: 26px; width: auto; display: block; }

    @media(max-width:900px) { .nf-footer-grid { grid-template-columns: 1fr 1fr; } }
    @media(max-width:560px) {
      .nf-footer-grid { grid-template-columns: 1fr; gap: 32px; }
      .nf-footer-bottom { flex-direction: column; text-align: center; }
    }
  `;
  document.head.appendChild(style);

  /* ── DOM INJECTION — deferred until body is ready ───────── */
  function isActive(p) { return page === p ? 'nf-active' : ''; }

  function inject() {
    /* NAV */
    const nav = document.createElement('nav');
    nav.className = 'nf-nav';
    nav.id = 'nfNav';
    nav.innerHTML = `
      <a href="index.html" class="nf-logo">
        <img src="assets/img/logo.png" alt="EduOS">
      </a>
      <div class="nf-links">
        <a href="index.html"       class="${isActive('home')}">Home</a>
        <a href="features.html"    class="${isActive('features')}">Features</a>
        <a href="pricing.html"     class="${isActive('pricing')}">Pricing</a>
        <a href="ai-features.html" class="nf-ai ${isActive('ai')}">✨ AI</a>
        <a href="contact.html"     class="${isActive('contact')}">Contact</a>
      </div>
      <div class="nf-cta">
        <a href="contact.html" class="nf-btn-outline">Book Demo</a>
        <a href="register.html" class="nf-btn-primary">Start Free →</a>
      </div>
      <button class="nf-hamburger" id="nfHamburger" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    `;
    document.body.prepend(nav);

    /* Mobile menu — sits right after nav */
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'nf-mobile-menu';
    mobileMenu.id = 'nfMobile';
    mobileMenu.innerHTML = `
      <a href="index.html"       class="${isActive('home')}">Home</a>
      <a href="features.html"    class="${isActive('features')}">Features</a>
      <a href="pricing.html"     class="${isActive('pricing')}">Pricing</a>
      <a href="ai-features.html" class="nf-ai ${isActive('ai')}">✨ AI Features</a>
      <a href="contact.html"     class="${isActive('contact')}">Contact</a>
      <div class="nf-mobile-cta">
        <a href="contact.html" class="nf-btn-outline">Book Demo</a>
        <a href="register.html" class="nf-btn-primary">Start Free →</a>
      </div>
    `;
    document.body.insertBefore(mobileMenu, nav.nextSibling);

    /* FOOTER — always last child of body */
    const footer = document.createElement('footer');
    footer.className = 'nf-footer';
    footer.innerHTML = `
      <div class="nf-footer-grid">
        <div class="nf-footer-brand">
          <div class="nf-footer-logo">
            <img src="assets/img/logo.png" alt="EduOS">
          </div>
          <div class="nf-footer-desc">
            Bangladesh's first AI-powered school management platform. Bridging the urban-rural digital divide, one school at a time.
          </div>
          <div class="nf-footer-social">
            <a href="#" title="Facebook">📘</a>
            <a href="#" title="LinkedIn">💼</a>
            <a href="#" title="Twitter/X">🐦</a>
            <a href="#" title="YouTube">▶️</a>
          </div>
        </div>
        <div class="nf-footer-col">
          <h4>Product</h4>
          <a href="features.html">Features</a>
          <a href="pricing.html">Pricing</a>
          <a href="ai-features.html" class="nf-ai-link">✨ AI Features</a>
          <a href="#">Roadmap</a>
          <a href="#">Changelog</a>
        </div>
        <div class="nf-footer-col">
          <h4>Company</h4>
          <a href="#">About Us</a>
          <a href="contact.html">Contact</a>
          <a href="#">Careers</a>
          <a href="#">Blog</a>
          <a href="#">Press Kit</a>
        </div>
        <div class="nf-footer-col">
          <h4>Support</h4>
          <a href="#">Help Center</a>
          <a href="#">Documentation</a>
          <a href="#">Status Page</a>
          <a href="#">Privacy Policy</a>
          <a href="admin/login.html" class="nf-admin-link">🔐 Admin Login</a>
        </div>
      </div>

      <div class="nf-footer-bottom">
        <div class="nf-footer-copy">© 2026 EduOS. All rights reserved.</div>
        <div class="nf-footer-status">
          <span class="nf-footer-status-dot"></span>
          All systems operational
        </div>
      </div>

      <div class="nf-prathomik-strip">
        <span>An Innovation by</span>
        <a href="https://prathomik.com" target="_blank" rel="noopener">
          <img src="https://healthmedsci.org/prathomik_light.png" alt="Prathomik">
        </a>
      </div>
    `;
    document.body.appendChild(footer);

    /* ── BEHAVIOURS ──────────────────────────────────────── */
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    });

    document.getElementById('nfHamburger').addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });

    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => mobileMenu.classList.remove('open'));
    });
  }

  /* Run after full DOM is parsed so footer lands at the true end */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }

})();
