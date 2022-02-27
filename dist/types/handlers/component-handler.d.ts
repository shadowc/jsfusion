import { IAttributeHandler } from '../types/attribute-handler';
import { AbstractHandler } from './abstract-handler';
export declare class ComponentHandler extends AbstractHandler implements IAttributeHandler {
    handleAttribute(attribute: string, element: Element): void;
}
