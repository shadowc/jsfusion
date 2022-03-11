import {BasicPropValueType, DeferredPropValueType} from '../types/component';
import { isDeferredPropType } from './is-deferred-prop-type';

export const getPropNameForDeferredProp = (propValue: BasicPropValueType | BasicPropValueType[]): string | null => {
    if (!isDeferredPropType(propValue)) {
        return null;
    }

    // split component.prop syntax
    const parts = (propValue as DeferredPropValueType)['#parentProp'].split('.');

    // If more than one dot, exit
    if (parts.length > 2) {
        return null;
    }

    return parts[parts.length - 1];
};
