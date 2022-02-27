import { NullLogger } from './null-logger';
declare type ConsoleImpl = typeof console | typeof NullLogger;
export declare const Logger: ConsoleImpl;
export {};
