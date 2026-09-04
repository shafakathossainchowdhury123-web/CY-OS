/**
 * CY-OS Window Manager
 *
 * Manages application windows inside the WebOS interface.
 */

import WindowState from "./window-state.js";
import CYWindow from "./window.js";

class WindowManager {
    constructor() {
        this.state = new WindowState();
        this.zIndex = 10;
    }

    create(options = {}) {
        const window = new CYWindow(options);

        window.zIndex = ++this.zIndex;

        this.state.add(window);

        return window;
    }

    registerElement(window, element) {
        window.element = element;

        window.updateElement();

        element.dataset.windowId = window.id;

        this.focus(window.id);
    }

    focus(id) {
        const window = this.state.get(id);

        if (!window) {
            return false;
        }

        window.zIndex = ++this.zIndex;

        if (window.element) {
            window.element.style.zIndex = window.zIndex;
        }

        this.state.setActive(id);

        return true;
    }

    close(id) {
        const window = this.state.get(id);

        if (!window) {
            return false;
        }

        if (window.element) {
            window.element.remove();
        }

        this.state.remove(id);

        return true;
    }

    minimize(id) {
        const window = this.state.get(id);

        if (!window) {
            return false;
        }

        window.minimize();

        return true;
    }

    restore(id) {
        const window = this.state.get(id);

        if (!window) {
            return false;
        }

        window.restore();
        this.focus(id);

        return true;
    }

    maximize(id) {
        const window = this.state.get(id);

        if (!window) {
            return false;
        }

        window.maximize();
        this.focus(id);

        return true;
    }

    getActiveWindow() {
        return this.state.getActive();
    }

    getWindows() {
        return this.state.getAll();
    }
}

const windowManager = new WindowManager();

export default windowManager;
