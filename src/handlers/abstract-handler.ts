import { IAttributeHandler } from '../types/attribute-handler';
import { IRuntime } from '../types/runtime';

export class AbstractHandler implements IAttributeHandler {
    runtime: IRuntime;

    constructor(parent: IRuntime) {
        this.runtime = parent;
    }

    handleAttribute(attribute: string, element: HTMLElement): void {
        // Abstract method!
    }
}
