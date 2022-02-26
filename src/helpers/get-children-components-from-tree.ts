import { IComponent } from '../types/component';
import { ComponentRegistry } from '../types/runtime';
import {getComponentsFromElement} from "./get-component-from-element";

export const getChildrenComponentsFromTree = (
    nodes: NodeListOf<ChildNode>,
    componentRegistry: ComponentRegistry
): IComponent[] => {
    const components: IComponent[] = [];

    nodes.forEach((node) => {
        if (node instanceof Element) {
            const localRegistry = getComponentsFromElement(node, componentRegistry);

            if (localRegistry.length > 0) {
                localRegistry.forEach((compRecord) => {
                    components.push(compRecord.component);
                });
            } else if (node.childNodes.length) {
                const subComponents = getChildrenComponentsFromTree(node.childNodes, componentRegistry);
                subComponents.forEach((subComponent) => {
                    components.push(subComponent);
                });
            }
        }
    });

    return components;
};
