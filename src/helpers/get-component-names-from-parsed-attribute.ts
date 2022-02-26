/**
 * Gets a parsed attribute and returns a list of component names, given that the attribute value comes
 * from data-component.
 *
 * Throws an error if the information parsed is not valid
 */
import {Logger} from "../logger";

export const getComponentNamesFromParsedAttribute = (
    parsedAttribute: string|boolean|number|Object|Array<any>
): string[] => {
    if (
        !Array.isArray(parsedAttribute)
    ) {
        Logger.error('Invalid data when trying to parse data-component attribute', parsedAttribute);
        throw 'Syntax error data-component.';
    }

    parsedAttribute.forEach((word) => {
        if (typeof word !== 'string') {
            Logger.error('Invalid data when trying to parse data-component attribute', parsedAttribute);
            throw 'Syntax error data-component.';
        }
    });

    return parsedAttribute;
};
