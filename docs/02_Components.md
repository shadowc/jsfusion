# Components

The main elements of `JsFusion` are its Components. Components are classes
that derive from the abstract Component class and provide functionality
attached to DOM elements. As DOM elements mutate, components are created
and removed, as well as various of its features.

## Create a Component

To attach a component to a DOM element, simply use the `data-component`
attribute on the component's main element. Any components instantiated
inside this main element (that isn't inside another component) will
be listed as a child component.

```html
<!-- JsFusion will look for a component class that was registered as "counter" -->
<div data-component="counter">
    <!-- DOM contents here! -->
</div>
```

```javascript
// Component class
import { Component } from 'jsfusion';

// This Component does nothing yet, but hey, it's still cool!
export default class Counter extends Component {
};
```

```javascript
// app.js
import { Runtime } from 'jsfusion';

// Import your JsFusion components here
import Counter from './components/counter';  

// Create one (and only one) isntance of the runtime
const JsFusion = new Runtime();

// Register your components, giving them a name
JsFusion.registerComponent('counter', Counter);

// Finally start the engine!
JsFusion.start();

// All present components will be instantiated at this point
```

## Multiple Components

You can instantiate multiple components on the same element (they will share
the same children) by either using `json` notation for an Array or simply
separating them with spaces:

```html
<div data-component="counter otherComponent"></div>
```

```html
<div data-component='["counter", "otherComponent"]'></div>
```

## Component children

You can have children components inside your Component structure,
and they will be accessible through the `this.children` Array.

```html
<div data-component="otherComponent">
    <label>Here is a counter:</label>
    
    <span data-component="counter"></span>
</div>
```

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
be instantiated in the same HTML element), you can use the special property
`parents` which is a collection of components that you can access by
the component names:

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
