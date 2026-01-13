import { db } from '../core/database.js';
import { authService } from '../core/auth.js';
import { employeeService } from '../core/employee.js';
import { leaveService } from '../core/leave.js';
import { payrollService } from '../core/payroll.js';

// Exit Management & FnF Service
class ExitService {
    constructor() {
        this.initializeExitSettings();
    }

    initializeExitSettings() {
        if (!db.get('exit_reasons')) {
            db.set('exit_reasons', [
                'Resignation - Better Opportunity',
                'Resignation - Personal Reasons',
                'Resignation - Higher Studies',
                'Termination - Performance',
                'Termination - Policy Violation',
                'Retirement',
                'Absconding'
            ]);
        }

        if (!db.get('clearance_checkpoints')) {
            db.set('clearance_checkpoints', [
                { id: 'it', department: 'IT', items: ['Laptop/Assets Returned', 'Email Access Revoked', 'Software Licenses'] },
                { id: 'admin', department: 'Admin', items: ['ID Card Returned', 'Access Keys/Tokens', 'Storage Keys'] },
                { id: 'finance', department: 'Finance', items: ['No Pending Loans', 'Expense Reimbursements Cleared', 'Travel Advances'] },
                { id: 'library', department: 'Library', items: ['Books/Resource Cards'] }
            ]);
        }
    }

    // --- Resignation Flow ---

    submitResignation(employeeId, data) {
        const exits = db.get('employee_exits') || [];

        // Check if already resigned
        const existing = exits.find(e => e.employeeId === employeeId && e.status !== 'cancelled' && e.status !== 'completed');
        if (existing) return { success: false, message: 'An active resignation already exists for this employee.' };

        const employee = employeeService.getEmployee(employeeId);
        if (!employee) return { success: false, message: 'Employee not found.' };

        // Calculate Last Working Day (LWD) based on notice period
        const noticePeriodDays = employee.noticePeriod || 30;
        const resignationDate = new Date();
        const lwd = new Date(resignationDate);
        lwd.setDate(lwd.getDate() + noticePeriodDays);

        const newExit = {
            id: 'EXIT' + Date.now(),
            employeeId,
            employeeName: employee.name,
            resignationDate: resignationDate.toISOString(),
            requestedLWD: data.requestedLWD || lwd.toISOString().split('T')[0],
            reason: data.reason,
            personalEmail: data.personalEmail || '',
            status: 'pending_approval', // pending_approval, approved (clearance starts), rejected, cancelled, completed
            clearance: this.initializeClearance(),
            fnf: null,
            comments: data.comments || ''
        };

        exits.push(newExit);
        db.set('employee_exits', exits);
        this.logAction('resignation_submitted', employeeId, `Requested LWD: ${newExit.requestedLWD}`);
        return { success: true, exit: newExit };
    }

    initializeClearance() {
        const checkpoints = db.get('clearance_checkpoints');
        const clearance = {};
        checkpoints.forEach(cp => {
            clearance[cp.id] = {
                department: cp.department,
                status: 'pending', // pending, cleared
                items: cp.items.map(name => ({ name, status: 'pending' })),
                clearedBy: null,
                clearedAt: null,
                comments: ''
            };
        });
        return clearance;
    }

    getExitProcess(employeeId) {
        const exits = db.get('employee_exits') || [];
        return exits.find(e => e.employeeId === employeeId && e.status !== 'cancelled');
    }

    getAllExitProcesses() {
        return db.get('employee_exits') || [];
    }

    updateExitStatus(exitId, status, approverComments = '') {
        const exits = db.get('employee_exits') || [];
        const index = exits.findIndex(e => e.id === exitId);
        if (index === -1) return { success: false, message: 'Exit process not found.' };

        exits[index].status = status;
        if (approverComments) exits[index].approverComments = approverComments;

        if (status === 'approved') {
            exits[index].approvalDate = new Date().toISOString();
        }

        db.set('employee_exits', exits);
        return { success: true };
    }

    // --- Clearance Management ---

    updateClearanceItem(exitId, deptId, itemIndex, status, clearedBy) {
        const exits = db.get('employee_exits') || [];
        const index = exits.findIndex(e => e.id === exitId);
        if (index === -1) return;

        exits[index].clearance[deptId].items[itemIndex].status = status;

        // Check if all items in dept are cleared
        const allCleared = exits[index].clearance[deptId].items.every(i => i.status === 'cleared');
        if (allCleared) {
            exits[index].clearance[deptId].status = 'cleared';
            exits[index].clearance[deptId].clearedBy = clearedBy;
            exits[index].clearance[deptId].clearedAt = new Date().toISOString();
        } else {
            exits[index].clearance[deptId].status = 'pending';
        }

        db.set('employee_exits', exits);
    }

    // --- FnF Calculation ---

    calculateFnF(exitId) {
        const exits = db.get('employee_exits') || [];
        const index = exits.findIndex(e => e.id === exitId);
        if (index === -1) return null;

        const exit = exits[index];
        const employee = employeeService.getEmployee(exit.employeeId);
        if (!employee) return null;

        // 1. Current Month Salary (Pro-rated)
        const lwd = new Date(exit.requestedLWD);
        const daysWorkedThisMonth = lwd.getDate();
        const monthlyGross = employee.salaryStructure?.gross || 0;
        const unpaidSalary = Math.round((monthlyGross / 30) * daysWorkedThisMonth);

        // 2. Leave Encashment (Simplified: PL Balance * per day salary)
        const balance = leaveService.getLeaveBalance(employee.id);
        const plBalance = balance?.pl?.remaining || 0;
        const basic = employee.salaryStructure?.basic || 0;
        const perDayBasic = basic / 30;
        const leaveEncashment = Math.round(plBalance * perDayBasic);

        // 3. Deductions
        const recoveryNotice = 0; // Notice period buyous etc.
        const pendingLoans = 0;

        const totalEarnings = unpaidSalary + leaveEncashment;
        const totalDeductions = recoveryNotice + pendingLoans;
        const netFnF = totalEarnings - totalDeductions;

        const fnfData = {
            unpaidSalary,
            leaveEncashment,
            totalEarnings,
            totalDeductions,
            netFnF,
            calculatedAt: new Date().toISOString()
        };

        exits[index].fnf = fnfData;
        db.set('employee_exits', exits);
        return fnfData;
    }

    completeExit(exitId) {
        const exits = db.get('employee_exits') || [];
        const index = exits.findIndex(e => e.id === exitId);
        if (index === -1) return { success: false };

        const exit = exits[index];

        // Update employee status to 'exited'
        employeeService.updateEmployee(exit.employeeId, { status: 'exited' });

        exits[index].status = 'completed';
        exits[index].completedAt = new Date().toISOString();
        db.set('employee_exits', exits);

        this.logAction('exit_completed', exit.employeeId, `Full and Final payment processed.`);
        return { success: true };
    }

    logAction(action, userId, details) {
        authService.logAudit(action, userId, details);
    }
}

export const exitService = new ExitService();
