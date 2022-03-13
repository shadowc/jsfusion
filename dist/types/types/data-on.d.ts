export declare type EventHandlerCallback = (event?: Event) => boolean | void;
export interface IEventHandler {
    eventName: string;
    callback: EventHandlerCallback;
    boundCallback: EventHandlerCallback;
    target: HTMLElement;
}
export declare type EventHandlerCollection = IEventHandler[];
export interface IEventHandlerStrategy {
    eventName: string;
    componentName: string;
    callbackName: string;
}
