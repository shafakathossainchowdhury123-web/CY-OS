/* this stuff connects the desktop taskbar windows and notification */

import Desktop from "./desktop.js";
import Taskbar from "./taskbar.js";
import WindowRenderer from "./window-renderer.js";
import notifications from "./notification-manager.js";
import contextMenu from "./context-menu.js";
import windowManager from "../window-manager/window-manager.js";

class DesktopManager {
    constructor() {
        this.desktop = new Desktop();
        this.taskbar = new Taskbar();
        this.renderer = new WindowRenderer(windowManager);
    }

    mount(root = document.body) {
        root.innerHTML = `
            <div id="cy-desktop-root"></div>

            <div id="cy-taskbar-root"></div>

            <div id="cy-notifications-root"></div>
        `;

        const desktopRoot = root.querySelector(
            "#cy-desktop-root"
        );

        const taskbarRoot = root.querySelector(
            "#cy-taskbar-root"
        );

        const notificationsRoot = root.querySelector(
            "#cy-notifications-root"
        );

        this.desktop.mount(desktopRoot);

        this.taskbar.mount(taskbarRoot);

        notifications.mount(notificationsRoot);

        this.setupDesktopEvents();

        return this;
    }

    createWindow(options = {}) {
        const window = windowManager.create(options);

        this.renderer.render(
            window,
            this.desktop.getWindowsLayer()
        );

        this.taskbar.addWindow(window);

        this.taskbar.updateWindow(window);

        return window;
    }

    closeWindow(id) {
        const result = windowManager.close(id);

        if (result) {
            this.taskbar.removeWindow(id);
        }

        return result;
    }

    focusWindow(id) {
        const result = windowManager.focus(id);

        if (!result) {
            return false;
        }

        for (const window of windowManager.getWindows()) {
            this.taskbar.updateWindow(window);
        }

        return true;
    }

    setupDesktopEvents() {
        const root = this.desktop.getRoot();

        root.addEventListener("contextmenu", event => {
            event.preventDefault();

            contextMenu.show(
                event.clientX,
                event.clientY,
                [
                    {
                        label: "New Window",
                        action: () => {
                            this.createWindow({
                                title: "CY-OS Window"
                            });
                        }
                    },
                    {
                        label: "Refresh Desktop",
                        action: () => {
                            location.reload();
                        }
                    }
                ]
            );
        });

        document.addEventListener("click", () => {
            contextMenu.remove();
        });
    }

    notify(message, options = {}) {
        return notifications.show(message, options);
    }
}

const desktopManager = new DesktopManager();

export default desktopManager;
