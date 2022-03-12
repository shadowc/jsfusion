import { IAttributeHandler } from './attribute-handler';
export declare type ObservableAttributeCollection = {
    [index: string]: IAttributeHandler;
};
export interface IObservableAttributes {
    attributes: ObservableAttributeCollection;
    registerAttributeHandler: (attributeName: string, handler: IAttributeHandler) => void;
}
