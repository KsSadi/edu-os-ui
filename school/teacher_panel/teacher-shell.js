/**
 * teacher-shell.js — Common Sidebar & Topbar for Teacher Panel
 * Fills the empty <aside class="sidebar"> and <div class="topbar"> shells
 * that exist in every teacher_panel page.
 * Only links within the teacher_panel folder — no cross-panel links.
 */
(function () {

  // ── CSS INJECTION ────────────────────────────────────────────────
  // Inject teacher-specific theme overrides for sidebar & topbar
  const themeStyle = document.createElement('style');
  themeStyle.textContent = `
    :root {
      --teacher:      #0D9488;
      --teacher-light:#CCFBF1;
      --teacher-pale: #F0FDFA;
      --teacher-dark: #0F766E;
    }
    .sidebar { background: linear-gradient(180deg, #0F2027 0%, #0D3528 100%); }
    .sb-link.active { background: rgba(13,148,136,.25); color: #5EEAD4; }
    .sb-link.active .sb-icon { background: rgba(13,148,136,.3); color: #2DD4BF; }
    .sb-link:hover { background: rgba(255,255,255,.07); }
    .sb-section-label { color: rgba(255,255,255,.35); }
    .live-dot { background: var(--teacher); }
    .topbar-avatar { background: var(--teacher) !important; cursor: pointer; }
    .sb-avatar { background: var(--teacher) !important; }
    .sb-badge.blue { background: rgba(99,102,241,.25); color: #A5B4FC; border: 1px solid rgba(99,102,241,.4); }
  `;
  document.head.appendChild(themeStyle);

  // ── NAV DEFINITION — teacher_panel files ONLY ────────────────────
  const NAV = [
    { section: 'My Portal', items: [
      { file: 'teacher-dashboard.html',             icon: '🏠', label: 'Dashboard' },
      { file: 'teacher-classes.html',               icon: '📚', label: 'My Classes' },
      { file: 'teacher-attendance.html',            icon: '✅', label: 'Mark Attendance' },
      { file: 'teacher-materials.html',             icon: '📁', label: 'Study Materials' },
      { file: 'teacher-assignments.html',           icon: '📝', label: 'Assignments' },
    ]},
    { section: 'AI Tools', items: [
      { file: 'teacher-ai-question-creator.html',   icon: '🤖', label: 'AI Question Creator',    badge: 'AI', badgeBlue: true },
      { file: 'teacher-ai-report-narratives.html',  icon: '📝', label: 'AI Report Narratives',   badge: 'AI', badgeBlue: true },
      { file: 'teacher-ai-attendance-ai.html',      icon: '📅', label: 'Attendance Pattern AI',  badge: 'AI', badgeBlue: true },
    ]},
    { section: 'Academics', items: [
      { file: 'teacher-submission-view.html',       icon: '📋', label: 'View Submissions' },
    ]},
    { section: 'Communication', items: [
      { file: 'teacher-messages.html',              icon: '💬', label: 'Messages', badge: '5' },
    ]},
    { section: 'Account', items: [
      { file: 'teacher-settings.html',              icon: '⚙️', label: 'Settings' },
    ]},
  ];

  // ── SESSION ──────────────────────────────────────────────────────
  function getSession() {
    try { return JSON.parse(localStorage.getItem('school_session') || 'null'); }
    catch (e) { return null; }
  }

  function initials(name) {
    if (!name) return 'DK';
    const p = name.trim().split(/\s+/);
    return (p[0][0] + (p[1] ? p[1][0] : '')).toUpperCase();
  }

  // ── ACTIVE FILE DETECTION ────────────────────────────────────────
  const currentFile = location.pathname.split('/').pop() || 'teacher-dashboard.html';

  function findBreadcrumb() {
    for (const g of NAV) {
      for (const it of g.items) {
        if (it.file === currentFile) return { section: g.section, label: it.label };
      }
    }
    return { section: '', label: document.title.split('—')[0].split('·')[0].trim() };
  }

  // ── BUILD SIDEBAR HTML ───────────────────────────────────────────
  function buildSidebar(s) {
    const ini  = initials(s && s.name);
    const name = s ? s.name : 'Dr. Karim Hossain';
    const role = s ? (s.role.charAt(0).toUpperCase() + s.role.slice(1) + ' · Teacher') : 'Senior Teacher · Mathematics';

    let nav = '';
    for (const g of NAV) {
      nav += `<div class="sb-section-label">${g.section}</div>`;
      for (const it of g.items) {
        const active = it.file === currentFile ? ' active' : '';
        const badge  = it.badge
          ? `<span class="sb-badge${it.badgeBlue ? ' blue' : ''}">${it.badge}</span>`
          : '';
        nav += `<a href="${it.file}" class="sb-link${active}"><span class="sb-icon">${it.icon}</span> ${it.label}${badge}</a>`;
      }
    }

    return `
      <div class="sb-header">
        <div class="sb-school">
          <div class="sb-crest">🏛</div>
          <div>
            <div class="sb-school-name">Dhaka High School</div>
            <div class="sb-school-domain">Teacher Portal</div>
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
          <span class="sb-logout" title="Sign out" onclick="teacherLogout()" style="cursor:pointer;margin-left:auto;">⏏</span>
        </div>
      </div>`;
  }

  // ── BUILD TOPBAR HTML ────────────────────────────────────────────
  function buildTopbar(s) {
    const ini  = initials(s && s.name);
    const name = s ? s.name : 'Dr. Karim Hossain';
    const subj = 'Mathematics · Teacher';

    const bc = findBreadcrumb();
    const crumb = bc.section
      ? `<span>Teacher Portal</span><span class="breadcrumb-sep">›</span><span>${bc.section}</span><span class="breadcrumb-sep">›</span><span class="current">${bc.label}</span>`
      : `<span>Teacher Portal</span><span class="breadcrumb-sep">›</span><span class="current">${bc.label}</span>`;

    return `
      <div class="topbar-left">
        <div class="page-breadcrumb">${crumb}</div>
      </div>
      <div class="topbar-right">
        <div class="topbar-school-badge">
          <div class="live-dot"></div>Session 2026–27
        </div>
        <button class="topbar-icon-btn" title="Notifications">🔔<span class="notif-dot"></span></button>
        <div class="profile-dropdown-wrap" id="_tShellPW">
          <div class="topbar-avatar" id="_tShellPB" title="My Account">${ini}</div>
          <div class="profile-dropdown" id="_tShellPD">
            <div class="pd-header">
              <div class="pd-avatar" style="background:var(--teacher);">${ini}</div>
              <div class="pd-info">
                <div class="pd-name">${name}</div>
                <div class="pd-role">${subj}</div>
              </div>
            </div>
            <div class="pd-divider"></div>
            <a href="teacher-settings.html" class="pd-item">⚙️ My Settings</a>
            <a href="teacher-classes.html" class="pd-item">📚 My Classes</a>
            <div class="pd-divider"></div>
            <button class="pd-item pd-logout" onclick="teacherLogout()">⏏️ Log Out</button>
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
    const pbtn = document.getElementById('_tShellPB');
    const pdd  = document.getElementById('_tShellPD');
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
  window.teacherLogout = function () {
    localStorage.removeItem('school_session');
    window.location.href = '../auth/login.html';
  };
  // Alias for any pages using legacy doLogout
  window.doLogout = window.teacherLogout;

  // Run immediately (script is at bottom of body — DOM is ready)
  inject();

})();
