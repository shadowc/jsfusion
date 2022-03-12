import { BasicPropValueType, DeferredPropValueType, PropType } from '../types/component';
import {isDeferredPropType} from "./is-deferred-prop-type";

export const isValidPropType = (
    propType: PropType,
    propValue: BasicPropValueType | BasicPropValueType[]
): boolean => {
    return (
        (propType.type === String && typeof propValue === 'string')
        || (propType.type === Boolean && typeof propValue === 'boolean')
        || (propType.type === Number && typeof propValue === 'number')
        || (propType.type === Array && Array.isArray(propValue))
        || (propType.type === Object && (propValue instanceof Object && !Array.isArray(propValue)))
    ) || isDeferredPropType(propValue);
};
