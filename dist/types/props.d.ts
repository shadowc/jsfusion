import { BasicPropValueType, IComponentPropsCollection, IComponent, DOMComponentProps } from './types/component';
export declare class ComponentProps implements IComponentPropsCollection {
    [index: string]: BasicPropValueType | BasicPropValueType[];
    private readonly _valueMap;
    private readonly _component;
    constructor(component: IComponent);
    addProp(propName: string, value: BasicPropValueType | BasicPropValueType[]): void;
    handleSideEffects(propName: string, oldProps: DOMComponentProps | null): void;
    private getPropValues;
    /**
     * Updates the props attribute in the DOM Element that hosts this component
     */
    private updatePropsAttribute;
}
