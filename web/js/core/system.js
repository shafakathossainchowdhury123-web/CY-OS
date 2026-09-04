/**
 * CY-OS System Controller
 *
 * Coordinates the WebOS environment.
 * This is NOT an operating-system kernel.
 */

import state from "./state.js";
import appManager from "../apps/app-manager.js";
import windowManager from "../window-manager/window-manager.js";
import hardware from "../hardware/hardware-manager.js";

class CYSystem {
    constructor() {
        this.started = false;
    }

    async start() {
        if (this.started) {
            return;
        }

        this.setupNetworkEvents();

        state.set("booted", true);

        this.started = true;

        console.log("CY-OS started.");
        console.log("Hardware:", hardware.getCapabilities());
    }

    setupNetworkEvents() {
        window.addEventListener("online", () => {
            state.set("network", {
                online: true
            });
        });

        window.addEventListener("offline", () => {
            state.set("network", {
                online: false
            });
        });
    }

    getState() {
        return state.getAll();
    }

    getHardware() {
        return hardware;
    }

    getApps() {
        return appManager.getApps();
    }

    getWindows() {
        return windowManager.getWindows();
    }
}

const system = new CYSystem();

export default system;
