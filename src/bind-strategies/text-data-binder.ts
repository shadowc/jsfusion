import { BasicPropValueType } from '../types/component';
import { AbstractDataBinder } from './abstract-data-binder';

export class TextDataBinder extends AbstractDataBinder {
    updateBinding(element: HTMLElement, value: BasicPropValueType | BasicPropValueType[]) {
        element.innerText = value === null ? '' : <string>value;
    }
}
