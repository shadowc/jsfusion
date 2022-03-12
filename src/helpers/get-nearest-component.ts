import { IComponent } from '../types/component';
import { ComponentRegistry, IRuntime } from '../types/runtime';
import { getComponentsFromElement } from './get-components-from-element';

export const getNearestComponent = (element: HTMLElement, componentName: string, JsFusion: IRuntime): IComponent | null => {
    let currentParent: HTMLElement | null = element;
    let localRegistry: ComponentRegistry;

    while (currentParent && currentParent.nodeName.toLowerCase() !== 'html') {
        localRegistry = getComponentsFromElement(currentParent, JsFusion.componentRegistry);

        for (let i = 0; i < localRegistry.length; i++) {
            if (localRegistry[i].name === componentName) {
                return localRegistry[i].component;
            }
        }

        currentParent = currentParent.parentElement;
    }

    return null;
};
