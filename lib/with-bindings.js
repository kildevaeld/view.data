"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("@viewjs/events");
const html_1 = require("@viewjs/html");
const utils_1 = require("@viewjs/utils");
const twoWay = ['input', 'textarea', 'select'], keyupTypes = ['text', 'number', 'email'];
class Binding extends events_1.withEventListener(utils_1.Base) {
    constructor(model, prop, element) {
        super();
        this.model = model;
        this.prop = prop;
        this.element = element;
        this._bounded = void 0;
        this._setting = false;
        if (events_1.isEventEmitter(this.model))
            this.listenTo(this.model, 'change:' + prop, this.onModelChanged);
        this.onElementChanged = this.onElementChanged.bind(this);
        let tagName = element.tagName.toLowerCase();
        if (~twoWay.indexOf(tagName)) {
            this._bounded = 'change';
            if ((tagName == 'input' && ~keyupTypes.indexOf(element.getAttribute('type'))) || tagName == 'textarea') {
                element.addEventListener('keyup', this.onElementChanged);
                this._bounded = 'keyup';
            }
            else
                element.addEventListener('change', this.onElementChanged);
        }
        if (this.model.has(prop))
            this.onModelChanged();
        else
            this.onElementChanged();
    }
    onModelChanged() {
        if (this._setting)
            return;
        this._setting = true;
        if (this._bounded) {
            html_1.setValue(this.element, this.model.get(this.prop) || '');
        }
        else {
            this.element.innerText = this.model.get(this.prop) || '';
        }
        this._setting = false;
    }
    onElementChanged() {
        if (this._setting)
            return;
        this._setting = true;
        this.model.set(this.prop, html_1.getValue(this.element) || null);
        this._setting = false;
    }
    destroy() {
        this.stopListening();
        if (this._bounded && this.element)
            this.element.removeEventListener(this._bounded, this.onElementChanged);
    }
}
exports.Binding = Binding;
function withBindings(Base) {
    return class extends Base {
        setModel(model, trigger = true) {
            if (this.model)
                this._unbindModelDom();
            return super.setModel(model, trigger);
        }
        delegateEvents() {
            super.delegateEvents();
            this._bindModelDom();
        }
        undelegateEvents() {
            this._unbindModelDom();
            return super.undelegateEvents();
        }
        _unbindModelDom() {
            if (!this.el || !this.model || !this._bindings)
                return;
            this._bindings.forEach(m => m.destroy());
            this._bindings.length = 0;
        }
        _bindModelDom() {
            if (!this.el || !this.model)
                return;
            const bindings = (this.bindings || []).concat(this._parse());
            this._bindings = bindings.map(m => {
                let el;
                if (utils_1.isString(m.selector))
                    el = this.el.querySelector(m.selector);
                else
                    el = m.selector;
                if (!el)
                    throw ReferenceError(`could not find element with selector '${m.selector}' in context`);
                return new Binding(this.model, m.prop, el);
            });
        }
        _parse() {
            const attr = utils_1.getOption('bindingAttribute', [this, this.options]) || 'bind';
            return html_1.html(this.el).find(`[${attr}]`).map(m => {
                return {
                    selector: m,
                    prop: m.getAttribute(attr)
                };
            });
        }
    };
}
exports.withBindings = withBindings;
