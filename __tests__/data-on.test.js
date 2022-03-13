import { Runtime } from '../dist/runtime.min';
import CounterComponent from "./components/counter-component";
import { assertEventHandlers } from './helpers/assert-event-handlers';

import './helpers/mutation-observer-mock';

let JsFusion;

beforeEach(() => {
    JsFusion = new Runtime();
});

it('Errors when we pass a bad syntax for a data-on attribute', () => {
    document.body.innerHTML = '<div data-on="bad data bind prop"></div>';

    expect(() => {
        JsFusion.start();
    }).toThrow();
});

it('Errors when the on component doesn\'t exist.', () => {
    JsFusion.registerComponent('counter', CounterComponent);

    document.body.innerHTML = '<div data-component="counter" data-on="click:otherComponent.handleClick"></div>';

    expect(() => {
        JsFusion.start();
    }).toThrow();
});

it('Errors when the component function doesn\'t exist.', () => {
    JsFusion.registerComponent('counter', CounterComponent);

    document.body.innerHTML = '<div data-component="counter" data-on="click:counter.nonexistent"></div>';

    expect(() => {
        JsFusion.start();
    }).toThrow();
});

it('Should add a click event to a component', () => {
    JsFusion.registerComponent('counter', CounterComponent);

    document.body.innerHTML = '<div id="counter" data-component="counter" data-on="click:counter.handleClick"></div>';

    JsFusion.start();

    const component = JsFusion.componentRegistry[0].component;

    assertEventHandlers(
        component,
        [
            {
                eventName: 'click',
                callback: component.handleClick,
                target: component.element,
            },
        ],
    );
});

it('Should add a click event to a component that is up in the parent tree', () => {
    JsFusion.registerComponent('counter', CounterComponent);

    document.body.innerHTML = `
<div id="counter" data-component="counter">
    <span id="span-on" data-on="click:counter.handleClick"></span>
</div>`;

    JsFusion.start();

    const component = JsFusion.componentRegistry[0].component;
    const element = document.getElementById('span-on');

    assertEventHandlers(
        component,
        [
            {
                eventName: 'click',
                callback: component.handleClick,
                target: element,
            },
        ],
    );
});

it('Should add several event handlers to the same component.', () => {
    JsFusion.registerComponent('counter', CounterComponent);

    document.body.innerHTML = `
<div id="counter" data-component="counter">
    <span id="span-on1" data-on="click:counter.handleClick"></span>
    <span id="span-on2" data-on="mouseover:counter.dummyEventHandler"></span>
</div>`;

    JsFusion.start();

    const component = JsFusion.componentRegistry[0].component;
    const firstSpan = document.getElementById('span-on1');
    const secondSpan = document.getElementById('span-on2');

    assertEventHandlers(
        component,
        [
            {
                eventName: 'click',
                callback: component.handleClick,
                target: firstSpan,
            },
            {
                eventName: 'mouseover',
                callback: component.dummyEventHandler,
                target: secondSpan,
            },
        ],
    );
});

it('Should add several event handlers to the same component on same element.', () => {
    JsFusion.registerComponent('counter', CounterComponent);

    document.body.innerHTML = `
<div id="counter" data-component="counter">
    <span id="span-on1" data-on="click:counter.handleClick mouseover:counter.dummyEventHandler"></span>
</div>`;

    JsFusion.start();

    const component = JsFusion.componentRegistry[0].component;
    const firstSpan = document.getElementById('span-on1');

    assertEventHandlers(
        component,
        [
            {
                eventName: 'click',
                callback: component.handleClick,
                target: firstSpan,
            },
            {
                eventName: 'mouseover',
                callback: component.dummyEventHandler,
                target: firstSpan,
            },
        ],
    );
});

it('Should add several event handlers to the same component on same element using array syntax.', () => {
    JsFusion.registerComponent('counter', CounterComponent);

    document.body.innerHTML = `
<div id="counter" data-component="counter">
    <span id="span-on1" data-on='[ "click:counter.handleClick", "mouseover:counter.dummyEventHandler" ]'></span>
</div>`;

    JsFusion.start();

    const component = JsFusion.componentRegistry[0].component;
    const firstSpan = document.getElementById('span-on1');

    assertEventHandlers(
        component,
        [
            {
                eventName: 'click',
                callback: component.handleClick,
                target: firstSpan,
            },
            {
                eventName: 'mouseover',
                callback: component.dummyEventHandler,
                target: firstSpan,
            },
        ],
    );
});

it('Should add several event handlers to different components on same element', () => {
    JsFusion.registerComponent('counter', CounterComponent);
    JsFusion.registerComponent('otherComponent', CounterComponent);

    document.body.innerHTML = `
<div id="counter" data-component="counter">
    <div id="otherComponent" data-component="otherComponent">
        <span id="span-on1" data-on='[ "click:counter.handleClick", "mouseover:otherComponent.dummyEventHandler" ]'></span>
    </div>
</div>`;

    JsFusion.start();
    const component = JsFusion.componentRegistry[0].component;
    const otherComponent = JsFusion.componentRegistry[1].component;
    const firstSpan = document.getElementById('span-on1');

    assertEventHandlers(
        component,
        [
            {
                eventName: 'click',
                callback: component.handleClick,
                target: firstSpan,
            },
        ],
    );

    assertEventHandlers(
        otherComponent,
        [
            {
                eventName: 'mouseover',
                callback: component.dummyEventHandler,
                target: firstSpan,
            },
        ],
    );
});

it('Should add custom event handlers to a component', () => {
    JsFusion.registerComponent('counter', CounterComponent);

    document.body.innerHTML = `
<div id="counter" data-component="counter">
    <span id="span-on" data-on="customEvent:counter.handleClick"></span>
</div>`;

    JsFusion.start();

    const component = JsFusion.componentRegistry[0].component;
    const element = document.getElementById('span-on');

    assertEventHandlers(
        component,
        [
            {
                eventName: 'customEvent',
                callback: component.handleClick,
                target: element,
            },
        ],
    );
});

it('Should increment the counter when I click on a button', () => {
    JsFusion.registerComponent('counter', CounterComponent);

    document.body.innerHTML = `
<div id="counter" data-component="counter">
    <span id="counting-span" data-bind="text:counter.counter"></span>
    <button id="button" data-on="click:counter.handleClick">Increment!</button>
</div>    
    `;

    JsFusion.start();

    const countingSpan = document.getElementById('counting-span');

    expect(countingSpan.innerText).toBe(0);

    document.getElementById('button').click();

    expect(countingSpan.innerText).toBe(1);

    document.getElementById('button').click();

    expect(countingSpan.innerText).toBe(2);
});
