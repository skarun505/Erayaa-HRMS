import { db } from '../core/database.js';
import { authService } from '../core/auth.js';
import { employeeService } from '../core/employee.js';
import { shiftService } from '../core/shift.js';

// Biometric Device Integration Service
class BiometricService {
    constructor() {
        this.initializeDeviceConfig();
    }

    // Initialize device configuration
    initializeDeviceConfig() {
        if (!db.get('biometric_config')) {
            db.set('biometric_config', {
                ip: '192.168.1.201',
                port: 4370,
                timeout: 10000,
                deviceId: 1,
                syncInterval: 15, // minutes
                autoSync: true
            });
        }
    }

    // ... (rest of configuration and parser methods remain same)

    // Process single attendance log
    async processAttendanceLog(log) {
        // Find employee
        const employees = employeeService.getEmployees();
        const employee = employees.find(e => e.employeeId === log.employeeId);

        if (!employee) {
            return { success: false, message: 'Employee not found' };
        }

        // Parse timestamp
        const timestamp = new Date(log.timestamp);
        if (isNaN(timestamp.getTime())) {
            return { success: false, message: 'Invalid timestamp' };
        }

        const date = timestamp.toISOString().split('T')[0];
        const time = timestamp.toTimeString().split(' ')[0].substring(0, 5);

        // Get Employee Shift for this day
        const shift = shiftService.getEmployeeShift(employee.id, date);

        // Get or create attendance record for the day
        const attendanceRecords = db.get('attendance') || {};
        const dayKey = `${employee.id}_${date}`;

        let record = attendanceRecords[dayKey] || {
            employeeId: employee.id,
            employeeName: employee.name,
            date,
            inTime: null,
            outTime: null,
            breakLogs: [],
            status: 'absent',
            workingHours: 0,
            isLate: false,
            isEarlyCheckout: false,
            overtimeHours: 0,
            source: 'biometric',
            deviceId: log.deviceId,
            shiftId: shift.id,
            shiftName: shift.name
        };

        // Update based on punch type
        if (log.status === 0) { // Check-in
            if (!record.inTime) {
                record.inTime = time;
                record.status = 'present';

                // Check if late based on SHIFT timing
                if (shift && shift.startTime) {
                    const [workHour, workMin] = shift.startTime.split(':').map(Number);
                    const graceMinutes = shift.graceTime || 15;

                    const gracePeriod = new Date(timestamp);
                    gracePeriod.setHours(workHour, workMin + graceMinutes, 0);

                    record.isLate = timestamp > gracePeriod; // Late if punched after grace time
                }
            }
        } else if (log.status === 1) { // Check-out
            record.outTime = time;

            // Calculate working hours
            if (record.inTime) {
                const workingHours = this.calculateWorkingHours(record.inTime, time, record.breakLogs);
                record.workingHours = workingHours;

                // Check overtime (if > shift full day hours + 1 hour buffer maybe? or just > full day hours)
                // Let's use 9 hours as standard or shift duration
                const shiftDuration = shift.fullDayHours || 9;
                if (workingHours > shiftDuration) {
                    record.overtimeHours = workingHours - shiftDuration;
                }

                // Check early checkout based on SHIFT timing
                if (shift && shift.endTime) {
                    const [endHour, endMin] = shift.endTime.split(':').map(Number);
                    const expectedEnd = new Date(timestamp);
                    expectedEnd.setHours(endHour, endMin, 0);

                    // Allow 5 mins buffer for early checkout maybe? Or stricter.
                    // Let's strictly check if punch is before end time.
                    record.isEarlyCheckout = timestamp < expectedEnd;
                }
            }
        }

        // Save record
        attendanceRecords[dayKey] = record;
        db.set('attendance', attendanceRecords);

        return { success: true, record };
    }

    // Calculate working hours
    calculateWorkingHours(inTime, outTime, breakLogs = []) {
        const [inH, inM] = inTime.split(':').map(Number);
        const [outH, outM] = outTime.split(':').map(Number);

        const inMinutes = inH * 60 + inM;
        const outMinutes = outH * 60 + outM;

        let totalMinutes = outMinutes - inMinutes;

        // Subtract break time
        for (const breakLog of breakLogs) {
            if (breakLog.start && breakLog.end) {
                const [bsH, bsM] = breakLog.start.split(':').map(Number);
                const [beH, beM] = breakLog.end.split(':').map(Number);
                const breakMinutes = (beH * 60 + beM) - (bsH * 60 + bsM);
                totalMinutes -= breakMinutes;
            }
        }

        return Math.round((totalMinutes / 60) * 100) / 100;
    }

    // Get attendance records
    getAttendance(filters = {}) {
        const records = db.get('attendance') || {};
        let attendanceArray = Object.values(records);

        // Apply filters
        if (filters.employeeId) {
            attendanceArray = attendanceArray.filter(r => r.employeeId === filters.employeeId);
        }
        if (filters.startDate) {
            attendanceArray = attendanceArray.filter(r => r.date >= filters.startDate);
        }
        if (filters.endDate) {
            attendanceArray = attendanceArray.filter(r => r.date <= filters.endDate);
        }
        if (filters.status) {
            attendanceArray = attendanceArray.filter(r => r.status === filters.status);
        }

        // Sort by date descending
        attendanceArray.sort((a, b) => new Date(b.date) - new Date(a.date));

        return attendanceArray;
    }

    // Get attendance summary for employee
    getAttendanceSummary(employeeId, month = null, year = null) {
        const now = new Date();
        const targetMonth = month || now.getMonth() + 1;
        const targetYear = year || now.getFullYear();

        const startDate = `${targetYear}-${String(targetMonth).padStart(2, '0')}-01`;
        const endDate = new Date(targetYear, targetMonth, 0);
        const endDateStr = endDate.toISOString().split('T')[0];

        const records = this.getAttendance({
            employeeId,
            startDate,
            endDate: endDateStr
        });

        const summary = {
            totalDays: records.length,
            present: records.filter(r => r.status === 'present').length,
            absent: records.filter(r => r.status === 'absent').length,
            late: records.filter(r => r.isLate).length,
            halfDay: records.filter(r => r.workingHours > 0 && r.workingHours < 4).length,
            totalWorkingHours: records.reduce((sum, r) => sum + (r.workingHours || 0), 0),
            overtimeHours: records.reduce((sum, r) => sum + (r.overtimeHours || 0), 0),
            averageWorkingHours: 0
        };

        if (summary.present > 0) {
            summary.averageWorkingHours = Math.round((summary.totalWorkingHours / summary.present) * 100) / 100;
        }

        return summary;
    }

    // Generate sample biometric data for testing
    generateSampleData(employeeIds, days = 7) {
        const data = [];
        const now = new Date();

        for (let i = 0; i < days; i++) {
            const date = new Date(now);
            date.setDate(date.getDate() - i);

            // Skip weekends
            if (date.getDay() === 0 || date.getDay() === 6) continue;

            for (const empId of employeeIds) {
                // Random check-in time between 8:45 and 9:30
                const inHour = 9;
                const inMin = Math.floor(Math.random() * 45) - 15; // -15 to 30 minutes
                const inTime = `${String(inHour).padStart(2, '0')}:${String(Math.max(0, Math.min(59, inMin))).padStart(2, '0')}:00`;

                // Random check-out time between 17:30 and 18:30
                const outHour = 18;
                const outMin = Math.floor(Math.random() * 60) - 30;
                const outTime = `${String(outHour).padStart(2, '0')}:${String(Math.max(0, Math.min(59, outMin))).padStart(2, '0')}:00`;

                const dateStr = date.toISOString().split('T')[0];

                // Check-in
                data.push(`${empId},${dateStr} ${inTime},0,Device1`);
                // Check-out
                data.push(`${empId},${dateStr} ${outTime},1,Device1`);
            }
        }

        return data.join('\n');
    }

    // Log actions
    logAction(action, details) {
        const session = authService.getCurrentUser();
        if (session) {
            authService.logAudit(action, session.userId, details);
        }
    }
}

export const biometricService = new BiometricService();
