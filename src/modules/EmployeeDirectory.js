import { employeeService } from '../core/employee.js';
import { companyService } from '../core/company.js';

export function renderEmployeeDirectory() {
    const container = document.createElement('div');

    container.innerHTML = `
    <div class="page-header flex justify-between items-center">
      <div>
        <h1 class="page-title">Employee Directory</h1>
        <p class="page-subtitle">Manage employee records and lifecycle</p>
      </div>
      <button class="btn btn-primary" id="add-employee-btn">+ Add Employee</button>
    </div>

    <!-- Filters -->
    <div class="card mb-6">
      <div class="grid grid-4">
        <div class="form-group">
          <label>Search</label>
          <input type="text" id="search-input" placeholder="Search by name, ID, email..." />
        </div>
        <div class="form-group">
          <label>Department</label>
          <select id="dept-filter">
            <option value="">All Departments</option>
            ${getDepartmentOptions()}
          </select>
        </div>
        <div class="form-group">
          <label>Status</label>
          <select id="status-filter">
            <option value="">All Status</option>
            <option value="draft">Draft</option>
            <option value="active">Active</option>
            <option value="notice_period">Notice Period</option>
            <option value="exited">Exited</option>
          </select>
        </div>
        <div class="form-group">
          <label>Role</label>
          <select id="role-filter">
            <option value="">All Roles</option>
            <option value="employee">Employee</option>
            <option value="manager">Manager</option>
            <option value="hr_admin">HR Admin</option>
            <option value="super_admin">Super Admin</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Employee Stats -->
    <div class="grid grid-4 mb-6">
      <div class="card stat-card">
        <div class="stat-value" id="total-count">0</div>
        <div class="stat-label">Total Employees</div>
      </div>
      <div class="card stat-card">
        <div class="stat-value" id="active-count">0</div>
        <div class="stat-label">Active</div>
      </div>
      <div class="card stat-card">
        <div class="stat-value" id="draft-count">0</div>
        <div class="stat-label">Pending Activation</div>
      </div>
      <div class="card stat-card">
        <div class="stat-value" id="notice-count">0</div>
        <div class="stat-label">Notice Period</div>
      </div>
    </div>

    <!-- Employee List -->
    <div class="card">
      <div id="employee-list"></div>
    </div>
  `;

    // Render initial list
    renderEmployeeList(container);
    updateStats(container);

    // Search handler
    const searchInput = container.querySelector('#search-input');
    searchInput.addEventListener('input', () => {
        if (searchInput.value.length >= 2) {
            const results = employeeService.searchEmployees(searchInput.value);
            renderEmployeeTable(container, results);
        } else {
            renderEmployeeList(container);
        }
    });

    // Filter handlers
    ['dept-filter', 'status-filter', 'role-filter'].forEach(filterId => {
        const filter = container.querySelector(`#${filterId}`);
        filter.addEventListener('change', () => {
            const filters = {
                department: container.querySelector('#dept-filter').value,
                status: container.querySelector('#status-filter').value,
                role: container.querySelector('#role-filter').value
            };
            const filtered = employeeService.getEmployees(filters);
            renderEmployeeTable(container, filtered);
            updateStats(container);
        });
    });

    // Add employee button
    const addBtn = container.querySelector('#add-employee-btn');
    addBtn.addEventListener('click', () => {
        showAddEmployeeModal();
    });

    return container;
}

function renderEmployeeList(container) {
    const employees = employeeService.getEmployees();
    renderEmployeeTable(container, employees);
}

function renderEmployeeTable(container, employees) {
    const listContainer = container.querySelector('#employee-list');

    if (employees.length === 0) {
        listContainer.innerHTML = '<p class="text-muted text-center p-8">No employees found</p>';
        return;
    }

    const table = document.createElement('table');
    table.innerHTML = `
    <thead>
      <tr>
        <th>Employee ID</th>
        <th>Name</th>
        <th>Email</th>
        <th>Department</th>
        <th>Designation</th>
        <th>Status</th>
        <th>Joining Date</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      ${employees.map(emp => `
        <tr>
          <td class="font-medium">${emp.employeeId}</td>
          <td>${emp.name}</td>
          <td class="text-sm">${emp.email}</td>
          <td>${emp.department || '-'}</td>
          <td>${emp.designation || '-'}</td>
          <td>${getStatusBadge(emp.status)}</td>
          <td>${emp.joiningDate ? new Date(emp.joiningDate).toLocaleDateString('en-IN') : '-'}</td>
          <td>
            <button class="btn btn-secondary text-sm" style="padding: 0.25rem 0.75rem;" onclick="window.viewEmployee('${emp.id}')">View</button>
          </td>
        </tr>
      `).join('')}
    </tbody>
  `;

    listContainer.innerHTML = '';
    listContainer.appendChild(table);
}

function getStatusBadge(status) {
    const badges = {
        draft: '<span class="badge badge-warning">Draft</span>',
        active: '<span class="badge badge-success">Active</span>',
        notice_period: '<span class="badge badge-warning">Notice Period</span>',
        exited: '<span class="badge badge-danger">Exited</span>'
    };
    return badges[status] || status;
}

function updateStats(container) {
    const all = employeeService.getEmployees();
    const active = all.filter(e => e.status === 'active');
    const draft = all.filter(e => e.status === 'draft');
    const notice = all.filter(e => e.status === 'notice_period');

    container.querySelector('#total-count').textContent = all.length;
    container.querySelector('#active-count').textContent = active.length;
    container.querySelector('#draft-count').textContent = draft.length;
    container.querySelector('#notice-count').textContent = notice.length;
}

function getDepartmentOptions() {
    const departments = companyService.getDepartments();
    return departments.map(d => `<option value="${d.name}">${d.name}</option>`).join('');
}

function showAddEmployeeModal() {
    const modal = document.createElement('div');
    modal.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); padding: 2rem; overflow-y: auto; z-index: 1000;';

    modal.innerHTML = `
    <div class="card" style="max-width: 600px; margin: 2rem auto;">
      <h3 class="mb-4">Add New Employee</h3>
      <form id="add-employee-form">
        <div class="grid grid-2">
          <div class="form-group">
            <label>Full Name *</label>
            <input type="text" id="emp-name" required />
          </div>
          <div class="form-group">
            <label>Email *</label>
            <input type="email" id="emp-email" required />
          </div>
        </div>

        <div class="grid grid-2">
          <div class="form-group">
            <label>Mobile</label>
            <input type="tel" id="emp-mobile" />
          </div>
          <div class="form-group">
            <label>Date of Birth</label>
            <input type="date" id="emp-dob" />
          </div>
        </div>

        <div class="grid grid-2">
          <div class="form-group">
            <label>Department *</label>
            <select id="emp-dept" required>
              <option value="">Select Department</option>
              ${getDepartmentOptions()}
            </select>
          </div>
          <div class="form-group">
            <label>Designation *</label>
            <select id="emp-designation" required>
              <option value="">Select Designation</option>
              ${getDesignationOptions()}
            </select>
          </div>
        </div>

        <div class="grid grid-2">
          <div class="form-group">
            <label>Role *</label>
            <select id="emp-role" required>
              <option value="employee">Employee</option>
              <option value="manager">Manager</option>
              <option value="hr_admin">HR Admin</option>
            </select>
          </div>
          <div class="form-group">
            <label>Joining Date *</label>
            <input type="date" id="emp-joining" required />
          </div>
        </div>

        <div class="form-group">
          <label>Monthly CTC (Gross Salary)</label>
          <input type="number" id="emp-ctc" placeholder="e.g., 35000" />
        </div>

        <div class="form-group">
          <label>Address</label>
          <textarea id="emp-address" rows="2"></textarea>
        </div>

        <div class="flex gap-2">
          <button type="submit" class="btn btn-primary">Add Employee</button>
          <button type="button" class="btn btn-secondary" id="cancel-btn">Cancel</button>
        </div>
      </form>
    </div>
  `;

    document.body.appendChild(modal);

    // Handle form submission
    const form = modal.querySelector('#add-employee-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const employeeData = {
            name: modal.querySelector('#emp-name').value,
            email: modal.querySelector('#emp-email').value,
            mobile: modal.querySelector('#emp-mobile').value,
            dateOfBirth: modal.querySelector('#emp-dob').value,
            department: modal.querySelector('#emp-dept').value,
            designation: modal.querySelector('#emp-designation').value,
            role: modal.querySelector('#emp-role').value,
            joiningDate: modal.querySelector('#emp-joining').value,
            monthlyCTC: parseInt(modal.querySelector('#emp-ctc').value) || 0,
            address: modal.querySelector('#emp-address').value
        };

        const newEmployee = employeeService.addEmployee(employeeData);

        document.body.removeChild(modal);
        alert(`Employee created successfully!\n\nEmployee ID: ${newEmployee.employeeId}\nTemp Password: ${newEmployee.tempPassword}\n\nPlease note down the temporary password.`);
        location.reload();
    });

    // Cancel button
    modal.querySelector('#cancel-btn').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
}

function getDesignationOptions() {
    const designations = companyService.getDesignations();
    return designations.map(d => `<option value="${d.name}">${d.name}</option>`).join('');
}

// Global view function
window.viewEmployee = (id) => {
    const employee = employeeService.getEmployee(id);
    if (employee) {
        // Navigate to employee detail page
        window.dispatchEvent(new CustomEvent('navigate-employee', { detail: { employeeId: id } }));
    }
};
