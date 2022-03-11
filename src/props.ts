import {
    BasicPropValueType,
    IComponentPropsCollection,
    IComponent,
    DeferredPropValueType,
} from './types/component';

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
                const rawValue = this._valueMap[propName];

                if (
                    rawValue !== null
                    && typeof rawValue === 'object'
                    && typeof((rawValue as DeferredPropValueType)['#parentProp']) === 'string'
                ) {
                    if (!this._component.parent) {
                        return null;
                    }

                    return this._component.parent.props[(rawValue as DeferredPropValueType)['#parentProp']];
                }

                return this._valueMap[propName];
            },
            set: (value: BasicPropValueType | BasicPropValueType[]) => {
                this._valueMap[propName] = value;
            }
        });

        this[propName] = value;
    }
}
