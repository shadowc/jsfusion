/**
 * This is the framework abstract component class.
 *
 * All components should derive from this class, and add proper functionality
 */
import { ComponentPropsCollection, IComponent, IPropTypes } from './types/component';

export class Component implements IComponent {
    element: Element;
    props: ComponentPropsCollection;
    propTypes: IPropTypes;

    constructor(element: Element) {
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
}
