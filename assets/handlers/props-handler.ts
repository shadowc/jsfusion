import { IAttributeHandler } from '../types/attribute-handler';
import { IRuntime } from '../types/runtime';

export class PropsHandler implements IAttributeHandler {
    parent: IRuntime;

    constructor(parent: IRuntime) {
        this.parent = parent;
    }

    handleAttribute(attribute: String, element: Element): void {
        const attrValue = element.getAttribute(attribute);
        console.log(`Attempting to add props to a component for ${attribute}: ${attrValue}`, element);
    }
}
