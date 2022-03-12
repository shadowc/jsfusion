import { IDataBindHandlerCollection, DataBindHandlerCollection, IBindStrategyHandler } from './types/data-bind';
import { Logger } from './logger';

export class DataBindStrategies implements IDataBindHandlerCollection {
    handlers: DataBindHandlerCollection = {};

    registerDataBindStrategy(strategyName: string, handler: IBindStrategyHandler): void {
        if (this.handlers[strategyName]) {
            Logger.error(`Initialization Error: Handler for data bind strategy ${strategyName} already registered. You can only register one callback per bind strategy.`);
            throw 'Data bind strategy initialization error.';
        }

        // Attach the different observable attributes to the attribute handlers
        this.handlers[strategyName] = handler;
    }
}
