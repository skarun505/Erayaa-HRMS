import { reportService } from '../core/report.js';
import { authService } from '../core/auth.js';

export function renderReportDashboard() {
    const container = document.createElement('div');
    container.innerHTML = `
        <div class="page-header flex justify-between items-center printable-header">
            <div>
                <h1 class="page-title">Reports & Analytics</h1>
                <p class="page-subtitle">Visual Insights and Data Export</p>
            </div>
            <div class="flex gap-2 printable-hide">
                <button class="btn btn-secondary" onclick="window.print()">🖨️ Print Report</button>
                <button class="btn btn-primary" onclick="window.exportFullStats()">💾 Export All</button>
            </div>
        </div>

        <div class="grid grid-2 mb-6">
            <!-- Attendance Trends -->
            <div class="card">
                <div class="flex justify-between items-center mb-4">
                    <h3>Attendance Trends (Last 7 Days)</h3>
                    <button class="btn btn-sm btn-secondary" id="export-attendance">CSV</button>
                </div>
                <div id="attendance-chart" class="chart-container" style="height: 200px; display: flex; align-items: flex-end; gap: 10px; padding-top: 20px;">
                    <!-- SVG/CSS Bar Chart will be injected here -->
                </div>
            </div>

            <!-- Headcount by Department -->
            <div class="card">
                <h3 class="mb-4">Headcount by Department</h3>
                <div id="dept-distribution" class="space-y-3">
                    <!-- Progress bars for distribution -->
                </div>
            </div>
        </div>

        <div class="grid grid-3 mb-6">
            <!-- Payroll Distribution -->
            <div class="card">
                <h3 class="mb-4">Monthly Payroll Split</h3>
                <div id="payroll-stats"></div>
            </div>

            <!-- Leave Utilization -->
            <div class="card">
                <h3 class="mb-4">Leave Utilization Rate</h3>
                <div id="leave-stats"></div>
            </div>

            <!-- Diversity -->
            <div class="card">
                <h3 class="mb-4">Gender Diversity</h3>
                <div id="diversity-stats" class="flex items-center justify-center p-4">
                    <!-- Donut-like CSS chart -->
                </div>
            </div>
        </div>
    `;

    // Load Data
    setTimeout(() => {
        loadAttendanceChart(container);
        loadDeptDistribution(container);
        loadPayrollStats(container);
        loadLeaveStats(container);
        loadDiversityStats(container);

        container.querySelector('#export-attendance').addEventListener('click', () => {
            const data = reportService.getAttendanceTrends();
            reportService.exportToCSV(data, 'attendance_trends');
        });
    }, 0);

    return container;
}

function loadAttendanceChart(container) {
    const trends = reportService.getAttendanceTrends();
    const chart = container.querySelector('#attendance-chart');
    const max = Math.max(...trends.map(t => t.present + t.absent), 1);

    chart.innerHTML = trends.map(t => `
        <div style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: 5px;">
            <div style="width: 100%; display: flex; flex-direction: column-reverse; height: 150px; background: #f1f5f9; border-radius: 4px; overflow: hidden;">
                <div style="height: ${(t.present / max) * 100}%; background: var(--primary); transition: height 0.5s;" title="Present: ${t.present}"></div>
                <div style="height: ${(t.late / max) * 100}%; background: var(--warning); opacity: 0.7;" title="Late: ${t.late}"></div>
            </div>
            <span class="text-xs text-muted">${t.label}</span>
        </div>
    `).join('');
}

function loadDeptDistribution(container) {
    const stats = reportService.getHeadcountStats();
    const target = container.querySelector('#dept-distribution');
    const total = stats.active;

    target.innerHTML = Object.entries(stats.byDepartment).map(([dept, count]) => `
        <div>
            <div class="flex justify-between text-xs mb-1">
                <span>${dept}</span>
                <span>${count} (${Math.round((count / total) * 100)}%)</span>
            </div>
            <div class="progress-bar">
                <div class="progress" style="width: ${(count / total) * 100}%"></div>
            </div>
        </div>
    `).join('');
}

function loadPayrollStats(container) {
    const dist = reportService.getPayrollDistribution();
    const target = container.querySelector('#payroll-stats');
    const total = dist.reduce((sum, item) => sum + item.amount, 0);

    target.innerHTML = dist.map(item => `
        <div class="flex justify-between items-center mb-2 text-sm">
            <span class="text-muted"><span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:var(--primary); margin-right:5px;"></span>${item.dept}</span>
            <span class="font-medium">₹${item.amount.toLocaleString()}</span>
        </div>
    `).join('') + `
        <div class="border-t pt-2 mt-2 flex justify-between font-bold">
            <span>Total Monthly</span>
            <span>₹${total.toLocaleString()}</span>
        </div>
    `;
}

function loadLeaveStats(container) {
    const stats = reportService.getLeaveUtilization();
    const target = container.querySelector('#leave-stats');

    target.innerHTML = Object.entries(stats).map(([type, data]) => {
        const rate = data.assigned > 0 ? Math.round((data.used / data.assigned) * 100) : 0;
        return `
            <div class="mb-4">
                <div class="flex justify-between text-xs mb-1">
                    <span class="font-medium">${type.toUpperCase()} Utilization</span>
                    <span>${rate}%</span>
                </div>
                <div class="progress-bar" style="height: 6px;">
                    <div class="progress" style="width: ${rate}%; background: ${rate > 80 ? 'var(--danger)' : 'var(--success)'}"></div>
                </div>
            </div>
        `;
    }).join('');
}

function loadDiversityStats(container) {
    const stats = reportService.getDiversityStats();
    const target = container.querySelector('#diversity-stats');
    const total = stats.male + stats.female + stats.other || 1;

    const maleP = Math.round((stats.male / total) * 100);
    const femaleP = Math.round((stats.female / total) * 100);

    target.innerHTML = `
        <div class="text-center">
            <div style="font-size: 2.5rem; font-weight: bold; color: var(--primary);">${femaleP}%</div>
            <div class="text-sm text-muted">Female Representation</div>
            <div class="flex gap-4 mt-4 text-xs">
                <span><span style="display:inline-block; width:10px; height:10px; background:var(--primary); border-radius:2px;"></span> Male: ${maleP}%</span>
                <span><span style="display:inline-block; width:10px; height:10px; background:#e2e8f0; border-radius:2px;"></span> Female: ${femaleP}%</span>
            </div>
        </div>
    `;
}

// Global export function
window.exportFullStats = () => {
    const attendance = reportService.getAttendanceTrends();
    const headcount = reportService.getHeadcountStats();
    const payroll = reportService.getPayrollDistribution();
    const leaves = reportService.getLeaveUtilization();
    const diversity = reportService.getDiversityStats();

    const exportData = [
        { section: 'ATTENDANCE TRENDS' },
        ...attendance.map(a => ({ date: a.date, present: a.present, absent: a.absent, late: a.late })),
        { section: '' },
        { section: 'HEADCOUNT SUMMARY' },
        { metric: 'Total Employees', value: headcount.total },
        { metric: 'Active Employees', value: headcount.active },
        { metric: 'Exited Employees', value: headcount.exited },
        { section: '' },
        { section: 'DEPARTMENT DISTRIBUTION' },
        ...Object.entries(headcount.byDepartment).map(([dept, count]) => ({ department: dept, count })),
        { section: '' },
        { section: 'PAYROLL DISTRIBUTION' },
        ...payroll.map(p => ({ department: p.dept, amount: p.amount })),
        { section: '' },
        { section: 'LEAVE UTILIZATION' },
        { type: 'CL', assigned: leaves.cl.assigned, used: leaves.cl.used },
        { type: 'PL', assigned: leaves.pl.assigned, used: leaves.pl.used },
        { type: 'SL', assigned: leaves.sl.assigned, used: leaves.sl.used },
        { section: '' },
        { section: 'DIVERSITY STATS' },
        { category: 'Male', count: diversity.male },
        { category: 'Female', count: diversity.female },
        { category: 'Other', count: diversity.other }
    ];

    reportService.exportToCSV(exportData, 'hrms_full_report');
    alert('Full report exported successfully! 📊');
};
