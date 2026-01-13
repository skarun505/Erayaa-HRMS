import { approvalService } from '../core/approval.js';
import { authService } from '../core/auth.js';

export function renderApprovalDashboard() {
  const container = document.createElement('div');
  const currentUser = authService.getCurrentUser();

  if (!currentUser) return '<div>Please login first</div>';

  container.innerHTML = `
    <div class="page-header">
      <h1 class="page-title">Approvals Hub</h1>
      <p class="page-subtitle">Manage pending requests and workflows</p>
    </div>

    <!-- Stats Overview -->
    <div id="approval-stats" class="grid grid-4 mb-6">Loading stats...</div>

    <!-- Main Content -->
    <div class="grid grid-3" style="grid-template-columns: 2fr 1fr;">
      
      <!-- Left Column: Pending Approvals -->
      <div class="card">
        <div class="flex justify-between items-center mb-4">
          <h3>Pending Requests</h3>
          <div class="flex gap-2">
            <div class="btn-group" style="display: flex; background: var(--bg-secondary); border-radius: 6px; padding: 2px;">
              <button class="btn btn-sm filter-btn active" data-filter="all" style="background: white; border: none;">All</button>
              <button class="btn btn-sm filter-btn" data-filter="leave" style="background: transparent; border: none;">Leaves</button>
              <button class="btn btn-sm filter-btn" data-filter="attendance_correction" style="background: transparent; border: none;">Attendance</button>
            </div>
            <button class="btn btn-sm btn-secondary" id="refresh-approvals">↻ Refresh</button>
          </div>
        </div>
        <div id="bulk-actions" class="mb-4 p-2 bg-gray-50 rounded flex justify-between items-center" style="display: none; background: var(--bg-secondary); border: 1px dashed var(--border);">
            <span class="text-xs font-medium"><span id="selected-count">0</span> items selected</span>
            <div class="flex gap-2">
                <button class="btn btn-sm btn-success" onclick="window.handleBulkApprove()">Approve Selected</button>
                <button class="btn btn-sm btn-secondary" onclick="window.clearSelection()">Clear</button>
            </div>
        </div>
        <div id="pending-list" class="approval-list">
          <!-- Dynamic Content -->
        </div>
      </div>

      <!-- Right Column: History -->
      <div>
        <div class="card mb-4" style="background: var(--bg-secondary);">
          <h3 class="mb-3">Quick Actions</h3>
          <button class="btn btn-primary w-full mb-2" onclick="alert('Feature coming soon: Delegate Approvals')">Delegate Approvals</button>
          <button class="btn btn-secondary w-full" onclick="window.toggleBulkMode()">Toggle Bulk Mode</button>
        </div>

        <div class="card">
          <h3 class="mb-3">Recent History</h3>
          <div id="approval-history" class="text-sm">
            <!-- Dynamic History -->
          </div>
        </div>
      </div>
    </div>
  `;

  // Initialize
  setTimeout(() => {
    loadApprovalStats(container, currentUser.userId);
    loadPendingApprovals(container, currentUser.userId);
    loadApprovalHistory(container, currentUser.userId);

    container.querySelector('#refresh-approvals').addEventListener('click', () => {
      loadPendingApprovals(container, currentUser.userId);
      loadApprovalStats(container, currentUser.userId);
    });

    // Add Filter listeners
    const filterBtns = container.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => {
          b.classList.remove('active');
          b.style.background = 'transparent';
        });
        btn.classList.add('active');
        btn.style.background = 'white';
        loadPendingApprovals(container, currentUser.userId, btn.dataset.filter);
      });
    });
  }, 0);

  return container;
}

function loadApprovalStats(container, userId) {
  const stats = approvalService.getApprovalStatistics(userId);
  const statContainer = container.querySelector('#approval-stats');

  statContainer.innerHTML = `
    <div class="card stat-card" style="background: var(--bg-secondary);">
      <div class="stat-value">${stats.total}</div>
      <div class="stat-label">Pending Total</div>
    </div>
    <div class="card stat-card" style="background: var(--bg-secondary);">
      <div class="stat-value" style="color: var(--danger);">${stats.byUrgency.urgent + stats.byUrgency.high}</div>
      <div class="stat-label">Urgent / High Priority</div>
    </div>
    <div class="card stat-card" style="background: var(--bg-secondary);">
      <div class="stat-value" style="color: var(--primary);">${stats.byType.leave}</div>
      <div class="stat-label">Leave Requests</div>
    </div>
    <div class="card stat-card" style="background: var(--bg-secondary);">
      <div class="stat-value" style="color: var(--warning);">${stats.byType.attendance}</div>
      <div class="stat-label">Attendance Corrections</div>
    </div>
  `;
}

function loadPendingApprovals(container, userId, filterType = 'all') {
  let approvals = approvalService.getPendingApprovals(userId);
  const listContainer = container.querySelector('#pending-list');

  if (filterType !== 'all') {
    approvals = approvals.filter(a => a.type === filterType);
  }

  if (approvals.length === 0) {
    listContainer.innerHTML = `
      <div class="text-center p-8 text-muted">
        <div style="font-size: 2rem;">✓</div>
        <p>No ${filterType === 'all' ? '' : formatType(filterType)} pending approvals. You're all caught up!</p>
      </div>
    `;
    return;
  }

  listContainer.innerHTML = approvals.map(approval => `
    <div class="card mb-3 approval-card" data-id="${approval.id}" style="border-left: 4px solid ${getPriorityColor(approval.priority)}; position: relative;">
      <div class="bulk-checkbox" style="display: none; position: absolute; left: -30px; top: 50%; transform: translateY(-50%);">
        <input type="checkbox" class="approval-select" value="${approval.id}" onchange="window.updateSelectionCount()">
      </div>
      <div class="flex justify-between items-start">
        <div>
          <div class="flex items-center gap-2 mb-1">
            <span class="badge ${getTypeBadgeClass(approval.type)}">${formatType(approval.type)}</span>
            ${approval.urgency === 'urgent' ? '<span class="badge badge-danger">URGENT</span>' : ''}
            <span class="text-xs text-muted">${new Date(approval.requestedOn).toLocaleDateString()}</span>
          </div>
          <h4 class="mb-1">${approval.employee}</h4>
          <div class="text-sm text-muted mb-2">${approval.title}</div>
          
          <div class="bg-gray-100 p-3 rounded text-sm mb-3" style="background: var(--bg-secondary);">
            ${renderDetails(approval)}
          </div>
        </div>
        <div class="flex flex-col gap-2 action-buttons">
          <button class="btn btn-sm btn-success" onclick="window.handleApproval('${approval.id}', 'approve')">Approve</button>
          <button class="btn btn-sm btn-danger" onclick="window.handleApproval('${approval.id}', 'reject')">Reject</button>
        </div>
      </div>
    </div>
  `).join('');
}

function loadApprovalHistory(container, userId) {
  const history = approvalService.getApprovalHistory(userId, 5);
  const historyContainer = container.querySelector('#approval-history');

  if (history.length === 0) {
    historyContainer.innerHTML = '<p class="text-muted text-center">No recent history</p>';
    return;
  }

  historyContainer.innerHTML = history.map(item => `
    <div class="mb-3 pb-3 border-b flex justify-between items-center">
      <div>
        <div class="font-medium">${item.employee}</div>
        <div class="text-xs text-muted">${item.details}</div>
      </div>
      <div class="text-right">
        <span class="badge ${item.action === 'approved' ? 'badge-success' : 'badge-danger'} text-xs">${item.action}</span>
        <div class="text-xs text-muted mt-1">${new Date(item.date).toLocaleDateString()}</div>
      </div>
    </div>
  `).join('');
}

function renderDetails(approval) {
  if (approval.type === 'leave') {
    return `
      <div><strong>Dates:</strong> ${approval.details.startDate} to ${approval.details.endDate} (${approval.details.days} days)</div>
      <div><strong>Reason:</strong> ${approval.details.reason}</div>
      ${approval.details.salaryImpact.unpaidDays > 0 ? `<div class="text-danger mt-1">⚠️ Salary Impact: ${approval.details.salaryImpact.unpaidDays} days loss of pay</div>` : ''}
    `;
  } else if (approval.type === 'attendance_correction') {
    return `
      <div><strong>Date:</strong> ${approval.details.date}</div>
      <div class="grid grid-2 gap-2 mt-1">
        <div>Current: ${approval.details.currentInTime || '--'} - ${approval.details.currentOutTime || '--'}</div>
        <div>Requested: <strong>${approval.details.requestedInTime} - ${approval.details.requestedOutTime}</strong></div>
      </div>
      <div class="mt-1"><strong>Reason:</strong> ${approval.details.reason}</div>
    `;
  }
  return '';
}

function getPriorityColor(priority) {
  switch (priority) {
    case 'high': return '#ef4444';
    case 'medium': return '#f59e0b';
    case 'low': return '#10b981';
    default: return '#cbd5e1';
  }
}

function getTypeBadgeClass(type) {
  return type === 'leave' ? 'badge-primary' : 'badge-warning';
}

function formatType(type) {
  return type === 'attendance_correction' ? 'Attendance' : 'Leave';
}

// Global handlers
window.toggleBulkMode = () => {
  const list = document.querySelector('#pending-list');
  const checkboxes = document.querySelectorAll('.bulk-checkbox');
  const actions = document.querySelector('#bulk-actions');
  const actionBtns = document.querySelectorAll('.action-buttons');

  if (list.style.paddingLeft === '40px') {
    list.style.paddingLeft = '0';
    checkboxes.forEach(c => c.style.display = 'none');
    actions.style.display = 'none';
    actionBtns.forEach(b => b.style.opacity = '1');
  } else {
    list.style.paddingLeft = '40px';
    list.style.transition = 'padding 0.3s';
    checkboxes.forEach(c => {
      c.style.display = 'block';
      c.style.animation = 'slideIn 0.3s';
    });
    actions.style.display = 'flex';
    actionBtns.forEach(b => b.style.opacity = '0.3');
  }
};

window.updateSelectionCount = () => {
  const selected = document.querySelectorAll('.approval-select:checked').length;
  document.querySelector('#selected-count').textContent = selected;
};

window.clearSelection = () => {
  document.querySelectorAll('.approval-select').forEach(c => c.checked = false);
  window.updateSelectionCount();
};

window.handleBulkApprove = () => {
  const selectedIds = Array.from(document.querySelectorAll('.approval-select:checked')).map(c => c.value);
  if (selectedIds.length === 0) return;

  if (confirm(`Are you sure you want to approve ${selectedIds.length} requests?`)) {
    const currentUser = authService.getCurrentUser();
    let successCount = 0;
    selectedIds.forEach(id => {
      const res = approvalService.approveRequest(id, currentUser.userId, 'Bulk Approved');
      if (res.success) successCount++;
    });

    alert(`Successfully approved ${successCount} requests!`);
    window.location.reload();
  }
};

window.handleApproval = (id, action) => {
  const currentUser = authService.getCurrentUser();
  if (!currentUser) return;

  if (action === 'approve') {
    const comments = prompt('Add comments (optional):') || '';
    const result = approvalService.approveRequest(id, currentUser.userId, comments);
    if (result.success) {
      alert('Request Approved ✅');
      // Refresh UI
      document.querySelector('#refresh-approvals')?.click();
    } else {
      alert('Error: ' + result.message);
    }
  } else {
    const reason = prompt('Reason for rejection (required):');
    if (!reason) return;

    const result = approvalService.rejectRequest(id, currentUser.userId, reason);
    if (result.success) {
      alert('Request Rejected ❌');
      // Refresh UI
      document.querySelector('#refresh-approvals')?.click();
    } else {
      alert('Error: ' + result.message);
    }
  }
};
