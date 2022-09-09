import { NativeMessage } from 'common-native-client';

const fs = require('fs');
const functionUtils = require('./utils/functionUtils');

type FunctionType = (...args: any[]) => any;

const log = (messageTitle: string, messageBody?: string) => {
    const fileName = 'log.txt';

    fs.appendFileSync(fileName, `${messageTitle}\n`);
    
    if (!!messageBody?.length) {
        fs.appendFileSync(fileName, `${messageBody}\n\n`);
    }
}

const messageLogger = (func: FunctionType, isProduction: boolean) => {
    const innerLog = (...args: any[]) => {
        if (args.length && args.findIndex((x) => x.type === 'chromex.dispatch') > -1) {
            return;
        }

        log('Message Received!', JSON.stringify(args));
    };

    if (isProduction) {
        return functionUtils.wrapFunction(func);
    }

    return functionUtils.wrapFunction(func, innerLog);
};

module.exports = messageLogger;
module.exports.log = log;
