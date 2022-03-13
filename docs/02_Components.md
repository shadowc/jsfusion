# Components

The main concept of JsFusion are its Components. Components are classes
that derive from the abstract Component class and provide functionality
attached to DOM elements. As DOM elements mutate, components are created
and removed, as well as various of its features.

## Create a Component

To attach a component to a DOM element, simply use the `data-component`
attribute on the component's main element. Any components instantiated
inside this main element (that isn't inside another component) will
be listed as a child component.

`HTML`
```html
<!-- JsFusion will look for a component class that was registered as "counter" -->
<div data-component="counter">
    <!-- div contents here! -->
</div>
```

`JavaScript`
```javascript
// Component class
import { Component } from 'jsfusion';

// This Component does nothing yet, but hey, it's still cool!
export default class Counter extends Component {
};
```

`JavaScript`
```javascript
// app.js
import { Runtime } from 'jsfusion';
// Import your jsfusion components here
import Counter from './components/counter';  

// Create one (and only one isntance of the runtime
const JsFusion = new Runtime();

// Register your components, giving them a name
JsFusion.registerComponent('counter', Counter);

// Finally start the engine!
JsFusion.start();

// All present components will be instantiated at this point
```

## Multiple Components

You can instantiate multiple components on the same element (they will share
the same children) by either using json notation for an `Array` or simply
separating them with spaces:

`HTML`
```html
<div data-component="counter otherComponent"></div>
```

`HTML`
```html
<div data-component='["counter", "otherComponent"]'></div>
```

## Component children

You can have children components inside your Component structure,
and they will be accessible through the `this.children` array.

`HTML`
```html
<div data-component="otherComponent">
    <label>Here is a counter:</label>
    
    <span data-component="counter"></span>
</div>
```

`JavaScript`
```javascript
// otherComponent.js
export default class extends Component {
    myFunc() {
        // Counter
        this.children[0].doSomething();
    }
}
```

## Single Parent Component

Conversely, children Components can access its parent through the
`this.parent` getter.

`JavaScript`
```javascript
// count.js
export default class extends Component {
    myFunc() {
        this.parent.doSomething();
    }
}
```

## Multiple Parents

If the component has many parent components (as many components can
have access to a single HTML element), you can use the special property
`parents` which is a collection of components that you can access by
the component names:

`JavaScript`
```javascript
// count.js
export default class extends Component {
    myFunc() {
        this.parents.otherComponent.doSomething();
    }
}
```

> When a component has multiple parents, the first parsed component will
> be accessible through the `parent` getter.
