import { BasicPropValueType, IComponentPropsCollection, IComponent } from './types/component';
export declare class ComponentProps implements IComponentPropsCollection {
    [index: string]: BasicPropValueType | BasicPropValueType[];
    private readonly _valueMap;
    private readonly _component;
    constructor(component: IComponent);
    addProp(propName: string, value: BasicPropValueType | BasicPropValueType[]): void;
}
