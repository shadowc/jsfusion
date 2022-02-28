import {
    ComponentPropsCollection,
    IComponent,
    IPropTypes,
    IComponentCollection,
    BasicPropValueType,
} from './types/component';

import { ComponentRegistry } from './types/runtime';
import { getComponentsFromElement } from './helpers/get-components-from-element';
import { getChildrenComponentsFromTree } from './helpers/get-children-components-from-tree';
import { Logger } from './logger';

/**
 * This is the framework abstract component class.
 *
 * All components should derive from this class, and add proper functionality
 */
export class Component implements IComponent {
    private readonly componentRegistry: ComponentRegistry;
    private readonly _element: Element;
    props: ComponentPropsCollection;
    private readonly _propTypes: IPropTypes;

    constructor(element: Element, componentRegistry: ComponentRegistry) {
        this.componentRegistry = componentRegistry;
        this._element = element;
        this.props = {};
        this._propTypes = this.setPropTypes();

        this.initializePropTypes();
    }

    get element() {
        return this._element;
    }

    get propTypes() {
        return this._propTypes;
    }

    setPropTypes() { return {}; }

    /**
     * Initializes PropTypes for the Component when Props have
     * default values.
     *
     * @private
     */
    private initializePropTypes() {
        Object.keys(this.propTypes).forEach((propName) => {
            if (this.propTypes[propName].required && typeof this.propTypes[propName].defaultValue !== 'undefined') {
                this.createProp(propName, <BasicPropValueType|BasicPropValueType[]>this.propTypes[propName].defaultValue);
            }
        });
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
        // TODO: Make it a getter/setter
        this.props[propName] = value;
    }
}
