import { BaseView } from '@viewjs/view';
import { IEventListener } from '@viewjs/events';
import { Model } from './model';
import { IModelView } from './model-view';
import { Constructor, Base } from '@viewjs/utils';
export interface IBindableView<M extends Model> {
    bindings: BindingDescription[];
}
export interface BindingDescription {
    prop: string;
    selector: string | HTMLElement;
}
declare const Binding_base: import("../../../../../../Users/rasmus/Development/Javascripts/view.data/node_modules/@viewjs/events/lib/types").Constructor<IEventListener> & typeof Base;
export declare class Binding extends Binding_base implements IEventListener {
    model: Model;
    prop: string;
    element: HTMLElement;
    private _bounded;
    constructor(model: Model, prop: string, element: HTMLElement);
    onModelChanged(): void;
    onElementChanged(): void;
    destroy(): void;
}
export declare function withBindings<T extends Constructor<BaseView> & Constructor<IModelView<M>>, M extends Model>(Base: T, Model?: Constructor<M>): T & Constructor<IBindableView<M>>;
export {};
