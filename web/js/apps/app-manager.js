/**
 * CY-OS Application Manager
 */

import registry from "./app-registry.js";
import lifecycle from "./app-lifecycle.js";
import windowManager from "../window-manager/window-manager.js";

class AppManager {
    register(app) {
        return registry.register(app);
    }

    launch(id, options = {}) {
        const app = registry.get(id);

        if (!app) {
            throw new Error(`Application not found: ${id}`);
        }

        const instance = lifecycle.start(app);

        const window = windowManager.create({
            title: app.name,
            appId: app.id,
            width: options.width,
            height: options.height
        });

        instance.window = window;

        return instance;
    }

    close(id) {
        const instance = lifecycle.getRunning()
            .find(item => item.id === id);

        if (!instance) {
            return false;
        }

        if (instance.window) {
            windowManager.close(instance.window.id);
        }

        return lifecycle.stop(id);
    }

    isRunning(id) {
        return lifecycle.isRunning(id);
    }

    getApps() {
        return registry.getAll();
    }

    getRunningApps() {
        return lifecycle.getRunning();
    }
}

const appManager = new AppManager();

export default appManager;
