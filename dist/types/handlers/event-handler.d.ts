import { IAttributeHandler } from '../types/attribute-handler';
import { AbstractHandler } from './abstract-handler';
export declare class EventHandler extends AbstractHandler implements IAttributeHandler {
    handleAttribute(attribute: string, element: HTMLElement): void;
}
