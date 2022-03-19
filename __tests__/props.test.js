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

it('Can assign a prop to a component using basic string syntax', () => {
    JsFusion.registerComponent('basicComponent', ComponentRequiredPropType);

    document.body.innerHTML = '<div id="basicComponent" data-component="basicComponent" data-props="counter: 1"></div>';

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

it('Can assign a component\'s prop to its parent component prop using string syntax', () => {
    JsFusion.registerComponent('basicComponent', ComponentRequiredPropType);
    JsFusion.registerComponent('childComponent', ComponentRequiredPropType);

    document.body.innerHTML = `
<div id="basicComponent" data-component="basicComponent" data-props=\'{ "counter": 5 }\'>
    <div id="childComponent" data-component="childComponent" data-props="counter: #parentProp.counter"></div>
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

it('Handles a chain of parent prop assignments', () => {
    JsFusion.registerComponent('basicComponent', ComponentRequiredPropType);
    JsFusion.registerComponent('childComponent', ComponentRequiredPropType);
    JsFusion.registerComponent('grandChildComponent', ComponentRequiredPropType);

    document.body.innerHTML = `
<div id="basicComponent" data-component="basicComponent" data-props=\'{ "counter": 5 }\'>
    <div id="childComponent" data-component="childComponent" data-props=\'{ "counter": { "#parentProp": "counter" } }\'>
        <div id="grandChildComponent" data-component="grandChildComponent" data-props=\'{ "counter": { "#parentProp": "counter" } }\'></div>
    </div>
</div>`;

    JsFusion.start();

    const component = JsFusion.componentRegistry[0].component;
    const childComponent = JsFusion.componentRegistry[1].component;
    const grandChildComponent = JsFusion.componentRegistry[2].component;

    expect(component.props.counter).toBe(5);
    expect(childComponent.props.counter).toBe(5);
    expect(grandChildComponent.props.counter).toBe(5);

    childComponent.props.counter = 2;

    expect(component.props.counter).toBe(2);
    expect(childComponent.props.counter).toBe(2);
    expect(grandChildComponent.props.counter).toBe(2);
});

it('Errors when trying to set a child component prop set to a parent prop, the wrong type', () => {
    JsFusion.registerComponent('basicComponent', ComponentRequiredPropType);
    JsFusion.registerComponent('childComponent', ComponentRequiredPropType);

    document.body.innerHTML = `
<div id="basicComponent" data-component="basicComponent" data-props=\'{ "counter": 5 }\'>
    <div id="childComponent" data-component="childComponent" data-props=\'{ "counter": { "#parentProp": "counter" } }\'></div>
</div>`;

    JsFusion.start();

    const childComponent = JsFusion.componentRegistry[1].component;

    expect(() => {
        childComponent.props.counter = 'string';
    }).toThrow();
});

it('Errors when a component has 2 parents and we set a prop to a parent component without the right syntax', () => {
    JsFusion.registerComponent('basicComponent', ComponentRequiredPropType);
    JsFusion.registerComponent('parentComponent', ComponentRequiredPropType);
    JsFusion.registerComponent('childComponent', ComponentRequiredPropType);

    document.body.innerHTML = `
<div id="basicComponent" data-component="basicComponent parentComponent" data-props=\'{ "basicComponent": { "counter": 5 }, "parentComponent": { "counter": 4 } }\'>
    <div id="childComponent" data-component="childComponent" data-props=\'{ "counter": { "#parentProp": "counter" } }\'></div>
</div>`;

    expect(() => {
        JsFusion.start();
    }).toThrow();

    // text style
    document.body.innerHTML = `
<div id="basicComponent" data-component="basicComponent parentComponent" data-props=\'{ "basicComponent": { "counter": 5 }, "parentComponent": { "counter": 4 } }\'>
    <div id="childComponent" data-component="childComponent" data-props="counter: #parentProp.counter"></div>
</div>`;

    expect(() => {
        JsFusion.start();
    }).toThrow();
});

it('Can set the component props to one of 2 parent components props', () => {
    JsFusion.registerComponent('basicComponent', ComponentRequiredPropType);
    JsFusion.registerComponent('parentComponent', ComponentRequiredPropType);
    JsFusion.registerComponent('childComponent', ComponentRequiredPropType);

    document.body.innerHTML = `
<div id="basicComponent" data-component="basicComponent parentComponent" data-props=\'{ "basicComponent": { "counter": 5 }, "parentComponent": { "counter": 4 } }\'>
    <div id="childComponent" data-component="childComponent" data-props=\'{ "counter": { "#parentProp": "parentComponent.counter" } }\'></div>
</div>`;

    JsFusion.start();

    const basicComponent = JsFusion.componentRegistry[0].component;
    const parentComponent = JsFusion.componentRegistry[1].component;
    const childComponent = JsFusion.componentRegistry[2].component;

    expect(childComponent.props.counter).toBe(4);

    childComponent.props.counter = 2;

    expect(basicComponent.props.counter).toBe(5);
    expect(parentComponent.props.counter).toBe(2);
});

it('Can set the component props to one of 2 parent components props with string syntax', () => {
    JsFusion.registerComponent('basicComponent', ComponentRequiredPropType);
    JsFusion.registerComponent('parentComponent', ComponentRequiredPropType);
    JsFusion.registerComponent('childComponent', ComponentRequiredPropType);

    document.body.innerHTML = `
<div id="basicComponent" data-component="basicComponent parentComponent" data-props="basicComponent.counter: 5, parentComponent.counter: 4">
    <div id="childComponent" data-component="childComponent" data-props="counter: #parentProp.parentComponent.counter"></div>
</div>`;

    JsFusion.start();

    const basicComponent = JsFusion.componentRegistry[0].component;
    const parentComponent = JsFusion.componentRegistry[1].component;
    const childComponent = JsFusion.componentRegistry[2].component;

    expect(childComponent.props.counter).toBe(4);

    childComponent.props.counter = 2;

    expect(basicComponent.props.counter).toBe(5);
    expect(parentComponent.props.counter).toBe(2);
});

it('Errors when we set a deferred prop with a component with no parent', () => {
    JsFusion.registerComponent('parentComponent', ComponentRequiredPropType);

    document.body.innerHTML = `
<div id="basicComponent" data-component="parentComponent" data-props=\'{ "counter": { "#parentProp": "counter" } }\'></div>`;

    expect(() => {
        JsFusion.start();
    }).toThrow();
});

it('Errors when we set a deferred prop with a component with the wrong parent', () => {
    JsFusion.registerComponent('basicComponent', ComponentRequiredPropType);
    JsFusion.registerComponent('childComponent', ComponentRequiredPropType);

    document.body.innerHTML = `
<div id="basicComponent" data-component="basicComponent" data-props=\'{ "counter": 5 }\'>
    <div id="childComponent" data-component="childComponent" data-props=\'{ "counter": { "#parentProp": "otherComponent.counter" } }\'></div>
</div>`;

    expect(() => {
        JsFusion.start();
    }).toThrow();
});

it('Can set a deferred prop on a component with one parent using the parent\'s name', () => {
    JsFusion.registerComponent('basicComponent', ComponentRequiredPropType);
    JsFusion.registerComponent('childComponent', ComponentRequiredPropType);

    document.body.innerHTML = `
<div id="basicComponent" data-component="basicComponent" data-props=\'{ "counter": 5 }\'>
    <div id="childComponent" data-component="childComponent" data-props=\'{ "counter": { "#parentProp": "basicComponent.counter" } }\'></div>
</div>`;

    JsFusion.start();

    const component = JsFusion.componentRegistry[1].component;

    expect(component.props.counter).toBe(5);
});

it('Can set a prop on a component with the prop name string syntax', () => {
    JsFusion.registerComponent('basicComponent', ComponentRequiredPropType);

    document.body.innerHTML = `
<div id="basicComponent" data-component="basicComponent" data-props="basicComponent.counter: 5"></div>`;

    JsFusion.start();

    const component = JsFusion.componentRegistry[0].component;

    expect(component.props.counter).toBe(5);
});

it('Can set props for an element with two components with string syntax', () => {
    JsFusion.registerComponent('basicComponent', ComponentRequiredPropType);
    JsFusion.registerComponent('childComponent', ComponentRequiredPropType);

    document.body.innerHTML = `
<div id="basicComponent" data-component="basicComponent childComponent" data-props="basicComponent.counter: 5, childComponent.counter: 3"></div>`;

    JsFusion.start();

    const component = JsFusion.componentRegistry[0].component;
    const childComponent = JsFusion.componentRegistry[1].component

    expect(component.props.counter).toBe(5);
    expect(childComponent.props.counter).toBe(3);
});

it('Errors when a prop is defined with the wrong component name', () => {
    JsFusion.registerComponent('basicComponent', ComponentRequiredPropType);

    document.body.innerHTML = `
<div id="basicComponent" data-component="basicComponent" data-props="otherComponent.counter: 5"></div>`;

    expect(() => {
        JsFusion.start();
    }).toThrow();
});

it('Errors when a prop is defined without component name and 2 components are defined', () => {
    JsFusion.registerComponent('basicComponent', ComponentRequiredPropType);
    JsFusion.registerComponent('childComponent', ComponentRequiredPropType);

    document.body.innerHTML = `
<div id="basicComponent" data-component="basicComponent childComponent" data-props="counter: 5, counter: 3"></div>`;

    expect(() => {
        JsFusion.start();
    }).toThrow();
});
