import { IAttributeHandler } from '../types/attribute-handler';
import { AbstractHandler } from './abstract-handler';

export class BindHandler extends AbstractHandler implements IAttributeHandler {
    handleAttribute(attribute: string, element: Element) {
        const attrValue = element.getAttribute(attribute);
        console.log(`Attempting to bind a value to an element for ${attribute}: ${attrValue}`, element);
    }
}
