import { IDataRefStrategy } from '../types/data-ref';
import { Logger } from '../logger';

export const getRefStrategiesFromParsedAttribute = (
    parsedAttribute: string|boolean|number|object|Array<any>
): IDataRefStrategy[] => {
    if (!Array.isArray(parsedAttribute)) {
        Logger.error('Invalid data when trying to parse data-ref attribute', parsedAttribute);
        throw 'Syntax error data-ref.';
    }

    const dataRefStrategy: IDataRefStrategy[] = [];

    parsedAttribute.forEach((word) => {
        if (typeof word !== 'string') {
            Logger.error('Invalid data when trying to parse data-ref attribute', parsedAttribute);
            throw 'Syntax error data-ref.';
        }

        const matches = word.match(/^(.+)\.(.+)$/);

        if (matches === null) {
            Logger.error('Invalid syntax when trying to parse a data-ref strategy', word);
            throw 'Syntax error data-ref.';
        }

        dataRefStrategy.push({
            componentName: matches[1],
            refName: matches[2],
        });
    });

    return dataRefStrategy;
}
