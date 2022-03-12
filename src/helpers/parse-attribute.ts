import { Logger } from '../logger';

/**
 * Returns the result of JSON parse or an array of strings representing the different words in an attribute
 */
export const parseAttribute = (element: Element, attribute: string): string|boolean|number|object|Array<any> => {
    const origAttr = element.getAttribute(attribute);
    const attrValue = origAttr ? origAttr.trim() : '';

    Logger.log(`Parsing attribute ${attribute} for value "${attrValue}"`);

    try {
        return JSON.parse(attrValue);
    } catch (e) {
        return attrValue.split(' ');
    }
};
