# LifeCycle functions

A simple set of LifeCycle functions are called during the life span of
e Component. They include:

- `onCreated()` - Called when a component has been detected in the DOM and
instantiated.
- `onPropChanged(oldProps, newProps, propName)` - Called when the props in a component
are changed as a result of modifying the DOM or by programmatically 
changing them.
- `onDestroyed()` - Called when the DOM structure of a component has been
removed from DOM and the component needs to clean up.

> 1.0: `onPropChanged` won't be called under certain circumstances due to
> the mutation observer not being yet implemented. `onDestroyed` is not
> yet implemented as a result of removing elements from DOM.
