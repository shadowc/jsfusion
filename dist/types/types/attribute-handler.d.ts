import { IRuntime } from './runtime';
export declare type ObservableAttributeCallback = (attribute: string, element: HTMLElement) => void;
export interface IAttributeHandler {
    parent: IRuntime;
    handleAttribute: ObservableAttributeCallback;
}
