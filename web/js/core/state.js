/**
 * CY-OS Global State
 *
 * This is application state, not an operating-system kernel.
 */

class SystemState {
    constructor() {
        this.state = {
            booted: false,
            user: null,
            theme: "dark",
            volume: 100,
            network: {
                online: navigator.onLine
            }
        };

        this.listeners = new Set();
    }

    get(key) {
        return this.state[key];
    }

    set(key, value) {
        this.state[key] = value;

        this.notify(key, value);
    }

    update(values) {
        Object.entries(values).forEach(([key, value]) => {
            this.set(key, value);
        });
    }

    subscribe(listener) {
        this.listeners.add(listener);

        return () => {
            this.listeners.delete(listener);
        };
    }

    notify(key, value) {
        for (const listener of this.listeners) {
            listener({
                key,
                value,
                state: this.state
            });
        }
    }

    getAll() {
        return structuredClone(this.state);
    }
}

const state = new SystemState();

export default state;
