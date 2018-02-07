(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('view'), require('mixins.events'), require('equaljs')) :
	typeof define === 'function' && define.amd ? define(['exports', 'view', 'mixins.events', 'equaljs'], factory) :
	(factory((global.view = global.view || {}, global.view.data = {}),global.view,global.mixins.events,global.equaljs));
}(this, (function (exports,view,events,equaljs) { 'use strict';

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

class BaseObject {}

class EventEmitter extends events.EventEmitter(BaseObject) {}

class Model extends EventEmitter {
  constructor() {
    super();
    this[exports.MetaKeys.Attributes] = new Map();
  }

  set(key, value, options) {
    let old = this.get(key);

    if (equaljs.equal(old, value)) {
      return this;
    }

    this[exports.MetaKeys.Attributes].set(key, value);
    if (options && options.silent) return this;
    view.triggerMethodOn(this, `change:${key}`, old, value);
    view.triggerMethodOn(this, 'change', {
      [key]: value
    });
    return this;
  }

  get(key) {
    return this[exports.MetaKeys.Attributes].get(key);
  }

  has(key) {
    return this[exports.MetaKeys.Attributes].has(key);
  }

  clear() {
    this[exports.MetaKeys.Attributes] = new Map();
    view.triggerMethodOn(this, 'clear');
    return this;
  }

  toJSON(_ = false) {
    let out = {};
    this[exports.MetaKeys.Attributes].forEach((value, key) => {
      out[key] = value;
    });
    return out;
  }

}

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

  const key = event + (property ? ':' + property : '');

  if (target[targetKey] && view.has(target[targetKey], key)) {
    let old = target[targetKey][key];
    if (!Array.isArray(old)) old = [old];
    old.push(prop);
    target[targetKey][key] = old;
  } else {
    target[targetKey] = view.extend(target[targetKey] || {}, {
      [key]: [prop]
    });
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

class ArrayCollection extends EventEmitter {
  constructor(a = []) {
    super();
    this.a = a;
  }
  /**
   * The length of the array
   *
   * @readonly
   * @type {number}
   * @memberof ArrayCollection
   */


  get length() {
    return this.a.length;
  }
  /**
   * Get item at index
   *
   * @param {number} index
   * @returns {(T | undefined)}
   *
   * @memberof ArrayCollection
   */


  item(index) {
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


  push(m) {
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


  pop(trigger = true) {
    let m = this.a.pop();
    if (trigger) this.trigger(exports.ModelEvents.Remove, m, this.a.length);
    return m;
  }

  insert(m, index) {
    if (index >= this.length) return;
    this.a.splice(index, 0, m);
    this.trigger(exports.ModelEvents.Add, m, index);
  }

  indexOf(m) {
    for (let i = 0, ii = this.length; i < ii; i++) {
      if (equaljs.equal(this.a[i], m)) return i;
    }

    return -1;
  }

  removeAtIndex(index) {
    let m = this.item(index);
    if (!m) return undefined;
    this.trigger(exports.ModelEvents.BeforeRemove, m, index);
    this.a.splice(index, 1);
    this.trigger(exports.ModelEvents.Remove, m, index);
    return m;
  }

  remove(model) {
    let i = -1;

    if (!~(i = this.indexOf(model))) {
      return void 0;
    }

    
    return this.removeAtIndex(i);
  }

  find(fn) {
    return this.a.find(fn);
  }

  sort(fn) {
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


  reset(a) {
    this.a = a || [];
    this.trigger(exports.ModelEvents.Reset);
  }

  filter(fn) {
    return Reflect.construct(this.constructor, [this.a.filter(fn)]);
  }

  map(fn) {
    return new ArrayCollection(this.a.map(fn));
  }

  destroy() {
    for (let i = 0, ii = this.a.length; i < ii; i++) {
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


  array() {
    return [...this.a];
  }

}

function withCollection(Base, CView, CCollection) {
  return class extends Base {
    constructor(...args) {
      super(...args);
      this.ChildView = CView;
      this.options.eventProxyName = this.options.eventProxyName || 'childView';
      this.collection = CCollection ? new CCollection() : void 0;
    }

    set collection(collection) {
      this.setCollection(collection);
    }

    get collection() {
      return this._collection;
    }

    get childViews() {
      return this._childViews;
    }

    render() {
      this.undelegateEvents();

      this._removeChildViews();

      super.render();
      if (!this.collection || !this.el) return this;

      this._renderCollection();

      this.delegateEvents();
      return this;
    }

    setCollection(collection) {
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

    _removeChildViews() {
      if (!this._childViews) {
        this._childViews = [];
      }

      for (let i = 0, ii = this._childViews.length; i < ii; i++) {
        const v = this._childViews[i];
        v.destroy();
        if (v.el && v.el.parentNode) v.el.parentElement.removeChild(v.el);
      }

      this._childViews = [];
    }

    _renderCollection(collection) {
      let col = collection || this.collection;

      let container = this._getChildViewContainer();

      container.innerHTML = '';
      const frag = document.createDocumentFragment();

      for (let i = 0, ii = col.length; i < ii; i++) {
        let item = col.item(i);
        if (!item) throw RangeError("invalid index");

        let view$$1 = this._createChildView(item);

        this._renderChildView(view$$1);

        this._attachChildView(frag, view$$1, i);
      }

      container.appendChild(frag);
    }

    _renderChildView(view$$1) {
      view$$1.render();
    }

    _attachChildView(container, view$$1, index) {
      if (index >= this._childViews.length) {
        container.appendChild(view$$1.el);

        this._childViews.push(view$$1);
      } else {
        let after = this._childViews[index];

        this._childViews.splice(index, 0, view$$1);

        container.insertBefore(view$$1.el, after.el);
      }

      if (events.isEventEmitter(view$$1)) this._proxyChildViewEvents(view$$1);
    }

    _createChildView(model) {
      let Vi = this.options.childView || this.ChildView || view.View;
      let el = view.Invoker.get(Vi);
      el.model = model;
      el.options.attachId = true;
      return el;
    }

    _destroyChildView(view$$1) {
      let index = this._childViews.indexOf(view$$1);

      this._childViews.splice(index, 1);

      let container = this._getChildViewContainer();

      container.removeChild(view$$1.el);
      view$$1.destroy();
    }

    _modelAdded(item, index) {
      if (!this.el) return;

      let view$$1 = this._createChildView(item);

      this._renderChildView(view$$1);

      this._attachChildView(this._getChildViewContainer(), view$$1, index);
    }

    _modelRemoved(_, index) {
      if (!this.el) return;
      let view$$1 = this._childViews[index];

      this._destroyChildView(view$$1);
    }

    _addModelEvents() {
      if (events.isEventEmitter(this.collection)) {
        this.collection.on(exports.ModelEvents.Add, this._modelAdded, this);
        this.collection.on(exports.ModelEvents.Remove, this._modelRemoved, this);
        this.collection.on(exports.ModelEvents.Reset, this.render, this);
        this.collection.on(exports.ModelEvents.Sort, this.render, this);
      }
    }

    _removeModelEvents() {
      if (events.isEventEmitter(this.collection)) {
        this.collection.off(void 0, void 0, this);
      }
    }

    _getChildViewContainer() {
      let sel = this.options.childViewContainer || this.childViewContainer;
      if (!sel) return this.el;
      let el = this.el.querySelector(sel);
      if (!el) throw new Error(`tag not found: ${sel}`);
      return el;
    }

    _proxyChildViewEvents(view$$1) {
      const fn = (eventName, ...args) => {
        eventName = this.options.eventProxyName + ':' + eventName;
        view.triggerMethodOn(this, eventName, ...[view$$1].concat(args));
      };

      view$$1.on('*', fn);
    }

    destroy() {
      this._removeChildViews();

      super.destroy();
    }

  };
}

function withModel(Base) {
  return class extends Base {
    set model(model) {
      this.setModel(model);
    }

    get model() {
      return this._model;
    }

    setModel(model) {
      view.triggerMethodOn(this, 'before:set:model');

      if (this._model) {
        this._undelegateModelEvents(this._model);
      }

      this._model = model;
      if (model) this._delegateModelEvents(model);
      view.triggerMethodOn(this, 'set:model');
      return this;
    }

    _undelegateModelEvents(model) {
      if (!this.modelEvents || !model || !events.isEventEmitter(model)) {
        return;
      }

      for (let key in this.modelEvents) {
        this.modelEvents[key].forEach(m => {
          if (view.isString(m)) {
            if (view.isFunction(this[m])) {
              m = this[m];
            } else {
              throw new Error('not a function');
            }
          }

          model.off(key, m, this);
        });
      }
    }

    _delegateModelEvents(model) {
      if (!this.modelEvents || !model || !events.isEventEmitter(model)) {
        return;
      }

      for (let key in this.modelEvents) {
        this.modelEvents[key].forEach(m => {
          if (view.isString(m)) {
            if (view.isFunction(this[m])) {
              m = this[m];
            } else {
              throw new Error('not a function');
            }
          }

          model.on(key, m, this);
        });
      }
    }

    destroy() {
      if (this.model) this._undelegateModelEvents(this.model);
      return super.destroy();
    }

  };
}

class TemplateView extends view.withTemplate(view.withElement(view.View)) {
  constructor(options = {}) {
    super(options);

    if (options.template) {
      this.template = options.template;
    }
  }

  getTemplateData() {
    if (this.model && view.isFunction(this.model.toJSON)) {
      return this.model.toJSON();
    }

    return view.result(this, 'model');
  }

}

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
