/**
 * CY-OS Terminal State
 *
 * Stores terminal session state.
 * This is application state, not a kernel.
 */

class TerminalState {
    constructor() {
        this.cwd = "/";
        this.history = [];
        this.historyIndex = -1;
        this.variables = new Map();
        this.environment = new Map([
            ["SHELL", "cysh"],
            ["OS", "CY-OS"],
            ["TERM", "cy-terminal"]
        ]);
    }

    setDirectory(path) {
        this.cwd = path;
    }

    getDirectory() {
        return this.cwd;
    }

    addHistory(command) {
        if (!command || !command.trim()) {
            return;
        }

        this.history.push(command);

        if (this.history.length > 1000) {
            this.history.shift();
        }

        this.historyIndex = this.history.length;
    }

    previousHistory() {
        if (this.history.length === 0) {
            return "";
        }

        this.historyIndex = Math.max(
            0,
            this.historyIndex - 1
        );

        return this.history[this.historyIndex];
    }

    nextHistory() {
        if (this.history.length === 0) {
            return "";
        }

        this.historyIndex = Math.min(
            this.history.length,
            this.historyIndex + 1
        );

        if (this.historyIndex >= this.history.length) {
            return "";
        }

        return this.history[this.historyIndex];
    }

    setVariable(name, value) {
        this.variables.set(name, String(value));
    }

    getVariable(name) {
        return this.variables.get(name);
    }

    getEnvironment(name) {
        return this.environment.get(name);
    }

    getAllEnvironment() {
        return Object.fromEntries(this.environment);
    }

    resetHistoryPosition() {
        this.historyIndex = this.history.length;
    }
}

export default TerminalState;
