"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("@viewjs/events");
const html_1 = require("@viewjs/html");
const utils_1 = require("@viewjs/utils");
const twoWay = ['input', 'textarea', 'select'];
class Binding extends events_1.withEventListener(utils_1.Base) {
    constructor(model, prop, element) {
        super();
        this.model = model;
        this.prop = prop;
        this.element = element;
        this._bounded = void 0;
        this.listenTo(this.model, 'change:' + prop, this.onModelChanged);
        this.onElementChanged = this.onElementChanged.bind(this);
        let tagName = element.tagName.toLowerCase();
        if (~twoWay.indexOf(tagName)) {
            this._bounded = 'change';
            if (tagName == 'input' || tagName == 'textarea') {
                element.addEventListener('keyup', this.onElementChanged);
                this._bounded = 'keyup';
            }
            else
                element.addEventListener('change', this.onElementChanged);
        }
        this.onModelChanged();
    }
    onModelChanged() {
        if (this._bounded) {
            html_1.setValue(this.element, this.model.get(this.prop));
        }
        else {
            this.element.innerText = this.model.get(this.prop);
        }
    }
    onElementChanged() {
        this.model.set(this.prop, html_1.getValue(this.element));
    }
    destroy() {
        this.stopListening();
        if (this._bounded && this.element)
            this.element.removeEventListener(this._bounded, this.onElementChanged);
    }
}
exports.Binding = Binding;
function withBindings(Base, Model) {
    return class extends Base {
        setModel(model) {
            if (this.model)
                this._unbindModelDom();
            return super.setModel(model);
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
            // if (!this.bindings || !this.bindings.length) {
            // }
            this.bindings = this._parse();
            this._bindings = this.bindings.map(m => {
                let el;
                if (utils_1.isString(m.selector))
                    el = this.el.querySelector(m.selector);
                else
                    el = m.selector;
                if (!el)
                    throw ReferenceError(`could not find element with selector '${m.selector}'`);
                return new Binding(this.model, m.prop, el);
            });
        }
        _parse() {
            return html_1.html(this.el).find('[bind]').map(m => {
                return {
                    selector: m,
                    prop: m.getAttribute('bind')
                };
            });
        }
    };
}
exports.withBindings = withBindings;
