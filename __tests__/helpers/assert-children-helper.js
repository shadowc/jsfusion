/**
 * @param {object} component
 * @param {object[]} instances
 */
export const assertComponentChildren = (component, instances) => {
    expect(component.children.length).toEqual(instances.length);

    instances.forEach((instance, index) => {
        expect(component.children[index]).toBeInstanceOf(instance);
    });
};

/**
 * @param {object} component
 * @param {object} instance
 */
export const assertComponentParent = (component, instance) => {
    expect(component.parent).not.toBeNull();
    expect(component.parent).toBeInstanceOf(instance);
};

/**
 * @param {object} component
 * @param {{[name: string]: object}} instances
 */
export const assertComponentParents = (component, instances) => {
    Object.keys(instances).forEach((name) => {
        expect(component.parents[name]).not.toBeNull();
        expect(component.parents[name]).toBeInstanceOf(instances[name]);
    });
};
