import { db } from '../core/database.js';

// Comprehensive Demo Data Generator
// Creates realistic data for all 13 HRMS modules

export function generateDemoData() {
    console.log('🚀 Generating comprehensive demo data...');

    // Additional Employees (beyond seed data)
    generateAdditionalEmployees();

    // Departments and Designations
    generateDepartmentsAndDesignations();

    // Attendance data (last 30 days)
    generateAttendanceData();

    // Leave data
    generateLeaveData();

    // Payroll and Payslips
    generatePayrollData();

    // Performance Goals
    generatePerformanceData();

    // Exit/Resignation Records
    generateExitData();

    // Approvals
    generateApprovalData();

    // Shifts & Rosters
    generateShiftData();

    // Holidays (if not exists)
    generateHolidays();

    db.set('demoDataGenerated', true);
    console.log('✅ Demo data generation complete!');
}

// Generate additional employees (10 more)
function generateAdditionalEmployees() {
    const existingUsers = db.get('users') || [];

    const additionalEmployees = [
        // Another Manager
        {
            id: 'U005',
            employeeId: 'M002',
            email: 'michael.scott@company.com',
            password: 'manager123',
            name: 'Michael Scott',
            role: 'manager',
            department: 'Sales',
            designation: 'Sales Manager',
            companyCode: 'COMP001',
            status: 'active',
            joiningDate: '2022-03-15',
            mobile: '+91 9876543214',
            salary: { basic: 60000, hra: 24000, special: 16000 }
        },
        // Regular Employees
        {
            id: 'U006',
            employeeId: 'E002',
            email: 'priya.sharma@company.com',
            password: 'password123',
            name: 'Priya Sharma',
            role: 'employee',
            department: 'Engineering',
            designation: 'Software Developer',
            manager: 'Sarah Connor',
            companyCode: 'COMP001',
            status: 'active',
            joiningDate: '2023-06-01',
            mobile: '+91 9876543215',
            salary: { basic: 35000, hra: 14000, special: 11000 }
        },
        {
            id: 'U007',
            employeeId: 'E003',
            email: 'amit.kumar@company.com',
            password: 'password123',
            name: 'Amit Kumar',
            role: 'employee',
            department: 'Engineering',
            designation: 'Junior Developer',
            manager: 'Sarah Connor',
            companyCode: 'COMP001',
            status: 'active',
            joiningDate: '2024-01-15',
            mobile: '+91 9876543216',
            salary: { basic: 25000, hra: 10000, special: 8000 }
        },
        {
            id: 'U008',
            employeeId: 'E004',
            email: 'neha.patel@company.com',
            password: 'password123',
            name: 'Neha Patel',
            role: 'employee',
            department: 'Human Resources',
            designation: 'HR Executive',
            manager: 'Maria Garcia',
            companyCode: 'COMP001',
            status: 'active',
            joiningDate: '2023-09-01',
            mobile: '+91 9876543217',
            salary: { basic: 28000, hra: 11200, special: 8800 }
        },
        {
            id: 'U009',
            employeeId: 'E005',
            email: 'rajesh.verma@company.com',
            password: 'password123',
            name: 'Rajesh Verma',
            role: 'employee',
            department: 'Sales',
            designation: 'Sales Executive',
            manager: 'Michael Scott',
            companyCode: 'COMP001',
            status: 'active',
            joiningDate: '2023-04-10',
            mobile: '+91 9876543218',
            salary: { basic: 30000, hra: 12000, special: 10000 }
        },
        {
            id: 'U010',
            employeeId: 'E006',
            email: 'anita.singh@company.com',
            password: 'password123',
            name: 'Anita Singh',
            role: 'employee',
            department: 'Sales',
            designation: 'Senior Sales Executive',
            manager: 'Michael Scott',
            companyCode: 'COMP001',
            status: 'active',
            joiningDate: '2022-11-01',
            mobile: '+91 9876543219',
            salary: { basic: 38000, hra: 15200, special: 11800 }
        },
        {
            id: 'U011',
            employeeId: 'E007',
            email: 'vikram.rao@company.com',
            password: 'password123',
            name: 'Vikram Rao',
            role: 'employee',
            department: 'Engineering',
            designation: 'QA Engineer',
            manager: 'Sarah Connor',
            companyCode: 'COMP001',
            status: 'active',
            joiningDate: '2023-03-20',
            mobile: '+91 9876543220',
            salary: { basic: 32000, hra: 12800, special: 10200 }
        },
        {
            id: 'U012',
            employeeId: 'E008',
            email: 'kavitha.nair@company.com',
            password: 'password123',
            name: 'Kavitha Nair',
            role: 'employee',
            department: 'Engineering',
            designation: 'DevOps Engineer',
            manager: 'Sarah Connor',
            companyCode: 'COMP001',
            status: 'active',
            joiningDate: '2022-08-15',
            mobile: '+91 9876543221',
            salary: { basic: 42000, hra: 16800, special: 13200 }
        },
        {
            id: 'U013',
            employeeId: 'E009',
            email: 'suresh.menon@company.com',
            password: 'password123',
            name: 'Suresh Menon',
            role: 'employee',
            department: 'Engineering',
            designation: 'Tech Lead',
            manager: 'Sarah Connor',
            companyCode: 'COMP001',
            status: 'active',
            joiningDate: '2021-12-01',
            mobile: '+91 9876543222',
            salary: { basic: 55000, hra: 22000, special: 18000 }
        },
        {
            id: 'U014',
            employeeId: 'E010',
            email: 'deepa.reddy@company.com',
            password: 'password123',
            name: 'Deepa Reddy',
            role: 'employee',
            department: 'Human Resources',
            designation: 'Recruitment Specialist',
            manager: 'Maria Garcia',
            companyCode: 'COMP001',
            status: 'active',
            joiningDate: '2023-07-01',
            mobile: '+91 9876543223',
            salary: { basic: 30000, hra: 12000, special: 9000 }
        }
    ];

    // Merge with existing users
    const allUsers = [...existingUsers];
    additionalEmployees.forEach(newEmp => {
        if (!allUsers.find(u => u.id === newEmp.id)) {
            allUsers.push(newEmp);
        }
    });

    db.set('users', allUsers);
    console.log(`✓ Created ${allUsers.length} total employees`);
}

// Generate Departments and Designations
function generateDepartmentsAndDesignations() {
    const departments = [
        { id: 'D001', name: 'Engineering', headId: 'U002', status: 'active', createdAt: '2020-01-01' },
        { id: 'D002', name: 'Human Resources', headId: 'U003', status: 'active', createdAt: '2020-01-01' },
        { id: 'D003', name: 'Sales', headId: 'U005', status: 'active', createdAt: '2020-01-01' },
        { id: 'D004', name: 'Management', headId: 'U004', status: 'active', createdAt: '2020-01-01' }
    ];

    const designations = [
        { id: 'DES001', name: 'CEO', level: 1, departmentId: 'D004', status: 'active' },
        { id: 'DES002', name: 'Engineering Manager', level: 2, departmentId: 'D001', status: 'active' },
        { id: 'DES003', name: 'HR Manager', level: 2, departmentId: 'D002', status: 'active' },
        { id: 'DES004', name: 'Sales Manager', level: 2, departmentId: 'D003', status: 'active' },
        { id: 'DES005', name: 'Tech Lead', level: 3, departmentId: 'D001', status: 'active' },
        { id: 'DES006', name: 'Senior Developer', level: 3, departmentId: 'D001', status: 'active' },
        { id: 'DES007', name: 'Software Developer', level: 4, departmentId: 'D001', status: 'active' },
        { id: 'DES008', name: 'Junior Developer', level: 5, departmentId: 'D001', status: 'active' },
        { id: 'DES009', name: 'QA Engineer', level: 4, departmentId: 'D001', status: 'active' },
        { id: 'DES010', name: 'DevOps Engineer', level: 3, departmentId: 'D001', status: 'active' },
        { id: 'DES011', name: 'HR Executive', level: 4, departmentId: 'D002', status: 'active' },
        { id: 'DES012', name: 'Recruitment Specialist', level: 4, departmentId: 'D002', status: 'active' },
        { id: 'DES013', name: 'Senior Sales Executive', level: 3, departmentId: 'D003', status: 'active' },
        { id: 'DES014', name: 'Sales Executive', level: 4, departmentId: 'D003', status: 'active' }
    ];

    db.set('departments', departments);
    db.set('designations', designations);
    console.log(`✓ Created ${departments.length} departments, ${designations.length} designations`);
}

// Generate 30 days of attendance data
function generateAttendanceData() {
    const users = db.get('users') || [];
    const attendance = [];
    const today = new Date();

    users.forEach(user => {
        // Generate last 30 days attendance
        for (let i = 0; i < 30; i++) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);

            // Skip weekends
            if (date.getDay() === 0 || date.getDay() === 6) continue;

            // Random attendance status (85% present, 10% late, 5% absent)
            const rand = Math.random();
            let status, checkIn, checkOut;

            if (rand < 0.85) {
                status = 'present';
                // Normal check-in 8:45-9:15
                const checkInHour = 8 + Math.floor(Math.random() * 1);
                const checkInMin = 45 + Math.floor(Math.random() * 30);
                checkIn = `${checkInHour.toString().padStart(2, '0')}:${checkInMin.toString().padStart(2, '0')}`;

                // Normal check-out 17:30-19:00
                const checkOutHour = 17 + Math.floor(Math.random() * 2);
                const checkOutMin = 30 + Math.floor(Math.random() * 30);
                checkOut = `${checkOutHour.toString().padStart(2, '0')}:${checkOutMin.toString().padStart(2, '0')}`;
            } else if (rand < 0.95) {
                status = 'late';
                // Late check-in 9:30-10:30
                const checkInHour = 9 + Math.floor(Math.random() * 2);
                const checkInMin = 30 + Math.floor(Math.random() * 30);
                checkIn = `${checkInHour.toString().padStart(2, '0')}:${checkInMin.toString().padStart(2, '0')}`;

                const checkOutHour = 18 + Math.floor(Math.random() * 1);
                const checkOutMin = Math.floor(Math.random() * 60);
                checkOut = `${checkOutHour.toString().padStart(2, '0')}:${checkOutMin.toString().padStart(2, '0')}`;
            } else {
                status = 'absent';
                checkIn = null;
                checkOut = null;
            }

            attendance.push({
                id: `ATT${user.id}_${date.toISOString().split('T')[0]}`,
                employeeId: user.employeeId,
                userId: user.id,
                date: date.toISOString().split('T')[0],
                checkIn,
                checkOut,
                status,
                workingHours: checkIn && checkOut ? calculateHours(checkIn, checkOut) : 0,
                createdAt: date.toISOString()
            });
        }
    });

    db.set('attendance', attendance);
    console.log(`✓ Generated ${attendance.length} attendance records`);
}

function calculateHours(checkIn, checkOut) {
    const [inH, inM] = checkIn.split(':').map(Number);
    const [outH, outM] = checkOut.split(':').map(Number);
    return ((outH * 60 + outM) - (inH * 60 + inM)) / 60;
}

// Generate Leave Data
function generateLeaveData() {
    const users = db.get('users') || [];
    const leaveBalances = [];

    users.forEach(user => {
        // Leave Balance
        leaveBalances.push({
            employeeId: user.employeeId,
            userId: user.id,
            year: 2024,
            casual: { total: 12, used: Math.floor(Math.random() * 5), balance: 12 - Math.floor(Math.random() * 5) },
            sick: { total: 10, used: Math.floor(Math.random() * 3), balance: 10 - Math.floor(Math.random() * 3) },
            privilege: { total: 15, used: Math.floor(Math.random() * 4), balance: 15 - Math.floor(Math.random() * 4) },
            compensatory: { total: 0, used: 0, balance: 0 }
        });
    });

    // Get user names for leave requests
    const getUserName = (userId) => {
        const user = users.find(u => u.id === userId);
        return user ? user.name : 'Unknown';
    };

    // Sample leave applications - using the format expected by leaveService
    const leaveRequests = [
        {
            id: 'LR0001',
            employeeId: 'U001',
            employeeName: getUserName('U001'),
            leaveType: 'CL',
            startDate: '2024-12-20',
            endDate: '2024-12-21',
            days: 2,
            isHalfDay: false,
            status: 'approved',
            reason: 'Personal work',
            appliedOn: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            approvedBy: 'Sarah Connor',
            approvedOn: new Date().toISOString(),
            salaryImpact: { unpaidDays: 0, deduction: 0 }
        },
        {
            id: 'LR0002',
            employeeId: 'U006',
            employeeName: getUserName('U006'),
            leaveType: 'SL',
            startDate: '2024-12-18',
            endDate: '2024-12-18',
            days: 1,
            isHalfDay: false,
            status: 'approved',
            reason: 'Not feeling well',
            appliedOn: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            approvedBy: 'Sarah Connor',
            approvedOn: new Date().toISOString(),
            salaryImpact: { unpaidDays: 0, deduction: 0 }
        },
        {
            id: 'LR0003',
            employeeId: 'U007',
            employeeName: getUserName('U007'),
            leaveType: 'PL',
            startDate: '2025-01-06',
            endDate: '2025-01-10',
            days: 5,
            isHalfDay: false,
            status: 'pending',
            reason: 'Family vacation',
            appliedOn: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            approvedBy: null,
            approvedOn: null,
            salaryImpact: { unpaidDays: 0, deduction: 0 }
        },
        {
            id: 'LR0004',
            employeeId: 'U008',
            employeeName: getUserName('U008'),
            leaveType: 'CL',
            startDate: '2025-01-02',
            endDate: '2025-01-03',
            days: 2,
            isHalfDay: false,
            status: 'pending',
            reason: 'Festival celebration',
            appliedOn: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            approvedBy: null,
            approvedOn: null,
            salaryImpact: { unpaidDays: 0, deduction: 0 }
        },
        {
            id: 'LR0005',
            employeeId: 'U009',
            employeeName: getUserName('U009'),
            leaveType: 'SL',
            startDate: '2024-12-15',
            endDate: '2024-12-16',
            days: 2,
            isHalfDay: false,
            status: 'approved',
            reason: 'Medical checkup',
            appliedOn: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
            approvedBy: 'Sarah Connor',
            approvedOn: new Date().toISOString(),
            salaryImpact: { unpaidDays: 0, deduction: 0 }
        },
        {
            id: 'LR0006',
            employeeId: 'U010',
            employeeName: getUserName('U010'),
            leaveType: 'CL',
            startDate: '2024-12-25',
            endDate: '2024-12-25',
            days: 1,
            isHalfDay: false,
            status: 'rejected',
            reason: 'Short notice',
            appliedOn: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
            approvedBy: 'Maria Garcia',
            approvedOn: new Date().toISOString(),
            rejectionReason: 'Critical project deadline',
            salaryImpact: { unpaidDays: 0, deduction: 0 }
        },
        {
            id: 'LR0007',
            employeeId: 'U011',
            employeeName: getUserName('U011'),
            leaveType: 'PL',
            startDate: '2025-01-15',
            endDate: '2025-01-20',
            days: 6,
            isHalfDay: false,
            status: 'pending',
            reason: 'Hometown visit',
            appliedOn: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            approvedBy: null,
            approvedOn: null,
            salaryImpact: { unpaidDays: 0, deduction: 0 }
        },
        {
            id: 'LR0008',
            employeeId: 'U012',
            employeeName: getUserName('U012'),
            leaveType: 'CL',
            startDate: '2024-12-28',
            endDate: '2024-12-28',
            days: 1,
            isHalfDay: false,
            status: 'approved',
            reason: 'Personal errand',
            appliedOn: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
            approvedBy: 'Sarah Connor',
            approvedOn: new Date().toISOString(),
            salaryImpact: { unpaidDays: 0, deduction: 0 }
        }
    ];

    // Use 'leave_requests' key as expected by leaveService
    db.set('leave_requests', leaveRequests);
    db.set('leaveBalances', leaveBalances);
    console.log(`✓ Generated ${leaveRequests.length} leave requests, ${leaveBalances.length} leave balances`);
}

// Generate Payroll Data
function generatePayrollData() {
    const users = db.get('users') || [];
    const payslips = [];
    // Generate 5 months of completed payroll history (July-November)
    // December will be pending for user to process
    const completedMonths = [
        { name: 'July', num: 7 },
        { name: 'August', num: 8 },
        { name: 'September', num: 9 },
        { name: 'October', num: 10 },
        { name: 'November', num: 11 }
    ];

    // Generate completed payslips for July-November
    users.forEach(user => {
        const salary = user.salary || { basic: 25000, hra: 10000, special: 8000 };
        const grossPay = salary.basic + salary.hra + salary.special;

        completedMonths.forEach((monthData) => {
            const epf = Math.round(salary.basic * 0.12);
            const pt = 200;
            const tds = grossPay > 50000 ? Math.round(grossPay * 0.05) : 0;
            const totalDeductions = epf + pt + tds;
            const netPay = grossPay - totalDeductions;

            payslips.push({
                id: `PAY${user.id}_${2024}_${monthData.num}`,
                employeeId: user.employeeId,
                userId: user.id,
                employeeName: user.name,
                department: user.department,
                designation: user.designation,
                month: monthData.name,
                year: 2024,
                date: `2024-${String(monthData.num).padStart(2, '0')}-01`,
                earnings: [
                    { label: 'Basic Salary', amount: salary.basic },
                    { label: 'HRA', amount: salary.hra },
                    { label: 'Special Allowance', amount: salary.special }
                ],
                deductions: [
                    { label: 'EPF', amount: epf },
                    { label: 'Professional Tax', amount: pt },
                    { label: 'TDS', amount: tds }
                ],
                grossPay,
                totalDeductions,
                netPay,
                status: 'Paid',
                paidOn: `2024-${String(monthData.num).padStart(2, '0')}-28`,
                createdAt: new Date().toISOString()
            });
        });
    });

    // Also generate 2025 payslips (Jan-Sep completed, Oct-Dec pending)
    const months2025Completed = [
        { name: 'January', num: 1 },
        { name: 'February', num: 2 },
        { name: 'March', num: 3 },
        { name: 'April', num: 4 },
        { name: 'May', num: 5 },
        { name: 'June', num: 6 },
        { name: 'July', num: 7 },
        { name: 'August', num: 8 },
        { name: 'September', num: 9 }
    ];

    users.forEach(user => {
        const salary = user.salary || { basic: 25000, hra: 10000, special: 8000 };
        const grossPay = salary.basic + salary.hra + salary.special;

        months2025Completed.forEach((monthData) => {
            const epf = Math.round(salary.basic * 0.12);
            const pt = 200;
            const tds = grossPay > 50000 ? Math.round(grossPay * 0.05) : 0;
            const totalDeductions = epf + pt + tds;
            const netPay = grossPay - totalDeductions;

            payslips.push({
                id: `PAY${user.id}_${2025}_${monthData.num}`,
                employeeId: user.employeeId,
                userId: user.id,
                employeeName: user.name,
                department: user.department,
                designation: user.designation,
                month: monthData.name,
                year: 2025,
                date: `2025-${String(monthData.num).padStart(2, '0')}-01`,
                earnings: [
                    { label: 'Basic Salary', amount: salary.basic },
                    { label: 'HRA', amount: salary.hra },
                    { label: 'Special Allowance', amount: salary.special }
                ],
                deductions: [
                    { label: 'EPF', amount: epf },
                    { label: 'Professional Tax', amount: pt },
                    { label: 'TDS', amount: tds }
                ],
                grossPay,
                totalDeductions,
                netPay,
                status: 'Paid',
                paidOn: `2025-${String(monthData.num).padStart(2, '0')}-28`,
                createdAt: new Date().toISOString()
            });
        });
    });

    // Generate payroll runs - 2024 completed for Jul-Nov, Dec pending
    // 2025 completed for Jan-Sep, Oct/Nov/Dec pending
    const payrollRuns = [
        // 2024 completed months
        ...completedMonths.map((monthData) => ({
            id: `RUN_2024_${monthData.num}`,
            month: monthData.name,
            year: 2024,
            status: 'completed',
            employeesProcessed: users.length,
            totalGross: payslips.filter(p => p.month === monthData.name && p.year === 2024).reduce((sum, p) => sum + p.grossPay, 0),
            totalDeductions: payslips.filter(p => p.month === monthData.name && p.year === 2024).reduce((sum, p) => sum + p.totalDeductions, 0),
            totalNet: payslips.filter(p => p.month === monthData.name && p.year === 2024).reduce((sum, p) => sum + p.netPay, 0),
            runDate: `2024-${String(monthData.num).padStart(2, '0')}-25`,
            paidDate: `2024-${String(monthData.num).padStart(2, '0')}-28`
        })),
        // December 2024 pending
        {
            id: 'RUN_2024_12',
            month: 'December',
            year: 2024,
            status: 'pending',
            employeesProcessed: 0,
            totalGross: 0,
            totalDeductions: 0,
            totalNet: 0,
            runDate: null,
            paidDate: null
        },
        // 2025 completed months (Jan-Sep)
        ...months2025Completed.map((monthData) => ({
            id: `RUN_2025_${monthData.num}`,
            month: monthData.name,
            year: 2025,
            status: 'completed',
            employeesProcessed: users.length,
            totalGross: payslips.filter(p => p.month === monthData.name && p.year === 2025).reduce((sum, p) => sum + p.grossPay, 0),
            totalDeductions: payslips.filter(p => p.month === monthData.name && p.year === 2025).reduce((sum, p) => sum + p.totalDeductions, 0),
            totalNet: payslips.filter(p => p.month === monthData.name && p.year === 2025).reduce((sum, p) => sum + p.netPay, 0),
            runDate: `2025-${String(monthData.num).padStart(2, '0')}-25`,
            paidDate: `2025-${String(monthData.num).padStart(2, '0')}-28`
        })),
        // October 2025 pending
        {
            id: 'RUN_2025_10',
            month: 'October',
            year: 2025,
            status: 'pending',
            employeesProcessed: 0,
            totalGross: 0,
            totalDeductions: 0,
            totalNet: 0,
            runDate: null,
            paidDate: null
        },
        // November 2025 pending
        {
            id: 'RUN_2025_11',
            month: 'November',
            year: 2025,
            status: 'pending',
            employeesProcessed: 0,
            totalGross: 0,
            totalDeductions: 0,
            totalNet: 0,
            runDate: null,
            paidDate: null
        },
        // December 2025 pending
        {
            id: 'RUN_2025_12',
            month: 'December',
            year: 2025,
            status: 'pending',
            employeesProcessed: 0,
            totalGross: 0,
            totalDeductions: 0,
            totalNet: 0,
            runDate: null,
            paidDate: null
        }
    ];

    db.set('payslips', payslips);
    db.set('payroll_runs', payrollRuns);
    console.log(`✓ Generated ${payslips.length} payslips, ${payrollRuns.length} payroll runs`);
}

// Generate Performance Data
function generatePerformanceData() {
    const users = db.get('users') || [];
    const goals = [];
    const reviews = [];

    const goalTemplates = [
        { title: 'Complete Project Milestone', type: 'KRA', weight: 30 },
        { title: 'Improve Code Quality', type: 'KPI', weight: 20 },
        { title: 'Team Collaboration', type: 'KRA', weight: 15 },
        { title: 'Technical Skills Development', type: 'KPI', weight: 20 },
        { title: 'Client Satisfaction', type: 'KRA', weight: 15 }
    ];

    users.filter(u => u.role === 'employee').forEach(user => {
        goalTemplates.forEach((template, index) => {
            const progress = Math.floor(Math.random() * 100);
            const status = progress < 30 ? 'not_started' : progress < 70 ? 'in_progress' : progress < 100 ? 'on_track' : 'completed';

            goals.push({
                id: `GOAL${user.id}_${index}`,
                employeeId: user.employeeId,
                userId: user.id,
                title: template.title,
                description: `Goal for ${template.title.toLowerCase()} in Q4 2024`,
                type: template.type,
                weight: template.weight,
                progress,
                status,
                startDate: '2024-10-01',
                endDate: '2024-12-31',
                createdAt: new Date().toISOString()
            });
        });
    });

    // Sample completed reviews
    const reviewedEmployees = users.filter(u => u.role === 'employee').slice(0, 3);
    reviewedEmployees.forEach(user => {
        reviews.push({
            id: `REV${user.id}_2024Q3`,
            employeeId: user.employeeId,
            userId: user.id,
            period: 'Q3 2024',
            overallRating: (3 + Math.random() * 2).toFixed(1),
            selfRating: (3 + Math.random() * 2).toFixed(1),
            managerRating: (3 + Math.random() * 2).toFixed(1),
            status: 'completed',
            completedAt: '2024-10-15',
            comments: 'Good performance during the quarter. Met most objectives.',
            createdAt: new Date().toISOString()
        });
    });

    db.set('goals', goals);
    db.set('reviews', reviews);
    console.log(`✓ Generated ${goals.length} goals, ${reviews.length} reviews`);
}

// Generate Exit Data
function generateExitData() {
    // Format that matches exitService expectations
    const exits = [
        {
            id: 'EXIT001',
            employeeId: 'U007',
            employeeName: 'Amit Kumar',
            resignationDate: '2024-12-15T10:00:00Z',
            requestedLWD: '2025-01-15',
            reason: 'Resignation - Better Opportunity',
            personalEmail: 'amit.kumar@gmail.com',
            status: 'pending_approval',
            clearance: {
                it: {
                    department: 'IT',
                    status: 'pending',
                    items: [
                        { name: 'Laptop/Assets Returned', status: 'pending' },
                        { name: 'Email Access Revoked', status: 'pending' },
                        { name: 'Software Licenses', status: 'pending' }
                    ],
                    clearedBy: null,
                    clearedAt: null
                },
                admin: {
                    department: 'Admin',
                    status: 'pending',
                    items: [
                        { name: 'ID Card Returned', status: 'pending' },
                        { name: 'Access Keys/Tokens', status: 'pending' },
                        { name: 'Storage Keys', status: 'pending' }
                    ],
                    clearedBy: null,
                    clearedAt: null
                },
                finance: {
                    department: 'Finance',
                    status: 'pending',
                    items: [
                        { name: 'No Pending Loans', status: 'pending' },
                        { name: 'Expense Reimbursements Cleared', status: 'pending' },
                        { name: 'Travel Advances', status: 'pending' }
                    ],
                    clearedBy: null,
                    clearedAt: null
                },
                library: {
                    department: 'Library',
                    status: 'pending',
                    items: [
                        { name: 'Books/Resource Cards', status: 'pending' }
                    ],
                    clearedBy: null,
                    clearedAt: null
                }
            },
            fnf: null,
            comments: 'Looking forward to new opportunities'
        },
        {
            id: 'EXIT002',
            employeeId: 'U008',
            employeeName: 'Neha Patel',
            resignationDate: '2024-11-20T09:30:00Z',
            requestedLWD: '2024-12-20',
            reason: 'Resignation - Personal Reasons',
            personalEmail: 'neha.patel@gmail.com',
            status: 'approved',
            approvalDate: '2024-11-22T10:00:00Z',
            clearance: {
                it: {
                    department: 'IT',
                    status: 'cleared',
                    items: [
                        { name: 'Laptop/Assets Returned', status: 'cleared' },
                        { name: 'Email Access Revoked', status: 'cleared' },
                        { name: 'Software Licenses', status: 'cleared' }
                    ],
                    clearedBy: 'Sarah Connor',
                    clearedAt: '2024-12-18T10:00:00Z'
                },
                admin: {
                    department: 'Admin',
                    status: 'cleared',
                    items: [
                        { name: 'ID Card Returned', status: 'cleared' },
                        { name: 'Access Keys/Tokens', status: 'cleared' },
                        { name: 'Storage Keys', status: 'cleared' }
                    ],
                    clearedBy: 'Robert Smith',
                    clearedAt: '2024-12-19T11:00:00Z'
                },
                finance: {
                    department: 'Finance',
                    status: 'pending',
                    items: [
                        { name: 'No Pending Loans', status: 'cleared' },
                        { name: 'Expense Reimbursements Cleared', status: 'pending' },
                        { name: 'Travel Advances', status: 'cleared' }
                    ],
                    clearedBy: null,
                    clearedAt: null
                },
                library: {
                    department: 'Library',
                    status: 'pending',
                    items: [
                        { name: 'Books/Resource Cards', status: 'pending' }
                    ],
                    clearedBy: null,
                    clearedAt: null
                }
            },
            fnf: null,
            comments: 'Family commitments'
        },
        {
            id: 'EXIT003',
            employeeId: 'U015',
            employeeName: 'Rahul Mehta',
            resignationDate: '2024-10-01T11:00:00Z',
            requestedLWD: '2024-10-31',
            reason: 'Relocation',
            personalEmail: 'rahul.mehta@gmail.com',
            status: 'completed',
            approvalDate: '2024-10-03T10:00:00Z',
            completedAt: '2024-11-05T10:00:00Z',
            clearance: {
                it: {
                    department: 'IT',
                    status: 'cleared',
                    items: [
                        { name: 'Laptop/Assets Returned', status: 'cleared' },
                        { name: 'Email Access Revoked', status: 'cleared' },
                        { name: 'Software Licenses', status: 'cleared' }
                    ],
                    clearedBy: 'Sarah Connor',
                    clearedAt: '2024-10-25T10:00:00Z'
                },
                admin: {
                    department: 'Admin',
                    status: 'cleared',
                    items: [
                        { name: 'ID Card Returned', status: 'cleared' },
                        { name: 'Access Keys/Tokens', status: 'cleared' },
                        { name: 'Storage Keys', status: 'cleared' }
                    ],
                    clearedBy: 'Robert Smith',
                    clearedAt: '2024-10-26T11:00:00Z'
                },
                finance: {
                    department: 'Finance',
                    status: 'cleared',
                    items: [
                        { name: 'No Pending Loans', status: 'cleared' },
                        { name: 'Expense Reimbursements Cleared', status: 'cleared' },
                        { name: 'Travel Advances', status: 'cleared' }
                    ],
                    clearedBy: 'Maria Garcia',
                    clearedAt: '2024-10-28T14:00:00Z'
                },
                library: {
                    department: 'Library',
                    status: 'cleared',
                    items: [
                        { name: 'Books/Resource Cards', status: 'cleared' }
                    ],
                    clearedBy: 'Robert Smith',
                    clearedAt: '2024-10-29T09:00:00Z'
                }
            },
            fnf: {
                unpaidSalary: 45000,
                leaveEncashment: 25000,
                totalEarnings: 70000,
                totalDeductions: 0,
                netFnF: 70000,
                calculatedAt: '2024-11-03T10:00:00Z'
            },
            comments: 'Relocating to different city'
        }
    ];

    // Use 'employee_exits' key as expected by exitService
    db.set('employee_exits', exits);
    console.log(`✓ Generated ${exits.length} exit records`);
}

// Generate Approval Data
function generateApprovalData() {
    const approvals = [
        { id: 'APR001', type: 'leave', requestId: 'LV0003', requester: 'U007', approver: 'U002', status: 'pending', createdAt: new Date().toISOString() },
        { id: 'APR002', type: 'leave', requestId: 'LV0004', requester: 'U008', approver: 'U003', status: 'pending', createdAt: new Date().toISOString() },
        { id: 'APR003', type: 'leave', requestId: 'LV0007', requester: 'U011', approver: 'U002', status: 'pending', createdAt: new Date().toISOString() },
        { id: 'APR004', type: 'resignation', requestId: 'EXIT001', requester: 'U007', approver: 'U002', status: 'pending', createdAt: new Date().toISOString() },
        { id: 'APR005', type: 'expense', requestId: 'EXP001', requester: 'U006', approver: 'U002', status: 'pending', amount: 5000, description: 'Project supplies', createdAt: new Date().toISOString() }
    ];

    db.set('approvals', approvals);
    console.log(`✓ Generated ${approvals.length} pending approvals`);
}

// Generate Shift Data
function generateShiftData() {
    const shifts = [
        { id: 'SHIFT001', name: 'General Shift', startTime: '09:00', endTime: '18:00', graceMinutes: 15, status: 'active' },
        { id: 'SHIFT002', name: 'Morning Shift', startTime: '06:00', endTime: '15:00', graceMinutes: 10, status: 'active' },
        { id: 'SHIFT003', name: 'Night Shift', startTime: '21:00', endTime: '06:00', graceMinutes: 15, status: 'active' }
    ];

    const users = db.get('users') || [];
    const roster = users.map(user => ({
        userId: user.id,
        employeeId: user.employeeId,
        shiftId: 'SHIFT001',
        effectiveFrom: '2024-01-01',
        effectiveTo: null, // Ongoing
        status: 'active'
    }));

    db.set('shifts', shifts);
    db.set('roster', roster);
    console.log(`✓ Generated ${shifts.length} shifts, ${roster.length} roster assignments`);
}

// Generate Holidays
function generateHolidays() {
    const existingHolidays = db.get('holidays') || [];
    if (existingHolidays.length > 0) return;

    const holidays = [
        { id: 'H001', name: 'New Year', date: '2025-01-01', type: 'public', year: 2025 },
        { id: 'H002', name: 'Republic Day', date: '2025-01-26', type: 'public', year: 2025 },
        { id: 'H003', name: 'Holi', date: '2025-03-14', type: 'public', year: 2025 },
        { id: 'H004', name: 'Good Friday', date: '2025-04-18', type: 'public', year: 2025 },
        { id: 'H005', name: 'Independence Day', date: '2025-08-15', type: 'public', year: 2025 },
        { id: 'H006', name: 'Gandhi Jayanti', date: '2025-10-02', type: 'public', year: 2025 },
        { id: 'H007', name: 'Diwali', date: '2025-10-20', type: 'public', year: 2025 },
        { id: 'H008', name: 'Christmas', date: '2025-12-25', type: 'public', year: 2025 }
    ];

    db.set('holidays', holidays);
    console.log(`✓ Generated ${holidays.length} holidays for 2025`);
}

// Check if demo data already exists
export function isDemoDataGenerated() {
    return db.get('demoDataGenerated') === true;
}

// Force regenerate demo data (for testing)
export function regenerateDemoData() {
    db.remove('demoDataGenerated');
    generateDemoData();
}
