import { exitService } from '../core/exit.js';
import { authService } from '../core/auth.js';
import { employeeService } from '../core/employee.js';

export function renderExitDashboard() {
    const container = document.createElement('div');
    const currentUser = authService.getCurrentUser();
    const isHROrAdmin = currentUser.role === 'hr_admin' || currentUser.role === 'super_admin';

    const currentExit = exitService.getExitProcess(currentUser.userId);

    container.innerHTML = `
        <div class="page-header">
            <h1 class="page-title">Exit & Separations</h1>
            <p class="page-subtitle">Manage resignation workflows and Full & Final settlements</p>
        </div>

        <div id="exit-main-container">
            ${isHROrAdmin ? renderHRView() : renderEmployeeView(currentExit, currentUser)}
        </div>
    `;

    // Initialize listeners
    setTimeout(() => {
        if (!isHROrAdmin && !currentExit) {
            const form = container.querySelector('#resignation-form');
            if (form) {
                form.addEventListener('submit', (e) => {
                    e.preventDefault();
                    handleResignation(form, currentUser.userId);
                });
            }
        }
    }, 0);

    return container;
}

function renderEmployeeView(currentExit, user) {
    if (!currentExit) {
        return `
            <div class="card max-w-2xl mx-auto">
                <h3 class="mb-4">Submit Resignation</h3>
                <form id="resignation-form">
                    <div class="form-group">
                        <label>Reason for Leaving</label>
                        <select id="reason" required>
                            <option value="">Select a reason</option>
                            <option>Better Opportunity</option>
                            <option>Personal Reasons</option>
                            <option>Higher Studies</option>
                            <option>Relocation</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Requested Last Working Day</label>
                        <input type="date" id="requested-lwd" required min="${new Date().toISOString().split('T')[0]}">
                    </div>
                    <div class="form-group">
                        <label>Personal Email (for FnF communication)</label>
                        <input type="email" id="personal-email" placeholder="e.g. john.doe@icloud.com" required>
                    </div>
                    <div class="form-group">
                        <label>Additional Comments</label>
                        <textarea id="comments" rows="3" placeholder="Explain further..."></textarea>
                    </div>
                    <div class="alert alert-warning text-sm mb-4">
                        <strong>Note:</strong> Your notice period as per policy is ${employeeService.getEmployee(user.userId).noticePeriod || 30} days. 
                        Final LWD will be subject to management approval.
                    </div>
                    <button type="submit" class="btn btn-danger w-full">Submit Resignation</button>
                </form>
            </div>
        `;
    }

    return `
        <div class="grid grid-2 gap-6">
            <div class="card">
                <h3>Resignation Status</h3>
                <div class="mt-4 p-4 rounded" style="background: var(--bg-secondary);">
                    <div class="flex justify-between items-center mb-2">
                        <span class="text-sm text-muted">Current Status:</span>
                        <span class="badge ${getStatusBadge(currentExit.status)}">${currentExit.status.toUpperCase()}</span>
                    </div>
                    <div class="flex justify-between items-center mb-2">
                        <span class="text-sm text-muted">LWD:</span>
                        <span class="font-medium">${currentExit.requestedLWD}</span>
                    </div>
                    <div class="text-xs text-muted mt-2">Submitted on: ${new Date(currentExit.resignationDate).toLocaleDateString()}</div>
                </div>

                ${currentExit.status === 'pending_approval' ? `
                    <button class="btn btn-sm btn-secondary w-full mt-4" onclick="window.withdrawResignation('${currentExit.id}')">Withdraw Resignation</button>
                ` : ''}

                <h3 class="mt-6 mb-4">Department Clearance</h3>
                <div class="clearance-list">
                    ${Object.entries(currentExit.clearance).map(([id, dept]) => `
                        <div class="flex justify-between items-center p-3 mb-2 rounded border">
                            <span>${dept.department} Clearance</span>
                            <span class="badge ${dept.status === 'cleared' ? 'badge-success' : 'badge-secondary'}">${dept.status}</span>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="card">
                <h3>FnF Settlement Detail</h3>
                ${currentExit.status === 'completed' && currentExit.fnf ? `
                    <div class="mt-4">
                        <div class="highlight-box p-4 rounded text-center mb-4" style="background: var(--primary-light); color: var(--primary);">
                            <div class="text-sm">Net Payable Amount</div>
                            <div class="text-3xl font-bold">₹${currentExit.fnf.netFnF.toLocaleString()}</div>
                        </div>
                        <div class="space-y-2 text-sm">
                            <div class="flex justify-between"><span>Unpaid Days Salary:</span> <span>₹${currentExit.fnf.unpaidSalary.toLocaleString()}</span></div>
                            <div class="flex justify-between"><span>Leave Encashment:</span> <span>₹${currentExit.fnf.leaveEncashment.toLocaleString()}</span></div>
                            <div class="flex justify-between border-t pt-2 font-bold"><span>Total Earnings:</span> <span>₹${currentExit.fnf.totalEarnings.toLocaleString()}</span></div>
                        </div>
                    </div>
                ` : `
                    <div class="text-center p-8 text-muted">
                        <div style="font-size: 3rem;">💰</div>
                        <p>FnF details will be visible once clearance is completed and management approves the final amount.</p>
                    </div>
                `}
            </div>
        </div>
    `;
}

function renderHRView() {
    const allExits = exitService.getAllExitProcesses();
    const pendingExits = allExits.filter(e => e.status === 'pending_approval');
    const inProgressExits = allExits.filter(e => e.status === 'approved');

    return `
        <div class="grid grid-3 gap-6">
            <div class="card col-span-2">
                <h3>Pending Resignations</h3>
                <div class="table-container mt-4">
                    <table>
                        <thead>
                            <tr>
                                <th>Employee</th>
                                <th>LWD</th>
                                <th>Reason</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${pendingExits.length === 0 ? '<tr><td colspan="4" class="text-center p-4">No pending requests</td></tr>' : ''}
                            ${pendingExits.map(exit => `
                                <tr>
                                    <td>${exit.employeeName}</td>
                                    <td>${exit.requestedLWD}</td>
                                    <td class="text-xs">${exit.reason}</td>
                                    <td>
                                        <button class="btn btn-sm btn-success" onclick="window.processExitAction('${exit.id}', 'approved')">Approve</button>
                                        <button class="btn btn-sm btn-danger" onclick="window.processExitAction('${exit.id}', 'rejected')">Reject</button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>

                <h3 class="mt-8">Clearance & FnF Management</h3>
                <div class="table-container mt-4">
                    <table>
                        <thead>
                            <tr>
                                <th>Employee</th>
                                <th>Clearance Status</th>
                                <th>FnF Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${inProgressExits.length === 0 ? '<tr><td colspan="4" class="text-center p-4">No exit processes in progress</td></tr>' : ''}
                            ${inProgressExits.map(exit => {
        const clearedCount = Object.values(exit.clearance).filter(c => c.status === 'cleared').length;
        const totalCount = Object.values(exit.clearance).length;
        return `
                                    <tr>
                                        <td>${exit.employeeName}</td>
                                        <td>
                                            <div class="text-xs">${clearedCount}/${totalCount} Cleared</div>
                                            <div class="progress-bar mt-1">
                                                <div class="progress" style="width: ${(clearedCount / totalCount) * 100}%"></div>
                                            </div>
                                        </td>
                                        <td>${exit.fnf ? 'Calculated' : 'Pending'}</td>
                                        <td>
                                            <button class="btn btn-sm btn-secondary" onclick="window.showClearanceModal('${exit.id}')">Update Clearance</button>
                                            <button class="btn btn-sm btn-primary" onclick="window.calculateFnF('${exit.id}')">Calc FnF</button>
                                        </td>
                                    </tr>
                                `;
    }).join('')}
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="card">
                <h3>Quick Stats</h3>
                <div class="space-y-4 mt-4">
                    <div class="p-4 rounded border-l-4 border-warning bg-gray-50">
                        <div class="text-2xl">${pendingExits.length}</div>
                        <div class="text-sm">Pending Resignations</div>
                    </div>
                    <div class="p-4 rounded border-l-4 border-primary bg-gray-50">
                        <div class="text-2xl">${inProgressExits.length}</div>
                        <div class="text-sm">In Clearance Stage</div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function getStatusBadge(status) {
    if (status === 'completed') return 'badge-success';
    if (status === 'approved') return 'badge-primary';
    if (status === 'rejected' || status === 'cancelled') return 'badge-danger';
    return 'badge-warning';
}

// Global actions
window.handleResignation = (form, userId) => {
    const data = {
        reason: form.querySelector('#reason').value,
        requestedLWD: form.querySelector('#requested-lwd').value,
        personalEmail: form.querySelector('#personal-email').value,
        comments: form.querySelector('#comments').value
    };

    const res = exitService.submitResignation(userId, data);
    if (res.success) {
        alert('Resignation submitted successfully.');
        window.location.reload();
    } else {
        alert(res.message);
    }
};

window.withdrawResignation = (id) => {
    if (confirm('Are you sure you want to withdraw your resignation?')) {
        const res = exitService.updateExitStatus(id, 'cancelled', 'User withdrew resignation');
        if (res.success) {
            alert('Resignation withdrawn successfully.');
            window.location.reload();
        }
    }
};

window.processExitAction = (id, status) => {
    const comments = prompt('Any comments for the employee?');
    const res = exitService.updateExitStatus(id, status, comments);
    if (res.success) {
        alert(`Exit request ${status}.`);
        window.location.reload();
    }
};

window.showClearanceModal = (exitId) => {
    const exits = exitService.getAllExitProcesses();
    const exit = exits.find(e => e.id === exitId);

    let html = '<h3>Clearance Status</h3><div class="space-y-4">';
    Object.entries(exit.clearance).forEach(([deptId, dept]) => {
        html += `<div class="p-3 border rounded bg-gray-50">
                    <strong>${dept.department}</strong> - ${dept.status === 'cleared' ? '✅' : '⏳'}
                    <div class="mt-2 text-xs space-y-1">
                        ${dept.items.map((item, idx) => `
                            <div class="flex justify-between">
                                <span>${item.name}</span>
                                <input type="checkbox" ${item.status === 'cleared' ? 'checked' : ''} 
                                    onchange="window.toggleClearanceItem('${exitId}', '${deptId}', ${idx}, this.checked)">
                            </div>
                        `).join('')}
                    </div>
                </div>`;
    });
    html += '<button class="btn btn-secondary w-full mt-4" onclick="location.reload()">Close & Refresh</button></div>';

    const div = document.createElement('div');
    div.className = 'modal-backdrop';
    div.innerHTML = `<div class="card max-w-lg mx-auto mt-20">${html}</div>`;
    document.body.appendChild(div);
};

window.toggleClearanceItem = (exitId, deptId, itemIdx, checked) => {
    const status = checked ? 'cleared' : 'pending';
    const currentUser = authService.getCurrentUser();
    exitService.updateClearanceItem(exitId, deptId, itemIdx, status, currentUser.name);
};

window.calculateFnF = (exitId) => {
    const fnf = exitService.calculateFnF(exitId);
    if (fnf) {
        alert(`FnF calculated. Net Payable: ₹${fnf.netFnF.toLocaleString()}`);
        if (confirm('Directly complete exit and update employee status to EXITED?')) {
            exitService.completeExit(exitId);
        }
        window.location.reload();
    }
};
