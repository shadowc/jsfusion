import { IAttributeHandler } from '../types/attribute-handler';
import { Logger } from '../logger';
import { AbstractHandler } from './abstract-handler';
import { parseAttribute } from '../helpers/parse-attribute';
import {
    getEventHandlerStrategiesFromParsedAttribute
} from '../helpers/get-event-handler-strategies-from-parsed-attribute';
import { getNearestComponent } from '../helpers/get-nearest-component';
import { EventHandlerCallback } from '../types/data-on';

export class EventHandler extends AbstractHandler implements IAttributeHandler {
    handleAttribute(attribute: string, element: HTMLElement) {
        const eventHandlerStrategies = getEventHandlerStrategiesFromParsedAttribute(parseAttribute(element, attribute));

        eventHandlerStrategies.forEach((eventHandlerStrategy) => {
            Logger.log(`Attempting to bind event ${eventHandlerStrategy.eventName} on "${eventHandlerStrategy.componentName}.${eventHandlerStrategy.callbackName}".`);

            // Find the right component
            const component = getNearestComponent(element, eventHandlerStrategy.componentName, this.parent);

            if (component === null) {
                Logger.log(`Error trying to find component "${eventHandlerStrategy.componentName}" for event handler binding. Have you misspelled the component name?`);
                throw 'Invalid component in data-on. Component not found.';
            }

            // Find the component prop
            const callback = <EventHandlerCallback>component[eventHandlerStrategy.callbackName];

            if (typeof callback !== 'function') {
                Logger.log(`Error trying to bind "${eventHandlerStrategy.eventName}" to "${eventHandlerStrategy.componentName}.${eventHandlerStrategy.callbackName}". The callback function doesn't exist or it's not a function.`);
                throw 'Invalid callback in data-on. Found component but no proper callback found.';
            }

            // Register the binding with the initial prop value on the component
            component.addEventHandler(eventHandlerStrategy.eventName, component[eventHandlerStrategy.callbackName], element);
        });
    }
}
