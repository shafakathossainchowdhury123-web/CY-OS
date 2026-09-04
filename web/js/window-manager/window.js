/**
 * CY-OS Window
 */

class CYWindow {
    constructor(options = {}) {
        this.id = options.id ?? crypto.randomUUID();
        this.title = options.title ?? "CY-OS Window";
        this.appId = options.appId ?? null;

        this.x = options.x ?? 100;
        this.y = options.y ?? 100;

        this.width = options.width ?? 640;
        this.height = options.height ?? 480;

        this.minimized = false;
        this.maximized = false;
        this.zIndex = options.zIndex ?? 1;

        this.element = options.element ?? null;
    }

    move(x, y) {
        this.x = x;
        this.y = y;
        this.updateElement();
    }

    resize(width, height) {
        this.width = Math.max(200, width);
        this.height = Math.max(120, height);
        this.updateElement();
    }

    minimize() {
        this.minimized = true;

        if (this.element) {
            this.element.style.display = "none";
        }
    }

    restore() {
        this.minimized = false;

        if (this.element) {
            this.element.style.display = "";
        }
    }

    maximize() {
        this.maximized = true;

        if (!this.element) {
            return;
        }

        this.element.style.left = "0";
        this.element.style.top = "0";
        this.element.style.width = "100vw";
        this.element.style.height = "100vh";
    }

    updateElement() {
        if (!this.element || this.maximized) {
            return;
        }

        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
    }
}

export default CYWindow;
