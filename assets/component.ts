/**
 * This is the framework abstract component class.
 *
 * All components should derive from this class, and add proper functionality
 */
import { IComponent } from './types/component';

export class Component implements IComponent {
    element: Element;

    constructor(element: Element) {
        this.element = element;
    }
}
