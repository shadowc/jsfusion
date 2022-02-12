import { IAttributeHandler } from '../types/attribute-handler';
import { IRuntime } from '../types/runtime';

export class ComponentHandler implements IAttributeHandler {
    parent: IRuntime;

    constructor(parent: IRuntime) {
        this.parent = parent;
    }

    handleAttribute(attribute: String, element: Element): void {
        const attrValue = element.getAttribute(attribute);
        const componentNames = this.parseDataComponentAttribute(attrValue);

        componentNames.forEach((component) => {
            this.parent.registerComponentElement(component, element);
        });
    }

    private parseDataComponentAttribute(text: string) {
        let componentList = [];

        if (text.indexOf('[') !== -1) { // assume json array
            const parsedText: string[] = JSON.parse(text);

            if (!(typeof parsedText.length !== 'undefined' && parsedText instanceof Object)) {
                throw `Invalid format when parsing data-component attribute value ${text}`;
            }

            parsedText.forEach((key) => {
                componentList.push(key);
            });
        } else {
            componentList = text.split(' ');
        }

        return componentList;
    }
}
