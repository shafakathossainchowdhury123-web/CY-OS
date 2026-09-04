/**
 * CY-OS Application Registry
 */

class AppRegistry {
    constructor() {
        this.apps = new Map();
    }

    register(app) {
        if (!app || !app.id) {
            throw new Error("Application must have an id.");
        }

        if (this.apps.has(app.id)) {
            throw new Error(`Application already registered: ${app.id}`);
        }

        this.apps.set(app.id, {
            id: app.id,
            name: app.name ?? app.id,
            icon: app.icon ?? "",
            version: app.version ?? "1.0.0",
            entry: app.entry ?? null
        });

        return this.apps.get(app.id);
    }

    unregister(id) {
        return this.apps.delete(id);
    }

    get(id) {
        return this.apps.get(id);
    }

    has(id) {
        return this.apps.has(id);
    }

    getAll() {
        return Array.from(this.apps.values());
    }
}

const appRegistry = new AppRegistry();

export default appRegistry;
