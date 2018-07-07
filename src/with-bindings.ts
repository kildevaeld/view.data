import { View } from '@viewjs/view';
import { withEventListener, IEventListener, isEventEmitter } from '@viewjs/events';
import { IModel } from './types';
import { IModelController } from './with-model';
import { setValue, getValue, html } from '@viewjs/html';
import { isString, Constructor, Base, getOption } from '@viewjs/utils';


export interface IBindableView {
    bindings: BindingDescription[];
}

export interface BindingDescription {
    prop: string;
    selector: string | HTMLElement;
}

const twoWay = ['input', 'textarea', 'select'],
    keyupTypes = ['text', 'number', 'email']


class Binding extends withEventListener(Base) implements IEventListener {
    private _bounded: string | undefined = void 0;
    private _setting = false;
    constructor(
        public model: IModel,
        public prop: string,
        public element: HTMLElement
    ) {
        super();

        if (isEventEmitter(this.model))
            this.listenTo(this.model, 'change:' + prop, this.onModelChanged);

        this.onElementChanged = this.onElementChanged.bind(this);
        let tagName = element.tagName.toLowerCase();
        if (~twoWay.indexOf(tagName)) {
            this._bounded = 'change';
            if ((tagName == 'input' && ~keyupTypes.indexOf(element.getAttribute('type'))) || tagName == 'textarea') {
                element.addEventListener('keyup', this.onElementChanged);
                this._bounded = 'keyup';
            } else
                element.addEventListener('change', this.onElementChanged);
        }

        this.onModelChanged();
    }


    onModelChanged() {
        if (this._setting) return;
        this._setting = true;
        if (this._bounded) {
            setValue(this.element, this.model.get(this.prop) || '');
        } else {
            this.element.innerText = this.model.get(this.prop) || '';
        }
        this._setting = false;
    }

    onElementChanged() {
        if (this._setting) return;
        this._setting = true;
        this.model.set(this.prop, getValue(this.element));
        this._setting = false;
    }

    destroy() {
        this.stopListening();
        if (this._bounded && this.element)
            this.element.removeEventListener(this._bounded, this.onElementChanged);
    }

}

export interface BindingViewOptions {
    bindingAttribute?: string;
}

export function withBindings<T extends Constructor<View> & Constructor<IModelController<M>>, M extends IModel>(Base: T): T & Constructor<IBindableView> {
    return class extends Base {
        bindings: BindingDescription[];

        private _bindings: Binding[];

        setModel(model: M, trigger = true) {
            if (this.model) this._unbindModelDom();
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

        private _unbindModelDom() {
            if (!this.el || !this.model || !this._bindings) return;
            this._bindings.forEach(m => m.destroy());
            this._bindings.length = 0;
        }

        private _bindModelDom() {
            if (!this.el || !this.model) return;

            const bindings = (this.bindings || []).concat(this._parse());

            this._bindings = bindings.map(m => {
                let el: HTMLElement;
                if (isString(m.selector))
                    el = this.el.querySelector(m.selector);
                else
                    el = m.selector;
                if (!el) throw ReferenceError(`could not find element with selector '${m.selector}' in context`);
                return new Binding(this.model, m.prop, el);
            });
        }

        private _parse() {
            const attr = getOption<string>('bindingAttribute', [this, this.options]) || 'bind'
            return html(this.el).find(`[${attr}]`).map(m => {
                return {
                    selector: m,
                    prop: m.getAttribute(attr)
                };
            });
        }

    }

}