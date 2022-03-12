import { BasicPropValueType } from '../types/component';
import { IBindStrategyHandler } from '../types/data-bind';

export class AbstractDataBinder implements IBindStrategyHandler {
    updateBinding(element: Element, value: BasicPropValueType | BasicPropValueType[]): void {
        // Implement!
    }
}
