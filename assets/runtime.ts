/**
 * Main JsFusion framework runtime file. This is to be executed in every page load
 * and will start observing changes to the DOM in order to instantiate components.
 */
import { ObservableAttributes } from './observables';
import { ComponentCollection, ComponentRegistry, IRuntime } from './types/runtime';
import { IComponentClass } from './types/component';
import { ComponentHandler } from './handlers/component-handler';
import { PropsHandler } from './handlers/props-handler';
import { BindHandler } from './handlers/bind-handler';
import { EventHandler } from './handlers/event-handler';

export class Runtime implements IRuntime {
    version: string;
    mutationObserver: MutationObserver;
    observableAttributes: ObservableAttributes;
    componentRegistry: ComponentRegistry;
    components: ComponentCollection;

    constructor() {
        this.version = '0.1-alpha1';
        this.componentRegistry = [];
        this.components = {};
        this.mutationObserver = new MutationObserver(this.mutationObserverHandler.bind(this));
        this.observableAttributes = new ObservableAttributes();

        // Register the conventional attribute handlers
        this.observableAttributes.registerAttributeHandler(
            'data-component',
            new ComponentHandler(this),
        );

        this.observableAttributes.registerAttributeHandler(
            'data-props',
            new PropsHandler(this),
        );

        this.observableAttributes.registerAttributeHandler(
            'data-bind',
            new BindHandler(this),
        );

        this.observableAttributes.registerAttributeHandler(
            'data-on',
            new EventHandler(this),
        )
    }

    mutationObserverHandler(mutationList: MutationRecord[]) {
        mutationList.forEach((mutation) => {
            console.log(mutation);
        });
    }

    start() {
        // Find all registered attributes and process their handlers already present in the page
        Object.keys(this.observableAttributes.attributes).forEach((attributeName) => {
            const components = document.body.querySelectorAll('*['+attributeName+']');

            components.forEach((componentElement) => {
                this.observableAttributes.attributes[attributeName].handleAttribute(attributeName, componentElement);
            });
        });

        // Now start observing for DOM changes
        this.mutationObserver.observe(document.body, {
            attributes: true,
            attributeFilter: this.observableAttributes.observableAttributeList,
            attributeOldValue: true,
            childList: true,
            subtree: true,
        });
    }

    registerComponent(componentName: string, component: IComponentClass) {
        console.log(`Registering app component "${componentName}".`);

        if (typeof this.components[componentName] === 'undefined') {
            this.components[componentName] = component;
        }
    }

    registerComponentElement(componentName: string, element: Element) {
        console.log(`Registering component ${componentName} on`, element);

        if (typeof this.components[componentName] === 'undefined') {
            throw `The component ${componentName} is not registered in JsFusion. Did you forget to run Runtime.registerComponent('${componentName}', MyComponentClass)?`;
        }

        const componentClass = this.components[componentName];

        this.componentRegistry.forEach((register) => {
            if (register.node === element && register.component instanceof componentClass) {
                throw `The component ${componentName} has been already instantiated for ${element}!`;
            }
        });

        this.componentRegistry.push({
            component: new componentClass(element),
            node: element,
        });
    }
}
