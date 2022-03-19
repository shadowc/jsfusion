import { IAttributeHandler } from '../types/attribute-handler';
import { Logger } from '../logger';
import { AbstractHandler } from './abstract-handler';
import { parseAttribute } from '../helpers/parse-attribute';
import { getComponentNamesFromParsedAttribute } from '../helpers/get-component-names-from-parsed-attribute';
import { getComponentsFromElement } from '../helpers/get-components-from-element';
import { isValidPropType } from '../helpers/is-valid-prop-type';
import { getPropsFromParsedAttribute } from '../helpers/get-props-from-parsed-attribute';

export class PropsHandler extends AbstractHandler implements IAttributeHandler {
    handleAttribute(attribute: string, element: HTMLElement): void {
        if (!element.hasAttribute('data-component')) {
            Logger.error('Error: Prop attributes must be declared in the same element that defines the component.');
            throw 'data-props attribute doesn\'t belong to a component element';
        }

        // Get component names defined in the element
        const componentNames = getComponentNamesFromParsedAttribute(parseAttribute(element, 'data-component'));

        // Parse component props
        const componentProps = getPropsFromParsedAttribute(parseAttribute(element, attribute, true), componentNames);

        // Parse component props according to propTypes
        const localRegistry = getComponentsFromElement(element, this.parent.componentRegistry);
        localRegistry.forEach((compRecord) => {
            const compProps = componentProps[compRecord.name];

            Object.keys(compProps).forEach((propName) => {
                const propType = compRecord.component.propTypes[propName];

                if (typeof propType === 'undefined') {
                    return;
                }

                if (isValidPropType(propType, compProps[propName])) {
                    compRecord.component.createProp(propName, compProps[propName]);
                } else {
                    Logger.error(`Invalid prop type for ${propName}.`, propType, compProps[propName]);
                    throw 'Invalid prop-type.';
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
