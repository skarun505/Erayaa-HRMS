import { db } from '../core/database.js';
import { authService } from '../core/auth.js';

// Company Management Service
class CompanyService {
    constructor() {
        this.initializeDefaults();
    }

    initializeDefaults() {
        // Initialize departments if not exists
        if (!db.get('departments')) {
            db.set('departments', [
                { id: 'DEPT001', name: 'Engineering', headId: null, status: 'active', createdAt: new Date().toISOString() },
                { id: 'DEPT002', name: 'Human Resources', headId: null, status: 'active', createdAt: new Date().toISOString() },
                { id: 'DEPT003', name: 'Finance', headId: null, status: 'active', createdAt: new Date().toISOString() },
                { id: 'DEPT004', name: 'Sales & Marketing', headId: null, status: 'active', createdAt: new Date().toISOString() }
            ]);
        }

        // Initialize designations if not exists
        if (!db.get('designations')) {
            db.set('designations', [
                { id: 'DES001', name: 'Junior Developer', level: 1, departmentId: 'DEPT001', status: 'active' },
                { id: 'DES002', name: 'Senior Developer', level: 2, departmentId: 'DEPT001', status: 'active' },
                { id: 'DES003', name: 'Team Lead', level: 3, departmentId: 'DEPT001', status: 'active' },
                { id: 'DES004', name: 'Engineering Manager', level: 4, departmentId: 'DEPT001', status: 'active' },
                { id: 'DES005', name: 'HR Executive', level: 1, departmentId: 'DEPT002', status: 'active' },
                { id: 'DES006', name: 'HR Manager', level: 2, departmentId: 'DEPT002', status: 'active' }
            ]);
        }

        // Initialize holidays if not exists
        if (!db.get('holidays')) {
            db.set('holidays', [
                { id: 'HOL001', name: 'New Year', date: '2025-01-01', type: 'public', year: 2025 },
                { id: 'HOL002', name: 'Republic Day', date: '2025-01-26', type: 'public', year: 2025 },
                { id: 'HOL003', name: 'Independence Day', date: '2025-08-15', type: 'public', year: 2025 },
                { id: 'HOL004', name: 'Gandhi Jayanti', date: '2025-10-02', type: 'public', year: 2025 },
                { id: 'HOL005', name: 'Diwali', date: '2025-10-23', type: 'public', year: 2025 }
            ]);
        }
    }

    // Company CRUD
    getCompany() {
        return db.get('company');
    }

    updateCompany(data) {
        const company = this.getCompany() || {};
        const updated = { ...company, ...data, updatedAt: new Date().toISOString() };
        db.set('company', updated);
        this.logAction('company_updated', 'Company details updated');
        return updated;
    }

    // Department CRUD
    getDepartments() {
        return db.get('departments') || [];
    }

    getDepartment(id) {
        const departments = this.getDepartments();
        return departments.find(d => d.id === id);
    }

    addDepartment(name, headId = null) {
        const departments = this.getDepartments();
        const newDept = {
            id: 'DEPT' + String(departments.length + 1).padStart(3, '0'),
            name,
            headId,
            status: 'active',
            createdAt: new Date().toISOString()
        };
        departments.push(newDept);
        db.set('departments', departments);
        this.logAction('department_created', `Department ${name} created`);
        return newDept;
    }

    updateDepartment(id, data) {
        const departments = this.getDepartments();
        const index = departments.findIndex(d => d.id === id);
        if (index !== -1) {
            departments[index] = { ...departments[index], ...data, updatedAt: new Date().toISOString() };
            db.set('departments', departments);
            this.logAction('department_updated', `Department ${id} updated`);
            return departments[index];
        }
        return null;
    }

    deleteDepartment(id) {
        const departments = this.getDepartments();
        const filtered = departments.filter(d => d.id !== id);
        db.set('departments', filtered);
        this.logAction('department_deleted', `Department ${id} deleted`);
        return true;
    }

    // Designation CRUD
    getDesignations() {
        return db.get('designations') || [];
    }

    getDesignationsByDepartment(departmentId) {
        return this.getDesignations().filter(d => d.departmentId === departmentId);
    }

    addDesignation(name, level, departmentId) {
        const designations = this.getDesignations();
        const newDes = {
            id: 'DES' + String(designations.length + 1).padStart(3, '0'),
            name,
            level,
            departmentId,
            status: 'active',
            createdAt: new Date().toISOString()
        };
        designations.push(newDes);
        db.set('designations', designations);
        this.logAction('designation_created', `Designation ${name} created`);
        return newDes;
    }

    updateDesignation(id, data) {
        const designations = this.getDesignations();
        const index = designations.findIndex(d => d.id === id);
        if (index !== -1) {
            designations[index] = { ...designations[index], ...data };
            db.set('designations', designations);
            this.logAction('designation_updated', `Designation ${id} updated`);
            return designations[index];
        }
        return null;
    }

    deleteDesignation(id) {
        const designations = this.getDesignations();
        const filtered = designations.filter(d => d.id !== id);
        db.set('designations', filtered);
        this.logAction('designation_deleted', `Designation ${id} deleted`);
        return true;
    }

    // Holidays CRUD
    getHolidays(year = new Date().getFullYear()) {
        const holidays = db.get('holidays') || [];
        return holidays.filter(h => h.year === year);
    }

    addHoliday(name, date, type = 'public') {
        const holidays = db.get('holidays') || [];
        const year = new Date(date).getFullYear();
        const newHoliday = {
            id: 'HOL' + String(holidays.length + 1).padStart(3, '0'),
            name,
            date,
            type,
            year,
            createdAt: new Date().toISOString()
        };
        holidays.push(newHoliday);
        db.set('holidays', holidays);
        this.logAction('holiday_created', `Holiday ${name} added`);
        return newHoliday;
    }

    deleteHoliday(id) {
        const holidays = db.get('holidays') || [];
        const filtered = holidays.filter(h => h.id !== id);
        db.set('holidays', filtered);
        this.logAction('holiday_deleted', `Holiday ${id} deleted`);
        return true;
    }

    // Audit logging
    logAction(action, details) {
        const session = authService.getCurrentUser();
        if (session) {
            authService.logAudit(action, session.userId, details);
        }
    }
}

export const companyService = new CompanyService();
