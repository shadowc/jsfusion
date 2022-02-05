import { ObservableAttributeCallback, ObservableAttributeList } from './types/observables';
import { JsFusion } from './types/jsfusion';

/**
 * Class that administers the observable attributes by the framework
 */
export class ObservableAttributes {
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

    observableAttributes: ObservableAttributeList = {};

    registerAttributeHandler(attributeName: string, handler: ObservableAttributeCallback) {
        // Attach the different observable attributes to the attribute handlers
        this.observableAttributes[attributeName] = handler;
    }
}
