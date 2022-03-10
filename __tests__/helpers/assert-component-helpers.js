/**
 * @param {{name: string, component: object}[]} options
 * @param {Runtime} JsFusion
 */
export const assertComponents = (options, JsFusion) => {
    options.forEach((option) => {
        expect(JsFusion.components[option.name]).toBe(option.component);
    });
};

/**
 * @param {{ name: string, instance: object, element: Element}[]} options
 * @param {Runtime} JsFusion
 */
export const assertComponentRegistry = (options, JsFusion) => {
    expect(JsFusion.componentRegistry.length).toEqual(options.length);

    options.forEach((option, index) => {
        const foundRegistry = findRegistry(option, JsFusion);
        expect(foundRegistry).not.toBe(null);

        expect(JsFusion.componentRegistry[index].name).toEqual(option.name);
        expect(JsFusion.componentRegistry[index].component).toBeInstanceOf(option.instance);
        expect(JsFusion.componentRegistry[index].node).toEqual(option.element);
        expect(JsFusion.componentRegistry[index].component.element).toEqual(option.element);
    });
};

/**
 * @param {{ name: string, instance: object, element: Element}} option
 * @param {Runtime} JsFusion
 * @returns {{ name: string, component: object, node: Element}|null}
 */
export const findRegistry = (option, JsFusion) => {
    for (let i = 0; i < JsFusion.componentRegistry.length; i++) {
        const record = JsFusion.componentRegistry[i];
        if (record.name === option.name && record.node === option.element && record.component instanceof option.instance) {
            return record;
        }
    }

    return null;
};
