/* Window State */

class WindowState {
    constructor() {
        this.windows = new Map();
        this.activeWindowId = null;
    }

    add(window) {
        if (!window || !window.id) {
            throw new Error("Invalid window.");
        }

        this.windows.set(window.id, window);
        this.activeWindowId = window.id;

        return window;
    }

    remove(id) {
        this.windows.delete(id);

        if (this.activeWindowId === id) {
            const remaining = Array.from(this.windows.keys());
            this.activeWindowId = remaining.at(-1) ?? null;
        }
    }

    get(id) {
        return this.windows.get(id);
    }

    getAll() {
        return Array.from(this.windows.values());
    }

    setActive(id) {
        if (!this.windows.has(id)) {
            return false;
        }

        this.activeWindowId = id;
        return true;
    }

    getActive() {
        return this.activeWindowId
            ? this.windows.get(this.activeWindowId)
            : null;
    }

    clear() {
        this.windows.clear();
        this.activeWindowId = null;
    }
}

export default WindowState;
