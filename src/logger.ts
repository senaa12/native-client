const fs = require('fs');

type FunctionType = (...args: any[]) => any;

const wrapFunction = function(
    functionToWrap: FunctionType,
    executeBefore?: FunctionType,
    executeAfter?: FunctionType,
) {
    return function() {
        const args = Array.prototype.slice.call(arguments);
        let result;
        if (!!executeBefore) {
            executeBefore.apply(this, args);
        }

        result = functionToWrap.apply(this, args);

        if (!!executeAfter) {
            executeAfter.apply(this, args);
        }

        return result;
    };

};

const logger = (func: FunctionType, isProduction: boolean) => {
    const log = (...args: any[]) => {
        if (args.length && args.findIndex((x) => x.type === 'chromex.dispatch') > -1) {
            return;
        }

        const fileName = 'log.txt';

        fs.appendFileSync(fileName, 'Message Received!\n');
        fs.appendFileSync(fileName, `${JSON.stringify(args)}\n\n`);
    };

    if (isProduction) {
        return wrapFunction(func);
    }

    return wrapFunction(func, log);
};

module.exports = logger;
