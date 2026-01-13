import './style.css';
import { authService } from './core/auth.js';
import { initializeSeedData, forceUpdateCredentials } from './data/seedData.js';
import { renderLogin } from './modules/Login.js';
import { renderDashboard } from './modules/Dashboard.js';
import { renderCompanySettings } from './modules/CompanySettings.js';
import { renderOrganization } from './modules/Organization.js';
import { renderHolidays } from './modules/Holidays.js';
import { renderEmployeeDirectory } from './modules/EmployeeDirectory.js';
import { renderEmployeeDetail } from './modules/EmployeeDetail.js';
import { renderBiometricConfig } from './modules/BiometricConfig.js';
import { renderAttendanceDashboard } from './modules/AttendanceDashboard.js';
import { renderLeaveDashboard } from './modules/LeaveDashboard.js';
import { renderShiftManagement } from './modules/ShiftManagement.js';
import { renderPayrollDashboard } from './modules/PayrollDashboard.js';
import { renderPayslipDocument } from './modules/PayslipDocument.js';
import { renderPayslipList } from './modules/PayslipList.js';
import { renderApprovalDashboard } from './modules/ApprovalDashboard.js';
import { renderPerformanceDashboard } from './modules/PerformanceDashboard.js';
import { renderExitDashboard } from './modules/ExitDashboard.js';
import { renderReportDashboard } from './modules/ReportDashboard.js';
import { renderDocuments } from './modules/Documents.js';
import { renderProfile } from './modules/Profile.js';
import { renderMyTeam } from './modules/MyTeam.js';
import { initializeAppShortcuts } from './core/shortcuts.js';
import { generateDemoData, isDemoDataGenerated } from './data/demoData.js';

const app = document.querySelector('#app');

// Initialize seed data on first run
initializeSeedData();
// Force credentials to match instructions (fixes E001/ADMIN issues without clearing cache)
forceUpdateCredentials();

// Initialize demo data if not already done
if (!isDemoDataGenerated()) {
  generateDemoData();
}

// Application state
let currentUser = null;

// Listen for employee detail navigation
window.addEventListener('navigate-employee', (e) => {
  const content = document.querySelector('#dashboard-content');
  if (content) {
    content.innerHTML = '';
    content.appendChild(renderEmployeeDetail(e.detail.employeeId));
  }
});

// Initialize application
function init() {
  // Check URL path for routing
  const path = window.location.pathname;

  if (authService.isAuthenticated()) {
    currentUser = authService.getCurrentUser();
    // If on /login, redirect to dashboard
    if (path === '/login') {
      window.history.pushState({}, '', '/');
    }
    showDashboard();
  } else {
    // Not authenticated - show login
    if (path !== '/login') {
      window.history.pushState({}, '', '/login');
    }
    showLogin();
  }
}

// Show login page
function showLogin() {
  app.innerHTML = '';
  app.appendChild(renderLogin(handleLogin));
}

// Show dashboard
function showDashboard() {
  app.innerHTML = '';
  app.appendChild(renderDashboard(currentUser, handleLogout, handleNavigation));

  // Initialize keyboard shortcuts
  initializeAppShortcuts(handleNavigation, handleLogout);

  // Restore last page if exists
  const lastPage = sessionStorage.getItem('hrms_current_page');
  if (lastPage && lastPage !== 'dashboard') {
    handleNavigation(lastPage);
    // Update sidebar active state
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
      sidebar.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
      const targetNav = sidebar.querySelector(`[data-page="${lastPage}"]`);
      if (targetNav) targetNav.classList.add('active');
    }
  }
}

// Handle successful login
function handleLogin(user) {
  currentUser = user;
  showDashboard();
}

// Handle logout
function handleLogout() {
  currentUser = null;
  authService.logout();
  sessionStorage.removeItem('hrms_current_page');
  window.history.pushState({}, '', '/login');
  showLogin();
}

// Expose logout handler globally for onclick and shortcuts
window.handleLogoutClick = function () {
  console.log('Logout clicked - executing immediately');
  handleLogout();
};

// Handle navigation
function handleNavigation(page) {
  const content = document.querySelector('#dashboard-content');

  if (!content) return;

  // Save current page to session storage for persistence
  sessionStorage.setItem('hrms_current_page', page);

  // Clear current content
  content.innerHTML = '';

  // Render page based on route
  switch (page) {
    case 'dashboard':
      content.appendChild(renderDashboardPage());
      break;
    case 'attendance':
      content.appendChild(renderAttendanceDashboard());
      break;
    case 'leaves':
      content.appendChild(renderLeaveDashboard());
      break;
    case 'shifts':
      content.appendChild(renderShiftManagement());
      break;
    case 'salary':
      content.appendChild(renderPayslipList());
      break;
    case 'documents':
      content.appendChild(renderDocuments());
      break;
    case 'profile':
      content.appendChild(renderProfile());
      break;
    case 'performance':
      content.appendChild(renderPerformanceDashboard());
      break;
    case 'exit':
      content.appendChild(renderExitDashboard());
      break;
    case 'employees':
      content.appendChild(renderEmployeeDirectory());
      break;
    case 'payroll':
      content.appendChild(renderPayrollDashboard());
      break;
    case 'reports':
      content.appendChild(renderReportDashboard());
      break;
    case 'settings':
      // Settings page shows Company Settings, Organization, and Holidays in tabs
      content.appendChild(renderSettingsPage());
      break;
    case 'company':
      content.appendChild(renderCompanySettings());
      break;
    case 'team':
      content.appendChild(renderMyTeam());
      break;
    case 'approvals':
      content.appendChild(renderApprovalDashboard());
      break;
    default:
      // Handle dynamic routes like 'payslip/PAY123'
      if (page.startsWith('payslip/')) {
        const payslipId = page.substring(8); // Extract ID after 'payslip/'
        content.appendChild(renderPayslipDocument(payslipId));
      } else {
        content.innerHTML = renderPlaceholder('Page Not Found', 'The requested page could not be found');
      }
  }
}

// Render dashboard page
function renderDashboardPage() {
  const div = document.createElement('div');
  div.innerHTML = `
    <div class="page-header">
      <h1 class="page-title">Welcome, ${currentUser.name.split(' ')[0]}!</h1>
      <p class="page-subtitle">Here's your overview for today</p>
    </div>

    <div class="grid grid-4 mb-6">
      <div class="card stat-card">
        <div class="stat-value">96%</div>
        <div class="stat-label">Attendance Rate</div>
      </div>

      <div class="card stat-card">
        <div class="stat-value">14</div>
        <div class="stat-label">Leave Balance</div>
      </div>

      <div class="card stat-card">
        <div class="stat-value">₹45,000</div>
        <div class="stat-label">This Month Salary</div>
      </div>

      <div class="card stat-card">
        <div class="stat-value">Jan 1</div>
        <div class="stat-label">Next Salary Date</div>
      </div>
    </div>

    <div class="card mb-4">
      <h3 class="mb-4">Quick Actions</h3>
      <div class="grid grid-3">
        <button class="btn btn-primary" id="qa-attendance">Mark Attendance</button>
        <button class="btn btn-secondary" id="qa-leave">Apply Leave</button>
        <button class="btn btn-secondary" id="qa-payslip">View Payslip</button>
      </div>
    </div>

    <div class="card">
      <h3 class="mb-4">Recent Activity</h3>
      <div class="space-y-3">
        <div class="flex items-center gap-3 p-3 rounded" style="background: var(--bg-secondary);">
          <div style="width: 8px; height: 8px; background: var(--primary); border-radius: 50%;"></div>
          <div>
            <div class="font-medium">New Year Holiday</div>
            <div class="text-sm text-muted">January 1, 2025 - Public Holiday</div>
          </div>
        </div>
        <div class="flex items-center gap-3 p-3 rounded" style="background: var(--bg-secondary);">
          <div style="width: 8px; height: 8px; background: var(--success); border-radius: 50%;"></div>
          <div>
            <div class="font-medium">November Salary Credited</div>
            <div class="text-sm text-muted">Your salary has been deposited on Nov 28</div>
          </div>
        </div>
        <div class="flex items-center gap-3 p-3 rounded" style="background: var(--bg-secondary);">
          <div style="width: 8px; height: 8px; background: var(--warning); border-radius: 50%;"></div>
          <div>
            <div class="font-medium">Attendance Marked</div>
            <div class="text-sm text-muted">You checked in today at 09:15 AM</div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Attach event listeners to quick action buttons
  setTimeout(() => {
    const attendanceBtn = div.querySelector('#qa-attendance');
    const leaveBtn = div.querySelector('#qa-leave');
    const payslipBtn = div.querySelector('#qa-payslip');

    if (attendanceBtn) {
      attendanceBtn.addEventListener('click', () => {
        handleNavigation('attendance');
        updateSidebarActive('attendance');
      });
    }
    if (leaveBtn) {
      leaveBtn.addEventListener('click', () => {
        handleNavigation('leaves');
        updateSidebarActive('leaves');
      });
    }
    if (payslipBtn) {
      payslipBtn.addEventListener('click', () => {
        handleNavigation('salary');
        updateSidebarActive('salary');
      });
    }
  }, 0);

  return div;
}

// Helper to update sidebar active state
function updateSidebarActive(pageId) {
  const sidebar = document.querySelector('.sidebar');
  if (sidebar) {
    sidebar.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
    const targetNav = sidebar.querySelector(`[data-page="${pageId}"]`);
    if (targetNav) targetNav.classList.add('active');
  }
}

// Render settings page with tabs for Module 2
function renderSettingsPage() {
  const container = document.createElement('div');

  container.innerHTML = `
    <div class="page-header">
      <h1 class="page-title">System Settings</h1>
      <p class="page-subtitle">Manage company configuration and organizational structure</p>
    </div>

    <div class="card mb-4">
      <nav class="nav" style="display: flex; gap: 0.5rem; padding: 0.5rem; background: var(--bg-secondary); border-radius: 8px; margin-bottom: 1.5rem;">
        <button class="nav-item active" data-tab="company">Company Settings</button>
        <button class="nav-item" data-tab="organization">Organization</button>
        <button class="nav-item" data-tab="holidays">Holidays</button>
        <button class="nav-item" data-tab="biometric">Biometric Device</button>
      </nav>

      <div id="tab-content"></div>
    </div>

    <div class="alert alert-success">
      ✓ Module 2 - Company & Organization Setup: COMPLETE
    </div>
  `;

  const tabContent = container.querySelector('#tab-content');
  const navItems = container.querySelectorAll('.nav-item');

  // Tab switching logic
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      // Update active state
      navItems.forEach(nav => nav.classList.remove('active'));
      item.classList.add('active');

      // Render appropriate content
      const tab = item.dataset.tab;
      tabContent.innerHTML = '';

      if (tab === 'company') {
        tabContent.appendChild(renderCompanySettings());
      } else if (tab === 'organization') {
        tabContent.appendChild(renderOrganization());
      } else if (tab === 'holidays') {
        tabContent.appendChild(renderHolidays());
      } else if (tab === 'biometric') {
        tabContent.appendChild(renderBiometricConfig());
      }
    });
  });

  // Load initial tab
  tabContent.appendChild(renderCompanySettings());

  return container;
}

// Start the application
try {
  init();
} catch (error) {
  console.error('Initialisation error:', error);
  document.body.innerHTML = `<div style="padding: 2rem; color: #721c24; background: #f8d7da; border: 1px solid #f5c6cb; border-radius: 4px; margin: 1rem;">
    <h2>Critical Error</h2>
    <p>The application failed to start: ${error.message}</p>
    <pre style="margin-top: 1rem; font-size: 0.8rem; overflow: auto;">${error.stack}</pre>
  </div>`;
}
