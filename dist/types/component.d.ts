/**
 * This is the framework abstract component class.
 *
 * All components should derive from this class, and add proper functionality
 */
import { ComponentPropsCollection, IComponent, IPropTypes, IComponentCollection, BasicPropValueType } from './types/component';
import { ComponentRegistry } from './types/runtime';
export declare class Component implements IComponent {
    private readonly componentRegistry;
    element: Element;
    props: ComponentPropsCollection;
    propTypes: IPropTypes;
    constructor(element: Element, componentRegistry: ComponentRegistry);
    setPropTypes(): void;
    /**
     * Initializes PropTypes for the Component when Props have
     * default values.
     *
     * @private
     */
    private initializePropTypes;
    get children(): IComponent[];
    get parents(): IComponentCollection | null;
    get parent(): IComponent | null;
    createProp(propName: string, value: BasicPropValueType | BasicPropValueType[]): void;
}
