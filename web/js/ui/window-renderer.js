/* Converts logical CYWindow objects into DOM windows */

class WindowRenderer {
    constructor(windowManager) {
        this.windowManager = windowManager;
    }

    render(window, container) {
        if (!window) {
            throw new Error("Window is required.");
        }

        if (!container) {
            throw new Error("Window container is required.");
        }

        const element = document.createElement("section");

        element.className = "cy-window";

        element.dataset.windowId = window.id;

        element.innerHTML = `
            <header class="cy-window-titlebar" data-window-titlebar>
                <span class="cy-window-title"></span>

                <div class="cy-window-controls">
                    <button
                        type="button"
                        data-window-action="minimize"
                        aria-label="Minimize"
                    >−</button>

                    <button
                        type="button"
                        data-window-action="maximize"
                        aria-label="Maximize"
                    >□</button>

                    <button
                        type="button"
                        data-window-action="close"
                        aria-label="Close"
                    >×</button>
                </div>
            </header>

            <main class="cy-window-content"></main>
        `;

        const title = element.querySelector(".cy-window-title");

        title.textContent = window.title;

        const content = element.querySelector(".cy-window-content");

        if (window.content instanceof Node) {
            content.appendChild(window.content);
        }

        container.appendChild(element);

        this.windowManager.registerElement(window, element);

        this.bindControls(element, window);

        return element;
    }

    bindControls(element, window) {
        element.addEventListener("mousedown", () => {
            this.windowManager.focus(window.id);
        });

        const buttons = element.querySelectorAll(
            "[data-window-action]"
        );

        buttons.forEach(button => {
            button.addEventListener("mousedown", event => {
                event.stopPropagation();
            });

            button.addEventListener("click", event => {
                event.stopPropagation();

                const action = button.dataset.windowAction;

                if (action === "minimize") {
                    this.windowManager.minimize(window.id);
                }

                if (action === "maximize") {
                    this.windowManager.maximize(window.id);
                }

                if (action === "close") {
                    this.windowManager.close(window.id);
                }
            });
        });
    }

    update(window) {
        if (!window.element) {
            return;
        }

        const title = window.element.querySelector(
            ".cy-window-title"
        );

        if (title) {
            title.textContent = window.title;
        }

        window.updateElement();
    }
}

export default WindowRenderer;
