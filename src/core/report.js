import { db } from '../core/database.js';
import { employeeService } from './employee.js';
import { biometricService } from './biometric.js';
import { leaveService } from './leave.js';
import { payrollService } from './payroll.js';

class ReportService {
    // 1. Headcount Analytics
    getHeadcountStats() {
        const employees = employeeService.getEmployees();
        const stats = {
            total: employees.length,
            active: employees.filter(e => e.status === 'active').length,
            exited: employees.filter(e => e.status === 'exited').length,
            byDepartment: {},
            byDesignation: {}
        };

        employees.forEach(emp => {
            if (emp.status === 'active') {
                stats.byDepartment[emp.department] = (stats.byDepartment[emp.department] || 0) + 1;
                stats.byDesignation[emp.designation] = (stats.byDesignation[emp.designation] || 0) + 1;
            }
        });

        return stats;
    }

    // 2. Attendance Trends (Last 7 Days)
    getAttendanceTrends() {
        const trends = [];
        const now = new Date();

        for (let i = 6; i >= 0; i--) {
            const date = new Date(now);
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];

            const records = biometricService.getAttendance({ startDate: dateStr, endDate: dateStr });
            const activeEmps = employeeService.getEmployees({ status: 'active' }).length;

            trends.push({
                date: dateStr,
                label: date.toLocaleDateString('en-US', { weekday: 'short' }),
                present: records.filter(r => r.status === 'present').length,
                absent: activeEmps - records.filter(r => r.status === 'present').length,
                late: records.filter(r => r.isLate).length
            });
        }
        return trends;
    }

    // 3. Payroll Distribution
    getPayrollDistribution() {
        const employees = employeeService.getEmployees({ status: 'active' });
        const distribution = {};

        employees.forEach(emp => {
            const dept = emp.department || 'Other';
            const salary = emp.salaryStructure?.gross || 0;
            distribution[dept] = (distribution[dept] || 0) + salary;
        });

        return Object.entries(distribution).map(([dept, amount]) => ({ dept, amount }));
    }

    // 4. Leave Utilization
    getLeaveUtilization() {
        const employees = employeeService.getEmployees({ status: 'active' });
        const stats = {
            cl: { assigned: 0, used: 0 },
            pl: { assigned: 0, used: 0 },
            sl: { assigned: 0, used: 0 }
        };

        employees.forEach(emp => {
            if (emp.leavePolicy) {
                Object.keys(stats).forEach(type => {
                    if (emp.leavePolicy[type]) {
                        stats[type].assigned += (emp.leavePolicy[type].entitlement || 0);
                        stats[type].used += (emp.leavePolicy[type].used || 0);
                    }
                });
            }
        });

        return stats;
    }

    // 5. Gender Diversity (if gender field exists, else mock/skip)
    getDiversityStats() {
        const employees = employeeService.getEmployees({ status: 'active' });
        const stats = {
            male: employees.filter(e => e.gender === 'Male').length,
            female: employees.filter(e => e.gender === 'Female').length,
            other: employees.filter(e => e.gender === 'Other').length
        };
        return stats;
    }

    // Export Data Helper
    exportToCSV(data, filename) {
        if (data.length === 0) return;

        const headers = Object.keys(data[0]);
        const rows = data.map(obj => headers.map(header => `"${obj[header]}"`).join(','));
        const csvContent = [headers.join(','), ...rows].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${filename}_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
    }
}

export const reportService = new ReportService();
