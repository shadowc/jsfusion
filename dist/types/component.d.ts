import { IComponentPropsCollection, IComponent, IPropTypes, IComponentCollection, BasicPropValueType, SideEffectCallBack, IPropSideEffectCollection } from './types/component';
import { ComponentRegistry } from './types/runtime';
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
    constructor(element: Element, componentRegistry: ComponentRegistry);
    get element(): Element;
    get propTypes(): IPropTypes;
    setPropTypes(): {};
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
}
