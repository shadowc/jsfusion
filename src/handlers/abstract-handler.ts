import { IAttributeHandler } from '../types/attribute-handler';
import { IRuntime } from '../types/runtime';

export class AbstractHandler implements IAttributeHandler {
    parent: IRuntime;

    constructor(parent: IRuntime) {
        this.parent = parent;
    }

    handleAttribute(attribute: string, element: HTMLElement): void {
        // Abstract method!
    }
}
