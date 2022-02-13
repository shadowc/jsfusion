import { IAttributeHandler } from '../types/attribute-handler';
import { AbstractHandler } from './abstract-handler';

export class ComponentHandler extends AbstractHandler implements IAttributeHandler {
    handleAttribute(attribute: string, element: Element): void {
        const attrValue = element.getAttribute(attribute);
        const componentNames = this.parseDataComponentAttribute(attrValue);

        componentNames.forEach((component) => {
            this.parent.registerComponentElement(component, element);
        });
    }

    private parseDataComponentAttribute(text: string): string[] {
        let componentList: string[] = [];

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