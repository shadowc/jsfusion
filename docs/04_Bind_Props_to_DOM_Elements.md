# Bind props to DOM Elements

After you have defined and initialized a prop, you can bind it to different
elements of the DOM by using the special `data-bind` attribute. After
parsing this attribute, whenever any of the props involved change, its
effects will be rendered immediately.

The syntax for `data-bind` is as follows:

```html
<div data-bind="<strategy>:<component>.<prop>"></div>
```

You can specify multiple bindings by separating them with spaces or
providing them in a `json` Array of strings, but notice that
as of right now, with only one binding strategy, they will conflict with
each other.

```html
<div data-bind="text:counter.count text:otherComponent.myProp"></div>
```

```html
<div data-bind='[ 
    "text:counter.count", 
    "text:otherComponent.myProp" 
]'></div>
```

## `data-bind text`

The simplest bind strategy is "text", where the `innerText` property
of the DOM element will be synced with the value of the property referred to.

```html
<div data-component="counter" data-props='{ "count": 0 }'>
    <span data-bind="text:counter.count"></span>
</div>
```

In this example, the `<span>` element will have its `innerText` property
bound to the `this.props.count` property in the `coutner` component.

## New bind strategies

New types of bind can be easily implemented and even extended by using
a plugin type system.
