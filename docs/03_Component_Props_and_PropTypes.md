# Component Props and PropTypes

Components can have Props initialized in the DOM (much like Stimulus
Values system) that can respond to a PropTypes pattern (much like in
ReactJS). You initialize props by adding a `data-props` attribute
to the main element of a component.

Props can be passed to Children components props and its values will be
synced through the entire tree when any of the Components in the chain 
changes this value either from JavaScript or from the DOM by changing 
the value of the `data-props` attribute in the Component where this prop
originates.

In addition to this, props can bind to different behavior, using the
`data-bind` attribute to extend the functionality of your components with
little coding in the way.

## PropTypes

To have props, first you need to define your component's `propTypes` object.
You will only be able to assign props that are defined by this interface.
You do so by overriding the `setPropTypes` function in your Component
class and use it for returning your `propTypes` object.

```javascript
import { Component } from 'jsfusion';

export default class Counter extends Component {
    setPropTypes() {
        return {
            count: {
                // Types can be Number, String, Object or Array
                type: Number,
                // If you need a default value, you can assign it here
                defaultValue: 0,
                // Set this to true if you want to enforce your DOM element
                // to always provide this prop's initial value, however, this
                // won't be enforced if the prop has a default value set.
                required: true,  
            }
        };
    }
};
```

PropTypes can only be defined in the `setPropTypes` function, they will
remain the same throughout the lifetime of the Component. Once the
Component is instantiated, you can access your Props through the
`this.props` collection.

```javascript
export default class Counter extends Component {
    // Define propsTypes in setPropTypes() first!
    
    // ...
    
    myFunction() {
        this.props.count = 2; // this will have side-effects
        console.log(this.props.count);
    }
}
```

> `JsFusion` will do its best to keep DOM element attributes in sync with
> the information in the component's props collection, so that when you
> change a prop from JavaScript, the DOM element's `data-props` attribute
> also changes to reflect that update.

## Defining props

To pass props to a component, you can use the following syntax:

```html
<div data-component="counter" data-props="[<componentName>.<propName>: <propValue>[, <otherPropsSeparatedByComas>]"></div>
```

For example, to set the `count` property of the `counter` component to `0` you
can either just define it like this:

```html
<div data-component="counter" data-props="count: 0"></div>
```

...since there's only one component defined at the DOM Element, or like this:

```html
<div data-component="counter" data-props="counter.count: 0"></div>
```

Useful for defining props on elements that have many components defined.

Alternatively, you can just use `json` notation to provide a
collection of key/value pairs with the desired values:

```html
<div data-component="counter" data-props='{ "count": 0 }'></div>
```

## Multiple component props definition

To provide props for multiple Components, the syntax becomes a bit more
complex when using `json`:

```html
<div data-component="counter otherComponent" data-props='{
    "counter": { "count": 0 },
    "otherComponent": { "myValue": "Hello World!" },
}'></div>
```

You can use the string format like this:

```html
<div 
    data-component="counter otherComponent" 
    data-props="counter.count: 0, otherComponent.myValue: Hello World!"
></div>
```

You can also use `json` to define special values in string formatted props,
for example, when assigning a number literal to a prop of type `string`:

```html
<div data-component="myComponent" data-props='myComponent.stringProp: "0"'></div>
```

> Anything in the `<value>` portion that cannot be parsed using `JSON.parse`
> will be processed as a string literal.

## Deferred Props

You can also pass props from one Component to its child Component by
using a special syntax. This is useful for automatically passing down
dynamic data between Components. If the value of a prop changes in any of
the components in the tree, all of them will update accordingly, also 
eliciting side effects there.

```html
<div data-component="otherComponent" data-props='{ "mainCount": 0 }'>
    <label>Here is a counter:</label>

    <span data-component="counter" data-props='{ "count": { "#parentProp": "mainCount" } }'></span>
</div>
```

With string syntax:

````html
<div data-component="otherComponent" data-props="mainCount: 0">
    <label>Here is a counter:</label>

    <span data-component="counter" data-props="count: #parentProp.mainCount"></span>
</div>
````

You can define the component that should be passing down the prop by
specifying the parent name:

```html
<div data-component="parentComponent otherComponent" data-props='{
    "parentComponent": { "mainCount": 0 },
    "otherComponent": { "mainCount": 1 }
}'>
    <label>Here is a counter:</label>

    <span data-component="counter" data-props='{ "count": { "#parentProp": "parentComponent.mainCount" } }'></span>
</div>
```

And again using string syntax:

```html
<div 
    data-component="parentComponent otherComponent" 
    data-props="parentComponent.mainCount: 0, otherComponent.mainCount: 1"
>
    <label>Here is a counter:</label>

    <span 
        data-component="counter" 
        data-props="count: #parentProp.parentComponent.mainCount"
    ></span>
</div>
```

> You can only pass down props from parents to children. Note that you can
> access props by using the `this.children` and `this.parent` special
> properties. So you should only be passing down props when you want its
> side effects to be implemented instantly, for example when any of the
> components implement a `data-bind` attribute.

> When a prop is modified mid-tree (i.e. a children of where the prop is
> declared), all the tree of props will reflect this
> change, causing side effects in all the chain. Keep this into account!

> If you pass an Object as a prop value, avoid using the key '#parentProp'
> as it is bound to cause errors!

> *1.0.0-alpha*: The feature for detecting changes in properties or elements in
> Objects or Arrays in props is not implemented yet. For now props should
> use simple values.

## Using Twig to pass down props

Finally, since props (and any other attributes) can be passed using `json`
notation, you can easily pass objects created in your Symfony controller, 
for example, when using `Twig` as a templating engine:

```twig
<div data-component="otherComponent" data-props="{{ myPropsObject|json|e('html_attr') }}">
```
