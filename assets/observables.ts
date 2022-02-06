import { IObservableAttributes, ObservableAttributeCallback, ObservableAttributeCollection } from './types/observables';

/**
 * Class that administers the observable attributes by the framework
 */
export class ObservableAttributes implements IObservableAttributes {
    /**
     * Attribute list that can be observed by the framework offering different
     * functionality for parsing and processing
     */
    observableAttributesList: string[] = [
        'data-component',
        'data-on',
        'data-bind',
        'data-props',
    ];

    attributes: ObservableAttributeCollection = {};

    registerAttributeHandler(attributeName: string, handler: ObservableAttributeCallback) {
        if (this.observableAttributesList.indexOf(attributeName) === -1) {
            throw `Initialization Error: Tried to register a callback for an undefined attribute: ${attributeName}`;
        }

        if (this.attributes[attributeName]) {
            throw `Initialization Error: Callback for attribute ${attributeName} already registered.`;
        }

        // Attach the different observable attributes to the attribute handlers
        this.attributes[attributeName] = handler;
    }
}
