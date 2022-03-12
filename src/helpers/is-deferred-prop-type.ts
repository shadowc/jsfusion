import { BasicPropValueType, DeferredPropValueType } from '../types/component';

export const isDeferredPropType = (propValue: BasicPropValueType | BasicPropValueType[]): boolean => {
    return propValue !== null
        && typeof propValue === 'object'
        && typeof (propValue as DeferredPropValueType)['#parentProp'] === 'string';
}
