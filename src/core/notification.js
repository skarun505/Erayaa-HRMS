import { db } from './database.js';
import { authService } from './auth.js';

class NotificationService {
    // Create a new notification
    notify(userId, title, message, type = 'info', link = null) {
        const notifications = db.get('notifications') || [];
        const newNotification = {
            id: 'NOTIF' + Date.now(),
            userId,
            title,
            message,
            type, // info, success, warning, danger
            link,
            isRead: false,
            createdAt: new Date().toISOString()
        };

        notifications.unshift(newNotification);
        // Keep only last 50 notifications per user
        const userNotifications = notifications.filter(n => n.userId === userId).slice(0, 50);
        const otherNotifications = notifications.filter(n => n.userId !== userId);

        db.set('notifications', [...userNotifications, ...otherNotifications]);

        // Trigger a custom event for real-time UI update if needed
        window.dispatchEvent(new CustomEvent('new-notification', { detail: newNotification }));

        return newNotification;
    }

    // Get notifications for a user
    getNotifications(userId, unreadOnly = false) {
        const notifications = db.get('notifications') || [];
        let userNotifs = notifications.filter(n => n.userId === userId);
        if (unreadOnly) {
            userNotifs = userNotifs.filter(n => !n.isRead);
        }
        return userNotifs;
    }

    // Mark as read
    markAsRead(notificationId) {
        const notifications = db.get('notifications') || [];
        const index = notifications.findIndex(n => n.id === notificationId);
        if (index !== -1) {
            notifications[index].isRead = true;
            db.set('notifications', notifications);
            window.dispatchEvent(new CustomEvent('notification-updated'));
        }
    }

    // Mark all as read
    markAllAsRead(userId) {
        const notifications = db.get('notifications') || [];
        notifications.forEach(n => {
            if (n.userId === userId) n.isRead = true;
        });
        db.set('notifications', notifications);
        window.dispatchEvent(new CustomEvent('notification-updated'));
    }

    // System-wide broadcast (e.g. holiday announcement)
    broadcast(title, message, type = 'info') {
        const users = db.get('employees') || [];
        users.forEach(user => {
            this.notify(user.id, title, message, type);
        });
    }
}

export const notificationService = new NotificationService();
