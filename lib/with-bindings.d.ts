import { View } from '@viewjs/view';
import { IEventListener } from '@viewjs/events';
import { IModel } from './types';
import { IModelController } from './with-model';
import { Constructor, Base } from '@viewjs/utils';
export interface IBindableView {
    bindings: BindingDescription[];
}
export interface BindingDescription {
    prop: string;
    selector: string | HTMLElement;
}
declare const Binding_base: Constructor<IEventListener> & typeof Base;
export declare class Binding extends Binding_base implements IEventListener {
    model: IModel;
    prop: string;
    element: HTMLElement;
    private _bounded;
    private _setting;
    constructor(model: IModel, prop: string, element: HTMLElement);
    onModelChanged(): void;
    onElementChanged(): void;
    destroy(): void;
}
export interface BindingViewOptions {
    bindingAttribute?: string;
}
export declare function withBindings<T extends Constructor<View> & Constructor<IModelController<M>>, M extends IModel>(Base: T): T & Constructor<IBindableView>;
export {};
