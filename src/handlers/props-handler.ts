import { IAttributeHandler } from '../types/attribute-handler';
import { Logger } from '../logger';
import { AbstractHandler } from './abstract-handler';

export class PropsHandler extends AbstractHandler implements IAttributeHandler {
    handleAttribute(attribute: string, element: Element): void {
        const attrValue = element.getAttribute(attribute);
        Logger.log(`Attempting to add props to a component for ${attribute}: ${attrValue}`, element);
    }
}
