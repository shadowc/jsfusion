import {
    BasicPropValueType,
    IComponentPropsCollection,
    IComponent,
    DeferredPropValueType,
} from './types/component';
import { isValidPropType } from './helpers/is-valid-prop-type';
import { isDeferredPropType } from './helpers/is-deferred-prop-type';
import { Logger } from './logger';
import { getParentForDeferredProp } from './helpers/get-parent-for-deferred-prop';
import { getPropNameForDeferredProp } from './helpers/get-prop-name-for-deferred-prop';

export class ComponentProps implements IComponentPropsCollection {
    [index: string]: BasicPropValueType | BasicPropValueType[];

    private readonly _valueMap: {[index: string]: BasicPropValueType | BasicPropValueType[]};
    private readonly _component: IComponent;

    constructor(component: IComponent) {
        this._valueMap = {};
        this._component = component;
    }

    addProp(propName: string, value: BasicPropValueType | BasicPropValueType[]) {
        // Determine propName if it's deferred that it matches the right parent!
        if (isDeferredPropType(value) && getParentForDeferredProp(this._component, value) === null) {
            Logger.error(`Invalid prop definition: Cannot find the right component to get value from (${(value as DeferredPropValueType)['#parentProp']}).`);
            throw 'Invalid prop value for deferred prop.';
        }

        Object.defineProperty(this, propName, {
            get: (): BasicPropValueType | BasicPropValueType[] => {
                const rawValue = this._valueMap[propName];

                if (isDeferredPropType(rawValue)) {
                    const parentCmp = getParentForDeferredProp(this._component, rawValue);

                    if (parentCmp === null) {
                        Logger.error(`Attempting to get value for deferred prop "${(value as DeferredPropValueType)['#parentProp']}" but no such parent exists.`)
                        throw 'Invalid prop value for deferred prop.';
                    }

                    return parentCmp.props[getPropNameForDeferredProp(rawValue) as string];
                }

                return this._valueMap[propName];
            },

            set: (value: BasicPropValueType | BasicPropValueType[]) => {
                if (this._component.propTypes[propName] === null) {
                    Logger.error(`Attempting to assign property ${propName} but it wasn't defined in propTypes. Did you forget to redefine setPropTypes() in your controller and make it return an object?`);
                    throw 'Attempting to set a non defined prop';
                }

                if (!isValidPropType(this._component.propTypes[propName], value)) {
                    Logger.error(`Invalid prop type for ${propName}.`, this._component.propTypes[propName], value);
                    throw 'Invalid prop-type.';
                }

                // Setting the prop to a deferred prop up in the tree
                if (isDeferredPropType(value)) {
                    const parentCmp = getParentForDeferredProp(this._component, value);

                    if (parentCmp === null) {
                        Logger.error(`Attempting to set a prop to a deferred prop "${(value as DeferredPropValueType)['#parentProp']}" but no such parent exists.`)
                        throw 'Invalid prop value for deferred prop.';
                    }

                    this._valueMap[propName] = value;
                    this.handleSideEffects(propName);
                } else {
                    if (isDeferredPropType(this._valueMap[propName])) {
                        const parentCmp = getParentForDeferredProp(this._component, this._valueMap[propName]);

                        if (parentCmp === null) {
                            Logger.error(`Attempting to assign a value for deferred prop "${(this._valueMap[propName] as DeferredPropValueType)['#parentProp']}" but no such parent exists.`)
                            throw 'Invalid prop value for deferred prop.';
                        }

                        parentCmp.props[getPropNameForDeferredProp(this._valueMap[propName]) as string] = value;
                        this.handleSideEffects(propName);
                    } else {
                        this._valueMap[propName] = value;
                        this.handleSideEffects(propName);
                    }
                }
            }
        });

        // Actually set the value with side effects at creation
        this[propName] = value;
    }

    handleSideEffects(propName: string): void {
        if (typeof this._component.propSideEffects[propName] !== 'undefined') {
            this._component.propSideEffects[propName].forEach((callback) => {
                callback(this[propName]);
            });
        }

        // If the component has child components with deferred props, we need to propagate side effects
        this._component.children.forEach((childComponent) => {
            const childProp = childComponent.props[propName];
            if (typeof childProp !== 'undefined') {
                childComponent.props.handleSideEffects(propName);
            }
        });
    }
}
