import { db } from '../core/database.js';
import { authService } from '../core/auth.js';
import { employeeService } from '../core/employee.js';
import { notificationService } from '../core/notification.js';

// Leave Management Service
class LeaveService {
    constructor() {
        this.initializeLeaveTypes();
    }

    // Initialize leave types
    initializeLeaveTypes() {
        if (!db.get('leave_types')) {
            db.set('leave_types', [
                {
                    id: 'CL',
                    name: 'Casual Leave',
                    shortName: 'CL',
                    color: '#3b82f6',
                    requiresApproval: true,
                    maxConsecutive: 3,
                    advanceNoticeDays: 0,
                    canCarryForward: true,
                    encashable: false
                },
                {
                    id: 'PL',
                    name: 'Privilege Leave',
                    shortName: 'PL',
                    color: '#10b981',
                    requiresApproval: true,
                    maxConsecutive: 10,
                    advanceNoticeDays: 3,
                    canCarryForward: true,
                    encashable: true
                },
                {
                    id: 'SL',
                    name: 'Sick Leave',
                    shortName: 'SL',
                    color: '#f59e0b',
                    requiresApproval: true,
                    maxConsecutive: 7,
                    advanceNoticeDays: 0,
                    canCarryForward: false,
                    encashable: false
                }
            ]);
        }
    }

    // Get leave types
    getLeaveTypes() {
        return db.get('leave_types') || [];
    }

    // Get employee leave balance
    getLeaveBalance(employeeId) {
        const employee = employeeService.getEmployee(employeeId);
        if (!employee || !employee.leavePolicy) {
            return null;
        }

        return employee.leavePolicy;
    }

    // Apply for leave
    applyLeave(leaveData) {
        const { employeeId, leaveType, startDate, endDate, reason, isHalfDay } = leaveData;

        // Validate employee
        const employee = employeeService.getEmployee(employeeId);
        if (!employee) {
            return { success: false, message: 'Employee not found' };
        }

        // Validate leave balance
        const balance = this.getLeaveBalance(employeeId);
        if (!balance) {
            return { success: false, message: 'Leave policy not assigned' };
        }

        // Calculate number of days
        const days = isHalfDay ? 0.5 : this.calculateLeaveDays(startDate, endDate);

        // Check if sufficient balance
        const leaveTypeKey = leaveType.toLowerCase();
        if (!balance[leaveTypeKey]) {
            return { success: false, message: 'Invalid leave type' };
        }

        if (balance[leaveTypeKey].remaining < days) {
            return { success: false, message: `Insufficient ${leaveType} balance. Available: ${balance[leaveTypeKey].remaining} days` };
        }

        // Create leave request
        const leaveRequests = db.get('leave_requests') || [];
        const newRequest = {
            id: 'LR' + String(leaveRequests.length + 1).padStart(4, '0'),
            employeeId,
            employeeName: employee.name,
            leaveType,
            startDate,
            endDate,
            days,
            isHalfDay,
            reason: reason || '',
            status: 'pending', // pending, approved, rejected, cancelled
            appliedOn: new Date().toISOString(),
            approvedBy: null,
            approvedOn: null,
            rejectionReason: null,
            salaryImpact: this.calculateSalaryImpact(employee, leaveType, days)
        };

        leaveRequests.push(newRequest);
        db.set('leave_requests', leaveRequests);

        this.logAction('leave_applied', `${employee.name} applied for ${days} days ${leaveType}`);

        // Notify Admins
        const admins = employeeService.getEmployees({ role: 'hr_admin' });
        admins.forEach(admin => {
            notificationService.notify(admin.id, 'New Leave Application', `${employee.name} has applied for ${days} days of ${leaveType}.`, 'info');
        });

        return { success: true, request: newRequest };
    }

    // Calculate leave days (excluding weekends)
    calculateLeaveDays(startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        let days = 0;

        const current = new Date(start);
        while (current <= end) {
            const dayOfWeek = current.getDay();
            // Skip Sundays (0) and Saturdays (6) - adjust based on company working days
            if (dayOfWeek !== 0 && dayOfWeek !== 6) {
                days++;
            }
            current.setDate(current.getDate() + 1);
        }

        return days;
    }

    // Calculate salary impact
    calculateSalaryImpact(employee, leaveType, days) {
        // No salary impact if leave is available
        // Only calculate if going into unpaid leave
        const balance = this.getLeaveBalance(employee.id);
        if (!balance) return { unpaidDays: 0, deduction: 0 };

        const leaveTypeKey = leaveType.toLowerCase();
        const remaining = balance[leaveTypeKey]?.remaining || 0;

        if (remaining >= days) {
            return {
                unpaidDays: 0,
                deduction: 0,
                message: 'No salary impact - leave available'
            };
        } else {
            const unpaidDays = days - remaining;
            const monthlySalary = employee.salaryStructure?.gross || 0;
            const perDaySalary = monthlySalary / 30;
            const deduction = Math.round(perDaySalary * unpaidDays);

            return {
                unpaidDays,
                deduction,
                message: `${unpaidDays} days unpaid. Deduction: ₹${deduction}`
            };
        }
    }

    // Get leave requests
    getLeaveRequests(filters = {}) {
        let requests = db.get('leave_requests') || [];

        if (filters.employeeId) {
            requests = requests.filter(r => r.employeeId === filters.employeeId);
        }

        if (filters.status) {
            requests = requests.filter(r => r.status === filters.status);
        }

        if (filters.approverId) {
            // Get employees who report to this manager
            const employees = employeeService.getEmployees();
            const manager = employees.find(e => e.id === filters.approverId);
            if (manager) {
                const teamMembers = employees.filter(e => e.manager === manager.name);
                const teamIds = teamMembers.map(e => e.id);
                requests = requests.filter(r => teamIds.includes(r.employeeId));
            }
        }

        // Sort by applied date descending
        requests.sort((a, b) => new Date(b.appliedOn) - new Date(a.appliedOn));

        return requests;
    }

    // Approve leave
    approveLeave(requestId, approverId) {
        const requests = db.get('leave_requests') || [];
        const index = requests.findIndex(r => r.id === requestId);

        if (index === -1) {
            return { success: false, message: 'Leave request not found' };
        }

        const request = requests[index];

        if (request.status !== 'pending') {
            return { success: false, message: 'Leave request already processed' };
        }

        // Update request status
        const approver = employeeService.getEmployee(approverId);
        requests[index].status = 'approved';
        requests[index].approvedBy = approver?.name || approverId;
        requests[index].approvedOn = new Date().toISOString();

        db.set('leave_requests', requests);

        // Deduct from leave balance
        this.deductLeaveBalance(request.employeeId, request.leaveType, request.days);

        this.logAction('leave_approved', `Leave request ${requestId} approved by ${approver?.name}`);

        // Notify Employee
        notificationService.notify(request.employeeId, 'Leave Approved ✅', `Your ${request.leaveType} for ${request.days} days has been approved.`, 'success');

        return { success: true, request: requests[index] };
    }

    // Reject leave
    rejectLeave(requestId, approverId, reason) {
        const requests = db.get('leave_requests') || [];
        const index = requests.findIndex(r => r.id === requestId);

        if (index === -1) {
            return { success: false, message: 'Leave request not found' };
        }

        const request = requests[index];

        if (request.status !== 'pending') {
            return { success: false, message: 'Leave request already processed' };
        }

        const approver = employeeService.getEmployee(approverId);
        requests[index].status = 'rejected';
        requests[index].approvedBy = approver?.name || approverId;
        requests[index].approvedOn = new Date().toISOString();
        requests[index].rejectionReason = reason;

        db.set('leave_requests', requests);

        this.logAction('leave_rejected', `Leave request ${requestId} rejected by ${approver?.name}`);

        return { success: true, request: requests[index] };
    }

    // Deduct leave balance
    deductLeaveBalance(employeeId, leaveType, days) {
        const employee = employeeService.getEmployee(employeeId);
        if (!employee || !employee.leavePolicy) return;

        const leaveTypeKey = leaveType.toLowerCase();
        if (employee.leavePolicy[leaveTypeKey]) {
            employee.leavePolicy[leaveTypeKey].used += days;
            employee.leavePolicy[leaveTypeKey].remaining -= days;

            employeeService.updateEmployee(employeeId, {
                leavePolicy: employee.leavePolicy
            });
        }
    }

    // Cancel leave request
    cancelLeave(requestId, employeeId) {
        const requests = db.get('leave_requests') || [];
        const index = requests.findIndex(r => r.id === requestId);

        if (index === -1) {
            return { success: false, message: 'Leave request not found' };
        }

        const request = requests[index];

        if (request.employeeId !== employeeId) {
            return { success: false, message: 'Unauthorized' };
        }

        if (request.status === 'approved') {
            // Credit back the leave balance
            this.creditLeaveBalance(request.employeeId, request.leaveType, request.days);
        }

        requests[index].status = 'cancelled';
        db.set('leave_requests', requests);

        this.logAction('leave_cancelled', `Leave request ${requestId} cancelled`);

        return { success: true, request: requests[index] };
    }

    // Credit leave balance
    creditLeaveBalance(employeeId, leaveType, days) {
        const employee = employeeService.getEmployee(employeeId);
        if (!employee || !employee.leavePolicy) return;

        const leaveTypeKey = leaveType.toLowerCase();
        if (employee.leavePolicy[leaveTypeKey]) {
            employee.leavePolicy[leaveTypeKey].used -= days;
            employee.leavePolicy[leaveTypeKey].remaining += days;

            employeeService.updateEmployee(employeeId, {
                leavePolicy: employee.leavePolicy
            });
        }
    }

    // Get leave statistics
    getLeaveStatistics(month, year) {
        const startDate = `${year}-${String(month).padStart(2, '0')}-01`;
        const endDate = new Date(year, month, 0);
        const endDateStr = endDate.toISOString().split('T')[0];

        const requests = db.get('leave_requests') || [];
        const monthRequests = requests.filter(r =>
            r.startDate >= startDate && r.startDate <= endDateStr
        );

        return {
            total: monthRequests.length,
            pending: monthRequests.filter(r => r.status === 'pending').length,
            approved: monthRequests.filter(r => r.status === 'approved').length,
            rejected: monthRequests.filter(r => r.status === 'rejected').length,
            totalDays: monthRequests
                .filter(r => r.status === 'approved')
                .reduce((sum, r) => sum + r.days, 0)
        };
    }

    // Log actions
    logAction(action, details) {
        const session = authService.getCurrentUser();
        if (session) {
            authService.logAudit(action, session.userId, details);
        }
    }
}

export const leaveService = new LeaveService();
