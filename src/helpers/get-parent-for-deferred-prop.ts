import {BasicPropValueType, DeferredPropValueType, IComponent} from '../types/component';
import { isDeferredPropType } from './is-deferred-prop-type';

export const getParentForDeferredProp = (
    component: IComponent,
    propValue: BasicPropValueType | BasicPropValueType[]
): IComponent | null => {
    if (!isDeferredPropType(propValue)) {
        return null;
    }

    // split component.prop syntax
    const parts = (propValue as DeferredPropValueType)['#parentProp'].split('.');

    // If more than one dot, exit
    if (parts.length > 2) {
        return null;
    }

    // If component has no parent, exit
    if (component.parent === null) {
        return null;
    }

    // If the component name has been defined
    if (parts.length === 2) {
        // If there are no multiple parents, exit
        if (component.parents === null) {
            return null;
        }

        // if the component parent hasn't been found, exit
        if (typeof component.parents[parts[0]] === 'undefined') {
            return null;
        }

        return component.parents[parts[0]];
    }

    // if component name hasn't been defined and component has multiple parents, exit
    if (component.parents !== null && Object.keys(component.parents).length > 1) {
        return null;
    }

    // else return the only parent
    return component.parent;
}
