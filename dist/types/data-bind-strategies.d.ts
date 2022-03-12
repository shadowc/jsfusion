import { IDataBindHandlerCollection, DataBindHandlerCollection, IBindStrategyHandler } from './types/data-bind';
export declare class DataBindStrategies implements IDataBindHandlerCollection {
    handlers: DataBindHandlerCollection;
    registerDataBindStrategy(strategyName: string, handler: IBindStrategyHandler): void;
}
