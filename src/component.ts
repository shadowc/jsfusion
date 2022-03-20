import {
    IComponentPropsCollection,
    IComponent,
    IPropTypes,
    IComponentCollection,
    BasicPropValueType,
    SideEffectCallBack,
    IPropSideEffectCollection,
    IRefCollection,
    DOMComponentProps,
} from './types/component';

import { ComponentRegistry } from './types/runtime';
import { getComponentsFromElement } from './helpers/get-components-from-element';
import { getChildrenComponentsFromTree } from './helpers/get-children-components-from-tree';
import { Logger } from './logger';
import { ComponentProps } from './props';
import { EventHandlerCallback, EventHandlerCollection} from './types/data-on';

/**
 * This is the framework abstract component class.
 *
 * All components should derive from this class, and add proper functionality
 */
export class Component implements IComponent {
    private readonly componentRegistry: ComponentRegistry;
    private readonly _element: HTMLElement;
    props: IComponentPropsCollection;
    propSideEffects: IPropSideEffectCollection;
    private readonly _propTypes: IPropTypes;
    private readonly _refs: IRefCollection;
    private readonly _eventHandlers: EventHandlerCollection;
    private readonly _componentName: string;

    constructor(element: HTMLElement, componentRegistry: ComponentRegistry, name: string) {
        this.componentRegistry = componentRegistry;
        this._element = element;
        this.props = new ComponentProps(this);
        this.propSideEffects = {};
        this._refs = {};
        this._eventHandlers = [];
        this._propTypes = this.setPropTypes();
        this._componentName = name;

        this.initializePropTypes();
    }

    get element() {
        return this._element;
    }

    get propTypes() {
        return this._propTypes;
    }

    get refs() {
        return this._refs;
    }

    get eventHandlers() {
        return this._eventHandlers;
    }

    get componentName() {
        return this._componentName;
    }

    setPropTypes() { return {}; }
    onCreated() {}
    onPropChanged(oldProps: DOMComponentProps, newProps: DOMComponentProps|null, propName: string) {}
    onDestroyed() {}

    /**
     * Initializes PropTypes for the Component when Props have
     * default values.
     */
    private initializePropTypes() {
        let hasRequiredProps = false;

        Object.keys(this.propTypes).forEach((propName) => {
            if (this.propTypes[propName].required && typeof this.propTypes[propName].defaultValue === 'undefined') {
                hasRequiredProps = true;
            }

            if (typeof this.propTypes[propName].defaultValue !== 'undefined') {
                this.createProp(propName, <BasicPropValueType|BasicPropValueType[]>this.propTypes[propName].defaultValue);
            }
        });

        if (hasRequiredProps && !this.element.hasAttribute('data-props')) {
            Logger.error('Failed to initialize component. The component has required props but no data-props attribute found.');
            throw 'Failed to initialize component. The component has required props but no data-props attribute found.';
        }
    }

    get children(): IComponent[] {
        let currentChildren: NodeListOf<ChildNode> = this.element.childNodes;

        return getChildrenComponentsFromTree(currentChildren, this.componentRegistry);
    };

    get parents(): IComponentCollection|null {
        let currentParent = this.element.parentElement;

        let localRegistry: ComponentRegistry;
        while (currentParent && currentParent.nodeName.toLowerCase() !== 'html') {
            localRegistry = getComponentsFromElement(currentParent, this.componentRegistry);

            if (localRegistry.length > 0) {
                const components: IComponentCollection = {};

                localRegistry.forEach((compRecord) => {
                    components[compRecord.name] = compRecord.component;
                });

                return components;
            }

            currentParent = currentParent.parentElement;
        }

        return null;
    };

    get parent(): IComponent|null {
        let currentParent = this.element.parentElement;

        let localRegistry: ComponentRegistry;
        while (currentParent && currentParent.nodeName.toLowerCase() !== 'html') {
            localRegistry = getComponentsFromElement(currentParent, this.componentRegistry);

            if (localRegistry.length > 0) {
                return localRegistry[0].component;
            }

            currentParent = currentParent.parentElement;
        }

        return null;
    }

    createProp(
        propName: string,
        value: BasicPropValueType | BasicPropValueType[]
    ): void {
        if (typeof this.props[propName] !== 'undefined') {
            // Here we use the setter, instead of creating the prop
            this.props[propName] = value;
            return;
        }

        Logger.log(`Creating prop ${propName}`, value);
        this.props.addProp(propName, value);
    }

    addPropSideEffect(propName: string, handler: SideEffectCallBack) {
        if (typeof this.propSideEffects[propName] === 'undefined') {
            this.propSideEffects[propName] = [];
        }

        this.propSideEffects[propName].push(handler);
    }

    addRef(refName: string, element: HTMLElement) {
        if (typeof this._refs[refName] === 'undefined') {
            this._refs[refName] = element;
            return;
        }

        // There is a ref with the name provided
        if (!Array.isArray(this._refs[refName])) {
            this._refs[refName] = [ <HTMLElement>this._refs[refName] ];
        }

        (this._refs[refName] as HTMLElement[]).push(element);
    }

    addEventHandler(eventName: string, callback: EventHandlerCallback, target: HTMLElement): void {
        const newEventHandler = {
            eventName: eventName,
            callback: callback,
            boundCallback: callback.bind(this),
            target: target,
        }

        this._eventHandlers.push(newEventHandler);

        target.addEventListener(eventName, newEventHandler.boundCallback);
    }

    emit(eventName: string, payload: any, element?: HTMLElement): void {
        const realElement = typeof element !== 'undefined' ? element : this.element;

        realElement.dispatchEvent(new CustomEvent(eventName, {
            bubbles: true,
            cancelable: true,
            detail: payload,
        }));
    }
}
