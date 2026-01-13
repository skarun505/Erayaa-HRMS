import { db } from './database.js';

// Authentication Service
class AuthService {
    constructor() {
        this.currentUser = null;
        this.loadSession();
    }

    // Login with employee ID/email and company code
    login(identifier, password, companyCode) {
        // Get all users
        const users = db.get('users') || [];

        // Find matching user
        const user = users.find(u =>
            (u.employeeId === identifier || u.email === identifier) &&
            u.password === password &&
            u.companyCode === companyCode &&
            u.status === 'active'
        );

        if (user) {
            // Create session
            const session = {
                userId: user.id,
                employeeId: user.employeeId,
                name: user.name,
                role: user.role,
                companyCode: user.companyCode,
                loginTime: new Date().toISOString()
            };

            db.set('session', session);
            this.currentUser = user;

            // Log audit
            this.logAudit('login', user.id, 'User logged in');

            return { success: true, user: session };
        }

        return { success: false, error: 'Invalid credentials or company code' };
    }

    // Logout
    logout() {
        if (this.currentUser) {
            this.logAudit('logout', this.currentUser.id, 'User logged out');
        }
        db.remove('session');
        this.currentUser = null;
    }

    // Load session from storage
    loadSession() {
        const session = db.get('session');
        if (session) {
            const users = db.get('users') || [];
            this.currentUser = users.find(u => u.id === session.userId);
        }
    }

    // Get current user
    getCurrentUser() {
        return db.get('session');
    }

    // Check if user is authenticated
    isAuthenticated() {
        return db.get('session') !== null;
    }

    // First-time password setup
    setupPassword(employeeId, tempPassword, newPassword) {
        const users = db.get('users') || [];
        const userIndex = users.findIndex(u =>
            u.employeeId === employeeId && u.tempPassword === tempPassword
        );

        if (userIndex !== -1) {
            users[userIndex].password = newPassword;
            delete users[userIndex].tempPassword;
            users[userIndex].passwordSetup = true;
            db.set('users', users);

            this.logAudit('password_setup', users[userIndex].id, 'Password set up');
            return { success: true };
        }

        return { success: false, error: 'Invalid employee ID or temporary password' };
    }

    // Forgot password (in real app, would send email)
    resetPassword(email, companyCode) {
        const users = db.get('users') || [];
        const user = users.find(u => u.email === email && u.companyCode === companyCode);

        if (user) {
            // In real app, send email with reset link
            // For demo, just return success
            this.logAudit('password_reset', user.id, 'Password reset requested');
            return { success: true, message: 'Password reset instructions sent to email' };
        }

        return { success: false, error: 'Email not found' };
    }

    // Audit logging
    logAudit(action, userId, details) {
        const audits = db.get('audit_logs') || [];
        audits.push({
            id: Date.now(),
            action,
            userId,
            details,
            timestamp: new Date().toISOString(),
            ip: 'localhost' // In real app, would get actual IP
        });
        db.set('audit_logs', audits);
    }
}

export const authService = new AuthService();
