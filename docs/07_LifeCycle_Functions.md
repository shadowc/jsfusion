# LifeCycle functions

A simple set of LifeCycle functions are called during the life span of
a Component. They include:

- `onCreated()` - Called when a component has been detected in the DOM and
instantiated (after all its property attributes have been parsed).
- `onPropChanged(oldProps, newProps, propName)` - Called when the props in a 
component are changed as a result of modifying the DOM or your JavaScript 
program.
- `onDestroyed()` - Called when the DOM structure of a component has been
removed from DOM and the component needs to clean up.

To implement them, simply override the abstract function in  your Component:

```javascript
import { Component } from 'jsfusion';

export default class extends Component {
    onCreated() {
        // Do something here...
        // ...
    }
}
```

> *1.0.0-alpha*: `onPropChanged` won't be called under certain circumstances 
> due to the mutation observer not being yet implemented. `onDestroyed` 
> is not yet being called as a result of removing elements from DOM.
