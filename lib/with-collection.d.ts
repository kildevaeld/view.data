import { View, BaseViewOptions, IView } from '@viewjs/view';
import { IModel, ICollection, ModelConstructor } from './types';
import { Constructor } from '@viewjs/utils';
import { IModelController } from './with-model';
export interface ICollectionView<TCollection extends ICollection<TModel>, TModel extends IModel, TView extends ChildViewType<TModel>> {
    collection?: TCollection;
    readonly childViews: TView[];
    collectionEvents?: any;
}
export declare type ChildViewType<M extends IModel> = IModelController<M> & IView;
export interface CollectionViewOptions<T extends Element, U extends ChildViewType<IModel>> extends BaseViewOptions<T> {
    childViewContainer?: string;
    eventProxyName?: string;
    childView?: Constructor<U>;
}
export declare function withCollection<TBaseType extends Constructor<View>, TView extends ChildViewType<TModel>, TCollection extends ICollection<TModel>, TModel extends IModel = IModel>(Base: TBaseType, CView: Constructor<TView>, CCollection?: Constructor<TCollection>, MModel?: ModelConstructor<TModel>): TBaseType & Constructor<ICollectionView<TCollection, TModel, TView>>;
