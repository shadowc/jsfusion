declare var APP_ENV: string;

if (APP_ENV !== 'production') {
    console.warn(`You are running JsFusion in ${APP_ENV} mode.`)
}

export class Logger {
    static log(...args: any[]) {
        if (APP_ENV !== 'production') {
            console.log(...args);
        }
    }
}
