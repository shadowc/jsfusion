!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.JsFusion=e():t.JsFusion=e()}(self,(function(){return(()=>{"use strict";var t={d:(e,n)=>{for(var o in n)t.o(n,o)&&!t.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:n[o]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};t.r(e),t.d(e,{Component:()=>S,Runtime:()=>C});var n,o=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e]},r=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e]},i=function(){function t(){this.attributes={}}return t.prototype.registerAttributeHandler=function(t,e){if(this.attributes[t])throw r("Initialization Error: Callback for attribute ".concat(t," already registered. You can only register one callback per attribute type. Try registering another attribute!")),"Attribute callback initialization error.";this.attributes[t]=e},t}(),a=function(){function t(t){this.parent=t}return t.prototype.handleAttribute=function(t,e){},t}(),p=function(t,e){var n=t.getAttribute(e),r=n?n.trim():"";o("Parsing attribute ".concat(e,' for value "').concat(r,'"'));try{return JSON.parse(r)}catch(t){return r.split(" ")}},c=function(t){if(!Array.isArray(t))throw r("Invalid data when trying to parse data-component attribute",t),"Syntax error data-component.";return t.forEach((function(e){if("string"!=typeof e)throw r("Invalid data when trying to parse data-component attribute",t),"Syntax error data-component."})),t},u=(n=function(t,e){return n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},n(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function o(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)}),s=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return u(e,t),e.prototype.handleAttribute=function(t,e){var n=this;c(p(e,t)).forEach((function(t){n.parent.registerComponentElement(t,e)}))},e}(a),l=function(t,e){var n=[];return e.forEach((function(e){e.node===t&&n.push({name:e.name,component:e.component,node:t})})),n},f=function(t){return null!==t&&"object"==typeof t&&"string"==typeof t["#parentProp"]},d=function(t,e){return t.type===String&&"string"==typeof e||t.type===Boolean&&"boolean"==typeof e||t.type===Number&&"number"==typeof e||t.type===Array&&Array.isArray(e)||t.type===Object&&e instanceof Object&&!Array.isArray(e)||f(e)},h=function(){var t=function(e,n){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},t(e,n)};return function(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null");function o(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}(),y=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return h(e,t),e.prototype.handleAttribute=function(t,e){var n,i=p(e,t);if(o("Attempting to add props to a component for ".concat(t,"."),e,i),!e.hasAttribute("data-component"))throw r("Error: Prop attributes must be declared in the same element that defines the component."),"data-props attribute doesn't belong to a component element";if(Array.isArray(i))throw r("Prop attributes has to be of type Object. It was parsed as an Array.",i),"Syntax error data-props.";var a=c(p(e,"data-component"));a.length>1&&Object.keys(i).forEach((function(t){if(-1===a.indexOf(t))throw r("Error: Prop attributes must be declared in the same element that defines the component. Elements with multiple components must have props defined for each of its components."),"data-props attribute doesn't belong to a component element."}));var u=l(e,this.parent.componentRegistry),s=1===u.length?((n={})[u[0].name]=i,n):i;u.forEach((function(t){var e=s[t.name];Object.keys(e).forEach((function(n){var o=t.component.propTypes[n];if(void 0!==o){if(!d(o,e[n]))throw r("Invalid prop type for ".concat(n,"."),o,e[n]),"Invalid prop-type.";t.component.createProp(n,e[n])}})),Object.keys(t.component.propTypes).forEach((function(e){if(t.component.propTypes[e].required&&void 0===t.component.props[e])throw r("The prop ".concat(e," is required but hasn't been defined! Consider adding a default value.")),"Required prop not defined."}))}))},e}(a),m=function(){var t=function(e,n){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},t(e,n)};return function(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null");function o(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}(),b=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return m(e,t),e.prototype.handleAttribute=function(t,e){var n=this;(function(t){if(!Array.isArray(t))throw r("Invalid data when trying to parse data-component attribute",t),"Syntax error data-bind.";var e=[];return t.forEach((function(n){if("string"!=typeof n)throw r("Invalid data when trying to parse data-component attribute",t),"Syntax error data-bind.";var o=n.match(/^(.+):(.+)\.(.+)$/);if(null===o)throw r("Invalid syntax when trying to parse a data-bind strategy",n),"Syntax error data-bind.";e.push({strategyName:o[1],componentName:o[2],propName:o[3]})})),e})(p(e,t)).forEach((function(t){if(o("Attempting to bind for ".concat(t.strategyName,' on "').concat(t.componentName,".").concat(t.propName,'".')),void 0===n.parent.dataBindHandlers.handlers[t.strategyName])throw o('Error trying to bind for strategy "'.concat(t.strategyName,'". No such strategy exists!')),"Invalid data-bind strategy.";var r=n.parent.dataBindHandlers.handlers[t.strategyName],i=function(t,e,n){for(var o=t;null!==o;){if(o.hasAttribute("data-component"))for(var r=l(t,n.componentRegistry),i=0;i<r.length;i++)if(r[i].name===e)return r[i].component;o=o.parentElement}return null}(e,t.componentName,n.parent);if(null===i)throw o('Error trying to find component "'.concat(t.componentName,'" for data binding. Have you mispelled the component name?')),"Invalid component in data-bind. Component not found.";var a=i.props[t.propName];if(void 0===a)throw o('Error trying to bind "'.concat(t.strategyName,'" to "').concat(t.componentName,".").concat(t.propName,"\". The prop doesn't exist.")),"Invalid prop name in data-bind. Found component but no prop found.";i.addPropSideEffect(t.propName,(function(t){r.updateBinding(e,t)})),r.updateBinding(e,a)}))},e}(a),g=function(){var t=function(e,n){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},t(e,n)};return function(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null");function o(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}(),v=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return g(e,t),e.prototype.handleAttribute=function(t,e){var n=p(e,t);o("Attempting to bind an event to an element for ".concat(t),e,n)},e}(a),w=function(){var t=function(e,n){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},t(e,n)};return function(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null");function o(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}(),_=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return w(e,t),e.prototype.handleAttribute=function(t,e){var n=p(e,t);o("Attempting to add a ref to a component for ".concat(t),e,n)},e}(a),O=function(){function t(){this.handlers={}}return t.prototype.registerDataBindStrategy=function(t,e){if(this.handlers[t])throw r("Initialization Error: Handler for data bind strategy ".concat(t," already registered. You can only register one callback per bind strategy.")),"Data bind strategy initialization error.";this.handlers[t]=e},t}(),A=function(){function t(){}return t.prototype.updateBinding=function(t,e){},t}(),P=function(){var t=function(e,n){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},t(e,n)};return function(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null");function o(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}(),E=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return P(e,t),e.prototype.updateBinding=function(t,e){t.innerText=null===e?"":e},e}(A),j=function(t,e){var n=[];return t.forEach((function(t){if(t instanceof Element){var o=l(t,e);o.length>0?o.forEach((function(t){n.push(t.component)})):t.childNodes.length&&j(t.childNodes,e).forEach((function(t){n.push(t)}))}})),n},T=function(t,e){if(!f(e))return null;var n=e["#parentProp"].split(".");return n.length>2||null===t.parent?null:2===n.length?null===t.parents||void 0===t.parents[n[0]]?null:t.parents[n[0]]:null!==t.parents&&Object.keys(t.parents).length>1?null:t.parent},x=function(t){if(!f(t))return null;var e=t["#parentProp"].split(".");return e.length>2?null:e[e.length-1]},N=function(){function t(t){this._valueMap={},this._component=t}return t.prototype.addProp=function(t,e){var n=this;if(f(e)&&null===T(this._component,e))throw r("Invalid prop definition: Cannot find the right component to get value from (".concat(e["#parentProp"],").")),"Invalid prop value for deferred prop.";Object.defineProperty(this,t,{get:function(){var o=n._valueMap[t];if(f(o)){var i=T(n._component,o);if(null===i)throw r('Attempting to get value for deferred prop "'.concat(e["#parentProp"],'" but no such parent exists.')),"Invalid prop value for deferred prop.";return i.props[x(o)]}return n._valueMap[t]},set:function(e){if(null===n._component.propTypes[t])throw r("Attempting to assign property ".concat(t," but it wasn't defined in propTypes. Did you forget to redefine setPropTypes() in your controller and make it return an object?")),"Attempting to set a non defined prop";if(!d(n._component.propTypes[t],e))throw r("Invalid prop type for ".concat(t,"."),n._component.propTypes[t],e),"Invalid prop-type.";if(f(e)){if(null===(o=T(n._component,e)))throw r('Attempting to set a prop to a deferred prop "'.concat(e["#parentProp"],'" but no such parent exists.')),"Invalid prop value for deferred prop.";n._valueMap[t]=e}else if(f(n._valueMap[t])){var o;if(null===(o=T(n._component,n._valueMap[t])))throw r('Attempting to assign a value for deferred prop "'.concat(n._valueMap[t]["#parentProp"],'" but no such parent exists.')),"Invalid prop value for deferred prop.";o.props[x(n._valueMap[t])]=e}else n._valueMap[t]=e}}),this[t]=e},t}(),S=function(){function t(t,e){this.componentRegistry=e,this._element=t,this.props=new N(this),this._propTypes=this.setPropTypes(),this.initializePropTypes()}return Object.defineProperty(t.prototype,"element",{get:function(){return this._element},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"propTypes",{get:function(){return this._propTypes},enumerable:!1,configurable:!0}),t.prototype.setPropTypes=function(){return{}},t.prototype.initializePropTypes=function(){var t=this,e=!1;if(Object.keys(this.propTypes).forEach((function(n){t.propTypes[n].required&&void 0===t.propTypes[n].defaultValue&&(e=!0),void 0!==t.propTypes[n].defaultValue&&t.createProp(n,t.propTypes[n].defaultValue)})),e&&!this.element.hasAttribute("data-props"))throw r("Failed to initialize component. The component has required props but no data-props attribute found."),"Failed to initialize component. The component has required props but no data-props attribute found."},Object.defineProperty(t.prototype,"children",{get:function(){var t=this.element.childNodes;return j(t,this.componentRegistry)},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"parents",{get:function(){for(var t,e=this.element.parentElement,n=function(){if((t=l(e,o.componentRegistry)).length>0){var n={};return t.forEach((function(t){n[t.name]=t.component})),{value:n}}e=e.parentElement},o=this;e&&"html"!==e.nodeName.toLowerCase();){var r=n();if("object"==typeof r)return r.value}return null},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"parent",{get:function(){for(var t,e=this.element.parentElement;e&&"html"!==e.nodeName.toLowerCase();){if((t=l(e,this.componentRegistry)).length>0)return t[0].component;e=e.parentElement}return null},enumerable:!1,configurable:!0}),t.prototype.createProp=function(t,e){void 0===this.props[t]?(o("Creating prop ".concat(t),e),this.props.addProp(t,e)):this.props[t]=e},t.prototype.addPropSideEffect=function(t,e){},t}(),C=function(){function t(){this.version="0.0.3-alpha.1",this.componentRegistry=[],this.components={},this.mutationObserver=new MutationObserver(this.mutationObserverHandler.bind(this)),this.observableAttributes=new i,this.dataBindHandlers=new O,this.observableAttributes.registerAttributeHandler("data-component",new s(this)),this.observableAttributes.registerAttributeHandler("data-props",new y(this)),this.observableAttributes.registerAttributeHandler("data-bind",new b(this)),this.observableAttributes.registerAttributeHandler("data-on",new v(this)),this.observableAttributes.registerAttributeHandler("data-ref",new _(this)),this.dataBindHandlers.registerDataBindStrategy("text",new E)}return t.prototype.mutationObserverHandler=function(t){t.forEach((function(t){o(t)}))},t.prototype.start=function(){var t=this,e=Object.keys(this.observableAttributes.attributes);e.forEach((function(e){document.body.querySelectorAll("*["+e+"]").forEach((function(n){t.observableAttributes.attributes[e].handleAttribute(e,n)}))})),this.mutationObserver.observe(document.body,{attributes:!0,attributeFilter:e,attributeOldValue:!0,childList:!0,subtree:!0})},t.prototype.registerComponent=function(t,e){o('Registering component "'.concat(t,'" for general use.')),void 0===this.components[t]&&(this.components[t]=e)},t.prototype.registerComponentElement=function(t,e){if(o('Registering component "'.concat(t,'" on'),e),void 0===this.components[t])throw r('The component "'.concat(t,"\" is not registered in JsFusion. Did you forget to run Runtime.registerComponent('").concat(t,"', MyComponentClass)?")),"Error while instantiating component";var n=this.components[t];this.componentRegistry.forEach((function(n){if(n.node===e&&n.name===t)throw r('The component "'.concat(t,'" has been already instantiated for ').concat(e,"!")),"Error while instantiating component"})),this.componentRegistry.push({name:t,component:new n(e,this.componentRegistry),node:e})},t}();return e})()}));