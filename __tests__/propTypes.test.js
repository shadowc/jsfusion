import { Runtime } from '../dist/runtime.min';
import ComponentWithBasicPropType from './components/component-basic-propType';
import ComponentRequiredPropType from './components/component-required-propType';
import ComponentRequiredDefaultPropType from './components/component-required-default-propType';
import ComponentDefaultPropType from './components/component-default-propType';
import CounterComponent from './components/counter-component';
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

it('Errors when a prop type boolean is passed to a prop type number', () => {
    JsFusion.registerComponent('basicComponent', ComponentWithBasicPropType);

    document.body.innerHTML = '<div id="myComponent" data-component="basicComponent" data-props=\'{ "counter": true }\'></div>';

    expect(() => {
        JsFusion.start();
    }).toThrow();
});

it('Errors when a prop type array is passed to a prop type number', ()=> {
    JsFusion.registerComponent('basicComponent', ComponentWithBasicPropType);

    document.body.innerHTML = '<div id="myComponent" data-component="basicComponent" data-props=\'{ "counter": [ 1 ] }\'></div>';

    expect(() => {
        JsFusion.start();
    }).toThrow();
});

it('Errors when a prop type object is passed to a prop type number', ()=> {
    JsFusion.registerComponent('basicComponent', ComponentWithBasicPropType);

    document.body.innerHTML = '<div id="myComponent" data-component="basicComponent" data-props=\'{ "counter": { "value": 1 } }\'></div>';

    expect(() => {
        JsFusion.start();
    }).toThrow();
});

it('Allows a component to be passed multiple props', () => {
    JsFusion.registerComponent('basicComponent', ComponentWithBasicPropType);

    document.body.innerHTML = `<div id="myComponent"
        data-component="basicComponent" 
        data-props=\'{ "counter": 3, "aString": "hello", "aBoolean": true, "anArray": [1, 2, 3], "anObject": { "value": 1 } }\'
    ></div>`;

    JsFusion.start();

    assertComponentRegistry([
        {
            name: 'basicComponent',
            instance: ComponentWithBasicPropType,
            element: document.getElementById('myComponent'),
        },
    ], JsFusion);

    const component = JsFusion.componentRegistry[0].component;
    expect(component.props.counter).toBe(3);
    expect(component.props.aString).toBe('hello');
    expect(component.props.aBoolean).toBe(true);
    expect(component.props.anArray).toStrictEqual([1, 2, 3]);
    expect(component.props.anObject).toStrictEqual({ value: 1 });
});

it('Errors when passing one set of props to a case with 2 components', () => {
    JsFusion.registerComponent('basicComponent', ComponentWithBasicPropType);
    JsFusion.registerComponent('otherComponent', ComponentWithBasicPropType);

    document.body.innerHTML = `<div id="myComponent"
        data-component="basicComponent otherComponent" 
        data-props=\'{ "counter": 3, "aString": "hello", "aBoolean": true, "anArray": [1, 2, 3], "anObject": { "value": 1 } }\'
    ></div>`;

    expect(() => {
        JsFusion.start();
    }).toThrow();
});

it('Allows 2 components to instantiate with their props', () => {
    JsFusion.registerComponent('basicComponent', ComponentWithBasicPropType);
    JsFusion.registerComponent('otherComponent', ComponentWithBasicPropType);

    document.body.innerHTML = `<div id="myComponent"
        data-component="basicComponent otherComponent" 
        data-props=\'{ "basicComponent": { "counter": 3 }, "otherComponent": { "counter": 5 } }\'
    ></div>`;

    JsFusion.start();

    assertComponentRegistry([
        {
            name: 'basicComponent',
            instance: ComponentWithBasicPropType,
            element: document.getElementById('myComponent'),
        },
        {
            name: 'otherComponent',
            instance: ComponentWithBasicPropType,
            element: document.getElementById('myComponent'),
        },
    ], JsFusion);

    expect(JsFusion.componentRegistry[0].component.props.counter).toBe(3);
    expect(JsFusion.componentRegistry[1].component.props.counter).toBe(5);
});

it('Errors when passing a number to a string prop', () => {
    JsFusion.registerComponent('basicComponent', ComponentWithBasicPropType);

    document.body.innerHTML = '<div id="myComponent" data-component="basicComponent" data-props=\'{ "aString": 1 }\'></div>';

    expect(() => {
        JsFusion.start();
    }).toThrow();
});

it('Errors when passing a boolean to a string prop', () => {
    JsFusion.registerComponent('basicComponent', ComponentWithBasicPropType);

    document.body.innerHTML = '<div id="myComponent" data-component="basicComponent" data-props=\'{ "aString": true }\'></div>';

    expect(() => {
        JsFusion.start();
    }).toThrow();
});

it('Errors when passing an array to a string prop', () => {
    JsFusion.registerComponent('basicComponent', ComponentWithBasicPropType);

    document.body.innerHTML = '<div id="myComponent" data-component="basicComponent" data-props=\'{ "aString": [1] }\'></div>';

    expect(() => {
        JsFusion.start();
    }).toThrow();
});

it('Errors when passing an object to a string prop', () => {
    JsFusion.registerComponent('basicComponent', ComponentWithBasicPropType);

    document.body.innerHTML = '<div id="myComponent" data-component="basicComponent" data-props=\'{ "aString": { "value": 1 } }\'></div>';

    expect(() => {
        JsFusion.start();
    }).toThrow();
});

it('Errors when passing a number to a boolean prop', () => {
    JsFusion.registerComponent('basicComponent', ComponentWithBasicPropType);

    document.body.innerHTML = '<div id="myComponent" data-component="basicComponent" data-props=\'{ "aBoolean": 1 }\'></div>';

    expect(() => {
        JsFusion.start();
    }).toThrow();
});

it('Errors when passing a string to a boolean prop', () => {
    JsFusion.registerComponent('basicComponent', ComponentWithBasicPropType);

    document.body.innerHTML = '<div id="myComponent" data-component="basicComponent" data-props=\'{ "aBoolean": "true" }\'></div>';

    expect(() => {
        JsFusion.start();
    }).toThrow();
});

it('Errors when passing an array to a boolean prop', () => {
    JsFusion.registerComponent('basicComponent', ComponentWithBasicPropType);

    document.body.innerHTML = '<div id="myComponent" data-component="basicComponent" data-props=\'{ "aBoolean": [1] }\'></div>';

    expect(() => {
        JsFusion.start();
    }).toThrow();
});

it('Errors when passing an object to a boolean prop', () => {
    JsFusion.registerComponent('basicComponent', ComponentWithBasicPropType);

    document.body.innerHTML = '<div id="myComponent" data-component="basicComponent" data-props=\'{ "aBoolean": { "value": 1 } }\'></div>';

    expect(() => {
        JsFusion.start();
    }).toThrow();
});

it('Errors when passing a number to an array prop', () => {
    JsFusion.registerComponent('basicComponent', ComponentWithBasicPropType);

    document.body.innerHTML = '<div id="myComponent" data-component="basicComponent" data-props=\'{ "anArray": 1 }\'></div>';

    expect(() => {
        JsFusion.start();
    }).toThrow();
});

it('Errors when passing a string to an array prop', () => {
    JsFusion.registerComponent('basicComponent', ComponentWithBasicPropType);

    document.body.innerHTML = '<div id="myComponent" data-component="basicComponent" data-props=\'{ "anArray": "[1]" }\'></div>';

    expect(() => {
        JsFusion.start();
    }).toThrow();
});

it('Errors when passing a boolean to an array prop', () => {
    JsFusion.registerComponent('basicComponent', ComponentWithBasicPropType);

    document.body.innerHTML = '<div id="myComponent" data-component="basicComponent" data-props=\'{ "anArray": true }\'></div>';

    expect(() => {
        JsFusion.start();
    }).toThrow();
});

it('Errors when passing an object to an array prop', () => {
    JsFusion.registerComponent('basicComponent', ComponentWithBasicPropType);

    document.body.innerHTML = '<div id="myComponent" data-component="basicComponent" data-props=\'{ "anArray": { "value": 1 } }\'></div>';

    expect(() => {
        JsFusion.start();
    }).toThrow();
});

it('Errors when passing a number to an object prop', () => {
    JsFusion.registerComponent('basicComponent', ComponentWithBasicPropType);

    document.body.innerHTML = '<div id="myComponent" data-component="basicComponent" data-props=\'{ "anObject": 1 }\'></div>';

    expect(() => {
        JsFusion.start();
    }).toThrow();
});

it('Errors when passing a string to an object prop', () => {
    JsFusion.registerComponent('basicComponent', ComponentWithBasicPropType);

    document.body.innerHTML = '<div id="myComponent" data-component="basicComponent" data-props=\'{ "anObject": "1" }\'></div>';

    expect(() => {
        JsFusion.start();
    }).toThrow();
});

it('Errors when passing a boolean to an object prop', () => {
    JsFusion.registerComponent('basicComponent', ComponentWithBasicPropType);

    document.body.innerHTML = '<div id="myComponent" data-component="basicComponent" data-props=\'{ "anObject": true }\'></div>';

    expect(() => {
        JsFusion.start();
    }).toThrow();
});

it('Errors when passing an array to an object prop', () => {
    JsFusion.registerComponent('basicComponent', ComponentWithBasicPropType);

    document.body.innerHTML = '<div id="myComponent" data-component="basicComponent" data-props=\'{ "anObject": [1] }\'></div>';

    expect(() => {
        JsFusion.start();
    }).toThrow();
});

it('Overrides a default value when specifying a prop', () => {
    JsFusion.registerComponent('counter', CounterComponent);

    document.body.innerHTML = '<div id="myComponent" data-component="counter" data-props=\'{ "counter": 5 }\'></div>';

    JsFusion.start();

    assertComponentRegistry([
        {
            name: 'counter',
            instance: CounterComponent,
            element: document.getElementById('myComponent'),
        },
    ], JsFusion);

    expect(JsFusion.componentRegistry[0].component.props.counter).toBe(5);
});

it('Errors when a required property is not provided (no data-props)', () => {
    JsFusion.registerComponent('required', ComponentRequiredPropType);

    document.body.innerHTML = '<div id="myComponent" data-component="required"></div>';

    expect(() => {
        JsFusion.start();
    }).toThrow();
});

it('Errors when a required property is not provided (incomplete data-props)', () => {
    JsFusion.registerComponent('required', ComponentRequiredPropType);

    document.body.innerHTML = '<div id="myComponent" data-component="required" data-props=\'{ "otherProp": "hello" }\'></div>';

    expect(() => {
        JsFusion.start();
    }).toThrow();
});

it('Doesn\'t error when a required prop has a default value (no data-props)', () => {
    JsFusion.registerComponent('required', ComponentRequiredDefaultPropType);

    document.body.innerHTML = '<div id="myComponent" data-component="required"></div>';

    JsFusion.start();

    assertComponentRegistry([
        {
            name: 'required',
            instance: ComponentRequiredDefaultPropType,
            element: document.getElementById('myComponent'),
        },
    ], JsFusion);

    expect(JsFusion.componentRegistry[0].component.props.counter).toBe(0);
});

it('Can instantiate a component with props on default values (no data-props)', () => {
    JsFusion.registerComponent('default', ComponentDefaultPropType);

    document.body.innerHTML = '<div id="myComponent" data-component="default"></div>';

    JsFusion.start();

    assertComponentRegistry([
        {
            name: 'default',
            instance: ComponentDefaultPropType,
            element: document.getElementById('myComponent'),
        },
    ], JsFusion);

    const component = JsFusion.componentRegistry[0].component;

    expect(component.props.counter).toBe(5);
    expect(component.props.aString).toBe('hello');
});

it('Can instantiate a component with props on default values (partial data-props)', () => {
    JsFusion.registerComponent('default', ComponentDefaultPropType);

    document.body.innerHTML = '<div id="myComponent" data-component="default" data-props=\'{ "counter": 10 }\'></div>';

    JsFusion.start();

    assertComponentRegistry([
        {
            name: 'default',
            instance: ComponentDefaultPropType,
            element: document.getElementById('myComponent'),
        },
    ], JsFusion);

    const component = JsFusion.componentRegistry[0].component;

    expect(component.props.counter).toBe(10);
    expect(component.props.aString).toBe('hello');
});
