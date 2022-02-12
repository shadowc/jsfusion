import { IAttributeHandler } from '../types/attribute-handler';
import { AbstractHandler } from './abstract-handler';

export class PropsHandler extends AbstractHandler implements IAttributeHandler {
    handleAttribute(attribute: string, element: Element): void {
        const attrValue = element.getAttribute(attribute);
        console.log(`Attempting to add props to a component for ${attribute}: ${attrValue}`, element);
    }
}
