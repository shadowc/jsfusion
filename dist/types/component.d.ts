import { IComponentPropsCollection, IComponent, IPropTypes, IComponentCollection, BasicPropValueType, SideEffectCallBack, IPropSideEffectCollection, IRefCollection, DOMComponentProps } from './types/component';
import { ComponentRegistry } from './types/runtime';
import { EventHandlerCallback, EventHandlerCollection } from './types/data-on';
/**
 * This is the framework abstract component class.
 *
 * All components should derive from this class, and add proper functionality
 */
export declare class Component implements IComponent {
    private readonly componentRegistry;
    private readonly _element;
    props: IComponentPropsCollection;
    propSideEffects: IPropSideEffectCollection;
    private readonly _propTypes;
    private readonly _refs;
    private readonly _eventHandlers;
    private readonly _componentName;
    constructor(element: HTMLElement, componentRegistry: ComponentRegistry, name: string);
    get element(): HTMLElement;
    get propTypes(): IPropTypes;
    get refs(): IRefCollection;
    get eventHandlers(): EventHandlerCollection;
    get componentName(): string;
    setPropTypes(): {};
    onCreated(): void;
    onPropChanged(oldProps: DOMComponentProps, newProps: DOMComponentProps | null, propName: string): void;
    onDestroyed(): void;
    /**
     * Initializes PropTypes for the Component when Props have
     * default values.
     */
    private initializePropTypes;
    get children(): IComponent[];
    get parents(): IComponentCollection | null;
    get parent(): IComponent | null;
    createProp(propName: string, value: BasicPropValueType | BasicPropValueType[]): void;
    addPropSideEffect(propName: string, handler: SideEffectCallBack): void;
    addRef(refName: string, element: HTMLElement): void;
    addEventHandler(eventName: string, callback: EventHandlerCallback, target: HTMLElement): void;
    emit(eventName: string, payload: any, element?: HTMLElement): void;
}
