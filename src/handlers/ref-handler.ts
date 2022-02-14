import { AbstractHandler } from './abstract-handler';
import { IAttributeHandler } from '../types/attribute-handler';
import { Logger } from '../logger';

export class RefHandler extends AbstractHandler implements IAttributeHandler {
    handleAttribute(attribute: string, element: Element) {
        const attrValue = element.getAttribute(attribute);
        Logger.log(`Attempting to add a ref to a component for ${attribute}: ${attrValue}`, element);
    }
}
