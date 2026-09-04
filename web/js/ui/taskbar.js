/* CY-OS Taskbar */

class Taskbar {
    constructor(options = {}) {
        this.root = options.root ?? null;
        this.buttons = new Map();
        this.onLaunch = options.onLaunch ?? null;
        this.onFocus = options.onFocus ?? null;
        this.onClose = options.onClose ?? null;
    }

    mount(root) {
        if (!root) {
            throw new Error("Taskbar root element is required.");
        }

        this.root = root;

        this.root.className = "cy-taskbar";

        this.root.innerHTML = `
            <div class="cy-taskbar-left"></div>
            <div class="cy-taskbar-apps"></div>
            <div class="cy-taskbar-right">
                <span class="cy-taskbar-clock"></span>
            </div>
        `;

        this.appsContainer = this.root.querySelector(".cy-taskbar-apps");
        this.clock = this.root.querySelector(".cy-taskbar-clock");

        this.updateClock();

        this.clockTimer = setInterval(() => {
            this.updateClock();
        }, 1000);

        return this.root;
    }

    updateClock() {
        if (!this.clock) {
            return;
        }

        this.clock.textContent = new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        });
    }

    addWindow(window) {
        if (!this.appsContainer || !window) {
            return;
        }

        if (this.buttons.has(window.id)) {
            return;
        }

        const button = document.createElement("button");

        button.className = "cy-taskbar-window";
        button.dataset.windowId = window.id;
        button.textContent = window.title;

        button.addEventListener("click", () => {
            if (window.minimized) {
                this.onFocus?.(window.id);
                return;
            }

            this.onFocus?.(window.id);
        });

        this.appsContainer.appendChild(button);
        this.buttons.set(window.id, button);
    }

    updateWindow(window) {
        const button = this.buttons.get(window.id);

        if (!button) {
            return;
        }

        button.textContent = window.title;

        button.classList.toggle(
            "active",
            !window.minimized
        );
    }

    removeWindow(id) {
        const button = this.buttons.get(id);

        if (button) {
            button.remove();
        }

        this.buttons.delete(id);
    }

    destroy() {
        if (this.clockTimer) {
            clearInterval(this.clockTimer);
        }

        this.buttons.clear();
    }
}

export default Taskbar;
