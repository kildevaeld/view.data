import { BaseView, BaseViewOptions, IView } from '@viewjs/view';
import { IModel, ICollection } from './types';
import { Constructor } from '@viewjs/utils';
import { IModelView } from './model-view';
export interface ICollectionView<TCollection extends ICollection<TModel>, TModel extends IModel, TView extends ChildViewType<TModel>> {
    collection?: TCollection;
    readonly childViews: TView[];
    collectionEvents?: any;
}
export declare type ChildViewType<M extends IModel> = IModelView<M> & IView;
export interface CollectionViewOptions<T extends Element, U extends ChildViewType<IModel>> extends BaseViewOptions<T> {
    childViewContainer?: string;
    eventProxyName?: string;
    childView?: Constructor<U>;
}
export declare function withCollection<TBaseType extends Constructor<BaseView<TElement>>, TElement extends Element, TView extends ChildViewType<TModel>, TCollection extends ICollection<TModel>, TModel extends IModel = IModel>(Base: TBaseType, CView: Constructor<TView>, CCollection?: Constructor<TCollection>): TBaseType & Constructor<ICollectionView<TCollection, TModel, TView>>;
