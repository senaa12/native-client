import {
    NativeMessage,
    Push,
    Done,
    NativeMessageTypeEnum,
} from 'common-native-client';

const executeSystemCommand = require('./executeSystemCommand');

function messageHandler(msg: NativeMessage, push: Push, done: Done) {
    switch (msg.type) {
        case NativeMessageTypeEnum.Echo: {
            push(msg);
            done();
            break;
        }
        case NativeMessageTypeEnum.ExecuteCommand: {
            executeSystemCommand(msg.data);
            break;
        }
        default: {
            const exhaustingCheck: never = msg;
        }
    }
}

module.exports = messageHandler;
