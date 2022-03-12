import { ComponentRegistry } from './runtime';

export interface DeferredPropValueType {
    '#parentProp': string
}

export type BasicPropType = StringConstructor | NumberConstructor | BooleanConstructor | object;
export type BasicPropValueType = null | string | number | boolean | object | DeferredPropValueType;

export type DOMComponentProps = { [index: string]: BasicPropValueType | BasicPropValueType[] };
export type DOMPropComplexDefinition = { [index: string]: DOMComponentProps };

export interface IComponentPropsCollection extends DOMComponentProps {
    addProp: (propName: string, value: BasicPropValueType | BasicPropValueType[]) => void;
}

export interface PropType {
    type: BasicPropType | Array<BasicPropType>;
    defaultValue?: BasicPropValueType | BasicPropValueType[];
    required?: boolean;
}

export type IPropTypes = {[name: string]: PropType};

export type IComponentCollection = {[name: string]: IComponent};

export interface IComponent {
    readonly element: Element;
    props: IComponentPropsCollection;
    readonly propTypes: IPropTypes;

    setPropTypes: () => IPropTypes;

    readonly children: IComponent[];
    readonly parent: IComponent|null;
    readonly parents: IComponentCollection|null;

    createProp(propName: string, value: BasicPropValueType | BasicPropValueType[]): void;
}

export interface IComponentClass {
    new(element: Element, componentRegistry: ComponentRegistry): IComponent;
}
