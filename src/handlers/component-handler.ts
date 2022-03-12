import { IAttributeHandler } from '../types/attribute-handler';
import { AbstractHandler } from './abstract-handler';
import { parseAttribute } from '../helpers/parse-attribute';
import { getComponentNamesFromParsedAttribute } from '../helpers/get-component-names-from-parsed-attribute';

export class ComponentHandler extends AbstractHandler implements IAttributeHandler {
    handleAttribute(attribute: string, element: HTMLElement): void {
        const componentNames = getComponentNamesFromParsedAttribute(parseAttribute(element, attribute));

        componentNames.forEach((component) => {
            this.parent.registerComponentElement(component, element);
        });
    }
}
