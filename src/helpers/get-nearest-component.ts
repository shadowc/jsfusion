import { IComponent } from '../types/component';
import { IRuntime } from '../types/runtime';
import { getComponentsFromElement } from './get-components-from-element';

export const getNearestComponent = (element: HTMLElement, componentName: string, JsFusion: IRuntime): IComponent | null => {
    let currentElem: HTMLElement | null = element;

    while (currentElem !== null) {
        if (currentElem.hasAttribute('data-component')) {
            const components = getComponentsFromElement(element, JsFusion.componentRegistry);

            for (let i = 0; i < components.length; i++) {
                if (components[i].name === componentName) {
                    return components[i].component;
                }
            }
        }

        currentElem = currentElem.parentElement;
    }

    return null;
};
