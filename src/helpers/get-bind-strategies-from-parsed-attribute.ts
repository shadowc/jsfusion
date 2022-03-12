import { Logger } from '../logger';
import { IDataBindStrategy } from '../types/data-bind';

export const getBindStrategiesFromParsedAttribute = (
    parsedAttribute: string|boolean|number|object|Array<any>
): IDataBindStrategy[] => {
    if (
        !Array.isArray(parsedAttribute)
    ) {
        Logger.error('Invalid data when trying to parse data-component attribute', parsedAttribute);
        throw 'Syntax error data-bind.';
    }

    const dataBindStrategy: IDataBindStrategy[] = [];

    parsedAttribute.forEach((word) => {
        if (typeof word !== 'string') {
            Logger.error('Invalid data when trying to parse data-component attribute', parsedAttribute);
            throw 'Syntax error data-bind.';
        }

        const matches = word.match(/^(.+):(.+)\.(.+)$/);

        if (matches === null) {
            Logger.error('Invalid syntax when trying to parse a data-bind strategy', word);
            throw 'Syntax error data-bind.';
        }

        dataBindStrategy.push({
            strategyName: matches[1],
            componentName: matches[2],
            propName: matches[3],
        });
    });

    return dataBindStrategy;
};
