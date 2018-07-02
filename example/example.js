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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

(function (global, factory) {
     true ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (factory((global.viewjs = global.viewjs || {}, global.viewjs.utils = {})));
}(this, (function (exports) { 'use strict';

    function callFunc(fn, args) {
        if (args === void 0) {
            args = [];
        }
        var l = fn.length,
            i = -1,
            a1 = args[0],
            a2 = args[1],
            a3 = args[2],
            a4 = args[3];
        switch (args.length) {
            case 0:
                while (++i < l) fn[i].handler.call(fn[i].ctx);
                return;
            case 1:
                while (++i < l) fn[i].handler.call(fn[i].ctx, a1);
                return;
            case 2:
                while (++i < l) fn[i].handler.call(fn[i].ctx, a1, a2);
                return;
            case 3:
                while (++i < l) fn[i].handler.call(fn[i].ctx, a1, a2, a3);
                return;
            case 4:
                while (++i < l) fn[i].handler.call(fn[i].ctx, a1, a2, a3, a4);
                return;
            default:
                while (++i < l) fn[i].handler.apply(fn[i].ctx, args);
                return;
        }
    }
    function result(obj, prop) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        if (isFunction(obj[prop])) return obj[prop].apply(obj, args);
        return obj[prop];
    }
    function getOption(option, objs) {
        for (var i = 0, ii = objs.length; i < ii; i++) {
            if (isObject(objs[i]) && objs[i][option]) return objs[i][option];
        }
        return undefined;
    }
    /**
     * Trigger an event on an object, if it's an eventemitter,
     * will also call an method "on<EventName>" if it's exists
     *
     * @export
     * @template T
     * @param {T} self
     * @param {string} eventName
     * @param {...any[]} args
     */
    function triggerMethodOn(self, eventName) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        var ev = camelcase("on-" + eventName.replace(':', '-'));
        if (self[ev] && typeof self[ev] === 'function') {
            callFunc([{
                handler: self[ev],
                ctx: self
            }], args);
        }
        if (isFunction(self.trigger)) {
            args = [eventName].concat(args);
            callFunc([{
                handler: self.trigger,
                ctx: self
            }], args);
        }
    }
    function isObject(obj) {
        return obj === Object(obj);
    }
    function isFunction(a) {
        return typeof a === 'function';
    }
    function isString(a) {
        return typeof a === 'string';
    }
    function isElement(a) {
        return a instanceof Element;
    }
    function extend(obj) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!isObject(obj)) return obj;
        for (var i = 0, ii = args.length; i < ii; i++) {
            var o = args[i];
            if (!isObject(o)) continue;
            for (var k in o) {
                if (has(o, k)) obj[k] = o[k];
            }
        }
        return obj;
    }
    var _has = Object.prototype.hasOwnProperty;
    function has(obj, prop) {
        return _has.call(obj, prop);
    }
    function camelcase(input) {
        return input.toLowerCase().replace(/-(.)/g, function (_, group1) {
            return group1.toUpperCase();
        });
    }
    var idCounter = 0;
    function uniqueId(prefix) {
        if (prefix === void 0) {
            prefix = "";
        }
        return prefix + ++idCounter;
    }
    function indexOf(array, item) {
        for (var i = 0, len = array.length; i < len; i++) if (array[i] === item) return i;
        return -1;
    }

    function equal(a, b) {
        return eq(a, b, [], []);
    }
    var toString = Object.prototype.toString;
    function eq(a, b, aStack, bStack) {
        // Identical objects are equal. `0 === -0`, but they aren't identical.
        // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
        if (a === b) return a !== 0 || 1 / a == 1 / b;
        // A strict comparison is necessary because `null == undefined`.
        if (a == null || b == null) return a === b;
        // Compare `[[Class]]` names.
        var className = toString.call(a);
        if (className != toString.call(b)) return false;
        switch (className) {
            // Strings, numbers, dates, and booleans are compared by value.
            case '[object String]':
                // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
                // equivalent to `new String("5")`.
                return a == String(b);
            case '[object Number]':
                // `NaN`s are equivalent, but non-reflexive. An `egal` comparison is performed for
                // other numeric values.
                return a !== +a ? b !== +b : a === 0 ? 1 / a === 1 / b : a === +b;
            case '[object Date]':
            case '[object Boolean]':
                // Coerce dates and booleans to numeric primitive values. Dates are compared by their
                // millisecond representations. Note that invalid dates with millisecond representations
                // of `NaN` are not equivalent.
                return +a == +b;
            // RegExps are compared by their source patterns and flags.
            case '[object RegExp]':
                return a.source == b.source && a.global == b.global && a.multiline == b.multiline && a.ignoreCase == b.ignoreCase;
        }
        if (typeof a != 'object' || typeof b != 'object') return false;
        // Assume equality for cyclic structures. The algorithm for detecting cyclic
        // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
        var length = aStack.length;
        while (length--) {
            // Linear search. Performance is inversely proportional to the number of
            // unique nested structures.
            if (aStack[length] == a) return bStack[length] == b;
        }
        // Objects with different constructors are not equivalent, but `Object`s
        // from different frames are.
        var aCtor = a.constructor,
            bCtor = b.constructor;
        if (aCtor !== bCtor && !(typeof aCtor === 'function' && aCtor instanceof aCtor && typeof bCtor === 'function' && bCtor instanceof bCtor)) {
            return false;
        }
        // Add the first object to the stack of traversed objects.
        aStack.push(a);
        bStack.push(b);
        var size = 0,
            result$$1 = true;
        // Recursively compare objects and arrays.
        if (className === '[object Array]') {
            // Compare array lengths to determine if a deep comparison is necessary.
            size = a.length;
            result$$1 = size === b.length;
            if (result$$1) {
                // Deep compare the contents, ignoring non-numeric properties.
                while (size--) {
                    if (!(result$$1 = eq(a[size], b[size], aStack, bStack))) break;
                }
            }
        } else {
            // Deep compare objects.
            for (var key in a) {
                if (has(a, key)) {
                    // Count the expected number of properties.
                    size++;
                    // Deep compare each member.
                    if (!(result$$1 = has(b, key) && eq(a[key], b[key], aStack, bStack))) break;
                }
            }
            // Ensure that both objects contain the same number of properties.
            if (result$$1) {
                for (key in b) {
                    if (has(b, key) && !size--) break;
                }
                result$$1 = !size;
            }
        }
        // Remove the first object from the stack of traversed objects.
        aStack.pop();
        bStack.pop();
        return result$$1;
    }

    exports.callFunc = callFunc;
    exports.result = result;
    exports.getOption = getOption;
    exports.triggerMethodOn = triggerMethodOn;
    exports.isObject = isObject;
    exports.isFunction = isFunction;
    exports.isString = isString;
    exports.isElement = isElement;
    exports.extend = extend;
    exports.has = has;
    exports.camelcase = camelcase;
    exports.uniqueId = uniqueId;
    exports.indexOf = indexOf;
    exports.equal = equal;

    Object.defineProperty(exports, '__esModule', { value: true });

})));


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

(function (global, factory) {
     true ? factory(exports, __webpack_require__(0)) :
    typeof define === 'function' && define.amd ? define(['exports', '@viewjs/utils'], factory) :
    (factory((global.viewjs = global.viewjs || {}, global.viewjs.events = {}),global.viewjs.utils));
}(this, (function (exports,utils) { 'use strict';

    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };

    var classCallCheck = function (instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    };

    var createClass = function () {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }

      return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
      };
    }();

    var inherits = function (subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      }

      subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
          value: subClass,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    };

    var possibleConstructorReturn = function (self, call) {
      if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }

      return call && (typeof call === "object" || typeof call === "function") ? call : self;
    };

    function removeFromListener(listeners, fn, ctx) {
        for (var i = 0; i < listeners.length; i++) {
            var e = listeners[i];
            if (fn == null && ctx != null && e.ctx === ctx || fn != null && ctx == null && e.handler === fn || fn != null && ctx != null && e.handler === fn && e.ctx === ctx) {
                listeners.splice(i, 1);
            }
        }
        return listeners;
    }
    /**event
     * Makes target, Base, an EventEmitter
     *
     * @export
     * @param {T} Base
     * @template
     * @returns {(Constructor<IEventEmitter> & T)}
     */
    function withEventEmitter(Base) {
        return function (_Base) {
            inherits(_class, _Base);

            function _class() {
                classCallCheck(this, _class);

                var _this = possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));

                _this._listeners = void 0;
                return _this;
            }

            createClass(_class, [{
                key: 'on',
                value: function on(event, fn, ctx) {
                    var once = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

                    var events = (this._listeners || (this._listeners = new Map())).get(event) || [];
                    events.push({
                        name: event,
                        once: once,
                        handler: fn,
                        ctx: ctx || this
                    });
                    if (!this._listeners.has(event)) this._listeners.set(event, events);
                    return this;
                }
            }, {
                key: 'once',
                value: function once(event, fn, ctx) {
                    return this.on(event, fn, ctx, true);
                }
            }, {
                key: 'off',
                value: function off(eventName, fn, ctx) {
                    this._listeners = this._listeners || new Map();
                    if (eventName == null && ctx == null) {
                        this._listeners = new Map();
                    } else if (this._listeners.has(eventName)) {
                        var events = this._listeners.get(eventName);
                        if (fn == null && ctx == null) {
                            this._listeners.set(eventName, []);
                        } else {
                            removeFromListener(events, fn, ctx);
                        }
                    } else {
                        this._listeners.forEach(function (value) {
                            removeFromListener(value, fn, ctx);
                        });
                    }
                    return this;
                }
            }, {
                key: 'trigger',
                value: function trigger(eventName) {
                    this._listeners = this._listeners || new Map();
                    var events = (this._listeners.get(eventName) || []).concat(this._listeners.get("*") || []);
                    var index = void 0;
                    var calls = [];
                    var alls = [];
                    for (var i = 0, ii = events.length; i < ii; i++) {
                        if (events[i].name === '*') {
                            alls.push(events[i]);
                        } else {
                            calls.push(events[i]);
                        }
                        if (events[i].once === true) {
                            index = this._listeners.get(events[i].name).indexOf(events[i]);
                            this._listeners.get(events[i].name).splice(index, 1);
                        }
                    }

                    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                        args[_key - 1] = arguments[_key];
                    }

                    if (alls.length) {
                        this._executeListener(alls, [eventName].concat(args));
                    }
                    if (calls.length) this._executeListener(calls, args);
                    // Handle errors event
                    else if (eventName === 'error' && exports.EventEmitter.throwOnError) {
                            if (args.length) {
                                var a = args[0];
                                if (!(a instanceof Error)) {
                                    a = new Error(String(a));
                                }
                                exports.EventEmitter.throwError(a);
                            }
                        }
                    return this;
                }
            }, {
                key: 'destroy',
                value: function destroy() {
                    if (typeof Base.prototype.destroy === 'function') Base.prototype.destroy.call(this);
                    this.off();
                }
            }, {
                key: '_executeListener',
                value: function _executeListener(func, args) {
                    exports.EventEmitter.executeListenerFunction(func, args);
                }
            }, {
                key: 'listeners',
                get: function get$$1() {
                    return this._listeners;
                }
            }]);
            return _class;
        }(Base);
    }

    exports.EventEmitter = function (_withEventEmitter) {
        inherits(EventEmitter, _withEventEmitter);

        function EventEmitter() {
            classCallCheck(this, EventEmitter);
            return possibleConstructorReturn(this, (EventEmitter.__proto__ || Object.getPrototypeOf(EventEmitter)).apply(this, arguments));
        }

        return EventEmitter;
    }(withEventEmitter(function () {
        function _class2() {
            classCallCheck(this, _class2);
        }

        return _class2;
    }()));

    (function (EventEmitter) {
        /**
         * If true EventEmitter will call throwError, when when no listeners for the "error" event
         */
        EventEmitter.throwOnError = false;
        function throwError(error) {
            throw error;
        }
        EventEmitter.throwError = throwError;
        function executeListenerFunction(func, args) {
            utils.callFunc(func, args);
        }
        EventEmitter.executeListenerFunction = executeListenerFunction;
    })(exports.EventEmitter || (exports.EventEmitter = {}));

    function isEventEmitter(a) {
        return a && utils.isFunction(a.on) && utils.isFunction(a.once) && utils.isFunction(a.off) && utils.isFunction(a.trigger);
    }
    function IsEventListener(a) {
        return a && utils.isFunction(a.listenTo) && utils.isFunction(a.listenToOnce) && utils.isFunction(a.stopListening);
    }

    function withEventListener(Base) {
        return function (_Base) {
            inherits(_class, _Base);

            function _class() {
                classCallCheck(this, _class);

                var _this = possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));

                _this._listeningTo = void 0;
                return _this;
            }

            createClass(_class, [{
                key: 'listenTo',
                value: function listenTo(obj, event, fn, ctx) {
                    var once = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

                    if (!isEventEmitter(obj)) {
                        if (exports.EventEmitter.throwOnError) exports.EventEmitter.throwError(new TypeError("obj is not an EventEmitter"));
                        return this;
                    }
                    var listeningTo = void 0,
                        id = void 0,
                        meth = void 0;
                    listeningTo = this._listeningTo || (this._listeningTo = {});
                    id = obj.listenId || (obj.listenId = utils.uniqueId());
                    listeningTo[id] = obj;
                    meth = once ? 'once' : 'on';
                    obj[meth](event, fn, ctx || this);
                    return this;
                }
            }, {
                key: 'listenToOnce',
                value: function listenToOnce(obj, event, fn, ctx) {
                    return this.listenTo(obj, event, fn, ctx, true);
                }
            }, {
                key: 'stopListening',
                value: function stopListening(obj, event, callback) {
                    if (obj && !isEventEmitter(obj)) {
                        if (exports.EventEmitter.throwOnError) exports.EventEmitter.throwError(new TypeError("obj is not an EventEmitter"));
                        return this;
                    }
                    var listeningTo = this._listeningTo;
                    if (!listeningTo) return this;
                    var remove = !event && !callback;
                    if (!callback && (typeof event === 'undefined' ? 'undefined' : _typeof(event)) === 'object') callback = this;
                    if (obj) (listeningTo = {})[obj.listenId] = obj;
                    for (var id in listeningTo) {
                        obj = listeningTo[id];
                        obj.off(event, callback, this);
                        if (remove || obj.listeners.size === 0) delete this._listeningTo[id];
                    }
                    return this;
                }
            }, {
                key: 'destroy',
                value: function destroy() {
                    if (typeof Base.prototype.destroy === 'function') Base.prototype.destroy.call(this);
                    this.stopListening();
                }
            }]);
            return _class;
        }(Base);
    }

    exports.withEventEmitter = withEventEmitter;
    exports.withEventListener = withEventListener;
    exports.isEventEmitter = isEventEmitter;
    exports.IsEventListener = IsEventListener;

    Object.defineProperty(exports, '__esModule', { value: true });

})));


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var utils_1 = __webpack_require__(0);

var MetaKeys;

(function (MetaKeys) {
  MetaKeys.Attributes = Symbol("attributes");
})(MetaKeys = exports.MetaKeys || (exports.MetaKeys = {}));

function isDestroyable(a) {
  return a && utils_1.isFunction(a.destroy);
}

exports.isDestroyable = isDestroyable;
var ModelEvents;

(function (ModelEvents) {
  ModelEvents.Add = "add";
  ModelEvents.BeforeRemove = "before:remove";
  ModelEvents.Remove = "remove";
  ModelEvents.Clear = "clear";
  ModelEvents.BeforeSort = "before:sort";
  ModelEvents.Sort = "sort";
  ModelEvents.Change = "change";
  ModelEvents.Reset = "reset";
})(ModelEvents = exports.ModelEvents || (exports.ModelEvents = {}));

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

(function (global, factory) {
     true ? factory(exports, __webpack_require__(0)) :
    typeof define === 'function' && define.amd ? define(['exports', '@viewjs/utils'], factory) :
    (factory((global.viewjs = global.viewjs || {}, global.viewjs.view = {}),global.viewjs.utils));
}(this, (function (exports,utils) { 'use strict';

    // Because IE/edge stinks!
    var ElementProto = typeof Element !== 'undefined' && Element.prototype || {};
    var matchesSelector = ElementProto.matches || ElementProto.webkitMatchesSelector || ElementProto.mozMatchesSelector || ElementProto.msMatchesSelector || ElementProto.oMatchesSelector || function (selector) {
        var nodeList = (this.parentNode || document).querySelectorAll(selector) || [];
        return !!~utils.indexOf(nodeList, this);
    };
    function matches(elm, selector) {
        return matchesSelector.call(elm, selector);
    }
    var kUIRegExp = /@(?:ui\.)?([a-zA-Z_\-\$#\d]+)/i;
    function normalizeUIKeys(obj, uimap) {
        var o = {},
            k = void 0,
            v = void 0;
        for (k in obj) {
            v = obj[k];
            k = normalizeUIString(k, uimap);
            o[k] = v;
        }
        return o;
    }
    function normalizeUIString(str, uimap) {
        var ms = void 0,
            ui = void 0,
            sel = void 0;
        if ((ms = kUIRegExp.exec(str)) != null) {
            ui = ms[1], sel = uimap[ui];
            if (sel != null) str = str.replace(ms[0], sel);
        }
        return str;
    }

    var classCallCheck = function (instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    };

    var createClass = function () {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }

      return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
      };
    }();

    var defineProperty = function (obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, {
          value: value,
          enumerable: true,
          configurable: true,
          writable: true
        });
      } else {
        obj[key] = value;
      }

      return obj;
    };

    var get = function get(object, property, receiver) {
      if (object === null) object = Function.prototype;
      var desc = Object.getOwnPropertyDescriptor(object, property);

      if (desc === undefined) {
        var parent = Object.getPrototypeOf(object);

        if (parent === null) {
          return undefined;
        } else {
          return get(parent, property, receiver);
        }
      } else if ("value" in desc) {
        return desc.value;
      } else {
        var getter = desc.get;

        if (getter === undefined) {
          return undefined;
        }

        return getter.call(receiver);
      }
    };

    var inherits = function (subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      }

      subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
          value: subClass,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    };

    var possibleConstructorReturn = function (self, call) {
      if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }

      return call && (typeof call === "object" || typeof call === "function") ? call : self;
    };

    var AbstractView = function () {
        function AbstractView() {
            classCallCheck(this, AbstractView);
        }

        createClass(AbstractView, [{
            key: 'render',
            value: function render() {
                return this;
            }
        }, {
            key: 'destroy',
            value: function destroy() {
                return this;
            }
        }, {
            key: 'el',
            get: function get$$1() {
                return this._el;
            },
            set: function set$$1(el) {
                this.setElement(el);
            }
        }]);
        return AbstractView;
    }();

    var unbubblebles = 'focus blur change'.split(' ');

    var BaseView = function (_AbstractView) {
        inherits(BaseView, _AbstractView);

        function BaseView() {
            var _options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            classCallCheck(this, BaseView);

            var _this = possibleConstructorReturn(this, (BaseView.__proto__ || Object.getPrototypeOf(BaseView)).call(this));

            _this._options = _options;
            _this.setElement(_options.el, false);
            _this._domEvents = [];
            _this._vid = utils.uniqueId('vid');
            return _this;
        }

        createClass(BaseView, [{
            key: 'delegateEvents',
            value: function delegateEvents(events) {
                var _this2 = this;

                if (!this.el) return;
                this._bindUIElements();
                events = events || utils.result(this, 'events') || {};
                events = normalizeUIKeys(events, this._ui);
                var triggers = this._configureTriggers();
                events = utils.extend({}, events, triggers);
                if (!events) return this;
                //if (!(events || (events = result(this, 'events')))) return this;
                this.undelegateEvents();
                var dels = [];
                for (var key in events) {
                    var methods = events[key];
                    var match = key.match(/^(\S+)\s*(.*)$/);
                    if (!Array.isArray(methods)) methods = [methods];
                    for (var i = 0, ii = methods.length; i < ii; i++) {
                        var method = methods[i];
                        if (typeof method !== 'function') method = this[method];
                        // Set delegates immediately and defer event on this.el
                        var boundFn = method.bind(this); // bind(<Function>method, this);
                        if (match[2]) {
                            this.delegate(match[1], match[2], boundFn);
                        } else {
                            dels.push([match[1], boundFn]);
                        }
                    }
                }
                dels.forEach(function (d) {
                    _this2.delegate(d[0], d[1]);
                });
                return this;
            }
        }, {
            key: 'undelegateEvents',
            value: function undelegateEvents() {
                if (!this.el) return this;
                this._unbindUIElements();
                if (this.el) {
                    for (var i = 0, len = this._domEvents.length; i < len; i++) {
                        var item = this._domEvents[i];
                        this.el.removeEventListener(item.eventName, item.handler);
                    }
                    this._domEvents.length = 0;
                }
                return this;
            }
        }, {
            key: 'delegate',
            value: function delegate(eventName, selector, listener) {
                if (!this.el) return this;
                if (typeof selector === 'function') {
                    listener = selector;
                    selector = undefined;
                }
                var root = this.el;
                var handler = selector ? function (e) {
                    var node = e.target || e.srcElement;
                    // Already handled
                    if (e.delegateTarget) return;
                    for (; node && node != root; node = node.parentNode) {
                        if (node && matches(node, selector)) {
                            e.delegateTarget = node;
                            listener(e);
                        }
                    }
                } : function (e) {
                    if (e.delegateTarget) return;
                    listener(e);
                };
                var useCap = !!~unbubblebles.indexOf(eventName) && selector != null;
                this.el.addEventListener(eventName, handler, useCap);
                this._domEvents.push({ eventName: eventName, handler: handler, listener: listener, selector: selector });
                return handler;
            }
        }, {
            key: 'undelegate',
            value: function undelegate(eventName, selector, listener) {
                if (!this.el) return this;
                if (typeof selector === 'function') {
                    listener = selector;
                    selector = undefined;
                }
                if (this.el) {
                    var handlers = this._domEvents.slice();
                    for (var i = 0, len = handlers.length; i < len; i++) {
                        var item = handlers[i];
                        var match = item.eventName === eventName && (listener ? item.listener === listener : true) && (selector ? item.selector === selector : true);
                        if (!match) continue;
                        this.el.removeEventListener(item.eventName, item.handler);
                        this._domEvents.splice(utils.indexOf(handlers, item), 1);
                    }
                }
                return this;
            }
        }, {
            key: 'render',
            value: function render() {
                this.undelegateEvents();
                this.delegateEvents();
                return this;
            }
        }, {
            key: 'setElement',
            value: function setElement(el) {
                var trigger = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

                if (trigger) this.undelegateEvents();
                if (this.el && this.options.attachId) {
                    this.el.removeAttribute('data-vid');
                }
                this._el = el;
                if (trigger) this.delegateEvents();
                if (this.el && this.options.attachId) {
                    this.el.setAttribute('data-vid', this.vid);
                }
                return this;
            }
        }, {
            key: 'destroy',
            value: function destroy() {
                this.undelegateEvents();
                if (this.el && this.options.attachId) {
                    this.el.removeAttribute('data-vid');
                }
                get(BaseView.prototype.__proto__ || Object.getPrototypeOf(BaseView.prototype), 'destroy', this).call(this);
                return this;
            }
        }, {
            key: '_bindUIElements',
            value: function _bindUIElements() {
                var _this3 = this;

                var ui = this.ui;
                if (!ui) return;
                if (!this._ui) {
                    this._ui = ui;
                }
                ui = this._ui;
                this.ui = {};
                Object.keys(ui).forEach(function (k) {
                    var elm = _this3.el.querySelectorAll(ui[k]);
                    if (elm && elm.length) {
                        // unwrap if it's a nodelist.
                        if (elm instanceof NodeList) {
                            elm = elm[0];
                        }
                        _this3.ui[k] = elm;
                    } else {
                    }
                });
            }
        }, {
            key: '_unbindUIElements',
            value: function _unbindUIElements() {}
        }, {
            key: '_configureTriggers',
            value: function _configureTriggers() {
                var triggers = this.triggers || {};
                triggers = normalizeUIKeys(triggers, this._ui);
                // Configure the triggers, prevent default
                // action and stop propagation of DOM events
                var events = {},
                    val = void 0,
                    key = void 0;
                for (key in triggers) {
                    val = triggers[key];
                    events[key] = this._buildViewTrigger(val);
                }
                return events;
            }
        }, {
            key: '_buildViewTrigger',
            value: function _buildViewTrigger(triggerDef) {
                var _this4 = this;

                if (typeof triggerDef === 'string') triggerDef = { event: triggerDef };
                var options = utils.extend({
                    preventDefault: true,
                    stopPropagation: true
                }, triggerDef);
                return function (e) {
                    if (e) {
                        if (e.preventDefault && options.preventDefault) {
                            e.preventDefault();
                        }
                        if (e.stopPropagation && options.stopPropagation) {
                            e.stopPropagation();
                        }
                    }
                    utils.triggerMethodOn(_this4, options.event, {
                        view: _this4
                    }, e);
                };
            }
        }, {
            key: 'vid',
            get: function get$$1() {
                return this._vid;
            }
        }, {
            key: 'options',
            get: function get$$1() {
                return this._options;
            }
        }], [{
            key: 'find',
            value: function find(selector, context) {
                return context.querySelectorAll(selector);
            }
        }]);
        return BaseView;
    }(AbstractView);

    var View = function (_BaseView) {
        inherits(View, _BaseView);

        function View() {
            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { attachId: true };
            classCallCheck(this, View);
            return possibleConstructorReturn(this, (View.__proto__ || Object.getPrototypeOf(View)).call(this, options));
        }

        return View;
    }(BaseView);

    exports.Invoker = {
        get: function get(V) {
            return Reflect.construct(V, []);
        }
    };
    function setInvoker(i) {
        exports.Invoker = i;
    }

    function attributes(attrs) {
        return function (target) {
            utils.extend(target.prototype, attrs);
        };
    }
    function event(eventName, selector) {
        return function (target, property, desc) {
            if (!desc) throw new Error('no description');
            if (typeof desc.value !== 'function') {
                throw new TypeError('must be a function');
            }
            var key = eventName + ' ' + selector;
            if (target.events && utils.has(target.events, key)) {
                var old = target.events[key];
                if (!Array.isArray(old)) old = [old];
                old.push(property);
                target.events[key] = old;
            } else {
                target.events = utils.extend(target.events || {}, defineProperty({}, key, property));
            }
        };
    }
    (function (event) {
        function click(selector) {
            return event('click', selector);
        }
        event.click = click;
        function change(selector) {
            return event('change', selector);
        }
        event.change = change;
    })(event || (event = {}));
    /**
     * Mount a view on the target and bind matched element
     *
     * @export
     * @param {string} selector
     * @returns
     */
    function attach(selector) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        return function (target, prop) {
            var View = Reflect.getOwnMetadata("design:type", target, prop);
            if (!View) throw new Error('design:type does not exists for prop \'' + prop + '\' on \'' + target + '\'');
            if (!target.views) target.views = {};
            target.views[prop] = {
                selector: selector,
                view: View,
                optional: typeof options.optional !== 'boolean' ? false : options.optional
            };
        };
    }

    var Controller = function (_AbstractView) {
        inherits(Controller, _AbstractView);

        function Controller() {
            classCallCheck(this, Controller);
            return possibleConstructorReturn(this, (Controller.__proto__ || Object.getPrototypeOf(Controller)).apply(this, arguments));
        }

        createClass(Controller, [{
            key: 'setElement',
            value: function setElement(el) {
                this._el = el;
                return this;
            }
        }]);
        return Controller;
    }(AbstractView);

    function withAttachedViews(Base) {
        return function (_Base) {
            inherits(_class, _Base);

            function _class() {
                var _ref;

                classCallCheck(this, _class);

                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key];
                }

                var _this = possibleConstructorReturn(this, (_ref = _class.__proto__ || Object.getPrototypeOf(_class)).call.apply(_ref, [this].concat(args)));

                if (_this.views) _this._bindViews(_this.views);
                return _this;
            }

            createClass(_class, [{
                key: 'render',
                value: function render() {
                    get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'render', this).call(this);
                    this._renderViews(this.views);
                    return this;
                }
            }, {
                key: 'destroy',
                value: function destroy() {
                    if (this.views) {
                        this._unbindViews(this.views);
                    }
                    return get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'destroy', this).call(this);
                }
            }, {
                key: '_bindViews',
                value: function _bindViews(views) {
                    var o = void 0;
                    for (var key in views) {
                        o = views[key];
                        var view = exports.Invoker.get(o.view);
                        this[key] = view;
                    }
                }
            }, {
                key: '_unbindViews',
                value: function _unbindViews(views) {
                    var self = this;
                    for (var key in views) {
                        if (self[key] && self[key] instanceof BaseView) {
                            self[key].destroy();
                            self[key] = void 0;
                        }
                    }
                }
            }, {
                key: '_renderViews',
                value: function _renderViews(views) {
                    var el = void 0,
                        o = void 0;
                    for (var key in views) {
                        o = views[key];
                        var sel = normalizeUIString(o.selector, this._ui || {});
                        el = this.el.querySelector(sel);
                        if (!el && !o.optional) throw new ReferenceError('selector "' + sel + '" for view ' + o.view.name + ' not found in dom');
                        // No element - return!
                        if (!el) return;
                        var view = this[key];
                        if (!view) throw new ReferenceError('view "' + o.view.name + '" not mount');
                        view.el = el;
                        view.render();
                    }
                }
            }]);
            return _class;
        }(Base);
    }

    function withElement(Base) {
        return function (_Base) {
            inherits(_class, _Base);

            function _class() {
                var _ref;

                classCallCheck(this, _class);

                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key];
                }

                var _this = possibleConstructorReturn(this, (_ref = _class.__proto__ || Object.getPrototypeOf(_class)).call.apply(_ref, [this].concat(args)));

                if (!_this.el) _this._ensureElement();
                return _this;
            }

            createClass(_class, [{
                key: '_ensureElement',
                value: function _ensureElement() {
                    if (this.el) return;
                    var tagName = utils.getOption('tagName', [this.options, this]) || 'div',
                        className = utils.getOption('className', [this.options, this]),
                        attr = utils.getOption('attributes', [this.options, this]),
                        el = document.createElement(tagName);
                    if (className) {
                        // IE < 11 does not support multiple arguments in add/remove
                        className.split(' ').map(function (m) {
                            return m.trim();
                        }).forEach(function (cl) {
                            return el.classList.add(cl);
                        });
                    }
                    if (attr) {
                        for (var key in attr) {
                            el.setAttribute(key, attr[key]);
                        }
                    }
                    this.el = el;
                }
            }, {
                key: 'remove',
                value: function remove() {
                    if (this.el && this.el.parentNode) {
                        if (typeof this.undelegateEvents === 'function') this.undelegateEvents();
                        this.el.parentNode.removeChild(this.el);
                        this.el = void 0;
                    }
                    return this;
                }
            }, {
                key: 'destroy',
                value: function destroy() {
                    get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'destroy', this).call(this);
                    if (this.el && this.__created) {
                        this.remove();
                    }
                    return this;
                }
            }]);
            return _class;
        }(Base);
    }

    function withTemplate(Base) {
        return function (_Base) {
            inherits(_class, _Base);

            function _class() {
                classCallCheck(this, _class);
                return possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
            }

            createClass(_class, [{
                key: 'getTemplateData',
                value: function getTemplateData() {
                    var data = utils.result(this, 'model') || {};
                    return data;
                }
            }, {
                key: 'render',
                value: function render() {
                    if (!this.el) return this;
                    if (utils.isFunction(this.undelegateEvents)) this.undelegateEvents();
                    this.renderTemplate();
                    return get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'render', this).call(this);
                }
            }, {
                key: 'destroy',
                value: function destroy() {
                    var data = this.getTemplateData();
                    try {
                        var template = utils.result(this, 'template', data);
                        if (template && this.el) this.el.innerHTML = '';
                    } catch (e) {}
                    return get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'destroy', this).call(this);
                }
            }, {
                key: 'renderTemplate',
                value: function renderTemplate() {
                    if (!this.el) return;
                    var data = this.getTemplateData();
                    var template = utils.result(this, 'template', data);
                    if (!template) return;
                    if (utils.isString(template)) this.el.innerHTML = template;else if (utils.isElement(template)) {
                        this.el.appendChild(template);
                    } else {
                        this.el.innerHTML = '';
                    }
                }
            }]);
            return _class;
        }(Base);
    }

    exports.View = View;
    exports.setInvoker = setInvoker;
    exports.attributes = attributes;
    exports.event = event;
    exports.attach = attach;
    exports.BaseView = BaseView;
    exports.matches = matches;
    exports.normalizeUIKeys = normalizeUIKeys;
    exports.normalizeUIString = normalizeUIString;
    exports.AbstractView = AbstractView;
    exports.Controller = Controller;
    exports.withAttachedViews = withAttachedViews;
    exports.withElement = withElement;
    exports.withTemplate = withTemplate;

    Object.defineProperty(exports, '__esModule', { value: true });

})));


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var view_1 = __webpack_require__(3);

var utils_1 = __webpack_require__(0);

var TemplateView =
/*#__PURE__*/
function (_view_1$withTemplate) {
  _inherits(TemplateView, _view_1$withTemplate);

  function TemplateView() {
    var _this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, TemplateView);

    _this = _possibleConstructorReturn(this, (TemplateView.__proto__ || Object.getPrototypeOf(TemplateView)).call(this, options));

    if (options.template) {
      _this.template = options.template;
    }

    return _this;
  }

  _createClass(TemplateView, [{
    key: "getTemplateData",
    value: function getTemplateData() {
      if (this.model && utils_1.isFunction(this.model.toJSON)) {
        return this.model.toJSON();
      }

      return utils_1.result(this, 'model');
    }
  }]);

  return TemplateView;
}(view_1.withTemplate(view_1.withElement(view_1.View)));

exports.TemplateView = TemplateView;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (_typeof(Reflect) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __metadata = this && this.__metadata || function (k, v) {
  if (_typeof(Reflect) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var index_1 = __webpack_require__(6);

var view_1 = __webpack_require__(3);

var template_view_1 = __webpack_require__(4);

var events_1 = __webpack_require__(1);

var Todo =
/*#__PURE__*/
function (_index_1$Model) {
  _inherits(Todo, _index_1$Model);

  function Todo(name) {
    var _this;

    _classCallCheck(this, Todo);

    _this = _possibleConstructorReturn(this, (Todo.__proto__ || Object.getPrototypeOf(Todo)).call(this));
    _this.name = name;
    return _this;
  }

  return Todo;
}(index_1.Model);

__decorate([index_1.property, __metadata("design:type", String)], Todo.prototype, "name", void 0);

var TodoListItem =
/*#__PURE__*/
function (_events_1$withEventLi) {
  _inherits(TodoListItem, _events_1$withEventLi);

  function TodoListItem() {
    var _this2;

    _classCallCheck(this, TodoListItem);

    _this2 = _possibleConstructorReturn(this, (TodoListItem.__proto__ || Object.getPrototypeOf(TodoListItem)).apply(this, arguments));
    _this2.edit = false;

    _this2.template = function (model) {
      return _this2.edit ? "<input type=\"text\" value=\"".concat(model.name, "\"><button>done</button>") : "\n            <h5>".concat(model.name, "</h5>\n        ");
    };

    return _this2;
  }

  _createClass(TodoListItem, [{
    key: "onNameChange",
    value: function onNameChange() {
      this.render();
    }
  }, {
    key: "onInput",
    value: function onInput() {
      this.edit = false;
      this.model.name = this.ui.input.value;
    }
  }, {
    key: "onClick",
    value: function onClick() {
      this.edit = true;
      this.render();
    }
  }]);

  return TodoListItem;
}(events_1.withEventListener(index_1.withModel(template_view_1.TemplateView)));

__decorate([index_1.model.change('name'), __metadata("design:type", Function), __metadata("design:paramtypes", []), __metadata("design:returntype", void 0)], TodoListItem.prototype, "onNameChange", null);

__decorate([view_1.event.click('button'), __metadata("design:type", Function), __metadata("design:paramtypes", []), __metadata("design:returntype", void 0)], TodoListItem.prototype, "onInput", null);

__decorate([view_1.event.click('h5'), __metadata("design:type", Function), __metadata("design:paramtypes", []), __metadata("design:returntype", void 0)], TodoListItem.prototype, "onClick", null);

TodoListItem = __decorate([view_1.attributes({
  tagName: "li",
  ui: {
    input: 'input'
  }
})], TodoListItem);

var TodoList =
/*#__PURE__*/
function (_index_1$withCollecti) {
  _inherits(TodoList, _index_1$withCollecti);

  function TodoList() {
    _classCallCheck(this, TodoList);

    return _possibleConstructorReturn(this, (TodoList.__proto__ || Object.getPrototypeOf(TodoList)).apply(this, arguments));
  }

  return TodoList;
}(index_1.withCollection(view_1.View, TodoListItem, index_1.ArrayCollection));

var Page =
/*#__PURE__*/
function (_view_1$withAttachedV) {
  _inherits(Page, _view_1$withAttachedV);

  function Page() {
    var _this3;

    _classCallCheck(this, Page);

    _this3 = _possibleConstructorReturn(this, (Page.__proto__ || Object.getPrototypeOf(Page)).apply(this, arguments));

    _this3.template = function () {
      return "\n        <h1>Todos</h1>\n        <button class=\"create-btn\">Create</button>\n        <ul class=\"list-view\"></ul>\n        \n    ";
    };

    return _this3;
  }

  _createClass(Page, [{
    key: "onCreateClick",
    value: function onCreateClick() {
      console.log('click');
      this.list.collection.push(new Todo("New Todo"));
    }
  }]);

  return Page;
}(view_1.withAttachedViews(view_1.withTemplate(view_1.withAttachedViews(view_1.View))));

__decorate([view_1.attach('.list-view'), __metadata("design:type", TodoList)], Page.prototype, "list", void 0);

__decorate([view_1.event.click('.create-btn'), __metadata("design:type", Function), __metadata("design:paramtypes", []), __metadata("design:returntype", void 0)], Page.prototype, "onCreateClick", null);

var p = new Page({
  el: document.querySelector('#main')
});
p.render();

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function __export(m) {
  for (var p in m) {
    if (!exports.hasOwnProperty(p)) exports[p] = m[p];
  }
}

Object.defineProperty(exports, "__esModule", {
  value: true
});

__export(__webpack_require__(7));

__export(__webpack_require__(8));

__export(__webpack_require__(9));

__export(__webpack_require__(10));

__export(__webpack_require__(2));

__export(__webpack_require__(11));

__export(__webpack_require__(4)); //export * from './event-emitter';

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var utils_1 = __webpack_require__(0);

var types_1 = __webpack_require__(2);

var events_1 = __webpack_require__(1);

var utils_2 = __webpack_require__(0);

var Model =
/*#__PURE__*/
function (_events_1$EventEmitte) {
  _inherits(Model, _events_1$EventEmitte);

  function Model() {
    var _this;

    _classCallCheck(this, Model);

    _this = _possibleConstructorReturn(this, (Model.__proto__ || Object.getPrototypeOf(Model)).call(this));
    _this[types_1.MetaKeys.Attributes] = new Map();
    return _this;
  }

  _createClass(Model, [{
    key: "set",
    value: function set(key, value, options) {
      var old = this.get(key);

      if (utils_1.equal(old, value)) {
        return this;
      }

      this[types_1.MetaKeys.Attributes].set(key, value);
      if (options && options.silent) return this;
      utils_2.triggerMethodOn(this, "change:".concat(key), old, value);
      utils_2.triggerMethodOn(this, 'change', _defineProperty({}, key, value));
      return this;
    }
  }, {
    key: "get",
    value: function get(key) {
      return this[types_1.MetaKeys.Attributes].get(key);
    }
  }, {
    key: "has",
    value: function has(key) {
      return this[types_1.MetaKeys.Attributes].has(key);
    }
  }, {
    key: "clear",
    value: function clear() {
      this[types_1.MetaKeys.Attributes] = new Map();
      utils_2.triggerMethodOn(this, 'clear');
      return this;
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      var _ = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      var out = {};
      this[types_1.MetaKeys.Attributes].forEach(function (value, key) {
        out[key] = value;
      });
      return out;
    }
  }]);

  return Model;
}(events_1.EventEmitter);

exports.Model = Model;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var utils_1 = __webpack_require__(0);

function setter(_, prop) {
  return function $observableSetter(value) {
    return this.set(prop, value);
  };
}

function getter(_, prop) {
  return function $observableGetter() {
    return this.get(prop);
  };
}
/**
 *
 * @export
 * @template
 * @param {T} target
 * @param {*} prop
 * @param {TypedPropertyDescriptor<U>} [descriptor]
 */


function property(target, prop, descriptor) {
  descriptor = descriptor || Object.getOwnPropertyDescriptor(target, prop);

  if (!descriptor) {
    descriptor = {
      get: getter(target, prop),
      set: setter(target, prop),
      enumerable: false,
      configurable: false
    };
    Object.defineProperty(target, prop, descriptor);
  } else if (descriptor.set) {
    descriptor.set = function $observableSet(value) {
      return this.set(prop, value);
    };
  }
}

exports.property = property;

function _event(event, property, target, prop, desc, targetKey) {
  if (!desc) throw new Error('no description');

  if (typeof desc.value !== 'function') {
    throw new TypeError('must be a function');
  }

  var key = event + (property ? ':' + property : '');

  if (target[targetKey] && utils_1.has(target[targetKey], key)) {
    var old = target[targetKey][key];
    if (!Array.isArray(old)) old = [old];
    old.push(prop);
    target[targetKey][key] = old;
  } else {
    target[targetKey] = utils_1.extend(target[targetKey] || {}, _defineProperty({}, key, [prop]));
  }
}

var model;

(function (model) {
  function event(event, property) {
    return function (target, prop, desc) {
      return _event(event, property, target, prop, desc, "modelEvents");
    };
  }

  model.event = event;

  function change(property) {
    return event("change", property);
  }

  model.change = change;
})(model = exports.model || (exports.model = {}));

var collection;

(function (collection) {
  function event(event, property) {
    return function (target, prop, desc) {
      return _event(event, property, target, prop, desc, "collectionEvents");
    };
  }

  collection.event = event;

  function change(property) {
    return event("change", property);
  }

  collection.change = change;
})(collection = exports.collection || (exports.collection = {}));

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var types_1 = __webpack_require__(2);

var events_1 = __webpack_require__(1);

var utils_1 = __webpack_require__(0);

var ArrayCollection =
/*#__PURE__*/
function (_events_1$EventEmitte) {
  _inherits(ArrayCollection, _events_1$EventEmitte);

  function ArrayCollection() {
    var _this;

    var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    _classCallCheck(this, ArrayCollection);

    _this = _possibleConstructorReturn(this, (ArrayCollection.__proto__ || Object.getPrototypeOf(ArrayCollection)).call(this));
    _this.a = a;
    return _this;
  }
  /**
   * The length of the array
   *
   * @readonly
   * @type {number}
   * @memberof ArrayCollection
   */


  _createClass(ArrayCollection, [{
    key: "item",

    /**
     * Get item at index
     *
     * @param {number} index
     * @returns {(T | undefined)}
     *
     * @memberof ArrayCollection
     */
    value: function item(index) {
      if (index >= this.a.length) return undefined;
      return this.a[index];
    }
    /**
     * Push an item and optionally trigger a change event
     *
     * @param {T} m
     * @param {boolean} [trigger=true]
     *
     * @memberof ArrayCollection
     */

  }, {
    key: "push",
    value: function push(m) {
      var trigger = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      this.a.push(m);
      if (trigger) this.trigger(types_1.ModelEvents.Add, m, this.a.length - 1);
      return this.length;
    }
    /**
     * Pop a item from the array and optinally trigger a change event
     *
     * @param {boolean} [trigger=true]
     * @returns {(T | undefined)}
     *
     * @memberof ArrayCollection
     */

  }, {
    key: "pop",
    value: function pop() {
      var trigger = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var m = this.a.pop();
      if (trigger) this.trigger(types_1.ModelEvents.Remove, m, this.a.length);
      return m;
    }
  }, {
    key: "insert",
    value: function insert(m, index) {
      if (index >= this.length) return;
      this.a.splice(index, 0, m);
      this.trigger(types_1.ModelEvents.Add, m, index);
    }
  }, {
    key: "indexOf",
    value: function indexOf(m) {
      for (var i = 0, ii = this.length; i < ii; i++) {
        if (utils_1.equal(this.a[i], m)) return i;
      }

      return -1;
    }
  }, {
    key: "removeAtIndex",
    value: function removeAtIndex(index) {
      var m = this.item(index);
      if (!m) return undefined;
      this.trigger(types_1.ModelEvents.BeforeRemove, m, index);
      this.a.splice(index, 1);
      this.trigger(types_1.ModelEvents.Remove, m, index);
      return m;
    }
  }, {
    key: "remove",
    value: function remove(model) {
      var i = -1;

      if (!~(i = this.indexOf(model))) {
        return void 0;
      }

      ;
      return this.removeAtIndex(i);
    }
  }, {
    key: "find",
    value: function find(fn) {
      return this.a.find(fn);
    }
  }, {
    key: "sort",
    value: function sort(fn) {
      this.trigger(types_1.ModelEvents.BeforeSort);
      this.a.sort(fn);
      this.trigger(types_1.ModelEvents.Sort);
    }
    /**
     * Reset the array
     *
     * @param {T[]} [a]
     *
     * @memberof ArrayCollection
     */

  }, {
    key: "reset",
    value: function reset(a) {
      this.a = a || [];
      this.trigger(types_1.ModelEvents.Reset);
    }
  }, {
    key: "filter",
    value: function filter(fn) {
      return Reflect.construct(this.constructor, [this.a.filter(fn)]);
    }
  }, {
    key: "map",
    value: function map(fn) {
      return new ArrayCollection(this.a.map(fn));
    }
  }, {
    key: "destroy",
    value: function destroy() {
      for (var i = 0, ii = this.a.length; i < ii; i++) {
        if (types_1.isDestroyable(this.a[i])) this.a[i].destroy();
      }

      this.a = [];
    }
    /**
     * Returns a copy of the array
     *
     * @returns
     *
     * @memberof ArrayCollection
     */

  }, {
    key: "array",
    value: function array() {
      return [].concat(_toConsumableArray(this.a));
    }
  }, {
    key: "length",
    get: function get() {
      return this.a.length;
    }
  }]);

  return ArrayCollection;
}(events_1.EventEmitter);

exports.ArrayCollection = ArrayCollection;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return _get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var view_1 = __webpack_require__(3);

var types_1 = __webpack_require__(2);

var utils_1 = __webpack_require__(0);

var events_1 = __webpack_require__(1);

function withCollection(Base, CView, CCollection) {
  return (
    /*#__PURE__*/
    function (_Base) {
      _inherits(_class, _Base);

      function _class() {
        var _ref;

        var _this;

        _classCallCheck(this, _class);

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        _this = _possibleConstructorReturn(this, (_ref = _class.__proto__ || Object.getPrototypeOf(_class)).call.apply(_ref, [this].concat(args)));
        _this.ChildView = CView;
        _this.options.eventProxyName = _this.options.eventProxyName || 'childView';
        _this.collection = CCollection ? new CCollection() : void 0;
        return _this;
      }

      _createClass(_class, [{
        key: "render",
        value: function render() {
          this.undelegateEvents();

          this._removeChildViews();

          _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), "render", this).call(this);

          if (!this.collection || !this.el) return this;

          this._renderCollection();

          this.delegateEvents();
          return this;
        }
      }, {
        key: "setCollection",
        value: function setCollection(collection) {
          if (this._collection == collection) return;

          if (this.collection) {
            this._removeModelEvents();

            this._removeChildViews();
          }

          this._collection = collection;

          if (this.collection) {
            this._addModelEvents();
          }
        }
      }, {
        key: "_removeChildViews",
        value: function _removeChildViews() {
          if (!this._childViews) {
            this._childViews = [];
          }

          for (var i = 0, ii = this._childViews.length; i < ii; i++) {
            var v = this._childViews[i];
            v.destroy();
            if (v.el && v.el.parentNode) v.el.parentElement.removeChild(v.el);
          }

          this._childViews = [];
        }
      }, {
        key: "_renderCollection",
        value: function _renderCollection(collection) {
          var col = collection || this.collection;

          var container = this._getChildViewContainer();

          container.innerHTML = '';
          var frag = document.createDocumentFragment();

          for (var i = 0, ii = col.length; i < ii; i++) {
            var item = col.item(i);
            if (!item) throw RangeError("invalid index");

            var view = this._createChildView(item);

            this._renderChildView(view);

            this._attachChildView(frag, view, i);
          }

          container.appendChild(frag);
        }
      }, {
        key: "_renderChildView",
        value: function _renderChildView(view) {
          view.render();
        }
      }, {
        key: "_attachChildView",
        value: function _attachChildView(container, view, index) {
          if (index >= this._childViews.length) {
            container.appendChild(view.el);

            this._childViews.push(view);
          } else {
            var after = this._childViews[index];

            this._childViews.splice(index, 0, view);

            container.insertBefore(view.el, after.el);
          }

          if (events_1.isEventEmitter(view)) this._proxyChildViewEvents(view);
        }
      }, {
        key: "_createChildView",
        value: function _createChildView(model) {
          var Vi = this.options.childView || this.ChildView || view_1.View;
          var el = view_1.Invoker.get(Vi);
          el.model = model;
          el.options.attachId = true;
          return el;
        }
      }, {
        key: "_destroyChildView",
        value: function _destroyChildView(view) {
          var index = this._childViews.indexOf(view);

          this._childViews.splice(index, 1);

          var container = this._getChildViewContainer();

          container.removeChild(view.el);
          view.destroy();
        }
      }, {
        key: "_modelAdded",
        value: function _modelAdded(item, index) {
          if (!this.el) return;

          var view = this._createChildView(item);

          this._renderChildView(view);

          this._attachChildView(this._getChildViewContainer(), view, index);
        }
      }, {
        key: "_modelRemoved",
        value: function _modelRemoved(_, index) {
          if (!this.el) return;
          var view = this._childViews[index];

          this._destroyChildView(view);
        }
      }, {
        key: "_addModelEvents",
        value: function _addModelEvents() {
          if (events_1.isEventEmitter(this.collection)) {
            this.collection.on(types_1.ModelEvents.Add, this._modelAdded, this);
            this.collection.on(types_1.ModelEvents.Remove, this._modelRemoved, this);
            this.collection.on(types_1.ModelEvents.Reset, this.render, this);
            this.collection.on(types_1.ModelEvents.Sort, this.render, this);
          }
        }
      }, {
        key: "_removeModelEvents",
        value: function _removeModelEvents() {
          if (events_1.isEventEmitter(this.collection)) {
            this.collection.off(void 0, void 0, this);
          }
        }
      }, {
        key: "_getChildViewContainer",
        value: function _getChildViewContainer() {
          var sel = this.options.childViewContainer || this.childViewContainer;
          if (!sel) return this.el;
          var el = this.el.querySelector(sel);
          if (!el) throw new Error("tag not found: ".concat(sel));
          return el;
        }
      }, {
        key: "_proxyChildViewEvents",
        value: function _proxyChildViewEvents(view) {
          var _this2 = this;

          var fn = function fn(eventName) {
            eventName = _this2.options.eventProxyName + ':' + eventName;

            for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
              args[_key2 - 1] = arguments[_key2];
            }

            utils_1.triggerMethodOn.apply(utils_1, [_this2, eventName].concat(_toConsumableArray([view].concat(args))));
          };

          view.on('*', fn);
        }
      }, {
        key: "destroy",
        value: function destroy() {
          this._removeChildViews();

          _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), "destroy", this).call(this);
        }
      }, {
        key: "collection",
        set: function set(collection) {
          this.setCollection(collection);
        },
        get: function get() {
          return this._collection;
        }
      }, {
        key: "childViews",
        get: function get() {
          return this._childViews;
        }
      }]);

      return _class;
    }(Base)
  );
}

exports.withCollection = withCollection;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return _get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var utils_1 = __webpack_require__(0);

var events_1 = __webpack_require__(1);

function withModel(Base) {
  return (
    /*#__PURE__*/
    function (_Base) {
      _inherits(_class, _Base);

      function _class() {
        _classCallCheck(this, _class);

        return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
      }

      _createClass(_class, [{
        key: "setModel",
        value: function setModel(model) {
          utils_1.triggerMethodOn(this, 'before:set:model');

          if (this._model) {
            this._undelegateModelEvents(this._model);
          }

          this._model = model;
          if (model) this._delegateModelEvents(model);
          utils_1.triggerMethodOn(this, 'set:model');
          return this;
        }
      }, {
        key: "_undelegateModelEvents",
        value: function _undelegateModelEvents(model) {
          var _this = this;

          if (!this.modelEvents || !model || !events_1.isEventEmitter(model)) {
            return;
          }

          var _loop = function _loop(key) {
            _this.modelEvents[key].forEach(function (m) {
              if (utils_1.isString(m)) {
                if (utils_1.isFunction(_this[m])) {
                  m = _this[m];
                } else {
                  throw new Error('not a function');
                }
              }

              model.off(key, m, _this);
            });
          };

          for (var key in this.modelEvents) {
            _loop(key);
          }
        }
      }, {
        key: "_delegateModelEvents",
        value: function _delegateModelEvents(model) {
          var _this2 = this;

          if (!this.modelEvents || !model || !events_1.isEventEmitter(model)) {
            return;
          }

          var _loop2 = function _loop2(key) {
            _this2.modelEvents[key].forEach(function (m) {
              if (utils_1.isString(m)) {
                if (utils_1.isFunction(_this2[m])) {
                  m = _this2[m];
                } else {
                  throw new Error('not a function');
                }
              }

              model.on(key, m, _this2);
            });
          };

          for (var key in this.modelEvents) {
            _loop2(key);
          }
        }
      }, {
        key: "destroy",
        value: function destroy() {
          if (this.model) this._undelegateModelEvents(this.model);
          return _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), "destroy", this).call(this);
        }
      }, {
        key: "model",
        set: function set(model) {
          this.setModel(model);
        },
        get: function get() {
          return this._model;
        }
      }]);

      return _class;
    }(Base)
  );
}

exports.withModel = withModel;

/***/ })
/******/ ]);