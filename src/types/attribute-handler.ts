import { IRuntime } from './runtime';

export type ObservableAttributeCallback = (attribute: string, element: HTMLElement) => void;

export interface IAttributeHandler {
    runtime: IRuntime;
    handleAttribute: ObservableAttributeCallback;
}
