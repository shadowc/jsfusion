import { IObservableAttributes, ObservableAttributeCollection } from './types/observables';
import { IAttributeHandler } from './types/attribute-handler';

/**
 * Class that administers the observable attributes by the framework
 */
export class ObservableAttributes implements IObservableAttributes {
    /**
     * Attribute list that can be observed by the framework offering different
     * functionality for parsing and processing
     */
    observableAttributeList: string[] = [
        'data-component',
        'data-on',
        'data-bind',
        'data-props',
    ];

    attributes: ObservableAttributeCollection = {};

    registerAttributeHandler(attributeName: string, handler: IAttributeHandler) {
        if (this.observableAttributeList.indexOf(attributeName) === -1) {
            throw `Initialization Error: Tried to register a callback for an undefined attribute: ${attributeName}`;
        }

        if (this.attributes[attributeName]) {
            throw `Initialization Error: Callback for attribute ${attributeName} already registered.`;
        }

        // Attach the different observable attributes to the attribute handlers
        this.attributes[attributeName] = handler;
    }
}
