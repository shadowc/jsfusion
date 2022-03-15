import { ObservableAttributes } from './observable-attributes';
import { ComponentCollection, ComponentRegistry, IRuntime } from './types/runtime';
import { IComponentClass, IComponent } from './types/component';
import { DataBindStrategies } from './data-bind-strategies';
export { Component } from './component';
/**
 * Main JsFusion framework runtime file. This is to be executed in every page load
 * and will start observing changes to the DOM in order to instantiate components.
 */
export declare class Runtime implements IRuntime {
    version: string;
    mutationObserver: MutationObserver;
    observableAttributes: ObservableAttributes;
    componentRegistry: ComponentRegistry;
    components: ComponentCollection;
    dataBindHandlers: DataBindStrategies;
    createdComponentsQueue: IComponent[];
    constructor();
    mutationObserverHandler(mutationList: MutationRecord[]): void;
    start(): void;
    registerComponent(componentName: string, component: IComponentClass): void;
    registerComponentElement(componentName: string, element: Element): void;
    private flushCreatedComponentQueue;
    destroyComponentRegistry(index: number): void;
}
