import { performanceService } from '../core/performance.js';
import { authService } from '../core/auth.js';
import { employeeService } from '../core/employee.js';

export function renderPerformanceDashboard() {
    const container = document.createElement('div');
    const currentUser = authService.getCurrentUser();
    const isHROrAdmin = currentUser.role === 'hr_admin' || currentUser.role === 'super_admin';

    container.innerHTML = `
        <div class="page-header">
            <h1 class="page-title">Performance Management</h1>
            <p class="page-subtitle">Track goals, appraisals, and professional growth</p>
        </div>

        <div class="grid grid-3 mb-6" id="performance-stats">
            <!-- Stats will be loaded here -->
        </div>

        <nav class="nav mb-6" style="background: var(--bg-secondary); padding: 0.5rem; border-radius: 8px;">
            <button class="nav-item active" data-tab="goals">My Goals</button>
            ${currentUser.role === 'manager' || isHROrAdmin ? '<button class="nav-item" data-tab="team-goals">Team Goals</button>' : ''}
            <button class="nav-item" data-tab="reviews">Reviews & Appraisals</button>
            ${isHROrAdmin ? '<button class="nav-item" data-tab="admin">Admin Panel</button>' : ''}
        </nav>

        <div id="performance-content">
            <!-- Content will be dynamic -->
        </div>
    `;

    const contentArea = container.querySelector('#performance-content');
    const navItems = container.querySelectorAll('.nav-item');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
            renderTab(item.dataset.tab, contentArea, currentUser, isHROrAdmin);
        });
    });

    // Initial Load
    loadStats(container, currentUser.userId);
    renderTab('goals', contentArea, currentUser, isHROrAdmin);

    return container;
}

function loadStats(container, userId) {
    const stats = performanceService.getPerformanceStats(userId);
    const statsContainer = container.querySelector('#performance-stats');

    statsContainer.innerHTML = `
        <div class="card stat-card">
            <div class="stat-value">${stats.totalGoals}</div>
            <div class="stat-label">Active Goals</div>
        </div>
        <div class="card stat-card">
            <div class="stat-value">${Math.round(stats.avgProgress)}%</div>
            <div class="stat-label">Avg. Goal Progress</div>
        </div>
        <div class="card stat-card">
            <div class="stat-value">${stats.latestReview ? stats.latestReview.finalScore + '/5' : 'N/A'}</div>
            <div class="stat-label">Latest Rating</div>
        </div>
    `;
}

function renderTab(tab, container, user, isAdmin) {
    container.innerHTML = '';

    if (tab === 'goals') {
        renderGoals(container, user.userId);
    } else if (tab === 'team-goals') {
        renderTeamGoals(container, user.userId);
    } else if (tab === 'reviews') {
        renderReviews(container, user);
    } else if (tab === 'admin') {
        renderAdminPanel(container);
    }
}

function renderTeamGoals(container, managerId) {
    const reportees = employeeService.getEmployees().filter(e => {
        const mgr = employeeService.getEmployees().find(m => m.id === managerId);
        return e.manager === mgr?.name && e.id !== managerId;
    });

    container.innerHTML = `
        <div class="card">
            <h3 class="mb-4">My Team's Goals</h3>
            ${reportees.length === 0 ? '<p class="text-muted p-4 text-center">No team members found.</p>' : ''}
            <div class="space-y-6">
                ${reportees.map(emp => {
        const goals = performanceService.getGoals(emp.id);
        return `
                        <div class="p-4 rounded border" style="background: var(--bg-secondary);">
                            <div class="flex justify-between items-center mb-3">
                                <strong>${emp.name} (${emp.designation})</strong>
                                <span class="text-xs text-muted">${goals.length} Goals</span>
                            </div>
                            <div class="space-y-2">
                                ${goals.length === 0 ? '<div class="text-xs text-muted">No goals set.</div>' : goals.map(g => `
                                    <div class="flex justify-between items-center text-sm p-2 bg-white rounded shadow-sm">
                                        <span>${g.title}</span>
                                        <div class="flex items-center gap-2">
                                            <div class="progress-bar" style="width: 100px; height: 6px;">
                                                <div class="progress" style="width: ${g.progress}%"></div>
                                            </div>
                                            <span class="text-xs font-bold">${g.progress}%</span>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    `;
    }).join('')}
            </div>
        </div>
    `;
}

function renderGoals(container, userId) {
    const goals = performanceService.getGoals(userId);

    container.innerHTML = `
        <div class="card">
            <div class="flex justify-between items-center mb-4">
                <h3>My Performance Goals</h3>
                <button class="btn btn-primary btn-sm" onclick="window.showAddGoalModal()">+ Add New Goal</button>
            </div>
            <div class="list-container">
                ${goals.length === 0 ? '<p class="text-muted p-4 text-center">No goals set yet.</p>' : ''}
                ${goals.map(goal => `
                    <div class="card mb-3" style="background: var(--bg-secondary); border-left: 4px solid var(--primary);">
                        <div class="flex justify-between items-start">
                            <div>
                                <h4 class="mb-1">${goal.title}</h4>
                                <p class="text-sm text-muted mb-2">${goal.description}</p>
                                <div class="flex gap-4 text-xs">
                                    <span><strong>Category:</strong> ${goal.category}</span>
                                    <span><strong>Due:</strong> ${new Date(goal.targetDate).toLocaleDateString()}</span>
                                    <span><strong>Weight:</strong> ${goal.weight}%</span>
                                </div>
                            </div>
                            <div class="text-right">
                                <div class="font-medium mb-1">${goal.progress}% Done</div>
                                <input type="range" value="${goal.progress}" min="0" max="100" 
                                    onchange="window.updateGoalProgress('${goal.id}', this.value)">
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function renderReviews(container, user) {
    const reviews = performanceService.getReviews({ employeeId: user.userId });

    container.innerHTML = `
        <div class="card">
            <h3 class="mb-4">Appraisal Records</h3>
            ${reviews.length === 0 ? '<p class="text-muted p-4 text-center">No review cycles found for you.</p>' : ''}
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Cycle Name</th>
                            <th>Status</th>
                            <th>Score</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${reviews.map(rev => `
                            <tr>
                                <td>${performanceService.getCycles().find(c => c.id === rev.cycleId)?.name || rev.cycleId}</td>
                                <td><span class="badge ${getStatusBadgeClass(rev.status)}">${rev.status.replace(/_/g, ' ')}</span></td>
                                <td><strong>${rev.finalScore || '-'}</strong></td>
                                <td>
                                    ${rev.status === 'in_self_assessment' ?
            `<button class="btn btn-sm btn-primary" onclick="window.takeAssessment('${rev.id}', 'self')">Self Assess</button>` :
            `<button class="btn btn-sm btn-secondary" onclick="window.viewReview('${rev.id}')">View Details</button>`
        }
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

function renderAdminPanel(container) {
    const cycles = performanceService.getCycles();
    const reviews = performanceService.getReviews();

    container.innerHTML = `
        <div class="grid grid-2 gap-4">
            <div class="card">
                <h3>Cycle Management</h3>
                <div class="mt-4">
                    ${cycles.map(c => `
                        <div class="mb-3 p-3 rounded" style="background: var(--bg-secondary);">
                            <div class="font-medium">${c.name}</div>
                            <div class="text-xs text-muted">Status: ${c.status} | End: ${c.endDate}</div>
                            <button class="btn btn-sm btn-secondary mt-2" onclick="window.initiateCycle('${c.id}')">Bulk Initiate</button>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="card">
                <h3>Manager Reviews Pending</h3>
                <div class="mt-4">
                    ${reviews.filter(r => r.status === 'in_manager_assessment').map(r => `
                        <div class="mb-2 p-2 border-b flex justify-between items-center text-sm">
                            <span>${r.employeeName}</span>
                            <button class="btn btn-sm btn-primary" onclick="window.takeAssessment('${r.id}', 'manager')">Complete Review</button>
                        </div>
                    `).join('') || '<p class="text-muted">No pending manager assessments.</p>'}
                </div>
            </div>
        </div>
    `;
}

function getStatusBadgeClass(status) {
    switch (status) {
        case 'completed': return 'badge-success';
        case 'in_self_assessment': return 'badge-primary';
        case 'in_manager_assessment': return 'badge-warning';
        default: return 'badge-secondary';
    }
}

// Global functions for actions
window.showAddGoalModal = () => {
    const title = prompt('Goal Title:');
    if (!title) return;
    const desc = prompt('Goal Description:');
    const date = prompt('Target Date (YYYY-MM-DD):', '2025-06-30');

    performanceService.createGoal({
        employeeId: authService.getCurrentUser().userId,
        title,
        description: desc,
        targetDate: date
    });
    // Force refresh the dashboard
    window.location.reload();
};

window.updateGoalProgress = (id, val) => {
    performanceService.updateGoal(id, { progress: parseInt(val) });
};

window.initiateCycle = (cycleId) => {
    const emps = employeeService.getEmployees({ status: 'active' });
    let count = 0;
    emps.forEach(emp => {
        const res = performanceService.initiateReview(emp.id, cycleId);
        if (res.success) count++;
    });
    alert(`Initiated ${count} reviews!`);
    window.location.reload();
};

window.takeAssessment = (id, role) => {
    // Simplified assessment for demo - usually a complex modal or page
    const rating = prompt('Enter Rating (1-5):', '4');
    const comments = prompt('Enter Comments:');

    if (rating) {
        // Mocking section ratings for simplicity
        const ratings = {
            tech_skills: parseInt(rating),
            delivery: parseInt(rating),
            soft_skills: parseInt(rating),
            values: parseInt(rating)
        };
        performanceService.submitAssessment(id, role, { ratings, comments });
        alert('Assessment submitted!');
        window.location.reload();
    }
};

window.viewReview = (id) => {
    const reviews = performanceService.getReviews();
    const rev = reviews.find(r => r.id === id);
    alert(`
        Review Status: ${rev.status}
        Final Score: ${rev.finalScore} / 5
        Self Comments: ${rev.employeeComments}
        Manager Comments: ${rev.managerComments}
    `);
};
