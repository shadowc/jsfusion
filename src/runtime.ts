import { ObservableAttributes } from './observable-attributes';
import { ComponentCollection, ComponentRegistry, IRuntime } from './types/runtime';
import { IComponentClass } from './types/component';
import { ComponentHandler } from './handlers/component-handler';
import { PropsHandler } from './handlers/props-handler';
import { BindHandler } from './handlers/bind-handler';
import { EventHandler } from './handlers/event-handler';
import { RefHandler } from './handlers/ref-handler';
import { Logger } from './logger';
import { DataBindStrategies } from './data-bind-strategies';
import {TextDataBinder} from "./bind-strategies/text-data-binder";

declare var APP_VERSION: string;

export { Component } from './component';

/**
 * Main JsFusion framework runtime file. This is to be executed in every page load
 * and will start observing changes to the DOM in order to instantiate components.
 */
export class Runtime implements IRuntime {
    version: string;
    mutationObserver: MutationObserver;
    observableAttributes: ObservableAttributes;
    componentRegistry: ComponentRegistry;
    components: ComponentCollection;
    dataBindHandlers: DataBindStrategies;

    constructor() {
        this.version = APP_VERSION;
        this.componentRegistry = [];
        this.components = {};
        this.mutationObserver = new MutationObserver(this.mutationObserverHandler.bind(this));
        this.observableAttributes = new ObservableAttributes();
        this.dataBindHandlers = new DataBindStrategies();

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
        );

        this.observableAttributes.registerAttributeHandler(
            'data-ref',
            new RefHandler(this),
        );

        this.dataBindHandlers.registerDataBindStrategy(
            'text',
            new TextDataBinder(),
        );

        // TODO: This is the place for adding plugins that register new handlers
    }

    mutationObserverHandler(mutationList: MutationRecord[]) {
        mutationList.forEach((mutation) => {
            // TODO: Device a way to DIFF attribute add/delete/modify and use
            //  handlers accordingly on mutations
            Logger.log(mutation);
        });
    }

    start() {
        // As a start, scan all attribute handlers for attributes in the entire DOM
        // and assume all attributes have been recently added
        const attributeList = Object.keys(this.observableAttributes.attributes);

        // Find all registered attributes and process their handlers already present in the page
        attributeList.forEach((attributeName) => {
            const components = document.body.querySelectorAll('*['+attributeName+']');

            components.forEach((componentElement) => {
                this.observableAttributes.attributes[attributeName].handleAttribute(attributeName, <HTMLElement>componentElement);
            });
        });

        // Now start observing for DOM changes
        this.mutationObserver.observe(document.body, {
            attributes: true,
            attributeFilter: attributeList,
            attributeOldValue: true,
            childList: true,
            subtree: true,
        });
    }

    registerComponent(componentName: string, component: IComponentClass) {
        Logger.log(`Registering component "${componentName}" for general use.`);

        if (typeof this.components[componentName] === 'undefined') {
            this.components[componentName] = component;
        }
    }

    registerComponentElement(componentName: string, element: Element) {
        Logger.log(`Registering component "${componentName}" on`, element);

        if (typeof this.components[componentName] === 'undefined') {
            Logger.error(`The component "${componentName}" is not registered in JsFusion. Did you forget to run Runtime.registerComponent('${componentName}', MyComponentClass)?`);
            throw 'Error while instantiating component';
        }

        const componentClass = this.components[componentName];

        this.componentRegistry.forEach((register) => {
            if (register.node === element && register.name === componentName) {
                Logger.error(`The component "${componentName}" has been already instantiated for ${element}!`);
                throw 'Error while instantiating component';
            }
        });

        this.componentRegistry.push({
            name: componentName,
            component: new componentClass(element, this.componentRegistry),
            node: element,
        });
    }
}
