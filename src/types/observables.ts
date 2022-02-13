import { IAttributeHandler } from './attribute-handler';

export type ObservableAttributeCollection = { [index: string]: IAttributeHandler };

export interface IObservableAttributes {
    observableAttributeList: string[];
    attributes: ObservableAttributeCollection;

    registerAttributeHandler: (attributeName: string, handler: IAttributeHandler) => void;
}
