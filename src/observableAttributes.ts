import { IObservableAttributes, ObservableAttributeCollection } from './types/observables';
import { IAttributeHandler } from './types/attribute-handler';

/**
 * Class that administers the observable attributes by the framework
 */
export class ObservableAttributes implements IObservableAttributes {
    attributes: ObservableAttributeCollection = {};

    registerAttributeHandler(attributeName: string, handler: IAttributeHandler) {
        if (this.attributes[attributeName]) {
            throw `Initialization Error: Callback for attribute ${attributeName} already registered.`;
        }

        // Attach the different observable attributes to the attribute handlers
        this.attributes[attributeName] = handler;
    }
}
