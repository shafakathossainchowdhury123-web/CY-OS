import TerminalState from  "./terminal-state.js";
import TerminalParser from  "./terminal-parser.js";
import TerminalCommands from  "./terminal-commands.js";

class terminal{
    constructor(){
        this.state = new TerminalState();
        this.parser = new TerminalParser();
        this.commands = new TerminalCommands(this.state);
        this.outputListeners = new Set();
    }
    execute(input){
        const parsed = this.parser.parse(input);
        if (!parsed){
        return null;
     }
    }
}
