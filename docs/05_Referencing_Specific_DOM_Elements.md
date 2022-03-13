# Referencing specific DOM Elements

References to elements inside the component DOM structure can be saved by
using the `data-ref` attribute. Simply provide the name of the ref getter
that will be accessible from the Component, similar to the `data-target`
concept in Stimulus.

The syntax is as follows:

`HTML`
```html
<div data-ref="<component>:<refName>"></div>
```

You can specify multiple refs (if several components have access to this
element, for example when this element lies within a parent and its child
component) by separating them with spaces or providing them in the form
of an array of strings in json notation:

`HTML`
```html
<div data-ref="counter:refName otherComponent:otherRef"></div>
```

`HTML`
```html
<div data-ref='[
    "counter:refName",
    "otherComponent:otherRef"
]'></div>
```

Once defined, these refs can be referenced from the Component class:

`JavaScript`
```javascript
export default class extends Component {
    myFunction() {
        this.refs.refName.innerHTML = this.props.count;
    }
}
```

You can have multiple elements with the same ref name, and they will be
exposed through an `Array` instead of just the HTMLElement.
