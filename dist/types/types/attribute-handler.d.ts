import { IRuntime } from './runtime';
export declare type ObservableAttributeCallback = (attribute: string, element: Element) => void;
export interface IAttributeHandler {
    parent: IRuntime;
    handleAttribute: ObservableAttributeCallback;
}
