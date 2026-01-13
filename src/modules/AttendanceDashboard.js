import { biometricService } from '../core/biometric.js';
import { employeeService } from '../core/employee.js';
import { authService } from '../core/auth.js';
import { approvalService } from '../core/approval.js';

export function renderAttendanceDashboard() {
  const container = document.createElement('div');
  const currentUser = authService.getCurrentUser();
  const isHROrAdmin = currentUser && (currentUser.role === 'hr_admin' || currentUser.role === 'super_admin');

  // Get current month/year
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();

  container.innerHTML = `
    <div class="page-header">
      <h1 class="page-title">Attendance Management</h1>
      <p class="page-subtitle">View and manage attendance records</p>
    </div>

    <!-- Month Summary Stats -->
    <div class="grid grid-4 mb-6" id="summary-stats">
      <div class="card stat-card">
        <div class="stat-value" id="present-days">0</div>
        <div class="stat-label">Present Days</div>
      </div>
      <div class="card stat-card">
        <div class="stat-value" id="total-hours">0</div>
        <div class="stat-label">Working Hours</div>
      </div>
      <div class="card stat-card">
        <div class="stat-value" id="late-marks">0</div>
        <div class="stat-label">Late Marks</div>
      </div>
      <div class="card stat-card">
        <div class="stat-value" id="overtime-hours">0</div>
        <div class="stat-label">Overtime Hours</div>
      </div>
    </div>

   ${isHROrAdmin ? `
      <!-- Filters for HR/Admin -->
      <div class="card mb-6">
        <h3 class="mb-4">Filters</h3>
        <div class="grid grid-4">
          <div class="form-group">
            <label>Employee</label>
            <select id="employee-filter">
              <option value="">All Employees</option>
              ${getEmployeeOptions()}
            </select>
          </div>
          <div class="form-group">
            <label>Month</label>
            <select id="month-filter">
              ${getMonthOptions(currentMonth)}
            </select>
          </div>
          <div class="form-group">
            <label>Year</label>
            <select id="year-filter">
              <option value="2024">2024</option>
              <option value="2025" selected>2025</option>
              <option value="2026">2026</option>
            </select>
          </div>
          <div class="form-group">
            <label>Status</label>
            <select id="status-filter">
              <option value="">All Status</option>
              <option value="present">Present</option>
              <option value="absent">Absent</option>
            </select>
          </div>
        </div>
        <button class="btn btn-primary mt-2" id="apply-filters-btn">Apply Filters</button>
      </div>
    ` : ''}

    <!-- Attendance Records -->
    <div class="card">
      <div class="flex justify-between items-center mb-4">
        <h3>Attendance Records</h3>
        <div class="flex gap-2">
          <button class="btn btn-secondary" id="export-btn">Export to CSV</button>
          ${isHROrAdmin ? '<button class="btn btn-primary" onclick="window.location.hash=\'settings\'">Import from Biometric</button>' : ''}
        </div>
      </div>
      
      <div id="attendance-list"></div>
    </div>
  `;

  // Initial data load
  const employeeId = isHROrAdmin ? null : currentUser.userId;
  loadAttendanceData(container, employeeId, currentMonth, currentYear);

  // Filter handlers for HR/Admin
  if (isHROrAdmin) {
    const applyBtn = container.querySelector('#apply-filters-btn');
    applyBtn.addEventListener('click', () => {
      const empId = container.querySelector('#employee-filter').value || null;
      const month = parseInt(container.querySelector('#month-filter').value);
      const year = parseInt(container.querySelector('#year-filter').value);
      loadAttendanceData(container, empId, month, year);
    });
  }

  // Export handler
  const exportBtn = container.querySelector('#export-btn');
  exportBtn.addEventListener('click', () => {
    exportAttendanceCSV(container);
  });

  return container;
}

function loadAttendanceData(container, employeeId, month, year) {
  // Get attendance summary
  let summary;
  if (employeeId) {
    summary = biometricService.getAttendanceSummary(employeeId, month, year);
  } else {
    // Aggregate for all employees
    const employees = employeeService.getEmployees({ status: 'active' });
    summary = {
      totalDays: 0,
      present: 0,
      absent: 0,
      late: 0,
      totalWorkingHours: 0,
      overtimeHours: 0
    };

    employees.forEach(emp => {
      const empSummary = biometricService.getAttendanceSummary(emp.id, month, year);
      summary.totalDays += empSummary.totalDays;
      summary.present += empSummary.present;
      summary.absent += empSummary.absent;
      summary.late += empSummary.late;
      summary.totalWorkingHours += empSummary.totalWorkingHours;
      summary.overtimeHours += empSummary.overtimeHours;
    });
  }

  // Update stats
  container.querySelector('#present-days').textContent = summary.present;
  container.querySelector('#total-hours').textContent = Math.round(summary.totalWorkingHours);
  container.querySelector('#late-marks').textContent = summary.late;
  container.querySelector('#overtime-hours').textContent = Math.round(summary.overtimeHours);

  // Get detailed records
  const startDate = `${year}-${String(month).padStart(2, '0')}-01`;
  const endDate = new Date(year, month, 0);
  const endDateStr = endDate.toISOString().split('T')[0];

  const filters = {
    startDate,
    endDate: endDateStr
  };

  if (employeeId) {
    filters.employeeId = employeeId;
  }

  const records = biometricService.getAttendance(filters);
  renderAttendanceTable(container, records);
}

function renderAttendanceTable(container, records) {
  const listContainer = container.querySelector('#attendance-list');

  if (records.length === 0) {
    listContainer.innerHTML = `
      <div class="text-center p-8">
        <div style="font-size: 3rem; margin-bottom: 1rem;">📅</div>
        <h3 class="mb-2">No Attendance Records</h3>
        <p class="text-muted">Import biometric data to see attendance records here</p>
      </div>
    `;
    return;
  }

  const table = document.createElement('table');
  table.innerHTML = `
    <thead>
      <tr>
        <th>Date</th>
        <th>Employee</th>
        <th>Check-In</th>
        <th>Check-Out</th>
        <th>Working Hours</th>
        <th>Status</th>
        <th>Remarks</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      ${records.map(record => `
        <tr>
          <td class="font-medium">${formatDate(record.date)}</td>
          <td>${record.employeeName}</td>
          <td>${record.inTime || '-'}</td>
          <td>${record.outTime || '-'}</td>
          <td class="font-medium">${record.workingHours ? record.workingHours.toFixed(2) + 'h' : '-'}</td>
          <td>${getStatusBadge(record)}</td>
          <td class="text-xs">
            ${record.isLate ? '<span class="badge badge-warning">Late</span> ' : ''}
            ${record.isEarlyCheckout ? '<span class="badge badge-warning">Early</span> ' : ''}
            ${record.overtimeHours > 0 ? `<span class="badge badge-success">OT: ${record.overtimeHours.toFixed(1)}h</span>` : ''}
            ${record.source === 'biometric' ? '<span class="badge badge-primary">Biometric</span>' : ''}
          </td>
          <td>
            <button class="btn btn-sm btn-secondary" onclick="window.requestCorrection('${record.employeeId}', '${record.date}')">Correct</button>
          </td>
        </tr>
      `).join('')}
    </tbody>
  `;

  listContainer.innerHTML = '';
  listContainer.appendChild(table);
}

function getStatusBadge(record) {
  if (record.status === 'present') {
    if (record.workingHours >= 4) {
      return '<span class="badge badge-success">Present</span>';
    } else {
      return '<span class="badge badge-warning">Half Day</span>';
    }
  } else if (record.status === 'absent') {
    return '<span class="badge badge-danger">Absent</span>';
  } else {
    return '<span class="badge">Unknown</span>';
  }
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return `${date.getDate()} ${date.toLocaleDateString('en-US', { month: 'short' })} (${days[date.getDay()]})`;
}

function getEmployeeOptions() {
  const employees = employeeService.getEmployees({ status: 'active' });
  return employees.map(e => `<option value="${e.id}">${e.name} (${e.employeeId})</option>`).join('');
}

function getMonthOptions(selectedMonth) {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return months.map((month, index) =>
    `<option value="${index + 1}" ${index + 1 === selectedMonth ? 'selected' : ''}>${month}</option>`
  ).join('');
}

function exportAttendanceCSV(container) {
  const table = container.querySelector('table');
  if (!table) {
    alert('No data to export');
    return;
  }

  let csv = [];
  const rows = table.querySelectorAll('tr');

  rows.forEach(row => {
    const cols = row.querySelectorAll('td, th');
    const rowData = Array.from(cols).map(col => {
      // Clean HTML tags and quotes
      const text = col.textContent.trim().replace(/"/g, '""');
      return `"${text}"`;
    });
    csv.push(rowData.join(','));
  });

  const csvContent = csv.join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.setAttribute('hidden', '');
  a.setAttribute('href', url);
  a.setAttribute('download', `attendance_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

window.requestCorrection = (employeeId, date) => {
  const requestedInTime = prompt(`Enter requested Check-In time for ${date} (HH:MM):`);
  if (!requestedInTime) return;

  const requestedOutTime = prompt(`Enter requested Check-Out time for ${date} (HH:MM):`);
  if (!requestedOutTime) return;

  const reason = prompt('Reason for correction:');
  if (!reason) return;

  const result = approvalService.submitAttendanceCorrection(employeeId, date, requestedInTime, requestedOutTime, reason);
  if (result.success) {
    alert('Correction request submitted for approval! ✅');
  } else {
    alert('Error: ' + result.message);
  }
};
