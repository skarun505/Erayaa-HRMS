import { db } from './database.js';

// Authentication Service (Supabase-backed)
class AuthService {
    constructor() {
        this.currentUser = null;
        this._sessionLoaded = false;
    }

    // Load session from sessionStorage (cached locally for speed)
    async loadSession() {
        if (this._sessionLoaded) return;
        const sessionStr = sessionStorage.getItem('hrms_session');
        if (sessionStr) {
            const session = JSON.parse(sessionStr);
            // Verify user still exists in Supabase
            const user = await db.getOne('users', 'id', session.userId);
            if (user) {
                this.currentUser = user;
            } else {
                sessionStorage.removeItem('hrms_session');
            }
        }
        this._sessionLoaded = true;
    }

    // Login with employee ID/email and company code
    async login(identifier, password, companyCode) {
        // Fetch all users matching the identifier
        const allUsers = await db.getAll('users');
        const user = allUsers.find(u =>
            (u.employee_id === identifier || u.email === identifier) &&
            u.password === password &&
            u.company_code === companyCode &&
            u.status === 'active'
        );

        if (user) {
            const session = {
                userId: user.id,
                employeeId: user.employee_id,
                name: user.name,
                role: user.role,
                companyCode: user.company_code,
                loginTime: new Date().toISOString()
            };

            sessionStorage.setItem('hrms_session', JSON.stringify(session));
            this.currentUser = user;

            await this.logAudit('login', user.id, 'User logged in');

            return { success: true, user: session };
        }

        return { success: false, error: 'Invalid credentials or company code' };
    }

    // Logout
    async logout() {
        if (this.currentUser) {
            await this.logAudit('logout', this.currentUser.id, 'User logged out');
        }
        sessionStorage.removeItem('hrms_session');
        this.currentUser = null;
    }

    // Get current user session
    getCurrentUser() {
        const sessionStr = sessionStorage.getItem('hrms_session');
        return sessionStr ? JSON.parse(sessionStr) : null;
    }

    // Check if authenticated
    isAuthenticated() {
        return sessionStorage.getItem('hrms_session') !== null;
    }

    // First-time password setup
    async setupPassword(employeeId, tempPassword, newPassword) {
        const allUsers = await db.getAll('users');
        const user = allUsers.find(u =>
            u.employee_id === employeeId && u.temp_password === tempPassword
        );

        if (user) {
            await db.update('users', 'id', user.id, {
                password: newPassword,
                temp_password: null,
                password_setup: true
            });

            await this.logAudit('password_setup', user.id, 'Password set up');
            return { success: true };
        }

        return { success: false, error: 'Invalid employee ID or temporary password' };
    }

    // Reset password
    async resetPassword(email, companyCode) {
        const allUsers = await db.getAll('users');
        const user = allUsers.find(u => u.email === email && u.company_code === companyCode);

        if (user) {
            await this.logAudit('password_reset', user.id, 'Password reset requested');
            return { success: true, message: 'Password reset instructions sent to email' };
        }

        return { success: false, error: 'Email not found' };
    }

    // Audit logging
    async logAudit(action, userId, details) {
        await db.insert('audit_logs', {
            action,
            user_id: userId,
            details,
            timestamp: new Date().toISOString(),
            ip: 'localhost'
        });
    }
}

export const authService = new AuthService();
