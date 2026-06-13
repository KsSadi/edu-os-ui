/**
 * ai-shell.js — Common Sidebar & Topbar for AI Assistant Module
 * Fills the empty <aside class="sidebar"> and <div class="topbar"> shells
 * that exist in every ai_assistant page.
 */
(function () {

  // ── CSS INJECTION ────────────────────────────────────────────────
  const themeStyle = document.createElement('style');
  themeStyle.textContent = `
    :root {
      --ai:       #06B6D4;
      --ai-light: #CFFAFE;
      --ai-pale:  #ECFEFF;
      --ai-dark:  #0E7490;
      --ai-violet: #8B5CF6;
    }
    .sidebar { background: linear-gradient(180deg, #050314 0%, #0D0828 55%, #1A1040 100%); }
    .sb-link.active { background: rgba(6,182,212,.2); color: #67E8F9; }
    .sb-link.active .sb-icon { background: rgba(6,182,212,.25); color: #A5F3FC; }
    .sb-link:hover { background: rgba(255,255,255,.06); }
    .sb-section-label { color: rgba(255,255,255,.25); }
    .live-dot { background: var(--ai); }
    .topbar-avatar { 
      width: 36px !important; 
      height: 36px !important; 
      min-width: 36px !important; 
      border-radius: 50% !important; 
      display: inline-flex !important; 
      align-items: center !important; 
      justify-content: center !important; 
      background: linear-gradient(135deg, var(--ai), var(--ai-violet)) !important; 
      color: white !important; 
      font-size: 0.95rem !important; 
      font-weight: 900 !important; 
      line-height: 1 !important;
      cursor: pointer !important; 
      flex-shrink: 0 !important; 
      border: none !important; 
      padding: 0 !important; 
      margin: 0 !important; 
      box-sizing: border-box !important; 
      transition: opacity .2s !important;
      text-decoration: none !important;
      vertical-align: middle !important;
    }
    .topbar-avatar:hover { opacity: 0.85 !important; }
    .sb-avatar { background: linear-gradient(135deg, var(--ai), var(--ai-violet)) !important; }
    .profile-dropdown { position: relative !important; display: flex !important; align-items: center !important; }
    .profile-dropdown-menu { position: absolute !important; top: calc(100% + 8px) !important; right: 0 !important; background: white !important; border: 1.5px solid #E2E8F0 !important; border-radius: 10px !important; min-width: 180px !important; box-shadow: 0 4px 20px rgba(0,0,0,.12) !important; display: none !important; z-index: 10000 !important; overflow: hidden !important; }
    .profile-dropdown.open .profile-dropdown-menu { display: block !important; }
    .pdm-item { padding: 10px 16px !important; font-size: .85rem !important; font-weight: 600 !important; color: #0F172A !important; border-bottom: 1px solid #E2E8F0 !important; display: flex !important; align-items: center !important; gap: 8px !important; cursor: pointer !important; transition: all .12s !important; }
    .pdm-item:last-child { border-bottom: none !important; }
    .pdm-item:hover { background: #F8FAFC !important; color: var(--ai) !important; }
    .pdm-item.logout { color: #DC2626 !important; }
    .pdm-item.logout:hover { background: #FEE2E2 !important; }
  `;
  document.head.appendChild(themeStyle);

  // ── NAV DEFINITION — AI Assistant Tools ────────────────────────
  const NAV = [
    { section: 'AI Tools', items: [
      { file: 'ai-dashboard.html',        icon: '📊', label: 'AI Dashboard' },
      { file: 'ai-chat.html',             icon: '💬', label: 'AI Chat Tutor' },
      { file: 'ai-practice-test.html',    icon: '📝', label: 'Practice Test Generator' },
      { file: 'ai-essay-feedback.html',   icon: '✍️', label: 'Essay Feedback' },
      { file: 'ai-concept-explainer.html',icon: '💡', label: 'Concept Explainer' },
      { file: 'ai-study-plan.html',       icon: '🗓️', label: 'Study Plan Generator' },
      { file: 'ai-flashcards.html',       icon: '🃏', label: 'Flashcard Generator' },
      { file: 'ai-note-summarizer.html',  icon: '📋', label: 'Note Summarizer' },
      { file: 'ai-math-solver.html',      icon: '🔢', label: 'Math Solver' },
      { file: 'ai-image-solver.html',     icon: '📸', label: 'Image Question Solver' },
      { file: 'ai-mind-map.html',         icon: '🗺️', label: 'Mind Map Generator' },
      { file: 'ai-question-creator.html', icon: '🤖', label: 'AI Question Creator' },
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
  const currentFile = location.pathname.split('/').pop() || 'ai-dashboard.html';

  function findBreadcrumb() {
    for (const g of NAV) {
      for (const it of g.items) {
        if (it.file === currentFile) return { section: g.section, label: it.label };
      }
    }
    return { section: 'AI Tools', label: document.title.split('—')[0].split('·')[0].trim() };
  }

  // ── BUILD SIDEBAR ────────────────────────────────────────────────
  function buildSidebar(s) {
    const ini  = initials(s && s.name);
    const name = s ? s.name : 'Farhan Islam';
    const role = s ? (s.classRoom || 'Class IX–A') : 'Class IX–A';

    let nav = '';
    for (const g of NAV) {
      nav += `<div class="sb-section-label">${g.section}</div>`;
      for (const it of g.items) {
        const active = it.file === currentFile ? ' active' : '';
        nav += `<a href="${it.file}" class="sb-link${active}"><span class="sb-icon">${it.icon}</span> ${it.label}</a>`;
      }
    }

    return `
      <div class="sb-header">
        <div class="sb-school">
          <div class="sb-crest" style="background:linear-gradient(135deg,var(--ai),var(--ai-violet));font-size:.9rem;">🤖</div>
          <div>
            <div class="sb-school-name">AI Study Assistant</div>
            <div class="sb-school-domain">Powered by Claude</div>
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
          <span class="sb-logout">⏏</span>
        </div>
      </div>
    `;
  }

  // ── BUILD TOPBAR ────────────────────────────────────────────────
  function buildTopbar(s) {
    const crumb = findBreadcrumb();
    const ini = initials(s && s.name);
    const name = s ? s.name : 'Farhan Islam';

    return `
      <div class="topbar-left">
        <div class="page-breadcrumb">
          <span>${crumb.section}</span>
          <span class="breadcrumb-sep">›</span>
          <span class="current">${crumb.label}</span>
        </div>
      </div>
      <div class="topbar-right">
        <div class="topbar-school-badge"><div class="live-dot"></div>AI Learning</div>
        <a href="../student_panel/student-dashboard.html" class="btn btn-sm btn-outline" style="margin-right:12px;font-size:.75rem;"><span>← Return to Student Dashboard</span></a>
        <div class="profile-dropdown" style="margin-left:8px;">
          <div class="topbar-avatar">${ini}</div>
          <div class="profile-dropdown-menu">
            <div class="pdm-item" style="font-weight:700;color:#64748B;padding:12px 16px;cursor:default;">👤 ${name}</div>
            <div class="pdm-item" onclick="location.href='../student_panel/student-profile.html'">👤 My Profile</div>
            <div class="pdm-item" onclick="location.href='../student_panel/student-settings.html'">⚙️ Settings</div>
            <div class="pdm-item logout" onclick="logout()">⏏ Logout</div>
          </div>
        </div>
      </div>
    `;
  }

  // ── INJECT INTO DOM ──────────────────────────────────────────────
  function inject() {
    const s = getSession();
    
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) sidebar.innerHTML = buildSidebar(s);
    
    const topbar = document.querySelector('.topbar');
    if (topbar) topbar.innerHTML = buildTopbar(s);

    // Profile dropdown toggle
    const avatar = document.querySelector('.topbar-avatar');
    if (avatar) {
      avatar.addEventListener('click', () => {
        const dropdown = document.querySelector('.profile-dropdown');
        if (dropdown) dropdown.classList.toggle('open');
      });
    }

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      const dropdown = document.querySelector('.profile-dropdown');
      if (dropdown && !dropdown.contains(e.target)) {
        dropdown.classList.remove('open');
      }
    });

    // Logout
    const logout = document.querySelector('.sb-logout');
    if (logout) {
      logout.addEventListener('click', () => {
        localStorage.removeItem('student_session');
        location.href = '../student_panel/student-dashboard.html';
      });
    }
  }

  // ── RUN ON DOM READY ────────────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }

  // ── LOGOUT FUNCTION ─────────────────────────────────────────────
  window.logout = function() {
    localStorage.removeItem('student_session');
    localStorage.removeItem('school_session');
    location.href = '../student_panel/student-dashboard.html';
  };

})();
