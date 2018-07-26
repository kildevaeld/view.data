import { has, extend, isFunction, getOption, isString, Base, triggerMethodOn, Invoker } from '@viewjs/utils';
import { View, withTemplate, withElement } from '@viewjs/view';
import { withEventListener, isEventEmitter } from '@viewjs/events';
import { setValue, getValue, html } from '@viewjs/html';
import { ModelCollection, ModelEvents } from '@viewjs/models';

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
      var model = getOption('model', [this.options, this], true);

      if (model && isFunction(model.toJSON)) {
        return model.toJSON();
      }

      return model;
    }
  }]);

  return TemplateView;
}(withTemplate(withElement(View)));

var twoWay = ['input', 'textarea', 'select'],
    keyupTypes = ['text', 'number', 'email'];

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
    _this._setting = false;
    if (isEventEmitter(_this.model)) _this.listenTo(_this.model, 'change:' + prop, _this.onModelChanged);
    _this.onElementChanged = _this.onElementChanged.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    var tagName = element.tagName.toLowerCase();

    if (~twoWay.indexOf(tagName)) {
      _this._bounded = 'change';

      if (tagName == 'input' && ~keyupTypes.indexOf(element.getAttribute('type')) || tagName == 'textarea') {
        element.addEventListener('keyup', _this.onElementChanged);
        _this._bounded = 'keyup';
      } else element.addEventListener('change', _this.onElementChanged);
    }

    if (_this.model.has(prop)) _this.onModelChanged();else _this.onElementChanged();
    return _this;
  }

  _createClass(Binding, [{
    key: "onModelChanged",
    value: function onModelChanged() {
      if (this._setting) return;
      this._setting = true;

      if (this._bounded) {
        setValue(this.element, this.model.get(this.prop) || '');
      } else {
        this.element.innerText = this.model.get(this.prop) || '';
      }

      this._setting = false;
    }
  }, {
    key: "onElementChanged",
    value: function onElementChanged() {
      if (this._setting) return;
      this._setting = true;
      this.model.set(this.prop, getValue(this.element) || null);
      this._setting = false;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.stopListening();
      if (this._bounded && this.element) this.element.removeEventListener(this._bounded, this.onElementChanged);
      return this;
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
          var trigger = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
          if (this.model) this._unbindModelDom();
          return _get(_getPrototypeOf(_class.prototype), "setModel", this).call(this, model, trigger);
        }
      }, {
        key: "delegateEvents",
        value: function delegateEvents(events) {
          _get(_getPrototypeOf(_class.prototype), "delegateEvents", this).call(this, events);

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
            if (!el) throw ReferenceError("could not find element with selector '".concat(m.selector, "' in context"));
            return new Binding(_this2.model, m.prop, el);
          });
        }
      }, {
        key: "_parse",
        value: function _parse() {
          var attr = getOption('bindingAttribute', [this, this.options]) || 'bind';
          return html(this.el).find("[".concat(attr, "]")).map(function (m) {
            return {
              selector: m,
              prop: m.getAttribute(attr)
            };
          });
        }
      }]);

      return _class;
    }(Base$$1)
  );
}

function withCollection(Base$$1, CView, CCollection, MModel) {
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
        _this.options.eventProxyName = getOption('childView', [_this.options]) || 'childView';
        _this.collection = CCollection ? new CCollection() : void 0;

        if (MModel && _this.collection && _this.collection instanceof ModelCollection) {
          _this.collection.Model = MModel;
        }

        return _this;
      } //readonly options: CollectionViewOptions<TElement, TView>;


      _createClass(_class, [{
        key: "render",
        value: function render() {
          //this.undelegateEvents();
          this._removeChildViews();

          _get(_getPrototypeOf(_class.prototype), "render", this).call(this);

          if (!this.collection || !this.el) return this;

          this._renderCollection();

          return this;
        }
      }, {
        key: "setCollection",
        value: function setCollection(collection) {
          if (this._collection == collection) return this;

          if (this.collection) {
            this._removeModelEvents();

            this._removeChildViews();
          }

          this._collection = collection;

          if (this.collection) {
            this._addModelEvents();
          }

          return this;
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
          var Vi = getOption('ChildView', [this.options, this]) || View;
          var el = Invoker.get(Vi);
          if (isFunction(el.isModel)) el.setModel(model, false);else el.model = model;
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
          var sel = getOption('childViewContainer', [this.options, this]);
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
            eventName = getOption('eventProxyName', [_this2.options]) + ':' + eventName;

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

export { collection, TemplateView, withBindings, Binding, withCollection };
