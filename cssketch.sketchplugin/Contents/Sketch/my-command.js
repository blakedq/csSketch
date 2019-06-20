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
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch */ "sketch");
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = (function () {
  var doc = sketch__WEBPACK_IMPORTED_MODULE_0___default.a.getSelectedDocument();
  var selectedLayers = doc.selectedLayers;
  var pasteBoard = NSPasteboard.generalPasteboard();
  var input = pasteBoard.stringForType(NSPasteboardTypeString);
  var lines = input.split("\n");
  lines.forEach(function (declaration) {
    var colon = declaration.indexOf(":");
    var prop = declaration.slice(0, colon).trim();
    var val = declaration.slice(colon + 1).trim();
    selectedLayers.forEach(function (layer) {
      switch (prop) {
        case 'font-size':
          layer.style.fontSize = parseFloat(val);
          break;

        case 'color':
          layer.style.textColor = val;
          break;

        case 'line-height':
          layer.style.lineHeight = parseFloat(val);
          break;

        case 'font-weight':
          layer.style.fontWeight = convertWeight(val);
          break;

        case 'text-decoration':
          var textDecorations = convertDecoration(val);
          layer.style.textUnderline = textDecorations[0];
          layer.style.textStrikethrough = textDecorations[1];
          break;

        case 'font-family':
          layer.style.fontFamily = convertFontFamily(val);
          break;

        case 'font-style':
          layer.style.fontStyle = val === 'italic' || val === 'oblique' ? 'italic' : undefined;
          break;

        default:
          alertM('Unknown CSS property: ' + prop);
      }
    });
  });
});

function convertWeight(weight) {
  if (weight <= 50 || weight >= 950) return 5;
  var select_weight = Math.round(weight / 100) - 1;
  var app_kit_font_weights = [2, // FontWeight100
  3, // FontWeight200
  4, // FontWeight300
  5, // FontWeight400
  6, // FontWeight500
  8, // FontWeight600
  9, // FontWeight700
  10, // FontWeight800
  12];
  return app_kit_font_weights[select_weight];
}

function convertDecoration(dec) {
  dec = dec.substring(0, dec.indexOf("rgb") - 1);
  var split = dec.split(' ');
  var decorations = [];

  for (var i = 0; i < split.length - 1; ++i) {
    switch (split[i]) {
      case 'underline':
        decorations[0] = true;
        break;

      case 'line-through':
        decorations[1] = true;
        break;

      case 'none':
        decorations[0] = false;
        decorations[1] = false;
        break;

      default:
        alertM('Unknown text-decoration: ' + split[i]);
    }
  }

  for (var _i = 0; _i <= 1; ++_i) {
    if (decorations[_i]) {
      switch (split[split.length - 1]) {
        case 'double':
          decorations[_i] = 'double';
          break;

        case 'solid':
          decorations[_i] = 'single';
          break;

        case 'dotted':
          decorations[_i] = 'single dot';
          break;

        case 'dashed':
          decorations[_i] = 'single dash';
          break;

        default:
          alertM('Unknown text-decoration-style: ' + split[split.length - 1]);
      }
    }
  }

  return decorations;
}

function convertColor(orig) {
  var parsedColor = orig.match(/^[^\d]*\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d\.]+))?\)\s*$/);
  var newColor = "#";

  for (var i = 1; i < 4; ++i) {
    newColor += stringToHex(parsedColor[i]);
  }

  newColor += stringToHex(isNaN(parsedColor[4]) ? 255 : parsedColor[4] * 255);
  return newColor;
}

function convertFontFamily(fonts) {
  var firstFont = fonts.indexOf(',');

  if (firstFont !== -1) {
    fonts = fonts.substring(0, firstFont);
  }

  return fonts.replace(/"|'/g, '');
}

function stringToHex(str) {
  return parseInt(str).toString(16).padStart(2, "0");
}

function alertM(alert) {
  console.log(alert);
  sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message(alert);
}

/***/ }),

/***/ "sketch":
/*!*************************!*\
  !*** external "sketch" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch");

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