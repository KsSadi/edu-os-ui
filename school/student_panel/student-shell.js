/**
 * student-shell.js — Common Sidebar & Topbar for Student Panel
 * Fills the empty <aside class="sidebar"> and <div class="topbar"> shells
 * that exist in every student_panel page.
 * Only links within the student_panel folder — no cross-panel links.
 */
(function () {

  // ── CSS INJECTION ────────────────────────────────────────────────
  const themeStyle = document.createElement('style');
  themeStyle.textContent = `
    :root {
      --stu:       #7C3AED;
      --stu-light: #EDE9FE;
      --stu-pale:  #F5F3FF;
      --stu-dark:  #5B21B6;
    }
    .sidebar { background: linear-gradient(180deg, #1E0A3C 0%, #2D1B69 100%); }
    .sb-link.active { background: rgba(124,58,237,.28); color: #C4B5FD; }
    .sb-link.active .sb-icon { background: rgba(124,58,237,.35); color: #A78BFA; }
    .sb-link:hover { background: rgba(255,255,255,.07); }
    .sb-section-label { color: rgba(255,255,255,.35); }
    .live-dot { background: var(--stu); }
    .topbar-avatar { background: var(--stu) !important; cursor: pointer; }
    .sb-avatar { background: var(--stu) !important; }
  `;
  document.head.appendChild(themeStyle);

  // ── NAV DEFINITION — student_panel files ONLY ────────────────────
  const NAV = [
    { section: 'My Portal', items: [
      { file: 'student-dashboard.html',     icon: '🏠', label: 'Dashboard' },
      { file: 'student-results.html',       icon: '📊', label: 'My Results' },
      { file: 'student-resources.html',     icon: '📁', label: 'Study Materials' },
    ]},
    { section: 'Academics', items: [
      { file: 'student-exam-schedule.html', icon: '📅', label: 'Exam Schedule' },
      { file: 'student-online-exam.html',   icon: '🖥️', label: 'Online Exams' },
      { file: 'student-notices.html',       icon: '📢', label: 'Notices', badge: '3', badgeRed: true },
    ]},
    { section: 'Finance', items: [
      { file: 'student-fee.html',           icon: '💳', label: 'Fee Ledger' },
    ]},
    { section: 'Communication', items: [
      { file: 'student-messages.html',      icon: '💬', label: 'Messages', badge: '4', badgePurple: true },
    ]},
    { section: 'AI Tools', items: [
      { file: '../ai_assistant/ai-dashboard.html',   icon: '🤖', label: 'AI Study Hub',      badge: 'AI', badgeBlue: true },
    ]},
    { section: 'Account', items: [
      { file: 'student-profile.html',       icon: '👤', label: 'My Profile' },
      { file: 'student-settings.html',      icon: '⚙️', label: 'Settings' },
    ]},
  ];

  // ── SESSION ──────────────────────────────────────────────────────
  function getSession() {
    try { return JSON.parse(localStorage.getItem('student_session') || 'null'); }
    catch (e) { return null; }
  }

  function initials(name) {
    if (!name) return 'FI';
    const p = name.trim().split(/\s+/);
    return (p[0][0] + (p[1] ? p[1][0] : '')).toUpperCase();
  }

  // ── ACTIVE FILE DETECTION ────────────────────────────────────────
  const currentFile = location.pathname.split('/').pop() || 'student-dashboard.html';

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
    const name = s ? s.name : 'Farhan Islam';
    const role = s ? (s.classRoom || 'Class IX–A') : 'Class IX–A · Roll 001';

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
            : it.badgePurple
            ? 'background:rgba(124,58,237,.35);color:#C4B5FD;'
            : 'background:rgba(124,58,237,.25);color:#DDD6FE;';
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
            <div class="sb-school-domain">Student Portal</div>
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
          <span class="sb-logout" title="Sign out" onclick="studentLogout()" style="cursor:pointer;margin-left:auto;">⏏</span>
        </div>
      </div>`;
  }

  // ── BUILD TOPBAR ─────────────────────────────────────────────────
  function buildTopbar(s) {
    const ini  = initials(s && s.name);
    const name = s ? s.name : 'Farhan Islam';
    const bc   = findBreadcrumb();

    const crumb = bc.section
      ? `<span>Student Portal</span><span class="breadcrumb-sep">›</span><span>${bc.section}</span><span class="breadcrumb-sep">›</span><span class="current">${bc.label}</span>`
      : `<span>Student Portal</span><span class="breadcrumb-sep">›</span><span class="current">${bc.label}</span>`;

    return `
      <div class="topbar-left">
        <div class="page-breadcrumb">${crumb}</div>
      </div>
      <div class="topbar-right">
        <div class="topbar-school-badge">
          <div class="live-dot"></div>Session 2026–27
        </div>
        <button class="topbar-icon-btn" title="Notifications" onclick="window.location='student-notices.html'">🔔<span class="notif-dot"></span></button>
        <div class="profile-dropdown-wrap" id="_sShellPW">
          <div class="topbar-avatar" id="_sShellPB" title="My Account">${ini}</div>
          <div class="profile-dropdown" id="_sShellPD">
            <div class="pd-header">
              <div class="pd-avatar" style="background:var(--stu);">${ini}</div>
              <div class="pd-info">
                <div class="pd-name">${name}</div>
                <div class="pd-role">Student · Dhaka High School</div>
              </div>
            </div>
            <div class="pd-divider"></div>
            <a href="student-profile.html" class="pd-item">👤 My Profile</a>
            <a href="student-settings.html" class="pd-item">⚙️ Settings</a>
            <a href="student-notices.html" class="pd-item">🔔 Notices</a>
            <div class="pd-divider"></div>
            <button class="pd-item pd-logout" onclick="studentLogout()">⏏️ Log Out</button>
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
    const pbtn = document.getElementById('_sShellPB');
    const pdd  = document.getElementById('_sShellPD');
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
  window.studentLogout = function () {
    localStorage.removeItem('student_session');
    window.location.href = '../auth/login.html';
  };

  inject();

})();
