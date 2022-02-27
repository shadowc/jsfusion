# JsFusion

![Version](https://img.shields.io/badge/version-0.1--alpha1-blue)

## Abstract 

JsFusion is a JavaScript Framework designed to work together with technologies
such as [@hotwired/turbo](https://github.com/hotwired/turbo) to seamlessly
apply client functionality to HTML templates dynamically. It is greatly 
inspired on [Stimulus](https://github.com/hotwired/stimulus) (improving upon
it) and somewhat inspired in ReactJS and VueJS (borrow some syntax
strategies and implementations)

## Current version

The current version is experimental and incomplete, and should not be used
in a production environment. Its API and functionalities are subject to
change and backwards compatibility is not assured at this time. Feel free
to experiment with it and suggest features, fixes and improvements.

This section will be updated as development progresses.

## Extensibility

This framework is thought with extensibility in mind. You will be able to
easily extend the functionality of this framework by applying changes to
`Runtime` before the call to `start()`. 

Some aspects that can be extended are:

- Attribute Handling: You will be able to extend the number of `data-`
prefixed attributes so that when they are added or change, your parsing
method will be called
- `data-bind` special cases: You will be able to extend the `data-bind`
attribute parsing so that new binding mechanisms can be established.

## Usage

### Installation and Setup

To use JsFusion you should install this via npm packages:

`npm install jsfusion`;

or

`yarn add jsfusion`;

And use it in your main `app.js` file (or the file that is loaded by every
page in your site) by importing its runtime:

```javascript
import { Runtime } from 'jsfusion';
// Import your jsfusion components here
import Counter from './components/counter';  

// Create one (and only one isntance of the runtime)
const JsFusion = new Runtime();

// Register your components, giving them a name
JsFusion.registerComponent('counter', Counter);

// Finally start the engine!
JsFusion.start();
```

That is all you need! Now JsFusion will look through your DOM structure and
observe changes to it (much like Stimulus) to instantiate and manage the
different Components on your page.

### Create a Component

To attach a component to a DOM element, simply use the `data-component`
attribute on the component's main element. Any components instantiated
inside this main element (that isn't inside another component) will
be listed as a child component.

#### HTML

```html
<!-- JsFusion will look for a component class that was registered as "counter" -->
<div data-component="counter">
    <!-- div contents here! -->
</div>
```

#### JavaScript (Component Class)

```javascript
import { Component } from 'jsfusion';

// This Component does nothing yet, but hey, it's still cool!
export default class Counter extends Component {
};
```

#### JavaScript (app.js)

```javascript
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

You can instantiate multiple components on the same element (they will share
the same children) by either using json notation for an `Array` or simply
separating them with spaces:

#### HTML

```html
<div data-component="counter otherComponent"></div>
```

#### HTML

```html
<div data-component='["counter", "otherComponent"]'></div>
```

Finally, you can have children components inside your Component structure,
and they will be accessible through the `this.children` collection.

#### HTML

```html
<div data-component="otherComponent">
    <label>Here is a counter:</label>
    
    <span data-component="counter"></span>
</div>
```

#### JavaScript

```javascript
// otherComponent.js
export default class extends Component {
    myFunc() {
        // Counter
        this.children[0].doSomething();
    }
}
```

Conversely, children Components can access its parent through the 
`this.parent` getter.

#### JavaScript

```javascript
// count.js
export default class extends Component {
    myFunc() {
        this.parent.doSomething();
    }
}
```

If the component has many parent components (as many components can
have access to a single HTML element), you can use the special property
`parents` which behaves like `children` but in an upward direction:

#### JavaScript

```javascript
// count.js
export default class extends Component {
    myFunc() {
        this.parents.otherComponent.doSomething();
    }
}
```

### Component Props and PropTypes

Components can have Props initialized in the DOM (much like Stimulus
Values system) that can respond to a PropTypes pattern (much like in
ReactJS). You initialize props by adding a `data-props` attribute
to the main element of a component.

Props can be passed to Children components props and its values will be
synced when any of the Components in the chain changes this value either
from JavaScript or from the DOM by changing the value of the attribute.

In addition to this, props can bind to different behavior, using the
`data-bind` attribute to extend the functionality of your components with
little coding in the way.

To have props, first you need to define your component's propTypes object.
You will only be able to assign props that are defined by this interface.
You do so by overriding the `setPropTypes` function in your Component 
class.

#### JavaScript

```javascript
import { Component } from 'jsfusion';

export default class Counter extends Component {
    setPropTypes() {
        this.propTypes = {
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

#### JavaScript

```javascript
export default class Counter extends Component {
    // Define propsTypes in setPropTypes() first!
    myFunction() {
        this.props.count = 2; // this will have side-effects
        console.log(this.props.count);
    }
}
```

To pass props to a component, you just need to use Json to provide a
collection of key/value pairs with the desired values:

#### HTML

```html
<div data-component="counter" data-props='{ "count": 0 }'></div>
```

To provide props for multiple Components, the syntax becomes a bit more
complex:

#### HTML

```html
<div data-component="counter otherComponent" data-props='{
    "counter": { "count": 0 },
    "otherComponent": { "myValue": "Hello World!" },
}'></div>
```

You can also pass props from one Component to its child Component by
using special json syntax. This is useful for automatically passing down
dynamic data between Components. If the value of a prop changes in the
parent component, it will also change in its child Component, also eliciting
side effects there.

#### HTML

```html
<div data-component="otherComponent" data-props='{ "mainCount": 0 }'>
    <label>Here is a counter:</label>

    <span data-component="counter" data-props='{ "count": { "#parentProp": "mainCount" } }'></span>
</div>
```

> You can only pass down props from parents to children. Note that you can
> access props by using the `this.children` and `this.parent` special
> properties. So you should only be passing down props when you want its
> side effects to be implemented instantly, for example when any of the
> components change this prop.

> When a prop is modified mid-tree (i.e. a children of where the prop is
> declared), only children components of this child will reflect this 
> change, creating a de-sync between the original parent and its children 
> until the parent decides to update its prop, thus updating all the props 
> down-children again.

> If you pass an Object as a prop value, avoid using the key '#parentProp'
> as it is bound to cause errors!

Finally, since props are passed using Json notation, you can easily
pass objects created by a PHP function, for example, when using `Twig` as
a templating engine:

#### Twig

```twig
<div data-component="otherComponent" data-props="{{ myPropsObject|json|e('html_attr') }}">
```

### Bind props to HTMLElements

After you have defined and initialized a prop, you can bind it to different
elements of the DOM by using the special `data-bind` attribute. After
parsing this attribute, whenever any of the props mentioned change, its
effects will be rendered immediately.

The syntax for `data-bind` is as follows:

#### HTML

```html
<div data-bind="<strategy>:<component>.<prop>"></div>
```

You can specify multiple bindings by separating them with spaces or
providing them in a json array of strings notation, but notice that
as of right now, with only one binding strategy, they will conflict with
each other.

#### HTML

```html
<div data-bind="text:counter.count text:otherComponent.myProp"></div>
```

#### HTML

```html
<div data-bind='[ 
    "text:counter.count", 
    "text:otherComponent.myProp" 
]'></div>
```


### `data-bind` `text`

The most simple bind strategy is "text", where the `innerText` property
of the HTML Element will be synced with the value of the property referred.

#### HTML

```html
<div data-component="counter" data-props='{ "count": 0 }'>
    <span data-bind="text:counter.count"></span>
</div>
```

In this example, the `<span>` element will have its `innerText` property
bound to the `this.props.count` property in the `coutner` component.

### New bind strategies

New types of bind can be easily implemented and even extended by using
a plugin type system.

### Reference specific DOM Elements

References to elements inside the component DOM structure can be saved by
using the `data-ref` attribute. Simply provide the name of the ref getter
that will be accessible from the Component, similar to the `data-target`
strategy in Stimulus.

The syntax is as follows:

#### HTML

```html
<div data-ref="<component>:<refName>"></div>
```

You can specify multiple refs (if several components have access to this
element, for example when this element lies within a parent and its child
component) by separating them with spaces or providing them in the form
of an array of strings in json notation:

#### HTML

```html
<div data-ref="counter:refName otherComponent:otherRef"></div>
```

#### HTML

```html
<div data-ref='[
    "counter:refName",
    "otherComponent:otherRef"
]'></div>
```

Once defined, these refs can be referenced from the Component class:

#### JavaScript

```javascript
export default class extends Component {
    myFunction() {
        this.refs.refName.innerHTML = this.props.count;
    }
}
```

You can have multiple elements with the same ref name, and they will be
exposed through an `Array` instead of just the HTMLElement.

### Event handling

Events can be dynamically assigned by the special attribute `data-on`, 
specifying the browser event name (without the `on` part) and the
function that handles it.

The syntax is as follows: 

#### HTML

```html
<div data-on="<event>:<component>.<handler>"></div>
```

You can specify multiple event handlers to one element, again by separating
them with spaces or providing the proper json array of strings.

#### HTML

```html
<div data-on="click:counter.handleClick mouseup:otherComponent.handleMouseUp"></div>
```

#### HTML

```html
<div data-on='[
    "click:counter.handleClick",
    "mouseup:otherComponent.handleMouseUp"
]'></div>
```

Once parsed, these callbacks will be called when the event occurs.

#### JavaScript

```javascript
export default class extends Component {
    /**
     * @param {MouseEvent} event
     * @returns {boolean}
     */
    handleClick(event) {
        event.preventDefault();
        
        return false;
    }
}
```

### LifeCycle functions

TBD.

### Future development

New ideas and concepts will evolve and be implemented as the framework
matures.
