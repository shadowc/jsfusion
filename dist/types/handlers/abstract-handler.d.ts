import { IAttributeHandler } from '../types/attribute-handler';
import { IRuntime } from '../types/runtime';
export declare class AbstractHandler implements IAttributeHandler {
    runtime: IRuntime;
    constructor(parent: IRuntime);
    handleAttribute(attribute: string, element: HTMLElement): void;
}
