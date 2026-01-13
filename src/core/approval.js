import { db } from '../core/database.js';
import { authService } from '../core/auth.js';
import { leaveService } from '../core/leave.js';
import { employeeService } from '../core/employee.js';
import { notificationService } from '../core/notification.js';

// Approval Service - Centralized approval management
class ApprovalService {
    constructor() {
        this.initializeApprovals();
    }

    // Initialize approval settings
    initializeApprovals() {
        if (!db.get('approval_settings')) {
            db.set('approval_settings', {
                leaveApprovalLevels: 1, // Number of approval levels
                autoApproveThreshold: 0, // Auto-approve leaves <= this many days (0 = disabled)
                escalationEnabled: true,
                escalationDays: 3, // Escalate if not approved in X days
                allowDelegation: true
            });
        }
    }

    // Get all pending approvals for a specific approver (manager/HR)
    getPendingApprovals(approverId) {
        const approver = employeeService.getEmployee(approverId);
        if (!approver) return [];

        const approvals = [];

        // Get leave approvals
        const leaveApprovals = this.getLeaveApprovals(approverId, approver.role);
        approvals.push(...leaveApprovals);

        // Get attendance correction approvals (if any)
        const attendanceApprovals = this.getAttendanceApprovals(approverId);
        approvals.push(...attendanceApprovals);

        // Sort by date (newest first)
        approvals.sort((a, b) => new Date(b.requestedOn) - new Date(a.requestedOn));

        return approvals;
    }

    // Get leave approvals for manager/HR
    getLeaveApprovals(approverId, role) {
        const approvals = [];
        let leaveRequests = [];

        if (role === 'hr_admin' || role === 'super_admin') {
            // HR/Admin sees all pending requests
            leaveRequests = leaveService.getLeaveRequests({ status: 'pending' });
        } else if (role === 'manager') {
            // Managers see requests from their reportees
            const reportees = this.getReportees(approverId);
            leaveRequests = leaveService.getLeaveRequests({ status: 'pending' });
            leaveRequests = leaveRequests.filter(req =>
                reportees.some(r => r.id === req.employeeId)
            );
        }

        leaveRequests.forEach(req => {
            const employee = employeeService.getEmployee(req.employeeId);
            approvals.push({
                id: req.id,
                type: 'leave',
                title: `Leave Request - ${req.leaveType}`,
                employee: employee ? employee.name : 'Unknown',
                employeeId: req.employeeId,
                requestedOn: req.appliedOn,
                details: {
                    leaveType: req.leaveType,
                    startDate: req.startDate,
                    endDate: req.endDate,
                    days: req.days,
                    isHalfDay: req.isHalfDay,
                    reason: req.reason,
                    salaryImpact: req.salaryImpact
                },
                priority: this.calculatePriority(req),
                urgency: this.getUrgency(req.startDate),
                data: req
            });
        });

        return approvals;
    }

    // Get attendance correction approvals
    getAttendanceApprovals(approverId) {
        const approvals = [];
        const corrections = db.get('attendance_corrections') || [];
        const pendingCorrections = corrections.filter(c => c.status === 'pending');

        pendingCorrections.forEach(correction => {
            const employee = employeeService.getEmployee(correction.employeeId);
            approvals.push({
                id: correction.id,
                type: 'attendance_correction',
                title: 'Attendance Correction Request',
                employee: employee ? employee.name : 'Unknown',
                employeeId: correction.employeeId,
                requestedOn: correction.requestedOn,
                details: {
                    date: correction.date,
                    currentInTime: correction.currentInTime,
                    currentOutTime: correction.currentOutTime,
                    requestedInTime: correction.requestedInTime,
                    requestedOutTime: correction.requestedOutTime,
                    reason: correction.reason
                },
                priority: 'medium',
                urgency: 'normal',
                data: correction
            });
        });

        return approvals;
    }

    // Get reportees for a manager
    getReportees(managerId) {
        const allEmployees = employeeService.getEmployees({ status: 'active' });
        return allEmployees.filter(emp => emp.managerId === managerId);
    }

    // Calculate priority based on various factors
    calculatePriority(request) {
        // High priority: >3 days or starting soon
        const daysRequested = request.days || 0;
        const daysUntilStart = this.getDaysUntilStart(request.startDate);

        if (daysRequested > 5 || daysUntilStart <= 2) {
            return 'high';
        } else if (daysRequested > 2 || daysUntilStart <= 5) {
            return 'medium';
        }
        return 'low';
    }

    // Get urgency based on start date
    getUrgency(startDate) {
        const days = this.getDaysUntilStart(startDate);

        if (days <= 1) return 'urgent';
        if (days <= 3) return 'high';
        if (days <= 7) return 'normal';
        return 'low';
    }

    // Calculate days until start
    getDaysUntilStart(startDate) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);
        const diffTime = start - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    }

    // Approve a request
    approveRequest(approvalId, approverId, comments = '') {
        const approvals = this.getPendingApprovals(approverId);
        const approval = approvals.find(a => a.id === approvalId);

        if (!approval) {
            return { success: false, message: 'Approval request not found' };
        }

        if (approval.type === 'leave') {
            return leaveService.approveLeave(approvalId, approverId, comments);
        } else if (approval.type === 'attendance_correction') {
            return this.approveAttendanceCorrection(approvalId, approverId, comments);
        }

        return { success: false, message: 'Unknown approval type' };
    }

    // Reject a request
    rejectRequest(approvalId, approverId, reason = '') {
        const approvals = this.getPendingApprovals(approverId);
        const approval = approvals.find(a => a.id === approvalId);

        if (!approval) {
            return { success: false, message: 'Approval request not found' };
        }

        if (approval.type === 'leave') {
            return leaveService.rejectLeave(approvalId, approverId, reason);
        } else if (approval.type === 'attendance_correction') {
            return this.rejectAttendanceCorrection(approvalId, approverId, reason);
        }

        return { success: false, message: 'Unknown approval type' };
    }

    // Approve attendance correction
    approveAttendanceCorrection(correctionId, approverId, comments) {
        const corrections = db.get('attendance_corrections') || [];
        const index = corrections.findIndex(c => c.id === correctionId);

        if (index === -1) {
            return { success: false, message: 'Correction request not found' };
        }

        const approver = employeeService.getEmployee(approverId);
        corrections[index].status = 'approved';
        corrections[index].approvedBy = approver?.name || approverId;
        corrections[index].approvedOn = new Date().toISOString();
        corrections[index].approverComments = comments;

        // Apply the correction to attendance
        const attendance = db.get('attendance') || {};
        const key = `${corrections[index].employeeId}_${corrections[index].date}`;

        if (attendance[key]) {
            attendance[key].inTime = corrections[index].requestedInTime;
            attendance[key].outTime = corrections[index].requestedOutTime;
            attendance[key].corrected = true;
            attendance[key].correctionId = correctionId;
            db.set('attendance', attendance);
        }

        db.set('attendance_corrections', corrections);
        this.logAction('attendance_correction_approved', approverId, `Approved correction ${correctionId}`);

        // Notify Employee
        notificationService.notify(corrections[index].employeeId, 'Attendance Corrected ✅', `Your attendance correction for ${corrections[index].date} has been approved.`, 'success');

        return { success: true, message: 'Attendance correction approved' };
    }

    // Reject attendance correction
    rejectAttendanceCorrection(correctionId, approverId, reason) {
        const corrections = db.get('attendance_corrections') || [];
        const index = corrections.findIndex(c => c.id === correctionId);

        if (index === -1) {
            return { success: false, message: 'Correction request not found' };
        }

        const approver = employeeService.getEmployee(approverId);
        corrections[index].status = 'rejected';
        corrections[index].rejectedBy = approver?.name || approverId;
        corrections[index].rejectedOn = new Date().toISOString();
        corrections[index].rejectionReason = reason;

        db.set('attendance_corrections', corrections);
        this.logAction('attendance_correction_rejected', approverId, `Rejected correction ${correctionId}`);

        return { success: true, message: 'Attendance correction rejected' };
    }

    // Submit attendance correction request
    submitAttendanceCorrection(employeeId, date, requestedInTime, requestedOutTime, reason) {
        const corrections = db.get('attendance_corrections') || [];
        const attendance = db.get('attendance') || {};
        const key = `${employeeId}_${date}`;
        const currentRecord = attendance[key];

        const correctionId = 'CORR' + Date.now();

        const correction = {
            id: correctionId,
            employeeId,
            date,
            currentInTime: currentRecord?.inTime || null,
            currentOutTime: currentRecord?.outTime || null,
            requestedInTime,
            requestedOutTime,
            reason,
            status: 'pending',
            requestedOn: new Date().toISOString()
        };

        corrections.push(correction);
        db.set('attendance_corrections', corrections);

        this.logAction('attendance_correction_submitted', employeeId, `Correction request for ${date}`);

        // Notify Admins
        const admins = employeeService.getEmployees({ role: 'hr_admin' });
        admins.forEach(admin => {
            notificationService.notify(admin.id, 'New Correction Request', `Attendance correction requested for ${date}.`, 'warning');
        });

        return { success: true, correctionId };
    }

    // Get approval statistics
    getApprovalStatistics(approverId) {
        const approvals = this.getPendingApprovals(approverId);

        return {
            total: approvals.length,
            byType: {
                leave: approvals.filter(a => a.type === 'leave').length,
                attendance: approvals.filter(a => a.type === 'attendance_correction').length
            },
            byUrgency: {
                urgent: approvals.filter(a => a.urgency === 'urgent').length,
                high: approvals.filter(a => a.urgency === 'high').length,
                normal: approvals.filter(a => a.urgency === 'normal').length,
                low: approvals.filter(a => a.urgency === 'low').length
            },
            byPriority: {
                high: approvals.filter(a => a.priority === 'high').length,
                medium: approvals.filter(a => a.priority === 'medium').length,
                low: approvals.filter(a => a.priority === 'low').length
            }
        };
    }

    // Get approval history
    getApprovalHistory(approverId, limit = 50) {
        const history = [];

        // Get approved/rejected leaves
        const allLeaves = leaveService.getLeaveRequests({ limit: 1000 });
        const processedLeaves = allLeaves.filter(l =>
            (l.status === 'approved' || l.status === 'rejected') &&
            (l.approvedBy === approverId || l.rejectedBy === approverId)
        );

        processedLeaves.forEach(leave => {
            const employee = employeeService.getEmployee(leave.employeeId);
            history.push({
                id: leave.id,
                type: 'leave',
                action: leave.status,
                employee: employee?.name || 'Unknown',
                date: leave.status === 'approved' ? leave.approvedOn : leave.rejectedOn,
                details: `${leave.leaveType} - ${leave.days} day(s)`
            });
        });

        // Get processed attendance corrections
        const corrections = db.get('attendance_corrections') || [];
        const processedCorrections = corrections.filter(c =>
            (c.status === 'approved' || c.status === 'rejected')
        );

        processedCorrections.forEach(corr => {
            const employee = employeeService.getEmployee(corr.employeeId);
            history.push({
                id: corr.id,
                type: 'attendance_correction',
                action: corr.status,
                employee: employee?.name || 'Unknown',
                date: corr.status === 'approved' ? corr.approvedOn : corr.rejectedOn,
                details: `Attendance for ${corr.date}`
            });
        });

        // Sort by date descending
        history.sort((a, b) => new Date(b.date) - new Date(a.date));

        return history.slice(0, limit);
    }

    // Log actions
    logAction(action, userId, details) {
        authService.logAudit(action, userId, details);
    }
}

export const approvalService = new ApprovalService();
