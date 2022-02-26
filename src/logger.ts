import { NullLogger } from './null-logger';

declare var APP_ENV: string;

if (APP_ENV !== 'production') {
    console.warn(`You are running JsFusion in ${APP_ENV} mode.`)
}

type ConsoleImpl = typeof console | typeof NullLogger;

export const Logger: ConsoleImpl = (APP_ENV !== 'production') ? console : NullLogger;
