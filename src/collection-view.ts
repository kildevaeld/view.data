import { Constructor, BaseView, View, BaseViewOptions, Invoker, IView } from '@viewjs/view';
import { IModel, ICollection, ModelEvents } from './types';
import { triggerMethodOn } from '@viewjs/utils';
import { isEventEmitter, IEventEmitter } from '@viewjs/events';
import { IModelView } from './model-view';

export interface ICollectionView<TCollection extends ICollection<TModel>, TModel extends IModel, TView extends ChildViewType<TModel>> {
    collection?: TCollection;
    readonly childViews: TView[];
    collectionEvents?: any;
}

export type ChildViewType<M extends IModel> = IModelView<M> & IView

export interface CollectionViewOptions<T extends Element, U extends ChildViewType<IModel>> extends BaseViewOptions<T> {
    childViewContainer?: string;
    eventProxyName?: string;
    childView?: Constructor<U>
}

export function withCollection<TBaseType extends Constructor<BaseView<TElement>>,
    TElement extends Element,
    TView extends ChildViewType<TModel>,
    TCollection extends ICollection<TModel>,
    TModel extends IModel = IModel>(Base: TBaseType, CView: Constructor<TView>, CCollection?: Constructor<TCollection>): TBaseType & Constructor<ICollectionView<TCollection, TModel, TView>> {

    return class extends Base {

        protected ChildView = CView;
        private _collection?: TCollection;
        private _childViews: TView[];

        protected childViewContainer?: string;
        readonly options: CollectionViewOptions<TElement, TView>;
        set collection(collection: TCollection | undefined) {
            this.setCollection(collection);
        }

        get collection(): TCollection | undefined {
            return this._collection;
        }

        get childViews(): TView[] {
            return this._childViews;
        }

        constructor(...args: any[]) {
            super(...args);
            this.options.eventProxyName = this.options.eventProxyName || 'childView'
            this.collection = CCollection ? new CCollection() : void 0;
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

        protected setCollection(collection?: TCollection) {
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

        protected _removeChildViews() {
            if (!this._childViews) {
                this._childViews = [];
            }

            for (let i = 0, ii = this._childViews.length; i < ii; i++) {
                const v = this._childViews[i];
                v.destroy();
                if (v.el && v.el.parentNode)
                    v.el!.parentElement!.removeChild(v.el)
            }

            this._childViews = [];
        }

        protected _renderCollection(collection?: TCollection) {
            let col = collection || this.collection;

            let container = this._getChildViewContainer();

            container.innerHTML = '';

            const frag = document.createDocumentFragment();

            for (let i = 0, ii = col!.length; i < ii; i++) {
                let item = col!.item(i);
                if (!item) throw RangeError("invalid index");
                let view = this._createChildView(item);
                this._renderChildView(view);
                this._attachChildView(frag, view, i);
            }

            container.appendChild(frag);
        }



        protected _renderChildView(view: TView) {
            view.render();
        }

        protected _attachChildView(container: Node, view: TView, index: number) {
            if (index >= this._childViews.length) {
                container.appendChild(view.el!);
                this._childViews.push(view);
            } else {
                let after = this._childViews[index];
                this._childViews.splice(index, 0, view);
                container.insertBefore(view.el!, after.el!);
            }

            if (isEventEmitter(view))
                this._proxyChildViewEvents(view);

        }


        protected _createChildView(model: TModel): TView {
            let Vi: Constructor<any> = this.options.childView || this.ChildView || (View as any);

            let el = Invoker.get<any>(Vi);
            el.model = model;
            el.options.attachId = true;

            return el as TView;

        }

        protected _destroyChildView(view: TView) {
            let index = this._childViews.indexOf(view);
            this._childViews.splice(index, 1);
            let container = this._getChildViewContainer();
            container.removeChild(view.el!);
            view.destroy();
        }

        private _modelAdded(item: TModel, index: number) {
            if (!this.el) return;
            let view = this._createChildView(item);
            this._renderChildView(view);
            this._attachChildView(this._getChildViewContainer(), view, index);
        }

        private _modelRemoved(_: TModel, index: number) {
            if (!this.el) return;
            let view = this._childViews[index];
            this._destroyChildView(view);
        }

        protected _addModelEvents() {
            if (isEventEmitter(this.collection)) {
                this.collection.on(ModelEvents.Add, this._modelAdded, this);
                this.collection.on(ModelEvents.Remove, this._modelRemoved, this);
                this.collection.on(ModelEvents.Reset, this.render, this);
                this.collection.on(ModelEvents.Sort, this.render, this);
            }
        }

        protected _removeModelEvents() {
            if (isEventEmitter(this.collection)) {
                this.collection.off(void 0, void 0, this);
            }
        }

        private _getChildViewContainer() {
            let sel = this.options.childViewContainer || this.childViewContainer
            if (!sel) return this.el!;
            let el = this.el!.querySelector(sel);
            if (!el) throw new Error(`tag not found: ${sel}`);
            return el!;
        }

        private _proxyChildViewEvents(view: IEventEmitter) {
            const fn = (eventName: string, ...args: any[]) => {
                eventName = this.options.eventProxyName + ':' + eventName;
                triggerMethodOn(this, eventName, ...[view].concat(args));
            }

            view.on('*', fn);
        }

        destroy() {
            this._removeChildViews();
            super.destroy();
        }

    }
}

