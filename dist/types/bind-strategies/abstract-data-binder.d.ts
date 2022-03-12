import { BasicPropValueType } from '../types/component';
import { IBindStrategyHandler } from '../types/data-bind';
export declare class AbstractDataBinder implements IBindStrategyHandler {
    updateBinding(element: Element, value: BasicPropValueType | BasicPropValueType[]): void;
}
