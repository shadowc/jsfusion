/**
 * @param {object} component
 * @param {{eventName: string, callback: function, target: HTMLElement}[]} options
 */
export const assertEventHandlers = (component, options) => {
    expect(component.eventHandlers.length).toBe(options.length);

    options.forEach((option) => {
        let found = false;
        for (let i = 0; i < component.eventHandlers.length; i++) {
            const eventHandler = component.eventHandlers[i];
            if (
                eventHandler.eventName === option.eventName
                && eventHandler.callback === option.callback
                && eventHandler.target === option.target
            ) {
                found = true;
                break;
            }
        }
        expect(found).toBe(true);
    });
}
