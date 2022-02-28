import { Runtime } from '../dist/runtime.min';
import ComponentWithBasicPropType from './components/component-basic-propType';
import { assertComponentRegistry } from './assert-component-helpers';

import './mutation-observer-mock';

let JsFusion;

beforeEach(() => {
    JsFusion = new Runtime();
});

it('Errors when passing the wrong type of data-props', () => {
    JsFusion.registerComponent('basicComponent', ComponentWithBasicPropType);

    document.body.innerHTML = '<div data-component="basicComponent" data-props="someString"></div>';

    expect(() => {
        JsFusion.start();
    }).toThrow();
});

it('Errors when propTypes is an array', () => {
    JsFusion.registerComponent('basicComponent', ComponentWithBasicPropType);

    document.body.innerHTML = '<div data-component="basicComponent" data-props=\'["someString"]\'></div>';

    expect(() => {
        JsFusion.start();
    }).toThrow();
});

it('Errors when data props is not in the same element as component', () => {
    JsFusion.registerComponent('basicComponent', ComponentWithBasicPropType);

    document.body.innerHTML = '<div data-component="basicComponent"><div  data-props=\'{}\'></div></div>';

    expect(() => {
        JsFusion.start();
    }).toThrow();
});

it('Bypasses nonexistent props if passed to component', () => {
    JsFusion.registerComponent('basicComponent', ComponentWithBasicPropType);

    document.body.innerHTML = '<div id="myComponent" data-component="basicComponent" data-props=\'{ "count": 3 }\'></div>';

    JsFusion.start();

    assertComponentRegistry([
        {
            name: 'basicComponent',
            instance: ComponentWithBasicPropType,
            element: document.getElementById('myComponent'),
        },
    ], JsFusion);

    expect(JsFusion.componentRegistry[0].component.props.count).toBeUndefined();
});

it('Allows a component with non required props to be created', () => {
    JsFusion.registerComponent('basicComponent', ComponentWithBasicPropType);

    document.body.innerHTML = '<div id="myComponent" data-component="basicComponent"></div>';

    JsFusion.start();

    assertComponentRegistry([
        {
            name: 'basicComponent',
            instance: ComponentWithBasicPropType,
            element: document.getElementById('myComponent'),
        },
    ], JsFusion);

    expect(JsFusion.componentRegistry[0].component.props.counter).toBeUndefined();
});

it('Allows a component with non required props to be created and assigned props', () => {
    JsFusion.registerComponent('basicComponent', ComponentWithBasicPropType);

    document.body.innerHTML = '<div id="myComponent" data-component="basicComponent" data-props=\'{ "counter": 3 }\'></div>';

    JsFusion.start();

    assertComponentRegistry([
        {
            name: 'basicComponent',
            instance: ComponentWithBasicPropType,
            element: document.getElementById('myComponent'),
        },
    ], JsFusion);

    expect(JsFusion.componentRegistry[0].component.props.counter).toEqual(3);
});

it('Errors when a prop type string is assigned to a prop type number', () => {
    JsFusion.registerComponent('basicComponent', ComponentWithBasicPropType);

    document.body.innerHTML = '<div id="myComponent" data-component="basicComponent" data-props=\'{ "counter": "3" }\'></div>';

    expect(() => {
        JsFusion.start();
    }).toThrow();
});
