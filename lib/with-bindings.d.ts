import { View } from '@viewjs/view';
import { IEventListener } from '@viewjs/events';
import { IModelController, IModel } from '@viewjs/models';
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
    destroy(): this;
}
export interface BindingViewOptions {
    bindingAttribute?: string;
}
export declare function withBindings<T extends Constructor<View & IModelController<M>>, M extends IModel>(Base: T): T & Constructor<IBindableView>;
export {};
