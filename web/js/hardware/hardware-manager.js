/* hardware manager */

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
            gamepad: "getGamepads" in navigator,
            geolocation: "geolocation" in navigator,
            notifications: "Notification" in window,

            filesystem: !!(
                window.showOpenFilePicker ||
                window.showSaveFilePicker
            )
        };
    }

    /*
      hardware capability check
     */
    isSupported(device) {
        return this.capabilities[device] === true;
    }

    /**
      Returning all detected capabilities.
     */
    getCapabilities() {
        return { ...this.capabilities };
    }

    /**
      camera/microphone 
     */
    async requestMedia(options = {}) {
        if (!this.isSupported("camera")) {
            throw new Error("Media devices are not supported.");
        }

        const constraints = {
            video: options.video ?? false,
            audio: options.audio ?? false
        };

        return navigator.mediaDevices.getUserMedia(constraints);
    }

    /**
      Bluetooth 
     */
    async requestBluetooth(options = {}) {
        if (!this.isSupported("bluetooth")) {
            throw new Error("Bluetooth is not supported.");
        }

        return navigator.bluetooth.requestDevice(
            options.filters
                ? { filters: options.filters }
                : { acceptAllDevices: true }
        );
    }

    /**
      USB device
     */
    async requestUSB(filters = []) {
        if (!this.isSupported("usb")) {
            throw new Error("WebUSB is not supported.");
        }

        return navigator.usb.requestDevice({ filters });
    }

    /**
      serial port
     */
    async requestSerial(options = {}) {
        if (!this.isSupported("serial")) {
            throw new Error("Web Serial is not supported.");
        }

        return navigator.serial.requestPort(options);
    }

    /**
      MIDI access
     */
    async requestMIDI() {
        if (!this.isSupported("midi")) {
            throw new Error("Web MIDI is not supported.");
        }

        return navigator.requestMIDIAccess();
    }

    /**
    gamepads
     */
    getGamepads() {
        if (!this.isSupported("gamepad")) {
            return [];
        }

        return Array.from(navigator.getGamepads()).filter(Boolean);
    }
}

const hardware = new HardwareManager();

export default hardware;
