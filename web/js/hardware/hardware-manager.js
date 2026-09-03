/** Hardware manager */
class HardwareManager {
    constructor() {
        this.capabilities = {
            camera: !!(
                navigator.mediaDevices &&
                navigator.mediaDevices.getUserMedia
            ),

            microphone: !!(
                navigator.mediaDevices &&
                navigator.mediaDevices.getUserMedia
            ),

            bluetooth: "bluetooth" in navigator,
            usb: "usb" in navigator,
            serial: "serial" in navigator,
            midi: "requestMIDIAccess" in navigator,
            gamepad: "getGamepads" in navigator
        };
    }

    /** Checking if hardware capability is supported or not */
    isSupported(device) {
        return this.capabilities[device] === true;
    }

    /** Return all detected hardware ability stuff */
    getCapabilities() {
        return { ...this.capabilities };
    }
}

const hardware = new HardwareManager();

export default hardware;