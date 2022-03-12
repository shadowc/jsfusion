import { IAttributeHandler } from '../types/attribute-handler';
import { Logger } from '../logger';
import { AbstractHandler } from './abstract-handler';
import { parseAttribute } from '../helpers/parse-attribute';
import { getBindStrategiesFromParsedAttribute } from '../helpers/get-bind-strategies-from-parsed-attribute';
import { getNearestComponent } from '../helpers/get-nearest-component';

export class BindHandler extends AbstractHandler implements IAttributeHandler {
    handleAttribute(attribute: string, element: HTMLElement) {
        const bindStrategies = getBindStrategiesFromParsedAttribute(parseAttribute(element, attribute));

        // Logger.log(`Attempting to bind a value to an element for ${attribute}`, element, attrValue);

        bindStrategies.forEach((bindStrategy) => {
            Logger.log(`Attempting to bind for ${bindStrategy.strategyName} on "${bindStrategy.componentName}.${bindStrategy.propName}".`);

            // Find the correct strategy
            if (typeof this.parent.dataBindHandlers.handlers[bindStrategy.strategyName] === 'undefined') {
                Logger.log(`Error trying to bind for strategy "${bindStrategy.strategyName}". No such strategy exists!`);
                throw 'Invalid data-bind strategy.';
            }

            const strategyHandler = this.parent.dataBindHandlers.handlers[bindStrategy.strategyName];

            // Find the right component
            const component = getNearestComponent(element, bindStrategy.componentName, this.parent);

            if (component === null) {
                Logger.log(`Error trying to find component "${bindStrategy.componentName}" for data binding. Have you mispelled the component name?`);
                throw 'Invalid component in data-bind. Component not found.';
            }

            // Find the component prop
            const initialPropValue = component.props[bindStrategy.propName];
            if (typeof initialPropValue === 'undefined') {
                Logger.log(`Error trying to bind "${bindStrategy.strategyName}" to "${bindStrategy.componentName}.${bindStrategy.propName}". The prop doesn't exist.`);
                throw 'Invalid prop name in data-bind. Found component but no prop found.';
            }

            // Register the binding with the initial prop value on the component
            component.addPropSideEffect(bindStrategy.propName, (propValue) => {
                strategyHandler.updateBinding(element, propValue);
            });

            // Actually get the first side effect going
            strategyHandler.updateBinding(element, initialPropValue);
        });
    }
}
