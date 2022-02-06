/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./assets/component.ts":
/*!*****************************!*\
  !*** ./assets/component.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Component\": () => (/* binding */ Component)\n/* harmony export */ });\nvar Component = /** @class */ (function () {\n    function Component(element) {\n        this.element = element;\n    }\n    return Component;\n}());\n\n\n\n//# sourceURL=webpack://jsfusion/./assets/component.ts?");

/***/ }),

/***/ "./assets/data-component-helper.ts":
/*!*****************************************!*\
  !*** ./assets/data-component-helper.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"DataComponentHelper\": () => (/* binding */ DataComponentHelper)\n/* harmony export */ });\nvar DataComponentHelper = {\n    parseDataComponentAttribute: function (text) {\n        var componentList = [];\n        if (text.indexOf('[') !== -1) { // assume json array\n            var parsedText = JSON.parse(text);\n            if (!(typeof parsedText.length !== 'undefined' && parsedText instanceof Object)) {\n                throw \"Invalid format when parsing data-component attribute value \".concat(text);\n            }\n            parsedText.forEach(function (key) {\n                componentList.push(key);\n            });\n        }\n        else {\n            componentList = text.split(' ');\n        }\n        return componentList;\n    }\n};\n\n\n//# sourceURL=webpack://jsfusion/./assets/data-component-helper.ts?");

/***/ }),

/***/ "./assets/observables.ts":
/*!*******************************!*\
  !*** ./assets/observables.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ObservableAttributes\": () => (/* binding */ ObservableAttributes)\n/* harmony export */ });\n/**\n * Class that administers the observable attributes by the framework\n */\nvar ObservableAttributes = /** @class */ (function () {\n    function ObservableAttributes() {\n        /**\n         * Attribute list that can be observed by the framework offering different\n         * functionality for parsing and processing\n         */\n        this.observableAttributesList = [\n            'data-component',\n            'data-on',\n            'data-bind',\n            'data-props',\n        ];\n        this.attributes = {};\n    }\n    ObservableAttributes.prototype.registerAttributeHandler = function (attributeName, handler) {\n        if (this.observableAttributesList.indexOf(attributeName) === -1) {\n            throw \"Initialization Error: Tried to register a callback for an undefined attribute: \".concat(attributeName);\n        }\n        if (this.attributes[attributeName]) {\n            throw \"Initialization Error: Callback for attribute \".concat(attributeName, \" already registered.\");\n        }\n        // Attach the different observable attributes to the attribute handlers\n        this.attributes[attributeName] = handler;\n    };\n    return ObservableAttributes;\n}());\n\n\n\n//# sourceURL=webpack://jsfusion/./assets/observables.ts?");

/***/ }),

/***/ "./assets/runtime.ts":
/*!***************************!*\
  !*** ./assets/runtime.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Runtime\": () => (/* binding */ Runtime)\n/* harmony export */ });\n/* harmony import */ var _observables__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./observables */ \"./assets/observables.ts\");\n/* harmony import */ var _data_component_helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./data-component-helper */ \"./assets/data-component-helper.ts\");\n/**\n * Main JsFusion framework runtime file. This is to be executed in every page load\n * and will start observing changes to the DOM in order to instantiate components.\n */\n\n\nvar Runtime = /** @class */ (function () {\n    function Runtime() {\n        this.version = '0.1-alpha1';\n        this.componentRegistry = [];\n        this.components = {};\n        this.observer = new MutationObserver(this.mutationObserverHandler.bind(this));\n        this.observableAttributes = new _observables__WEBPACK_IMPORTED_MODULE_0__.ObservableAttributes();\n        // Register the conventional attribute handlers\n        this.observableAttributes.registerAttributeHandler('data-component', this.instantiateComponent.bind(this));\n        this.observableAttributes.registerAttributeHandler('data-props', this.addPropsToComponent.bind(this));\n        this.observableAttributes.registerAttributeHandler('data-bind', this.bindPropToElement.bind(this));\n        this.observableAttributes.registerAttributeHandler('data-on', this.bindEventToElement.bind(this));\n    }\n    Runtime.prototype.mutationObserverHandler = function (mutationList) {\n        mutationList.forEach(function (mutation) {\n            console.log(mutation);\n        });\n    };\n    Runtime.prototype.start = function () {\n        var _this = this;\n        // Find all registered attributes and process their handlers already present in the page\n        Object.keys(this.observableAttributes.attributes).forEach(function (attributeName) {\n            var components = document.body.querySelectorAll('*[' + attributeName + ']');\n            components.forEach(function (componentElement) {\n                _this.observableAttributes.attributes[attributeName](attributeName, componentElement);\n            });\n        });\n        // Now start observing for DOM changes\n        this.observer.observe(document.body, {\n            attributes: true,\n            attributeFilter: this.observableAttributes.observableAttributesList,\n            attributeOldValue: true,\n            childList: true,\n            subtree: true,\n        });\n    };\n    Runtime.prototype.registerComponent = function (componentName, component) {\n        console.log(\"Registering app component \\\"\".concat(componentName, \"\\\".\"));\n        if (typeof this.components[componentName] === 'undefined') {\n            this.components[componentName] = component;\n        }\n    };\n    Runtime.prototype.registerComponentElement = function (componentName, element) {\n        console.log(\"Registering component \".concat(componentName, \" on\"), element);\n        if (typeof this.components[componentName] === 'undefined') {\n            throw \"The component \".concat(componentName, \" is not registered in JsFusion. Did you forget to run Runtime.registerComponent('\").concat(componentName, \"', MyComponentClass)?\");\n        }\n        var componentClass = this.components[componentName];\n        this.componentRegistry.forEach(function (register) {\n            if (register.node === element && register.component instanceof componentClass) {\n                throw \"The component \".concat(componentName, \" has been already instantiated for \").concat(element, \"!\");\n            }\n        });\n        this.componentRegistry.push({\n            component: new componentClass(element),\n            node: element,\n        });\n    };\n    // Observable Handlers\n    Runtime.prototype.instantiateComponent = function (attribute, element) {\n        var _this = this;\n        var attrValue = element.getAttribute(attribute);\n        var componentNames = _data_component_helper__WEBPACK_IMPORTED_MODULE_1__.DataComponentHelper.parseDataComponentAttribute(attrValue);\n        componentNames.forEach(function (component) {\n            _this.registerComponentElement(component, element);\n        });\n    };\n    Runtime.prototype.addPropsToComponent = function (attribute, element) {\n        var attrValue = element.getAttribute(attribute);\n        console.log(\"Attempting to add props to a component for \".concat(attribute, \": \").concat(attrValue), element);\n    };\n    Runtime.prototype.bindPropToElement = function (attribute, element) {\n        var attrValue = element.getAttribute(attribute);\n        console.log(\"Attempting to bind a value to an element for \".concat(attribute, \": \").concat(attrValue), element);\n    };\n    Runtime.prototype.bindEventToElement = function (attribute, element) {\n        var attrValue = element.getAttribute(attribute);\n        console.log(\"Attempting to bind an event to an element for \".concat(attribute, \": \").concat(attrValue), element);\n    };\n    return Runtime;\n}());\n\n\n\n//# sourceURL=webpack://jsfusion/./assets/runtime.ts?");

/***/ }),

/***/ "./assets/test-components/app.ts":
/*!***************************************!*\
  !*** ./assets/test-components/app.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../runtime */ \"./assets/runtime.ts\");\n/* harmony import */ var _counter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./counter */ \"./assets/test-components/counter.ts\");\n\n\nvar JsFusion = new _runtime__WEBPACK_IMPORTED_MODULE_0__.Runtime();\nJsFusion.registerComponent('counter', _counter__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\nJsFusion.start();\n\n\n//# sourceURL=webpack://jsfusion/./assets/test-components/app.ts?");

/***/ }),

/***/ "./assets/test-components/counter.ts":
/*!*******************************************!*\
  !*** ./assets/test-components/counter.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../component */ \"./assets/component.ts\");\nvar __extends = (undefined && undefined.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        if (typeof b !== \"function\" && b !== null)\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\n\nvar Counter = /** @class */ (function (_super) {\n    __extends(Counter, _super);\n    function Counter() {\n        return _super !== null && _super.apply(this, arguments) || this;\n    }\n    return Counter;\n}(_component__WEBPACK_IMPORTED_MODULE_0__.Component));\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Counter);\n;\n\n\n//# sourceURL=webpack://jsfusion/./assets/test-components/counter.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./assets/test-components/app.ts");
/******/ 	
/******/ })()
;