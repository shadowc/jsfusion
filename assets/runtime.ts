/**
 * Main JsFusion framework runtime file. This is to be executed in every page load
 * and will start observing changes to the DOM in order to instantiate components.
 */
import { ObservableAttributes } from './observables';
import { JsFusion } from './types/jsfusion'

export class Runtime implements JsFusion {
    observer: MutationObserver;
    observableAttributes: ObservableAttributes;
    componentRegistry = [];

    constructor() {
        this.observer = new MutationObserver(this.mutationObserverHandler.bind(this));
        this.observableAttributes = new ObservableAttributes();

        // Register the conventional attribute handlers
        this.observableAttributes.registerAttributeHandler(
            'data-component',
            this.instantiateController.bind(this),
        );
    }

    mutationObserverHandler(mutationList: MutationRecord[]) {
        mutationList.forEach((mutation) => {
            console.log(mutation);
        });
    }

    start() {
        // Find all registered attributes and process their handlers already present in the page
        Object.keys(this.observableAttributes.observableAttributes).forEach((attributeName) => {
            console.log(attributeName);
            const components = document.body.querySelectorAll('*['+attributeName+']');
            console.log(components);

            components.forEach((componentElement) => {
                this.observableAttributes.observableAttributes[attributeName](attributeName, componentElement);
            });
        });

        // Now start observing for DOM changes
        this.observer.observe(document.body, {
            attributes: true,
            attributeFilter: this.observableAttributes.observableAttributesList,
            attributeOldValue: true,
            childList: true,
            subtree: true,
        });
    }

    // Observable Handlers
    instantiateController(attribute: string, element: Element) {
        console.log('Attempting instantiate a component for ' + attribute, element);
    }
}
