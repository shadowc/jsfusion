import { ComponentRegistry } from './runtime';

export type ComponentPropsCollection = {[index: string]: any};

export type BasicPropType = typeof String | typeof Number | typeof Boolean | Object;

export interface PropType {
    type: BasicPropType | Array<BasicPropType>;
    defaultValue: string|number|boolean|Object|Array<string|number|boolean|Object>;
    required: boolean;
}

export type IPropTypes = {[name: string]: PropType};

export type IComponentCollection = {[name: string]: IComponent};

export interface IComponent {
    element: Element;
    props: ComponentPropsCollection;
    propTypes: IPropTypes;

    setPropTypes: () => void;

    get children(): IComponent[];
    get parent(): IComponent|null;
    get parents(): IComponentCollection|null;
}

export interface IComponentClass {
    new(element: Element, componentRegistry: ComponentRegistry): IComponent;
}
