import { ObservableAttributes } from '../observables';
import { IComponentClass, IComponent } from './component';

export type ComponentRegistry = Array<{component: IComponent, node: Element }>;
export type ComponentCollection = {[index: string]: IComponentClass};

export interface IRuntime {
    version: string;
    mutationObserver: MutationObserver;
    observableAttributes: ObservableAttributes;
    componentRegistry: ComponentRegistry;
    components: ComponentCollection;

    // Functions
    mutationObserverHandler: (mutationList: MutationRecord[]) => void;
    start: () => void;
    registerComponent: (componentName: string, component: IComponentClass) => void;
    registerComponentElement: (componentName: string, element: Element) => void;
}
