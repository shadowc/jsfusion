import { Logger } from '../logger';

/**
 * Returns the result of JSON parse or an array of strings representing the different words in an attribute
 */
export const parseAttribute = (element: Element, attribute: string): string|boolean|number|object|string[] => {
    const attrValue = element.getAttribute(attribute).trim();

    Logger.log(`Parsing attribute ${attribute} for value "${attrValue}"`);

    try {
        return JSON.parse(attrValue);
    } catch (e) {
        return attrValue.split(' ');
    }
};
