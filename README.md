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

## Usage

### Installation and Setup

To use JsFusion you should install this via npm packages:

`npm install git@github.com/shadowc/jsfusion`;

or

`yarn add git@github.com/shadowc/jsfusion`;

(There is still no package name or official version information about this
package)

And use it in your main `app.js` file (or the file that is loaded by every
page in your site) by importing its runtime:

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
```

That is all you need! Now Jsfusion will look through your DOM structure and
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
<div data-component="['counter', 'otherComponent']"></div>
```

Finally, you can have children components inside your Component structure
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
        this.children.counter.doSomething();
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
    .
    .
    .
    
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
<div data-component="counter" data-props="{ count: 0 }"></div>
```

To provide props for multiple Components, the syntax becomes a bit more
complex:

#### HTML

```html
<div data-component="counter otherComponent" data-props="{
    counter: { count: 0 },
    otherComponent: { myValue: 'Hello World!' },
}"></div>
```

You can also pass props from one Component to its child Component by
using special json syntax. This is useful for automatically passing down
dynamic data between Components. If the value of a prop changes in the
parent component, it will also change in its child Component, also eliciting
side effects there.

#### HTML

```html
<div data-component="otherComponent" data-props="{ mainCount: 0 }">
    <label>Here is a counter:</label>

    <span data-component="counter" data-props="{ count: { '#ref': 'otherComponent.count' } }"></span>
</div>
```

> You can only pass down props from parents to children. Note that you can
> access props by using the `this.children` and `this.parent` special
> properties. So you should only be passing down props when you want its
> side effects to be implemented instantly, for example when any of the
> components change this prop.
