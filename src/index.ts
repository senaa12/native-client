const nativeMessage = require('chrome-native-messaging');
const messageHandler = require('./handlers/index');
const messageLogger = require('./logger');

const isProduction = process.env.PRODUCTION !== undefined ? JSON.parse(process.env.PRODUCTION) : false;

const input = new nativeMessage.Input();
const transform = new nativeMessage.Transform(messageLogger(messageHandler, isProduction));
const output = new nativeMessage.Output();

process.stdin
  .pipe(input)
  .pipe(transform)
  .pipe(output)
  .pipe(process.stdout);