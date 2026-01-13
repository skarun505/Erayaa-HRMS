import { companyService } from '../core/company.js';
import { db } from '../core/database.js';

export function renderOrganization() {
    const container = document.createElement('div');

    container.innerHTML = `
    <div class="page-header flex justify-between items-center">
      <div>
        <h1 class="page-title">Organization Structure</h1>
        <p class="page-subtitle">Manage departments, designations, and hierarchy</p>
      </div>
      <button class="btn btn-primary" id="add-dept-btn">+ Add Department</button>
    </div>

    <!-- Departments Section -->
    <div class="card mb-6">
      <h3 class="mb-4">Departments</h3>
      <div id="departments-list"></div>
    </div>

    <!-- Designations Section -->
    <div class="card">
      <div class="flex justify-between items-center mb-4">
        <h3>Designations</h3>
        <button class="btn btn-primary" id="add-designation-btn">+ Add Designation</button>
      </div>
      <div id="designations-list"></div>
    </div>

    <!-- Add Department Modal -->
    <div id="dept-modal" class="modal" style="display: none;">
      <div class="card" style="max-width: 500px; margin: 2rem auto;">
        <h3 class="mb-4">Add Department</h3>
        <form id="dept-form">
          <div class="form-group">
            <label>Department Name</label>
            <input type="text" id="dept-name" required />
          </div>

          <div class="form-group">
            <label>Department Head (Optional)</label>
            <select id="dept-head">
              <option value="">-- Select Head --</option>
              ${getUserOptions()}
            </select>
          </div>

          <div class="flex gap-2">
            <button type="submit" class="btn btn-primary">Save</button>
            <button type="button" class="btn btn-secondary" id="cancel-dept">Cancel</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Add Designation Modal -->
    <div id="designation-modal" class="modal" style="display: none;">
      <div class="card" style="max-width: 500px; margin: 2rem auto;">
        <h3 class="mb-4">Add Designation</h3>
        <form id="designation-form">
          <div class="form-group">
            <label>Designation Name</label>
            <input type="text" id="designation-name" required />
          </div>

          <div class="form-group">
            <label>Department</label>
            <select id="designation-dept" required>
              <option value="">-- Select Department --</option>
              ${getDepartmentOptions()}
            </select>
          </div>

          <div class="form-group">
            <label>Level</label>
            <select id="designation-level" required>
              <option value="1">Level 1 - Junior</option>
              <option value="2">Level 2 - Mid</option>
              <option value="3">Level 3 - Senior</option>
              <option value="4">Level 4 - Lead/Manager</option>
              <option value="5">Level 5 - Director</option>
            </select>
          </div>

          <div class="flex gap-2">
            <button type="submit" class="btn btn-primary">Save</button>
            <button type="button" class="btn btn-secondary" id="cancel-designation">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  `;

    // Render initial lists
    renderDepartmentsList(container);
    renderDesignationsList(container);

    // Department modal handlers
    const deptModal = container.querySelector('#dept-modal');
    const addDeptBtn = container.querySelector('#add-dept-btn');
    const cancelDeptBtn = container.querySelector('#cancel-dept');
    const deptForm = container.querySelector('#dept-form');

    addDeptBtn.addEventListener('click', () => {
        deptModal.style.display = 'block';
    });

    cancelDeptBtn.addEventListener('click', () => {
        deptModal.style.display = 'none';
        deptForm.reset();
    });

    deptForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = container.querySelector('#dept-name').value;
        const headId = container.querySelector('#dept-head').value || null;

        companyService.addDepartment(name, headId);
        deptModal.style.display = 'none';
        deptForm.reset();
        renderDepartmentsList(container);
        renderDesignationsList(container); // Refresh designations dropdown
    });

    // Designation modal handlers
    const designationModal = container.querySelector('#designation-modal');
    const addDesignationBtn = container.querySelector('#add-designation-btn');
    const cancelDesignationBtn = container.querySelector('#cancel-designation');
    const designationForm = container.querySelector('#designation-form');

    addDesignationBtn.addEventListener('click', () => {
        // Refresh department options
        const deptSelect = designationModal.querySelector('#designation-dept');
        deptSelect.innerHTML = '<option value="">-- Select Department --</option>' + getDepartmentOptions();
        designationModal.style.display = 'block';
    });

    cancelDesignationBtn.addEventListener('click', () => {
        designationModal.style.display = 'none';
        designationForm.reset();
    });

    designationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = container.querySelector('#designation-name').value;
        const level = parseInt(container.querySelector('#designation-level').value);
        const departmentId = container.querySelector('#designation-dept').value;

        companyService.addDesignation(name, level, departmentId);
        designationModal.style.display = 'none';
        designationForm.reset();
        renderDesignationsList(container);
    });

    return container;
}

function renderDepartmentsList(container) {
    const departments = companyService.getDepartments();
    const listContainer = container.querySelector('#departments-list');

    if (departments.length === 0) {
        listContainer.innerHTML = '<p class="text-muted">No departments added yet</p>';
        return;
    }

    const table = document.createElement('table');
    table.innerHTML = `
    <thead>
      <tr>
        <th>Department Name</th>
        <th>Department ID</th>
        <th>Status</th>
        <th>Created Date</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      ${departments.map(dept => `
        <tr>
          <td class="font-medium">${dept.name}</td>
          <td>${dept.id}</td>
          <td><span class="badge badge-success">${dept.status}</span></td>
          <td>${new Date(dept.createdAt).toLocaleDateString()}</td>
          <td>
            <button class="btn btn-secondary text-sm" style="padding: 0.25rem 0.75rem;" onclick="alert('Edit: ${dept.id}')">Edit</button>
            <button class="btn btn-secondary text-sm" style="padding: 0.25rem 0.75rem; color: var(--danger);" onclick="if(confirm('Delete ${dept.name}?')) { window.deleteDepartment('${dept.id}') }">Delete</button>
          </td>
        </tr>
      `).join('')}
    </tbody>
  `;

    listContainer.innerHTML = '';
    listContainer.appendChild(table);
}

function renderDesignationsList(container) {
    const designations = companyService.getDesignations();
    const departments = companyService.getDepartments();
    const listContainer = container.querySelector('#designations-list');

    if (designations.length === 0) {
        listContainer.innerHTML = '<p class="text-muted">No designations added yet</p>';
        return;
    }

    const table = document.createElement('table');
    table.innerHTML = `
    <thead>
      <tr>
        <th>Designation</th>
        <th>Department</th>
        <th>Level</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      ${designations.map(des => {
        const dept = departments.find(d => d.id === des.departmentId);
        return `
          <tr>
            <td class="font-medium">${des.name}</td>
            <td>${dept?.name || 'N/A'}</td>
            <td>Level ${des.level}</td>
            <td><span class="badge badge-success">${des.status}</span></td>
            <td>
              <button class="btn btn-secondary text-sm" style="padding: 0.25rem 0.75rem;" onclick="alert('Edit: ${des.id}')">Edit</button>
              <button class="btn btn-secondary text-sm" style="padding: 0.25rem 0.75rem; color: var(--danger);" onclick="if(confirm('Delete ${des.name}?')) { window.deleteDesignation('${des.id}') }">Delete</button>
            </td>
          </tr>
        `;
    }).join('')}
    </tbody>
  `;

    listContainer.innerHTML = '';
    listContainer.appendChild(table);
}

function getUserOptions() {
    const users = db.get('users') || [];
    return users.map(u => `<option value="${u.id}">${u.name} (${u.employeeId})</option>`).join('');
}

function getDepartmentOptions() {
    const departments = companyService.getDepartments();
    return departments.map(d => `<option value="${d.id}">${d.name}</option>`).join('');
}

// Global delete functions for demonstration
window.deleteDepartment = (id) => {
    companyService.deleteDepartment(id);
    location.reload(); // Simple reload for demo
};

window.deleteDesignation = (id) => {
    companyService.deleteDesignation(id);
    location.reload(); // Simple reload for demo
};
