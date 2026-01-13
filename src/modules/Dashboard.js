import { authService } from '../core/auth.js';
import { renderNotificationBell } from './NotificationBell.js';
import { toast } from '../core/toast.js';

export function renderDashboard(user, onLogout, onNavigate) {
  const container = document.createElement('div');
  container.className = 'dashboard-layout';

  // Sidebar
  const sidebar = createSidebar(user, onLogout, onNavigate);
  container.appendChild(sidebar);

  // Main content
  const content = document.createElement('main');
  content.className = 'main-content';

  // Top Bar
  const topBar = document.createElement('header');
  topBar.style.display = 'flex';
  topBar.style.justifyContent = 'flex-end';
  topBar.style.padding = '1rem 2rem';
  topBar.style.background = 'white';
  topBar.style.borderBottom = '1px solid var(--border)';
  topBar.appendChild(renderNotificationBell());

  content.appendChild(topBar);

  const innerContent = document.createElement('div');
  innerContent.id = 'dashboard-content';
  innerContent.style.padding = '2rem';
  innerContent.appendChild(renderDashboardContent(user, onNavigate));

  content.appendChild(innerContent);

  container.appendChild(content);

  return container;
}

function createSidebar(user, onLogout, onNavigate) {
  const sidebar = document.createElement('aside');
  sidebar.className = 'sidebar';

  // Menu items based on role
  const menuItems = getMenuByRole(user.role);

  sidebar.innerHTML = `
    <div class="sidebar-header">
      <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
        <img src="/erayaa-logo.png" alt="Logo" style="height: 32px;">
        <div class="logo" style="font-size: 1.25rem; background: linear-gradient(45deg, #FFD700, #DAA520); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Erayaa</div>
      </div>
      <div class="text-sm text-muted">${user.name}</div>
      <div class="text-xs text-muted">${user.role.replace('_', ' ').toUpperCase()}</div>
    </div>

    <nav class="sidebar-nav" id="sidebar-nav">
      ${menuItems.map(item => `
        <a href="#" class="nav-item ${item.id === 'dashboard' ? 'active' : ''}" data-page="${item.id}">
          ${item.label}
        </a>
      `).join('')}
    </nav>

    <div style="margin-top: auto; padding-top: 1rem; border-top: 1px solid var(--border);">
      <button class="btn btn-secondary w-full mb-3" id="logout-btn" onclick="window.handleLogoutClick()">
        🚪 Logout
      </button>
      <div style="text-align: center;">
        <p class="text-xs text-muted">developed by <a href="https://www.arunkumarsathishkumar.me/" target="_blank" style="color: var(--primary); text-decoration: none;">S.Ak🤍</a></p>
      </div>
    </div>
  `;

  // Navigation handler
  sidebar.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();

      // Remove active class from all
      sidebar.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));

      // Add active to clicked
      item.classList.add('active');

      // Navigate
      onNavigate(item.dataset.page);
    });
  });


  // Logout is handled by onclick="window.handleLogoutClick()" in the button

  return sidebar;
}

function getMenuByRole(role) {
  const menus = {
    employee: [
      { id: 'dashboard', label: 'Dashboard' },
      { id: 'attendance', label: 'Attendance' },
      { id: 'leaves', label: 'Leaves' },
      { id: 'salary', label: 'Salary' },
      { id: 'documents', label: 'Documents' },
      { id: 'performance', label: 'Performance' },
      { id: 'exit', label: 'Resignation' },
      { id: 'profile', label: 'Profile' }
    ],
    manager: [
      { id: 'dashboard', label: 'Dashboard' },
      { id: 'team', label: 'My Team' },
      { id: 'approvals', label: 'Approvals' },
      { id: 'attendance', label: 'Attendance' },
      { id: 'leaves', label: 'Leaves' },
      { id: 'performance', label: 'Performance' },
      { id: 'exit', label: 'Exit Approvals' },
      { id: 'profile', label: 'Profile' }
    ],
    hr_admin: [
      { id: 'dashboard', label: 'Dashboard' },
      { id: 'employees', label: 'Employees' },
      { id: 'approvals', label: 'Approvals' },
      { id: 'attendance', label: 'Attendance' },
      { id: 'leaves', label: 'Leaves' },
      { id: 'shifts', label: 'Shifts & Roster' },
      { id: 'performance', label: 'Performance' },
      { id: 'exit', label: 'Exit & FnF' },
      { id: 'payroll', label: 'Payroll' },
      { id: 'reports', label: 'Reports & Analytics' }
    ],
    super_admin: [
      { id: 'dashboard', label: 'Dashboard' },
      { id: 'company', label: 'Company' },
      { id: 'employees', label: 'Employees' },
      { id: 'approvals', label: 'Approvals' },
      { id: 'shifts', label: 'Shifts & Roster' },
      { id: 'payroll', label: 'Payroll' },
      { id: 'performance', label: 'Performance' },
      { id: 'exit', label: 'Exit & FnF' },
      { id: 'reports', label: 'Reports & Analytics' },
      { id: 'settings', label: 'Settings' }
    ]
  };

  return menus[role] || menus.employee;
}

function renderDashboardContent(user, onNavigate) {
  const content = document.createElement('div');

  content.innerHTML = `
    <div class="page-header">
      <h1 class="page-title">Welcome, ${user.name.split(' ')[0]}!</h1>
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

    <div class="card">
      <h3 class="mb-4">Quick Actions</h3>
      <div class="grid grid-3">
        <button class="btn btn-primary" data-action="attendance">📋 Mark Attendance</button>
        <button class="btn btn-secondary" data-action="leave">🏖️ Apply Leave</button>
        <button class="btn btn-secondary" data-action="payslip">💰 View Payslip</button>
      </div>
    </div>

    <div class="card mt-4">
      <h3 class="mb-4">Recent Activity</h3>
      <div class="text-muted">No recent activity</div>
    </div>
  `;

  // Add event listeners to quick action buttons
  setTimeout(() => {
    const actionButtons = content.querySelectorAll('[data-action]');
    actionButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const action = e.currentTarget.dataset.action;

        // Update sidebar active state
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) {
          sidebar.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
          const targetNav = sidebar.querySelector(`[data-page="${action === 'leave' ? 'leaves' : action === 'payslip' ? 'salary' : action}"]`);
          if (targetNav) targetNav.classList.add('active');
        }

        // Navigate
        if (action === 'attendance') {
          onNavigate('attendance');
          toast.info('Opening Attendance Module...');
        } else if (action === 'leave') {
          onNavigate('leaves');
          toast.info('Opening Leave Management...');
        } else if (action === 'payslip') {
          onNavigate('salary');
          toast.info('Opening Salary & Payslips...');
        }
      });
    });
  }, 0);

  return content;
}
