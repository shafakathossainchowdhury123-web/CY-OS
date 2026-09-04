/**
 * CY-OS Window Events
 */

class WindowEvents {
    constructor(windowManager) {
        this.windowManager = windowManager;
        this.dragging = null;
    }

    attach(element, window) {
        if (!element || !window) {
            return;
        }

        element.addEventListener("mousedown", () => {
            this.windowManager.focus(window.id);
        });

        const titleBar = element.querySelector(
            "[data-window-titlebar]"
        );

        if (!titleBar) {
            return;
        }

        titleBar.addEventListener("mousedown", event => {
            this.startDrag(event, window);
        });

        window.addEventListener("mousemove", event => {
            this.drag(event);
        });

        window.addEventListener("mouseup", () => {
            this.stopDrag();
        });
    }

    startDrag(event, window) {
        this.dragging = {
            window,
            offsetX: event.clientX - window.x,
            offsetY: event.clientY - window.y
        };
    }

    drag(event) {
        if (!this.dragging) {
            return;
        }

        const { window, offsetX, offsetY } = this.dragging;

        window.move(
            event.clientX - offsetX,
            event.clientY - offsetY
        );
    }

    stopDrag() {
        this.dragging = null;
    }
}

export default WindowEvents;
