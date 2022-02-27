import { Runtime } from '../dist/runtime.min';
import { assertComponents, assertComponentRegistry } from './assert-component-helpers';
import BasicComponent from './components/basic-component';
import OtherBasicComponent from './components/basic-component';

import './mutation-observer-mock';

let JsFusion;

beforeEach(() => {
    JsFusion = new Runtime();
});

it('Can instantiate a basic component in html', () => {
    JsFusion.registerComponent('basicComponent', BasicComponent);

    document.body.innerHTML = '<div data-component="basicComponent"></div>';

    JsFusion.start();

    const componentElement = document.querySelector('div[data-component=basicComponent]');

    assertComponents([
        {
            name: 'basicComponent',
            component: BasicComponent,
        },
    ], JsFusion);

    assertComponentRegistry([
        {
            name: 'basicComponent',
            instance: BasicComponent,
            element: componentElement,
        },
    ], JsFusion);
});

it('Errors when instantiating a component with bad data', () => {
    JsFusion.registerComponent('basicComponent', BasicComponent);

    document.body.innerHTML = '<div data-component=\'{ "badProperty": true }\'></div>';

    expect(() => { JsFusion.start(); }).toThrow();
});

it('Errors when trying to instantiate a component that was not registered', () => {
    JsFusion.registerComponent('basicComponent', BasicComponent);

    document.body.innerHTML = '<div data-component="nonExistentComponent"></div>';

    expect(() => { JsFusion.start(); }).toThrow();
});

it('Can correctly register 2 components into a single element by space separated string', () => {
    JsFusion.registerComponent('basicComponent', BasicComponent);
    JsFusion.registerComponent('otherBasicComponent', OtherBasicComponent);

    document.body.innerHTML = '<div data-component="basicComponent otherBasicComponent"></div>';

    JsFusion.start();

    const componentElement = document.querySelector('div[data-component="basicComponent otherBasicComponent"]');

    assertComponents([
        {
            name: 'basicComponent',
            component: BasicComponent,
        },
        {
            name: 'otherBasicComponent',
            component: BasicComponent,
        },
    ], JsFusion);

    assertComponentRegistry([
        {
            name: 'basicComponent',
            instance: BasicComponent,
            element: componentElement,
        },
        {
            name: 'otherBasicComponent',
            instance: BasicComponent,
            element: componentElement,
        },
    ], JsFusion);
});

it('Can correctly register 2 components into a single element by JSON array syntax', () => {
    JsFusion.registerComponent('basicComponent', BasicComponent);
    JsFusion.registerComponent('otherBasicComponent', OtherBasicComponent);

    document.body.innerHTML = '<div data-component=\'["basicComponent", "otherBasicComponent"]\'></div>';

    JsFusion.start();

    const componentElement = document.querySelector('div[data-component=\'["basicComponent", "otherBasicComponent"]\']');

    assertComponents([
        {
            name: 'basicComponent',
            component: BasicComponent,
        },
        {
            name: 'otherBasicComponent',
            component: BasicComponent,
        },
    ], JsFusion);

    assertComponentRegistry([
        {
            name: 'basicComponent',
            instance: BasicComponent,
            element: componentElement,
        },
        {
            name: 'otherBasicComponent',
            instance: BasicComponent,
            element: componentElement,
        },
    ], JsFusion);
});

it('Cannot assign a different element to a component', () => {
    JsFusion.registerComponent('basicComponent', BasicComponent);

    document.body.innerHTML = '<div data-component="basicComponent"></div>';

    JsFusion.start();

    expect(() => {
        JsFusion.componentRegistry[0].component.element = document.createElement('div');
    }).toThrow();
});
