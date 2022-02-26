import { AbstractHandler } from './abstract-handler';
import { IAttributeHandler } from '../types/attribute-handler';
import { Logger } from '../logger';
import { parseAttribute } from '../helpers/parse-attribute';

export class RefHandler extends AbstractHandler implements IAttributeHandler {
    handleAttribute(attribute: string, element: Element) {
        const attrValue = parseAttribute(element, attribute);

        Logger.log(`Attempting to add a ref to a component for ${attribute}`, element, attrValue);
    }
}
