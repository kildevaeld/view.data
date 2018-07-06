import { BaseView } from '@viewjs/view';
import { withEventListener, IEventListener } from '@viewjs/events';
import { Model } from './model';
import { IModelView } from './model-view';
import { setValue, getValue, html } from '@viewjs/html';
import { isString, Constructor, Base } from '@viewjs/utils';

export interface IBindableView<M extends Model> {
    bindings: BindingDescription[];
}

export interface BindingDescription {
    prop: string;
    selector: string | HTMLElement;
}

const twoWay = ['input', 'textarea', 'select'];


export class Binding extends withEventListener(Base) implements IEventListener {
    private _bounded: string | undefined = void 0;
    constructor(
        public model: Model,
        public prop: string,
        public element: HTMLElement
    ) {
        super();
        this.listenTo(this.model, 'change:' + prop, this.onModelChanged);
        this.onElementChanged = this.onElementChanged.bind(this);
        let tagName = element.tagName.toLowerCase();
        if (~twoWay.indexOf(tagName)) {
            this._bounded = 'change';
            if (tagName == 'input' || tagName == 'textarea') {
                element.addEventListener('keyup', this.onElementChanged);
                this._bounded = 'keyup';
            } else
                element.addEventListener('change', this.onElementChanged);

        }
        this.onModelChanged();
    }


    onModelChanged() {
        if (this._bounded) {
            setValue(this.element, this.model.get(this.prop));
        } else {
            this.element.innerText = this.model.get(this.prop);
        }

    }

    onElementChanged() {
        this.model.set(this.prop, getValue(this.element));
    }

    destroy() {
        this.stopListening();
        if (this._bounded && this.element)
            this.element.removeEventListener(this._bounded, this.onElementChanged);
    }

}

export function withBindings<T extends Constructor<BaseView> & Constructor<IModelView<M>>, M extends Model>(Base: T, Model?: Constructor<M>): T & Constructor<IBindableView<M>> {
    return class extends Base {
        bindings: BindingDescription[];

        private _bindings: Binding[];

        setModel(model: M) {
            if (this.model) this._unbindModelDom();
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

        private _unbindModelDom() {
            if (!this.el || !this.model || !this._bindings) return;
            this._bindings.forEach(m => m.destroy());
            this._bindings.length = 0;
        }

        private _bindModelDom() {
            if (!this.el || !this.model) return;

            // if (!this.bindings || !this.bindings.length) {

            // }
            this.bindings = this._parse();

            this._bindings = this.bindings.map(m => {
                let el: HTMLElement;
                if (isString(m.selector))
                    el = this.el.querySelector(m.selector);
                else
                    el = m.selector;
                if (!el) throw ReferenceError(`could not find element with selector '${m.selector}'`);
                return new Binding(this.model, m.prop, el);
            });
        }

        private _parse() {
            return html(this.el).find('[bind]').map(m => {
                return {
                    selector: m,
                    prop: m.getAttribute('bind')
                };
            });
        }

    }

}