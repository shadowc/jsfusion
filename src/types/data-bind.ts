import { BasicPropValueType } from './component';

export interface IBindStrategyHandler {
    updateBinding(element: Element, value: BasicPropValueType | BasicPropValueType[]): void;
}

export interface IDataBindStrategy {
    strategyName: string,
    componentName: string,
    propName: string,
}

export type DataBindHandlerCollection = { [index: string]: IBindStrategyHandler };

export interface IDataBindHandlerCollection {
    handlers: DataBindHandlerCollection;

    registerDataBindStrategy: (strategyName: string, handler: IBindStrategyHandler) => void;
}
