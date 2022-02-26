/**
 * This is the framework abstract component class.
 *
 * All components should derive from this class, and add proper functionality
 */
import {
    ComponentPropsCollection,
    IComponent,
    IPropTypes,
    IComponentCollection
} from './types/component';

import { ComponentRegistry } from './types/runtime';
import { getComponentsFromElement } from './helpers/get-component-from-element';
import { getChildrenComponentsFromTree } from './helpers/get-children-components-from-tree';

export class Component implements IComponent {
    private readonly componentRegistry: ComponentRegistry;
    element: Element;
    props: ComponentPropsCollection;
    propTypes: IPropTypes;

    constructor(element: Element, componentRegistry: ComponentRegistry) {
        this.componentRegistry = componentRegistry;
        this.element = element;
        this.props = {};
        this.propTypes = {};

        this.setPropTypes();
        this.initializePropTypes();
    }

    setPropTypes() {}

    /**
     * Initializes PropTypes for the Component when Props have
     * default values.
     *
     * @private
     */
    private initializePropTypes() {
        Object.keys(this.propTypes).forEach((propName) => {
            if (this.propTypes[propName].required) {
                this.props[propName] = this.propTypes[propName].defaultValue;
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
        while (currentParent.nodeName.toLowerCase() !== 'html') {
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
        while (currentParent.nodeName.toLowerCase() !== 'html') {
            localRegistry = getComponentsFromElement(currentParent, this.componentRegistry);

            if (localRegistry.length > 0) {
                return localRegistry[0].component;
            }

            currentParent = currentParent.parentElement;
        }

        return null;
    }
}
