"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const view_1 = require("view");
const types_1 = require("./types");
const mixins_events_1 = require("mixins.events");
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
            if (!this.collection || !this.el)
                return this;
            this._renderCollection();
            this.delegateEvents();
            return this;
        }
        setCollection(collection) {
            if (this._collection == collection)
                return;
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
                if (v.el && v.el.parentNode)
                    v.el.parentElement.removeChild(v.el);
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
                if (!item)
                    throw RangeError("invalid index");
                let view = this._createChildView(item);
                this._renderChildView(view);
                this._attachChildView(frag, view, i);
            }
            container.appendChild(frag);
        }
        _renderChildView(view) {
            view.render();
        }
        _attachChildView(container, view, index) {
            if (index >= this._childViews.length) {
                container.appendChild(view.el);
                this._childViews.push(view);
            }
            else {
                let after = this._childViews[index];
                this._childViews.splice(index, 0, view);
                container.insertBefore(view.el, after.el);
            }
            if (mixins_events_1.isEventEmitter(view))
                this._proxyChildViewEvents(view);
        }
        _createChildView(model) {
            let Vi = this.options.childView || this.ChildView || view_1.View;
            let el = view_1.Invoker.get(Vi);
            el.model = model;
            el.options.attachId = true;
            return el;
        }
        _destroyChildView(view) {
            let index = this._childViews.indexOf(view);
            this._childViews.splice(index, 1);
            let container = this._getChildViewContainer();
            container.removeChild(view.el);
            view.destroy();
        }
        _modelAdded(item, index) {
            if (!this.el)
                return;
            let view = this._createChildView(item);
            this._renderChildView(view);
            this._attachChildView(this._getChildViewContainer(), view, index);
        }
        _modelRemoved(_, index) {
            if (!this.el)
                return;
            let view = this._childViews[index];
            this._destroyChildView(view);
        }
        _addModelEvents() {
            if (mixins_events_1.isEventEmitter(this.collection)) {
                this.collection.on(types_1.ModelEvents.Add, this._modelAdded, this);
                this.collection.on(types_1.ModelEvents.Remove, this._modelRemoved, this);
                this.collection.on(types_1.ModelEvents.Reset, this.render, this);
                this.collection.on(types_1.ModelEvents.Sort, this.render, this);
            }
        }
        _removeModelEvents() {
            if (mixins_events_1.isEventEmitter(this.collection)) {
                this.collection.off(void 0, void 0, this);
            }
        }
        _getChildViewContainer() {
            let sel = this.options.childViewContainer || this.childViewContainer;
            if (!sel)
                return this.el;
            let el = this.el.querySelector(sel);
            if (!el)
                throw new Error(`tag not found: ${sel}`);
            return el;
        }
        _proxyChildViewEvents(view) {
            const fn = (eventName, ...args) => {
                eventName = this.options.eventProxyName + ':' + eventName;
                view_1.triggerMethodOn(this, eventName, ...[view].concat(args));
            };
            view.on('*', fn);
        }
        destroy() {
            this._removeChildViews();
            super.destroy();
        }
    };
}
exports.withCollection = withCollection;
