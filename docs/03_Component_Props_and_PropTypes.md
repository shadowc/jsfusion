# Component Props and PropTypes

Components can have Props initialized in the DOM (much like Stimulus
Values system) that can respond to a PropTypes pattern (much like in
ReactJS). You initialize props by adding a `data-props` attribute
to the main element of a component.

Props can be passed to Children components props and its values will be
synced downwards when any of the Components in the chain changes this
value either from JavaScript or from the DOM by changing the value of
the attribute.

In addition to this, props can bind to different behavior, using the
`data-bind` attribute to extend the functionality of your components with
little coding in the way.

## PropTypes

To have props, first you need to define your component's `propTypes` object.
You will only be able to assign props that are defined by this interface.
You do so by overriding the `setPropTypes` function in your Component
class and use it for returning your `propTypes` object.

`JavaScript`
```javascript
import { Component } from 'jsfusion';

export default class Counter extends Component {
    setPropTypes() {
        return {
            count: {
                type: Number, // Types can be Number, String, Object or Array
                defaultValue: 0,  // If you need a default value, you can assign it here
                required: true,  // Set this to true if you want to enforce your DOM element to always provide this prop's initial value
            }
        };
    }
};
```

PropTypes can only be defined in the `setPropTypes` function, they will
remain the same throughout the lifetime of the Component. Once the
Component is instantiated, you can access your Props through the
`this.props` collection.

`JavaScript`
```javascript
export default class Counter extends Component {
    // Define propsTypes in setPropTypes() first!
    myFunction() {
        this.props.count = 2; // this will have side-effects
        console.log(this.props.count);
    }
}
```

## Defining props

To pass props to a component, you just need to use Json to provide a
collection of key/value pairs with the desired values:

`HTML`
```html
<div data-component="counter" data-props='{ "count": 0 }'></div>
```

## Multiple component props definition

To provide props for multiple Components, the syntax becomes a bit more
complex:

`HTML`
```html
<div data-component="counter otherComponent" data-props='{
    "counter": { "count": 0 },
    "otherComponent": { "myValue": "Hello World!" },
}'></div>
```

## Deferred Props

You can also pass props from one Component to its child Component by
using special json syntax. This is useful for automatically passing down
dynamic data between Components. If the value of a prop changes in the
parent component, it will also change in its child Component, also eliciting
side effects there.

`HTML`
```html
<div data-component="otherComponent" data-props='{ "mainCount": 0 }'>
    <label>Here is a counter:</label>

    <span data-component="counter" data-props='{ "count": { "#parentProp": "mainCount" } }'></span>
</div>
```

You can define the component that should be passing down the prop by
specifying the parent name:

`HTML`
```html
<div data-component="parentComponent otherComponent" data-props='{
    "parentComponent": { "mainCount": 0 },
    "otherComponent": { "mainCount": 1 }
}'>
    <label>Here is a counter:</label>

    <span data-component="counter" data-props='{ "count": { "#parentProp": "parentComponent.mainCount" } }'></span>
</div>
```

> You can only pass down props from parents to children. Note that you can
> access props by using the `this.children` and `this.parent` special
> properties. So you should only be passing down props when you want its
> side effects to be implemented instantly, for example when any of the
> components change this prop.

> When a prop is modified mid-tree (i.e. a children of where the prop is
> declared), all the tree of props will reflect this
> change, causing side effects in all the chain. Keep this into account!

> If you pass an Object as a prop value, avoid using the key '#parentProp'
> as it is bound to cause errors!

> *Alpha*: The feature for detecting changes in properties or elements in
> Objects or Arrays in props is not implemented yet.

## Using Twig to pass down props

Finally, since props are passed using Json notation, you can easily
pass objects created by a PHP function, for example, when using `Twig` as
a templating engine:

`Twig`
```twig
<div data-component="otherComponent" data-props="{{ myPropsObject|json|e('html_attr') }}">
```