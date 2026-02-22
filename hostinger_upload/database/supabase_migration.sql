-- =============================================================================
-- HRMS Supabase Migration - Full Relational Schema
-- Run this entire script in the Supabase SQL Editor
-- =============================================================================

-- 1. COMPANY TABLE
CREATE TABLE IF NOT EXISTS company (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    code TEXT UNIQUE NOT NULL,
    industry TEXT,
    address TEXT,
    timezone TEXT DEFAULT 'IST',
    working_days TEXT DEFAULT 'Monday to Friday',
    payroll_cycle TEXT DEFAULT '1st to 30th',
    settings JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. DEPARTMENTS TABLE
CREATE TABLE IF NOT EXISTS departments (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    head_id TEXT,
    status TEXT DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. DESIGNATIONS TABLE
CREATE TABLE IF NOT EXISTS designations (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    level INTEGER DEFAULT 1,
    department_id TEXT REFERENCES departments(id) ON DELETE SET NULL,
    status TEXT DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. USERS (EMPLOYEES) TABLE
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    employee_id TEXT UNIQUE NOT NULL,
    email TEXT,
    password TEXT,
    temp_password TEXT,
    password_setup BOOLEAN DEFAULT FALSE,
    name TEXT NOT NULL,
    mobile TEXT,
    role TEXT DEFAULT 'employee',
    department TEXT,
    designation TEXT,
    manager TEXT,
    manager_id TEXT,
    company_code TEXT DEFAULT 'COMP001',
    status TEXT DEFAULT 'draft',
    joining_date TEXT,
    date_of_birth TEXT,
    address TEXT,
    emergency_contact TEXT,
    blood_group TEXT,
    gender TEXT,
    salary JSONB,
    salary_structure JSONB,
    monthly_ctc NUMERIC DEFAULT 0,
    leave_policy JSONB,
    notice_period INTEGER DEFAULT 30,
    activation_date TEXT,
    exit_date TEXT,
    status_history JSONB DEFAULT '[]',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    created_by TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    updated_by TEXT
);

-- 5. HOLIDAYS TABLE
CREATE TABLE IF NOT EXISTS holidays (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    date TEXT NOT NULL,
    type TEXT DEFAULT 'public',
    year INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. SHIFTS TABLE
CREATE TABLE IF NOT EXISTS shifts (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    code TEXT,
    start_time TEXT,
    end_time TEXT,
    break_duration INTEGER DEFAULT 60,
    grace_time INTEGER DEFAULT 15,
    half_day_hours NUMERIC DEFAULT 4,
    full_day_hours NUMERIC DEFAULT 8,
    is_default BOOLEAN DEFAULT FALSE,
    is_off BOOLEAN DEFAULT FALSE,
    color TEXT DEFAULT '#3b82f6',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. ROSTER TABLE
CREATE TABLE IF NOT EXISTS roster (
    id SERIAL PRIMARY KEY,
    employee_id TEXT NOT NULL,
    date TEXT NOT NULL,
    shift_id TEXT REFERENCES shifts(id) ON DELETE SET NULL,
    assigned_by TEXT,
    assigned_on TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(employee_id, date)
);

-- 8. ATTENDANCE TABLE
CREATE TABLE IF NOT EXISTS attendance (
    id SERIAL PRIMARY KEY,
    employee_id TEXT NOT NULL,
    employee_name TEXT,
    date TEXT NOT NULL,
    in_time TEXT,
    out_time TEXT,
    break_logs JSONB DEFAULT '[]',
    status TEXT DEFAULT 'absent',
    working_hours NUMERIC DEFAULT 0,
    is_late BOOLEAN DEFAULT FALSE,
    is_early_checkout BOOLEAN DEFAULT FALSE,
    overtime_hours NUMERIC DEFAULT 0,
    source TEXT DEFAULT 'biometric',
    device_id TEXT,
    shift_id TEXT,
    shift_name TEXT,
    break_duration INTEGER DEFAULT 0,
    corrected BOOLEAN DEFAULT FALSE,
    correction_id TEXT,
    UNIQUE(employee_id, date)
);

-- 9. LEAVE TYPES TABLE
CREATE TABLE IF NOT EXISTS leave_types (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    short_name TEXT,
    color TEXT,
    requires_approval BOOLEAN DEFAULT TRUE,
    max_consecutive INTEGER DEFAULT 3,
    advance_notice_days INTEGER DEFAULT 0,
    can_carry_forward BOOLEAN DEFAULT FALSE,
    encashable BOOLEAN DEFAULT FALSE
);

-- 10. LEAVE TEMPLATES TABLE
CREATE TABLE IF NOT EXISTS leave_templates (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    cl INTEGER DEFAULT 12,
    pl INTEGER DEFAULT 18,
    sl INTEGER DEFAULT 10,
    carry_forward BOOLEAN DEFAULT TRUE,
    max_carry_forward INTEGER DEFAULT 5
);

-- 11. SALARY TEMPLATES TABLE
CREATE TABLE IF NOT EXISTS salary_templates (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    basic_percentage NUMERIC DEFAULT 40,
    hra_percentage NUMERIC DEFAULT 50,
    special_allowance NUMERIC DEFAULT 10,
    pf_applicable BOOLEAN DEFAULT TRUE,
    esi_applicable BOOLEAN DEFAULT FALSE,
    pt_applicable BOOLEAN DEFAULT TRUE
);

-- 12. LEAVE REQUESTS TABLE
CREATE TABLE IF NOT EXISTS leave_requests (
    id TEXT PRIMARY KEY,
    employee_id TEXT NOT NULL,
    employee_name TEXT,
    leave_type TEXT NOT NULL,
    start_date TEXT NOT NULL,
    end_date TEXT NOT NULL,
    days NUMERIC DEFAULT 0,
    is_half_day BOOLEAN DEFAULT FALSE,
    reason TEXT,
    status TEXT DEFAULT 'pending',
    applied_on TIMESTAMPTZ DEFAULT NOW(),
    approved_by TEXT,
    approved_on TIMESTAMPTZ,
    rejection_reason TEXT,
    salary_impact JSONB
);

-- 13. PAYSLIPS TABLE
CREATE TABLE IF NOT EXISTS payslips (
    id TEXT PRIMARY KEY,
    employee_id TEXT NOT NULL,
    employee_name TEXT,
    employee_code TEXT,
    month INTEGER NOT NULL,
    year INTEGER NOT NULL,
    designation TEXT,
    department TEXT,
    attendance JSONB,
    earnings JSONB,
    gross_earnings NUMERIC DEFAULT 0,
    deductions JSONB,
    total_deductions NUMERIC DEFAULT 0,
    net_salary NUMERIC DEFAULT 0,
    status TEXT DEFAULT 'draft',
    processed_on TIMESTAMPTZ DEFAULT NOW(),
    processed_by TEXT,
    approved_on TIMESTAMPTZ,
    approved_by TEXT,
    paid_on TIMESTAMPTZ
);

-- 14. PAYROLL SETTINGS TABLE
CREATE TABLE IF NOT EXISTS payroll_settings (
    id SERIAL PRIMARY KEY,
    pf_rate NUMERIC DEFAULT 12,
    esi_rate NUMERIC DEFAULT 0.75,
    esi_threshold NUMERIC DEFAULT 21000,
    professional_tax NUMERIC DEFAULT 200,
    tds_enabled BOOLEAN DEFAULT FALSE,
    working_days_per_month INTEGER DEFAULT 26,
    overtime_rate NUMERIC DEFAULT 1.5,
    late_deduction_per_day NUMERIC DEFAULT 0
);

-- 15. ANNOUNCEMENTS TABLE
CREATE TABLE IF NOT EXISTS announcements (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT,
    category TEXT,
    priority TEXT DEFAULT 'normal',
    publish_date TIMESTAMPTZ DEFAULT NOW(),
    expiry_date TIMESTAMPTZ,
    created_by TEXT,
    created_by_name TEXT,
    attachments JSONB DEFAULT '[]',
    is_active BOOLEAN DEFAULT TRUE,
    views INTEGER DEFAULT 0,
    likes JSONB DEFAULT '[]',
    updated_at TIMESTAMPTZ
);

-- 16. NOTIFICATIONS TABLE
CREATE TABLE IF NOT EXISTS notifications (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    title TEXT NOT NULL,
    message TEXT,
    type TEXT DEFAULT 'info',
    link TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 17. AUDIT LOGS TABLE
CREATE TABLE IF NOT EXISTS audit_logs (
    id BIGSERIAL PRIMARY KEY,
    action TEXT NOT NULL,
    user_id TEXT,
    details TEXT,
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    ip TEXT DEFAULT 'localhost'
);

-- 18. PERFORMANCE CYCLES TABLE
CREATE TABLE IF NOT EXISTS performance_cycles (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    start_date TEXT,
    end_date TEXT,
    status TEXT DEFAULT 'active',
    description TEXT
);

-- 19. REVIEW TEMPLATES TABLE
CREATE TABLE IF NOT EXISTS review_templates (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    sections JSONB DEFAULT '[]'
);

-- 20. GOALS TABLE
CREATE TABLE IF NOT EXISTS goals (
    id TEXT PRIMARY KEY,
    employee_id TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    category TEXT DEFAULT 'Professional',
    target_date TEXT,
    weight INTEGER DEFAULT 25,
    progress INTEGER DEFAULT 0,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ
);

-- 21. PERFORMANCE REVIEWS TABLE
CREATE TABLE IF NOT EXISTS performance_reviews (
    id TEXT PRIMARY KEY,
    employee_id TEXT NOT NULL,
    employee_name TEXT,
    cycle_id TEXT,
    status TEXT DEFAULT 'in_self_assessment',
    initiated_at TIMESTAMPTZ DEFAULT NOW(),
    template_id TEXT DEFAULT 'standard_dev',
    assessments JSONB DEFAULT '{"self": null, "manager": null}',
    final_score NUMERIC DEFAULT 0,
    manager_comments TEXT,
    employee_comments TEXT,
    completed_at TIMESTAMPTZ
);

-- 22. EMPLOYEE EXITS TABLE
CREATE TABLE IF NOT EXISTS employee_exits (
    id TEXT PRIMARY KEY,
    employee_id TEXT NOT NULL,
    employee_name TEXT,
    resignation_date TIMESTAMPTZ,
    requested_lwd TEXT,
    reason TEXT,
    personal_email TEXT,
    status TEXT DEFAULT 'pending_approval',
    clearance JSONB DEFAULT '{}',
    fnf JSONB,
    comments TEXT,
    approver_comments TEXT,
    approval_date TIMESTAMPTZ,
    completed_at TIMESTAMPTZ
);

-- 23. EXIT REASONS TABLE
CREATE TABLE IF NOT EXISTS exit_reasons (
    id SERIAL PRIMARY KEY,
    reason TEXT NOT NULL
);

-- 24. CLEARANCE CHECKPOINTS TABLE
CREATE TABLE IF NOT EXISTS clearance_checkpoints (
    id TEXT PRIMARY KEY,
    department TEXT NOT NULL,
    items JSONB DEFAULT '[]'
);

-- 25. ATTENDANCE CORRECTIONS TABLE
CREATE TABLE IF NOT EXISTS attendance_corrections (
    id TEXT PRIMARY KEY,
    employee_id TEXT NOT NULL,
    date TEXT NOT NULL,
    current_in_time TEXT,
    current_out_time TEXT,
    requested_in_time TEXT,
    requested_out_time TEXT,
    reason TEXT,
    status TEXT DEFAULT 'pending',
    requested_on TIMESTAMPTZ DEFAULT NOW(),
    approved_by TEXT,
    approved_on TIMESTAMPTZ,
    approver_comments TEXT,
    rejected_by TEXT,
    rejected_on TIMESTAMPTZ,
    rejection_reason TEXT
);

-- 26. APPROVAL SETTINGS TABLE
CREATE TABLE IF NOT EXISTS approval_settings (
    id SERIAL PRIMARY KEY,
    leave_approval_levels INTEGER DEFAULT 1,
    auto_approve_threshold INTEGER DEFAULT 0,
    escalation_enabled BOOLEAN DEFAULT TRUE,
    escalation_days INTEGER DEFAULT 3,
    allow_delegation BOOLEAN DEFAULT TRUE
);

-- 27. BIOMETRIC CONFIG TABLE
CREATE TABLE IF NOT EXISTS biometric_config (
    id SERIAL PRIMARY KEY,
    ip TEXT DEFAULT '192.168.1.201',
    port INTEGER DEFAULT 4370,
    timeout INTEGER DEFAULT 10000,
    device_id INTEGER DEFAULT 1,
    sync_interval INTEGER DEFAULT 15,
    auto_sync BOOLEAN DEFAULT TRUE
);

-- 28. APP STATE TABLE (for misc key-value config)
CREATE TABLE IF NOT EXISTS app_state (
    key TEXT PRIMARY KEY,
    value JSONB,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 29. DOCUMENTS TABLE
CREATE TABLE IF NOT EXISTS documents (
    id TEXT PRIMARY KEY,
    employee_id TEXT NOT NULL,
    name TEXT NOT NULL,
    type TEXT,
    url TEXT,
    size INTEGER,
    uploaded_by TEXT,
    uploaded_at TIMESTAMPTZ DEFAULT NOW()
);


-- =============================================================================
-- INDEXES
-- =============================================================================
CREATE INDEX IF NOT EXISTS idx_users_employee_id ON users(employee_id);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_company_code ON users(company_code);
CREATE INDEX IF NOT EXISTS idx_users_status ON users(status);
CREATE INDEX IF NOT EXISTS idx_users_department ON users(department);
CREATE INDEX IF NOT EXISTS idx_attendance_employee_date ON attendance(employee_id, date);
CREATE INDEX IF NOT EXISTS idx_leave_requests_employee ON leave_requests(employee_id);
CREATE INDEX IF NOT EXISTS idx_leave_requests_status ON leave_requests(status);
CREATE INDEX IF NOT EXISTS idx_payslips_employee ON payslips(employee_id);
CREATE INDEX IF NOT EXISTS idx_payslips_month_year ON payslips(month, year);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_user ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_goals_employee ON goals(employee_id);
CREATE INDEX IF NOT EXISTS idx_performance_reviews_employee ON performance_reviews(employee_id);
CREATE INDEX IF NOT EXISTS idx_announcements_active ON announcements(is_active);


-- =============================================================================
-- DISABLE RLS (for simplicity - enable with proper policies for production)
-- =============================================================================
ALTER TABLE company ENABLE ROW LEVEL SECURITY;
ALTER TABLE departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE designations ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE holidays ENABLE ROW LEVEL SECURITY;
ALTER TABLE shifts ENABLE ROW LEVEL SECURITY;
ALTER TABLE roster ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE leave_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE leave_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE salary_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE leave_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE payslips ENABLE ROW LEVEL SECURITY;
ALTER TABLE payroll_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE performance_cycles ENABLE ROW LEVEL SECURITY;
ALTER TABLE review_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE performance_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE employee_exits ENABLE ROW LEVEL SECURITY;
ALTER TABLE exit_reasons ENABLE ROW LEVEL SECURITY;
ALTER TABLE clearance_checkpoints ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance_corrections ENABLE ROW LEVEL SECURITY;
ALTER TABLE approval_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE biometric_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_state ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- Allow full access for anon role (since this is an internal HRMS, not public-facing)
-- In production, you'd use auth.uid() based policies
CREATE POLICY "Allow all for anon" ON company FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON departments FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON designations FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON users FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON holidays FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON shifts FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON roster FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON attendance FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON leave_types FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON leave_templates FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON salary_templates FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON leave_requests FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON payslips FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON payroll_settings FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON announcements FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON notifications FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON audit_logs FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON performance_cycles FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON review_templates FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON goals FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON performance_reviews FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON employee_exits FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON exit_reasons FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON clearance_checkpoints FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON attendance_corrections FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON approval_settings FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON biometric_config FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON app_state FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON documents FOR ALL TO anon USING (true) WITH CHECK (true);


-- =============================================================================
-- SEED DATA
-- =============================================================================

-- Company
INSERT INTO company (id, name, code, industry, address, timezone, working_days, payroll_cycle, settings)
VALUES ('COMP001', 'Tech Solutions Pvt Ltd', 'COMP001', 'Technology', '123 Tech Park, Bangalore', 'IST', 'Monday to Friday', '1st to 30th', '{"workStartTime": "09:00", "workEndTime": "18:00", "lateMarkAfterMinutes": 15, "halfDayHours": 4}')
ON CONFLICT (id) DO NOTHING;

-- Users (Employees)
INSERT INTO users (id, employee_id, email, password, name, role, department, designation, manager, company_code, status, joining_date, mobile)
VALUES
    ('U001', 'E001', 'john.doe@company.com', 'emp123', 'John Doe', 'employee', 'Engineering', 'Senior Developer', 'Sarah Connor', 'COMP001', 'active', '2023-01-15', '+91 9876543210'),
    ('U002', 'M001', 'sarah.connor@company.com', 'manager123', 'Sarah Connor', 'manager', 'Engineering', 'Engineering Manager', NULL, 'COMP001', 'active', '2022-06-01', '+91 9876543211'),
    ('U003', 'HR001', 'hr@company.com', 'hr123', 'Maria Garcia', 'hr_admin', 'Human Resources', 'HR Manager', NULL, 'COMP001', 'active', '2021-03-10', '+91 9876543212'),
    ('U004', 'ADMIN', 'admin@company.com', 'admin123', 'Robert Smith', 'super_admin', 'Management', 'CEO', NULL, 'COMP001', 'active', '2020-01-01', '+91 9876543213')
ON CONFLICT (id) DO NOTHING;

-- Departments
INSERT INTO departments (id, name, status) VALUES
    ('DEPT001', 'Engineering', 'active'),
    ('DEPT002', 'Human Resources', 'active'),
    ('DEPT003', 'Finance', 'active'),
    ('DEPT004', 'Sales & Marketing', 'active')
ON CONFLICT (id) DO NOTHING;

-- Designations
INSERT INTO designations (id, name, level, department_id, status) VALUES
    ('DES001', 'Junior Developer', 1, 'DEPT001', 'active'),
    ('DES002', 'Senior Developer', 2, 'DEPT001', 'active'),
    ('DES003', 'Team Lead', 3, 'DEPT001', 'active'),
    ('DES004', 'Engineering Manager', 4, 'DEPT001', 'active'),
    ('DES005', 'HR Executive', 1, 'DEPT002', 'active'),
    ('DES006', 'HR Manager', 2, 'DEPT002', 'active')
ON CONFLICT (id) DO NOTHING;

-- Holidays
INSERT INTO holidays (id, name, date, type, year) VALUES
    ('HOL001', 'New Year', '2025-01-01', 'public', 2025),
    ('HOL002', 'Republic Day', '2025-01-26', 'public', 2025),
    ('HOL003', 'Independence Day', '2025-08-15', 'public', 2025),
    ('HOL004', 'Gandhi Jayanti', '2025-10-02', 'public', 2025),
    ('HOL005', 'Diwali', '2025-10-23', 'public', 2025)
ON CONFLICT (id) DO NOTHING;

-- Shifts
INSERT INTO shifts (id, name, code, start_time, end_time, break_duration, grace_time, half_day_hours, full_day_hours, is_default, is_off, color) VALUES
    ('GS', 'General Shift', 'GS', '10:00', '19:00', 60, 15, 4, 8, TRUE, FALSE, '#3b82f6'),
    ('MS', 'Morning Shift', 'MS', '06:00', '14:00', 30, 10, 4, 8, FALSE, FALSE, '#10b981'),
    ('ES', 'Evening Shift', 'ES', '14:00', '22:00', 30, 10, 4, 8, FALSE, FALSE, '#f59e0b'),
    ('NS', 'Night Shift', 'NS', '22:00', '06:00', 45, 15, 4, 8, FALSE, FALSE, '#6366f1'),
    ('WO', 'Weekly Off', 'WO', NULL, NULL, 0, 0, 0, 0, FALSE, TRUE, '#94a3b8')
ON CONFLICT (id) DO NOTHING;

-- Leave Types
INSERT INTO leave_types (id, name, short_name, color, requires_approval, max_consecutive, advance_notice_days, can_carry_forward, encashable) VALUES
    ('CL', 'Casual Leave', 'CL', '#3b82f6', TRUE, 3, 0, TRUE, FALSE),
    ('PL', 'Privilege Leave', 'PL', '#10b981', TRUE, 10, 3, TRUE, TRUE),
    ('SL', 'Sick Leave', 'SL', '#f59e0b', TRUE, 7, 0, FALSE, FALSE)
ON CONFLICT (id) DO NOTHING;

-- Leave Templates
INSERT INTO leave_templates (id, name, cl, pl, sl, carry_forward, max_carry_forward) VALUES
    ('LT001', 'Standard Policy', 12, 18, 10, TRUE, 5),
    ('LT002', 'Manager Policy', 15, 20, 10, TRUE, 8),
    ('LT003', 'Probation Policy', 6, 0, 5, FALSE, 0)
ON CONFLICT (id) DO NOTHING;

-- Salary Templates
INSERT INTO salary_templates (id, name, basic_percentage, hra_percentage, special_allowance, pf_applicable, esi_applicable, pt_applicable) VALUES
    ('ST001', 'Junior Level', 40, 50, 10, TRUE, FALSE, TRUE),
    ('ST002', 'Mid Level', 45, 45, 10, TRUE, FALSE, TRUE),
    ('ST003', 'Senior Level', 50, 40, 10, TRUE, FALSE, TRUE)
ON CONFLICT (id) DO NOTHING;

-- Payroll Settings
INSERT INTO payroll_settings (pf_rate, esi_rate, esi_threshold, professional_tax, tds_enabled, working_days_per_month, overtime_rate, late_deduction_per_day)
VALUES (12, 0.75, 21000, 200, FALSE, 26, 1.5, 0)
ON CONFLICT DO NOTHING;

-- Performance Cycles
INSERT INTO performance_cycles (id, name, start_date, end_date, status, description) VALUES
    ('CYCLE2025_ANNUAL', 'Annual Review 2025', '2025-01-01', '2025-12-31', 'active', 'Full year performance assessment for 2025')
ON CONFLICT (id) DO NOTHING;

-- Review Templates
INSERT INTO review_templates (id, name, sections) VALUES
    ('standard_dev', 'Standard Developer Review', '[{"id": "tech_skills", "label": "Technical Skills", "weight": 40}, {"id": "delivery", "label": "Project Delivery", "weight": 30}, {"id": "soft_skills", "label": "Communication & Teamwork", "weight": 20}, {"id": "values", "label": "Company Values", "weight": 10}]')
ON CONFLICT (id) DO NOTHING;

-- Biometric Config
INSERT INTO biometric_config (ip, port, timeout, device_id, sync_interval, auto_sync)
VALUES ('192.168.1.201', 4370, 10000, 1, 15, TRUE)
ON CONFLICT DO NOTHING;

-- Approval Settings
INSERT INTO approval_settings (leave_approval_levels, auto_approve_threshold, escalation_enabled, escalation_days, allow_delegation)
VALUES (1, 0, TRUE, 3, TRUE)
ON CONFLICT DO NOTHING;

-- Exit Reasons
INSERT INTO exit_reasons (reason) VALUES
    ('Resignation - Better Opportunity'),
    ('Resignation - Personal Reasons'),
    ('Resignation - Higher Studies'),
    ('Termination - Performance'),
    ('Termination - Policy Violation'),
    ('Retirement'),
    ('Absconding')
ON CONFLICT DO NOTHING;

-- Clearance Checkpoints
INSERT INTO clearance_checkpoints (id, department, items) VALUES
    ('it', 'IT', '["Laptop/Assets Returned", "Email Access Revoked", "Software Licenses"]'),
    ('admin', 'Admin', '["ID Card Returned", "Access Keys/Tokens", "Storage Keys"]'),
    ('finance', 'Finance', '["No Pending Loans", "Expense Reimbursements Cleared", "Travel Advances"]'),
    ('library', 'Library', '["Books/Resource Cards"]')
ON CONFLICT (id) DO NOTHING;

-- App State (initialized flag)
INSERT INTO app_state (key, value) VALUES
    ('initialized', 'true'),
    ('initialization_date', to_jsonb(NOW()::text))
ON CONFLICT (key) DO NOTHING;
