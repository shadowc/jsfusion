export type ObservableAttributeCallback = (attribute: String, element: Element) => void;

export type ObservableAttributeList = { [index: string]: ObservableAttributeCallback };
