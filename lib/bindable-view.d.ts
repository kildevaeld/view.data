import { BaseView } from '@viewjs/view';
import { IModel } from './types';
import { IModelView } from './model-view';
import { Constructor } from '@viewjs/utils';
export interface IBindableView {
    bindings: BindingDescription[];
}
export interface BindingDescription {
    prop: string;
    selector: string | HTMLElement;
}
export declare function withBindings<T extends Constructor<BaseView> & Constructor<IModelView<M>>, M extends IModel>(Base: T): T & Constructor<IBindableView>;
