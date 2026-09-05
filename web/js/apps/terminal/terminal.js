/**
 * CY-OS Terminal
 *
 * A command-line application running inside CY-OS.
 */

import TerminalState from "./terminal-state.js";
import TerminalParser from "./terminal-parser.js";
import TerminalCommands from "./terminal-commands.js";

class Terminal {
    constructor() {
        this.state = new TerminalState();
        this.parser = new TerminalParser();
        this.commands = new TerminalCommands(this.state);

        this.outputListeners = new Set();
    }

    execute(input) {
        const parsed = this.parser.parse(input);

        if (!parsed) {
            return null;
        }

        this.state.addHistory(parsed.raw);
        this.state.resetHistoryPosition();

        const result = this.commands.execute(
            parsed.command,
            parsed.args
        );

        this.emit(result);

        return result;
    }

    onOutput(listener) {
        this.outputListeners.add(listener);

        return () => {
            this.outputListeners.delete(listener);
        };
    }

    emit(result) {
        for (const listener of this.outputListeners) {
            listener(result);
        }
    }

    getState() {
        return this.state;
    }

    getCommands() {
        return this.commands.getCommands();
    }

    previousHistory() {
        return this.state.previousHistory();
    }

    nextHistory() {
        return this.state.nextHistory();
    }
}

const terminal = new Terminal();

export default terminal;
