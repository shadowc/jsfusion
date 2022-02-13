import { IAttributeHandler } from '../types/attribute-handler';
import { AbstractHandler } from './abstract-handler';

export class EventHandler extends AbstractHandler implements IAttributeHandler {
    handleAttribute(attribute: string, element: Element) {
        const attrValue = element.getAttribute(attribute);
        console.log(`Attempting to bind an event to an element for ${attribute}: ${attrValue}`, element);
    }
}
