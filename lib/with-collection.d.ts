import { View, BaseViewOptions, IView, IViewTemplate } from '@viewjs/view';
import { Constructor } from '@viewjs/utils';
import { ICollection, ModelConstructor } from '@viewjs/models';
export interface ICollectionView<TCollection extends ICollection<TModel>, TModel, TView extends ChildViewType<TModel>> {
    collection?: TCollection;
    readonly childViews: TView[];
    collectionEvents?: any;
}
export declare type ChildViewType<M> = IViewTemplate<M> & IView;
export interface CollectionViewOptions<T extends Element, U extends ChildViewType<any>> extends BaseViewOptions<T> {
    childViewContainer?: string;
    eventProxyName?: string;
    childView?: Constructor<U>;
}
export declare function withCollection<TBaseType extends Constructor<View>, TView extends ChildViewType<TModel>, TCollection extends ICollection<TModel>, TModel = any>(Base: TBaseType, CView: Constructor<TView>, CCollection?: Constructor<TCollection>, MModel?: ModelConstructor<TModel>): TBaseType & Constructor<ICollectionView<TCollection, TModel, TView>>;
