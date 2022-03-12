import { IAttributeHandler } from '../types/attribute-handler';
import { Logger } from '../logger';
import { AbstractHandler } from './abstract-handler';
import { parseAttribute } from '../helpers/parse-attribute';
import { getBindStrategiesFromParsedAttribute } from '../helpers/get-bind-strategies-from-parsed-attribute';

export class BindHandler extends AbstractHandler implements IAttributeHandler {
    handleAttribute(attribute: string, element: Element) {
        const bindStrategies = getBindStrategiesFromParsedAttribute(parseAttribute(element, attribute));

        // Logger.log(`Attempting to bind a value to an element for ${attribute}`, element, attrValue);

        bindStrategies.forEach((bindStrategy) => {

        });
    }
}
