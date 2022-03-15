import { IObservableAttributes } from './observable-attributes';
import { IComponentClass, IComponent } from './component';
import { IDataBindHandlerCollection } from './data-bind';

export type ComponentRegistry = Array<{name: string, component: IComponent, node: Element }>;
export type ComponentCollection = {[index: string]: IComponentClass};

export interface IRuntime {
    version: string;
    mutationObserver: MutationObserver;
    observableAttributes: IObservableAttributes;
    componentRegistry: ComponentRegistry;
    components: ComponentCollection;
    dataBindHandlers: IDataBindHandlerCollection;
    createdComponentsQueue: IComponent[];

    // Functions
    mutationObserverHandler: (mutationList: MutationRecord[]) => void;
    start: () => void;
    registerComponent: (componentName: string, component: IComponentClass) => void;
    registerComponentElement: (componentName: string, element: Element) => void;
    destroyComponentRegistry: (index: number) => void;
}
