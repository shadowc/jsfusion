import { IRuntime } from './runtime';

export type ObservableAttributeCallback = (attribute: string, element: Element) => void;

export interface IAttributeHandler {
    parent: IRuntime;
    handleAttribute: ObservableAttributeCallback;
}
