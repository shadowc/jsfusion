import { IAttributeHandler } from '../types/attribute-handler';
import { AbstractHandler } from './abstract-handler';
export declare class BindHandler extends AbstractHandler implements IAttributeHandler {
    handleAttribute(attribute: string, element: Element): void;
}
