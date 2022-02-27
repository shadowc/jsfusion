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
    element: Element;
    props: ComponentPropsCollection;
    propTypes: IPropTypes;
    setPropTypes: () => void;
    get children(): IComponent[];
    get parent(): IComponent | null;
    get parents(): IComponentCollection | null;
    createProp(propName: string, value: BasicPropValueType | BasicPropValueType[]): void;
}
export interface IComponentClass {
    new (element: Element, componentRegistry: ComponentRegistry): IComponent;
}