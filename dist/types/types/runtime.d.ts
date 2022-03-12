import { IObservableAttributes } from './observable-attributes';
import { IComponentClass, IComponent } from './component';
import { IDataBindHandlerCollection } from './data-bind';
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
    dataBindHandlers: IDataBindHandlerCollection;
    mutationObserverHandler: (mutationList: MutationRecord[]) => void;
    start: () => void;
    registerComponent: (componentName: string, component: IComponentClass) => void;
    registerComponentElement: (componentName: string, element: Element) => void;
}
