/**
 * Main JsFusion framework runtime file. This is to be executed in every page load
 * and will start observing changes to the DOM in order to instantiate components.
 */
import { ObservableAttributes } from './observableAttributes';
import { ComponentCollection, ComponentRegistry, IRuntime } from './types/runtime';
import { IComponentClass } from './types/component';
export { Component } from './component';
export declare class Runtime implements IRuntime {
    version: string;
    mutationObserver: MutationObserver;
    observableAttributes: ObservableAttributes;
    componentRegistry: ComponentRegistry;
    components: ComponentCollection;
    constructor();
    mutationObserverHandler(mutationList: MutationRecord[]): void;
    start(): void;
    registerComponent(componentName: string, component: IComponentClass): void;
    registerComponentElement(componentName: string, element: Element): void;
}
