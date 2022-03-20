import { AbstractHandler } from './abstract-handler';
import { IAttributeHandler } from '../types/attribute-handler';
import { Logger } from '../logger';
import { parseAttribute } from '../helpers/parse-attribute';
import { getRefStrategiesFromParsedAttribute } from '../helpers/get-ref-strategies-from-parsed-attribute';
import { getNearestComponent } from '../helpers/get-nearest-component';

export class RefHandler extends AbstractHandler implements IAttributeHandler {
    handleAttribute(attribute: string, element: HTMLElement) {
        const refStrategies = getRefStrategiesFromParsedAttribute(parseAttribute(element, attribute));

        refStrategies.forEach((refStrategy) => {
            Logger.log(`Attempting to bind a ref on "${refStrategy.componentName}.${refStrategy.refName}".`);

            // Find the right component
            const component = getNearestComponent(element, refStrategy.componentName, this.runtime);

            if (component === null) {
                Logger.log(`Error trying to find component "${refStrategy.componentName}" for data ref. Have you misspelled the component name?`);
                throw 'Invalid component in data-ref. Component not found.';
            }

            component.addRef(refStrategy.refName, element);
        });
    }
}
