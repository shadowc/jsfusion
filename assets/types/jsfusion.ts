import { ObservableAttributes } from '../observables';
import { ObservableAttributeCallback } from './observables';
import Component from '../component';

export interface JsFusion {
    observer: MutationObserver;
    observableAttributes: ObservableAttributes;
    componentRegistry: Array<{component: Component, node: Element }>;

    mutationObserverHandler: (mutationList: MutationRecord[]) => void;
    start: () => void;

    // Handlers
    instantiateController: ObservableAttributeCallback;
}
