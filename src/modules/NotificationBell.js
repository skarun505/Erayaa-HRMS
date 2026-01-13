import { notificationService } from '../core/notification.js';
import { authService } from '../core/auth.js';

export function renderNotificationBell() {
    const user = authService.getCurrentUser();
    const container = document.createElement('div');
    container.className = 'notification-bell-container';
    container.style.position = 'relative';
    container.style.cursor = 'pointer';

    const updateBell = () => {
        const unreadCount = notificationService.getNotifications(user.userId, true).length;
        container.innerHTML = `
            <div class="bell-icon" style="font-size: 1.25rem;">🔔</div>
            ${unreadCount > 0 ? `
                <span class="badge badge-danger" style="position: absolute; top: -5px; right: -5px; padding: 2px 5px; border-radius: 10px; font-size: 10px;">
                    ${unreadCount}
                </span>
            ` : ''}
            <div id="notification-dropdown" class="card" style="display: none; position: absolute; right: 0; top: 30px; width: 300px; z-index: 1000; padding: 0.5rem; max-height: 400px; overflow-y: auto; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);">
                <div class="flex justify-between items-center mb-2 px-2">
                    <h4 class="m-0">Notifications</h4>
                    <button class="btn btn-sm text-xs" id="mark-all-read">Mark all as read</button>
                </div>
                <div id="notif-list"></div>
            </div>
        `;

        const dropdown = container.querySelector('#notification-dropdown');
        container.onclick = (e) => {
            e.stopPropagation();
            dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
            if (dropdown.style.display === 'block') loadNotifications();
        };

        const markAllBtn = container.querySelector('#mark-all-read');
        if (markAllBtn) {
            markAllBtn.onclick = (e) => {
                e.stopPropagation();
                notificationService.markAllAsRead(user.userId);
                updateBell();
            };
        }
    };

    const loadNotifications = () => {
        const list = container.querySelector('#notif-list');
        const notifs = notificationService.getNotifications(user.userId);

        if (notifs.length === 0) {
            list.innerHTML = '<p class="text-center text-muted p-4">No notifications</p>';
            return;
        }

        list.innerHTML = notifs.map(n => `
            <div class="p-2 mb-1 rounded ${n.isRead ? '' : 'bg-gray-100'}" style="border-bottom: 1px solid #f1f5f9; background: ${n.isRead ? 'transparent' : 'var(--bg-secondary)'}">
                <div class="font-medium text-sm flex items-center gap-2">
                    <span style="width: 8px; height: 8px; border-radius: 50%; background: ${getTypeColor(n.type)}"></span>
                    ${n.title}
                </div>
                <div class="text-xs text-muted">${n.message}</div>
                <div class="text-xs text-muted mt-1" style="font-size: 9px;">${new Date(n.createdAt).toLocaleTimeString()}</div>
            </div>
        `).join('');
    };

    function getTypeColor(type) {
        switch (type) {
            case 'success': return 'var(--success)';
            case 'warning': return 'var(--warning)';
            case 'danger': return 'var(--danger)';
            default: return 'var(--primary)';
        }
    }

    // Listen for updates
    window.addEventListener('notification-updated', updateBell);
    window.addEventListener('new-notification', updateBell);
    document.addEventListener('click', () => {
        const dropdown = container.querySelector('#notification-dropdown');
        if (dropdown) dropdown.style.display = 'none';
    });

    updateBell();
    return container;
}
