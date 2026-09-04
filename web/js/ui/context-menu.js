/* CY-OS Desktop Context Menu */
 

class ContextMenu {
    constructor() {
        this.element = null;
    }

    create(items = []) {
        this.remove();

        const menu = document.createElement("div");

        menu.className = "cy-context-menu";

        for (const item of items) {
            const button = document.createElement("button");

            button.type = "button";
            button.textContent = item.label ?? "Action";

            button.addEventListener("click", () => {
                this.remove();
                item.action?.();
            });

            menu.appendChild(button);
        }

        document.body.appendChild(menu);

        this.element = menu;

        return menu;
    }

    show(x, y, items) {
        const menu = this.create(items);

        menu.style.left = `${x}px`;
        menu.style.top = `${y}px`;

        requestAnimationFrame(() => {
            const rect = menu.getBoundingClientRect();

            if (rect.right > window.innerWidth) {
                menu.style.left = `${window.innerWidth - rect.width - 8}px`;
            }

            if (rect.bottom > window.innerHeight) {
                menu.style.top = `${window.innerHeight - rect.height - 8}px`;
            }
        });
    }

    remove() {
        if (this.element) {
            this.element.remove();
            this.element = null;
        }
    }
}

const contextMenu = new ContextMenu();

export default contextMenu;
