import { ComponentRegistry } from './runtime';
import { EventHandlerCallback, EventHandlerCollection } from './data-on';
export interface DeferredPropValueType {
    '#parentProp': string;
}
export declare type BasicPropType = StringConstructor | NumberConstructor | BooleanConstructor | object;
export declare type BasicPropValueType = null | string | number | boolean | object | DeferredPropValueType;
export declare type DOMComponentProps = {
    [index: string]: BasicPropValueType | BasicPropValueType[];
};
export declare type DOMPropComplexDefinition = {
    [index: string]: DOMComponentProps;
};
export interface IComponentPropsCollection extends DOMComponentProps {
    addProp: (propName: string, value: BasicPropValueType | BasicPropValueType[]) => void;
    handleSideEffects: (propName: string) => void;
}
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
export declare type IRefCollection = {
    [name: string]: HTMLElement | HTMLElement[];
};
export declare type SideEffectCallBack = (propValue: BasicPropValueType | BasicPropValueType[]) => void;
export declare type IPropSideEffectCollection = {
    [propName: string]: SideEffectCallBack[];
};
export interface IComponent {
    readonly element: HTMLElement;
    props: IComponentPropsCollection;
    propSideEffects: IPropSideEffectCollection;
    readonly propTypes: IPropTypes;
    readonly eventHandlers: EventHandlerCollection;
    setPropTypes: () => IPropTypes;
    readonly children: IComponent[];
    readonly parent: IComponent | null;
    readonly parents: IComponentCollection | null;
    readonly refs: IRefCollection;
    createProp(propName: string, value: BasicPropValueType | BasicPropValueType[]): void;
    addPropSideEffect(propName: string, handler: SideEffectCallBack): void;
    addRef(refName: string, element: HTMLElement): void;
    addEventHandler(eventName: string, callback: EventHandlerCallback, target: HTMLElement): void;
    emit(eventName: string, payload: any, element?: HTMLElement): void;
    [index: string]: any;
}
export interface IComponentClass {
    new (element: Element, componentRegistry: ComponentRegistry): IComponent;
}
