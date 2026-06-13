/**
 * admin-shell.js — Common Sidebar & Topbar for School Admin Panel
 * Fills the empty <aside class="sidebar"> and <div class="topbar"> shells
 * that exist in every admin_panel page.
 */
(function () {

  // ── NAV DEFINITION ──────────────────────────────────────────────
  const NAV = [
    { section: 'Main', items: [
      { file: 'admin-dashboard.html',       icon: '📊', label: 'Dashboard' },
      { file: 'admin-notices-board.html',   icon: '📢', label: 'Notices', badge: '3' },
    ]},
    { section: 'Academics', items: [
      { file: 'admin-classes.html',         icon: '🏫', label: 'Classes & Sections' },
      { file: 'admin-academic-year.html',   icon: '📅', label: 'Academic Year' },
      { file: 'admin-subjects.html',        icon: '📚', label: 'Subjects' },
      { file: 'admin-attendance-mark.html', icon: '✅', label: 'Mark Attendance' },
      { file: 'admin-attendance-report.html', icon: '📋', label: 'Attendance Report' },
      { file: 'admin-exam-schedule.html',   icon: '📝', label: 'Exam Schedule' },
      { file: 'admin-exam-marks.html',      icon: '✏️', label: 'Enter Marks' },
      { file: 'admin-exam-result.html',     icon: '📊', label: 'Results' },
      { file: 'admin-exam-marksheet.html',  icon: '🖨️', label: 'Marksheet' },
      { file: 'admin-exam-online.html',     icon: '🖥️', label: 'Online Exam' },
      { file: 'admin-reports.html',         icon: '📄', label: 'Reports' },
    ]},
    { section: 'AI Tools', items: [
      { file: 'admin-ai-fail-risk.html',    icon: '🧠', label: 'Fail-Risk Predictor', badge: 'AI', badgeBlue: true },
      { file: 'admin-ai-fee-predictor.html',icon: '💰', label: 'Fee Default Predictor', badge: 'AI', badgeBlue: true },
    ]},
    { section: 'People', items: [
      { file: 'admin-students.html',        icon: '🧑‍🎓', label: 'Students' },
      { file: 'admin-student-admission.html', icon: '📥', label: 'Admission' },
      { file: 'admin-users.html',           icon: '👥', label: 'Users' },
      { file: 'admin-roles.html',           icon: '🔐', label: 'Roles & Permissions' },
    ]},
    { section: 'Finance', items: [
      { file: 'admin-fee-structure.html',   icon: '💰', label: 'Fee Structure' },
      { file: 'admin-fee-collect.html',     icon: '💵', label: 'Collect Fees' },
      { file: 'admin-fee-receipt.html',     icon: '📄', label: 'Receipts', badge: '12', badgeBlue: true },
      { file: 'admin-fee-report.html',      icon: '📈', label: 'Fee Report' },
      { file: 'admin-billing.html',         icon: '💳', label: 'Billing' },
    ]},
    { section: 'System', items: [
      { file: 'admin-settings.html',        icon: '⚙️', label: 'Settings' },
      { file: 'admin-audit.html',           icon: '🕵️', label: 'Audit Log' },
      { file: 'admin-support.html',         icon: '🎧', label: 'Support' },
    ]},
  ];

  // ── SESSION ─────────────────────────────────────────────────────
  function getSession() {
    try { return JSON.parse(localStorage.getItem('school_session') || 'null'); }
    catch (e) { return null; }
  }
  function initials(name) {
    if (!name) return 'AR';
    const p = name.trim().split(/\s+/);
    return (p[0][0] + (p[1] ? p[1][0] : '')).toUpperCase();
  }

  // ── ACTIVE FILE DETECTION ────────────────────────────────────────
  const currentFile = location.pathname.split('/').pop() || 'admin-dashboard.html';

  function findBreadcrumb() {
    for (const g of NAV) {
      for (const it of g.items) {
        if (it.file === currentFile) return { section: g.section, label: it.label };
      }
    }
    return { section: '', label: document.title.split('—')[0].trim() };
  }

  // ── BUILD SIDEBAR HTML ───────────────────────────────────────────
  function buildSidebar(s) {
    const ini  = initials(s && s.name);
    const name = s ? s.name : 'Abdur Rahman';
    const role = s ? (s.role.charAt(0).toUpperCase() + s.role.slice(1) + ' · Admin') : 'Principal · Admin';

    let nav = '';
    for (const g of NAV) {
      nav += `<div class="sb-section-label">${g.section}</div>`;
      for (const it of g.items) {
        const active = it.file === currentFile ? ' active' : '';
        const badge  = it.badge
          ? `<span class="sb-badge${it.badgeBlue ? ' blue' : ''}">${it.badge}</span>`
          : '';
        const label = it.label.replace(/&/g, '&amp;');
        nav += `<a href="${it.file}" class="sb-link${active}"><span class="sb-icon">${it.icon}</span> ${label}${badge}</a>`;
      }
    }

    return `
      <div class="sb-header">
        <div class="sb-school">
          <div class="sb-crest">🏛</div>
          <div>
            <div class="sb-school-name">Dhaka High School</div>
            <div class="sb-school-domain">dhaka-high.edu.bd</div>
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
          <span class="sb-logout" title="Sign out" onclick="adminLogout()" style="cursor:pointer;margin-left:auto;">⏏</span>
        </div>
      </div>`;
  }

  // ── BUILD TOPBAR HTML ────────────────────────────────────────────
  function buildTopbar(s) {
    const ini  = initials(s && s.name);
    const name = s ? s.name : 'Abdur Rahman';
    const roleLabel = s ? (s.role.charAt(0).toUpperCase() + s.role.slice(1)) : 'Admin';
    const bc = findBreadcrumb();
    const crumb = bc.section
      ? `<span>Admin</span><span class="breadcrumb-sep">›</span><span>${bc.section}</span><span class="breadcrumb-sep">›</span><span class="current">${bc.label}</span>`
      : `<span>Admin</span><span class="breadcrumb-sep">›</span><span class="current">${bc.label}</span>`;

    return `
      <div class="topbar-left">
        <div class="page-breadcrumb">${crumb}</div>
      </div>
      <div class="topbar-right">
        <div class="topbar-school-badge">
          <div class="live-dot"></div>Session 2026–27
        </div>
        <button class="topbar-icon-btn" id="_shellNotif" title="Notifications">🔔<span class="notif-dot"></span></button>
        <button class="topbar-icon-btn" title="Search" onclick="document.querySelector('.search-input, .topbar-search, input[type=search]')?.focus()">🔍</button>
        <div class="profile-dropdown-wrap" id="_shellPW">
          <div class="topbar-avatar" id="_shellPB" title="Account">${ini}</div>
          <div class="profile-dropdown" id="_shellPD">
            <div class="pd-header">
              <div class="pd-avatar">${ini}</div>
              <div class="pd-info">
                <div class="pd-name">${name}</div>
                <div class="pd-role">${roleLabel}</div>
              </div>
            </div>
            <div class="pd-divider"></div>
            <a href="admin-settings.html" class="pd-item">⚙️ Settings</a>
            <a href="admin-audit.html" class="pd-item">📋 Audit Log</a>
            <div class="pd-divider"></div>
            <button class="pd-item pd-logout" onclick="adminLogout()">⏏️ Log Out</button>
          </div>
        </div>
      </div>`;
  }

  // ── INJECT ───────────────────────────────────────────────────────
  function inject() {
    const s = getSession();

    // Fill sidebar
    const sb = document.querySelector('.sidebar');
    if (sb) sb.innerHTML = buildSidebar(s);

    // Fill topbar
    const tb = document.querySelector('.topbar');
    if (tb) tb.innerHTML = buildTopbar(s);

    // Profile dropdown toggle
    const pbtn = document.getElementById('_shellPB');
    const pdd  = document.getElementById('_shellPD');
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

  // ── LOGOUT (global — used by onclick attrs in any page) ──────────
  window.adminLogout = function () {
    localStorage.removeItem('school_session');
    window.location.href = '../auth/login.html';
  };
  // Alias for any pages still using old name
  window.doLogout = window.adminLogout;

  // Run immediately (script is at bottom of body, DOM is ready)
  inject();

})();
