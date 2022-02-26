import { IObservableAttributes, ObservableAttributeCollection } from './types/observableAttributes';
import { IAttributeHandler } from './types/attribute-handler';
import { Logger } from './logger';

/**
 * Class that administers the observable attributes by the framework
 */
export class ObservableAttributes implements IObservableAttributes {
    attributes: ObservableAttributeCollection = {};

    registerAttributeHandler(attributeName: string, handler: IAttributeHandler) {
        if (this.attributes[attributeName]) {
            Logger.error(`Initialization Error: Callback for attribute ${attributeName} already registered. You can only register one callback per attribute type. Try registering another attribute!`);
            throw 'Attribute callback initialization error.';
        }

        // Attach the different observable attributes to the attribute handlers
        this.attributes[attributeName] = handler;
    }
}
