/* school-nav-footer.js — shared nav + footer injector for Dhaka High School */
(function () {
  'use strict';

  /* ── 1. Capture data-page synchronously ── */
  var currentPage = (document.currentScript && document.currentScript.getAttribute('data-page')) || '';

  /* ── 2. Inject styles into <head> immediately ── */
  var style = document.createElement('style');
  style.textContent = [
    /* ── SCH-TOPBAR ── */
    '.sch-topbar{background:linear-gradient(135deg,#0891B2 0%,#06B6D4 100%);padding:9px 5%;display:flex;align-items:center;justify-content:space-between;font-size:.8rem;color:rgba(255,255,255,.82);box-shadow:0 2px 8px rgba(12,27,69,.1);}',
    '.sch-topbar-left{display:flex;gap:22px;flex-wrap:wrap;}',
    '.sch-topbar-item{display:flex;align-items:center;gap:6px;}',
    '.sch-topbar-right{display:flex;gap:14px;align-items:center;}',
    '.sch-topbar-right a{color:rgba(255,255,255,.88);text-decoration:none;font-size:.78rem;font-weight:600;transition:color .2s;}',
    '.sch-topbar-right a:hover{color:#E07A2D;}',
    '.sch-lang-btn{background:rgba(255,255,255,.15);color:rgba(255,255,255,.95);border:1px solid rgba(255,255,255,.25);border-radius:6px;padding:4px 10px;font-size:.75rem;cursor:pointer;font-family:"DM Sans",sans-serif;font-weight:700;transition:all .2s;}',
    '.sch-lang-btn:hover{background:rgba(255,255,255,.25);transform:translateY(-1px);}',

    /* ── SCH-NAV ── */
    '.sch-nav{background:#fff;border-bottom:2px solid #E07A2D;position:sticky;top:0;z-index:100;box-shadow:0 4px 24px rgba(15,23,42,.08);transition:box-shadow .3s;}',
    '.sch-nav.scrolled{box-shadow:0 6px 32px rgba(15,23,42,.14);}',
    '.sch-nav-inner{max-width:1360px;margin:0 auto;padding:0 5%;display:flex;align-items:center;justify-content:space-between;height:76px;}',
    '.sch-identity{display:flex;align-items:center;gap:16px;text-decoration:none;}',
    '.sch-crest{width:54px;height:54px;border-radius:50%;border:3px solid #E07A2D;box-shadow:0 4px 16px rgba(12,27,69,.15);overflow:hidden;flex-shrink:0;}',
    '.sch-crest img{width:100%;height:100%;object-fit:cover;border-radius:50%;display:block;transition:transform .3s;}',
    '.sch-identity:hover .sch-crest img{transform:scale(1.1);}',
    '.sch-name{font-family:"Playfair Display",serif;font-weight:800;font-size:1.1rem;color:#0891B2;line-height:1.2;letter-spacing:-.01em;}',
    '.sch-tagline{font-size:.7rem;color:#64748B;font-style:italic;margin-top:2px;}',
    '.sch-nav-links{display:flex;align-items:center;gap:6px;}',
    '.sch-nav-link{padding:10px 16px;border-radius:8px;font-size:.9rem;font-weight:600;color:#475569;text-decoration:none;transition:all .25s;position:relative;}',
    '.sch-nav-link:hover{color:#0891B2;background:#CFFAFE;transform:translateY(-1px);}',
    '.sch-nav-link.active{color:#0891B2;font-weight:700;}',
    '.sch-nav-link.active::after{content:"";position:absolute;bottom:0;left:16px;right:16px;height:3px;background:linear-gradient(90deg,#E07A2D 0%,#F08E3A 100%);border-radius:2px;}',
    '.sch-nav-actions{display:flex;align-items:center;gap:12px;}',
    '.sch-btn-outline{display:inline-flex;align-items:center;gap:7px;padding:10px 18px;border-radius:10px;background:transparent;color:#0891B2;border:2px solid #0891B2;font-family:"DM Sans",sans-serif;font-size:.88rem;font-weight:700;text-decoration:none;transition:all .25s;}',
    '.sch-btn-outline:hover{background:#CFFAFE;transform:translateY(-1px);}',
    '.sch-btn-portal{display:inline-flex;align-items:center;gap:8px;padding:11px 20px;border-radius:10px;background:linear-gradient(135deg,#0891B2 0%,#06B6D4 100%);color:#fff;font-family:"DM Sans",sans-serif;font-size:.88rem;font-weight:700;text-decoration:none;transition:all .25s;box-shadow:0 4px 16px rgba(12,27,69,.2);}',
    '.sch-btn-portal:hover{background:linear-gradient(135deg,#06B6D4 0%,#22D3EE 100%);transform:translateY(-2px);box-shadow:0 6px 24px rgba(12,27,69,.3);}',
    '.sch-ham-btn{display:none;background:none;border:none;cursor:pointer;padding:6px;}',
    '.sch-ham-line{display:block;width:24px;height:3px;background:#0891B2;margin:5px 0;border-radius:3px;transition:all .25s;}',

    /* mobile nav overlay */
    '.sch-mobile-nav{display:none;position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(15,23,42,.92);z-index:9999;flex-direction:column;align-items:flex-start;justify-content:center;padding:48px 8%;}',
    '.sch-mobile-nav.open{display:flex;}',
    '.sch-mobile-close{position:absolute;top:20px;right:24px;background:none;border:none;font-size:2rem;color:#fff;cursor:pointer;line-height:1;}',
    '.sch-mobile-nav a{color:#fff;text-decoration:none;font-size:1.5rem;font-weight:700;padding:12px 0;border-bottom:1px solid rgba(255,255,255,.12);width:100%;font-family:"Playfair Display",serif;transition:color .2s;}',
    '.sch-mobile-nav a:hover{color:#E07A2D;}',
    '.sch-mobile-nav a.active{color:#22D3EE;}',
    '.sch-mobile-actions{display:flex;flex-direction:column;gap:12px;margin-top:24px;width:100%;}',

    '@media(max-width:820px){',
    '  .sch-nav-links,.sch-nav-actions{display:none;}',
    '  .sch-ham-btn{display:block;}',
    '}',

    /* ── SCH-FOOTER ── */
    '.sch-footer{background:linear-gradient(180deg,#0F9BC0 0%,#0C89AB 45%,#0A7897 100%);padding:72px 5% 0;position:relative;overflow:hidden;}',
    '.sch-footer::before{content:"";position:absolute;inset:0;pointer-events:none;background:linear-gradient(180deg,rgba(255,255,255,.08) 0%,rgba(255,255,255,0) 22%);}',
    '.sch-footer-top{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:48px;padding-bottom:52px;border-bottom:1px solid rgba(255,255,255,.14);position:relative;z-index:1;}',
    '.sch-footer-brand{}',
    '.sch-footer-logo-row{display:flex;align-items:center;gap:12px;margin-bottom:14px;}',
    '.sch-footer-crest{width:44px;height:44px;border-radius:50%;background:rgba(255,255,255,.18);border:1px solid rgba(255,255,255,.3);box-shadow:0 6px 18px rgba(8,145,178,.35);overflow:hidden;flex-shrink:0;}',
    '.sch-footer-crest img{width:100%;height:100%;object-fit:cover;border-radius:50%;display:block;}',
    '.sch-footer-school-name{font-family:"Playfair Display",serif;font-size:1.8rem;font-weight:700;color:#fff;}',
    '.sch-footer-desc{font-size:1.05rem;color:rgba(255,255,255,.86);line-height:1.75;max-width:330px;margin-bottom:18px;}',
    '.sch-powered-by{display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.2);border-radius:8px;padding:7px 12px;font-size:.75rem;color:rgba(255,255,255,.82);text-decoration:none;}',
    '.sch-powered-by img{height:28px;width:auto;filter:brightness(0) invert(1);vertical-align:middle;display:inline-block;}',
    '.sch-footer-col h4{font-family:"DM Sans",sans-serif;font-size:.82rem;font-weight:800;color:rgba(255,255,255,.72);text-transform:uppercase;letter-spacing:.09em;margin-bottom:16px;}',
    '.sch-footer-col a{display:block;font-size:.96rem;color:rgba(255,255,255,.9);text-decoration:none;margin-bottom:11px;transition:color .2s,transform .2s;width:fit-content;}',
    '.sch-footer-col a:hover{color:#fff;transform:translateX(2px);text-decoration:underline;text-decoration-color:rgba(255,255,255,.7);text-underline-offset:3px;}',
    '.sch-footer-bottom{max-width:1200px;margin:0 auto;padding:22px 0;display:flex;justify-content:space-between;align-items:center;font-size:.82rem;color:rgba(255,255,255,.74);flex-wrap:wrap;gap:8px;position:relative;z-index:1;}',
    '.sch-footer-bottom a{color:rgba(255,255,255,.88);text-decoration:none;}',
    '.sch-footer-bottom a:hover{color:#fff;}',
    '.sch-prathomik-strip{background:rgba(0,0,0,.18);padding:14px 5%;display:flex;align-items:center;justify-content:center;gap:10px;font-size:.8rem;color:rgba(255,255,255,.7);border-top:1px solid rgba(255,255,255,.1);position:relative;z-index:1;}',
    '.sch-prathomik-strip img{height:22px;width:auto;vertical-align:middle;display:inline-block;}',

    '@media(max-width:900px){.sch-footer-top{grid-template-columns:1fr 1fr;}}',
    '@media(max-width:560px){.sch-footer-top{grid-template-columns:1fr;}}'
  ].join('\n');
  document.head.appendChild(style);

  /* ── 3. Spacer style for pages that need nav offset ── */
  /* (handled naturally by sticky nav; hero sections with padding-top handle themselves) */

  /* ── 4. DOM mutations gated by DOMContentLoaded ── */
  function inject() {
    var LOGO_URL = 'https://upload.wikimedia.org/wikipedia/bn/2/2c/%E0%A6%A7%E0%A6%BE%E0%A6%A8%E0%A6%AE%E0%A6%A8%E0%A7%8D%E0%A6%A1%E0%A6%BF_%E0%A6%97%E0%A6%AD._%E0%A6%AC%E0%A6%AF%E0%A6%BC%E0%A7%87%E0%A6%9C_%E0%A6%B9%E0%A6%BE%E0%A6%87_%E0%A6%B8%E0%A7%8D%E0%A6%95%E0%A7%81%E0%A6%B2%E0%A7%87%E0%A6%B0_%E0%A6%B2%E0%A7%8B%E0%A6%97%E0%A7%8B.png';

    var navLinks = [
      { href: 'index.html',           label: 'Home',      page: 'home'      },
      { href: 'school-about.html',    label: 'About',     page: 'about'     },
      { href: 'school-notices.html',  label: 'Notices',   page: 'notices'   },
      { href: 'school-admission.html',label: 'Admission', page: 'admission' },
      { href: 'school-results.html',  label: 'Results',   page: 'results'   },
      { href: 'school-contact.html',  label: 'Contact',   page: 'contact'   }
    ];

    /* ── TOPBAR ── */
    var topbar = document.createElement('div');
    topbar.className = 'sch-topbar';
    topbar.innerHTML =
      '<div class="sch-topbar-left">' +
        '<span class="sch-topbar-item">📞 +880 2-9876543</span>' +
        '<span class="sch-topbar-item">✉ info@dhakahigh.edu.bd</span>' +
        '<span class="sch-topbar-item">📍 Dhanmondi, Dhaka</span>' +
      '</div>' +
      '<div class="sch-topbar-right">' +
        '<a href="school-results.html">Results</a>' +
        '<a href="school-notices.html">Notices</a>' +
        '<a href="school-admission.html">Admissions</a>' +
        '<button class="sch-lang-btn">বাংলা</button>' +
      '</div>';

    /* ── MAIN NAV ── */
    var navLinksHTML = navLinks.map(function (nl) {
      var isActive = nl.page === currentPage ? ' active' : '';
      return '<a href="' + nl.href + '" class="sch-nav-link' + isActive + '">' + nl.label + '</a>';
    }).join('');

    var nav = document.createElement('nav');
    nav.className = 'sch-nav';
    nav.id = 'schNav';
    nav.innerHTML =
      '<div class="sch-nav-inner">' +
        '<a href="index.html" class="sch-identity">' +
          '<div class="sch-crest"><img src="' + LOGO_URL + '" alt="Dhaka High School Logo"></div>' +
          '<div>' +
            '<div class="sch-name">Dhaka High School</div>' +
            '<div class="sch-tagline">Excellence in Education Since 1962</div>' +
          '</div>' +
        '</a>' +
        '<div class="sch-nav-links" id="schNavLinks">' + navLinksHTML + '</div>' +
        '<div class="sch-nav-actions" id="schNavActions">' +
          '<a href="school-admission.html" class="sch-btn-outline">Apply Now</a>' +
          '<a href="auth/login.html" class="sch-btn-portal">🔐 Student Portal</a>' +
        '</div>' +
        '<button class="sch-ham-btn" id="schHamBtn" aria-label="Open menu">' +
          '<span class="sch-ham-line"></span>' +
          '<span class="sch-ham-line"></span>' +
          '<span class="sch-ham-line"></span>' +
        '</button>' +
      '</div>';

    /* ── MOBILE NAV OVERLAY ── */
    var mobileNav = document.createElement('div');
    mobileNav.className = 'sch-mobile-nav';
    mobileNav.id = 'schMobileNav';
    var mobileLinksHTML = navLinks.map(function (nl) {
      var isActive = nl.page === currentPage ? ' active' : '';
      return '<a href="' + nl.href + '" class="' + isActive.trim() + '">' + nl.label + '</a>';
    }).join('');
    mobileNav.innerHTML =
      '<button class="sch-mobile-close" id="schMobileClose" aria-label="Close menu">&times;</button>' +
      mobileLinksHTML +
      '<div class="sch-mobile-actions">' +
        '<a href="school-admission.html" class="sch-btn-outline" style="justify-content:center;">Apply Now</a>' +
        '<a href="auth/login.html" class="sch-btn-portal" style="justify-content:center;">🔐 Student Portal</a>' +
      '</div>';

    /* ── FOOTER ── */
    var footer = document.createElement('footer');
    footer.className = 'sch-footer';
    footer.innerHTML =
      '<div class="sch-footer-top">' +
        '<div class="sch-footer-brand">' +
          '<div class="sch-footer-logo-row">' +
            '<div class="sch-footer-crest"><img src="' + LOGO_URL + '" alt="Dhaka High School Logo"></div>' +
            '<div class="sch-footer-school-name">Dhaka High School</div>' +
          '</div>' +
          '<div class="sch-footer-desc">Established in 1962, Dhaka High School has been a cornerstone of quality education in Bangladesh. We nurture curious, capable, and compassionate leaders of tomorrow.</div>' +
          '<a href="https://eduos.net" class="sch-powered-by">Powered by <img src="../assets/img/logo.png" alt="EduOS"></a>' +
        '</div>' +
        '<div class="sch-footer-col">' +
          '<h4>Quick Links</h4>' +
          '<a href="school-about.html">About School</a>' +
          '<a href="school-notices.html">Notice Board</a>' +
          '<a href="school-admission.html">Admission</a>' +
          '<a href="school-results.html">Results</a>' +
          '<a href="school-contact.html">Contact</a>' +
        '</div>' +
        '<div class="sch-footer-col">' +
          '<h4>Portals</h4>' +
          '<a href="auth/login.html">Student Portal</a>' +
          '<a href="auth/login.html">Teacher Portal</a>' +
          '<a href="auth/login.html">Parent Portal</a>' +
          '<a href="auth/login.html">Admin Login</a>' +
        '</div>' +
        '<div class="sch-footer-col">' +
          '<h4>Contact</h4>' +
          '<a href="tel:+88029876543">+880 2-9876543</a>' +
          '<a href="mailto:info@dhakahigh.edu.bd">info@dhakahigh.edu.bd</a>' +
          '<a href="school-contact.html">Road 4, Dhanmondi<br>Dhaka 1205</a>' +
          '<a href="#">EIIN: 108765</a>' +
        '</div>' +
      '</div>' +
      '<div class="sch-footer-bottom">' +
        '<div>© 2026 Dhaka High School. All rights reserved.</div>' +
        '<div style="display:flex;gap:16px;flex-wrap:wrap;">' +
          '<a href="school-about.html">About</a>' +
          '<a href="school-contact.html">Contact</a>' +
          '<a href="school-notices.html">Notices</a>' +
        '</div>' +
      '</div>' +
      '<div class="sch-prathomik-strip">' +
        '<span>An innovation by</span>' +
        '<img src="https://healthmedsci.org/prathomik_light.png" alt="Prathomik">' +
      '</div>';

    /* ── Prepend topbar + nav to body ── */
    var body = document.body;
    body.insertBefore(mobileNav, body.firstChild);
    body.insertBefore(nav, body.firstChild);
    body.insertBefore(topbar, body.firstChild);

    /* ── Append footer ── */
    body.appendChild(footer);

    /* ── Scrolled shadow effect ── */
    window.addEventListener('scroll', function () {
      if (window.scrollY > 10) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }, { passive: true });

    /* ── Hamburger toggle ── */
    var hamBtn = document.getElementById('schHamBtn');
    var mobileNavEl = document.getElementById('schMobileNav');
    var mobileClose = document.getElementById('schMobileClose');

    if (hamBtn && mobileNavEl) {
      hamBtn.addEventListener('click', function () {
        mobileNavEl.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    }
    if (mobileClose && mobileNavEl) {
      mobileClose.addEventListener('click', function () {
        mobileNavEl.classList.remove('open');
        document.body.style.overflow = '';
      });
    }
    /* Close on backdrop click */
    if (mobileNavEl) {
      mobileNavEl.addEventListener('click', function (e) {
        if (e.target === mobileNavEl) {
          mobileNavEl.classList.remove('open');
          document.body.style.overflow = '';
        }
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
