/**
 * school-auth.js — EduOS School Session Auth
 * Include this script in all panel dashboard pages.
 * It reads the school_session from localStorage and redirects
 * to login if no valid session is found, or if the role doesn't match.
 *
 * Usage (at top of each dashboard <script> block):
 *   requireSchoolAuth('admin');    // or 'teacher' | 'student' | 'parent'
 */

const SCHOOL_SESSION_KEY = 'school_session';
const LOGIN_URL = 'auth/login.html'; // relative to school/ root

/**
 * Returns the current session object or null.
 */
function getSchoolSession() {
  try {
    const raw = localStorage.getItem(SCHOOL_SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

/**
 * Clears session and redirects to login.
 * @param {string} base - optional path prefix to reach school/ root (e.g. '../')
 */
function schoolLogout(base) {
  localStorage.removeItem(SCHOOL_SESSION_KEY);
  const prefix = base || '';
  window.location.href = prefix + LOGIN_URL;
}

/**
 * Require a valid session matching `expectedRole`.
 * If no session or wrong role → redirect to login.
 * @param {string} expectedRole - 'admin' | 'teacher' | 'student' | 'parent'
 * @param {string} base - path from current file to school/ root (e.g. '../')
 */
function requireSchoolAuth(expectedRole, base) {
  const session = getSchoolSession();
  const prefix  = base || '../';

  if (!session || !session.role) {
    window.location.href = prefix + LOGIN_URL;
    return;
  }
  if (session.role !== expectedRole) {
    // Redirect to the correct dashboard for the actual role
    const dashMap = {
      admin:   prefix + 'admin_panel/admin-dashboard.html',
      teacher: prefix + 'teacher_panel/teacher-dashboard.html',
      student: prefix + 'student_panel/student-dashboard.html',
      parent:  prefix + 'parents_panel/parent-dashboard.html',
    };
    window.location.href = dashMap[session.role] || (prefix + LOGIN_URL);
    return;
  }
}

/**
 * Inject the logged-in user's name/role into elements with
 * data-session-name and data-session-role attributes.
 */
function injectSessionUI() {
  const s = getSchoolSession();
  if (!s) return;
  document.querySelectorAll('[data-session-name]').forEach(el => el.textContent = s.name);
  document.querySelectorAll('[data-session-role]').forEach(el => el.textContent = s.role.charAt(0).toUpperCase() + s.role.slice(1));
  document.querySelectorAll('[data-session-email]').forEach(el => el.textContent = s.email);
}

// Auto-inject on DOMContentLoaded
document.addEventListener('DOMContentLoaded', injectSessionUI);
