/**
 * CY-OS Frontend Entry Point
 */

import system from "./core/system.js";
import appManager from "./apps/app-manager.js";

async function startCYOS() {
    try {
        await system.start();

        registerBuiltInApps();

        console.log("CY-OS frontend ready.");
    } catch (error) {
        console.error("CY-OS failed to start:", error);
    }
}

function registerBuiltInApps() {
    appManager.register({
        id: "settings",
        name: "Settings",
        version: "1.0.0"
    });

    appManager.register({
        id: "terminal",
        name: "Terminal",
        version: "1.0.0"
    });

    appManager.register({
        id: "files",
        name: "Files",
        version: "1.0.0"
    });
}

startCYOS();
