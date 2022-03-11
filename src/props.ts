import {
    BasicPropValueType,
    IComponentPropsCollection,
    IComponent,
    DeferredPropValueType,
} from './types/component';
import {isValidPropType} from "./helpers/is-valid-prop-type";
import {Logger} from "./logger";

export class ComponentProps implements IComponentPropsCollection {
    [index: string]: BasicPropValueType | BasicPropValueType[];
    private readonly _valueMap: {[index: string]: BasicPropValueType | BasicPropValueType[]};
    private _component: IComponent;

    constructor(component: IComponent) {
        this._valueMap = {};
        this._component = component;
    }

    addProp(propName: string, value: BasicPropValueType | BasicPropValueType[]) {
        Object.defineProperty(this, propName, {
            get: (): BasicPropValueType | BasicPropValueType[] => {
                const rawValue = this._valueMap[propName];

                if (
                    rawValue !== null
                    && typeof rawValue === 'object'
                    && typeof((rawValue as DeferredPropValueType)['#parentProp']) === 'string'
                ) {
                    if (!this._component.parent) {
                        return null;
                    }

                    return this._component.parent.props[(rawValue as DeferredPropValueType)['#parentProp']];
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

                this._valueMap[propName] = value;
            }
        });

        this[propName] = value;
    }
}
