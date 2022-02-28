import { ComponentRegistry } from './runtime';

export type ComponentPropsCollection = {[index: string]: any};

export type BasicPropType = StringConstructor | NumberConstructor | BooleanConstructor | object;
export type BasicPropValueType = string | number | boolean | object;

export interface PropType {
    type: BasicPropType | Array<BasicPropType>;
    defaultValue?: BasicPropValueType | BasicPropValueType[];
    required?: boolean;
}

export type IPropTypes = {[name: string]: PropType};

export type IComponentCollection = {[name: string]: IComponent};

export interface IComponent {
    readonly element: Element;
    props: ComponentPropsCollection;
    readonly propTypes: IPropTypes;

    setPropTypes: () => IPropTypes;

    get children(): IComponent[];
    get parent(): IComponent|null;
    get parents(): IComponentCollection|null;

    createProp(propName: string, value: BasicPropValueType | BasicPropValueType[]): void;
}

export interface IComponentClass {
    new(element: Element, componentRegistry: ComponentRegistry): IComponent;
}
