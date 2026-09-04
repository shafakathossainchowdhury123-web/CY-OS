/**
 * CY-OS Desktop
   Owns the desktop surface and basic desktop-level UI.
  Browser DOM is the display surface. */

class Desktop {
    constructor(options = {}) {
        this.root = options.root ?? null;
        this.windowsLayer = null;
        this.background = null;
    }

    mount(root) {
        if (!root) {
            throw new Error("Desktop root element is required.");
        }

        this.root = root;

        this.root.classList.add("cy-desktop");

        this.root.innerHTML = "";

        this.background = document.createElement("div");
        this.background.className = "cy-desktop-background";

        this.windowsLayer = document.createElement("div");
        this.windowsLayer.className = "cy-windows-layer";

        this.root.appendChild(this.background);
        this.root.appendChild(this.windowsLayer);

        return this.root;
    }

    getRoot() {
        return this.root;
    }

    getWindowsLayer() {
        return this.windowsLayer;
    }

    setBackground(value) {
        if (!this.background) {
            return;
        }

        if (value.startsWith("#") || value.startsWith("rgb")) {
            this.background.style.background = value;
            return;
        }

        this.background.style.backgroundImage = `url("${value}")`;
        this.background.style.backgroundSize = "cover";
        this.background.style.backgroundPosition = "center";
    }

    clearWindows() {
        if (this.windowsLayer) {
            this.windowsLayer.innerHTML = "";
        }
    }
}

export default Desktop;
