import { IRuntime } from './runtime';

export type ObservableAttributeCallback = (attribute: String, element: Element) => void;

export interface IAttributeHandler {
    constructor(parent: IRuntime);

    parent: IRuntime;
    handleAttribute: ObservableAttributeCallback;
}
