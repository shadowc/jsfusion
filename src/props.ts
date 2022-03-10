import { BasicPropValueType, IComponentPropsCollection, IComponent } from './types/component';

export class ComponentProps implements IComponentPropsCollection {
    [index: string]: BasicPropValueType | BasicPropValueType[];
    private readonly _valueMap: {[index: string]: BasicPropValueType | BasicPropValueType[]};
    private _component: IComponent;

    constructor(component: IComponent) {
        this._valueMap = {};
        this._component = component;
    }

    addProp(propName: string, value: BasicPropValueType | BasicPropValueType[]) {
        Object.defineProperty(this, propName, {
            get: (): BasicPropValueType | BasicPropValueType[] => {
                return this._valueMap[propName];
            },
            set: (value: BasicPropValueType | BasicPropValueType[]) => {
                this._valueMap[propName] = value;
            }
        });
        
        this[propName] = value;
    }
}
