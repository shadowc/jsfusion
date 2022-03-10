import { IAttributeHandler } from '../types/attribute-handler';
import { DOMComponentProps, DOMPropComplexDefinition } from '../types/component';
import { Logger } from '../logger';
import { AbstractHandler } from './abstract-handler';
import { parseAttribute } from '../helpers/parse-attribute';
import { getComponentNamesFromParsedAttribute } from '../helpers/get-component-names-from-parsed-attribute';
import { getComponentsFromElement } from '../helpers/get-components-from-element';

export class PropsHandler extends AbstractHandler implements IAttributeHandler {
    handleAttribute(attribute: string, element: Element): void {
        const attrValue = parseAttribute(element, attribute);

        Logger.log(`Attempting to add props to a component for ${attribute}.`, element, attrValue);

        if (!element.hasAttribute('data-component')) {
            Logger.error('Error: Prop attributes must be declared in the same element that defines the component.');
            throw 'data-props attribute doesn\'t belong to a component element';
        }

        if (Array.isArray(attrValue)) {
            Logger.error('Prop attributes has to be of type Object. It was parsed as an Array.', attrValue);
            throw 'Syntax error data-props.';
        }

        // Get component names defined in the element
        const componentNames = getComponentNamesFromParsedAttribute(parseAttribute(element, 'data-component'));

        // Assert that only one component is present or the components are correctly identified in the object keys
        if (componentNames.length > 1) {
            Object.keys(attrValue).forEach((propKey) => {
                if (componentNames.indexOf(propKey) === -1) {
                    Logger.error('Error: Prop attributes must be declared in the same element that defines the component. Elements with multiple components must have props defined for each of its components.');
                    throw 'data-props attribute doesn\'t belong to a component element.';
                }
            });
        }

        // Parse component props according to propTypes
        const localRegistry = getComponentsFromElement(element, this.parent.componentRegistry);

        const componentProps: DOMPropComplexDefinition = localRegistry.length === 1
            ? { [localRegistry[0].name]: <DOMComponentProps>attrValue }
            : <DOMPropComplexDefinition>(attrValue);

        localRegistry.forEach((compRecord) => {
            const compProps = componentProps[compRecord.name];

            Object.keys(compProps).forEach((propName) => {
                const propType = compRecord.component.propTypes[propName];

                if (typeof propType === 'undefined') {
                    return;
                }

                if (
                    (propType.type === String && typeof compProps[propName] === 'string')
                    || (propType.type === Boolean && typeof compProps[propName] === 'boolean')
                    || (propType.type === Number && typeof compProps[propName] === 'number')
                    || (propType.type === Array && Array.isArray(compProps[propName]))
                    || (propType.type === Object && (compProps[propName] instanceof Object && !Array.isArray(compProps[propName])))
                ) {
                    compRecord.component.createProp(propName, compProps[propName]);
                } else {
                    Logger.error(`Invalid prop type for ${propName}.`, propType, compProps[propName]);
                    throw 'Invalid prop-type.'
                }
            });

            Object.keys(compRecord.component.propTypes).forEach((propName) => {
                if (
                    compRecord.component.propTypes[propName].required
                    && typeof compRecord.component.props[propName] === 'undefined'
                ) {
                    Logger.error(`The prop ${propName} is required but hasn't been defined! Consider adding a default value.`);
                    throw 'Required prop not defined.';
                }
            });
        });
    }
}
