/**
 * parent-shell.js — Common Sidebar & Topbar for Parent Panel
 * Fills the empty <aside class="sidebar"> and <div class="topbar"> shells
 * that exist in every parents_panel page.
 * Only links within the parents_panel folder — no cross-panel links.
 */
(function () {

  // ── CSS INJECTION ────────────────────────────────────────────────
  const themeStyle = document.createElement('style');
  themeStyle.textContent = `
    :root {
      --par:       #D97706;
      --par-light: #FEF3C7;
      --par-pale:  #FFFBEB;
      --par-dark:  #92400E;
    }
    .sidebar { background: linear-gradient(180deg, #1C0A00 0%, #3B1A02 100%); }
    .sb-link.active { background: rgba(217,119,6,.25); color: #FCD34D; }
    .sb-link.active .sb-icon { background: rgba(217,119,6,.3); color: #FDE68A; }
    .sb-link:hover { background: rgba(255,255,255,.07); }
    .sb-section-label { color: rgba(255,255,255,.35); }
    .live-dot { background: var(--par); }
    .topbar-avatar { background: var(--par) !important; cursor: pointer; }
    .sb-avatar { background: var(--par) !important; }
  `;
  document.head.appendChild(themeStyle);

  // ── NAV DEFINITION — parents_panel files ONLY ────────────────────
  const NAV = [
    { section: 'My Children', items: [
      { file: 'parent-dashboard.html',      icon: '🏠', label: 'Dashboard' },
      { file: 'parent-progress.html',       icon: '📈', label: 'Progress Report' },
      { file: 'parent-notifications.html',  icon: '🔔', label: 'Notifications', badge: '4', badgeRed: true },
    ]},
    { section: 'Finance & Academics', items: [
      { file: 'parent-fee.html',            icon: '💳', label: 'Fee & Payment' },
      { file: 'parent-fee-receipt.html',    icon: '🧾', label: 'Receipts' },
      { file: 'parent-exam-schedule.html',  icon: '📅', label: 'Exam Schedule' },
    ]},
    { section: 'Communication', items: [
      { file: 'parent-messages.html',       icon: '💬', label: 'Message Teacher' },
    ]},
    { section: 'AI Tools', items: [
      { file: 'parent-ai-assistant.html',   icon: '🤖', label: 'AI Assistant', badge: 'AI', badgeBlue: true },
    ]},
    { section: 'Account', items: [
      { file: 'parent-settings.html',       icon: '⚙️', label: 'Settings' },
    ]},
  ];

  // ── SESSION ──────────────────────────────────────────────────────
  function getSession() {
    try { return JSON.parse(localStorage.getItem('parent_session') || 'null'); }
    catch (e) { return null; }
  }

  function initials(name) {
    if (!name) return 'MI';
    const p = name.trim().split(/\s+/);
    return (p[0][0] + (p[1] ? p[1][0] : '')).toUpperCase();
  }

  // ── ACTIVE FILE DETECTION ────────────────────────────────────────
  const currentFile = location.pathname.split('/').pop() || 'parent-dashboard.html';

  function findBreadcrumb() {
    for (const g of NAV) {
      for (const it of g.items) {
        if (it.file === currentFile) return { section: g.section, label: it.label };
      }
    }
    return { section: '', label: document.title.split('—')[0].split('·')[0].trim() };
  }

  // ── BUILD SIDEBAR ────────────────────────────────────────────────
  function buildSidebar(s) {
    const ini  = initials(s && s.name);
    const name = s ? s.name : 'Mohammad Islam';
    const role = 'Parent · 2 children';

    let nav = '';
    for (const g of NAV) {
      nav += `<div class="sb-section-label">${g.section}</div>`;
      for (const it of g.items) {
        const active = it.file === currentFile ? ' active' : '';
        let badge = '';
        if (it.badge) {
          const bg = it.badgeRed
            ? 'background:var(--red);color:#fff;'
            : it.badgeBlue
            ? 'background:rgba(99,102,241,.3);color:#A5B4FC;'
            : 'background:rgba(217,119,6,.3);color:#FDE68A;';
          badge = `<span class="sb-badge" style="${bg}">${it.badge}</span>`;
        }
        nav += `<a href="${it.file}" class="sb-link${active}"><span class="sb-icon">${it.icon}</span> ${it.label}${badge}</a>`;
      }
    }

    return `
      <div class="sb-header">
        <div class="sb-school">
          <div class="sb-crest">🏛</div>
          <div>
            <div class="sb-school-name">Dhaka High School</div>
            <div class="sb-school-domain">Parent Portal</div>
          </div>
        </div>
      </div>
      <nav class="sb-nav">${nav}</nav>
      <div class="sb-footer">
        <div class="sb-user">
          <div class="sb-avatar">${ini}</div>
          <div>
            <div class="sb-user-name">${name}</div>
            <div class="sb-user-role">${role}</div>
          </div>
          <span class="sb-logout" title="Sign out" onclick="parentLogout()" style="cursor:pointer;margin-left:auto;">⏏</span>
        </div>
      </div>`;
  }

  // ── BUILD TOPBAR ─────────────────────────────────────────────────
  function buildTopbar(s) {
    const ini  = initials(s && s.name);
    const name = s ? s.name : 'Mohammad Islam';
    const bc   = findBreadcrumb();

    const crumb = bc.section
      ? `<span>Parent Portal</span><span class="breadcrumb-sep">›</span><span>${bc.section}</span><span class="breadcrumb-sep">›</span><span class="current">${bc.label}</span>`
      : `<span>Parent Portal</span><span class="breadcrumb-sep">›</span><span class="current">${bc.label}</span>`;

    return `
      <div class="topbar-left">
        <div class="page-breadcrumb">${crumb}</div>
      </div>
      <div class="topbar-right">
        <div class="topbar-school-badge">
          <div class="live-dot"></div>Session 2026–27
        </div>
        <button class="topbar-icon-btn" title="Notifications" onclick="window.location='parent-notifications.html'">🔔<span class="notif-dot"></span></button>
        <div class="profile-dropdown-wrap" id="_pShellPW">
          <div class="topbar-avatar" id="_pShellPB" title="My Account">${ini}</div>
          <div class="profile-dropdown" id="_pShellPD">
            <div class="pd-header">
              <div class="pd-avatar" style="background:var(--par);">${ini}</div>
              <div class="pd-info">
                <div class="pd-name">${name}</div>
                <div class="pd-role">Parent · Dhaka High School</div>
              </div>
            </div>
            <div class="pd-divider"></div>
            <a href="parent-settings.html" class="pd-item">⚙️ Settings</a>
            <a href="parent-notifications.html" class="pd-item">🔔 Notifications</a>
            <div class="pd-divider"></div>
            <button class="pd-item pd-logout" onclick="parentLogout()">⏏️ Log Out</button>
          </div>
        </div>
      </div>`;
  }

  // ── INJECT ───────────────────────────────────────────────────────
  function inject() {
    const s = getSession();

    const sb = document.querySelector('.sidebar');
    if (sb) sb.innerHTML = buildSidebar(s);

    const tb = document.querySelector('.topbar');
    if (tb) tb.innerHTML = buildTopbar(s);

    // Profile dropdown toggle
    const pbtn = document.getElementById('_pShellPB');
    const pdd  = document.getElementById('_pShellPD');
    if (pbtn && pdd) {
      pbtn.addEventListener('click', function (e) {
        e.stopPropagation();
        pdd.classList.toggle('open');
      });
      document.addEventListener('click', function () {
        pdd.classList.remove('open');
      });
    }
  }

  // ── LOGOUT ───────────────────────────────────────────────────────
  window.parentLogout = function () {
    localStorage.removeItem('parent_session');
    window.location.href = '../auth/login.html';
  };

  inject();

})();
