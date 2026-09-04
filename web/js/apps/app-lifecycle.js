/**
 * CY-OS Application Lifecycle
 */

class AppLifecycle {
    constructor() {
        this.running = new Map();
    }

    start(app) {
        if (!app) {
            throw new Error("Application is required.");
        }

        if (this.running.has(app.id)) {
            return this.running.get(app.id);
        }

        const instance = {
            id: app.id,
            app,
            startedAt: Date.now()
        };

        this.running.set(app.id, instance);

        if (typeof app.onStart === "function") {
            app.onStart(instance);
        }

        return instance;
    }

    stop(id) {
        const instance = this.running.get(id);

        if (!instance) {
            return false;
        }

        if (typeof instance.app.onStop === "function") {
            instance.app.onStop(instance);
        }

        this.running.delete(id);

        return true;
    }

    isRunning(id) {
        return this.running.has(id);
    }

    getRunning() {
        return Array.from(this.running.values());
    }
}

const lifecycle = new AppLifecycle();

export default lifecycle;
