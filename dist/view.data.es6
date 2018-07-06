import { isFunction, equal, triggerMethodOn, has, extend, Invoker, isString, result, Base } from '@viewjs/utils';
import { EventEmitter, isEventEmitter, withEventListener } from '@viewjs/events';
import { View, withTemplate, withElement } from '@viewjs/view';
import { setValue, getValue, html } from '@viewjs/html';

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

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = _getPrototypeOf(object);
    if (object === null) break;
  }

  return object;
}

function _get(target, property, receiver) {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    _get = Reflect.get;
  } else {
    _get = function _get(target, property, receiver) {
      var base = _superPropBase(target, property);

      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);

      if (desc.get) {
        return desc.get.call(receiver);
      }

      return desc.value;
    };
  }

  return _get(target, property, receiver || target);
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

var MetaKeys;

(function (MetaKeys) {
  MetaKeys.Attributes = Symbol("attributes");
})(MetaKeys || (MetaKeys = {}));

function isDestroyable(a) {
  return a && isFunction(a.destroy);
}
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
})(ModelEvents || (ModelEvents = {}));

var Model =
/*#__PURE__*/
function (_EventEmitter) {
  _inherits(Model, _EventEmitter);

  function Model(attrs) {
    var _this;

    _classCallCheck(this, Model);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Model).call(this));
    _this._idAttribute = void 0;
    _this[MetaKeys.Attributes] = new Map();

    if (attrs) {
      for (var k in attrs) {
        _this.set(k, attrs[k], {
          silent: true
        });
      }
    }

    return _this;
  }

  _createClass(Model, [{
    key: "set",
    value: function set(key, value, options) {
      var old = this.get(key);

      if (equal(old, value)) {
        return this;
      }

      this[MetaKeys.Attributes].set(key, value);
      if (options && options.silent) return this;
      triggerMethodOn(this, "change:".concat(key), old, value);
      triggerMethodOn(this, 'change', _defineProperty({}, key, value));
      return this;
    }
  }, {
    key: "get",
    value: function get(key) {
      return this[MetaKeys.Attributes].get(key);
    }
  }, {
    key: "has",
    value: function has$$1(key) {
      return this[MetaKeys.Attributes].has(key);
    }
  }, {
    key: "unset",
    value: function unset(key) {
      var t = this.get(key);
      this[MetaKeys.Attributes].delete(key);
      return t;
    }
  }, {
    key: "clear",
    value: function clear() {
      this[MetaKeys.Attributes] = new Map();
      triggerMethodOn(this, 'clear');
      return this;
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      var out = {};
      this[MetaKeys.Attributes].forEach(function (value, key) {
        out[key] = value;
      });
      return out;
    }
  }, {
    key: "idAttribute",
    get: function get() {
      if (!this._idAttribute) {
        this._idAttribute = Reflect.getOwnMetadata("primaryKey", this.constructor) || 'id';
      }

      return this._idAttribute;
    },
    set: function set(attr) {
      this._idAttribute = attr;
    }
  }, {
    key: "id",
    get: function get() {
      return this.get(this.idAttribute);
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
function primaryKey(prop) {
  return function (target) {
    Reflect.defineMetadata("primaryKey", prop, target);
  };
}

function _event(event, property, target, prop, desc, targetKey) {
  if (!desc) throw new Error('no description');

  if (typeof desc.value !== 'function') {
    throw new TypeError('must be a function');
  }

  var key = event + (property ? ':' + property : '');

  if (target[targetKey] && has(target[targetKey], key)) {
    var old = target[targetKey][key];
    if (!Array.isArray(old)) old = [old];
    old.push(prop);
    target[targetKey][key] = old;
  } else {
    target[targetKey] = extend(target[targetKey] || {}, _defineProperty({}, key, [prop]));
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
})(model || (model = {}));

var collection;

(function (collection) {
  function event(event, property) {
    return function (target, prop, desc) {
      return _event(event, property, target, prop, desc, "collectionEvents");
    };
  }

  collection.event = event;
  collection.add = event("add");
  collection.remove = event("remove");
})(collection || (collection = {}));

var ArrayCollection =
/*#__PURE__*/
function (_EventEmitter) {
  _inherits(ArrayCollection, _EventEmitter);

  function ArrayCollection() {
    var _this;

    var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    _classCallCheck(this, ArrayCollection);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ArrayCollection).call(this));
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
      if (trigger) this.trigger(ModelEvents.Add, m, this.a.length - 1);
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
      if (trigger) this.trigger(ModelEvents.Remove, m, this.a.length);
      return m;
    }
  }, {
    key: "insert",
    value: function insert(m, index) {
      if (index >= this.length) return;
      this.a.splice(index, 0, m);
      this.trigger(ModelEvents.Add, m, index);
    }
  }, {
    key: "indexOf",
    value: function indexOf(m) {
      for (var i = 0, ii = this.length; i < ii; i++) {
        if (equal(this.a[i], m)) return i;
      }

      return -1;
    }
  }, {
    key: "removeAtIndex",
    value: function removeAtIndex(index) {
      var m = this.item(index);
      if (!m) return undefined;
      this.trigger(ModelEvents.BeforeRemove, m, index);
      this.a.splice(index, 1);
      this.trigger(ModelEvents.Remove, m, index);
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
      this.trigger(ModelEvents.BeforeSort);
      this.a.sort(fn);
      this.trigger(ModelEvents.Sort);
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
      this.trigger(ModelEvents.Reset);
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
      return _toConsumableArray(this.a);
    }
  }, {
    key: "length",
    get: function get() {
      return this.a.length;
    }
  }]);

  return ArrayCollection;
}(EventEmitter);

function withCollection(Base$$1, CView, CCollection) {
  return (
    /*#__PURE__*/
    function (_Base) {
      _inherits(_class, _Base);

      function _class() {
        var _getPrototypeOf2;

        var _this;

        _classCallCheck(this, _class);

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_class)).call.apply(_getPrototypeOf2, [this].concat(args)));
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

          _get(_getPrototypeOf(_class.prototype), "render", this).call(this);

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

          if (isEventEmitter(view)) this._proxyChildViewEvents(view);
        }
      }, {
        key: "_createChildView",
        value: function _createChildView(model) {
          var Vi = this.options.childView || this.ChildView || View;
          var el = Invoker.get(Vi);
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
          if (isEventEmitter(this.collection)) {
            this.collection.on(ModelEvents.Add, this._modelAdded, this);
            this.collection.on(ModelEvents.Remove, this._modelRemoved, this);
            this.collection.on(ModelEvents.Reset, this.render, this);
            this.collection.on(ModelEvents.Sort, this.render, this);
          }
        }
      }, {
        key: "_removeModelEvents",
        value: function _removeModelEvents() {
          if (isEventEmitter(this.collection)) {
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

            triggerMethodOn.apply(void 0, [_this2, eventName].concat(_toConsumableArray([view].concat(args))));
          };

          view.on('*', fn);
        }
      }, {
        key: "destroy",
        value: function destroy() {
          this._removeChildViews();

          _get(_getPrototypeOf(_class.prototype), "destroy", this).call(this);
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
    }(Base$$1)
  );
}

function withModel(Base$$1, Model) {
  return (
    /*#__PURE__*/
    function (_Base) {
      _inherits(_class, _Base);

      function _class() {
        var _this;

        _classCallCheck(this, _class);

        _this = _possibleConstructorReturn(this, _getPrototypeOf(_class).apply(this, arguments));
        _this.Model = Model;
        return _this;
      }

      _createClass(_class, [{
        key: "setModel",
        value: function setModel(model) {
          triggerMethodOn(this, 'before:set:model');

          if (this._model) {
            this._undelegateModelEvents(this._model);
          }

          this._model = model;
          if (model) this._delegateModelEvents(model);
          triggerMethodOn(this, 'set:model');
          return this;
        }
      }, {
        key: "_undelegateModelEvents",
        value: function _undelegateModelEvents(model) {
          var _this2 = this;

          if (!this.modelEvents || !model || !isEventEmitter(model)) {
            return;
          }

          var _loop = function _loop(key) {
            _this2.modelEvents[key].forEach(function (m) {
              if (isString(m)) {
                if (isFunction(_this2[m])) {
                  m = _this2[m];
                } else {
                  throw new Error('not a function');
                }
              }

              model.off(key, m, _this2);
            });
          };

          for (var key in this.modelEvents) {
            _loop(key);
          }
        }
      }, {
        key: "_delegateModelEvents",
        value: function _delegateModelEvents(model) {
          var _this3 = this;

          if (!this.modelEvents || !model || !isEventEmitter(model)) {
            return;
          }

          var _loop2 = function _loop2(key) {
            _this3.modelEvents[key].forEach(function (m) {
              if (isString(m)) {
                if (isFunction(_this3[m])) {
                  m = _this3[m];
                } else {
                  throw new Error('not a function');
                }
              }

              model.on(key, m, _this3);
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
          return _get(_getPrototypeOf(_class.prototype), "destroy", this).call(this);
        }
      }, {
        key: "model",
        set: function set(model) {
          this.setModel(model);
        },
        get: function get$$1() {
          if (!this._model && this.Model) {
            var model = void 0;

            try {
              model = Invoker.get(this.Model);
              this.setModel(model);
            } catch (e) {}
          }

          return this._model;
        }
      }]);

      return _class;
    }(Base$$1)
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

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TemplateView).call(this, options));

    if (options.template) {
      _this.template = options.template;
    }

    return _this;
  }

  _createClass(TemplateView, [{
    key: "getTemplateData",
    value: function getTemplateData() {
      if (this.model && isFunction(this.model.toJSON)) {
        return this.model.toJSON();
      }

      return result(this, 'model');
    }
  }]);

  return TemplateView;
}(withTemplate(withElement(View)));

var ModelCollection =
/*#__PURE__*/
function (_ArrayCollection) {
  _inherits(ModelCollection, _ArrayCollection);

  function ModelCollection() {
    var _this;

    _classCallCheck(this, ModelCollection);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ModelCollection).apply(this, arguments));
    _this.Model = Model;
    return _this;
  }

  _createClass(ModelCollection, [{
    key: "createModel",
    value: function createModel(o) {
      var model = Invoker.get(this.Model);

      if (o) {
        for (var key in o) {
          model.set(key, o[key]);
        }
      }

      return model;
    }
  }, {
    key: "push",
    value: function push(m) {
      var trigger = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      if (!(m instanceof this.Model)) {
        m = this.createModel(m);
      }

      return _get(_getPrototypeOf(ModelCollection.prototype), "push", this).call(this, m, trigger);
    }
  }]);

  return ModelCollection;
}(ArrayCollection);

var twoWay = ['input', 'textarea', 'select'];

var Binding =
/*#__PURE__*/
function (_withEventListener) {
  _inherits(Binding, _withEventListener);

  function Binding(model, prop, element) {
    var _this;

    _classCallCheck(this, Binding);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Binding).call(this));
    _this.model = model;
    _this.prop = prop;
    _this.element = element;
    _this._bounded = void 0;
    if (isEventEmitter(_this.model)) _this.listenTo(_this.model, 'change:' + prop, _this.onModelChanged);
    _this.onElementChanged = _this.onElementChanged.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    var tagName = element.tagName.toLowerCase();

    if (~twoWay.indexOf(tagName)) {
      _this._bounded = 'change';

      if (tagName == 'input' || tagName == 'textarea') {
        element.addEventListener('keyup', _this.onElementChanged);
        _this._bounded = 'keyup';
      } else element.addEventListener('change', _this.onElementChanged);
    }

    _this.onModelChanged();

    return _this;
  }

  _createClass(Binding, [{
    key: "onModelChanged",
    value: function onModelChanged() {
      if (this._bounded) {
        setValue(this.element, this.model.get(this.prop) || '');
      } else {
        this.element.innerText = this.model.get(this.prop) || '';
      }
    }
  }, {
    key: "onElementChanged",
    value: function onElementChanged() {
      this.model.set(this.prop, getValue(this.element));
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.stopListening();
      if (this._bounded && this.element) this.element.removeEventListener(this._bounded, this.onElementChanged);
    }
  }]);

  return Binding;
}(withEventListener(Base));

function withBindings(Base$$1) {
  return (
    /*#__PURE__*/
    function (_Base) {
      _inherits(_class, _Base);

      function _class() {
        _classCallCheck(this, _class);

        return _possibleConstructorReturn(this, _getPrototypeOf(_class).apply(this, arguments));
      }

      _createClass(_class, [{
        key: "setModel",
        value: function setModel(model) {
          if (this.model) this._unbindModelDom();
          return _get(_getPrototypeOf(_class.prototype), "setModel", this).call(this, model);
        }
      }, {
        key: "delegateEvents",
        value: function delegateEvents() {
          _get(_getPrototypeOf(_class.prototype), "delegateEvents", this).call(this);

          this._bindModelDom();
        }
      }, {
        key: "undelegateEvents",
        value: function undelegateEvents() {
          this._unbindModelDom();

          return _get(_getPrototypeOf(_class.prototype), "undelegateEvents", this).call(this);
        }
      }, {
        key: "_unbindModelDom",
        value: function _unbindModelDom() {
          if (!this.el || !this.model || !this._bindings) return;

          this._bindings.forEach(function (m) {
            return m.destroy();
          });

          this._bindings.length = 0;
        }
      }, {
        key: "_bindModelDom",
        value: function _bindModelDom() {
          var _this2 = this;

          if (!this.el || !this.model) return;
          var bindings = (this.bindings || []).concat(this._parse());
          this._bindings = bindings.map(function (m) {
            var el;
            if (isString(m.selector)) el = _this2.el.querySelector(m.selector);else el = m.selector;
            if (!el) throw ReferenceError("could not find element with selector '".concat(m.selector, "'"));
            return new Binding(_this2.model, m.prop, el);
          });
        }
      }, {
        key: "_parse",
        value: function _parse() {
          return html(this.el).find('[bind]').map(function (m) {
            return {
              selector: m,
              prop: m.getAttribute('bind')
            };
          });
        }
      }]);

      return _class;
    }(Base$$1)
  );
}

export { Model, property, primaryKey, model, collection, ArrayCollection, withCollection, MetaKeys, isDestroyable, ModelEvents, withModel, TemplateView, ModelCollection, withBindings };
