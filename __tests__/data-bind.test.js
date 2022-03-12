import { Runtime } from '../dist/runtime.min';
import CounterComponent from "./components/counter-component";

import './helpers/mutation-observer-mock';

let JsFusion;

beforeEach(() => {
    JsFusion = new Runtime();
});

it('Errors when we pass a bad syntax for a data-bind attribute', () => {
    document.body.innerHTML = '<div data-bind="bad data bind prop"></div>';

    expect(() => {
        JsFusion.start();
    }).toThrow();
});

it('Errors when a strategy we pass wasn\'t registered as a valid strategy', () => {
    JsFusion.registerComponent('counter', CounterComponent);

    document.body.innerHTML = '<div data-component="counter" data-bind="innerHTML:counter.counter"></div>';

    expect(() => {
        JsFusion.start();
    }).toThrow();
});

it('Errors when the bind component doesn\'t exist.', () => {
    JsFusion.registerComponent('counter', CounterComponent);

    document.body.innerHTML = '<div data-component="counter" data-bind="text:otherComponent.counter"></div>';

    expect(() => {
        JsFusion.start();
    }).toThrow();
});

it('Errors when the bind prop doesn\'t exist.', () => {
    JsFusion.registerComponent('counter', CounterComponent);

    document.body.innerHTML = '<div data-component="counter" data-bind="text:counter.otherText"></div>';

    expect(() => {
        JsFusion.start();
    }).toThrow();
});

it('Should bind a prop to a text and display it in the DOM', () => {
    JsFusion.registerComponent('counter', CounterComponent);

    document.body.innerHTML = '<div id="counter" data-component="counter" data-bind="text:counter.counter"></div>';

    JsFusion.start();

    const element = document.getElementById('counter');

    expect(element.innerText).toBe(0);

    JsFusion.componentRegistry[0].component.props.counter = 4;

    expect(element.innerText).toBe(4);
});

it('Should bind a prop to a component that is up in the parent tree', () => {
    JsFusion.registerComponent('counter', CounterComponent);

    document.body.innerHTML = `
<div id="counter" data-component="counter">
    <span id="span-bind" data-bind="text:counter.counter"></span>
</div>`;

    JsFusion.start();

    const element = document.getElementById('span-bind');

    expect(element.innerText).toBe(0);

    JsFusion.componentRegistry[0].component.props.counter = 4;

    expect(element.innerText).toBe(4);
});

it('Should bind a prop that is a deferred prop form a parent component', () => {
    JsFusion.registerComponent('counter', CounterComponent);
    JsFusion.registerComponent('other', CounterComponent);

    document.body.innerHTML = `
<div id="counter" data-component="counter">
    <div id="other" data-component="other" data-props='{ "counter": { "#parentProp": "counter" } }'>
        <span id="span-bind" data-bind="text:other.counter"></span>
    </div>
</div>`;

    JsFusion.start();

    const element = document.getElementById('span-bind');

    expect(element.innerText).toBe(0);

    JsFusion.componentRegistry[0].component.props.counter = 4;

    expect(element.innerText).toBe(4);
});
