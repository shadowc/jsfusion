import { ComponentRegistry } from './runtime';
export declare type ComponentPropsCollection = {
    [index: string]: any;
};
export declare type BasicPropType = StringConstructor | NumberConstructor | BooleanConstructor | object;
export declare type BasicPropValueType = string | number | boolean | object;
export interface PropType {
    type: BasicPropType | Array<BasicPropType>;
    defaultValue?: BasicPropValueType | BasicPropValueType[];
    required?: boolean;
}
export declare type IPropTypes = {
    [name: string]: PropType;
};
export declare type IComponentCollection = {
    [name: string]: IComponent;
};
export interface IComponent {
    readonly element: Element;
    props: ComponentPropsCollection;
    readonly propTypes: IPropTypes;
    setPropTypes: () => IPropTypes;
    readonly children: IComponent[];
    readonly parent: IComponent | null;
    readonly parents: IComponentCollection | null;
    createProp(propName: string, value: BasicPropValueType | BasicPropValueType[]): void;
}
export interface IComponentClass {
    new (element: Element, componentRegistry: ComponentRegistry): IComponent;
}
