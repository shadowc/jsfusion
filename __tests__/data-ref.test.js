import { Runtime } from '../dist/runtime.min';
import CounterComponent from "./components/counter-component";

import './helpers/mutation-observer-mock';

let JsFusion;

beforeEach(() => {
    JsFusion = new Runtime();
});

it('Errors when we pass a bad syntax for a data-ref attribute', () => {
    document.body.innerHTML = '<div data-ref="bad data bind prop"></div>';

    expect(() => {
        JsFusion.start();
    }).toThrow();
});

it('Errors when the ref component doesn\'t exist.', () => {
    JsFusion.registerComponent('counter', CounterComponent);

    document.body.innerHTML = '<div data-component="counter" data-ref="otherComponent.counter"></div>';

    expect(() => {
        JsFusion.start();
    }).toThrow();
});

it('Should add a ref to a component', () => {
    JsFusion.registerComponent('counter', CounterComponent);

    document.body.innerHTML = '<div id="counter" data-component="counter" data-ref="counter.counter"></div>';

    JsFusion.start();

    const element = document.getElementById('counter');

    expect(JsFusion.componentRegistry[0].component.refs.counter).toEqual(element);
});

it('Should add a ref to a component that is up in the parent tree', () => {
    JsFusion.registerComponent('counter', CounterComponent);

    document.body.innerHTML = `
<div id="counter" data-component="counter">
    <span id="span-ref" data-ref="counter.counter"></span>
</div>`;

    JsFusion.start();

    const element = document.getElementById('span-ref');

    expect(JsFusion.componentRegistry[0].component.refs.counter).toEqual(element);
});

it('Should add several refs to the same name and be accesible', () => {
    JsFusion.registerComponent('counter', CounterComponent);

    document.body.innerHTML = `
<div id="counter" data-component="counter">
    <span id="span-ref1" data-ref="counter.counter"></span>
    <span id="span-ref2" data-ref="counter.counter"></span>
</div>`;

    JsFusion.start();

    const elements = [
        document.getElementById('span-ref1'),
        document.getElementById('span-ref2')
    ];

    expect(JsFusion.componentRegistry[0].component.refs.counter.length).toBe(2);
    expect(JsFusion.componentRegistry[0].component.refs.counter[0]).toEqual(elements[0]);
    expect(JsFusion.componentRegistry[0].component.refs.counter[1]).toEqual(elements[1]);
});
