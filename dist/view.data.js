(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('view'), require('mixins.events'), require('equaljs')) :
	typeof define === 'function' && define.amd ? define(['exports', 'view', 'mixins.events', 'equaljs'], factory) :
	(factory((global.view = global.view || {}, global.view.data = {}),global.view,global.mixins.events,global.equaljs));
}(this, (function (exports,view,events,equaljs) { 'use strict';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
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
}

function _get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return _get(parent, property, receiver);
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
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
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
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
}

(function (MetaKeys) {
  MetaKeys.Attributes = Symbol("attributes");
})(exports.MetaKeys || (exports.MetaKeys = {}));

function isDestroyable(a) {
  return a && view.isFunction(a.destroy);
}


(function (ModelEvents) {
  ModelEvents.Add = "add";
  ModelEvents.BeforeRemove = "before:remove";
  ModelEvents.Remove = "remove";
  ModelEvents.Clear = "clear";
  ModelEvents.BeforeSort = "before:sort";
  ModelEvents.Sort = "sort";
  ModelEvents.Change = "change";
  ModelEvents.Reset = "reset";
})(exports.ModelEvents || (exports.ModelEvents = {}));

var BaseObject = function BaseObject() {
  _classCallCheck(this, BaseObject);
};

var EventEmitter =
/*#__PURE__*/
function (_events$EventEmitter) {
  _inherits(EventEmitter, _events$EventEmitter);

  function EventEmitter() {
    _classCallCheck(this, EventEmitter);

    return _possibleConstructorReturn(this, (EventEmitter.__proto__ || Object.getPrototypeOf(EventEmitter)).apply(this, arguments));
  }

  return EventEmitter;
}(events.EventEmitter(BaseObject));

var Model =
/*#__PURE__*/
function (_EventEmitter) {
  _inherits(Model, _EventEmitter);

  function Model() {
    var _this;

    _classCallCheck(this, Model);

    _this = _possibleConstructorReturn(this, (Model.__proto__ || Object.getPrototypeOf(Model)).call(this));
    _this[exports.MetaKeys.Attributes] = new Map();
    return _this;
  }

  _createClass(Model, [{
    key: "set",
    value: function set(key, value, options) {
      var old = this.get(key);

      if (equaljs.equal(old, value)) {
        return this;
      }

      this[exports.MetaKeys.Attributes].set(key, value);
      if (options && options.silent) return this;
      view.triggerMethodOn(this, "change:".concat(key), old, value);
      view.triggerMethodOn(this, 'change', _defineProperty({}, key, value));
      return this;
    }
  }, {
    key: "get",
    value: function get(key) {
      return this[exports.MetaKeys.Attributes].get(key);
    }
  }, {
    key: "has",
    value: function has(key) {
      return this[exports.MetaKeys.Attributes].has(key);
    }
  }, {
    key: "clear",
    value: function clear() {
      this[exports.MetaKeys.Attributes] = new Map();
      view.triggerMethodOn(this, 'clear');
      return this;
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      var out = {};
      this[exports.MetaKeys.Attributes].forEach(function (value, key) {
        out[key] = value;
      });
      return out;
    }
  }]);

  return Model;
}(EventEmitter);

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

function _event(event, property, target, prop, desc, targetKey) {
  if (!desc) throw new Error('no description');

  if (typeof desc.value !== 'function') {
    throw new TypeError('must be a function');
  }

  var key = event + (property ? ':' + property : '');

  if (target[targetKey] && view.has(target[targetKey], key)) {
    var old = target[targetKey][key];
    if (!Array.isArray(old)) old = [old];
    old.push(prop);
    target[targetKey][key] = old;
  } else {
    target[targetKey] = view.extend(target[targetKey] || {}, _defineProperty({}, key, [prop]));
  }
}



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
})(exports.model || (exports.model = {}));



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
})(exports.collection || (exports.collection = {}));

var ArrayCollection =
/*#__PURE__*/
function (_EventEmitter) {
  _inherits(ArrayCollection, _EventEmitter);

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
      this.a.push(m);
      this.trigger(exports.ModelEvents.Add, m, this.a.length - 1);
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
      if (trigger) this.trigger(exports.ModelEvents.Remove, m, this.a.length);
      return m;
    }
  }, {
    key: "insert",
    value: function insert(m, index) {
      if (index >= this.length) return;
      this.a.splice(index, 0, m);
      this.trigger(exports.ModelEvents.Add, m, index);
    }
  }, {
    key: "indexOf",
    value: function indexOf(m) {
      for (var i = 0, ii = this.length; i < ii; i++) {
        if (equaljs.equal(this.a[i], m)) return i;
      }

      return -1;
    }
  }, {
    key: "removeAtIndex",
    value: function removeAtIndex(index) {
      var m = this.item(index);
      if (!m) return undefined;
      this.trigger(exports.ModelEvents.BeforeRemove, m, index);
      this.a.splice(index, 1);
      this.trigger(exports.ModelEvents.Remove, m, index);
      return m;
    }
  }, {
    key: "remove",
    value: function remove(model) {
      var i = -1;

      if (!~(i = this.indexOf(model))) {
        return void 0;
      }

      
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
      this.trigger(exports.ModelEvents.BeforeSort);
      this.a.sort(fn);
      this.trigger(exports.ModelEvents.Sort);
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
      this.trigger(exports.ModelEvents.Reset);
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
        if (isDestroyable(this.a[i])) this.a[i].destroy();
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
}(EventEmitter);

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

            var view$$1 = this._createChildView(item);

            this._renderChildView(view$$1);

            this._attachChildView(frag, view$$1, i);
          }

          container.appendChild(frag);
        }
      }, {
        key: "_renderChildView",
        value: function _renderChildView(view$$1) {
          view$$1.render();
        }
      }, {
        key: "_attachChildView",
        value: function _attachChildView(container, view$$1, index) {
          if (index >= this._childViews.length) {
            container.appendChild(view$$1.el);

            this._childViews.push(view$$1);
          } else {
            var after = this._childViews[index];

            this._childViews.splice(index, 0, view$$1);

            container.insertBefore(view$$1.el, after.el);
          }

          if (events.isEventEmitter(view$$1)) this._proxyChildViewEvents(view$$1);
        }
      }, {
        key: "_createChildView",
        value: function _createChildView(model) {
          var Vi = this.options.childView || this.ChildView || view.View;
          var el = view.Invoker.get(Vi);
          el.model = model;
          el.options.attachId = true;
          return el;
        }
      }, {
        key: "_destroyChildView",
        value: function _destroyChildView(view$$1) {
          var index = this._childViews.indexOf(view$$1);

          this._childViews.splice(index, 1);

          var container = this._getChildViewContainer();

          container.removeChild(view$$1.el);
          view$$1.destroy();
        }
      }, {
        key: "_modelAdded",
        value: function _modelAdded(item, index) {
          if (!this.el) return;

          var view$$1 = this._createChildView(item);

          this._renderChildView(view$$1);

          this._attachChildView(this._getChildViewContainer(), view$$1, index);
        }
      }, {
        key: "_modelRemoved",
        value: function _modelRemoved(_, index) {
          if (!this.el) return;
          var view$$1 = this._childViews[index];

          this._destroyChildView(view$$1);
        }
      }, {
        key: "_addModelEvents",
        value: function _addModelEvents() {
          if (events.isEventEmitter(this.collection)) {
            this.collection.on(exports.ModelEvents.Add, this._modelAdded, this);
            this.collection.on(exports.ModelEvents.Remove, this._modelRemoved, this);
            this.collection.on(exports.ModelEvents.Reset, this.render, this);
            this.collection.on(exports.ModelEvents.Sort, this.render, this);
          }
        }
      }, {
        key: "_removeModelEvents",
        value: function _removeModelEvents() {
          if (events.isEventEmitter(this.collection)) {
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
        value: function _proxyChildViewEvents(view$$1) {
          var _this2 = this;

          var fn = function fn(eventName) {
            eventName = _this2.options.eventProxyName + ':' + eventName;

            for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
              args[_key2 - 1] = arguments[_key2];
            }

            view.triggerMethodOn.apply(void 0, [_this2, eventName].concat(_toConsumableArray([view$$1].concat(args))));
          };

          view$$1.on('*', fn);
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
        get: function get$$1() {
          return this._collection;
        }
      }, {
        key: "childViews",
        get: function get$$1() {
          return this._childViews;
        }
      }]);

      return _class;
    }(Base)
  );
}

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
          view.triggerMethodOn(this, 'before:set:model');

          if (this._model) {
            this._undelegateModelEvents(this._model);
          }

          this._model = model;
          if (model) this._delegateModelEvents(model);
          view.triggerMethodOn(this, 'set:model');
          return this;
        }
      }, {
        key: "_undelegateModelEvents",
        value: function _undelegateModelEvents(model) {
          var _this = this;

          if (!this.modelEvents || !model || !events.isEventEmitter(model)) {
            return;
          }

          var _loop = function _loop(key) {
            _this.modelEvents[key].forEach(function (m) {
              if (view.isString(m)) {
                if (view.isFunction(_this[m])) {
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

          if (!this.modelEvents || !model || !events.isEventEmitter(model)) {
            return;
          }

          var _loop2 = function _loop2(key) {
            _this2.modelEvents[key].forEach(function (m) {
              if (view.isString(m)) {
                if (view.isFunction(_this2[m])) {
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
        get: function get$$1() {
          return this._model;
        }
      }]);

      return _class;
    }(Base)
  );
}

var TemplateView =
/*#__PURE__*/
function (_withTemplate) {
  _inherits(TemplateView, _withTemplate);

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
      if (this.model && view.isFunction(this.model.toJSON)) {
        return this.model.toJSON();
      }

      return view.result(this, 'model');
    }
  }]);

  return TemplateView;
}(view.withTemplate(view.withElement(view.View)));

exports.Model = Model;
exports.property = property;
exports.ArrayCollection = ArrayCollection;
exports.withCollection = withCollection;
exports.isDestroyable = isDestroyable;
exports.withModel = withModel;
exports.TemplateView = TemplateView;
exports.BaseObject = BaseObject;
exports.EventEmitter = EventEmitter;

Object.defineProperty(exports, '__esModule', { value: true });

})));
