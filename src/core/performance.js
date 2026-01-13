import { db } from '../core/database.js';
import { authService } from '../core/auth.js';
import { employeeService } from '../core/employee.js';
import { notificationService } from '../core/notification.js';

// Performance Management Service
class PerformanceService {
    constructor() {
        this.initializePerformance();
    }

    // Initialize performance settings and templates
    initializePerformance() {
        if (!db.get('performance_cycles')) {
            db.set('performance_cycles', [
                {
                    id: 'CYCLE2025_ANNUAL',
                    name: 'Annual Review 2025',
                    startDate: '2025-01-01',
                    endDate: '2025-12-31',
                    status: 'active', // active, completed, upcoming
                    description: 'Full year performance assessment for 2025'
                }
            ]);
        }

        if (!db.get('review_templates')) {
            db.set('review_templates', [
                {
                    id: 'standard_dev',
                    name: 'Standard Developer Review',
                    sections: [
                        { id: 'tech_skills', label: 'Technical Skills', weight: 40 },
                        { id: 'delivery', label: 'Project Delivery', weight: 30 },
                        { id: 'soft_skills', label: 'Communication & Teamwork', weight: 20 },
                        { id: 'values', label: 'Company Values', weight: 10 }
                    ]
                }
            ]);
        }
    }

    // --- Goals Management ---

    createGoal(goalData) {
        const goals = db.get('goals') || [];
        const newGoal = {
            id: 'GOAL' + Date.now(),
            employeeId: goalData.employeeId,
            title: goalData.title,
            description: goalData.description,
            category: goalData.category || 'Professional', // Technical, Personal, Project
            targetDate: goalData.targetDate,
            weight: goalData.weight || 25,
            progress: 0,
            status: 'pending', // pending, in_progress, completed, deferred
            createdAt: new Date().toISOString()
        };

        goals.push(newGoal);
        db.set('goals', goals);
        this.logAction('goal_created', goalData.employeeId, `Created goal: ${newGoal.title}`);
        return { success: true, goal: newGoal };
    }

    getGoals(employeeId) {
        const goals = db.get('goals') || [];
        return employeeId ? goals.filter(g => g.employeeId === employeeId) : goals;
    }

    updateGoal(goalId, updates) {
        const goals = db.get('goals') || [];
        const index = goals.findIndex(g => g.id === goalId);
        if (index === -1) return { success: false, message: 'Goal not found' };

        goals[index] = { ...goals[index], ...updates, updatedAt: new Date().toISOString() };
        db.set('goals', goals);
        return { success: true, goal: goals[index] };
    }

    // --- Performance Reviews ---

    initiateReview(employeeId, cycleId) {
        const reviews = db.get('performance_reviews') || [];

        // check if review already exists for this cycle
        const existing = reviews.find(r => r.employeeId === employeeId && r.cycleId === cycleId);
        if (existing) return { success: false, message: 'Review already initiated for this cycle' };

        const employee = employeeService.getEmployee(employeeId);
        if (!employee) return { success: false, message: 'Employee not found' };

        const newReview = {
            id: 'REV' + Date.now(),
            employeeId,
            employeeName: employee.name,
            cycleId,
            status: 'in_self_assessment', // in_self_assessment, in_manager_assessment, completed
            initiatedAt: new Date().toISOString(),
            templateId: 'standard_dev',
            assessments: {
                self: null,
                manager: null
            },
            finalScore: 0,
            managerComments: '',
            employeeComments: ''
        };

        reviews.push(newReview);
        db.set('performance_reviews', reviews);

        // Notify Employee
        notificationService.notify(employeeId, 'Appraisal Initiated 📈', `The ${cycleId} appraisal cycle has started. Please submit your self-assessment.`, 'info');

        return { success: true, review: newReview };
    }

    submitAssessment(reviewId, role, data) {
        const reviews = db.get('performance_reviews') || [];
        const index = reviews.findIndex(r => r.id === reviewId);
        if (index === -1) return { success: false, message: 'Review not found' };

        const review = reviews[index];
        if (role === 'self') {
            review.assessments.self = data.ratings;
            review.employeeComments = data.comments;
            review.status = 'in_manager_assessment';
        } else if (role === 'manager') {
            review.assessments.manager = data.ratings;
            review.managerComments = data.comments;
            review.status = 'completed';
            review.finalScore = this.calculateFinalScore(review);
            review.completedAt = new Date().toISOString();
        }

        reviews[index] = review;
        db.set('performance_reviews', reviews);
        return { success: true };
    }

    calculateFinalScore(review) {
        const template = db.get('review_templates').find(t => t.id === review.templateId);
        if (!template || !review.assessments.manager) return 0;

        let totalWeighted = 0;
        template.sections.forEach(sec => {
            const rating = review.assessments.manager[sec.id] || 0;
            totalWeighted += (rating * (sec.weight / 100));
        });

        return parseFloat(totalWeighted.toFixed(2));
    }

    getReviews(filters = {}) {
        let reviews = db.get('performance_reviews') || [];
        if (filters.employeeId) reviews = reviews.filter(r => r.employeeId === filters.employeeId);
        if (filters.status) reviews = reviews.filter(r => r.status === filters.status);
        if (filters.cycleId) reviews = reviews.filter(r => r.cycleId === filters.cycleId);
        return reviews;
    }

    getCycles() {
        return db.get('performance_cycles') || [];
    }

    // --- Analytics ---

    getPerformanceStats(employeeId) {
        const goals = this.getGoals(employeeId);
        const reviews = this.getReviews({ employeeId });

        return {
            totalGoals: goals.length,
            completedGoals: goals.filter(g => g.status === 'completed').length,
            avgProgress: goals.length ? (goals.reduce((a, b) => a + b.progress, 0) / goals.length) : 0,
            latestReview: reviews.sort((a, b) => new Date(b.initiatedAt) - new Date(a.initiatedAt))[0] || null
        };
    }

    logAction(action, userId, details) {
        authService.logAudit(action, userId, details);
    }
}

export const performanceService = new PerformanceService();
