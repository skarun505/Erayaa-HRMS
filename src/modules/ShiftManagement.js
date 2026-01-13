import { shiftService } from '../core/shift.js';
import { employeeService } from '../core/employee.js';

export function renderShiftManagement() {
  const container = document.createElement('div');

  container.innerHTML = `
    <div class="page-header">
      <h1 class="page-title">Shift & Roster Management</h1>
      <p class="page-subtitle">Manage work shifts and employee schedules</p>
    </div>

    <div class="card mb-6">
      <nav class="nav" style="display: flex; gap: 0.5rem; padding: 0.5rem; background: var(--bg-secondary); border-radius: 8px; margin-bottom: 1.5rem;">
        <button class="nav-item active" data-tab="roster">Roster Scheduler</button>
        <button class="nav-item" data-tab="shifts">Shift Definitions</button>
      </nav>

      <div id="shift-content"></div>
    </div>
  `;

  const tabs = container.querySelectorAll('.nav-item');
  const content = container.querySelector('#shift-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      if (tab.dataset.tab === 'shifts') {
        renderShiftDefinitions(content);
      } else {
        renderRosterScheduler(content);
      }
    });
  });

  // Default view
  renderRosterScheduler(content);

  return container;
}

// ----------------------------------------------------------------------
// Shift Definitions View
// ----------------------------------------------------------------------
function renderShiftDefinitions(container) {
  const shifts = shiftService.getShifts();

  container.innerHTML = `
    <div class="flex justify-between items-center mb-4">
      <h3>Shift Definitions</h3>
      <button class="btn btn-primary" id="add-shift-btn">+ Add New Shift</button>
    </div>

    <div class="grid grid-3">
      ${shifts.map(shift => `
        <div class="card" style="border-left: 4px solid ${shift.color}">
          <div class="flex justify-between items-start mb-2">
            <div>
              <div class="font-bold text-lg">${shift.name}</div>
              <div class="text-xs text-muted">Code: ${shift.code}</div>
            </div>
            ${shift.isDefault ? '<span class="badge badge-primary">Default</span>' : ''}
            ${shift.isOff ? '<span class="badge badge-secondary">Off</span>' : ''}
          </div>
          
          ${!shift.isOff ? `
            <div class="text-sm mb-2">
              <div class="flex justify-between">
                <span>Timing:</span>
                <span class="font-medium">${shift.startTime} - ${shift.endTime}</span>
              </div>
              <div class="flex justify-between">
                <span>Grace Time:</span>
                <span>${shift.graceTime} mins</span>
              </div>
              <div class="flex justify-between">
                <span>Break:</span>
                <span>${shift.breakDuration} mins</span>
              </div>
            </div>
          ` : '<div class="text-sm text-muted mb-2">Weekly Off / Holiday Shift</div>'}

          <div class="flex gap-2 mt-4 pt-3 border-t border-gray-100">
            <button class="btn btn-sm btn-secondary w-full" onclick="window.editShift('${shift.id}')">Edit</button>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  container.querySelector('#add-shift-btn').addEventListener('click', () => {
    showShiftModal();
  });
}

// ----------------------------------------------------------------------
// Roster Scheduler View
// ----------------------------------------------------------------------
function renderRosterScheduler(container) {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  container.innerHTML = `
    <div class="flex justify-between items-center mb-4">
      <div class="flex gap-2 items-center">
        <button class="btn btn-secondary" id="prev-week">←</button>
        <span class="font-bold text-lg" id="date-range-label"></span>
        <button class="btn btn-secondary" id="next-week">→</button>
      </div>
      <div class="flex gap-2">
        <button class="btn btn-secondary" id="bulk-assign-btn">Bulk Assign</button>
        <button class="btn btn-primary" id="save-roster-btn">Save Changes</button>
      </div>
    </div>

    <div class="overflow-x-auto">
      <table class="roster-table w-full">
        <thead>
          <tr id="roster-header">
            <th style="min-width: 200px; position: sticky; left: 0; z-index: 10;">Employee</th>
            <!-- Dates will be injected here -->
          </tr>
        </thead>
        <tbody id="roster-body">
          <!-- Roster rows will be injected here -->
        </tbody>
      </table>
    </div>

    <div class="mt-4 flex gap-4 text-sm">
      <div class="flex items-center gap-2">
        <div style="width: 12px; height: 12px; background: #3b82f6; border-radius: 2px;"></div>
        <span>General (GS)</span>
      </div>
      <div class="flex items-center gap-2">
        <div style="width: 12px; height: 12px; background: #10b981; border-radius: 2px;"></div>
        <span>Morning (MS)</span>
      </div>
      <div class="flex items-center gap-2">
        <div style="width: 12px; height: 12px; background: #f59e0b; border-radius: 2px;"></div>
        <span>Evening (ES)</span>
      </div>
      <div class="flex items-center gap-2">
        <div style="width: 12px; height: 12px; background: #94a3b8; border-radius: 2px;"></div>
        <span>Weekly Off (WO)</span>
      </div>
    </div>
  `;

  let startDate = new Date();
  // Set to start of week (Monday)
  const day = startDate.getDay();
  const diff = startDate.getDate() - day + (day === 0 ? -6 : 1);
  startDate.setDate(diff);

  renderRosterGrid(container, startDate);

  container.querySelector('#prev-week').addEventListener('click', () => {
    startDate.setDate(startDate.getDate() - 7);
    renderRosterGrid(container, startDate);
  });

  container.querySelector('#next-week').addEventListener('click', () => {
    startDate.setDate(startDate.getDate() + 7);
    renderRosterGrid(container, startDate);
  });

  container.querySelector('#save-roster-btn').addEventListener('click', () => {
    saveRosterChanges(container);
  });

  container.querySelector('#bulk-assign-btn').addEventListener('click', () => {
    showBulkAssignModal(container);
  });
}

function showBulkAssignModal(container) {
  const shifts = shiftService.getShifts();

  const modal = document.createElement('div');
  modal.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); padding: 2rem; overflow-y: auto; z-index: 1000; display: flex; align-items: center; justify-content: center;';

  modal.innerHTML = `
    <div class="card" style="max-width: 500px; width: 100%;">
      <h3 class="mb-4">Bulk Shift Assignment</h3>
      <form id="bulk-form">
        <div class="grid grid-2">
          <div class="form-group">
            <label>From Date</label>
            <input type="date" id="from-date" required min="${new Date().toISOString().split('T')[0]}" />
          </div>
          <div class="form-group">
            <label>To Date</label>
            <input type="date" id="to-date" required min="${new Date().toISOString().split('T')[0]}" />
          </div>
        </div>

        <div class="form-group">
          <label>Assign Shift</label>
          <select id="bulk-shift" required>
            <option value="">-- Select Shift --</option>
            ${shifts.map(s => `<option value="${s.id}">${s.name} (${s.startTime}-${s.endTime})</option>`).join('')}
          </select>
        </div>

        <div class="alert alert-success text-sm">
          ✓ This will assign the selected shift to <strong>ALL Active Employees</strong> for the date range.
        </div>

        <div class="flex gap-2">
          <button type="submit" class="btn btn-primary">Apply Assignments</button>
          <button type="button" class="btn btn-secondary" id="cancel-bulk">Cancel</button>
        </div>
      </form>
    </div>
  `;

  document.body.appendChild(modal);

  modal.querySelector('#bulk-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const fromDate = new Date(modal.querySelector('#from-date').value);
    const toDate = new Date(modal.querySelector('#to-date').value);
    const shiftId = modal.querySelector('#bulk-shift').value;

    const activeEmployees = employeeService.getEmployees({ status: 'active' });
    const assignments = [];

    // Loop through dates
    for (let d = new Date(fromDate); d <= toDate; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split('T')[0];
      // Loop through all employees
      activeEmployees.forEach(emp => {
        assignments.push({
          employeeId: emp.id,
          date: dateStr,
          shiftId: shiftId
        });
      });
    }

    if (assignments.length > 0) {
      shiftService.assignRoster(assignments);
      alert(`Successfully assigned shift to ${activeEmployees.length} employees for ${assignments.length / activeEmployees.length} days.`);

      // Refresh grid
      const startDate = new Date(); // Reset to current week or keep current view?
      // Ideally we refresh the current view.
      // But for simplicity reset to this week is fine as Roster Scheduler defaults to "now".
      // Or better, trigger the "Next/Prev" logic on parent container?
      // Simpler: Just refresh the whole page or re-render.
      const rosterContent = document.querySelector('#shift-content');
      if (rosterContent) renderRosterScheduler(roosterContent);
    }

    document.body.removeChild(modal);
  });

  modal.querySelector('#cancel-bulk').addEventListener('click', () => {
    document.body.removeChild(modal);
  });
}

function renderRosterGrid(container, startDate) {
  const employeeData = employeeService.getEmployees({ status: 'active' });
  const shifts = shiftService.getShifts();

  // Header
  const headerRow = container.querySelector('#roster-header');
  const dateLabel = container.querySelector('#date-range-label');

  // Clear existing dates
  while (headerRow.children.length > 1) {
    headerRow.removeChild(headerRow.lastChild);
  }

  const outputDates = [];
  const endDate = new Date(startDate);

  for (let i = 0; i < 7; i++) {
    const curDate = new Date(startDate);
    curDate.setDate(startDate.getDate() + i);
    outputDates.push(curDate.toISOString().split('T')[0]);

    const th = document.createElement('th');
    th.className = 'text-center';
    th.innerHTML = `
      <div class="text-xs text-muted">${curDate.toLocaleDateString('en-US', { weekday: 'short' })}</div>
      <div>${curDate.getDate()}</div>
    `;
    headerRow.appendChild(th);

    if (i === 6) endDate.setDate(startDate.getDate() + 6);
  }

  dateLabel.textContent = `${startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;

  // Body
  const tbody = container.querySelector('#roster-body');
  tbody.innerHTML = '';

  // Get existing roster data
  const rosterData = shiftService.getRoster(
    startDate.toISOString().split('T')[0],
    outputDates[6]
  );

  const rosterMap = {};
  rosterData.forEach(r => {
    rosterMap[`${r.employeeId}_${r.date}`] = r.shift.code;
  });

  employeeData.forEach(emp => {
    const tr = document.createElement('tr');

    // Employee Info
    const tdName = document.createElement('td');
    tdName.style.position = 'sticky';
    tdName.style.left = '0';
    tdName.style.backgroundColor = 'var(--bg-primary)';
    tdName.style.zIndex = '5';
    tdName.style.borderRight = '1px solid var(--border)';
    tdName.innerHTML = `
      <div class="font-medium">${emp.name}</div>
      <div class="text-xs text-muted">${emp.employeeId}</div>
    `;
    tr.appendChild(tdName);

    // Days
    outputDates.forEach(date => {
      const td = document.createElement('td');
      td.className = 'p-1 text-center';

      const currentShiftCode = rosterMap[`${emp.id}_${date}`] || 'GS';

      // Shift Dropdown
      const select = document.createElement('select');
      select.className = 'shift-select text-sm p-1 border rounded w-full';
      select.style.fontSize = '12px';
      select.dataset.emp = emp.id;
      select.dataset.date = date;

      shifts.forEach(s => {
        const option = document.createElement('option');
        option.value = s.id;
        option.text = s.code;
        option.selected = s.code === currentShiftCode;
        select.appendChild(option);
      });

      // Color coding based on selection
      const updateColor = () => {
        const selectedShift = shifts.find(s => s.id === select.value);
        if (selectedShift) {
          select.style.borderLeft = `3px solid ${selectedShift.color}`;
          if (selectedShift.code === 'WO') {
            select.style.backgroundColor = '#f1f5f9';
            select.style.color = '#94a3b8';
          } else {
            select.style.backgroundColor = 'white';
            select.style.color = 'inherit';
          }
        }
      };

      select.addEventListener('change', updateColor);
      updateColor();

      td.appendChild(select);
      tr.appendChild(td);
    });

    tbody.appendChild(tr);
  });
}

function saveRosterChanges(container) {
  const selects = container.querySelectorAll('.shift-select');
  const assignments = [];

  selects.forEach(select => {
    assignments.push({
      employeeId: select.dataset.emp,
      date: select.dataset.date,
      shiftId: select.value
    });
  });

  shiftService.assignRoster(assignments);
  alert('Roster saved successfully!');
}

function showShiftModal(shiftId = null) {
  const shift = shiftId ? shiftService.getShift(shiftId) : null;

  const modal = document.createElement('div');
  modal.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); padding: 2rem; overflow-y: auto; z-index: 1000; display: flex; align-items: center; justify-content: center;';

  modal.innerHTML = `
    <div class="card" style="max-width: 500px; width: 100%;">
      <h3 class="mb-4">${shift ? 'Edit Shift' : 'Add New Shift'}</h3>
      <form id="shift-form">
        <div class="grid grid-2">
          <div class="form-group">
            <label>Shift Name</label>
            <input type="text" id="shift-name" value="${shift?.name || ''}" required />
          </div>
          <div class="form-group">
            <label>Shift Code</label>
            <input type="text" id="shift-code" value="${shift?.code || ''}" required maxlength="3" />
          </div>
        </div>

        <div class="grid grid-2">
          <div class="form-group">
            <label>Start Time</label>
            <input type="time" id="start-time" value="${shift?.startTime || '09:00'}" required />
          </div>
          <div class="form-group">
            <label>End Time</label>
            <input type="time" id="end-time" value="${shift?.endTime || '18:00'}" required />
          </div>
        </div>

        <div class="grid grid-3">
          <div class="form-group">
            <label>Break (Mins)</label>
            <input type="number" id="break-dur" value="${shift?.breakDuration || 60}" />
          </div>
          <div class="form-group">
            <label>Grace (Mins)</label>
            <input type="number" id="grace-time" value="${shift?.graceTime || 15}" />
          </div>
          <div class="form-group">
            <label>Color</label>
            <input type="color" id="shift-color" value="${shift?.color || '#3b82f6'} " style="height: 40px; padding: 2px;" />
          </div>
        </div>

        <div class="form-group">
          <label class="flex items-center gap-2">
            <input type="checkbox" id="is-off" ${shift?.isOff ? 'checked' : ''} />
            <span>Is Weekly Off / Holiday</span>
          </label>
        </div>

        <div class="flex gap-2">
          <button type="submit" class="btn btn-primary">Save Shift</button>
          <button type="button" class="btn btn-secondary" id="cancel-modal">Cancel</button>
        </div>
      </form>
    </div>
  `;

  document.body.appendChild(modal);

  modal.querySelector('#shift-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const data = {
      name: modal.querySelector('#shift-name').value,
      code: modal.querySelector('#shift-code').value.toUpperCase(),
      startTime: modal.querySelector('#start-time').value,
      endTime: modal.querySelector('#end-time').value,
      breakDuration: parseInt(modal.querySelector('#break-dur').value),
      graceTime: parseInt(modal.querySelector('#grace-time').value),
      color: modal.querySelector('#shift-color').value,
      isOff: modal.querySelector('#is-off').checked
    };

    if (shift) {
      shiftService.updateShift(shift.id, data);
    } else {
      shiftService.addShift(data);
    }

    document.body.removeChild(modal);
    // Refresh view
    const content = document.querySelector('#shift-content');
    if (content) renderShiftDefinitions(content);
  });

  modal.querySelector('#cancel-modal').addEventListener('click', () => {
    document.body.removeChild(modal);
  });
}

window.editShift = (id) => {
  showShiftModal(id);
};
