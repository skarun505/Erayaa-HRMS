import { db } from '../core/database.js';

// Initialize system with seed data
export function initializeSeedData() {
    // Check if already initialized
    if (db.get('initialized')) {
        return;
    }

    // Seed Users
    const users = [
        {
            id: 'U001',
            employeeId: 'E001',
            email: 'john.doe@company.com',
            password: 'emp123',
            name: 'John Doe',
            role: 'employee',
            department: 'Engineering',
            designation: 'Senior Developer',
            manager: 'Sarah Connor',
            companyCode: 'COMP001',
            status: 'active',
            joiningDate: '2023-01-15',
            mobile: '+91 9876543210'
        },
        {
            id: 'U002',
            employeeId: 'M001',
            email: 'sarah.connor@company.com',
            password: 'manager123',
            name: 'Sarah Connor',
            role: 'manager',
            department: 'Engineering',
            designation: 'Engineering Manager',
            companyCode: 'COMP001',
            status: 'active',
            joiningDate: '2022-06-01',
            mobile: '+91 9876543211'
        },
        {
            id: 'U003',
            employeeId: 'HR001',
            email: 'hr@company.com',
            password: 'hr123',
            name: 'Maria Garcia',
            role: 'hr_admin',
            department: 'Human Resources',
            designation: 'HR Manager',
            companyCode: 'COMP001',
            status: 'active',
            joiningDate: '2021-03-10',
            mobile: '+91 9876543212'
        },
        {
            id: 'U004',
            employeeId: 'ADMIN',
            email: 'admin@company.com',
            password: 'admin123',
            name: 'Robert Smith',
            role: 'super_admin',
            department: 'Management',
            designation: 'CEO',
            companyCode: 'COMP001',
            status: 'active',
            joiningDate: '2020-01-01',
            mobile: '+91 9876543213'
        }
    ];

    db.set('users', users);

    // Seed Company Data
    const company = {
        id: 'COMP001',
        name: 'Tech Solutions Pvt Ltd',
        code: 'COMP001',
        industry: 'Technology',
        address: '123 Tech Park, Bangalore',
        timezone: 'IST',
        workingDays: 'Monday to Friday',
        payrollCycle: '1st to 30th',
        createdAt: '2020-01-01',
        settings: {
            workStartTime: '09:00',
            workEndTime: '18:00',
            lateMarkAfterMinutes: 15,
            halfDayHours: 4
        }
    };

    db.set('company', company);

    // Mark as initialized
    db.set('initialized', true);
    db.set('initializationDate', new Date().toISOString());
}

// Force update credentials (fixes login issues for existing deployments)
export function forceUpdateCredentials() {
    const users = db.get('users') || [];
    let updated = false;

    // Fix E001
    const empUser = users.find(u => u.employeeId === 'E001');
    if (empUser && empUser.password !== 'emp123') {
        empUser.password = 'emp123';
        updated = true;
    }

    // Fix ADMIN (if it was ADMIN001)
    const adminUserOld = users.find(u => u.employeeId === 'ADMIN001');
    if (adminUserOld) {
        adminUserOld.employeeId = 'ADMIN';
        adminUserOld.password = 'admin123';
        updated = true;
    }

    // Ensure ADMIN exists if not found above
    const adminUser = users.find(u => u.employeeId === 'ADMIN');
    if (adminUser && adminUser.password !== 'admin123') {
        adminUser.password = 'admin123';
        updated = true;
    }

    if (updated) {
        db.set('users', users);
        console.log('Credentials forcefully updated to match demo instructions.');
    }
}

// Reset all data (for testing)
export function resetSystem() {
    db.clear();
    initializeSeedData();
}
