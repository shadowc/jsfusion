import { IObservableAttributes, ObservableAttributeCollection } from './types/observable-attributes';
import { IAttributeHandler } from './types/attribute-handler';
/**
 * Class that administers the observable attributes by the framework
 */
export declare class ObservableAttributes implements IObservableAttributes {
    attributes: ObservableAttributeCollection;
    registerAttributeHandler(attributeName: string, handler: IAttributeHandler): void;
}
