import { BasicPropValueType } from '../types/component';
import { AbstractDataBinder } from './abstract-data-binder';
export declare class TextDataBinder extends AbstractDataBinder {
    updateBinding(element: HTMLElement, value: BasicPropValueType | BasicPropValueType[]): void;
}
