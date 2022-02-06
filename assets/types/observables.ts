export type ObservableAttributeCallback = (attribute: String, element: Element) => void;
export type ObservableAttributeCollection = { [index: string]: ObservableAttributeCallback };

export interface IObservableAttributes {
    observableAttributesList: string[];
    attributes: ObservableAttributeCollection;

    registerAttributeHandler: (attributeName: string, handler: ObservableAttributeCallback) => void;
}
