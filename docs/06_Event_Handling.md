# Event handling

Events can be dynamically assigned by the special attribute `data-on`,
specifying the browser event name (without the `on` part) and the
function that handles it.

The syntax is as follows:

`HTML`
```html
<div data-on="<event>:<component>.<handler>"></div>
```

You can specify multiple event handlers to one element, again by separating
them with spaces or providing the proper json array of strings.

`HTML`
```html
<div data-on="click:counter.handleClick mouseup:otherComponent.handleMouseUp"></div>
```

`HTML`
```html
<div data-on='[
    "click:counter.handleClick",
    "mouseup:otherComponent.handleMouseUp"
]'></div>
```

Once parsed, these callbacks will be called when the event occurs.

`JavaScript`
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

## Emitting your own custom events from a controller

If you need to emit a custom event to be caught from an element or
a controller upward in the tree, you can use the handy `emit` function
shortcut:

`JavaScript`
```javascript
export default class extends Component {
    myFunc() {
        this.emit('myCustomEvent', { payload: 'anything here' });
    }
}
```

This will emit a custom event called `myCustomEvent' from the `this.element`
HTMLElement. Alternatively, you can pass another Element to fire the event
from (you may be catching from within the same controller:

`JavaScript`
```javascript
export default class extends Component {
    myFunc() {
        this.emit('myCustomEvent', {
                payload: 'anything here' 
            },
            this.element.querySelector('span#eventDispatcherSpan'),
        );
    }
}
```

You can then conveniently catch these events using a `data-on` attribute:

`html`
```html
<div data-component="myComponent">
    <div data-on="myCustomEvent:myComponent.customEventHandler">
        <!--
            In here, another component (or perhaps the same one) will
            emit a custom event like we just showed.
            
            The payload, will be inside the event.detail property.
            
            See: https://developer.mozilla.org/en-US/docs/Web/Events/Creating_and_triggering_events
        -->
    </div>
</div>
```
