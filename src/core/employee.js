import { db } from '../core/database.js';
import { authService } from '../core/auth.js';

// Employee Management Service
class EmployeeService {
    constructor() {
        this.initializeLeaveTemplates();
        this.initializeSalaryTemplates();
    }

    // Initialize leave policy templates
    initializeLeaveTemplates() {
        if (!db.get('leave_templates')) {
            db.set('leave_templates', [
                {
                    id: 'LT001',
                    name: 'Standard Policy',
                    cl: 12,
                    pl: 18,
                    sl: 10,
                    carryForward: true,
                    maxCarryForward: 5
                },
                {
                    id: 'LT002',
                    name: 'Manager Policy',
                    cl: 15,
                    pl: 20,
                    sl: 10,
                    carryForward: true,
                    maxCarryForward: 8
                },
                {
                    id: 'LT003',
                    name: 'Probation Policy',
                    cl: 6,
                    pl: 0,
                    sl: 5,
                    carryForward: false,
                    maxCarryForward: 0
                }
            ]);
        }
    }

    // Initialize salary templates
    initializeSalaryTemplates() {
        if (!db.get('salary_templates')) {
            db.set('salary_templates', [
                {
                    id: 'ST001',
                    name: 'Junior Level',
                    basicPercentage: 40,
                    hraPercentage: 50,
                    specialAllowance: 10,
                    pfApplicable: true,
                    esiApplicable: false,
                    ptApplicable: true
                },
                {
                    id: 'ST002',
                    name: 'Mid Level',
                    basicPercentage: 45,
                    hraPercentage: 45,
                    specialAllowance: 10,
                    pfApplicable: true,
                    esiApplicable: false,
                    ptApplicable: true
                },
                {
                    id: 'ST003',
                    name: 'Senior Level',
                    basicPercentage: 50,
                    hraPercentage: 40,
                    specialAllowance: 10,
                    pfApplicable: true,
                    esiApplicable: false,
                    ptApplicable: true
                }
            ]);
        }
    }

    // Get all employees
    getEmployees(filters = {}) {
        const users = db.get('users') || [];
        let employees = users;

        // Apply filters
        if (filters.status) {
            employees = employees.filter(e => e.status === filters.status);
        }
        if (filters.department) {
            employees = employees.filter(e => e.department === filters.department);
        }
        if (filters.role) {
            employees = employees.filter(e => e.role === filters.role);
        }

        return employees;
    }

    // Get single employee
    getEmployee(id) {
        const users = db.get('users') || [];
        return users.find(u => u.id === id);
    }

    // Add new employee
    addEmployee(employeeData) {
        const users = db.get('users') || [];

        // Generate employee ID
        const empCount = users.filter(u => u.employeeId?.startsWith('E')).length;
        const newEmployeeId = 'E' + String(empCount + 1).padStart(3, '0');

        // Generate user ID
        const newUserId = 'U' + String(users.length + 1).padStart(3, '0');

        const newEmployee = {
            id: newUserId,
            employeeId: newEmployeeId,
            email: employeeData.email,
            name: employeeData.name,
            mobile: employeeData.mobile || '',
            role: employeeData.role || 'employee',
            department: employeeData.department,
            designation: employeeData.designation,
            manager: employeeData.manager || null,
            companyCode: employeeData.companyCode || 'COMP001',
            status: 'draft', // draft → active → notice_period → exited
            joiningDate: employeeData.joiningDate,
            dateOfBirth: employeeData.dateOfBirth || null,
            address: employeeData.address || '',
            emergencyContact: employeeData.emergencyContact || '',
            bloodGroup: employeeData.bloodGroup || '',

            // Generate temporary password
            tempPassword: this.generateTempPassword(),
            passwordSetup: false,

            // Salary structure (to be assigned)
            salaryStructure: null,
            monthlyCTC: employeeData.monthlyCTC || 0,

            // Leave policy (to be assigned)
            leavePolicy: null,

            createdAt: new Date().toISOString(),
            createdBy: authService.getCurrentUser()?.userId || 'system'
        };

        users.push(newEmployee);
        db.set('users', users);

        this.logAction('employee_created', `Employee ${newEmployee.name} created with ID ${newEmployeeId}`);

        return newEmployee;
    }

    // Update employee
    updateEmployee(id, updates) {
        const users = db.get('users') || [];
        const index = users.findIndex(u => u.id === id);

        if (index !== -1) {
            users[index] = {
                ...users[index],
                ...updates,
                updatedAt: new Date().toISOString(),
                updatedBy: authService.getCurrentUser()?.userId || 'system'
            };

            db.set('users', users);
            this.logAction('employee_updated', `Employee ${id} updated`);

            return users[index];
        }

        return null;
    }

    // Assign salary structure
    assignSalaryStructure(employeeId, monthlyCTC, templateId) {
        const template = this.getSalaryTemplate(templateId);
        if (!template) return null;

        const salaryStructure = this.calculateSalaryBreakdown(monthlyCTC, template);

        return this.updateEmployee(employeeId, {
            monthlyCTC,
            salaryStructure
        });
    }

    // Calculate salary breakdown
    calculateSalaryBreakdown(grossSalary, template) {
        const basic = Math.round((grossSalary * template.basicPercentage) / 100);
        const hra = Math.round((grossSalary * template.hraPercentage) / 100);
        const special = grossSalary - basic - hra;

        const pf = template.pfApplicable ? Math.round(basic * 0.12) : 0;
        const esi = template.esiApplicable && grossSalary <= 21000 ? Math.round(grossSalary * 0.0075) : 0;
        const pt = template.ptApplicable ? 200 : 0;

        return {
            gross: grossSalary,
            basic,
            hra,
            conveyance: 1600,
            specialAllowance: special - 1600,
            pf,
            esi,
            pt,
            tds: 0,
            netSalary: grossSalary - (pf + esi + pt)
        };
    }

    // Assign leave policy
    assignLeavePolicy(employeeId, templateId) {
        const template = this.getLeaveTemplate(templateId);
        if (!template) return null;

        const leavePolicy = {
            templateId,
            cl: { total: template.cl, used: 0, remaining: template.cl },
            pl: { total: template.pl, used: 0, remaining: template.pl },
            sl: { total: template.sl, used: 0, remaining: template.sl },
            carryForward: template.carryForward,
            maxCarryForward: template.maxCarryForward,
            assignedDate: new Date().toISOString()
        };

        return this.updateEmployee(employeeId, { leavePolicy });
    }

    // Update employee status (draft → active → notice_period → exited)
    updateStatus(employeeId, newStatus, effectiveDate, remarks = '') {
        const employee = this.getEmployee(employeeId);
        if (!employee) return null;

        // Validate status transition
        const validTransitions = {
            draft: ['active', 'exited'],
            active: ['notice_period', 'exited'],
            notice_period: ['active', 'exited'],
            exited: []
        };

        if (!validTransitions[employee.status]?.includes(newStatus)) {
            throw new Error(`Invalid status transition from ${employee.status} to ${newStatus}`);
        }

        // If activating, ensure password and policies are set
        if (newStatus === 'active' && employee.status === 'draft') {
            if (!employee.salaryStructure) {
                throw new Error('Cannot activate: Salary structure not assigned');
            }
            if (!employee.leavePolicy) {
                throw new Error('Cannot activate: Leave policy not assigned');
            }
        }

        const updates = {
            status: newStatus,
            statusHistory: [
                ...(employee.statusHistory || []),
                {
                    from: employee.status,
                    to: newStatus,
                    date: effectiveDate,
                    remarks,
                    changedBy: authService.getCurrentUser()?.userId
                }
            ]
        };

        if (newStatus === 'active') {
            updates.activationDate = effectiveDate;
            // Set password if not set
            if (!employee.password) {
                updates.password = employee.tempPassword;
            }
        } else if (newStatus === 'exited') {
            updates.exitDate = effectiveDate;
        }

        this.logAction('status_changed', `Employee ${employeeId} status changed to ${newStatus}`);

        return this.updateEmployee(employeeId, updates);
    }

    // Get leave templates
    getLeaveTemplates() {
        return db.get('leave_templates') || [];
    }

    getLeaveTemplate(id) {
        const templates = this.getLeaveTemplates();
        return templates.find(t => t.id === id);
    }

    // Get salary templates
    getSalaryTemplates() {
        return db.get('salary_templates') || [];
    }

    getSalaryTemplate(id) {
        const templates = this.getSalaryTemplates();
        return templates.find(t => t.id === id);
    }

    // Generate temporary password
    generateTempPassword() {
        return 'Temp' + Math.random().toString(36).substr(2, 6) + '!';
    }

    // Search employees
    searchEmployees(query) {
        const employees = this.getEmployees();
        const lowerQuery = query.toLowerCase();

        return employees.filter(emp =>
            emp.name.toLowerCase().includes(lowerQuery) ||
            emp.employeeId.toLowerCase().includes(lowerQuery) ||
            emp.email.toLowerCase().includes(lowerQuery) ||
            emp.department?.toLowerCase().includes(lowerQuery)
        );
    }

    // Log actions
    logAction(action, details) {
        const session = authService.getCurrentUser();
        if (session) {
            authService.logAudit(action, session.userId, details);
        }
    }
}

export const employeeService = new EmployeeService();
