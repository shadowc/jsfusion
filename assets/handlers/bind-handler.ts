import {IAttributeHandler} from '../types/attribute-handler';
import {IRuntime} from "../types/runtime";

export class BindHandler implements IAttributeHandler {
    parent: IRuntime;

    constructor(parent: IRuntime) {
        this.parent = parent;
    }

    handleAttribute(attribute: string, element: Element) {
        const attrValue = element.getAttribute(attribute);
        console.log(`Attempting to bind a value to an element for ${attribute}: ${attrValue}`, element);
    }
}
