import { Runtime } from '../dist/runtime.min';
import LifecycleComponent from './components/lifecycle-component';

import './helpers/mutation-observer-mock';

let JsFusion;

beforeEach(() => {
    JsFusion = new Runtime();
});

it('Calls onCreated when a component is instantiated', () => {
    JsFusion.registerComponent('lifeCycle', LifecycleComponent);

    document.body.innerHTML = '<div id="lifeCycle" data-component="lifeCycle"></div>';

    JsFusion.start();

    expect(document.getElementById('on-created').innerHTML).toBe('Component Created');
});

it('Calls onPropChanged when we change a component prop', () => {
    JsFusion.registerComponent('lifeCycle', LifecycleComponent);

    document.body.innerHTML = '<div id="lifeCycle" data-component="lifeCycle"></div>';

    JsFusion.start();

    JsFusion.componentRegistry[0].component.changeProp();

    expect(document.getElementById('on-prop-changed').innerHTML).toBe('Hello World - Hello JavaScript - hello');
});

it('Calls onDestroyed when we destroy a component', () => {
    JsFusion.registerComponent('lifeCycle', LifecycleComponent);

    document.body.innerHTML = '<div id="lifeCycle" data-component="lifeCycle"></div>';

    JsFusion.start();

    // Cause a fictitious component deletion
    delete JsFusion.destroyComponentRegistry(0);

    expect(JsFusion.componentRegistry.length).toBe(0);
    expect(document.getElementById('on-destroyed').innerHTML).toBe('Component Destroyed');
});
