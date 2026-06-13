/**
 * EduOS Super Admin — Auth Module
 * Uses localStorage for demo session management.
 * Demo credentials: admin@edulos.com / Admin@1234
 */

(function () {
  'use strict';

  const SESSION_KEY = 'eduos_admin_session';

  const DEMO_USERS = [
    {
      email: 'admin@edulos.com',
      password: 'Admin@1234',
      name: 'System Admin',
      role: 'Super Admin',
      initials: 'SA',
      avatarColor: '#BE123C',
    },
    {
      email: 'ops@edulos.com',
      password: 'Ops@1234',
      name: 'Operations Lead',
      role: 'Ops Admin',
      initials: 'OL',
      avatarColor: '#0EA5E9',
    },
  ];

  /* ── Public API ─────────────────────────────────────── */

  window.AdminAuth = {
    /** Return current session object or null */
    getSession() {
      try {
        const raw = localStorage.getItem(SESSION_KEY);
        return raw ? JSON.parse(raw) : null;
      } catch {
        return null;
      }
    },

    /** True if a valid session exists */
    isLoggedIn() {
      return !!this.getSession();
    },

    /**
     * Attempt login. Returns {ok, error}.
     * On success, persists session and returns {ok:true, user}.
     */
    login(email, password) {
      const user = DEMO_USERS.find(
        (u) =>
          u.email.toLowerCase() === (email || '').trim().toLowerCase() &&
          u.password === password
      );
      if (!user) {
        return { ok: false, error: 'Invalid email or password.' };
      }
      const session = {
        email: user.email,
        name: user.name,
        role: user.role,
        initials: user.initials,
        avatarColor: user.avatarColor,
        loginAt: Date.now(),
      };
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      return { ok: true, user: session };
    },

    /** Clear session and redirect to login page */
    logout() {
      localStorage.removeItem(SESSION_KEY);
      window.location.href = 'login.html';
    },

    /**
     * Call at top of every protected page.
     * Redirects to login if not authenticated.
     */
    requireAuth() {
      if (!this.isLoggedIn()) {
        const dest = encodeURIComponent(window.location.href);
        window.location.href = 'login.html?next=' + dest;
        return false;
      }
      this._applySessionUI();
      return true;
    },

    /** Patch sidebar user name / avatar with session data */
    _applySessionUI() {
      const s = this.getSession();
      if (!s) return;
      document.addEventListener('DOMContentLoaded', () => {
        const nameEl = document.querySelector('.sb-user-name');
        const roleEl = document.querySelector('.sb-user-role');
        const avEls  = document.querySelectorAll('.sb-avatar, .topbar-avatar');
        if (nameEl) nameEl.textContent = s.name;
        if (roleEl) roleEl.textContent = s.role + ' · EduOS';
        avEls.forEach((el) => {
          el.textContent = s.initials;
          el.style.background = s.avatarColor;
        });
      });
    },
  };

  /* ── Global logout helper (called from onclick) ─────── */
  window.adminLogout = function () {
    if (confirm('Sign out of EduOS Super Admin?')) {
      AdminAuth.logout();
    }
  };

  /* ── Profile dropdown toggle ─────────────────────────── */
  window.togglePD = function () {
    const menu = document.getElementById('pdMenu');
    if (!menu) return;
    menu.classList.toggle('open');
  };

  // Close dropdown when clicking outside
  document.addEventListener('click', function (e) {
    const wrap = document.getElementById('pdWrap');
    if (wrap && !wrap.contains(e.target)) {
      const menu = document.getElementById('pdMenu');
      if (menu) menu.classList.remove('open');
    }
  });
})();
