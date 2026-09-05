/**
 * CY-OS Terminal Parser
 *
 * Converts a command line into a command + arguments.
 */

class TerminalParser {
    parse(input) {
        const source = input.trim();

        if (!source) {
            return null;
        }

        const tokens = [];
        let current = "";
        let quote = null;
        let escaping = false;

        for (const char of source) {
            if (escaping) {
                current += char;
                escaping = false;
                continue;
            }

            if (char === "\\") {
                escaping = true;
                continue;
            }

            if (quote) {
                if (char === quote) {
                    quote = null;
                } else {
                    current += char;
                }

                continue;
            }

            if (char === '"' || char === "'") {
                quote = char;
                continue;
            }

            if (/\s/.test(char)) {
                if (current.length > 0) {
                    tokens.push(current);
                    current = "";
                }

                continue;
            }

            current += char;
        }

        if (escaping) {
            current += "\\";
        }

        if (current.length > 0) {
            tokens.push(current);
        }

        if (tokens.length === 0) {
            return null;
        }

        return {
            command: tokens[0],
            args: tokens.slice(1),
            raw: source
        };
    }
}

export default TerminalParser;
