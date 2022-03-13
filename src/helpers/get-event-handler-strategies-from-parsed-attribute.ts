import { IEventHandlerStrategy } from '../types/data-on';
import { Logger } from '../logger';

export const getEventHandlerStrategiesFromParsedAttribute = (
    parsedAttribute: string|boolean|number|object|Array<any>
): IEventHandlerStrategy[] => {
    if (!Array.isArray(parsedAttribute)) {
        Logger.error('Invalid data when trying to parse data-on attribute', parsedAttribute);
        throw 'Syntax error data-on.';
    }

    const eventHandlerStrategy: IEventHandlerStrategy[] = [];

    parsedAttribute.forEach((word) => {
        if (typeof word !== 'string') {
            Logger.error('Invalid data when trying to parse data-on attribute', parsedAttribute);
            throw 'Syntax error data-on.';
        }

        const matches = word.match(/^(.+):(.+)\.(.+)$/);

        if (matches === null) {
            Logger.error('Invalid syntax when trying to parse a data-on strategy', word);
            throw 'Syntax error data-on.';
        }

        eventHandlerStrategy.push({
            eventName: matches[1],
            componentName: matches[2],
            callbackName: matches[3],
        });
    });

    return eventHandlerStrategy;
}
