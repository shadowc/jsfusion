import { IObservableAttributes } from './observable-attributes';
import { IComponentClass, IComponent } from './component';
import { IBindStrategyHandler, IDataBindHandlerCollection } from './data-bind';
import { IAttributeHandler } from './attribute-handler';

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
    registerAttributeHandler: (attributeName: string, handler: IAttributeHandler) => void;
    registerDataBindStrategy: (strategyName: string, handler: IBindStrategyHandler) => void;
}
