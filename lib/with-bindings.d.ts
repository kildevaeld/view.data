import { View } from '@viewjs/view';
import { IModel } from './types';
import { IModelController } from './with-model';
import { Constructor } from '@viewjs/utils';
export interface IBindableView {
    bindings: BindingDescription[];
}
export interface BindingDescription {
    prop: string;
    selector: string | HTMLElement;
}
export interface BindingViewOptions {
    bindingAttribute?: string;
}
export declare function withBindings<T extends Constructor<View> & Constructor<IModelController<M>>, M extends IModel>(Base: T): T & Constructor<IBindableView>;
