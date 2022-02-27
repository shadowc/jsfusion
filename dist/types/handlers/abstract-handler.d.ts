import { IAttributeHandler } from '../types/attribute-handler';
import { IRuntime } from '../types/runtime';
export declare class AbstractHandler implements IAttributeHandler {
    parent: IRuntime;
    constructor(parent: IRuntime);
    handleAttribute(attribute: string, element: Element): void;
}
