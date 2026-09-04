/* Notification Manager */

class NotificationManager {
    constructor() {
        this.container = null;
        this.notifications = new Map();
    }

    mount(container) {
        this.container = container;

        this.container.classList.add(
            "cy-notification-container"
        );
    }

    show(message, options = {}) {
        if (!this.container) {
            console.warn("Notification container not mounted.");
            return null;
        }

        const id = crypto.randomUUID();

        const notification = document.createElement("article");

        notification.className = "cy-notification";

        notification.innerHTML = `
            <div class="cy-notification-content">
                <strong class="cy-notification-title"></strong>
                <span class="cy-notification-message"></span>
            </div>

            <button
                type="button"
                class="cy-notification-close"
                aria-label="Close notification"
            >×</button>
        `;

        notification.querySelector(
            ".cy-notification-title"
        ).textContent = options.title ?? "CY-OS";

        notification.querySelector(
            ".cy-notification-message"
        ).textContent = message;

        notification.querySelector(
            ".cy-notification-close"
        ).addEventListener("click", () => {
            this.dismiss(id);
        });

        this.container.appendChild(notification);

        this.notifications.set(id, notification);

        const timeout = options.timeout ?? 4000;

        if (timeout > 0) {
            setTimeout(() => {
                this.dismiss(id);
            }, timeout);
        }

        return id;
    }

    dismiss(id) {
        const notification = this.notifications.get(id);

        if (!notification) {
            return false;
        }

        notification.remove();

        this.notifications.delete(id);

        return true;
    }

    clear() {
        for (const id of this.notifications.keys()) {
            this.dismiss(id);
        }
    }
}

const notifications = new NotificationManager();

export default notifications;
