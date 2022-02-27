import { IObservableAttributes } from './observableAttributes';
import { IComponentClass, IComponent } from './component';
export declare type ComponentRegistry = Array<{
    name: string;
    component: IComponent;
    node: Element;
}>;
export declare type ComponentCollection = {
    [index: string]: IComponentClass;
};
export interface IRuntime {
    version: string;
    mutationObserver: MutationObserver;
    observableAttributes: IObservableAttributes;
    componentRegistry: ComponentRegistry;
    components: ComponentCollection;
    mutationObserverHandler: (mutationList: MutationRecord[]) => void;
    start: () => void;
    registerComponent: (componentName: string, component: IComponentClass) => void;
    registerComponentElement: (componentName: string, element: Element) => void;
}
