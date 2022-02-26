import { ILogger } from './types/logger';

declare var APP_ENV: string;

if (APP_ENV !== 'production') {
    console.warn(`You are running JsFusion in ${APP_ENV} mode.`)
}

let LoggerImpl: ILogger|Console;
if (APP_ENV !== 'production') {
    LoggerImpl = console;
} else {
    import { NullLogger } from './null-logger';
    LoggerImpl = NullLogger;
}

export const Logger = LoggerImpl;
