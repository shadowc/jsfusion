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

/***/ "./assets/observables.ts":
/*!*******************************!*\
  !*** ./assets/observables.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ObservableAttributes\": () => (/* binding */ ObservableAttributes)\n/* harmony export */ });\n/**\n * Class that administers the observable attributes by the framework\n */\nvar ObservableAttributes = /** @class */ (function () {\n    function ObservableAttributes() {\n        /**\n         * Attribute list that can be observed by the framework offering different\n         * functionality for parsing and processing\n         */\n        this.observableAttributesList = [\n            'data-component',\n            'data-on',\n            'data-bind',\n            'data-props',\n        ];\n        this.observableAttributes = {};\n    }\n    ObservableAttributes.prototype.registerAttributeHandler = function (attributeName, handler) {\n        // Attach the different observable attributes to the attribute handlers\n        this.observableAttributes[attributeName] = handler;\n    };\n    return ObservableAttributes;\n}());\n\n\n\n//# sourceURL=webpack://jsfusion/./assets/observables.ts?");

/***/ }),

/***/ "./assets/runtime.ts":
/*!***************************!*\
  !*** ./assets/runtime.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Runtime\": () => (/* binding */ Runtime)\n/* harmony export */ });\n/* harmony import */ var _observables__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./observables */ \"./assets/observables.ts\");\n/**\n * Main JsFusion framework runtime file. This is to be executed in every page load\n * and will start observing changes to the DOM in order to instantiate components.\n */\n\nvar Runtime = /** @class */ (function () {\n    function Runtime() {\n        this.componentRegistry = [];\n        this.observer = new MutationObserver(this.mutationObserverHandler.bind(this));\n        this.observableAttributes = new _observables__WEBPACK_IMPORTED_MODULE_0__.ObservableAttributes();\n        // Register the conventional attribute handlers\n        this.observableAttributes.registerAttributeHandler('data-component', this.instantiateController.bind(this));\n    }\n    Runtime.prototype.mutationObserverHandler = function (mutationList) {\n        mutationList.forEach(function (mutation) {\n            console.log(mutation);\n        });\n    };\n    Runtime.prototype.start = function () {\n        var _this = this;\n        // Find all registered attributes and process their handlers already present in the page\n        Object.keys(this.observableAttributes.observableAttributes).forEach(function (attributeName) {\n            console.log(attributeName);\n            var components = document.body.querySelectorAll('*[' + attributeName + ']');\n            console.log(components);\n            components.forEach(function (componentElement) {\n                _this.observableAttributes.observableAttributes[attributeName](attributeName, componentElement);\n            });\n        });\n        // Now start observing for DOM changes\n        this.observer.observe(document.body, {\n            attributes: true,\n            attributeFilter: this.observableAttributes.observableAttributesList,\n            attributeOldValue: true,\n            childList: true,\n            subtree: true,\n        });\n    };\n    // Observable Handlers\n    Runtime.prototype.instantiateController = function (attribute, element) {\n        console.log('Attempting instantiate a component for ' + attribute, element);\n    };\n    return Runtime;\n}());\n\n\n\n//# sourceURL=webpack://jsfusion/./assets/runtime.ts?");

/***/ }),

/***/ "./assets/test-components/app.ts":
/*!***************************************!*\
  !*** ./assets/test-components/app.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../runtime */ \"./assets/runtime.ts\");\n\nvar JsFusion = new _runtime__WEBPACK_IMPORTED_MODULE_0__.Runtime();\nJsFusion.start();\n\n\n//# sourceURL=webpack://jsfusion/./assets/test-components/app.ts?");

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