import { db } from '../core/database.js';
import { authService } from '../core/auth.js';
import { employeeService } from '../core/employee.js';

class ShiftService {
    constructor() {
        this.initializeShifts();
    }

    // Initialize default shifts
    initializeShifts() {
        if (!db.get('shifts')) {
            db.set('shifts', [
                {
                    id: 'GS',
                    name: 'General Shift',
                    code: 'GS',
                    startTime: '09:00',
                    endTime: '18:00',
                    breakDuration: 60, // minutes
                    graceTime: 15, // minutes
                    halfDayHours: 4,
                    fullDayHours: 8,
                    isDefault: true,
                    color: '#3b82f6'
                },
                {
                    id: 'MS',
                    name: 'Morning Shift',
                    code: 'MS',
                    startTime: '06:00',
                    endTime: '14:00',
                    breakDuration: 30,
                    graceTime: 10,
                    halfDayHours: 4,
                    fullDayHours: 8,
                    isDefault: false,
                    color: '#10b981'
                },
                {
                    id: 'ES',
                    name: 'Evening Shift',
                    code: 'ES',
                    startTime: '14:00',
                    endTime: '22:00',
                    breakDuration: 30,
                    graceTime: 10,
                    halfDayHours: 4,
                    fullDayHours: 8,
                    isDefault: false,
                    color: '#f59e0b'
                },
                {
                    id: 'NS',
                    name: 'Night Shift',
                    code: 'NS',
                    startTime: '22:00',
                    endTime: '06:00',
                    breakDuration: 45,
                    graceTime: 15,
                    halfDayHours: 4,
                    fullDayHours: 8,
                    isDefault: false,
                    color: '#6366f1'
                },
                {
                    id: 'WO',
                    name: 'Weekly Off',
                    code: 'WO',
                    startTime: null,
                    endTime: null,
                    isOff: true,
                    color: '#94a3b8'
                }
            ]);
        }
    }

    // Get all shifts
    getShifts() {
        return db.get('shifts') || [];
    }

    // Get single shift
    getShift(id) {
        const shifts = this.getShifts();
        return shifts.find(s => s.id === id);
    }

    // Add new shift
    addShift(shiftData) {
        const shifts = this.getShifts();

        // Generate ID
        const newId = 'S' + String(shifts.length + 1).padStart(3, '0');

        const newShift = {
            id: newId,
            ...shiftData,
            createdAt: new Date().toISOString()
        };

        shifts.push(newShift);
        db.set('shifts', shifts);

        this.logAction('shift_created', `Shift ${shiftData.name} created`);

        return newShift;
    }

    // Update shift
    updateShift(id, updates) {
        const shifts = this.getShifts();
        const index = shifts.findIndex(s => s.id === id);

        if (index !== -1) {
            shifts[index] = { ...shifts[index], ...updates };
            db.set('shifts', shifts);
            this.logAction('shift_updated', `Shift ${shifts[index].name} updated`);
            return shifts[index];
        }
        return null;
    }

    // Delete shift
    deleteShift(id) {
        const shifts = this.getShifts();
        const filtered = shifts.filter(s => s.id !== id);

        if (filtered.length < shifts.length) {
            db.set('shifts', filtered);
            this.logAction('shift_deleted', `Shift ${id} deleted`);
            return true;
        }
        return false;
    }

    // Assign Roster (Shift Assignment)
    assignRoster(assignments) {
        // assignments = [{ employeeId, date, shiftId }]
        let roster = db.get('roster') || {};

        assignments.forEach(assign => {
            const key = `${assign.employeeId}_${assign.date}`;
            roster[key] = {
                shiftId: assign.shiftId,
                assignedBy: authService.getCurrentUser()?.userId,
                assignedOn: new Date().toISOString()
            };
        });

        db.set('roster', roster);
        this.logAction('roster_updated', `Assigned shifts for ${assignments.length} entries`);
    }

    // Get employee shift for specific date
    getEmployeeShift(employeeId, date) {
        const roster = db.get('roster') || {};
        const key = `${employeeId}_${date}`;
        const assignment = roster[key];

        if (assignment) {
            return this.getShift(assignment.shiftId);
        }

        // Return default shift if no specific assignment
        const shifts = this.getShifts();
        return shifts.find(s => s.isDefault) || shifts[0];
    }

    // Get roster for date range
    getRoster(startDate, endDate, employeeId = null) {
        const roster = db.get('roster') || {};
        const result = [];

        const start = new Date(startDate);
        const end = new Date(endDate);

        for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
            const dateStr = d.toISOString().split('T')[0];

            const employees = employeeId
                ? [employeeService.getEmployee(employeeId)]
                : employeeService.getEmployees({ status: 'active' });

            employees.forEach(emp => {
                if (!emp) return;
                const shift = this.getEmployeeShift(emp.id, dateStr);
                result.push({
                    date: dateStr,
                    employeeId: emp.id,
                    employeeName: emp.name,
                    shift
                });
            });
        }

        return result;
    }

    // Log actions
    logAction(action, details) {
        const session = authService.getCurrentUser();
        if (session) {
            authService.logAudit(action, session.userId, details);
        }
    }
}

export const shiftService = new ShiftService();
