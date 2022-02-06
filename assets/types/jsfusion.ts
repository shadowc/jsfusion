import { ObservableAttributes } from '../observables';
import { ObservableAttributeCallback } from './observables';
import { IComponentClass, IComponent } from './component';

export type ComponentRegistry = Array<{component: IComponent, node: Element }>;
export type ComponentCollection = {[index: string]: IComponentClass};

export interface IRuntime {
    version: string;
    observer: MutationObserver;
    observableAttributes: ObservableAttributes;
    componentRegistry: ComponentRegistry;
    components: ComponentCollection;

    // Functions
    mutationObserverHandler: (mutationList: MutationRecord[]) => void;
    start: () => void;
    registerComponent: (componentName: string, component: IComponentClass) => void;
    registerComponentElement: (componentName: string, element: Element) => void;

    // Handlers
    instantiateComponent: ObservableAttributeCallback;
    addPropsToComponent: ObservableAttributeCallback;
    bindPropToElement: ObservableAttributeCallback;
    bindEventToElement: ObservableAttributeCallback;
}
