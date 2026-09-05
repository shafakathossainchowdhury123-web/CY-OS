/**
 * CY-OS Terminal Commands
 */

class TerminalCommands {
    constructor(state) {
        this.state = state;

        this.commands = new Map();

        this.registerBuiltIns();
    }

    register(name, handler, description = "") {
        this.commands.set(name, {
            name,
            handler,
            description
        });
    }

    registerBuiltIns() {
        this.register(
            "help",
            () => this.help(),
            "Show available commands."
        );

        this.register(
            "clear",
            () => ({
                type: "clear"
            }),
            "Clear the terminal."
        );

        this.register(
            "pwd",
            () => ({
                type: "output",
                text: this.state.getDirectory()
            }),
            "Print working directory."
        );

        this.register(
            "echo",
            args => ({
                type: "output",
                text: args.join(" ")
            }),
            "Print text."
        );

        this.register(
            "whoami",
            () => ({
                type: "output",
                text: this.state.getEnvironment("USER") ?? "user"
            }),
            "Show current user."
        );

        this.register(
            "uname",
            () => ({
                type: "output",
                text: "CY-OS Web Runtime"
            }),
            "Show system information."
        );

        this.register(
            "env",
            () => ({
                type: "output",
                text: Object.entries(
                    this.state.getAllEnvironment()
                )
                    .map(([key, value]) => `${key}=${value}`)
                    .join("\n")
            }),
            "Show environment variables."
        );

        this.register(
            "history",
            () => ({
                type: "output",
                text: this.state.history
                    .map((command, index) =>
                        `${index + 1}  ${command}`
                    )
                    .join("\n")
            }),
            "Show command history."
        );
    }

    execute(command, args) {
        const entry = this.commands.get(command);

        if (!entry) {
            return {
                type: "error",
                text: `${command}: command not found`
            };
        }

        try {
            return entry.handler(args);
        } catch (error) {
            return {
                type: "error",
                text: error.message
            };
        }
    }

    help() {
        const lines = [];

        for (const command of this.commands.values()) {
            lines.push(
                `${command.name.padEnd(10)} ${command.description}`
            );
        }

        return {
            type: "output",
            text: lines.join("\n")
        };
    }

    getCommands() {
        return Array.from(this.commands.values());
    }
}

export default TerminalCommands;
