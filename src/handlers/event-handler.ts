import { IAttributeHandler } from '../types/attribute-handler';
import { Logger } from '../logger';
import { AbstractHandler } from './abstract-handler';
import { parseAttribute } from '../helpers/parse-attribute';

export class EventHandler extends AbstractHandler implements IAttributeHandler {
    handleAttribute(attribute: string, element: HTMLElement) {
        const attrValue = parseAttribute(element, attribute);

        Logger.log(`Attempting to bind an event to an element for ${attribute}`, element, attrValue);
    }
}
