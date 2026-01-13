import { db } from '../core/database.js';
import { authService } from '../core/auth.js';
import { employeeService } from '../core/employee.js';
import { biometricService } from '../core/biometric.js';
import { leaveService } from '../core/leave.js';

// Payroll Engine Service
class PayrollService {
    constructor() {
        this.initializePayrollSettings();
    }

    // Initialize payroll settings
    initializePayrollSettings() {
        if (!db.get('payroll_settings')) {
            db.set('payroll_settings', {
                pfRate: 12, // 12% of basic salary
                esiRate: 0.75, // 0.75% of gross (if gross < 21000)
                esiThreshold: 21000,
                professionalTax: 200, // Fixed per month
                tdsEnabled: false,
                workingDaysPerMonth: 26,
                overtimeRate: 1.5, // 1.5x of hourly rate
                lateDeductionPerDay: 0 // No deduction, just marking
            });
        }
    }

    // Get payroll settings
    getPayrollSettings() {
        return db.get('payroll_settings') || {};
    }

    // Update payroll settings
    updatePayrollSettings(settings) {
        const current = this.getPayrollSettings();
        db.set('payroll_settings', { ...current, ...settings });
        this.logAction('payroll_settings_updated', 'Payroll settings updated');
    }

    // Process monthly payroll for all employees
    async processMonthlyPayroll(month, year) {
        const employees = employeeService.getEmployees({ status: 'active' });
        const results = [];

        for (const employee of employees) {
            try {
                const payslip = await this.calculatePayslip(employee.id, month, year);
                results.push({ success: true, employee: employee.name, payslip });
            } catch (error) {
                results.push({ success: false, employee: employee.name, error: error.message });
            }
        }

        this.logAction('payroll_processed', `Processed payroll for ${month}/${year}`);
        return results;
    }

    // Calculate payslip for single employee
    async calculatePayslip(employeeId, month, year) {
        const employee = employeeService.getEmployee(employeeId);
        if (!employee) {
            throw new Error('Employee not found');
        }

        // Use salaryStructure or construct from salary field or use defaults
        let salary = employee.salaryStructure;
        if (!salary) {
            // Try to get from user.salary or use defaults
            const userSalary = employee.salary || { basic: 25000, hra: 10000, special: 8000 };
            salary = {
                basic: userSalary.basic || 25000,
                hra: userSalary.hra || 10000,
                conveyance: userSalary.conveyance || 1600,
                medicalAllowance: userSalary.medicalAllowance || 1250,
                specialAllowance: userSalary.special || userSalary.specialAllowance || 8000,
                gross: (userSalary.basic || 25000) + (userSalary.hra || 10000) + (userSalary.special || 8000) + 2850
            };
        }

        const settings = this.getPayrollSettings();

        // Get attendance data
        const attendanceSummary = biometricService.getAttendanceSummary(employeeId, month, year);

        // Get leave data
        const leaves = this.getApprovedLeaves(employeeId, month, year);

        // Calculate working days
        const totalDaysInMonth = new Date(year, month, 0).getDate();
        const workingDays = settings.workingDaysPerMonth;
        const presentDays = attendanceSummary.present;
        const absentDays = attendanceSummary.absent;
        const leaveDays = leaves.totalDays;
        const paidLeaveDays = leaves.paidDays;
        const unpaidLeaveDays = leaves.unpaidDays;

        // Effective working days = present + paid leaves
        const effectiveWorkingDays = presentDays + paidLeaveDays;

        // Calculate per day salary
        const perDaySalary = salary.gross / workingDays;

        // Base calculation
        let earnings = {
            basic: salary.basic,
            hra: salary.hra,
            conveyance: salary.conveyance || 0,
            medicalAllowance: salary.medicalAllowance || 0,
            specialAllowance: salary.specialAllowance || 0
        };

        // Overtime earnings
        const overtimeHours = attendanceSummary.overtimeHours || 0;
        const hourlyRate = salary.gross / (workingDays * 8); // Assuming 8 hours/day
        const overtimeEarnings = overtimeHours * hourlyRate * settings.overtimeRate;

        earnings.overtime = Math.round(overtimeEarnings);

        // Calculate gross earnings
        const grossEarnings = Object.values(earnings).reduce((sum, val) => sum + val, 0);

        // Deductions
        let deductions = {
            pf: Math.round(salary.basic * (settings.pfRate / 100)),
            esi: salary.gross < settings.esiThreshold ? Math.round(salary.gross * (settings.esiRate / 100)) : 0,
            professionalTax: settings.professionalTax,
            tds: 0 // TDS calculation can be complex, keeping 0 for now
        };

        // Absence deduction (unpaid days)
        const unpaidDaysTotal = absentDays + unpaidLeaveDays;
        const absenceDeduction = Math.round(unpaidDaysTotal * perDaySalary);
        deductions.absence = absenceDeduction;

        // Late deduction (if configured)
        if (settings.lateDeductionPerDay > 0) {
            deductions.lateMark = attendanceSummary.late * settings.lateDeductionPerDay;
        } else {
            deductions.lateMark = 0;
        }

        // Total deductions
        const totalDeductions = Object.values(deductions).reduce((sum, val) => sum + val, 0);

        // Net salary
        const netSalary = grossEarnings - totalDeductions;

        // Create payslip
        const payslip = {
            id: `PAY${employeeId}_${month}_${year}`,
            employeeId,
            employeeName: employee.name,
            employeeCode: employee.employeeId,
            month,
            year,
            designation: employee.designation,
            department: employee.department,

            // Attendance details
            attendance: {
                totalDays: totalDaysInMonth,
                workingDays,
                presentDays,
                absentDays,
                paidLeaveDays,
                unpaidLeaveDays,
                lateMarks: attendanceSummary.late,
                overtimeHours: overtimeHours.toFixed(2),
                effectiveWorkingDays
            },

            // Earnings breakdown
            earnings,
            grossEarnings,

            // Deductions breakdown
            deductions,
            totalDeductions,

            // Net salary
            netSalary,

            // Status
            status: 'draft', // draft, approved, paid
            processedOn: new Date().toISOString(),
            processedBy: authService.getCurrentUser()?.userId || 'system',
            approvedOn: null,
            approvedBy: null,
            paidOn: null
        };

        // Save payslip
        const payslips = db.get('payslips') || [];
        const existingIndex = payslips.findIndex(p => p.id === payslip.id);

        if (existingIndex !== -1) {
            payslips[existingIndex] = payslip;
        } else {
            payslips.push(payslip);
        }

        db.set('payslips', payslips);

        return payslip;
    }

    // Get approved leaves for month
    getApprovedLeaves(employeeId, month, year) {
        const startDate = `${year}-${String(month).padStart(2, '0')}-01`;
        const endDate = new Date(year, month, 0).toISOString().split('T')[0];

        const requests = leaveService.getLeaveRequests({
            employeeId,
            status: 'approved'
        });

        const monthLeaves = requests.filter(r =>
            r.startDate >= startDate && r.startDate <= endDate
        );

        let paidDays = 0;
        let unpaidDays = 0;

        monthLeaves.forEach(leave => {
            if (leave.salaryImpact && leave.salaryImpact.unpaidDays > 0) {
                unpaidDays += leave.salaryImpact.unpaidDays;
                paidDays += (leave.days - leave.salaryImpact.unpaidDays);
            } else {
                paidDays += leave.days;
            }
        });

        return {
            totalDays: paidDays + unpaidDays,
            paidDays,
            unpaidDays
        };
    }

    // Get payslips
    getPayslips(filters = {}) {
        let payslips = db.get('payslips') || [];

        if (filters.employeeId) {
            payslips = payslips.filter(p => p.employeeId === filters.employeeId);
        }

        if (filters.month) {
            payslips = payslips.filter(p => p.month === filters.month);
        }

        if (filters.year) {
            payslips = payslips.filter(p => p.year === filters.year);
        }

        if (filters.status) {
            payslips = payslips.filter(p => p.status === filters.status);
        }

        // Sort by date descending
        payslips.sort((a, b) => {
            if (b.year !== a.year) return b.year - a.year;
            return b.month - a.month;
        });

        return payslips;
    }

    // Get single payslip
    getPayslip(id) {
        const payslips = db.get('payslips') || [];
        return payslips.find(p => p.id === id);
    }

    // Approve payslip
    approvePayslip(payslipId, approverId) {
        const payslips = db.get('payslips') || [];
        const index = payslips.findIndex(p => p.id === payslipId);

        if (index === -1) {
            return { success: false, message: 'Payslip not found' };
        }

        const approver = employeeService.getEmployee(approverId);
        payslips[index].status = 'approved';
        payslips[index].approvedOn = new Date().toISOString();
        payslips[index].approvedBy = approver?.name || approverId;

        db.set('payslips', payslips);
        this.logAction('payslip_approved', `Payslip ${payslipId} approved`);

        return { success: true, payslip: payslips[index] };
    }

    // Mark as paid
    markAsPaid(payslipId) {
        const payslips = db.get('payslips') || [];
        const index = payslips.findIndex(p => p.id === payslipId);

        if (index === -1) {
            return { success: false, message: 'Payslip not found' };
        }

        payslips[index].status = 'paid';
        payslips[index].paidOn = new Date().toISOString();

        db.set('payslips', payslips);
        this.logAction('payslip_paid', `Payslip ${payslipId} marked as paid`);

        return { success: true, payslip: payslips[index] };
    }

    // Get payroll summary for month
    getPayrollSummary(month, year) {
        const payslips = this.getPayslips({ month, year });

        const summary = {
            totalEmployees: payslips.length,
            totalGross: 0,
            totalDeductions: 0,
            totalNet: 0,
            totalOvertimePaid: 0,
            totalAbsenceDeduction: 0,
            byStatus: {
                draft: 0,
                approved: 0,
                paid: 0
            }
        };

        payslips.forEach(p => {
            summary.totalGross += p.grossEarnings;
            summary.totalDeductions += p.totalDeductions;
            summary.totalNet += p.netSalary;
            summary.totalOvertimePaid += (p.earnings.overtime || 0);
            summary.totalAbsenceDeduction += (p.deductions.absence || 0);
            summary.byStatus[p.status]++;
        });

        return summary;
    }

    // Log actions
    logAction(action, details) {
        const session = authService.getCurrentUser();
        if (session) {
            authService.logAudit(action, session.userId, details);
        }
    }
}

export const payrollService = new PayrollService();
