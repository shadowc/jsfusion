/**
 * Strip down version of console for null logging
 */
export const NullLogger = {
    info(...message: (any)[]): void {},
    log: (...data: any[]): void => {},
    error: (...data: any[]): void => {},
    warn: (...data: any[]): void => {}
};
