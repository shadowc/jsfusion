import { Runtime } from '../dist/runtime.min';
import ComponentRequiredPropType from './components/component-required-propType';
import { assertComponentRegistry } from './helpers/assert-component-helpers';

import './helpers/mutation-observer-mock';

let JsFusion;

beforeEach(() => {
    JsFusion = new Runtime();
});

it('Can assign a prop to a component', () => {
    JsFusion.registerComponent('basicComponent', ComponentRequiredPropType);

    document.body.innerHTML = '<div id="basicComponent" data-component="basicComponent" data-props=\'{ "counter": 1 }\'></div>';

    JsFusion.start();

    assertComponentRegistry([
        {
            name: 'basicComponent',
            instance: ComponentRequiredPropType,
            element: document.getElementById('basicComponent'),
        }
    ], JsFusion);

    const component = JsFusion.componentRegistry[0].component;

    expect(component.props.counter).toEqual(1);
});

it('Can set a component\'s prop to another value', () => {
    JsFusion.registerComponent('basicComponent', ComponentRequiredPropType);

    document.body.innerHTML = '<div id="basicComponent" data-component="basicComponent" data-props=\'{ "counter": 1 }\'></div>';

    JsFusion.start();

    const component = JsFusion.componentRegistry[0].component;
    component.props.counter = 2;

    expect(component.props.counter).toEqual(2);
});

it('Can assign a component\'s prop to its parent component prop', () => {
    JsFusion.registerComponent('basicComponent', ComponentRequiredPropType);
    JsFusion.registerComponent('childComponent', ComponentRequiredPropType);

    document.body.innerHTML = `
<div id="basicComponent" data-component="basicComponent" data-props=\'{ "counter": 5 }\'>
    <div id="childComponent" data-component="childComponent" data-props=\'{ "counter": { "#parentProp": "counter" } }\'></div>
</div>`;

    JsFusion.start();

    assertComponentRegistry([
        {
            name: 'basicComponent',
            instance: ComponentRequiredPropType,
            element: document.getElementById('basicComponent'),
        },
        {
            name: 'childComponent',
            instance: ComponentRequiredPropType,
            element: document.getElementById('childComponent'),
        }
    ], JsFusion);

    const component = JsFusion.componentRegistry[0].component;
    const childComponent = JsFusion.componentRegistry[1].component;

    expect(component.props.counter).toEqual(5);
    expect(childComponent.props.counter).toEqual(5);
});

it('Updates a component\'s prop when its parent prop updates', () => {
    JsFusion.registerComponent('basicComponent', ComponentRequiredPropType);
    JsFusion.registerComponent('childComponent', ComponentRequiredPropType);

    document.body.innerHTML = `
<div id="basicComponent" data-component="basicComponent" data-props=\'{ "counter": 5 }\'>
    <div id="childComponent" data-component="childComponent" data-props=\'{ "counter": { "#parentProp": "counter" } }\'></div>
</div>`;

    JsFusion.start();

    const component = JsFusion.componentRegistry[0].component;
    const childComponent = JsFusion.componentRegistry[1].component;

    component.props.counter = 2;

    expect(component.props.counter).toEqual(2);
    expect(childComponent.props.counter).toEqual(2);
});

it('Errors when I try to assign a prop with the wrong type', () => {
    JsFusion.registerComponent('basicComponent', ComponentRequiredPropType);

    document.body.innerHTML = '<div id="basicComponent" data-component="basicComponent" data-props=\'{ "counter": 1 }\'></div>';

    JsFusion.start();

    const component = JsFusion.componentRegistry[0].component;

    expect(() => {
        component.props.counter = 'string';
    }).toThrow();
});
