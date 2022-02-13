export type ComponentPropsCollection = {[index: string]: any};

export type BasicPropType = typeof String | typeof Number | typeof Boolean | Object;

export interface PropType {
    type: BasicPropType | Array<BasicPropType>;
    defaultValue: string|number|boolean|Object|Array<string|number|boolean|Object>;
    required: boolean;
}

export type IPropTypes = {[name: string]: PropType};

export interface IComponent {
    element: Element;
    props: ComponentPropsCollection;
    propTypes: IPropTypes;

    setPropTypes: () => void;
}

export interface IComponentClass {
    new(element: Element): IComponent;
}
