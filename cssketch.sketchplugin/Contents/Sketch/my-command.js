var globalThis = this;
function __skpm_run (key, context) {
  globalThis.context = context;

var exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/my-command.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/my-command.js":
/*!***************************!*\
  !*** ./src/my-command.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, exports) {

throw new Error("Module build failed (from ./node_modules/babel-loader/lib/index.js):\nSyntaxError: /Users/blquigley/Documents/plugin/csSketch/src/my-command.js: Identifier 'kerning' has already been declared (132:6)\n\n\u001b[0m \u001b[90m 130 | \u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 131 | \u001b[39m\u001b[36mfunction\u001b[39m convertKerning(kerning)  {\u001b[0m\n\u001b[0m\u001b[31m\u001b[1m>\u001b[22m\u001b[39m\u001b[90m 132 | \u001b[39m  let kerning \u001b[33m=\u001b[39m parseFloat(kerning)\u001b[33m;\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m     | \u001b[39m      \u001b[31m\u001b[1m^\u001b[22m\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 133 | \u001b[39m  \u001b[36mreturn\u001b[39m isNaN(kerning) \u001b[33m?\u001b[39m \u001b[35m0\u001b[39m \u001b[33m:\u001b[39m kerning\u001b[33m;\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 134 | \u001b[39m}\u001b[0m\n\u001b[0m \u001b[90m 135 | \u001b[39m\u001b[0m\n    at Object.raise (/Users/blquigley/Documents/plugin/csSketch/node_modules/@babel/parser/lib/index.js:6344:17)\n    at ScopeHandler.checkRedeclarationInScope (/Users/blquigley/Documents/plugin/csSketch/node_modules/@babel/parser/lib/index.js:3757:12)\n    at ScopeHandler.declareName (/Users/blquigley/Documents/plugin/csSketch/node_modules/@babel/parser/lib/index.js:3723:12)\n    at Object.checkLVal (/Users/blquigley/Documents/plugin/csSketch/node_modules/@babel/parser/lib/index.js:8034:22)\n    at Object.parseVarId (/Users/blquigley/Documents/plugin/csSketch/node_modules/@babel/parser/lib/index.js:10465:10)\n    at Object.parseVar (/Users/blquigley/Documents/plugin/csSketch/node_modules/@babel/parser/lib/index.js:10436:12)\n    at Object.parseVarStatement (/Users/blquigley/Documents/plugin/csSketch/node_modules/@babel/parser/lib/index.js:10258:10)\n    at Object.parseStatementContent (/Users/blquigley/Documents/plugin/csSketch/node_modules/@babel/parser/lib/index.js:9855:21)\n    at Object.parseStatement (/Users/blquigley/Documents/plugin/csSketch/node_modules/@babel/parser/lib/index.js:9788:17)\n    at Object.parseBlockOrModuleBlockBody (/Users/blquigley/Documents/plugin/csSketch/node_modules/@babel/parser/lib/index.js:10364:25)\n    at Object.parseBlockBody (/Users/blquigley/Documents/plugin/csSketch/node_modules/@babel/parser/lib/index.js:10351:10)\n    at Object.parseBlock (/Users/blquigley/Documents/plugin/csSketch/node_modules/@babel/parser/lib/index.js:10335:10)\n    at Object.parseFunctionBody (/Users/blquigley/Documents/plugin/csSketch/node_modules/@babel/parser/lib/index.js:9408:24)\n    at Object.parseFunctionBodyAndFinish (/Users/blquigley/Documents/plugin/csSketch/node_modules/@babel/parser/lib/index.js:9378:10)\n    at withTopicForbiddingContext (/Users/blquigley/Documents/plugin/csSketch/node_modules/@babel/parser/lib/index.js:10498:12)\n    at Object.withTopicForbiddingContext (/Users/blquigley/Documents/plugin/csSketch/node_modules/@babel/parser/lib/index.js:9683:14)");

/***/ })

/******/ });
  if (key === 'default' && typeof exports === 'function') {
    exports(context);
  } else {
    exports[key](context);
  }
}
globalThis['onRun'] = __skpm_run.bind(this, 'default')

//# sourceMappingURL=my-command.js.map