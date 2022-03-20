import { DOMPropComplexDefinition, DOMComponentProps } from '../types/component';
import { Logger } from '../logger';
import { isDeferredPropType } from './is-deferred-prop-type';
import { getPropParsingRegex } from './get-prop-parsing-regex';

export const getPropsFromParsedAttribute = (
    parsedAttribute: string|boolean|number|object|Array<any>,
    componentNames: string[]
): DOMPropComplexDefinition => {
    if (typeof parsedAttribute === 'object' && !Array.isArray(parsedAttribute)) {
        // Assert that only one component is present or the components are correctly identified in the object keys
        if (componentNames.length === 1) {
            if (
                Object.keys(parsedAttribute).indexOf(componentNames[0]) === -1
                || !(
                    typeof (parsedAttribute as DOMComponentProps)[componentNames[0]] === 'object'
                    && !Array.isArray((parsedAttribute as DOMComponentProps)[componentNames[0]])
                )
                || isDeferredPropType((parsedAttribute as DOMComponentProps)[componentNames[0]])
            ) {
                return {
                    [componentNames[0]]: (parsedAttribute as DOMComponentProps),
                };
            }
        }

        if (componentNames.length > 1) {
            Object.keys(parsedAttribute).forEach((propKey) => {
                if (componentNames.indexOf(propKey) === -1) {
                    Logger.error('Error: Prop attributes must be declared in the same element that defines the component. Elements with multiple components must have props defined for each of its components.');
                    throw 'data-props attribute doesn\'t belong to a component element.';
                }
            });
        }

        // Assume the keys for the parsedAttribute correspond to component names.
        return parsedAttribute as DOMPropComplexDefinition;
    }

    if (!Array.isArray(parsedAttribute)) {
        Logger.error('Invalid data when trying to parse data-props attribute', parsedAttribute);
        throw 'Syntax error data-props.';
    }

    const props: DOMPropComplexDefinition = {};

    parsedAttribute.forEach((word) => {
        if (typeof word !== 'string') {
            Logger.error('Invalid data when trying to parse data-prop attribute', parsedAttribute);
            throw 'Syntax error data-prop.';
        }

        const matches = word.trim().match(getPropParsingRegex());

        if (matches === null) {
            Logger.error('Invalid syntax when trying to parse a data-prop strategy', word);
            throw 'Syntax error data-prop.';
        }

        let componentName = null;
        if (typeof matches[2] === 'undefined') {
            if (componentNames.length > 1) {
                Logger.error('Error: Elements with multiple components must have props defined for each of its components.');
                throw 'data-props attribute doesn\'t belong to a component element.';
            }

            componentName = componentNames[0];
        } else {
            if (componentNames.indexOf(matches[2]) === -1) {
                Logger.error('Error: Elements with multiple components must have props defined for each of its components.');
                throw 'data-props attribute doesn\'t belong to a component element.';
            }

            componentName = matches[2];
        }

        const propName = matches[3];
        const isDeferred = typeof matches[4] !== 'undefined';
        const strValue = matches[5];

        if (!props[componentName]) {
            props[componentName] = {};
        }

        props[componentName][propName] = getParsedPropValue(strValue, isDeferred);
    });

    return props;
};

const getParsedPropValue = (strValue: string, isDeferred: boolean): object => {
    if (isDeferred) {
        return {
            '#parentProp': strValue,
        };
    }
    let parsedProp;

    try {
        parsedProp = JSON.parse(strValue);
    } catch (e) {
        parsedProp = String(strValue);
    }

    return parsedProp;
}
