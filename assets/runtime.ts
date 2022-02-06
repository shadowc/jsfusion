/**
 * Main JsFusion framework runtime file. This is to be executed in every page load
 * and will start observing changes to the DOM in order to instantiate components.
 */
import { ObservableAttributes } from './observables';
import { ComponentCollection, ComponentRegistry, IRuntime } from './types/jsfusion'
import { DataComponentHelper } from './data-component-helper';
import { IComponentClass } from './types/component';

export class Runtime implements IRuntime {
    version: string;
    observer: MutationObserver;
    observableAttributes: ObservableAttributes;
    componentRegistry: ComponentRegistry;
    components: ComponentCollection;

    constructor() {
        this.version = '0.1-alpha1';
        this.componentRegistry = [];
        this.components = {};
        this.observer = new MutationObserver(this.mutationObserverHandler.bind(this));
        this.observableAttributes = new ObservableAttributes();

        // Register the conventional attribute handlers
        this.observableAttributes.registerAttributeHandler(
            'data-component',
            this.instantiateComponent.bind(this),
        );

        this.observableAttributes.registerAttributeHandler(
            'data-props',
            this.addPropsToComponent.bind(this),
        );

        this.observableAttributes.registerAttributeHandler(
            'data-bind',
            this.bindPropToElement.bind(this),
        );

        this.observableAttributes.registerAttributeHandler(
            'data-on',
            this.bindEventToElement.bind(this),
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
                this.observableAttributes.attributes[attributeName](attributeName, componentElement);
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

    // Observable Handlers
    instantiateComponent(attribute: string, element: Element) {
        const attrValue = element.getAttribute(attribute);
        const componentNames = DataComponentHelper.parseDataComponentAttribute(attrValue);

        componentNames.forEach((component) => {
            this.registerComponentElement(component, element);
        });
    }

    addPropsToComponent(attribute: string, element: Element) {
        const attrValue = element.getAttribute(attribute);
        console.log(`Attempting to add props to a component for ${attribute}: ${attrValue}`, element);
    }

    bindPropToElement(attribute: string, element: Element) {
        const attrValue = element.getAttribute(attribute);
        console.log(`Attempting to bind a value to an element for ${attribute}: ${attrValue}`, element);
    }

    bindEventToElement(attribute: string, element: Element) {
        const attrValue = element.getAttribute(attribute);
        console.log(`Attempting to bind an event to an element for ${attribute}: ${attrValue}`, element);
    }
}
