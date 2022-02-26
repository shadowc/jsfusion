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

/***/ "./src/component.ts":
/*!**************************!*\
  !*** ./src/component.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Component\": () => (/* binding */ Component)\n/* harmony export */ });\n/* harmony import */ var _helpers_get_component_from_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers/get-component-from-element */ \"./src/helpers/get-component-from-element.ts\");\n/* harmony import */ var _helpers_get_children_components_from_tree__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers/get-children-components-from-tree */ \"./src/helpers/get-children-components-from-tree.ts\");\n\n\nvar Component = /** @class */ (function () {\n    function Component(element, componentRegistry) {\n        this.componentRegistry = componentRegistry;\n        this.element = element;\n        this.props = {};\n        this.propTypes = {};\n        this.setPropTypes();\n        this.initializePropTypes();\n    }\n    Component.prototype.setPropTypes = function () { };\n    /**\n     * Initializes PropTypes for the Component when Props have\n     * default values.\n     *\n     * @private\n     */\n    Component.prototype.initializePropTypes = function () {\n        var _this = this;\n        Object.keys(this.propTypes).forEach(function (propName) {\n            if (_this.propTypes[propName].required) {\n                _this.props[propName] = _this.propTypes[propName].defaultValue;\n            }\n        });\n    };\n    Object.defineProperty(Component.prototype, \"children\", {\n        get: function () {\n            var currentChildren = this.element.childNodes;\n            return (0,_helpers_get_children_components_from_tree__WEBPACK_IMPORTED_MODULE_1__.getChildrenComponentsFromTree)(currentChildren, this.componentRegistry);\n        },\n        enumerable: false,\n        configurable: true\n    });\n    ;\n    Object.defineProperty(Component.prototype, \"parents\", {\n        get: function () {\n            var currentParent = this.element.parentElement;\n            var localRegistry;\n            var _loop_1 = function () {\n                localRegistry = (0,_helpers_get_component_from_element__WEBPACK_IMPORTED_MODULE_0__.getComponentsFromElement)(currentParent, this_1.componentRegistry);\n                if (localRegistry.length > 0) {\n                    var components_1 = {};\n                    localRegistry.forEach(function (compRecord) {\n                        components_1[compRecord.name] = compRecord.component;\n                    });\n                    return { value: components_1 };\n                }\n                currentParent = currentParent.parentElement;\n            };\n            var this_1 = this;\n            while (currentParent.nodeName.toLowerCase() !== 'html') {\n                var state_1 = _loop_1();\n                if (typeof state_1 === \"object\")\n                    return state_1.value;\n            }\n            return null;\n        },\n        enumerable: false,\n        configurable: true\n    });\n    ;\n    Object.defineProperty(Component.prototype, \"parent\", {\n        get: function () {\n            var currentParent = this.element.parentElement;\n            var localRegistry;\n            while (currentParent.nodeName.toLowerCase() !== 'html') {\n                localRegistry = (0,_helpers_get_component_from_element__WEBPACK_IMPORTED_MODULE_0__.getComponentsFromElement)(currentParent, this.componentRegistry);\n                if (localRegistry.length > 0) {\n                    return localRegistry[0].component;\n                }\n                currentParent = currentParent.parentElement;\n            }\n            return null;\n        },\n        enumerable: false,\n        configurable: true\n    });\n    return Component;\n}());\n\n\n\n//# sourceURL=webpack://jsfusion/./src/component.ts?");

/***/ }),

/***/ "./src/handlers/abstract-handler.ts":
/*!******************************************!*\
  !*** ./src/handlers/abstract-handler.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"AbstractHandler\": () => (/* binding */ AbstractHandler)\n/* harmony export */ });\nvar AbstractHandler = /** @class */ (function () {\n    function AbstractHandler(parent) {\n        this.parent = parent;\n    }\n    AbstractHandler.prototype.handleAttribute = function (attribute, element) {\n        // Abstract method!\n    };\n    return AbstractHandler;\n}());\n\n\n\n//# sourceURL=webpack://jsfusion/./src/handlers/abstract-handler.ts?");

/***/ }),

/***/ "./src/handlers/bind-handler.ts":
/*!**************************************!*\
  !*** ./src/handlers/bind-handler.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"BindHandler\": () => (/* binding */ BindHandler)\n/* harmony export */ });\n/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../logger */ \"./src/logger.ts\");\n/* harmony import */ var _abstract_handler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./abstract-handler */ \"./src/handlers/abstract-handler.ts\");\nvar __extends = (undefined && undefined.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        if (typeof b !== \"function\" && b !== null)\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\n\n\nvar BindHandler = /** @class */ (function (_super) {\n    __extends(BindHandler, _super);\n    function BindHandler() {\n        return _super !== null && _super.apply(this, arguments) || this;\n    }\n    BindHandler.prototype.handleAttribute = function (attribute, element) {\n        var attrValue = element.getAttribute(attribute);\n        _logger__WEBPACK_IMPORTED_MODULE_0__.Logger.log(\"Attempting to bind a value to an element for \".concat(attribute, \": \").concat(attrValue), element);\n    };\n    return BindHandler;\n}(_abstract_handler__WEBPACK_IMPORTED_MODULE_1__.AbstractHandler));\n\n\n\n//# sourceURL=webpack://jsfusion/./src/handlers/bind-handler.ts?");

/***/ }),

/***/ "./src/handlers/component-handler.ts":
/*!*******************************************!*\
  !*** ./src/handlers/component-handler.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ComponentHandler\": () => (/* binding */ ComponentHandler)\n/* harmony export */ });\n/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../logger */ \"./src/logger.ts\");\n/* harmony import */ var _abstract_handler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./abstract-handler */ \"./src/handlers/abstract-handler.ts\");\nvar __extends = (undefined && undefined.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        if (typeof b !== \"function\" && b !== null)\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\n\n\nvar ComponentHandler = /** @class */ (function (_super) {\n    __extends(ComponentHandler, _super);\n    function ComponentHandler() {\n        return _super !== null && _super.apply(this, arguments) || this;\n    }\n    ComponentHandler.prototype.handleAttribute = function (attribute, element) {\n        var _this = this;\n        var attrValue = element.getAttribute(attribute);\n        _logger__WEBPACK_IMPORTED_MODULE_0__.Logger.log(\"Parsing attribute data-component for value \\\"\".concat(attrValue, \"\\\"\"));\n        var componentNames = this.parseDataComponentAttribute(attrValue);\n        _logger__WEBPACK_IMPORTED_MODULE_0__.Logger.log('Components:', componentNames);\n        componentNames.forEach(function (component) {\n            _this.parent.registerComponentElement(component, element);\n        });\n    };\n    ComponentHandler.prototype.parseDataComponentAttribute = function (text) {\n        var componentList = [];\n        if (text.indexOf('[') !== -1) { // assume json array\n            var parsedText = JSON.parse(text);\n            if (!(typeof parsedText.length !== 'undefined' && parsedText instanceof Object)) {\n                throw \"Invalid format when parsing data-component attribute value \".concat(text);\n            }\n            parsedText.forEach(function (key) {\n                componentList.push(key);\n            });\n        }\n        else {\n            componentList = text.split(' ');\n        }\n        return componentList;\n    };\n    return ComponentHandler;\n}(_abstract_handler__WEBPACK_IMPORTED_MODULE_1__.AbstractHandler));\n\n\n\n//# sourceURL=webpack://jsfusion/./src/handlers/component-handler.ts?");

/***/ }),

/***/ "./src/handlers/event-handler.ts":
/*!***************************************!*\
  !*** ./src/handlers/event-handler.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"EventHandler\": () => (/* binding */ EventHandler)\n/* harmony export */ });\n/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../logger */ \"./src/logger.ts\");\n/* harmony import */ var _abstract_handler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./abstract-handler */ \"./src/handlers/abstract-handler.ts\");\nvar __extends = (undefined && undefined.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        if (typeof b !== \"function\" && b !== null)\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\n\n\nvar EventHandler = /** @class */ (function (_super) {\n    __extends(EventHandler, _super);\n    function EventHandler() {\n        return _super !== null && _super.apply(this, arguments) || this;\n    }\n    EventHandler.prototype.handleAttribute = function (attribute, element) {\n        var attrValue = element.getAttribute(attribute);\n        _logger__WEBPACK_IMPORTED_MODULE_0__.Logger.log(\"Attempting to bind an event to an element for \".concat(attribute, \": \").concat(attrValue), element);\n    };\n    return EventHandler;\n}(_abstract_handler__WEBPACK_IMPORTED_MODULE_1__.AbstractHandler));\n\n\n\n//# sourceURL=webpack://jsfusion/./src/handlers/event-handler.ts?");

/***/ }),

/***/ "./src/handlers/props-handler.ts":
/*!***************************************!*\
  !*** ./src/handlers/props-handler.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"PropsHandler\": () => (/* binding */ PropsHandler)\n/* harmony export */ });\n/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../logger */ \"./src/logger.ts\");\n/* harmony import */ var _abstract_handler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./abstract-handler */ \"./src/handlers/abstract-handler.ts\");\nvar __extends = (undefined && undefined.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        if (typeof b !== \"function\" && b !== null)\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\n\n\nvar PropsHandler = /** @class */ (function (_super) {\n    __extends(PropsHandler, _super);\n    function PropsHandler() {\n        return _super !== null && _super.apply(this, arguments) || this;\n    }\n    PropsHandler.prototype.handleAttribute = function (attribute, element) {\n        var attrValue = element.getAttribute(attribute);\n        _logger__WEBPACK_IMPORTED_MODULE_0__.Logger.log(\"Attempting to add props to a component for \".concat(attribute, \": \").concat(attrValue), element);\n    };\n    return PropsHandler;\n}(_abstract_handler__WEBPACK_IMPORTED_MODULE_1__.AbstractHandler));\n\n\n\n//# sourceURL=webpack://jsfusion/./src/handlers/props-handler.ts?");

/***/ }),

/***/ "./src/handlers/ref-handler.ts":
/*!*************************************!*\
  !*** ./src/handlers/ref-handler.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"RefHandler\": () => (/* binding */ RefHandler)\n/* harmony export */ });\n/* harmony import */ var _abstract_handler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-handler */ \"./src/handlers/abstract-handler.ts\");\n/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../logger */ \"./src/logger.ts\");\nvar __extends = (undefined && undefined.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        if (typeof b !== \"function\" && b !== null)\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\n\n\nvar RefHandler = /** @class */ (function (_super) {\n    __extends(RefHandler, _super);\n    function RefHandler() {\n        return _super !== null && _super.apply(this, arguments) || this;\n    }\n    RefHandler.prototype.handleAttribute = function (attribute, element) {\n        var attrValue = element.getAttribute(attribute);\n        _logger__WEBPACK_IMPORTED_MODULE_1__.Logger.log(\"Attempting to add a ref to a component for \".concat(attribute, \": \").concat(attrValue), element);\n    };\n    return RefHandler;\n}(_abstract_handler__WEBPACK_IMPORTED_MODULE_0__.AbstractHandler));\n\n\n\n//# sourceURL=webpack://jsfusion/./src/handlers/ref-handler.ts?");

/***/ }),

/***/ "./src/helpers/get-children-components-from-tree.ts":
/*!**********************************************************!*\
  !*** ./src/helpers/get-children-components-from-tree.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getChildrenComponentsFromTree\": () => (/* binding */ getChildrenComponentsFromTree)\n/* harmony export */ });\n/* harmony import */ var _get_component_from_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./get-component-from-element */ \"./src/helpers/get-component-from-element.ts\");\n\nvar getChildrenComponentsFromTree = function (nodes, componentRegistry) {\n    var components = [];\n    nodes.forEach(function (node) {\n        if (node instanceof Element) {\n            var localRegistry = (0,_get_component_from_element__WEBPACK_IMPORTED_MODULE_0__.getComponentsFromElement)(node, componentRegistry);\n            if (localRegistry.length > 0) {\n                localRegistry.forEach(function (compRecord) {\n                    components.push(compRecord.component);\n                });\n            }\n            else if (node.childNodes.length) {\n                var subComponents = getChildrenComponentsFromTree(node.childNodes, componentRegistry);\n                subComponents.forEach(function (subComponent) {\n                    components.push(subComponent);\n                });\n            }\n        }\n    });\n    return components;\n};\n\n\n//# sourceURL=webpack://jsfusion/./src/helpers/get-children-components-from-tree.ts?");

/***/ }),

/***/ "./src/helpers/get-component-from-element.ts":
/*!***************************************************!*\
  !*** ./src/helpers/get-component-from-element.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getComponentsFromElement\": () => (/* binding */ getComponentsFromElement)\n/* harmony export */ });\nvar getComponentsFromElement = function (element, componentRegistry) {\n    var localRegistry = [];\n    componentRegistry.forEach(function (compRecord) {\n        if (compRecord.node === element) {\n            localRegistry.push({\n                name: compRecord.name,\n                component: compRecord.component,\n                node: element,\n            });\n        }\n    });\n    return localRegistry;\n};\n\n\n//# sourceURL=webpack://jsfusion/./src/helpers/get-component-from-element.ts?");

/***/ }),

/***/ "./src/logger.ts":
/*!***********************!*\
  !*** ./src/logger.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Logger\": () => (/* binding */ Logger)\n/* harmony export */ });\n/* harmony import */ var _null_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./null-logger */ \"./src/null-logger.ts\");\n\nif (true) {\n    console.warn(\"You are running JsFusion in \".concat(\"development\", \" mode.\"));\n}\nvar Logger = ( true) ? console : 0;\n\n\n//# sourceURL=webpack://jsfusion/./src/logger.ts?");

/***/ }),

/***/ "./src/null-logger.ts":
/*!****************************!*\
  !*** ./src/null-logger.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"NullLogger\": () => (/* binding */ NullLogger)\n/* harmony export */ });\n/**\n * Strip down version of console for null logging\n */\nvar NullLogger = {\n    info: function () {\n        var message = [];\n        for (var _i = 0; _i < arguments.length; _i++) {\n            message[_i] = arguments[_i];\n        }\n    },\n    log: function () {\n        var data = [];\n        for (var _i = 0; _i < arguments.length; _i++) {\n            data[_i] = arguments[_i];\n        }\n    },\n    error: function () {\n        var data = [];\n        for (var _i = 0; _i < arguments.length; _i++) {\n            data[_i] = arguments[_i];\n        }\n    },\n    warn: function () {\n        var data = [];\n        for (var _i = 0; _i < arguments.length; _i++) {\n            data[_i] = arguments[_i];\n        }\n    }\n};\n\n\n//# sourceURL=webpack://jsfusion/./src/null-logger.ts?");

/***/ }),

/***/ "./src/observableAttributes.ts":
/*!*************************************!*\
  !*** ./src/observableAttributes.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ObservableAttributes\": () => (/* binding */ ObservableAttributes)\n/* harmony export */ });\n/**\n * Class that administers the observable attributes by the framework\n */\nvar ObservableAttributes = /** @class */ (function () {\n    function ObservableAttributes() {\n        this.attributes = {};\n    }\n    ObservableAttributes.prototype.registerAttributeHandler = function (attributeName, handler) {\n        if (this.attributes[attributeName]) {\n            throw \"Initialization Error: Callback for attribute \".concat(attributeName, \" already registered.\");\n        }\n        // Attach the different observable attributes to the attribute handlers\n        this.attributes[attributeName] = handler;\n    };\n    return ObservableAttributes;\n}());\n\n\n\n//# sourceURL=webpack://jsfusion/./src/observableAttributes.ts?");

/***/ }),

/***/ "./src/runtime.ts":
/*!************************!*\
  !*** ./src/runtime.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Component\": () => (/* reexport safe */ _component__WEBPACK_IMPORTED_MODULE_7__.Component),\n/* harmony export */   \"Runtime\": () => (/* binding */ Runtime)\n/* harmony export */ });\n/* harmony import */ var _observableAttributes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./observableAttributes */ \"./src/observableAttributes.ts\");\n/* harmony import */ var _handlers_component_handler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./handlers/component-handler */ \"./src/handlers/component-handler.ts\");\n/* harmony import */ var _handlers_props_handler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./handlers/props-handler */ \"./src/handlers/props-handler.ts\");\n/* harmony import */ var _handlers_bind_handler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./handlers/bind-handler */ \"./src/handlers/bind-handler.ts\");\n/* harmony import */ var _handlers_event_handler__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./handlers/event-handler */ \"./src/handlers/event-handler.ts\");\n/* harmony import */ var _handlers_ref_handler__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./handlers/ref-handler */ \"./src/handlers/ref-handler.ts\");\n/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./logger */ \"./src/logger.ts\");\n/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./component */ \"./src/component.ts\");\n/**\n * Main JsFusion framework runtime file. This is to be executed in every page load\n * and will start observing changes to the DOM in order to instantiate components.\n */\n\n\n\n\n\n\n\n\nvar Runtime = /** @class */ (function () {\n    function Runtime() {\n        this.version = '0.1-alpha1';\n        this.componentRegistry = [];\n        this.components = {};\n        this.mutationObserver = new MutationObserver(this.mutationObserverHandler.bind(this));\n        this.observableAttributes = new _observableAttributes__WEBPACK_IMPORTED_MODULE_0__.ObservableAttributes();\n        // Register the conventional attribute handlers\n        this.observableAttributes.registerAttributeHandler('data-component', new _handlers_component_handler__WEBPACK_IMPORTED_MODULE_1__.ComponentHandler(this));\n        this.observableAttributes.registerAttributeHandler('data-props', new _handlers_props_handler__WEBPACK_IMPORTED_MODULE_2__.PropsHandler(this));\n        this.observableAttributes.registerAttributeHandler('data-bind', new _handlers_bind_handler__WEBPACK_IMPORTED_MODULE_3__.BindHandler(this));\n        this.observableAttributes.registerAttributeHandler('data-on', new _handlers_event_handler__WEBPACK_IMPORTED_MODULE_4__.EventHandler(this));\n        this.observableAttributes.registerAttributeHandler('data-ref', new _handlers_ref_handler__WEBPACK_IMPORTED_MODULE_5__.RefHandler(this));\n    }\n    Runtime.prototype.mutationObserverHandler = function (mutationList) {\n        mutationList.forEach(function (mutation) {\n            // TODO: Device a way to DIFF attribute add/delete/modify and use\n            //  handlers accordingly on mutations\n            _logger__WEBPACK_IMPORTED_MODULE_6__.Logger.log(mutation);\n        });\n    };\n    Runtime.prototype.start = function () {\n        var _this = this;\n        // As a start, scan all attribute handlers for attributes in the entire DOM\n        // and assume all attributes have been recently added\n        var attributeList = Object.keys(this.observableAttributes.attributes);\n        // Find all registered attributes and process their handlers already present in the page\n        attributeList.forEach(function (attributeName) {\n            var components = document.body.querySelectorAll('*[' + attributeName + ']');\n            components.forEach(function (componentElement) {\n                _this.observableAttributes.attributes[attributeName].handleAttribute(attributeName, componentElement);\n            });\n        });\n        // TODO: This is the place for adding plugins that register new handlers\n        // Now start observing for DOM changes\n        this.mutationObserver.observe(document.body, {\n            attributes: true,\n            attributeFilter: attributeList,\n            attributeOldValue: true,\n            childList: true,\n            subtree: true,\n        });\n    };\n    Runtime.prototype.registerComponent = function (componentName, component) {\n        _logger__WEBPACK_IMPORTED_MODULE_6__.Logger.log(\"Registering component \\\"\".concat(componentName, \"\\\" for general use.\"));\n        if (typeof this.components[componentName] === 'undefined') {\n            this.components[componentName] = component;\n        }\n    };\n    Runtime.prototype.registerComponentElement = function (componentName, element) {\n        _logger__WEBPACK_IMPORTED_MODULE_6__.Logger.log(\"Registering component \\\"\".concat(componentName, \"\\\" on\"), element);\n        if (typeof this.components[componentName] === 'undefined') {\n            throw \"The component \\\"\".concat(componentName, \"\\\" is not registered in JsFusion. Did you forget to run Runtime.registerComponent('\").concat(componentName, \"', MyComponentClass)?\");\n        }\n        var componentClass = this.components[componentName];\n        this.componentRegistry.forEach(function (register) {\n            if (register.node === element && register.name === componentName) {\n                throw \"The component \\\"\".concat(componentName, \"\\\" has been already instantiated for \").concat(element, \"!\");\n            }\n        });\n        this.componentRegistry.push({\n            name: componentName,\n            component: new componentClass(element, this.componentRegistry),\n            node: element,\n        });\n    };\n    return Runtime;\n}());\n\n\n\n//# sourceURL=webpack://jsfusion/./src/runtime.ts?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/runtime.ts");
/******/ 	
/******/ })()
;