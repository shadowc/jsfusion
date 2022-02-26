import { ComponentRegistry } from '../types/runtime';

export const getComponentsFromElement = (
    element: Element,
    componentRegistry: ComponentRegistry
): ComponentRegistry => {
    const localRegistry: ComponentRegistry = [];

    componentRegistry.forEach((compRecord) => {
        if (compRecord.node === element) {
            localRegistry.push({
                name: compRecord.name,
                component: compRecord.component,
                node: element,
            });
        }
    });

    return localRegistry;
}
