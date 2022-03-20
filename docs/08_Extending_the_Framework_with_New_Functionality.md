# Extending the Framework with New Functionality

There are two ways in which you can extend `Jsfusion`. One is by adding new
attribute handlers, effectively extending the functionality of the Framework;
the other is by adding new `data-bind` strategies besides `text` which
would allow binding props to different behavior other than to just expose the
prop value in the HTML's text.

> *1.0.0-alpha* - This feature is subject to change as different aspects of
> the `MutationObserver` feature are implemented, and we start taking into
> account not only parsing these attributes, but also deciding when an 
> attribute is removed or modified. BC compatibility is not guaranteed here.

## Extending `data-*` attributes.

You extend `data-*` attributes by providing an `IAttributeHandler` object and
calling the function `JsFusion.registerAttributeHandler()` *before*
the call to `JsFusion.start()`.

> You can make `JsFusion` react to *any* HTML attribute, but we recommend
> extending only on the family of `data-*` to not potentially
> disrupt valid HTML code.

To get an `IAttributeHandler` object, you can extend from `AbstractHandler`.
To determine which component is to be manipulated by this handler, you will
have to decide by either parsing the attribute contents, or determining that
this attribute must live in the same DOM element as the component (as 
enforced by `data-props`).

To find a component based on a name, you can use the `getNearestComponent`
helper as we will see further bellow.

Another handy helper is `parseAttribute` function, which takes an element, 
an attribute name and an optional boolean parameter that will determine 
how to parse this attribute. The function will first try to `JSON.parse` 
the contents, and if it can't, it will return an array of strings, cut by 
either spaces or comas, depending on the second argument given. By default, 
it will cut the string by spaces, for example:

```html
<div id="myElement" data-hearts='{ "json": true }'></div>
```

```javascript
import { parseAttribute } from 'jsfusion';

console.log(parseAttribute(document.getElementById('myElement'), 'data-hearts'));
```

Will return a json object with the property `json` set to `true`.

```html
<div id="myElement" data-hearts="myAttribute anotherAttribute"></div>
```

```javascript
import { parseAttribute } from 'jsfusion';

console.log(parseAttribute(document.getElementById('myElement'), 'data-hearts'));
```

Will return an array consisting of `['myAttribute', 'anotherAttribute']`.
Whereas:

```html
<div id="myElement" data-hearts="myAttribute, anotherAttribute"></div>

```

```javascript
import { parseAttribute } from 'jsfusion';

console.log(parseAttribute(document.getElementById('myElement'), 'data-hearts', true));
```

Will return the same array but here we're delimiting by comas.

> The third parameter is named `propStyle` and it's used by the `data-props`
> parser. This is useful when parsing more complex string attributes where
> spaces might be allowed inside each instance

Let's create a sample of a handler that adds heart emojis to a component
property:

```javascript
import { Runtime, AbstractHandler, getNearestComponent, parseAttribute } from 'jsfusion'; 

JsFusion = new Runtime();

// Extending from AbstractHandler gives us the this.runtime property
// to access our Runtime anytime.
class MyHandler extends AbstractHandler {
    handleAttribute(attribute, element): void {
        // We will only work with strings here for simplicity
        const words = parseAttribute(element.getAttribute(attribute));
        
        words.forEach((word) => {
            // our attribute syntax consists of a compoennt name and a number
            // separated by ":"
            const attributeParts = word.split(':');

            // ... We can do some syntax parsing here to avoid common errors.
            
            // let's see what component we're referring to:
            const component = getNearestComponent(element, attributeParts[0], this.runtime);

            // add some heart emojis
            component.hearts = '&heart;'.repeat(Number(attributeParts[1]));
        });
    }
}

JsFusion.registerAttributeHandler('data-hearts', new MyHandler(JsFusion));

// ... Registe your components here

JsFusion.start();
```

With this handler, you will be adding a property to any component that has
an element containing the `data-hearts` attribute.

Once initialized, you will be able to do something like this:

```html
<div data-component="myComponent">
    <span data-hearts="myComponent:3">I have 3 hearts!</span>
</div>
```

And in your component, access a string of 3 heart emojis by doing this:

```javascript
import { Component } from 'jsfusion';

export default class extends Component {
    printHearts() {
        console.log(this.hearts);
    }
}
```

## Extending `data-bind` strategies

Extending `data-bind` strategies is simpler and more limited. You
just need to provide an object that has a function called `updateBinding`.
This function takes the DOM Element this component binds to and the
value of the prop that has just updated.

For example:

```javascript
import { Runtime } from 'jsfusion';

JsFusion = new Runtime();

class DangerouslySetInnerHTMLHandler {
    updateBinding(element, value) {
        // Dangerously set the element's innerHTML
        element.innerHTML = value;
    }
}

JsFusion.registerDataBindStrategy('dangerously_set_innerHTML', new DangerouslySetInnerHTMLHandler());

// ... Register your components here

JsFusion.start();
```

After creating this, you will be able to bind any prop to `innerHTML` in
a dom element, for example:

```html
<div data-component="myComponent" data-props="count:5">
    <span class="danger" data-bind="dangerously_set_innerHTML:myComponent.count"></span>
</div>
```

In this case, you will be able to allow some nice remote code execution
exploits by setting anything the user puts into the `count` property of your
component inside that `<span>` element.
