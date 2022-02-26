import {ILogger} from "./types/logger";

export const NullLogger: ILogger = {
    log: () => {},
};
