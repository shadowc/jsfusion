import { AbstractHandler } from './abstract-handler';
import { IAttributeHandler } from '../types/attribute-handler';
export declare class RefHandler extends AbstractHandler implements IAttributeHandler {
    handleAttribute(attribute: string, element: HTMLElement): void;
}
