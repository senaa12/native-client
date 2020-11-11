const { spawn } = require('child_process');

const executeSystemCommand = (commandString: string) => {
    const args = commandString.split(' ');
    const command = args.shift();
    const sp = spawn(command, args);
};

module.exports = executeSystemCommand;
